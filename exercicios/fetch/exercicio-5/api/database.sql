CREATE DATABASE IF NOT EXISTS students_db;
USE students_db;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    grade DECIMAL(3, 1) NOT NULL,
    class VARCHAR(10) NOT NULL
);

INSERT INTO students (name, grade, class) VALUES
('Ana Silva', 9.5, '3A'),
('Carlos Santos', 8.8, '3A'),
('Maria Oliveira', 9.2, '3B'),
('João Pedro', 7.5, '3A'),
('Beatriz Costa', 8.0, '3B'),
('Lucas Lima', 9.8, '3A'),
('Julia Ferreira', 8.5, '3B');
