# CRUD de Produtos — páginas web

Exemplo completo da seção 09: cinco páginas que conversam com uma API PHP usando `fetch()`.
As páginas HTML deste projeto consomem a API de produtos do exemplo
[`08-php-apis/crud-produtos`](../../08-php-apis/crud-produtos/) com `fetch`. Juntas, elas cobrem as
4 operações do CRUD: **criar, ler, alterar e remover**.

> Esta pasta é cópia de [`teste/`](../../teste/) (o exemplo que servimos na aula). Se mexer em um
> lado, mexa no outro.

> Os produtos ficam em um array na memória (`api/produto/produtos.php`). Quando o Apache reinicia,
> tudo volta ao original: por isso a lista sempre mostra os mesmos 20 produtos.

## Como rodar

O `.env` da raiz está com `PUBLIC_DIR=./teste`, então para servir esta pasta passe o caminho na
hora de subir o Apache (o `compose.dev.yaml` é o que publica a porta 80):

```bash
PUBLIC_DIR=./09-php-ajax/11-crud-produtos docker compose -f compose.dev.yaml up -d
```

Para voltar ao exemplo da aula, rode `docker compose -f compose.dev.yaml up -d` (lê `PUBLIC_DIR=./teste` do `.env`).

Abra <http://localhost/>. Abrir os HTML com `file://` não funciona, porque os caminhos `/api/...`
dependem do servidor.

## Arquivos

```text
11-crud-produtos/
├── index.html          Página inicial com os atalhos
├── componentes/        base.css (visual), toast.js (mensagem) e modal.js (confirmação)
├── lista/              GET + DELETE
├── cadastro/           POST
├── detalhe/            GET com ?id=
├── editar/             GET + PUT
└── api/                API em PHP + coleção do Bruno em "CRUD produtos/"
```

Cada página importa só o `componentes/base.css`, que por sua vez traz o toast e o modal. Mudou lá,
mudou em todas.

## As páginas

| Página | Verbo | Chamada |
| :--- | :--- | :--- |
| [`lista/`](./lista/) | `GET` | `/api/produto/?categoria=&precomin=&precomax=` |
| [`lista/`](./lista/) | `DELETE` | `/api/produto/?id=5` |
| [`cadastro/`](./cadastro/) | `POST` | `/api/produto/` (formulário) |
| [`detalhe/`](./detalhe/) | `GET` | `/api/produto/?id=5` |
| [`editar/`](./editar/) | `GET` + `PUT` | `?id=5` na URL, JSON no corpo |

Coisas que valem reparar na leitura do código:

- a lista monta a query string com `URLSearchParams` e ignora os campos vazios;
- o `id` sempre chega pela URL e é lido com `new URLSearchParams(location.search).get('id')`;
- `POST` envia `FormData` (vira `$_POST` no PHP) e `PUT` envia `JSON.stringify` (vira `php://input`);
- toda resposta é conferida em `data.erro` antes de mostrar a mensagem;
- o cartão nasce com `createElement`, o conteúdo entra por `innerHTML` e o evento do **Excluir**
  é ligado no mesmo `forEach`, com o produto certo já na mão (sem `data-id`, sem índice);
- o botão **Excluir** só faz o `DELETE` depois que o `confirmar()` do `componentes/modal.js`
  devolve `true`.

## Erros comuns

- Escrever o preço com vírgula: o campo é numérico, use ponto (`24.90`).
- Esquecer o `?id=` na URL das páginas de detalhe e edição.
- Esperar que o cadastro ou a exclusão mudem a lista: sem banco de dados, nada persiste.
- Trocar `FormData` por JSON no `POST`, ou JSON por formulário no `PUT`.

## Para praticar

1. [`lista/`](./lista/) — mostre acima da lista quantos produtos a API devolveu.
2. [`cadastro/`](./cadastro/) — depois do toast de sucesso, espere 2 segundos e volte para a lista.
3. [`editar/`](./editar/) — mostre em um aviso quais campos o aluno alterou.

## Resumo

- Quatro verbos, quatro comportamentos de interface: listar, cadastrar, abrir e salvar.
- `FormData` é para `$_POST`, `JSON.stringify` é para `php://input`, o `id` vai na URL.
- O visual vem do `componentes/base.css` e o feedback vem do `showToast()`.
