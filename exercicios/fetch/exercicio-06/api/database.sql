CREATE DATABASE IF NOT EXISTS events_db;
USE events_db;

CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location VARCHAR(255)
);

INSERT INTO events (title, date, time, location) VALUES
('Reunião de Equipe', '2024-12-25', '14:00:00', 'Sala 1'),
('Workshop JavaScript', '2024-12-26', '10:00:00', 'Auditório');
