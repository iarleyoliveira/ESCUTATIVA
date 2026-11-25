const publicationSearch = document.querySelector('#publication-search');
const publicationRows = [...document.querySelectorAll('.newsroom-list li')];
if (!publicationSearch) throw new Error('A pesquisa da área da equipe não está disponível.');
const normalizeTitle = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();

function filterPublications() {
  const query = normalizeTitle(publicationSearch.value);
  for (const row of publicationRows) row.hidden = !normalizeTitle(row.dataset.title).includes(query);
  const empty = document.querySelector('#publication-empty');
  if (empty) empty.hidden = publicationRows.some(row => !row.hidden);
}
publicationSearch.addEventListener('input', filterPublications);
filterPublications();
