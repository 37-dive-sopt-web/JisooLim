const genderLabel = {
  female: '여자',
  male: '남자',
};

const renderElements = {
  tableBody: null,
  selectAll: null,
  deleteButton: null,
  emptyState: null,
};

export function setRenderElements(refs = {}) {
  renderElements.tableBody = refs.tableBody ?? renderElements.tableBody;
  renderElements.selectAll = refs.selectAll ?? renderElements.selectAll;
  renderElements.deleteButton =
    refs.deleteButton ?? renderElements.deleteButton;
  renderElements.emptyState = refs.emptyState ?? renderElements.emptyState;
}

export function renderMembers(list = []) {
  const { tableBody, selectAll, deleteButton, emptyState } = renderElements;
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

  const TABLE_KEYS = [
    'name',
    'englishName',
    'github',
    'gender',
    'role',
    'codeReviewGroup',
    'age',
  ];

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

    TABLE_KEYS.forEach((key) => {
      const value = member[key];

      switch (key) {
        case 'github': {
          const cell = document.createElement('td');
          if (value) {
            const link = document.createElement('a');
            link.href = `https://github.com/${value}`;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'list-table__link';
            link.textContent = value;
            cell.appendChild(link);
          } else {
            cell.textContent = '-';
          }
          row.appendChild(cell);
          break;
        }

        case 'gender': {
          const label = genderLabel[value] ?? value ?? '-';
          row.appendChild(createTextCell(label));
          break;
        }

        default:
          row.appendChild(createTextCell(value));
      }
    });

    fragment.appendChild(row);
  });

  tableBody.appendChild(fragment);

  syncSelectionState();
}

export function syncSelectionState() {
  const { selectAll, deleteButton, tableBody } = renderElements;
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
