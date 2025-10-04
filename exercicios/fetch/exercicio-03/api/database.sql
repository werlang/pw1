-- Database for Exercise 3: Task Management
CREATE DATABASE IF NOT EXISTS tasks_db;
USE tasks_db;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO tasks (title, completed) VALUES
('Estudar JavaScript', FALSE),
('Fazer exercícios de fetch', FALSE),
('Revisar conceitos de API REST', TRUE),
('Implementar sistema de tarefas', FALSE),
('Aprender sobre métodos HTTP', TRUE);
