CREATE DATABASE IF NOT EXISTS recipes_db;
USE recipes_db;

CREATE TABLE IF NOT EXISTS recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ingredients TEXT NOT NULL,
    time INT NOT NULL
);

INSERT INTO recipes (name, ingredients, time) VALUES
('Molho de Tomate', 'tomate, alho, cebola, azeite, sal', 30),
('Salada Caprese', 'tomate, mussarela, manjericão, azeite', 10),
('Arroz de Tomate', 'arroz, tomate, cebola, alho', 25),
('Sopa de Legumes', 'batata, cenoura, cebola, alho', 40),
('Macarrão ao Alho', 'macarrão, alho, azeite, pimenta', 20);
