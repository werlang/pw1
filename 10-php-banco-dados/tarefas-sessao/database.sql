-- Estrutura usada pelo projeto de exemplo.
-- Para importar:
-- docker exec -i mysql mysql -uroot -pasdf1234 < 10-php-banco-dados/tarefas-sessao/database.sql

CREATE DATABASE IF NOT EXISTS aula;
USE aula;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    description VARCHAR(255),
    CONSTRAINT fk_tasks_user FOREIGN KEY (user_id) REFERENCES users (id)
);
