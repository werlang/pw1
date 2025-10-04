CREATE DATABASE IF NOT EXISTS social_db;
USE social_db;

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    likes INT DEFAULT 0,
    liked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO posts (author, content, likes, liked) VALUES
('João Silva', 'Acabei de terminar um projeto incrível!', 15, 0),
('Maria Santos', 'Alguém recomenda bons cursos de JavaScript?', 8, 0),
('Pedro Costa', 'Hoje foi um dia produtivo de código!', 23, 1);
