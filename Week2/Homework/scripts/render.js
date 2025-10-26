const genderLabel = {
  female: '여자',
  male: '남자',
};

export function renderMembers(list = []) {
  const tableBody = document.getElementById('member-table-body');
  const selectAll = document.getElementById('select-all');
  const deleteButton = document.getElementById('delete-selected');
  const emptyState = document.getElementById('member-empty-state');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  const toggleEmptyState = (isEmpty) => {
    if (!emptyState) return;
    emptyState.hidden = !isEmpty;
    if (isEmpty) {
      emptyState.removeAttribute('aria-hidden');
    } else {
      emptyState.setAttribute('aria-hidden', 'true');
    }
  };

  if (!list.length) {
    if (selectAll) selectAll.checked = false;
    if (deleteButton) deleteButton.disabled = true;
    toggleEmptyState(true);
    return;
  }

  toggleEmptyState(false);

  const fragment = document.createDocumentFragment();

  const createTextCell = (value) => {
    const cell = document.createElement('td');
    cell.textContent = value ?? '-';
    return cell;
  };

  list.forEach((member) => {
    const row = document.createElement('tr');
    row.dataset.memberId = String(member.id ?? '');

    const checkboxCell = document.createElement('td');
    checkboxCell.className = 'list-table__cell--checkbox';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.setAttribute('aria-label', `${member.name ?? '멤버'} 선택`);
    checkbox.className = 'member-checkbox';
    checkboxCell.appendChild(checkbox);
    row.appendChild(checkboxCell);

    const columnValues = [
      member.name ?? '-',
      member.englishName ?? '-',
      member.github,
      genderLabel[member.gender] ?? member.gender ?? '-',
      member.role ?? '-',
      member.codeReviewGroup !== undefined && member.codeReviewGroup !== null
        ? String(member.codeReviewGroup)
        : '-',
      member.age !== undefined && member.age !== null ? String(member.age) : '-',
    ];

    columnValues.forEach((value, index) => {
      if (index === 2) {
        const githubCell = document.createElement('td');
        if (value) {
          const link = document.createElement('a');
          link.href = `https://github.com/${value}`;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.className = 'list-table__link';
          link.textContent = value;
          githubCell.appendChild(link);
        } else {
          githubCell.textContent = '-';
        }
        row.appendChild(githubCell);
      } else {
        row.appendChild(createTextCell(value));
      }
    });

    fragment.appendChild(row);
  });

  tableBody.appendChild(fragment);

  syncSelectionState();
}

export function syncSelectionState() {
  const selectAll = document.getElementById('select-all');
  const deleteButton = document.getElementById('delete-selected');
  const tableBody = document.getElementById('member-table-body');
  const checkboxes = tableBody
    ? Array.from(tableBody.querySelectorAll('.member-checkbox'))
    : [];

  const hasMembers = checkboxes.length > 0;
  const checkedCount = checkboxes.filter((checkbox) => checkbox.checked).length;

  if (selectAll) {
    selectAll.checked = hasMembers && checkedCount === checkboxes.length;
    selectAll.indeterminate =
      checkedCount > 0 && checkedCount < checkboxes.length;
  }

  if (deleteButton) {
    deleteButton.disabled = checkedCount === 0;
  }
}
