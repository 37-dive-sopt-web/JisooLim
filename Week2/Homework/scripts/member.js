import { seedMembers, getMembers, saveMembers, getNextMemberId } from './storage.js';
import { renderMembers, syncSelectionState } from './render.js';
import { closeModal as closeModalById } from './modal.js';

const elements = {
  modal: null,
  modalForm: null,
  tableBody: null,
  selectAll: null,
  deleteButton: null,
  filterForm: null,
  filterReset: null,
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
};

const normalizeText = (value) => value?.toString().trim().toLowerCase() ?? '';
const getTrimmedValue = (formData, key) => formData.get(key)?.toString().trim() ?? '';
const parseNumberValue = (value) => {
  const trimmed = value?.toString().trim();
  if (!trimmed) return null;
  const num = Number(trimmed);
  return Number.isFinite(num) ? num : null;
};

const getModalFieldValue = (formData, key) => {
  const fieldName = MODAL_FIELDS[key];
  if (!fieldName) return '';
  return getTrimmedValue(formData, fieldName);
};

const getModalSelectValue = (formData, key) => {
  const fieldName = MODAL_FIELDS[key];
  if (!fieldName) return '';
  return formData.get(fieldName)?.toString() ?? '';
};

const getFilterRawValue = (formData, key) => {
  const fieldName = FILTER_FIELDS[key];
  if (!fieldName) return '';
  const value = formData.get(fieldName);
  return value?.toString() ?? '';
};

const getFilterTrimmedValue = (formData, key) => getFilterRawValue(formData, key).trim();
const getFilterNormalizedValue = (formData, key) => normalizeText(getFilterRawValue(formData, key));
const getFilterSelectValue = (formData, key) => getFilterRawValue(formData, key);

const getMemberCheckboxes = () =>
  elements.tableBody
    ? Array.from(elements.tableBody.querySelectorAll('.member-checkbox'))
    : [];

const refreshMembers = (list = getMembers()) => {
  renderMembers(list);
  syncSelectionState();
};

const extractModalValues = (formData) => ({
  name: getModalFieldValue(formData, 'name'),
  englishName: getModalFieldValue(formData, 'englishName'),
  github: getModalFieldValue(formData, 'github'),
  gender: getModalSelectValue(formData, 'gender'),
  role: getModalSelectValue(formData, 'role'),
  team: getModalFieldValue(formData, 'team'),
  age: getModalFieldValue(formData, 'age'),
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

  if (!name || !englishName || !github || !gender || !role || !team || !ageValue) {
    alert('모든 항목을 입력해주세요.');
    return;
  }

  const age = parseNumberValue(ageValue);
  const codeReviewGroup = parseNumberValue(team);

  if (age === null || codeReviewGroup === null) {
    alert('금잔디조와 나이는 숫자로 입력해주세요.');
    return;
  }

  const stored = getMembers();
  const nextId = getNextMemberId(stored);

  const newMember = {
    id: nextId,
    name,
    englishName,
    github,
    gender,
    role,
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

  const name = getFilterNormalizedValue(formData, 'name');
  const englishName = getFilterNormalizedValue(formData, 'englishName');
  const github = getFilterNormalizedValue(formData, 'github');
  const gender = getFilterSelectValue(formData, 'gender');
  const role = getFilterSelectValue(formData, 'role');
  const teamInput = getFilterTrimmedValue(formData, 'team');
  const ageInput = getFilterTrimmedValue(formData, 'age');
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
    if (gender && gender !== member.gender) return false;
    if (role && role !== member.role) return false;
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
  seedMembers();
  refreshMembers();
  attachEventListeners();
});
