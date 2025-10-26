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

  if (!list.length) {
    if (selectAll) selectAll.checked = false;
    if (deleteButton) deleteButton.disabled = true;
    if (emptyState) {
      emptyState.hidden = false;
      emptyState.removeAttribute('aria-hidden');
    }
    return;
  }

  if (emptyState) {
    emptyState.hidden = true;
    emptyState.setAttribute('aria-hidden', 'true');
  }

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

    const createTextCell = (value) => {
      const cell = document.createElement('td');
      cell.textContent = value ?? '-';
      return cell;
    };

    row.appendChild(createTextCell(member.name ?? '-'));
    row.appendChild(createTextCell(member.englishName ?? '-'));

    const githubCell = document.createElement('td');
    if (member.github) {
      const link = document.createElement('a');
      link.href = `https://github.com/${member.github}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'list-table__link';
      link.textContent = member.github;
      githubCell.appendChild(link);
    } else {
      githubCell.textContent = '-';
    }
    row.appendChild(githubCell);

    row.appendChild(createTextCell(genderLabel[member.gender] ?? member.gender ?? '-'));
    row.appendChild(createTextCell(member.role ?? '-'));
    row.appendChild(
      createTextCell(
        member.codeReviewGroup !== undefined && member.codeReviewGroup !== null
          ? String(member.codeReviewGroup)
          : '-',
      ),
    );
    row.appendChild(
      createTextCell(
        member.age !== undefined && member.age !== null ? String(member.age) : '-',
      ),
    );

    tableBody.appendChild(row);
  });

  syncSelectionState();
}

export function syncSelectionState() {
  const selectAll = document.getElementById('select-all');
  const deleteButton = document.getElementById('delete-selected');
  const checkboxes = Array.from(document.querySelectorAll('.member-checkbox'));

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
