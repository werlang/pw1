# Sistema de Gerenciamento de Aluguéis de Livros

Você deve implementar o backend (PHP) de um sistema para gerenciar aluguéis de livros de uma biblioteca. O sistema deve permitir login de usuários, listagem, registro e atualização de aluguéis de livros.

Todo o frontend já está implementado e funcionando. Sua responsabilidade é apenas implementar os arquivos PHP na pasta `api/`.

O dump do banco de dados está disponível no arquivo `api/database.sql`.

Todas as questões envolvem a manipulação de dados com PHP, uso de PDO para consultas SQL, tratamento de sessões e retorno de JSON. NENHUMA questão envolve a manipulação do frontend, HTML, CSS ou JavaScript.

## Como Rodar o Projeto

1. Importe o arquivo `api/database.sql` no MySQL
2. Configure o arquivo `api/connection.php` com suas credenciais:
   - Host: `localhost` ou `mysql` (se usando Docker do repositório raiz)
   - Usuário: `root`
   - Senha: sua senha do MySQL
   - Porta: `3306`
3. Acesse `http://localhost/challenges/library-rental/public/login/` no navegador

## Questões

- Questão 1: [Login de Usuários](api/auth/README-login.md)
- Questão 2: [Busca Avançada de Aluguéis](api/rentals/README-list.md)
- Questão 3: [Registrar Novo Aluguel com Validações](api/rentals/README-add.md)
- Questão 4: [Renovar Aluguel com Extensão de Prazo](api/rentals/README-update.md)

Cada questão possui um arquivo README na pasta correspondente da API com as instruções detalhadas sobre o que deve ser implementado.

Você deve implementar os arquivos PHP dentro das pastas `api/auth/` e `api/rentals/`.

## Novidades Neste Exercício

Este exercício inclui funcionalidades mais avançadas que exigem adaptação:

1. **Busca Textual com Múltiplos Filtros** (Questão 2): Combine filtros de status com busca por título/autor/gênero usando LIKE
2. **Validação de ISBN e Cálculo de Datas** (Questão 3): Valide formato ISBN com regex e calcule datas automaticamente
3. **Duas Ações em Um Endpoint** (Questão 4): Implemente lógica condicional para alterar status OU renovar aluguel

## Estrutura do Banco de Dados

O banco possui duas tabelas principais:

### Tabela `users`
- `id`: Identificador único do usuário
- `name`: Nome completo do usuário
- `email`: Email do usuário (usado para login)
- `password`: Senha do usuário (armazenada com hash bcrypt)
- `membership_type`: Tipo de membro (`standard`, `premium` ou `student`)

**Nota:** As senhas de teste estão hasheadas. Use `password_verify()` para validação.

### Tabela `rentals`
- `id`: Identificador único do aluguel
- `user_id`: ID do usuário que fez o aluguel
- `book_title`: Título do livro alugado
- `author`: Autor do livro
- `isbn`: Código ISBN do livro
- `genre`: Gênero literário (ex: Ficção, Romance, Suspense)
- `rental_date`: Data em que o livro foi alugado
- `due_date`: Data de devolução prevista
- `status`: Status do aluguel (`active`, `returned` ou `overdue`)
- `created_at`: Data e hora de criação do registro

## Padrão de Resposta das APIs

Todas as APIs devem retornar JSON com a seguinte estrutura:

### Em caso de sucesso:
```json
{
    "message": "Mensagem descritiva do sucesso",
    "data": {
        // dados específicos da operação
    }
}
```

### Em caso de erro:
```json
{
    "error": true,
    "message": "Mensagem descritiva do erro"
}
```

## Sessões

O sistema utiliza sessões PHP para manter o usuário logado. 
Certifique-se de iniciar a sessão com `session_start()` no início de cada script que manipula autenticação ou dados do usuário.

### Bônus 

Você pode ganhar mais 0.5 pontos (máximo 10 pontos total) se implementar um único script `/api/session.php` que contenha a lógica de verificação de sessão (iniciar sessão e checar se o usuário está logado). Cada script de API que precise dessa verificação deve apenas incluir esse arquivo no início.

## Dados de Teste

Use as seguintes credenciais para testar o sistema:
- **Email:** ana@biblioteca.com
- **Senha:** asdf1234

Existem outros usuários de teste no banco de dados, todos com a mesma senha.
