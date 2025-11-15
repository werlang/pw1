# Questão 3 - Criar Nova Reserva

## Objetivo
Implementar criação de novas reservas com cálculo automático de duração e preço total.

## ⚠️ O QUE VOCÊ DEVE FAZER

Abra o arquivo `add.php` (nesta mesma pasta) e implemente a lógica de criação de reservas seguindo os comentários guia já presentes no arquivo.

## Arquivo
`api/bookings/add.php`

## Método HTTP
POST

## Parâmetros Recebidos via `$_POST`

| Parâmetro     | Tipo   | Obrigatório | Descrição                          |
|---------------|--------|-------------|------------------------------------|
| room_id       | int    | Sim         | ID da sala a ser reservada         |
| booking_date  | string | Sim         | Data da reserva (YYYY-MM-DD)       |
| start_time    | string | Sim         | Horário de início (HH:MM)          |
| end_time      | string | Sim         | Horário de término (HH:MM)         |
| notes         | string | Não         | Observações sobre a reserva        |

## Lógica a Implementar

1. Iniciar a sessão e verificar autenticação
2. Validar todos os campos obrigatórios
3. Buscar informações da sala (especialmente `hourly_rate`)
4. Calcular a duração em horas usando `TIMESTAMPDIFF(MINUTE, start_time, end_time) / 60`
5. Calcular o preço total: `duration_hours * hourly_rate`
6. Inserir a reserva com status `confirmed`
7. Retornar sucesso com o ID da reserva criada

## Cálculo de Duração e Preço

Para calcular a duração, você pode usar MySQL:
```sql
SELECT TIMESTAMPDIFF(MINUTE, '09:00:00', '11:00:00') / 60 as duration
-- Resultado: 2.00 horas
```

Ou em PHP:
```php
$start = new DateTime($start_time);
$end = new DateTime($end_time);
$interval = $start->diff($end);
$duration_hours = $interval->h + ($interval->i / 60);
```

O preço total é simplesmente: `duration_hours * hourly_rate`

## Exemplo de Uso

### Request
```http
POST /api/bookings/add.php
Content-Type: application/x-www-form-urlencoded

room_id=1&booking_date=2025-11-25&start_time=10:00&end_time=12:30&notes=Reunião de planejamento
```

### Response - Sucesso
```json
{
    "message": "Reserva criada com sucesso",
    "data": {
        "booking_id": 12,
        "room_name": "Sala Inovação",
        "booking_date": "2025-11-25",
        "start_time": "10:00",
        "end_time": "12:30",
        "duration_hours": 2.5,
        "total_price": 112.5
    }
}
```

### Response - Campos obrigatórios faltando
```json
{
    "error": true,
    "message": "Todos os campos obrigatórios devem ser preenchidos"
}
```

### Response - Sala não encontrada
```json
{
    "error": true,
    "message": "Sala não encontrada"
}
```

### Response - Horário inválido
```json
{
    "error": true,
    "message": "Horário de término deve ser posterior ao horário de início"
}
```

### Response - Usuário não autenticado
```json
{
    "error": true,
    "message": "Usuário não autenticado"
}
```

## Validações Necessárias

✅ Verificar se usuário está logado  
✅ Validar campos obrigatórios (`room_id`, `booking_date`, `start_time`, `end_time`)  
✅ Verificar se a sala existe  
✅ Validar se `end_time` é posterior a `start_time`  
✅ Calcular `duration_hours` automaticamente  
✅ Calcular `total_price` automaticamente  
✅ Inserir com status `confirmed`

## Conceitos Avaliados

- Verificação de sessão
- Validação de múltiplos campos
- Consulta para buscar dados relacionados (sala)
- Cálculo de valores derivados (duração e preço)
- INSERT com prepared statements
- Uso de `lastInsertId()` para retornar ID criado
- Lógica de validação de horários

## Dicas

- Busque primeiro a sala para pegar o `hourly_rate` e o `name`
- Valide os horários antes de calcular duração
- Use `$conn->lastInsertId()` após o INSERT para pegar o ID da reserva criada
- O campo `notes` é opcional, use `NULL` se não for enviado
- Para validar horários em PHP:
```php
if ($end_time <= $start_time) {
    // erro
}
```
- Formate os valores decimais com 2 casas: `round($value, 2)`

## Como Testar

1. Faça login no sistema
2. Clique em "Nova Reserva" no menu
3. Preencha o formulário:
   - Escolha uma sala
   - Selecione uma data (hoje ou futura)
   - Defina horários (ex: 09:00 a 11:00)
   - Adicione observações (opcional)
4. Clique em "Criar Reserva"
5. Se funcionar, você será redirecionado para "Minhas Reservas"
6. Verifique se a reserva aparece com:
   - Duração correta (ex: 2h para 09:00-11:00)
   - Preço correto (ex: R$ 90,00 para 2h × R$ 45/h)

## Validações Importantes

- O sistema deve calcular automaticamente duração e preço (não confie no que vem do frontend)
- Valide se end_time > start_time
- Certifique-se de buscar o hourly_rate correto da sala escolhida
