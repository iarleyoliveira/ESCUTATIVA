const filters = document.querySelector('.archive-filters');
const form = document.querySelector('.archive-search');
if (!filters || !form) throw new Error('A interface do acervo não está disponível.');

const buttons = Array.from(filters.querySelectorAll('[data-filter]'));
const groups = Array.from(document.querySelectorAll('.archive-group'));
const input = form.querySelector('input');
const status = document.querySelector('#search-status');
if (!input || !status) throw new Error('Os campos de pesquisa do acervo não estão disponíveis.');
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
function applyFilter() {
  const params = new URL(window.location.href).searchParams;
  const format = params.get('formato');
  const category = params.get('categoria');
  const query = params.get('q') || '';
  input.value = query;
  const words = normalize(query).split(/\s+/).filter(Boolean);
  const active = buttons.find(button => button.dataset.filter === (format || category || '') && Boolean(button.dataset.format) === Boolean(format)) || buttons[0];
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button === active)));
  let count = 0;
  groups.forEach(group => {
    const matches = !active.dataset.filter || group.dataset[active.dataset.format ? 'format' : 'category'] === active.dataset.filter;
    const cards = Array.from(group.querySelectorAll('.card'));
    cards.forEach(card => {
      const text = normalize(card.textContent);
      card.hidden = !matches || !words.every(word => text.includes(word));
      if (!card.hidden) count++;
    });
    group.hidden = !matches || (words.length > 0 && !cards.some(card => !card.hidden));
  });
  status.textContent = count === 0 ? 'Nenhuma publicação encontrada. Tente outro termo ou filtro.' : count + (count === 1 ? ' publicação encontrada.' : ' publicações encontradas.');
}
filters.addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  const url = new URL(window.location.href);
  url.searchParams.delete('categoria');
  url.searchParams.delete('formato');
  if (button.dataset.filter) url.searchParams.set(button.dataset.format ? 'formato' : 'categoria', button.dataset.filter);
  window.history.pushState(null, '', url);
  applyFilter();
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const url = new URL(window.location.href);
  const query = input.value.trim();
  if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
  window.history.pushState(null, '', url);
  applyFilter();
});
window.addEventListener('popstate', applyFilter);
applyFilter();
filters.hidden = false;
