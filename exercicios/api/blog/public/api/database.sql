CREATE DATABASE IF NOT EXISTS `blog_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `blog_system`;

CREATE TABLE IF NOT EXISTS `users` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL UNIQUE,
	`password` VARCHAR(255) NOT NULL,
	`bio` TEXT
);

CREATE TABLE IF NOT EXISTS `posts` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`title` VARCHAR(255) NOT NULL,
	`content` TEXT NOT NULL,
	`category` VARCHAR(50) NOT NULL,
	`is_published` TINYINT(1) NOT NULL DEFAULT 0,
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Usuários de Exemplo (senha: blog2025)
INSERT INTO `users` (`name`, `email`, `password`, `bio`) VALUES
('Ana Silva', 'ana@email.com', '$2y$10$YzJQNhf7JKxPjX5nqHQGJeF8PqP7VX0YhZTwZMk3L9WzRqP8Vl.Ka', 'Desenvolvedora Full Stack apaixonada por tecnologia'),
('Carlos Santos', 'carlos@email.com', '$2y$10$YzJQNhf7JKxPjX5nqHQGJeF8PqP7VX0YhZTwZMk3L9WzRqP8Vl.Ka', 'Designer UX/UI focado em experiências incríveis'),
('Beatriz Costa', 'beatriz@email.com', '$2y$10$YzJQNhf7JKxPjX5nqHQGJeF8PqP7VX0YhZTwZMk3L9WzRqP8Vl.Ka', 'Product Manager e entusiasta de metodologias ágeis');

-- Posts de Exemplo (user_id = 1, Ana Silva)
INSERT INTO `posts` (`user_id`, `title`, `content`, `category`, `is_published`) VALUES
(1, 'Introdução ao PHP Moderno', 'PHP evoluiu muito nos últimos anos. Neste artigo, vamos explorar as novidades do PHP 8.', 'Tecnologia', 1),
(1, 'Design Patterns Essenciais', 'Conheça os padrões de projeto mais utilizados no desenvolvimento de software.', 'Programação', 1),
(1, 'Dicas de Produtividade', 'Como aumentar sua produtividade no trabalho remoto.', 'Carreira', 0),
(2, 'Princípios do UX Design', 'Entenda os fundamentos do design centrado no usuário.', 'Design', 1),
(2, 'Ferramentas de Prototipagem', 'As melhores ferramentas para criar protótipos de interfaces.', 'Design', 1);
