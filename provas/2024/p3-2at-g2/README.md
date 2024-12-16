# Sistema de Gerenciamento de Atividades Escolares - Área do Professor

Este protótipo estende o sistema acadêmico para incluir funcionalidades voltadas aos professores, permitindo que eles visualizem e avaliem as submissões dos alunos.

## Estrutura do Sistema

O sistema é organizado da seguinte forma:

```
/
├── /core # Módulos principais do sistema
│   ├── connection.php # Conexão com o banco de dados
│   └── session.php # Gerenciamento de sessão
├── /helpers # Funções e arquivos auxiliares
│   ├── /css 
│   │   ├── common.css
│   │   ├── modal.css
│   │   └── toast.css
│   └── /js
│       ├── modal.js
│       └── toast.js
├── /login # Página de login
│   ├── index.html
│   ├── login.php 
│   ├── script.js
│   └── style.css
├── /logout # Página de logout
│   ├── index.html
│   └── logout.php
├── /tasks # Página de gerenciamento de tarefas
│   ├── index.html
│   ├── tasks.php
│   ├── class-list.php
│   ├── evaluate.php
│   ├── script.js
│   └── style.css
├── compose.yaml # Arquivo de configuração do Docker Compose
├── database.sql # Script de criação do banco de dados
├── index.html # Página inicial
└── README.md # Este arquivo
```

Ao acessar o sistema, o usuário é redirecionado para a página de login. Após o login, o usuário é redirecionado para a página de gerenciamento de tarefas, onde ele pode visualizar as tarefas passadas para as turmas e avaliar as submissões dos alunos.

## Banco de Dados

O banco de dados está descrito no arquivo `database.sql`. Ele já deve estar configurado no seu ambiente de desenvolvimento.

## Servidor Web

O sistema está configurado para rodar em um servidor web no endereço `http://localhost`. Foi também disponibilizado um arquivo `compose.yaml` para facilitar a execução do sistema em um ambiente Docker, caso você prefira.

## Conexão com o Banco de Dados

A conexão com o banco de dados está configurada no arquivo `core/connection.php`. Você pode alterar as variáveis `$host`, `$user`, `$password` e `$database` para refletir as configurações do seu ambiente de desenvolvimento.

## Login de Acesso

O sistema já possui diversos usuários cadastrados como alunos e professores. Todos os usuários possuem a senha `asdf1234`. Os emails para login podem ser consultados no banco de dados.

# Questão 1 (1.0 ponto total)

Faça nos arquivos `index.html` e `/tasks/script.js` a verificação de sessão.

**(0.5 pontos)** - No arquivo `index.html`, faça a verificação de sessão, fazendo uma requisição do tipo `GET` para o arquivo `core/session.php`. O back-end deste script já está implementado e retorna um JSON com o seguinte formato:

```json
{
    "error": true,
    "message": "Usuário não autenticado"
}
```

Ou

```json
{
    "message": "Usuário autenticado",
    "user": <INFORMAÇÕES DA SESSÃO DO USUÁRIO>
}
```

Caso o usuário não esteja autenticado, redirecione-o para a página de login `/login`. Caso contrário, redirecione-o para a página de gerenciamento de tarefas `/tasks`.

**(0.5 pontos)** - No arquivo `/tasks/script.js`, faça a verificação de sessão, igual ao procedimento feito no arquivo `index.html`. Caso o usuário não esteja autenticado, redirecione-o para a página de login `/login`.

# Questão 2 (1.0 ponto)

O sistema já possui a funcionalidade de login implementada. No entanto, é necessário adicionar uma verificação para garantir que apenas usuários com a função de professor possam acessar a área de gerenciamento de tarefas.

No arquivo `/login/login.php`, o fluxo de autenticação de usuário já está implementado. Você deve adicionar a verificação para garantir que apenas usuários com a função de professor possam acessar a área de gerenciamento de tarefas. Um usuário é considerado professor se o campo `role` da tabela `users` for igual a **1**.

