import { seedMembers, getMembers, saveMembers, getNextMemberId } from './storage.js';
import { renderMembers, syncSelectionState, setRenderElements } from './render.js';
import { closeModal as closeModalById } from './modal.js';

const elements = {
  modal: null,
  modalForm: null,
  tableBody: null,
  selectAll: null,
  deleteButton: null,
  filterForm: null,
  filterReset: null,
  emptyState: null,
};

const MODAL_FIELDS = Object.freeze({
  name: 'modal-name',
  englishName: 'modal-english-name',
  github: 'modal-github',
  gender: 'modal-gender',
  role: 'modal-role',
  team: 'modal-team',
  age: 'modal-age',
});

const FILTER_FIELDS = Object.freeze({
  name: 'name',
  englishName: 'english-name',
  github: 'github',
  gender: 'gender',
  role: 'role',
  team: 'team',
  age: 'age',
});

const cacheElements = () => {
  elements.modal = document.getElementById('member-modal');
  elements.modalForm = document.querySelector('.modal-form');
  elements.tableBody = document.getElementById('member-table-body');
  elements.selectAll = document.getElementById('select-all');
  elements.deleteButton = document.getElementById('delete-selected');
  elements.filterForm = document.getElementById('member-filter-form');
  elements.filterReset = document.getElementById('filter-reset');
  elements.emptyState = document.getElementById('member-empty-state');
};

const toTrimmedString = (value) => value?.toString().trim() ?? '';
const parseNumberValue = (value) => {
  const trimmed = toTrimmedString(value);
  if (!trimmed) return null;
  const num = Number(trimmed);
  return Number.isFinite(num) ? num : null;
};

const getFormValue = (
  formData,
  fieldMap,
  key,
  { trim = false, normalize = false } = {},
) => {
  const fieldName = fieldMap[key];
  if (!fieldName) return '';
  const rawValue = formData.get(fieldName);
  if (rawValue === null || rawValue === undefined) return '';

  let value = rawValue.toString();
  if (trim) {
    value = value.trim();
  }
  if (normalize) {
    value = value.toLowerCase();
  }
  return value;
};

const getMemberCheckboxes = () =>
  elements.tableBody
    ? Array.from(elements.tableBody.querySelectorAll('.member-checkbox'))
    : [];

const refreshMembers = (list = getMembers()) => {
  renderMembers(list);
  syncSelectionState();
};

const extractModalValues = (formData) => ({
  name: getFormValue(formData, MODAL_FIELDS, 'name', { trim: true }),
  englishName: getFormValue(formData, MODAL_FIELDS, 'englishName', {
    trim: true,
  }),
  github: getFormValue(formData, MODAL_FIELDS, 'github', { trim: true }),
  gender: getFormValue(formData, MODAL_FIELDS, 'gender'),
  role: getFormValue(formData, MODAL_FIELDS, 'role'),
  team: getFormValue(formData, MODAL_FIELDS, 'team', { trim: true }),
  age: getFormValue(formData, MODAL_FIELDS, 'age', { trim: true }),
});

const handleAddMember = (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const modalValues = extractModalValues(formData);
  const {
    name,
    englishName,
    github,
    gender,
    role,
    team,
    age: ageValue,
  } = modalValues;

  const normalizedGender = gender?.toLowerCase();
  const normalizedRole = role?.toUpperCase();

  if (
    !name ||
    !englishName ||
    !github ||
    !normalizedGender ||
    !normalizedRole ||
    !team ||
    !ageValue
  ) {
    alert('모든 항목을 입력해주세요.');
    return;
  }

  const age = parseNumberValue(ageValue);
  const codeReviewGroup = parseNumberValue(team);

  if (age === null || codeReviewGroup === null) {
    alert('금잔디조와 나이는 숫자로 입력해주세요.');
    return;
  }
  if (codeReviewGroup < 1 || codeReviewGroup > 9) {
    alert('금잔디조는 1~9 사이 숫자여야 합니다.');
    return;
  }

  const stored = getMembers();
  const nextId = getNextMemberId(stored);

  const newMember = {
    id: nextId,
    name,
    englishName,
    github,
    gender: normalizedGender,
    role: normalizedRole,
    codeReviewGroup,
    age,
  };

  const nextMembers = [...stored, newMember];
  saveMembers(nextMembers);
  refreshMembers(nextMembers);

  form.reset();
  closeModalById(elements.modal);
};

