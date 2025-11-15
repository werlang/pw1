CREATE DATABASE IF NOT EXISTS `community_swap` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `community_swap`;

CREATE TABLE IF NOT EXISTS `users` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(100) NOT NULL,
	`email` VARCHAR(150) NOT NULL UNIQUE,
	`password` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `categories` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS `items` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(150) NOT NULL,
	`description` TEXT NOT NULL,
	`category_id` INT NOT NULL,
	`owner_id` INT NOT NULL,
	`suggested_value` DECIMAL(10, 2) NOT NULL,
	`status` ENUM('open', 'pending', 'closed') NOT NULL DEFAULT 'open',
	`created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Usuários de Exemplo (senha: asdf1234)
INSERT INTO `users` (`name`, `email`, `password`) VALUES
('Ana Costa', 'ana@email.com', '$2y$10$qbsQ0sK2kbUOdY3nMAznYeSodB5.NuTVuNfMVyGTeevfziZDpPntW'),
('Carlos Lima', 'carlos@email.com', '$2y$10$qbsQ0sK2kbUOdY3nMAznYeSodB5.NuTVuNfMVyGTeevfziZDpPntW'),
('Beatriz Silva', 'beatriz@email.com', '$2y$10$qbsQ0sK2kbUOdY3nMAznYeSodB5.NuTVuNfMVyGTeevfziZDpPntW');

-- Categorias de Itens
INSERT INTO `categories` (`name`) VALUES
('Livros'),
('Eletrônicos'),
('Roupas e Acessórios'),
('Jogos e Brinquedos'),
('Móveis e Decoração'),
('Esportes e Lazer');

-- Itens de Exemplo
INSERT INTO `items` (`title`, `description`, `category_id`, `owner_id`, `suggested_value`, `status`) VALUES
('Harry Potter - Coleção Completa', 'Coleção dos 7 livros em ótimo estado, capa dura', 1, 1, 150.00, 'open'),
('Fone de Ouvido Bluetooth', 'Fone Sony WH-1000XM4, usado por 6 meses, com case original', 2, 1, 800.00, 'open'),
('Jaqueta Jeans Tamanho M', 'Jaqueta masculina, marca Levi\'s, pouco uso', 3, 1, 120.00, 'pending'),
('Xbox One S 1TB', 'Console em perfeito estado, com 2 controles e 5 jogos', 2, 2, 1200.00, 'open'),
('Mesa de Escritório', 'Mesa em MDF branco, 120x60cm, usada mas em bom estado', 5, 2, 200.00, 'open'),
('Bicicleta Mountain Bike', 'Bike aro 29, 21 marchas, precisa de ajustes nos freios', 6, 2, 600.00, 'closed'),
('Monopoly Edição Clássica', 'Jogo completo, todas as peças, caixa com sinais de uso', 4, 3, 80.00, 'open'),
('Kindle Paperwhite', 'E-reader 8GB, tela sem riscos, com capa protetora', 2, 3, 350.00, 'open'),
('Tapete Persa 2x3m', 'Tapete decorativo, cores vibrantes, bem conservado', 5, 3, 400.00, 'open'),
('Tênis Nike Air Max', 'Tamanho 42, usado poucas vezes, praticamente novo', 3, 1, 280.00, 'open'),
('Violão Acústico', 'Violão Tagima, cordas de aço, com afinador digital', 6, 2, 350.00, 'open'),
('Kit Panelas Antiaderentes', 'Conjunto com 5 panelas, marca Tramontina, pouco uso', 5, 3, 180.00, 'pending');
