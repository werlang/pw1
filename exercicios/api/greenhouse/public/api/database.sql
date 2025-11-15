CREATE DATABASE IF NOT EXISTS `greenpulse` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `greenpulse`;

CREATE TABLE IF NOT EXISTS `users` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(160) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('manager', 'technician') NOT NULL DEFAULT 'manager'
);

CREATE TABLE IF NOT EXISTS `maintenance_requests` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `greenhouse_name` VARCHAR(120) NOT NULL,
    `zone_code` VARCHAR(20) NOT NULL,
    `issue_type` ENUM('sensor','irrigation','structure','power','climate') NOT NULL,
    `priority` ENUM('low','normal','high') NOT NULL DEFAULT 'normal',
    `status` ENUM('open','scheduled','done') NOT NULL DEFAULT 'open',
    `description` TEXT NOT NULL,
    `desired_date` DATE NOT NULL,
    `scheduled_date` DATE NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES
('Lara Monteiro', 'lara@greenpulse.com', '$2b$12$eFZCGAP8IMY2I6q3xxIKMOZ7fl2HlZ4.WVbCeFoC.QOYnaSnyYPwK', 'manager'),
('Otávio Reis', 'otavio@greenpulse.com', '$2b$12$eFZCGAP8IMY2I6q3xxIKMOZ7fl2HlZ4.WVbCeFoC.QOYnaSnyYPwK', 'technician'),
('Helena Costa', 'helena@greenpulse.com', '$2b$12$eFZCGAP8IMY2I6q3xxIKMOZ7fl2HlZ4.WVbCeFoC.QOYnaSnyYPwK', 'manager');

INSERT INTO `maintenance_requests` (`user_id`, `greenhouse_name`, `zone_code`, `issue_type`, `priority`, `status`, `description`, `desired_date`, `scheduled_date`) VALUES
(1, 'Horta da Escola Aurora', 'Z-12', 'irrigation', 'high', 'open', 'Fluxo irregular nos gotejadores do corredor norte.', CURDATE() + INTERVAL 2 DAY, NULL),
(1, 'Estufa Comunitária SolarVille', 'A-03', 'climate', 'normal', 'scheduled', 'Sensores apontam queda brusca de umidade.', CURDATE() + INTERVAL 4 DAY, CURDATE() + INTERVAL 3 DAY),
(3, 'Fazenda Urbana Horizonte', 'E-22', 'structure', 'low', 'done', 'Painel lateral desalinhado após ventos fortes.', CURDATE() - INTERVAL 5 DAY, CURDATE() - INTERVAL 2 DAY);
