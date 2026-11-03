# Tarefas — exemplo de login, sessão e banco de dados

Projeto de exemplo da disciplina de Programação Web I. Tem três páginas (login, cadastro e tarefas) e uma API em PHP separada por escopo: `api/user/` cuida dos usuários e `api/task/` cuida das tarefas.

Este é o exemplo integrador da seção 10: ele junta PDO, consultas preparadas, hash de senha e sessão em uma aplicação pequena.

O objetivo é mostrar, em um fluxo só, como uma página conversa com a API usando `fetch()`, como o PHP guarda o usuário na sessão e como cada tarefa fica ligada ao usuário que a criou.

## O que o projeto faz

- **Cadastro:** insere um usuário novo em `users`, com a senha guardada por `password_hash()`.
- **Login:** confere e-mail e senha com `password_verify()` e grava o usuário em `$_SESSION`.
- **Tarefas:** página protegida que lista e cadastra tarefas do usuário logado.
- **Logout:** apaga a sessão e volta para a tela de login.

## Como rodar

O `.env` da raiz do repositório configura o Docker; o `.env` desta pasta configura a aplicação. Se ele não existir, a API responde com erro 500. Os comandos abaixo são executados na raiz do repositório.

```bash
# 1. crie o .env da aplicação
cp 10-php-banco-dados/tarefas-sessao/.env.example 10-php-banco-dados/tarefas-sessao/.env

# 2. suba o Apache e o MySQL servindo esta pasta
PUBLIC_DIR=./10-php-banco-dados/tarefas-sessao docker compose -f compose.dev.yaml up -d

# 3. abra no navegador
# http://localhost/
```

Se o banco ainda estiver vazio, importe a estrutura:

```bash
docker exec -i mysql mysql -uroot -pasdf1234 < 10-php-banco-dados/tarefas-sessao/database.sql
```

As credenciais padrão do ambiente de aula são `root` / `asdf1234`, iguais às do `.env.example`. Em um projeto real, esse arquivo não iria para o Git.

## Estrutura

```text
tarefas-sessao/
├── api/
│   ├── connection.php        conexão PDO, lê o .env
│   ├── user/
│   │   ├── index.php         GET lista, POST cadastra
│   │   ├── add.php           cadastra usuário
│   │   ├── get_list.php      lista usuários
│   │   ├── get_logged.php    devolve o usuário da sessão
│   │   ├── login.php         autentica
│   │   └── logout.php        encerra a sessão
│   └── task/
│       ├── index.php
│       ├── add.php
│       └── get_list.php
├── componentes/
│   ├── base.css              visual compartilhado
│   ├── toast.css / toast.js  aviso temporário
│   └── modal.css / modal.js  confirmação (disponível para ações destrutivas)
├── cadastro/
├── login/
├── tarefas/
├── collection/               requisições do Bruno
├── database.sql
├── .env.example
└── index.html
```

## Como a API funciona

Cada recurso tem uma URL e o método HTTP diz o que fazer:

```text
GET  /api/user/index.php       lista usuários
POST /api/user/index.php       cadastra usuário
GET  /api/user/get_logged.php  usuário da sessão
POST /api/user/login.php       entra
POST /api/user/logout.php      sai
GET  /api/task/index.php       lista tarefas
POST /api/task/index.php       cadastra tarefa
```

No `index.php`, o método é lido de `$_SERVER["REQUEST_METHOD"]`:

```php
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    require __DIR__ . "/get_list.php";
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    require __DIR__ . "/add.php";
    exit;
}
```

Se o método não existir no recurso, a resposta é `405 Method Not Allowed` com o cabeçalho `Allow`.

As operações ficam em `add.php` e `get_list.php`, incluídas pelo `index.php`. A URL pública é o `index.php`; `login.php`, `logout.php` e `get_logged.php` são endpoints próprios.

### Contrato das respostas

Sucesso: JSON com `message` e os dados da operação, sem a chave `error`.

```json
{ "message": "Usuário inserido", "user": { "name": "Maria", "email": "maria@email.com" } }
```

Erro: `error: true` e uma `message` em português.

```json
{ "error": true, "message": "Usuário ou senha inválida" }
```

Códigos usados: `200` (ok), `201` (criado), `400` (dados inválidos), `401` (não logado ou credenciais erradas), `405` (método não permitido), `409` (e-mail já cadastrado) e `500` (falha no banco).

## Endpoints

### Usuário — `/api/user/`

| URL | Método | Login? | Corpo / retorno |
| :--- | :--- | :--- | :--- |
| `index.php` | GET | não | lista `users` (nome e e-mail) |
| `index.php` | POST | não | `name`, `email`, `password` → `201` com `user` |
| `get_logged.php` | GET | sim | busca no banco o usuário da sessão |
| `login.php` | POST | não | `email`, `password` → grava a sessão |
| `logout.php` | POST | sim | apaga a sessão |

