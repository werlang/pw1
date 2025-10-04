CREATE DATABASE IF NOT EXISTS `grades_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `grades_db`;

CREATE TABLE IF NOT EXISTS `students` (
`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
`name` VARCHAR(255) NOT NULL,
`grade1` DECIMAL(4, 2) NOT NULL,
`grade2` DECIMAL(4, 2) NOT NULL,
`grade3` DECIMAL(4, 2) NOT NULL
);

INSERT INTO `students` (`name`, `grade1`, `grade2`, `grade3`) VALUES
('Ana Silva', 8.5, 9.0, 8.8),
('Bruno Costa', 7.2, 7.5, 7.8),
('Carlos Souza', 9.5, 9.2, 9.8),
('Diana Oliveira', 6.5, 7.0, 6.8),
('Eduardo Lima', 8.0, 8.5, 8.2),
('Fernanda Santos', 9.0, 8.8, 9.2),
('Gabriel Alves', 5.5, 6.0, 5.8),
('Helena Dias', 7.8, 8.0, 7.5);
