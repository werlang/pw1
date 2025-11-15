<?php
// TODO: Implementar criação de nova reserva

// 1. Iniciar sessão

// 2. Definir header JSON

// 3. Incluir arquivo de conexão

// 4. Verificar autenticação

// 5. Validar campos obrigatórios recebidos via POST:
//    - room_id, booking_date, start_time, end_time
//    - Se faltando: retornar erro "Todos os campos obrigatórios devem ser preenchidos"

// 6. Buscar informações da sala no banco:
//    - SELECT id, name, hourly_rate FROM rooms WHERE id = ?
//    - Se não encontrada: retornar erro "Sala não encontrada"

// 7. Validar horários:
//    - Verificar se end_time > start_time
//    - Se não: retornar erro "Horário de término deve ser posterior ao horário de início"

// 8. Calcular duração em horas:
//    - Opção 1: Usar DateTime e DateInterval do PHP
//    - Opção 2: Usar TIMESTAMPDIFF do MySQL
//    - Dica: $duration_hours = horas + (minutos / 60)

// 9. Calcular preço total:
//    - total_price = duration_hours * hourly_rate da sala
//    - Use round($valor, 2) para 2 casas decimais

// 10. Inserir reserva no banco:
//     - INSERT INTO bookings (user_id, room_id, booking_date, start_time, end_time, duration_hours, total_price, status, notes)
//     - status fixo: 'confirmed'
//     - notes é opcional (use $_POST['notes'] ?? null)

// 11. Pegar ID da reserva criada com $conn->lastInsertId()

// 12. Retornar JSON de sucesso:
//     - message: "Reserva criada com sucesso"
//     - data: { booking_id, room_name, booking_date, start_time, end_time, duration_hours, total_price }
