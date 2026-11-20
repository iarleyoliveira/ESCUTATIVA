const publicationSearch = document.querySelector('#publication-search');
const publicationRows = [...document.querySelectorAll('.newsroom-list li')];
const normalizeTitle = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();

function filterPublications() {
  const query = normalizeTitle(publicationSearch.value);
  for (const row of publicationRows) row.hidden = !normalizeTitle(row.dataset.title).includes(query);
  document.querySelector('#publication-empty').hidden = publicationRows.some(row => !row.hidden);
}
publicationSearch.addEventListener('input', filterPublications);
filterPublications();
