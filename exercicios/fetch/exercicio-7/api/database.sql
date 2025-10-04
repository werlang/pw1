CREATE DATABASE IF NOT EXISTS emails_db;
USE emails_db;

CREATE TABLE IF NOT EXISTS emails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    is_read BOOLEAN DEFAULT FALSE
);

INSERT INTO emails (sender, subject, date, is_read) VALUES
('joao@email.com', 'Reunião amanhã', '2024-10-01', 0),
('maria@email.com', 'Orçamento projeto', '2024-10-02', 0),
('pedro@email.com', 'Proposta comercial', '2024-10-02', 0),
('ana@email.com', 'Relatório mensal', '2024-10-03', 1);
