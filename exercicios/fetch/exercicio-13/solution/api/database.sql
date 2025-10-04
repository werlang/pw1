CREATE DATABASE IF NOT EXISTS `movies_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `movies_db`;

CREATE TABLE IF NOT EXISTS `movies` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(255) NOT NULL,
	`year` INT NOT NULL,
	`genre` VARCHAR(100) NOT NULL,
	`rating` INT NOT NULL DEFAULT 3,
	`review` TEXT
);

-- Exemplo de Filmes Avaliados
INSERT INTO `movies` (`title`, `year`, `genre`, `rating`, `review`) VALUES
('O Poderoso Chefão', 1972, 'Drama', 5, 'Obra-prima absoluta do cinema! Performances incríveis e direção impecável.'),
('Pulp Fiction', 1994, 'Crime', 5, 'Narrativa não-linear genial. Diálogos memoráveis e cenas icônicas.'),
('Matrix', 1999, 'Ficção Científica', 4, 'Revolucionou o cinema de ação. Efeitos visuais impressionantes.'),
('Inception', 2010, 'Ficção Científica', 4, 'Complexo e envolvente. Precisa assistir mais de uma vez!'),
('Parasita', 2019, 'Thriller', 5, 'Crítica social brilhante. Mereceu todos os prêmios que ganhou.');
