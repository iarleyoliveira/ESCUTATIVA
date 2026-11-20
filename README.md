# Escutativa
Projeto multimídia de jornalismo em Jekyll e GitHub Pages.

No [Pages CMS](https://app.pagescms.org), selecione `iarleyoliveira/ESCUTATIVA` e a branch `main`. A área da equipe fica em `/admin/`.

- **Leia** reúne reportagens, entrevistas e bastidores. Cadastre os textos e edite a apresentação dessa seção dentro da mesma área do menu.
- **Assista** reúne os minidocumentários e os textos de apresentação da seção. Cole o link completo do YouTube ou o ID de 11 caracteres. A frase “Quando a notícia faz parte da história” fica em **Assista → Textos da seção Assista → Título**.
- **Escute** reúne os podcasts e a apresentação da seção. Envie o arquivo de áudio pelo formulário ou use o link direto de um áudio hospedado. Os campos de áudio ficam apenas nessa área.
- **Página inicial** permite escolher a matéria da abertura. Limpar a matéria em destaque seleciona automaticamente a publicação mais recente. **Projeto** reúne os textos sobre o trabalho.
- **Equipe, redes e contato** reúne os integrantes, as redes e os e-mails. **Identidade** reúne nome, logo, assinatura e descrição para buscadores.

Ative **Publicar no site** e salve quando o conteúdo estiver pronto. A data é informativa: a opção **Publicar no site** controla a exibição, inclusive para datas futuras. Aguarde a geração do GitHub Pages, normalmente de 30 segundos a alguns minutos. Rascunhos ficam fora do site e do sitemap. Seus arquivos e histórico são públicos no GitHub. O guia e os atalhos da equipe ficam em `/admin/`.

Ao atualizar uma publicação existente, edite o mesmo registro dentro de Leia, Assista ou Escute para preservar seu endereço. Em Leia, a categoria diferencia reportagem, entrevista e bastidores. Em Assista e Escute, o tipo é preenchido automaticamente. As publicações ficam nas subpastas de `_materias`, mantendo os endereços públicos existentes.

## Casos

O item **Casos** do menu abre uma seção única na página inicial, com **Caso Hillary**, **Caso canadense Cal** e **Caso Felipe**, nessa ordem. Os três blocos permanecem visíveis enquanto não houver reportagens cadastradas.

No Pages CMS, abra **Casos** para adicionar ou editar um caso. Preencha **Nome do caso** e **Sobre este caso**. Em **Fotos**, adicione imagens, descrições e créditos. Em **Reportagens do caso**, cadastre título, veículo, resumo, formato e link da matéria original. Ative **Publicar no site** no caso e nas reportagens desejadas e salve. Arraste os casos para alterar a ordem. Os identificadores dos casos existentes são preservados; casos novos recebem um link a partir do nome. Os títulos das reportagens abrem as fontes originais em nova aba.

Todos os dados, fotos e reportagens dos casos ficam em arquivos individuais na pasta `_data/casos/`.

## Navegação, equipe e comentários

O menu reúne textos em **Leia**, minidocumentários em **Assista** e podcasts em **Escute**. O acervo permite buscar por título, resumo e autoria, com filtros compartilháveis pela URL. O áudio pode ser enviado pelo Pages ou informado por link direto; o player aparece na publicação e na página inicial. O Login abre o Pages CMS. A área `/admin/` reúne atalhos e instruções de publicação.

Em _data/equipe.yml, preencha members com name, role, bio, portrait (caminho local como /assets/uploads/nome.png) e url (opcional). Preencha socials com name e url e os e-mails contact e advertising para exibir redes e contatos no rodapé. Não são exibidos links sem destino.

Os comentários são configurados em **Comentários** no Pages CMS ou em `_data/comentarios.yml`. O serviço ativo fica em `provider`.

Para ativar comentários com nome e e-mail pelo Disqus, cadastre o site em https://disqus.com/admin/create/, copie o identificador público (shortname) para `disqus_shortname` e selecione `disqus`. No painel do Disqus, habilite **Settings → Moderation → Guest Commenting**. Configure a moderação prévia de todos os comentários para que também as contas cadastradas aguardem aprovação. Os comentários de visitantes já dependem de aprovação manual. O plano Basic é sustentado por anúncios. Essas configurações de moderação são feitas no Disqus, não no código do site. Confira em uma janela anônima se a opção de visitante aparece antes de divulgar a nova forma de comentar.

O Giscus permanece configurado até a ativação do Disqus. Suas discussões continuam no GitHub e podem ser acessadas selecionando novamente `giscus`. A troca de serviço não importa comentários automaticamente. Para Giscus, `repo`, `repo_id`, `category` e `category_id` correspondem aos valores gerados em https://giscus.app/pt.
