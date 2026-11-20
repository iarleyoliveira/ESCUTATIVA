# Escutativa
Projeto multimídia de jornalismo em Jekyll e GitHub Pages.

No [Pages CMS](https://app.pagescms.org), selecione `iarleyoliveira/ESCUTATIVA` e a branch `main`. A área da equipe fica em `/ESCUTATIVA/admin/`.

- **Publicações** reúne reportagens, entrevistas, bastidores, minidocumentários e videocasts. Escolha a categoria para posicionar a publicação na página inicial. Informe título, resumo, data, autoria, texto, imagem de capa, descrição alternativa e créditos conforme o material. Em publicações com vídeo, cole somente o ID de 11 caracteres do YouTube.
- **Página inicial e créditos** reúne os textos de abertura, títulos, menu, mensagens das seções, apresentação e créditos da equipe. A frase “Quando a notícia faz parte da história” fica no grupo **Minidocumentário**, no campo **Título**.
- **Identidade** reúne nome, assinatura, textos do cabeçalho e descrição para buscadores. O campo de logotipo é opcional.

Ative **Publicar no site** e salve quando o conteúdo estiver pronto. Aguarde a geração do GitHub Pages. Rascunhos ficam fora do site e do sitemap. Seus arquivos e histórico são públicos no GitHub.

Ao atualizar uma publicação existente, edite o mesmo registro para preservar seu endereço. Alterar a categoria muda a seção, e alterar o título muda o texto exibido.

## Casos

O item **Casos** do menu abre uma seção única na página inicial, com **Caso Hillary**, **Caso canadense Cal** e **Caso Felipe**, nessa ordem. Os três blocos permanecem visíveis enquanto não houver reportagens cadastradas.

No Pages CMS, abra **Casos** para adicionar ou editar um caso. Preencha **Nome do caso**, um **Identificador do caso** único e a **Apresentação do caso**. Em **Fotos**, adicione imagens, descrições e créditos. Em **Reportagens do caso**, cadastre título, veículo, resumo, formato e link da matéria original. Ative **Publicar no site** no caso e nas reportagens desejadas e salve. Arraste os casos para alterar a ordem. Depois de publicar, preserve o identificador para manter os links existentes. Os títulos das reportagens abrem as fontes originais em nova aba.

Todos os dados, fotos e reportagens dos casos ficam em `_data/casos.yml`.

## Navegação, equipe e comentários

O menu reúne textos em **Leia**, minidocumentários em **Assista** e videocasts em **Escute**. O acervo permite buscar por título, resumo e autoria, com filtros compartilháveis pela URL. Escute mantém o player do videocast; não há uma faixa de áudio separada cadastrada. O Login abre a área da equipe e a autenticação continua no Pages CMS.

Em _data/equipe.yml, preencha members com name, role, bio, portrait (caminho local como /assets/uploads/nome.png) e url (opcional). Preencha socials com name e url e os e-mails contact e advertising para exibir redes e contatos no rodapé. Não são exibidos links sem destino.

Os comentários são configurados em **Comentários** no Pages CMS ou em `_data/comentarios.yml`. O serviço ativo fica em `provider`.

Para ativar comentários com nome e e-mail pelo Disqus, cadastre o site em https://disqus.com/admin/create/, copie o identificador público (shortname) para `disqus_shortname` e selecione `disqus`. No painel do Disqus, habilite **Settings → Moderation → Guest Commenting**. Configure a moderação prévia de todos os comentários para que também as contas cadastradas aguardem aprovação. Os comentários de visitantes já dependem de aprovação manual. O plano Basic é sustentado por anúncios. Essas configurações de moderação são feitas no Disqus, não no código do site. Confira em uma janela anônima se a opção de visitante aparece antes de divulgar a nova forma de comentar.

O Giscus permanece configurado até a ativação do Disqus. Suas discussões continuam no GitHub e podem ser acessadas selecionando novamente `giscus`. A troca de serviço não importa comentários automaticamente. Para Giscus, `repo`, `repo_id`, `category` e `category_id` correspondem aos valores gerados em https://giscus.app/pt.
