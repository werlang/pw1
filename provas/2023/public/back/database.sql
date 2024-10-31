USE aula;

-- Table structure for table `properties`
CREATE TABLE `properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Dumping data for table `properties`
INSERT INTO `properties` VALUES 
(1,'Linda casa na Zona Sul','Casa',1500000,'1.jpg'),
(2,'Apartamento com vista para o mar','Apartamento',800000,'2.jpg'),
(3,'Terreno amplo no centro da cidade','Terreno',500000,'3.jpg'),
(4,'Casa térrea com jardim','Casa',1200000,'4.jpg'),
(5,'Apartamento luxuoso no bairro nobre','Apartamento',2000000,'5.jpg'),
(6,'Terreno com vista panorâmica','Terreno',700000,'6.jpg'),
(7,'Casa com piscina e área de lazer','Casa',1800000,'7.jpg'),
(8,'Apartamento moderno no centro histórico','Apartamento',950000,'8.jpg'),
(9,'Terreno próximo à praia','Terreno',600000,'9.jpg'),
(10,'Casa aconchegante em condomínio fechado','Casa',1350000,'10.jpg');

-- Table structure for table `users`
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Dumping data for table `users`
INSERT INTO `users` VALUES (1,'Administrador','admin@admin.com','$2y$10$Snp20.bXnGvDroI1b6IUNORbQOP5Lu6btpyeGsRr3vOPiNd4ZGchO');