Caso o usuário autenticado não seja um professor, o script deve retornar um JSON com o seguinte formato:

```json
{
    "error": true,
    "message": "Usuário não é um professor"
}
```

# Questão 3 (4 pontos)

Quando o professor acessa a página de gerenciamento de tarefas `/tasks`, ele visualiza uma lista com as turmas disponíveis. Esta funcionalidade já está implementada. A partir daí o professor pode visualizar as tarefas passadas para as turmas e avaliar as submissões dos alunos.

**(1 ponto)** - No script `/tasks/script.js`, quando o usuário escolhe uma das turmas no select, deve ser feita uma requisição do tipo `GET` para o arquivo `/tasks/tasks.php` passando o `id` da turma selecionada. Envie esta informação via parâmetro `GET` na URL com o nome `class_id`.

**(1.5 pontos)** - No script `/tasks/tasks.php`, faça a consulta no banco de dados para retornar todas as tarefas passadas para a turma selecionada, cujo autor seja o professor autenticado. Utilize a seguinte query:

```sql
SELECT id, title, description, deadline FROM tasks WHERE author = ? AND class_id = ?
```

As informações do usuário autenticado podem ser obtidas através da sessão.

**(1.5 pontos)** - Para cada tarefa retornada, busque no banco de dados as submissões dos alunos para aquela tarefa. Utilize a seguinte query:

```sql
SELECT s.id, u.name, s.file_name, s.submission_date, s.grade, s.feedback FROM submissions s INNER JOIN users u ON u.id = s.student_id WHERE s.task_id = ?
```

Guarde as informações das submissões no array da tarefa, usando a chave `submissions`. Retorne as tarefas em formato JSON, segundo o seguinte formato:

```json
{
    "tasks": [
        {
            "id": 1,
            "title": "Tarefa 1",
            "description": "Descrição da tarefa 1",
            "deadline": "2024-10-01",
            "submissions": [
                {
                    "id": 1,
                    "name": "Aluno 1",
                    "file_name": "submission1.pdf",
                    "submission_date": "2024-09-30",
                    "grade": 8.5,
                    "feedback": "Bom trabalho!"
                },
                {
                    "id": 2,
                    "name": "Aluno 2",
                    "file_name": "submission2.pdf",
                    "submission_date": "2024-09-30",
                    "grade": 7.0,
                    "feedback": "Poderia melhorar..."
                }
            ]
        }
    ]
}
```

# Questão 4 (4 pontos)

Quando o professor clica em uma tarefa, a lista de submissões dos alunos é exibida. O professor pode então avaliar cada submissão, clicando no botão "Avaliar".
Quando o professor acessa clica no botão "Avaliar" de uma submissão, um modal é aberto com um formulário para atribuir uma nota e feedback ao aluno.

**(1.2 ponto)** - No script `/tasks/script.js`, crie uma requisição do tipo `POST` para enviar os dados de avaliação ao back-end através do formulário. Envie também o `id` da submissão no campo `submission_id`.

Guarda as informações recebidas como resposta na variável `data`.

**(1.3 ponto)** - No script `/tasks/evaluate.php`, verifique se o usuário autenticado é um professor. Caso contrário, retorne um JSON com a seguinte estrutura:

```json
{
    "error": true,
    "message": "Usuário não é um professor"
}
```

**(1.5 pontos)** - Implemente no script `/tasks/evaluate.php` a lógica para que o back-end receba os dados enviados do formulário e faça a atualização da nota e feedback da submissão no banco de dados. Utilize a seguinte query:

```sql
UPDATE submissions SET grade = ?, feedback = ? WHERE id = ?
```

Retorne um JSON com a seguinte estrutura:

```json
{
    "message": "Avaliação salva com sucesso",
    "evaluation": {
        "grade": 8.5,
        "feedback": "Bom trabalho!"
    }
}
```
