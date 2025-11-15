<?php
// TODO: Implementar listagem de reservas com filtros

// 1. Iniciar sessão

// 2. Definir header JSON

// 3. Incluir arquivo de conexão

// 4. Verificar se usuário está autenticado
//    - Se não: retornar erro "Usuário não autenticado"

// 5. Construir query SQL base com JOIN:
//    SELECT bookings.*, rooms.name as room_name, rooms.type as room_type, rooms.floor, rooms.capacity
//    FROM bookings
//    INNER JOIN rooms ON bookings.room_id = rooms.id
//    WHERE bookings.user_id = ?

// 6. Adicionar filtros opcionais (use arrays para construir dinamicamente):
//    - Se $_GET['status'] presente: AND bookings.status = ?
//    - Se $_GET['room_type'] presente: AND rooms.type = ?
//    - Se $_GET['date_from'] presente: AND bookings.booking_date >= ?
//    - Se $_GET['date_to'] presente: AND bookings.booking_date <= ?

// 7. Adicionar ORDER BY bookings.booking_date DESC, bookings.start_time DESC

// 8. Executar query com prepared statement
//    - Lembre-se de passar todos os parâmetros no array

// 9. Buscar todos os resultados com fetchAll()

// 10. Retornar JSON:
//     - message: "Reservas listadas com sucesso"
//     - data: { bookings: array de reservas, total: count($bookings) }
