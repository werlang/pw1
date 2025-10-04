CREATE DATABASE IF NOT EXISTS `contacts_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `contacts_db`;

CREATE TABLE IF NOT EXISTS `contacts` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`phone` VARCHAR(20) NOT NULL,
	`category` ENUM('Trabalho', 'Pessoal', 'Família') NOT NULL
);

-- Exemplo de Contatos
INSERT INTO `contacts` (`name`, `email`, `phone`, `category`) VALUES
('Maria Santos', 'maria.santos@empresa.com', '(51) 98888-7777', 'Trabalho'),
('João Silva', 'joao.silva@email.com', '(51) 99999-8888', 'Pessoal'),
('Ana Costa', 'ana.costa@trabalho.com', '(51) 97777-6666', 'Trabalho'),
('Pedro Oliveira', 'pedro@email.com', '(51) 96666-5555', 'Família'),
('Carla Souza', 'carla.souza@email.com', '(51) 95555-4444', 'Pessoal'),
('Roberto Lima', 'roberto.lima@empresa.com', '(51) 94444-3333', 'Trabalho'),
('Juliana Dias', 'juliana@email.com', '(51) 93333-2222', 'Família');
