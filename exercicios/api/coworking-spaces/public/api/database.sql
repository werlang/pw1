-- Banco de Dados: Sistema de Reservas de Salas de Coworking
-- DROP DATABASE IF EXISTS coworking_spaces;
CREATE DATABASE IF NOT EXISTS coworking_spaces;
USE coworking_spaces;

-- Tabela de usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    company VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de salas disponíveis
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    type ENUM('meeting', 'private_office', 'event_space', 'phone_booth') NOT NULL,
    hourly_rate DECIMAL(10,2) NOT NULL,
    floor INT NOT NULL,
    amenities TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de reservas
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    duration_hours DECIMAL(4,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('confirmed', 'cancelled', 'completed') DEFAULT 'confirmed',
    notes TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- Inserir usuários de teste (senha para todos: cowork2025)
INSERT INTO users (name, email, password, company) VALUES
('Marina Silva', 'marina@startup.tech', '$2y$10$XVZJqKZoFKzP8b6rN/EwJux3Yp7qT5VBNsLJ6.8dNHKmD9WvQ5KH2', 'StartupTech'),
('Roberto Costa', 'roberto@freelancer.com', '$2y$10$XVZJqKZoFKzP8b6rN/EwJux3Yp7qT5VBNsLJ6.8dNHKmD9WvQ5KH2', 'Freelancer'),
('Julia Santos', 'julia@design.studio', '$2y$10$XVZJqKZoFKzP8b6rN/EwJux3Yp7qT5VBNsLJ6.8dNHKmD9WvQ5KH2', 'Design Studio'),
('Carlos Mendes', 'carlos@consultant.io', '$2y$10$XVZJqKZoFKzP8b6rN/EwJux3Yp7qT5VBNsLJ6.8dNHKmD9WvQ5KH2', 'Consultant IO');

-- Inserir salas disponíveis
INSERT INTO rooms (name, capacity, type, hourly_rate, floor, amenities) VALUES
('Sala Inovação', 8, 'meeting', 45.00, 1, 'TV 55", whiteboard, ar-condicionado'),
('Escritório Premium', 4, 'private_office', 80.00, 2, 'Mesa executiva, cadeiras ergonômicas, internet dedicada'),
('Sala Workshop', 20, 'event_space', 120.00, 3, 'Projetor, sistema de som, coffee break'),
('Cabine Focus 1', 1, 'phone_booth', 15.00, 1, 'Mesa, cadeira, iluminação ajustável'),
('Cabine Focus 2', 1, 'phone_booth', 15.00, 1, 'Mesa, cadeira, iluminação ajustável'),
('Sala Criativa', 6, 'meeting', 50.00, 2, 'TV 65", quadro branco, sofá confortável'),
('Escritório Startup', 3, 'private_office', 65.00, 1, 'Mesas individuais, armário, plantas'),
('Auditório Tech', 50, 'event_space', 200.00, 4, 'Palco, microfones, projetor 4K, cadeiras fixas');

-- Inserir reservas de exemplo
INSERT INTO bookings (user_id, room_id, booking_date, start_time, end_time, duration_hours, total_price, status, notes) VALUES
(1, 1, '2025-11-20', '09:00:00', '11:00:00', 2.00, 90.00, 'confirmed', 'Reunião com investidores'),
(1, 4, '2025-11-20', '14:00:00', '15:00:00', 1.00, 15.00, 'confirmed', 'Ligação importante'),
(2, 2, '2025-11-21', '08:00:00', '17:00:00', 9.00, 720.00, 'confirmed', 'Dia de trabalho focado'),
(3, 6, '2025-11-22', '10:00:00', '12:00:00', 2.00, 100.00, 'confirmed', 'Brainstorming de projeto'),
(4, 3, '2025-11-23', '13:00:00', '18:00:00', 5.00, 600.00, 'confirmed', 'Workshop de consultoría'),
(1, 7, '2025-11-18', '09:00:00', '13:00:00', 4.00, 260.00, 'completed', 'Sprint de desenvolvimento'),
(2, 5, '2025-11-19', '11:00:00', '12:00:00', 1.00, 15.00, 'completed', 'Calls com clientes'),
(3, 1, '2025-11-17', '15:00:00', '17:00:00', 2.00, 90.00, 'cancelled', 'Cliente desmarcou'),
(4, 8, '2025-11-25', '09:00:00', '13:00:00', 4.00, 800.00, 'confirmed', 'Evento de lançamento'),
(1, 6, '2025-11-26', '14:00:00', '16:00:00', 2.00, 100.00, 'confirmed', 'Alinhamento com time'),
(2, 4, '2025-11-27', '10:00:00', '11:00:00', 1.00, 15.00, 'confirmed', 'Ligação rápida');
