# Questão 2 - Busca Avançada de Aluguéis

## Objetivo

Implementar um endpoint de busca que permite filtrar aluguéis por múltiplos critérios simultaneamente, incluindo busca textual.

## Arquivo a Implementar

`list.php` (nesta pasta: `/api/rentals/`)

## Contexto

A página `/rentals/` exibe uma lista de aluguéis de livros do usuário logado. O frontend JavaScript faz requisições GET para `/api/rentals/list.php` para buscar os dados.

### Parâmetros Opcionais (via GET)

- `status`: Filtro opcional para retornar apenas aluguéis com status específico
  - Valores possíveis: `active`, `returned`, `overdue`
  - Se não for informado, retorna todos os aluguéis
- `search`: Termo de busca textual (NOVO)
  - Busca em `book_title`, `author` e `genre`
  - Use operador `LIKE` com wildcards (`%termo%`)
  - Se vazio ou não enviado, não aplica filtro de busca

## Implementação

### 1. Inicia a Sessão e Verifica Autenticação
- Use `session_start()` no início
- Verifique se `$_SESSION['user_id']` existe
- Se não existir, retorne erro de não autenticado

### 2. Inclui a Conexão
```php
include "../connection.php";
```

### 3. Obtém o ID do Usuário da Sessão
```php
$user_id = $_SESSION['user_id'];
```

### 4. Verifica se Há Filtro de Status e Busca Textual
Capture os parâmetros `status` E `search` do GET, se existirem.

### 5. Monta a Query com Filtros Dinâmicos

Você precisa construir uma query que combine múltiplos filtros opcionais:

- Sempre filtrar por `user_id` do usuário logado
- Se `status` foi enviado E é válido, adicionar `AND status = ?`
- Se `search` foi enviado E não está vazio, adicionar:
  ```sql
  AND (book_title LIKE ? OR author LIKE ? OR genre LIKE ?)
  ```
- Ordenar por `created_at DESC`

**Dica:** Use um array para acumular os parâmetros do prepared statement:
```php
$params = [$user_id];
if ($status && in_array($status, ['active', 'returned', 'overdue'])) {
    $params[] = $status;
}
if ($search && $search !== '') {
    $search_term = "%$search%";
    $params[] = $search_term;
    $params[] = $search_term;
    $params[] = $search_term;
}
```

### 6. Busca os Aluguéis e Retorna o Resultado
Use `fetchAll()` para obter todos os resultados.

## Estrutura da Resposta

### Sucesso
```json
{
    "message": "Aluguéis encontrados",
    "rentals": [
        {
            "id": 1,
            "user_id": 1,
            "book_title": "1984",
            "author": "George Orwell",
            "isbn": "978-0451524935",
            "genre": "Ficção Científica",
            "rental_date": "2025-11-01",
            "due_date": "2025-11-15",
            "status": "active",
            "created_at": "2025-11-01 10:30:00"
        }
    ]
}
```

### Erro (não autenticado)
```json
{
    "error": true,
    "message": "Usuário não autenticado"
}
```

## Como Testar

1. Faça login no sistema (`/login/`)
2. Você será redirecionado automaticamente para `/rentals/`
3. A página deve exibir os aluguéis do usuário logado
4. Teste os botões de filtro (Todos, Ativos, Devolvidos, Atrasados)
5. Verifique no console do navegador (F12) se as requisições estão retornando os dados corretos

## Checklist

- [ ] `session_start()` no início do arquivo
- [ ] Verificação de autenticação (`$_SESSION['user_id']`)
- [ ] Inclusão do arquivo `connection.php`
- [ ] Captura dos parâmetros `status` e `search` do GET
- [ ] Construção dinâmica da query SQL
- [ ] Array de parâmetros para prepared statement
- [ ] Filtro por `user_id` sempre presente
- [ ] Filtro de status condicional (se válido)
- [ ] Filtro de busca textual com LIKE em 3 campos
- [ ] Ordenação por `created_at DESC`
- [ ] Uso de `fetchAll()`
- [ ] Retorno JSON com estrutura correta

## Exemplo de Teste

```
GET /api/rentals/list.php?status=active&search=orwell
```
Deve retornar apenas aluguéis ativos que contenham "orwell" no título, autor ou gênero.
