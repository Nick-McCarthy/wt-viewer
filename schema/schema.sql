DROP DATABASE IF EXISTS `content-hosting-db`;
CREATE DATABASE `content-hosting-db`;
USE `content-hosting-db`;

CREATE TABLE `webtoon` ( 
    `ip_title` VARCHAR(100) NOT NULL,
    `thumbnail_address` VARCHAR(100) NOT NULL,
    `ip_description` VARCHAR(2000),
    `number_of_chapters` INT NOT NULL,
    `genre` VARCHAR(20) NOT NULL,
    `views` INT,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`ip_title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `webtoon_chapters` (
    `ip_title` VARCHAR(100) NOT NULL,
    FOREIGN KEY (`ip_title`)
        REFERENCES `webtoon`(`ip_title`)
        ON DELETE CASCADE,
    `chapter_number` FLOAT NOT NULL,
    `image_ordering` INT NOT NULL,
    `image_path` VARCHAR(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELIMITER $$
CREATE TRIGGER `update_number_of_chapters_webtoon`
AFTER INSERT ON `webtoon_chapters`
FOR EACH ROW
BEGIN
    UPDATE `webtoon`
    SET `number_of_chapters` = (
        SELECT MAX(`chapter_number`)
        FROM `webtoon_chapters`
        WHERE `ip_title` = NEW.`ip_title`
    ),
    `updated_at` = CURRENT_TIMESTAMP
    WHERE `ip_title` = NEW.`ip_title`;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER `update_number_of_chapters_delete_webtoon`
AFTER DELETE ON `webtoon_chapters`
FOR EACH ROW
BEGIN
    UPDATE `webtoon`
    SET `number_of_chapters` = (
        SELECT MAX(`chapter_number`)
        FROM `webtoon_chapters`
        WHERE `ip_title` = OLD.`ip_title`
    ),
    `updated_at` = CURRENT_TIMESTAMP
    WHERE `ip_title` = OLD.`ip_title`;
END$$
DELIMITER ;

CREATE TABLE `manga` ( 
    `ip_title` VARCHAR(100) NOT NULL,
    `thumbnail_address` VARCHAR(100) NOT NULL,
    `ip_description` VARCHAR(2000),
    `number_of_chapters` INT NOT NULL,
    `genre` VARCHAR(20) NOT NULL,
    `views` INT,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`ip_title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `manga_chapters` (
    `ip_title` VARCHAR(100) NOT NULL,
    FOREIGN KEY (`ip_title`)
        REFERENCES `webtoon`(`ip_title`)
        ON DELETE CASCADE,
    `chapter_number` FLOAT NOT NULL,
    `image_ordering` INT NOT NULL,
    `image_path` VARCHAR(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELIMITER $$
CREATE TRIGGER `update_number_of_chapters_manga`
AFTER INSERT ON `manga_chapters`
FOR EACH ROW
BEGIN
    UPDATE `manga`
    SET `number_of_chapters` = (
        SELECT MAX(`chapter_number`)
        FROM `manga_chapters`
        WHERE `ip_title` = NEW.`ip_title`
    ),
    `updated_at` = CURRENT_TIMESTAMP
    WHERE `ip_title` = NEW.`ip_title`;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER `update_number_of_chapters_delete_manga`
AFTER DELETE ON `manga_chapters`
FOR EACH ROW
BEGIN
    UPDATE `manga`
    SET `number_of_chapters` = (
        SELECT MAX(`chapter_number`)
        FROM `manga_chapters`
        WHERE `ip_title` = OLD.`ip_title`
    ),
    `updated_at` = CURRENT_TIMESTAMP
    WHERE `ip_title` = OLD.`ip_title`;
END$$
DELIMITER ;


