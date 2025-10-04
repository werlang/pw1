CREATE DATABASE IF NOT EXISTS `inventory` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `inventory`;

CREATE TABLE IF NOT EXISTS `products` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`category` VARCHAR(100) NOT NULL,
	`price` DECIMAL(10, 2) NOT NULL,
	`quantity` INT NOT NULL DEFAULT 0
);

-- Exemplo de Produtos
INSERT INTO `products` (`name`, `category`, `price`, `quantity`) VALUES
('Notebook Dell Inspiron', 'Eletrônicos', 2500.00, 5),
('Mouse Logitech', 'Eletrônicos', 45.90, 25),
('Cadeira Gamer', 'Móveis', 850.00, 8);
