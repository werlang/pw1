CREATE DATABASE IF NOT EXISTS photos_db;
USE photos_db;

CREATE TABLE IF NOT EXISTS photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    author VARCHAR(255)
);

-- Sample data (using placeholder image service)
INSERT INTO photos (title, url, author) VALUES
('Paisagem 1', 'https://picsum.photos/400/300?random=1', 'João'),
('Paisagem 2', 'https://picsum.photos/400/300?random=2', 'Maria'),
('Paisagem 3', 'https://picsum.photos/400/300?random=3', 'Pedro'),
('Paisagem 4', 'https://picsum.photos/400/300?random=4', 'Ana'),
('Paisagem 5', 'https://picsum.photos/400/300?random=5', 'Carlos'),
('Paisagem 6', 'https://picsum.photos/400/300?random=6', 'Julia'),
('Paisagem 7', 'https://picsum.photos/400/300?random=7', 'Lucas'),
('Paisagem 8', 'https://picsum.photos/400/300?random=8', 'Beatriz'),
('Paisagem 9', 'https://picsum.photos/400/300?random=9', 'Rafael'),
('Paisagem 10', 'https://picsum.photos/400/300?random=10', 'Fernanda'),
('Paisagem 11', 'https://picsum.photos/400/300?random=11', 'Gabriel'),
('Paisagem 12', 'https://picsum.photos/400/300?random=12', 'Larissa'),
('Paisagem 13', 'https://picsum.photos/400/300?random=13', 'Bruno'),
('Paisagem 14', 'https://picsum.photos/400/300?random=14', 'Amanda'),
('Paisagem 15', 'https://picsum.photos/400/300?random=15', 'Diego'),
('Paisagem 16', 'https://picsum.photos/400/300?random=16', 'Camila'),
('Paisagem 17', 'https://picsum.photos/400/300?random=17', 'Thiago'),
('Paisagem 18', 'https://picsum.photos/400/300?random=18', 'Patricia'),
('Paisagem 19', 'https://picsum.photos/400/300?random=19', 'Rodrigo'),
('Paisagem 20', 'https://picsum.photos/400/300?random=20', 'Mariana');
