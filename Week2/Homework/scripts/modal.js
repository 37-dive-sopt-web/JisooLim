(() => {
    const body = document.body;
    const openButtons = document.querySelectorAll('[data-modal-target]');
    const modals = document.querySelectorAll('.modal');
    const FOCUSABLE =
        'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

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

    const openModal = (modal) => {
        if (!modal || activeModal === modal) return;

        lastFocusedElement = document.activeElement;
        modal.hidden = false;
        activeModal = modal;
        setBodyScroll(true);

        const focusTarget =
            modal.querySelector('.modal-form__control') ||
            modal.querySelector(FOCUSABLE);

        (focusTarget || modal).focus({ preventScroll: true });
        document.addEventListener('keydown', trapFocus);
    };

    const closeModal = (modal) => {
        if (!modal || activeModal !== modal) return;

        modal.hidden = true;
        activeModal = null;
        setBodyScroll(false);
        document.removeEventListener('keydown', trapFocus);

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus({ preventScroll: true });
        }
    };

    openButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.modalTarget;
            const modal = document.getElementById(targetId);
            openModal(modal);
        });
    });

    modals.forEach((modal) => {
        modal.addEventListener('click', (event) => {
            if (event.target.matches('[data-modal-close]')) {
                closeModal(modal);
            }
        });

        modal.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModal(modal);
            }
        });
    });
})();
