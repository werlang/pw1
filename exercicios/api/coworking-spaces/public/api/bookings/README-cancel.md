# Questão 4 - Cancelar Reserva

## Objetivo
Implementar cancelamento de reservas com validação de propriedade e regras de negócio.

## ⚠️ O QUE VOCÊ DEVE FAZER

Abra o arquivo `cancel.php` (nesta mesma pasta) e implemente a lógica de cancelamento seguindo os comentários guia já presentes no arquivo.

## Arquivo
`api/bookings/cancel.php`

## Método HTTP
POST

## Parâmetros Recebidos via `$_POST`

| Parâmetro  | Tipo | Obrigatório | Descrição                     |
|------------|------|-------------|-------------------------------|
| booking_id | int  | Sim         | ID da reserva a ser cancelada |

## Lógica a Implementar

1. Iniciar a sessão e verificar autenticação
2. Validar se `booking_id` foi enviado
3. Buscar a reserva no banco
4. Verificar se a reserva existe
5. Verificar se a reserva pertence ao usuário logado (segurança)
6. Verificar se a reserva já não está cancelada ou concluída
7. Atualizar o status da reserva para `cancelled`
8. Retornar sucesso com informações da reserva cancelada

## Regras de Negócio

- ❌ Não permitir cancelar reserva de outro usuário
- ❌ Não permitir cancelar reserva com status `completed` (já ocorreu)
- ❌ Não permitir cancelar reserva já `cancelled`
- ✅ Apenas reservas `confirmed` podem ser canceladas

## Exemplo de Uso

### Request
```http
POST /api/bookings/cancel.php
Content-Type: application/x-www-form-urlencoded

booking_id=5
```

### Response - Sucesso
```json
{
    "message": "Reserva cancelada com sucesso",
    "data": {
        "booking_id": 5,
        "room_name": "Sala Workshop",
        "booking_date": "2025-11-23",
        "status": "cancelled"
    }
}
```

### Response - Booking ID não enviado
```json
{
    "error": true,
    "message": "ID da reserva é obrigatório"
}
```

### Response - Reserva não encontrada
```json
{
    "error": true,
    "message": "Reserva não encontrada"
}
```

### Response - Reserva pertence a outro usuário
```json
{
    "error": true,
    "message": "Você não tem permissão para cancelar esta reserva"
}
```

### Response - Reserva já concluída
```json
{
    "error": true,
    "message": "Não é possível cancelar uma reserva já concluída"
}
```

### Response - Reserva já cancelada
```json
{
    "error": true,
    "message": "Esta reserva já está cancelada"
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
✅ Validar se `booking_id` foi enviado  
✅ Verificar se a reserva existe  
✅ Verificar propriedade da reserva (`user_id` == `$_SESSION['user_id']`)  
✅ Verificar se status não é `completed`  
✅ Verificar se status não é `cancelled`  
✅ Atualizar status para `cancelled`

## Query Recomendada

### Buscar reserva com informações da sala
```sql
SELECT 
    bookings.id,
    bookings.user_id,
    bookings.booking_date,
    bookings.status,
    rooms.name as room_name
FROM bookings
INNER JOIN rooms ON bookings.room_id = rooms.id
WHERE bookings.id = ?
```

### Atualizar status
```sql
UPDATE bookings SET status = 'cancelled' WHERE id = ?
```

## Conceitos Avaliados

- Verificação de sessão e autenticação
- Validação de propriedade (segurança)
- Lógica condicional complexa (múltiplas validações)
- UPDATE com prepared statements
- JOIN para buscar dados relacionados
- Tratamento de diferentes cenários de erro

## Dicas

- Primeiro busque a reserva com JOIN para pegar o nome da sala
- Valide todas as condições antes de fazer o UPDATE
- A ordem das validações importa para as mensagens de erro
- Use `$booking['user_id'] != $_SESSION['user_id']` para verificar propriedade
- Não é necessário fazer novo SELECT após o UPDATE, use os dados que já buscou

## Como Testar

1. Faça login no sistema
2. Vá para "Minhas Reservas"
3. Encontre uma reserva com status "Confirmada" (badge verde)
4. Clique no botão "Cancelar Reserva"
5. Confirme o cancelamento no popup
6. A reserva deve:
   - Mudar o status para "Cancelada" (badge vermelho)
   - O botão de cancelar deve desaparecer
7. Tente cancelar novamente a mesma reserva - deve dar erro "Esta reserva já está cancelada"

## Dicas de Implementação

- Faça as validações na ordem correta (existe? → é sua? → pode cancelar?)
- Use mensagens de erro específicas para cada situação
- O JOIN é importante para retornar o nome da sala na resposta
