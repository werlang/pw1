<?php
// TODO: Implementar cancelamento de reserva

// 1. Iniciar sessão

// 2. Definir header JSON

// 3. Incluir arquivo de conexão

// 4. Verificar autenticação

// 5. Validar se booking_id foi enviado via POST
//    - Se não: retornar erro "ID da reserva é obrigatório"

// 6. Buscar reserva no banco com JOIN:
//    SELECT bookings.id, bookings.user_id, bookings.booking_date, bookings.status, rooms.name as room_name
//    FROM bookings
//    INNER JOIN rooms ON bookings.room_id = rooms.id
//    WHERE bookings.id = ?

// 7. Verificar se a reserva foi encontrada
//    - Se não: retornar erro "Reserva não encontrada"

// 8. Verificar se a reserva pertence ao usuário logado:
//    - Comparar $booking['user_id'] com $_SESSION['user_id']
//    - Se diferente: retornar erro "Você não tem permissão para cancelar esta reserva"

// 9. Verificar se o status não é 'completed':
//    - Se for: retornar erro "Não é possível cancelar uma reserva já concluída"

// 10. Verificar se o status não é 'cancelled':
//     - Se for: retornar erro "Esta reserva já está cancelada"

// 11. Atualizar status da reserva para 'cancelled':
//     - UPDATE bookings SET status = 'cancelled' WHERE id = ?

// 12. Retornar JSON de sucesso:
//     - message: "Reserva cancelada com sucesso"
//     - data: { booking_id, room_name, booking_date, status: 'cancelled' }
