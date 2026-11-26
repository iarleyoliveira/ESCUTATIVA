async (page) => {
  const root = new URL(page.url()).origin + '/';
  const results = [];
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' });
  await page.goto(root);
  await page.evaluate(() => localStorage.setItem('escutativa-theme', 'light'));
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto(root);
    await page.getByRole('button', { name: 'Ativar modo escuro', exact: true }).click();
    assert(await page.locator('html').getAttribute('data-theme') === 'dark', 'Tema escuro não ativou');
    await page.reload();
    assert(await page.locator('html').getAttribute('data-theme') === 'dark', 'Tema não persistiu');
    await page.getByRole('button', { name: 'Ativar modo claro', exact: true }).click();
    assert(await page.locator('html').getAttribute('data-theme') === 'light', 'Tema claro não ativou');
    await page.getByRole('link', { name: 'Pesquisar publicações', exact: true }).click();
    assert(await page.getByRole('dialog').isVisible(), 'Busca não abriu');
    await page.keyboard.press('Escape');
    assert(!await page.getByRole('dialog').isVisible(), 'Busca não fechou');
    await page.getByRole('link', { name: 'Pesquisar publicações', exact: true }).click();
    await page.locator('#quick-search-query').fill('margens');
    await page.locator('.quick-search').getByRole('button', { name: 'Buscar' }).click();
    await page.waitForFunction(() => document.querySelector('#search-status')?.textContent.includes('1 publicação'));
    await page.getByRole('button', { name: 'Escute', exact: true }).click();
    assert((await page.locator('#search-status').innerText()).includes('Nenhuma publicação'), 'Filtro não aplicou');
    await page.goBack();
    assert((await page.locator('#search-status').innerText()).includes('1 publicação'), 'Voltar não restaurou busca');
    for (const format of ['leia', 'assista', 'escute']) {
      await page.goto(root + 'acervo/?formato=' + format);
      await page.waitForFunction(() => document.querySelector('.archive-filters')?.hidden === false);
      assert(await page.locator('.card:visible').count() === 1, 'Filtro de formato: ' + format);
    }
    await page.goto(root + '#casos');
    const gallery = page.locator('[data-case-carousel]').first();
    await gallery.locator('.case-next').press('Home');
    const before = await gallery.locator('.case-photo-counter').innerText();
    await gallery.getByRole('button', { name: 'Próxima foto', exact: true }).click();
    assert(await gallery.locator('.case-photo-counter').innerText() !== before, 'Galeria não avançou');
    await gallery.getByRole('button', { name: 'Foto anterior', exact: true }).click();
    assert(await gallery.locator('.case-photo-counter').innerText() === before, 'Galeria não voltou');
    assert(await gallery.locator('figure:visible').count() === (width >= 900 ? 3 : 1), 'Galeria não adaptou');
    for (const path of ['', 'acervo/', 'materias/conversas-que-aproximam/', 'materias/quando-a-escuta-abre-caminhos/', 'materias/2026-11-22-leia-entre-duas-margens/', 'admin/']) {
      const response = await page.goto(root + path);
      assert(response.status() === 200, 'Página falhou: ' + path);
      await page.waitForLoadState('load');
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Rolagem horizontal: ' + path + ' em ' + width);
      if (path.includes('conversas-que-aproximam')) {
        assert(await page.locator('article audio').count() === 0, 'Podcast ainda usa player de áudio');
        assert((await page.locator('article iframe[src*="youtube-nocookie.com"]').getAttribute('src')).endsWith('/-poQdEqW6xI'), 'Player do podcast incorreto');
      }
    }
    results.push({ width, theme: 'OK, inclusive após recarregar', search: 'OK', filters: 'OK', gallery: 'OK', pages: '6 OK, sem rolagem horizontal', podcast: 'player YouTube correto' });
  }
  // Testa explicitamente um script que só chega após DOMContentLoaded.
  const late = await page.context().newPage();
  await late.route('**/assets/js/theme.js?*', route => route.abort());
  await late.goto(root, { waitUntil: 'load' });
  const themeCode = await (await page.request.get(root + 'assets/js/theme.js')).text();
  await late.addScriptTag({ content: themeCode });
  await late.getByRole('button', { name: 'Ativar modo escuro', exact: true }).click();
  assert(await late.locator('html').getAttribute('data-theme') === 'dark', 'Carregamento tardio falhou');
  await late.close();
  assert(errors.length === 0, 'Erros JavaScript: ' + errors.join('; '));
  return { results, delayedTheme: 'OK', javascriptErrors: errors };
}
