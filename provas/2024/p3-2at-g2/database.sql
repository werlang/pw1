-- Active: 1728474525094@@localhost@3306@aula

CREATE TABLE classes (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE users (  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    class_id INT,
    role INT NOT NULL DEFAULT 0,
    FOREIGN KEY (class_id) REFERENCES classes(id)
);

CREATE TABLE tasks (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    deadline DATETIME,
    class_id INT NOT NULL,
    author INT NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (author) REFERENCES users(id)
);

CREATE TABLE submissions (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    task_id INT NOT NULL,
    student_id INT NOT NULL,
    submission_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    file_name VARCHAR(255),
    grade INT,
    feedback TEXT,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (student_id) REFERENCES users(id)
);

INSERT INTO classes (name) VALUES 
    ('INF-2AM-G1'),
    ('INF-2AM-G2'),
    ('INF-2AT-G1'),
    ('INF-2AT-G2');

INSERT INTO users (name, email, password, class_id, role) VALUES 
    ('Pablo Werlang', 'pablowerlang@ifsul.edu.br', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', NULL, 1),
    ('Fabio Santos', 'fabiosantos@ifsul.edu.br', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', NULL, 1),
    ('Mario Rosa', 'mariorosa@ifsul.edu.br', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', NULL, 1),
    ('Joao Silva', 'joaosilva@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 1, 0),
    ('Maria Santos', 'mariasantos@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 1, 0),
    ('Ana Costa', 'anacosta@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 2, 0),
    ('Carlos Pereira', 'carlospereira@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 2, 0),
    ('Beatriz Lima', 'beatrizlima@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 3, 0),
    ('Pedro Alves', 'pedroalves@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 3, 0),
    ('Lucas Souza', 'lucassouza@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 4, 0),
    ('Fernanda Rocha', 'fernandarocha@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 4, 0),
    ('Gabriel Martins', 'gabrielmartins@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 1, 0),
    ('Juliana Oliveira', 'julianaoliveira@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 2, 0),
    ('Rafael Mendes', 'rafaelmendes@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 3, 0),
    ('Laura Ferreira', 'lauraferreira@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 1, 0),
    ('Bruno Costa', 'brunocosta@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 1, 0),
    ('Camila Silva', 'camilasilva@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 2, 0),
    ('Rodrigo Almeida', 'rodrigoalmeida@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 2, 0),
    ('Patricia Gomes', 'patriciagomes@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 3, 0),
    ('Renato Araujo', 'renatoaraujo@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 3, 0),
    ('Vanessa Ribeiro', 'vanessaribeiro@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 4, 0),
    ('Thiago Fernandes', 'thiagofernandes@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 4, 0),
    ('Isabela Souza', 'isabelasouza@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 1, 0),
    ('Felipe Lima', 'felipelima@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe', 2, 0)

INSERT INTO tasks (title, description, deadline, class_id, author) VALUES 
    ('HTML Básico', 'Introdução ao HTML', '2024-03-01 23:59:59', 2, 1),
    ('Fundamentos de CSS', 'Introdução ao CSS', '2024-03-08 23:59:59', 2, 2),
    ('JavaScript Básico', 'Introdução ao JavaScript', '2024-03-15 23:59:59', 3, 3),
    ('Design Responsivo', 'Criando páginas web responsivas', '2024-03-22 23:59:59', 4, 1),
    ('Manipulação do DOM com JavaScript', 'Aprenda a manipular o DOM usando JavaScript', '2024-03-29 23:59:59', 1, 2),
    ('PHP e Banco de Dados', 'Conectando PHP com banco de dados MySQL', '2024-04-05 23:59:59', 1, 3),
    ('Requisições AJAX', 'Realizando requisições AJAX com JavaScript', '2024-04-12 23:59:59', 3, 1),
    ('API REST com PHP', 'Criando uma API REST usando PHP', '2024-04-19 23:59:59', 4, 2);

INSERT INTO submissions (task_id, student_id, file_name) VALUES
    (1, 4, 'a1d0c6e83f027327d8461063f4ac58a6.pdf'),
    (1, 5, 'c4ca4238a0b923820dcc509a6f75849b.pdf'),
    (2, 6, 'c81e728d9d4c2f636f067f89cc14862c.pdf'),
    (2, 7, 'eccbc87e4b5ce2fe28308fd9f2a7baf3.pdf'),
    (3, 8, 'a87ff679a2f3e71d9181a67b7542122c.pdf'),
    (3, 9, 'e4da3b7fbbce2345d7772b0674a318d5.pdf'),
    (4, 10, '1679091c5a880faf6fb5e6087eb1b2dc.pdf'),
    (4, 11, '8f14e45fceea167a5a36dedd4bea2543.pdf'),
    (5, 12, 'c9f0f895fb98ab9159f51fd0297e236d.pdf'),
    (5, 13, '45c48cce2e2d7fbdea1afc51c7c6ad26.pdf');
