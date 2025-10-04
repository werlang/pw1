CREATE DATABASE IF NOT EXISTS `tasks_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `tasks_db`;

CREATE TABLE IF NOT EXISTS `tasks` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`title` VARCHAR(255) NOT NULL,
`description` TEXT,
`completed` BOOLEAN DEFAULT FALSE,
`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO `tasks` (`title`, `description`, `completed`) VALUES
('Estudar JavaScript', 'Revisar conceitos de async/await e Promises', FALSE),
('Fazer exercícios de CSS', 'Praticar Flexbox e Grid Layout', FALSE),
('Reunião de projeto', 'Discutir próximos passos do desenvolvimento', TRUE),
('Comprar materiais', 'Lista: caderno, canetas, marcadores', FALSE),
('Revisar pull requests', 'Analisar código dos colegas', TRUE);
