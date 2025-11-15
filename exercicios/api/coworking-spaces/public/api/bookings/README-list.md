# Questão 2 - Listagem de Reservas com Filtros

## Objetivo
Implementar listagem de reservas do usuário logado com suporte a múltiplos filtros opcionais.

## ⚠️ O QUE VOCÊ DEVE FAZER

Abra o arquivo `list.php` (nesta mesma pasta) e implemente a lógica de listagem seguindo os comentários guia já presentes no arquivo.

## Arquivo
`api/bookings/list.php`

## Método HTTP
GET

## Parâmetros Recebidos via `$_GET` (todos opcionais)

| Parâmetro | Tipo   | Obrigatório | Descrição                                      | Valores Permitidos               |
|-----------|--------|-------------|------------------------------------------------|----------------------------------|
| status    | string | Não         | Filtrar por status da reserva                  | `confirmed`, `cancelled`, `completed` |
| room_type | string | Não         | Filtrar por tipo de sala                       | `meeting`, `private_office`, `event_space`, `phone_booth` |
| date_from | string | Não         | Data inicial (formato: YYYY-MM-DD)             | Data válida                      |
| date_to   | string | Não         | Data final (formato: YYYY-MM-DD)               | Data válida                      |

## Lógica a Implementar

1. Iniciar a sessão com `session_start()`
2. Verificar se o usuário está logado (`$_SESSION['user_id']`)
3. Montar query SQL com JOIN entre `bookings` e `rooms`
4. Aplicar filtros dinamicamente conforme parâmetros recebidos
5. Ordenar por data de reserva (mais recentes primeiro)
6. Retornar array com todas as reservas encontradas

## Query Base

```sql
SELECT 
    bookings.id,
    bookings.booking_date,
    bookings.start_time,
    bookings.end_time,
    bookings.duration_hours,
    bookings.total_price,
    bookings.status,
    bookings.notes,
    rooms.name as room_name,
    rooms.type as room_type,
    rooms.floor,
    rooms.capacity
FROM bookings
INNER JOIN rooms ON bookings.room_id = rooms.id
WHERE bookings.user_id = ?
ORDER BY bookings.booking_date DESC, bookings.start_time DESC
```

## Filtros Dinâmicos

Adicione condições `AND` conforme os parâmetros recebidos:

- Se `status` presente: `AND bookings.status = ?`
- Se `room_type` presente: `AND rooms.type = ?`
- Se `date_from` presente: `AND bookings.booking_date >= ?`
- Se `date_to` presente: `AND bookings.booking_date <= ?`

## Exemplo de Uso

### Request - Sem filtros
```http
GET /api/bookings/list.php
```

### Request - Com filtros
```http
GET /api/bookings/list.php?status=confirmed&room_type=meeting&date_from=2025-11-20&date_to=2025-11-30
```

### Response - Sucesso
```json
{
    "message": "Reservas listadas com sucesso",
    "data": {
        "bookings": [
            {
                "id": 1,
                "booking_date": "2025-11-20",
                "start_time": "09:00:00",
                "end_time": "11:00:00",
                "duration_hours": "2.00",
                "total_price": "90.00",
                "status": "confirmed",
                "notes": "Reunião com investidores",
                "room_name": "Sala Inovação",
                "room_type": "meeting",
                "floor": 1,
                "capacity": 8
            },
            {
                "id": 4,
                "booking_date": "2025-11-20",
                "start_time": "14:00:00",
                "end_time": "15:00:00",
                "duration_hours": "1.00",
                "total_price": "15.00",
                "status": "confirmed",
                "notes": "Ligação importante",
                "room_name": "Cabine Focus 1",
                "room_type": "phone_booth",
                "floor": 1,
                "capacity": 1
            }
        ],
        "total": 2
    }
}
```

### Response - Usuário não autenticado
```json
{
    "error": true,
    "message": "Usuário não autenticado"
}
```

### Response - Nenhuma reserva encontrada
```json
{
    "message": "Reservas listadas com sucesso",
    "data": {
        "bookings": [],
        "total": 0
    }
}
```

## Validações Necessárias

✅ Verificar se usuário está logado  
✅ Usar prepared statements com parâmetros dinâmicos  
✅ JOIN entre `bookings` e `rooms`  
✅ Filtros opcionais aplicados condicionalmente  
✅ Retornar total de registros encontrados

## Conceitos Avaliados

- Verificação de sessão
- Consultas com JOIN entre tabelas
- Construção de queries dinâmicas com filtros opcionais
- Uso correto de prepared statements com múltiplos parâmetros
- Ordenação de resultados
- Retorno estruturado com contagem

## Dicas

- Use arrays para construir a query e os parâmetros dinamicamente
- Exemplo de construção dinâmica:
```php
$where = ["bookings.user_id = ?"];
$params = [$_SESSION['user_id']];

if (!empty($_GET['status'])) {
    $where[] = "bookings.status = ?";
    $params[] = $_GET['status'];
}

$sql = "SELECT ... WHERE " . implode(" AND ", $where) . " ORDER BY ...";
$stmt = $conn->prepare($sql);
$stmt->execute($params);
```
- Use `fetchAll()` para retornar todas as reservas
- Inclua `count($bookings)` no retorno para facilitar paginação futura

## Como Testar

1. Faça login no sistema
2. Navegue para "Minhas Reservas"
3. As reservas devem aparecer na página
4. Teste os filtros (status, tipo de sala, datas)
5. Verifique se os dados da sala (nome, tipo, andar) aparecem corretamente (isso comprova que o JOIN funcionou)
