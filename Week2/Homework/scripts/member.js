import { seedMembers, getMembers, saveMembers, getNextMemberId } from './storage.js';
import { renderMembers, syncSelectionState } from './render.js';

const closeModal = () => {
  const modal = document.getElementById('member-modal');
  if (!modal) return;
  const closeButton = modal.querySelector('[data-modal-close]');
  if (closeButton instanceof HTMLButtonElement) {
    closeButton.click();
  } else {
    modal.hidden = true;
    document.body.removeAttribute('data-modal-open');
  }
};

const handleAddMember = (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const name = formData.get('modal-name')?.toString().trim();
  const englishName = formData.get('modal-english-name')?.toString().trim();
  const github = formData.get('modal-github')?.toString().trim();
  const gender = formData.get('modal-gender')?.toString();
  const role = formData.get('modal-role')?.toString();
  const team = formData.get('modal-team')?.toString().trim();
  const ageValue = formData.get('modal-age')?.toString().trim();

  if (!name || !englishName || !github || !gender || !role || !team || !ageValue) {
    alert('모든 항목을 입력해주세요.');
    return;
  }

  const age = Number(ageValue);
  const codeReviewGroup = Number(team);

  if (Number.isNaN(age) || Number.isNaN(codeReviewGroup)) {
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
  renderMembers(nextMembers);

  form.reset();
  closeModal();
};

const handleDeleteSelected = () => {
  const stored = getMembers();
  const selectedIds = Array.from(document.querySelectorAll('.member-checkbox'))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => Number(checkbox.closest('tr')?.dataset.memberId));

  if (!selectedIds.length) return;

  const nextMembers = stored.filter((member) => !selectedIds.includes(member.id));
  saveMembers(nextMembers);
  renderMembers(nextMembers);
};

const handleFilterSubmit = (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const name = formData.get('name')?.toString().trim().toLowerCase();
  const englishName = formData.get('english-name')?.toString().trim().toLowerCase();
  const github = formData.get('github')?.toString().trim().toLowerCase();
  const gender = formData.get('gender')?.toString();
  const role = formData.get('role')?.toString();
  const team = formData.get('team')?.toString().trim();
  const age = formData.get('age')?.toString().trim();

  const baseList = getMembers();

  const filtered = baseList.filter((member) => {
    if (name && !member.name?.toLowerCase().includes(name)) return false;
    if (englishName && !member.englishName?.toLowerCase().includes(englishName)) return false;
    if (github && !member.github?.toLowerCase().includes(github)) return false;
    if (gender && gender !== member.gender) return false;
    if (role && role !== member.role) return false;
    if (team) {
      if (String(member.codeReviewGroup ?? '').toLowerCase() !== team.toLowerCase()) return false;
    }
    if (age) {
      if (String(member.age ?? '').toLowerCase() !== age.toLowerCase()) return false;
    }
    return true;
  });

  renderMembers(filtered);
};

const attachEventListeners = () => {
  const tableBody = document.getElementById('member-table-body');
  const selectAll = document.getElementById('select-all');
  const deleteButton = document.getElementById('delete-selected');
  const modalForm = document.querySelector('.modal-form');
  const filterForm = document.getElementById('member-filter-form');
  const resetButton = document.getElementById('filter-reset');

  if (tableBody) {
    tableBody.addEventListener('change', (event) => {
      if (event.target && event.target.classList.contains('member-checkbox')) {
        syncSelectionState();
      }
    });
  }

  if (selectAll) {
    selectAll.addEventListener('change', () => {
      const checkboxes = document.querySelectorAll('.member-checkbox');
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

  if (filterForm && resetButton) {
    resetButton.addEventListener('click', () => {
      filterForm.reset();
      renderMembers(getMembers());
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  seedMembers();
  renderMembers(getMembers());
  attachEventListeners();
});
