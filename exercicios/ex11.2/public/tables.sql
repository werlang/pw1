CREATE TABLE categories (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE products (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    category_id INT,
    price FLOAT,
    FOREIGN KEY(category_id) REFERENCES categories(id)
);

INSERT INTO categories (id, name) VALUES
(1, 'Eletrônicos'),
(2, 'Eletrodomésticos'),
(3, 'Móveis'),
(4, 'Brinquedos'),
(5, 'Roupas'),
(6, 'Calçados'),
(7, 'Alimentos'),
(8, 'Bebidas'),
(9, 'Higiene'),
(10, 'Limpeza'),
(11, 'Informática'),
(12, 'Celulares'),
(13, 'Acessórios'),
(14, 'Livros'),
(15, 'Filmes'),
(16, 'Músicas'),
(17, 'Jogos'),
(18, 'Esportes'),
(19, 'Viagens');

INSERT INTO products (id, name, category_id, price) VALUES
(1, 'TV 55 Polegadas', 1, 3500.50),
(2, 'Geladeira', 2, 2500.00),
(3, 'Geladeira Brastemp', 2, 2500.00),
(4, 'Geladeira Consul', 2, 3000.00),
(5, 'Sofá', 3, 1500.00),
(6, 'Sofá Cama', 3, 2000.00),
(7, 'Cama', 3, 1000.00),
(8, 'Cadeira', 3, 500.00),
(9, 'Mesa', 3, 500.00),
(10, 'Bicicleta', 18, 1000.00),
(11, 'Bola', 18, 50.00),
(12, 'Boneca', 4, 100.00),
(13, 'Carrinho', 4, 100.00),
(14, 'Camisa', 5, 50.00),
(15, 'Calça', 5, 100.00),
(16, 'Tênis NIKE', 6, 300.00),
(17, 'Tênis Olympikus', 6, 200.00),
(18, 'Sandália', 6, 100.00),
(19, 'Arroz Branco', 7, 10.00),
(20, 'Arroz Parbolizado', 7, 15.00),
(21, 'Feijão', 7, 15.00);