O `GET` em `index.php` é só para demonstração: em uma aplicação real, listar todos os usuários exigiria login e permissão.

### Tarefa — `/api/task/`

| URL | Método | Login? | Corpo / retorno |
| :--- | :--- | :--- | :--- |
| `index.php` | GET | sim | tarefas do usuário logado |
| `index.php` | POST | sim | `task` → `201` |

Os dois endpoints de tarefa leem o `id` do usuário da sessão, nunca do corpo da requisição. É isso que impede um usuário de cadastrar tarefa na conta de outro.

## Testando com curl

O login devolve um cookie de sessão; guarde-o com `-c` e envie de volta com `-b`:

```bash
# cadastro (troque o e-mail se já existir)
curl -X POST \
  -F "name=Maria Silva" \
  -F "email=maria.silva@email.com" \
  -F "password=asdf1234" \
  "http://localhost/api/user/index.php"

# login
curl -c cookies.txt -X POST \
  -F "email=maria.silva@email.com" \
  -F "password=asdf1234" \
  "http://localhost/api/user/login.php"

# usuário logado
curl -b cookies.txt "http://localhost/api/user/get_logged.php"

# tarefas do usuário logado
curl -b cookies.txt "http://localhost/api/task/index.php"

# nova tarefa
curl -b cookies.txt -X POST \
  -F "task=Estudar para a prova" \
  "http://localhost/api/task/index.php"

# logout
curl -b cookies.txt -X POST "http://localhost/api/user/logout.php"
```

## Coleção do Bruno

A pasta `collection/` tem as mesmas requisições, na ordem da aula:

1. `usuario insere`
2. `usuario lista`
3. `usuario login`
4. `usuario logado`
5. `tarefa adiciona`
6. `tarefa lista`
7. `usuario logout`

Rode o login antes das requisições protegidas: o Bruno reaproveita o cookie da sessão. Se o e-mail do cadastro já existir, troque por outro.

## Páginas

| Página | O que faz | Endpoints |
| :--- | :--- | :--- |
| [`login/`](./login/) | autentica e guarda a sessão | `POST /api/user/login.php` |
| [`cadastro/`](./cadastro/) | cria usuário e volta para o login | `POST /api/user/index.php` |
| [`tarefas/`](./tarefas/) | mostra o nome, lista e cadastra tarefas | `GET /api/user/get_logged.php`, `GET /api/task/index.php`, `POST /api/task/index.php` |

O visual fica em `componentes/base.css`, importado por todas as páginas. O `showToast()` mostra o resultado das ações; o `confirmar()` do `modal.js` fica disponível para quando a página precisar confirmar algo antes de apagar.

## Banco de dados

`database.sql` cria o banco `aula` e as tabelas:

- `users`: `id`, `name`, `email`, `password` (hash gerado por `password_hash()`).
- `tasks`: `id`, `user_id`, `description`.

A senha nunca é guardada em texto puro. O `login.php` compara a senha digitada com o hash usando `password_verify()`.

## Erros comuns

- **`Arquivo .env não encontrado`:** falta copiar `10-php-banco-dados/tarefas-sessao/.env.example` para `10-php-banco-dados/tarefas-sessao/.env`.
- **`Você não está logado`:** faça o login antes de abrir as tarefas; no Bruno, rode a requisição de login primeiro.
- **`Método não permitido` (405):** confira se a requisição usa `GET` ou `POST` conforme a tabela de endpoints.
- **`Usuário já existe`:** o e-mail já está em `users`; use outro.
- **JSON inválido ou página em branco:** abra a aba Network do navegador e veja a resposta crua. Normalmente é um erro de PHP antes do `json_encode()`.
- **Erro ao conectar no banco:** confira se o container `mysql` está rodando e se o `.env` aponta para `DB_HOST=mysql`.

## Para praticar

1. Crie `api/task/delete.php` respondendo ao método `DELETE`, apagando só a tarefa do usuário logado. Use `confirmar()` antes de excluir na página.
2. Crie `api/user/get.php` respondendo a `GET` com `?id=`, para mostrar um usuário só.
3. Mostre a data de criação das tarefas: acrescente `created_at` na tabela e devolva o campo no `get_list`.

## Resumo

- A API é separada por escopo: `user` e `task`, cada um com seu `index.php`.
- O `index.php` escolhe a operação pelo método HTTP e inclui o arquivo certo.
- A sessão guarda o usuário no login; as tarefas usam o `id` da sessão, não o do formulário.
- Toda resposta é JSON, com `error: true` quando algo deu errado.
- O front-end só monta a interface: `fetch()` na API, `showToast()` para avisar e `createElement` para a lista.
