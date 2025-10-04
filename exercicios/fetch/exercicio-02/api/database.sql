-- Database for Exercise 2: Product Search
CREATE DATABASE IF NOT EXISTS products_db;
USE products_db;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO products (name, category, price, stock) VALUES
('Notebook Dell', 'Eletrônicos', 2500.00, 15),
('Mouse Logitech', 'Eletrônicos', 89.90, 50),
('Teclado Mecânico', 'Eletrônicos', 350.00, 30),
('Camiseta Polo', 'Roupas', 79.90, 100),
('Calça Jeans', 'Roupas', 159.90, 45),
('Tênis Nike', 'Roupas', 299.90, 25),
('Clean Code', 'Livros', 65.00, 20),
('Domain-Driven Design', 'Livros', 85.00, 15),
('Design Patterns', 'Livros', 72.00, 18);
