CREATE DATABASE IF NOT EXISTS `library_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `library_system`;

CREATE TABLE IF NOT EXISTS `users` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL UNIQUE,
	`password` VARCHAR(255) NOT NULL,
	`membership_type` ENUM('standard', 'premium', 'student') NOT NULL DEFAULT 'standard'
);

CREATE TABLE IF NOT EXISTS `rentals` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`book_title` VARCHAR(255) NOT NULL,
	`author` VARCHAR(255) NOT NULL,
	`isbn` VARCHAR(20) NOT NULL,
	`genre` VARCHAR(100) NOT NULL,
	`rental_date` DATE NOT NULL,
	`due_date` DATE NOT NULL,
	`status` ENUM('active', 'returned', 'overdue') NOT NULL DEFAULT 'active',
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Usuários de Exemplo
-- Senha de todos: asdf1234
INSERT INTO `users` (`name`, `email`, `password`, `membership_type`) VALUES
('Ana Silva', 'ana@biblioteca.com', '$2y$10$qbsQ0sK2kbUOdY3nMAznYeSodB5.NuTVuNfMVyGTeevfziZDpPntW', 'premium'),
('Carlos Mendes', 'carlos@biblioteca.com', '$2y$10$qbsQ0sK2kbUOdY3nMAznYeSodB5.NuTVuNfMVyGTeevfziZDpPntW', 'standard'),
('Beatriz Costa', 'beatriz@biblioteca.com', '$2y$10$qbsQ0sK2kbUOdY3nMAznYeSodB5.NuTVuNfMVyGTeevfziZDpPntW', 'student');

-- Aluguéis de Exemplo (user_id = 1, Ana Silva)
INSERT INTO `rentals` (`user_id`, `book_title`, `author`, `isbn`, `genre`, `rental_date`, `due_date`, `status`) VALUES
(1, '1984', 'George Orwell', '978-0451524935', 'Ficção Científica', '2025-11-01', '2025-11-15', 'active'),
(1, 'O Senhor dos Anéis', 'J.R.R. Tolkien', '978-0618640157', 'Fantasia', '2025-10-20', '2025-11-03', 'overdue'),
(1, 'Cem Anos de Solidão', 'Gabriel García Márquez', '978-0060883287', 'Romance', '2025-11-10', '2025-11-24', 'active'),
(1, 'Dom Casmurro', 'Machado de Assis', '978-8535911664', 'Romance', '2025-10-05', '2025-10-19', 'returned'),
(2, 'O Pequeno Príncipe', 'Antoine de Saint-Exupéry', '978-0156012195', 'Infantil', '2025-11-08', '2025-11-22', 'active'),
(2, 'A Revolução dos Bichos', 'George Orwell', '978-0452284241', 'Ficção', '2025-10-25', '2025-11-08', 'returned');
