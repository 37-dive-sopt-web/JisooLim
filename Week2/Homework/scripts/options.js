const fillSelectOptions = () => {
  const selects = document.querySelectorAll('select[data-options-template]');

  selects.forEach((select) => {
    if (select.dataset.optionsApplied === 'true') return;

    const templateId = select.dataset.optionsTemplate;
    if (!templateId) return;

    const template = document.getElementById(templateId);
    if (!template || !template.content) return;

    select.appendChild(template.content.cloneNode(true));
    select.dataset.optionsApplied = 'true';
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fillSelectOptions);
} else {
  fillSelectOptions();
}
