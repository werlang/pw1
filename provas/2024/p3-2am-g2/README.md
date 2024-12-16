# Sistema de Gerenciamento de Atividades Escolares

Este é um protótipo de sistema acadêmico onde os alunos podem gerenciar suas tarefas, submetendo respostas para atividades passadas pelos professores.

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
│   ├── submit_task.php
│   ├── script.js
│   └── style.css
├── /uploads # Arquivos enviados pelos alunos
├── compose.yaml # Arquivo de configuração do Docker Compose
├── database.sql # Script de criação do banco de dados
├── index.html # Página inicial
└── README.md # Este arquivo
```

Ao acessar o sistema, o usuário é redirecionado para a página de login. Após o login, o usuário é redirecionado para a página de gerenciamento de tarefas, onde ele pode visualizar as tarefas passadas pelos professores e submeter suas respostas.

## Banco de Dados

O banco de dados está descrito no arquivo `database.sql`. Ele já deve estar configurado no seu ambiente de desenvolvimento.

## Servidor Web

O sistema está configurado para rodar em um servidor web no endereço `http://localhost`. Foi também disponibilizado um arquivo `compose.yaml` para facilitar a execução do sistema em um ambiente Docker, caso você prefira.

## Conexão com o Banco de Dados

A conexão com o banco de dados está configurada no arquivo `core/connection.php`. Você pode alterar as variáveis `$host`, `$user`, `$password` e `$database` para refletir as configurações do seu ambiente de desenvolvimento.

## Login de Acesso

O sistema já possui diversos usuários cadastrados como alunos. Todos os usuários possuem a senha `asdf1234`. Os emails para login podem ser consultados no banco de dados.

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

# Questão 2 (3.5 pontos total)

No script `/tasks/script.js`, existe uma requisição do tipo `GET` para o arquivo `/tasks/tasks.php`. Esta requisição é responsável por obter a lista de tarefas do usuário autenticado. Nesta questão, você deve implementar o back-end que retorna a lista de tarefas do usuário.

**(1.5 ponto)** - Você vai precisar buscar no banco de dados as tarefas do usuário autenticado. Utilize a seguinte query SQL para obter as tarefas:

```sql
SELECT id, title, description, deadline FROM tasks WHERE class_id = (SELECT class_id FROM users WHERE id = ?)
```

**(2.0 pontos)** - Para cada tarefa retornada na consulta, você deve verificar se o usuário já submeteu uma resposta para a tarefa. Utilize a seguinte query SQL para recuperar todas as respostas do usuário para uma tarefa:

```sql
SELECT id, file_name FROM submissions WHERE task_id = ? AND student_id = ?
```

Para cada tarefa, adicione um campo `submission` contendo um array com os campos da submissão do aluno, ou `false` caso o aluno não tenha submetido uma resposta para a tarefa.

O JSON de retorno da requisição deve conter um campo `tasks` com a lista de tarefas do usuário. Um exemplo de retorno do back-end é o seguinte:

```json
{
    "tasks": [
        {
            "id": 1,
            "title": "Tarefa 1",
            "description": "Descrição da tarefa 1",
            "deadline": "2024-10-01",
            "submission": [
                {
                    "id": 1,
                    "file_name": "resposta_tarefa_1.pdf"
                }
            ]
        },
        {
            "id": 2,
            "title": "Tarefa 2",
            "description": "Descrição da tarefa 2",
            "deadline": "2024-10-02",
            "submission": false
        }
    ]
}
```

# Questão 3 (5.5 pontos total)

Após a realização da questão 2, o script `/tasks/script.js` monta uma tabela com as tarefas disponíveis para o usuário. Ao clicar em uma tarefa, um modal é aberto com as informações da tarefa e um botão para submissão de respostas, ou para o download da resposta já submetida.

Faça a implementação da requisição para a submissão de respostas para uma tarefa, bem como a implementação do back-end que recebe a submissão e a salva no banco de dados.

**(1.5 ponto)** - No script `/tasks/script.js`, faça a implementação da requisição do tipo `POST` para o arquivo `/tasks/submit_task.php`. Esta requisição deve enviar o formulário (em um FormData) presente na variável `form` do script, bem como um campo `task_id` presente na variável `taskId`.

O resultado devolvido pelo back-end deve ser armazenado como um objeto na variável `data`.

**(2.0 ponto)** - No arquivo `/tasks/submit_task.php`, receba o arquivo enviado pelo aluno e salve-o no diretório `/upload` com um nome único. Este nome único deverá ser gerado usando a função `md5(microtime())`, e com a mesma extensão do arquivo enviado.

**(2.0 ponto)** - Após salvar o arquivo, insira a submissão no banco de dados. Utilize a seguinte query SQL para inserir a submissão:

```sql
INSERT INTO submissions (task_id, student_id, file_name) VALUES (?, ?, ?)
```

O campo `task_id` deve ser o valor recebido na requisição, o campo `student_id` deve ser o ID do usuário autenticado, e o campo `file_name` deve ser o nome do arquivo salvo.

O back-end deve retornar um JSON com o seguinte formato:

```json
{
    "message": "Resposta submetida com sucesso"
}
```
