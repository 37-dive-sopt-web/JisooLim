const body = document.body;
const FOCUSABLE =
  "a[href], area[href], button:not([disabled]), input:not([disabled]):not([type='hidden']), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

let activeModal = null;
let lastFocusedElement = null;

const setBodyScroll = (isOpen) => {
  if (isOpen) {
    body.setAttribute('data-modal-open', 'true');
  } else {
    body.removeAttribute('data-modal-open');
  }
};

const trapFocus = (event) => {
  if (!activeModal || event.key !== 'Tab') return;

  const focusable = activeModal.querySelectorAll(FOCUSABLE);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey) {
    if (document.activeElement === first) {
      last.focus();
      event.preventDefault();
    }
  } else if (document.activeElement === last) {
    first.focus();
    event.preventDefault();
  }
};

const openModalElement = (modal) => {
  if (!modal || activeModal === modal) return;

  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.removeAttribute('aria-hidden');
  activeModal = modal;
  setBodyScroll(true);

  const focusTarget =
    modal.querySelector('.modal-form__control') || modal.querySelector(FOCUSABLE);

  (focusTarget || modal).focus({ preventScroll: true });
  document.addEventListener('keydown', trapFocus);
};

const closeModalElement = (modal) => {
  if (!modal || activeModal !== modal) return;

  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('role');
  modal.removeAttribute('aria-modal');
  modal.hidden = true;
  activeModal = null;
  setBodyScroll(false);
  document.removeEventListener('keydown', trapFocus);

  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus({ preventScroll: true });
  }
};

const getModalById = (modalId) =>
  typeof modalId === 'string' ? document.getElementById(modalId) : modalId;

export const closeModal = (modalId) => {
  const modal = getModalById(modalId);
  if (modal) {
    closeModalElement(modal);
  }
};

export const openModal = (modalId) => {
  const modal = getModalById(modalId);
  if (modal) {
    openModalElement(modal);
  }
};

const handleBackdropClick = (event, modal) => {
  if (event.target.matches('[data-modal-close]')) {
    closeModalElement(modal);
  }
};

const handleKeydown = (event, modal) => {
  if (event.key === 'Escape') {
    closeModalElement(modal);
  }
};

const initModalSystem = () => {
  const openButtons = document.querySelectorAll('[data-modal-target]');
  const modals = document.querySelectorAll('.modal');

  openButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.modalTarget;
      const modal = document.getElementById(targetId);
      openModalElement(modal);
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener('click', (event) => handleBackdropClick(event, modal));
    modal.addEventListener('keydown', (event) => handleKeydown(event, modal));
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModalSystem);
} else {
  initModalSystem();
}
