CREATE DATABASE IF NOT EXISTS `restaurant_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `restaurant_db`;

CREATE TABLE IF NOT EXISTS `dishes` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`name` VARCHAR(255) NOT NULL,
`category` ENUM('Entrada', 'Prato Principal', 'Sobremesa', 'Bebida') NOT NULL,
`description` TEXT,
`price` DECIMAL(10, 2) NOT NULL
);

INSERT INTO `dishes` (`name`, `category`, `description`, `price`) VALUES
('Bruschetta', 'Entrada', 'Pão italiano com tomate e manjericão', 18.90),
('Carpaccio', 'Entrada', 'Fatias finas de carne crua com alcaparras', 32.00),
('Filé Mignon', 'Prato Principal', 'Filé mignon grelhado com molho madeira', 68.00),
('Risoto de Cogumelos', 'Prato Principal', 'Risoto cremoso com funghi porcini', 52.00),
('Salmão Grelhado', 'Prato Principal', 'Salmão fresco com legumes', 62.00),
('Lasanha Bolonhesa', 'Prato Principal', 'Lasanha caseira com molho bolonhesa', 45.00),
('Tiramisu', 'Sobremesa', 'Sobremesa italiana com café e mascarpone', 22.00),
('Petit Gateau', 'Sobremesa', 'Bolo de chocolate com sorvete', 28.00),
('Suco Natural', 'Bebida', 'Suco de frutas frescas', 12.00),
('Vinho Tinto', 'Bebida', 'Taça de vinho tinto reserva', 24.00);
