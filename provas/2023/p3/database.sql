-- Active: 1688049734424@@45.77.118.47@3310@aula
CREATE TABLE users (  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

INSERT INTO users (name, email, password) VALUES
('João Silva', 'joaosilva@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe'),
('Maria Santos', 'mariasantos@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe'),
('Roberto Souza', 'robertosouza@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe'),
('Alice Ferreira', 'aliceferreira@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe'),
('Miguel Alves', 'miguelalves@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe'),
('Emília Costa', 'emiliacosta@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe'),
('Daniel Ribeiro', 'danielribeiro@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe'),
('Sara Gonçalves', 'saragoncalves@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe'),
('Matheus Oliveira', 'matheusoliveira@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe'),
('Júlia Martins', 'juliamartins@example.com', '$2y$10$cni4FwMKw.2k8lf3Ct\/7cutPPmyiUc6QbjLfWupnc7P79xovP7ZIe');

CREATE TABLE jobs (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description VARCHAR(2048),
    salary VARCHAR(255),
    company VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jobs (title, description, salary, company) VALUES
('Engenheiro de Software', 'Desenvolver e manter aplicativos de software', '10000', 'Acme Inc.'),
('Analista de Dados', 'Analisar e interpretar conjuntos de dados complexos', '8000', 'Globex Corporation'),
('Desenvolvedor Web', 'Projetar e desenvolver sites', '9000', 'Initech'),
('Gerente de Produto', 'Gerenciar o desenvolvimento e lançamento de produtos', '12000', 'Umbrella Corporation'),
('Designer de UX', 'Projetar interfaces e experiências do usuário', '8500', 'Wayne Enterprises'),
('Administrador de Rede', 'Manter e solucionar problemas de infraestrutura de rede', '9500', 'Stark Industries'),
('Engenheiro DevOps', 'Automatizar e otimizar processos de desenvolvimento de software', '11000', 'Oscorp Industries'),
('Administrador de Banco de Dados', 'Projetar, implementar e manter bancos de dados', '10000', 'LexCorp'),
('Gerente de Projetos de TI', 'Planejar e executar projetos de TI', '11500', 'Spacely Sprockets'),
('Analista de Segurança Cibernética', 'Proteger sistemas e redes de computadores contra ataques cibernéticos', '10500', 'Sirius Cybernetics Corporation');

CREATE TABLE applications (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user int NOT NULL,
    job int NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user) REFERENCES users(id),
    FOREIGN KEY (job) REFERENCES jobs(id)
);

INSERT INTO applications (user, job) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
(2, 1), (2, 2), (2, 3),
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5),
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5);
