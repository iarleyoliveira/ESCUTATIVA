const filters = document.querySelector('.archive-filters');
const buttons = Array.from(filters.querySelectorAll('[data-filter]'));
const groups = document.querySelectorAll('.archive-group');

function applyFilter() {
  const url = new URL(window.location.href);
  const requested = url.searchParams.get('categoria');
  const active = buttons.find((button) => button.dataset.filter === requested) || buttons[0];

  for (const button of buttons) {
    button.setAttribute('aria-pressed', String(button === active));
  }

  for (const group of groups) {
    group.hidden = Boolean(active.dataset.filter && active.dataset.filter !== group.dataset.category);
  }
}

filters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button || button.getAttribute('aria-pressed') === 'true') return;

  const url = new URL(window.location.href);
  if (button.dataset.filter) {
    url.searchParams.set('categoria', button.dataset.filter);
  } else {
    url.searchParams.delete('categoria');
  }
  window.history.pushState(null, '', url);
  applyFilter();
});

window.addEventListener('popstate', applyFilter);
applyFilter();
filters.hidden = false;
