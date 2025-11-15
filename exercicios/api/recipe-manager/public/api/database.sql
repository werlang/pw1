CREATE DATABASE IF NOT EXISTS `recipe_manager` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `recipe_manager`;

CREATE TABLE IF NOT EXISTS `users` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL UNIQUE,
	`password` VARCHAR(255) NOT NULL,
	`favorite_cuisine` VARCHAR(100) DEFAULT NULL,
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `recipes` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`title` VARCHAR(255) NOT NULL,
	`description` TEXT NOT NULL,
	`ingredients` TEXT NOT NULL,
	`category` VARCHAR(50) NOT NULL,
	`difficulty` ENUM('fácil', 'médio', 'difícil') NOT NULL DEFAULT 'médio',
	`prep_time` INT NOT NULL COMMENT 'Tempo de preparo em minutos',
	`servings` INT NOT NULL DEFAULT 4,
	`is_public` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1 = pública, 0 = privada',
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Usuários de Exemplo
-- Senha: receita123 (hash bcrypt)
INSERT INTO `users` (`name`, `email`, `password`, `favorite_cuisine`) VALUES
('Chef Carolina', 'carolina@chef.com', '$2y$10$KjBM3nF8QwZ7XYzE.Vm0JeYHqP5K6nVz8FjNc9Lw2Xq1Rm3Pn4Yz6', 'Italiana'),
('Marcos Ferreira', 'marcos@email.com', '$2y$10$KjBM3nF8QwZ7XYzE.Vm0JeYHqP5K6nVz8FjNc9Lw2Xq1Rm3Pn4Yz6', 'Brasileira'),
('Juliana Costa', 'juliana@email.com', '$2y$10$KjBM3nF8QwZ7XYzE.Vm0JeYHqP5K6nVz8FjNc9Lw2Xq1Rm3Pn4Yz6', 'Asiática');

-- Receitas de Exemplo
INSERT INTO `recipes` (`user_id`, `title`, `description`, `ingredients`, `category`, `difficulty`, `prep_time`, `servings`, `is_public`) VALUES
(1, 'Risoto de Funghi', 'Cremoso risoto italiano com cogumelos frescos e parmesão', '300g de arroz arbóreo\n400g de cogumelos frescos\n1 cebola pequena\n100ml de vinho branco\n1L de caldo de legumes\n50g de parmesão ralado\nManteiga e azeite', 'Massas e Grãos', 'médio', 45, 4, 1),
(1, 'Tiramisù Clássico', 'Sobremesa italiana tradicional com café e mascarpone', '500g de mascarpone\n4 ovos\n200g de biscoito champagne\n200ml de café espresso\n4 colheres de açúcar\nCacau em pó\nAmarula (opcional)', 'Sobremesas', 'médio', 30, 8, 1),
(2, 'Feijoada Completa', 'Prato tradicional brasileiro com feijão preto e carnes', '1kg de feijão preto\n500g de costela de porco\n300g de linguiça calabresa\n200g de bacon\n2 folhas de louro\nAlho, cebola e temperos', 'Pratos Principais', 'difícil', 180, 10, 1),
(2, 'Brigadeiro Gourmet', 'Doce brasileiro clássico com chocolate nobre', '1 lata de leite condensado\n3 colheres de chocolate em pó 70% cacau\n1 colher de manteiga\nChocolate granulado belga', 'Sobremesas', 'fácil', 20, 25, 0),
(3, 'Pad Thai de Camarão', 'Macarrão tailandês salteado com camarões e amendoim', '200g de macarrão de arroz\n300g de camarões limpos\n2 ovos\n100g de brotos de feijão\n50g de amendoim torrado\nMolho de peixe, tamarindo e açúcar', 'Pratos Principais', 'médio', 35, 3, 1);
