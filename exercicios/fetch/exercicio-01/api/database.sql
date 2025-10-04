-- Database for Exercise 1: Movie Collection
CREATE DATABASE IF NOT EXISTS movies_db;
USE movies_db;

CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    director VARCHAR(255) NOT NULL,
    year INT,
    genre VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO movies (title, director, year, genre) VALUES
('Matrix', 'Wachowski', 1999, 'Ficção Científica'),
('Inception', 'Christopher Nolan', 2010, 'Ficção Científica'),
('Pulp Fiction', 'Quentin Tarantino', 1994, 'Crime');