const handleDeleteSelected = () => {
  const stored = getMembers();
  const selectedIds = getMemberCheckboxes()
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => Number(checkbox.closest('tr')?.dataset.memberId));

  if (!selectedIds.length) return;

  const nextMembers = stored.filter((member) => !selectedIds.includes(member.id));
  saveMembers(nextMembers);
  refreshMembers(nextMembers);
};

const handleFilterSubmit = (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const name = getFormValue(formData, FILTER_FIELDS, 'name', {
    trim: true,
    normalize: true,
  });
  const englishName = getFormValue(formData, FILTER_FIELDS, 'englishName', {
    trim: true,
    normalize: true,
  });
  const github = getFormValue(formData, FILTER_FIELDS, 'github', {
    trim: true,
    normalize: true,
  });
  const gender = getFormValue(formData, FILTER_FIELDS, 'gender', {
    normalize: true,
  });
  const roleRaw = getFormValue(formData, FILTER_FIELDS, 'role');
  const teamInput = getFormValue(formData, FILTER_FIELDS, 'team', {
    trim: true,
  });
  const ageInput = getFormValue(formData, FILTER_FIELDS, 'age', {
    trim: true,
  });
  const role = roleRaw?.toUpperCase() ?? '';
  const teamNumber = parseNumberValue(teamInput);
  const ageNumber = parseNumberValue(ageInput);

  if (teamInput && teamNumber === null) {
    alert('금잔디조는 숫자로 검색해주세요.');
    return;
  }

  if (ageInput && ageNumber === null) {
    alert('나이는 숫자로 검색해주세요.');
    return;
  }

  const baseList = getMembers();

  const filtered = baseList.filter((member) => {
    if (name && !member.name?.toLowerCase().includes(name)) return false;
    if (englishName && !member.englishName?.toLowerCase().includes(englishName)) return false;
    if (github && !member.github?.toLowerCase().includes(github)) return false;
    if (gender && gender !== (member.gender ?? '').toLowerCase()) return false;
    if (role && role !== (member.role ?? '').toUpperCase()) return false;
    if (teamInput) {
      if ((member.codeReviewGroup ?? null) !== teamNumber) return false;
    }
    if (ageInput) {
      if ((member.age ?? null) !== ageNumber) return false;
    }
    return true;
  });

  refreshMembers(filtered);
};

const attachEventListeners = () => {
  const {
    tableBody,
    selectAll,
    deleteButton,
    modalForm,
    filterForm,
    filterReset,
  } = elements;

  if (tableBody) {
    tableBody.addEventListener('change', (event) => {
      if (event.target && event.target.classList.contains('member-checkbox')) {
        syncSelectionState();
      }
    });
  }

  if (selectAll) {
    selectAll.addEventListener('change', () => {
      const checkboxes = getMemberCheckboxes();
      checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAll.checked;
      });
      selectAll.indeterminate = false;
      syncSelectionState();
    });
  }

  if (deleteButton) {
    deleteButton.addEventListener('click', handleDeleteSelected);
  }

  if (modalForm) {
    modalForm.addEventListener('submit', handleAddMember);
  }

  if (filterForm) {
    filterForm.addEventListener('submit', handleFilterSubmit);
  }

  if (filterForm && filterReset) {
    filterReset.addEventListener('click', () => {
      filterForm.reset();
      refreshMembers();
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  setRenderElements(elements);
  seedMembers();
  refreshMembers();
  attachEventListeners();
});
