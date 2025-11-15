# Questão 2 - Listagem de Itens

## Objetivo

Implementar o endpoint que retorna os itens disponíveis na feira de trocas, com suporte a filtros.

## Arquivo a Implementar

`list.php` (nesta pasta: `/api/items/`)

## Contexto

A página principal (`/`) exibe uma lista de todos os itens disponíveis para troca. O frontend JavaScript faz requisições GET para `/api/items/list.php` para buscar os dados.

### Parâmetros Opcionais (via GET)

- `category`: Filtro opcional para retornar apenas itens de uma categoria específica
  - Valores: ID numérico da categoria (1, 2, 3, etc.)
  - Se não for informado, retorna itens de todas as categorias

- `status`: Filtro opcional para retornar apenas itens com status específico
  - Valores possíveis: `open`, `pending`, `closed`
  - Se não for informado, retorna itens de todos os status

- `q`: Filtro opcional para busca por texto
  - Busca no título e descrição do item
  - Se não for informado, não aplica filtro de texto

## Implementação

### 1. Inclui a Conexão

Inclua o arquivo `connection.php` que está na pasta `/api/`.

### 2. Monta a Query Base

Comece com uma query que busca todos os itens com JOIN nas tabelas relacionadas:
- JOIN com `categories` para obter o nome da categoria
- JOIN com `users` para obter o nome do dono
- Ordene por data de criação (mais recentes primeiro)

### 3. Aplica Filtros Dinamicamente

Verifique cada parâmetro GET e adicione condições WHERE conforme necessário:
- Se `category` foi informado, filtre por `category_id`
- Se `status` foi informado, filtre por `status`
- Se `q` foi informado, use LIKE para buscar em `title` e `description`

**Dica:** Use array de condições e implode com AND:
```php
$conditions = [];
if (!empty($_GET['category'])) {
    $conditions[] = "category_id = :category";
}
// ... adicione outras condições

if (count($conditions) > 0) {
    $query .= " WHERE " . implode(" AND ", $conditions);
}
```

### 4. Busca os Itens e Retorna o Resultado

Execute a query com os parâmetros apropriados e retorne o resultado.

## Estrutura da Resposta

### Sucesso
```json
{
    "message": "Itens encontrados",
    "items": [
        {
            "id": 1,
            "title": "Harry Potter - Coleção Completa",
            "description": "Coleção dos 7 livros em ótimo estado, capa dura",
            "category_id": 1,
            "category_name": "Livros",
            "owner_id": 1,
            "owner_name": "Ana Costa",
            "suggested_value": "150.00",
            "status": "open",
            "created_at": "2025-11-14 10:30:00"
        }
    ]
}
```

### Erro (caso ocorra)
```json
{
    "error": true,
    "message": "Erro ao buscar itens"
}
```

## Como Testar

1. Acesse `http://localhost/` (página principal)
2. A página deve exibir todos os itens cadastrados
3. Teste os filtros:
   - Selecione uma categoria no dropdown
   - Digite texto no campo de busca
   - Clique nos botões de status (Abertos, Pendentes, Fechados)
4. Verifique no console do navegador (F12) se as requisições estão retornando os dados corretos

## Conceitos Importantes

### Filtros Dinâmicos com PDO
```php
$query = "SELECT * FROM items WHERE 1=1";
$params = [];

if (!empty($_GET['status'])) {
    $query .= " AND status = :status";
    $params['status'] = $_GET['status'];
}

$stmt = $conn->prepare($query);
$stmt->execute($params);
```

### LIKE para Busca de Texto
```php
$query .= " AND (title LIKE :search OR description LIKE :search)";
$params['search'] = '%' . $_GET['q'] . '%';
```

## Checklist

- [ ] Incluir `connection.php`
- [ ] Criar query base com JOINs (categories e users)
- [ ] Implementar filtro por categoria
- [ ] Implementar filtro por status
- [ ] Implementar busca por texto (título e descrição)
- [ ] Usar prepared statements com parâmetros
- [ ] Ordenar por data de criação (DESC)
- [ ] Retornar JSON com estrutura correta
- [ ] Testar todos os filtros
