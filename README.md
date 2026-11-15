# Escutativa
Projeto multimídia de jornalismo em Jekyll e GitHub Pages.

No [Pages CMS](https://app.pagescms.org), selecione `iarleyoliveira/ESCUTATIVA` e a branch `main`. A área da equipe fica em `/ESCUTATIVA/admin/`.

- **Publicações** reúne reportagens, entrevistas, bastidores, minidocumentários e videocasts. Escolha a categoria para posicionar a publicação na página inicial. Informe título, resumo, data, autoria, texto, imagem de capa, descrição alternativa e créditos conforme o material. Em publicações com vídeo, cole somente o ID de 11 caracteres do YouTube.
- **Página inicial e créditos** reúne os textos de abertura, títulos, menu, mensagens das seções, apresentação e créditos da equipe. A frase “Quando a notícia faz parte da história” fica no grupo **Minidocumentário**, no campo **Título**.
- **Identidade** reúne nome, assinatura, textos do cabeçalho e descrição para buscadores. O campo de logotipo é opcional.

Ative **Publicar no site** e salve quando o conteúdo estiver pronto. Aguarde a geração do GitHub Pages. Rascunhos ficam fora do site e do sitemap. Seus arquivos e histórico são públicos no GitHub.

Ao atualizar uma publicação existente, edite o mesmo registro para preservar seu endereço. Alterar a categoria muda a seção, e alterar o título muda o texto exibido.

## Navegação, equipe e comentários

O menu reúne textos em **Leia**, minidocumentários em **Assista** e videocasts em **Escute**. O acervo permite buscar por título, resumo e autoria, com filtros compartilháveis pela URL. Escute mantém o player do videocast; não há uma faixa de áudio separada cadastrada. O Login abre a área da equipe e a autenticação continua no Pages CMS.

Em _data/equipe.yml, preencha members com name, role, bio, portrait (caminho local como /assets/uploads/nome.png) e url (opcional). Preencha socials com name e url e os e-mails contact e advertising para exibir redes e contatos no rodapé. Não são exibidos links sem destino.

Para comentários públicos: habilite Discussions no GitHub, instale https://github.com/apps/giscus e configure https://giscus.app/pt para este repositório. Copie data-repo-id, data-category e data-category-id para os campos correspondentes em _data/comentarios.yml. O template só carrega Giscus quando os IDs estão preenchidos. Comentários são vinculados ao caminho de cada matéria e moderados no GitHub Discussions.
