DROP DATABASE IF EXISTS `vueling-nuwe-osr`;
CREATE DATABASE `vueling-nuwe-osr` CHARACTER SET `utf8mb4` COLLATE `utf8mb4_unicode_ci`;
USE `vueling-nuwe-osr`;

CREATE TABLE `language` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    iso CHAR(3) COMMENT 'ISO 639-2/T'
);

CREATE TABLE `city` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    common_name VARCHAR(50) NOT NULL
);

CREATE TABLE `city_language` (
    city INT NOT NULL,
    language INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (`city`, `language`),
    CONSTRAINT `FK_City_CityLanguage` FOREIGN KEY (`city`) REFERENCES `city` (`id`)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `FK_Language_CityLanguage` FOREIGN KEY (`language`) REFERENCES `language` (`id`)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `hotel` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    stars TINYINT UNSIGNED NOT NULL,
    city INT,
    CONSTRAINT `FK_City_Hotel` FOREIGN KEY (`city`) REFERENCES `city` (`id`)
        ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE `trip` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    type ENUM('land', 'air'),
    days TINYINT
);

CREATE TABLE `trip_cities` (
    trip INT NOT NULL,
    city INT NOT NULL,
    ordre TINYINT,
    PRIMARY KEY (`trip`, `city`),
    CONSTRAINT `FK_Trip_TripCities` FOREIGN KEY (`trip`) REFERENCES `trip` (`id`)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `FK_City_TripCities` FOREIGN KEY (`city`) REFERENCES `city` (`id`)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE `trip_land` (
    trip INT PRIMARY KEY,
    hotel1 INT,
    hotel2 INT,
    CONSTRAINT `FK_ID_TripLand` FOREIGN KEY (`trip`) REFERENCES `trip` (`id`)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `FK_Hotel1_TripLand` FOREIGN KEY (`hotel1`) REFERENCES `hotel` (`id`)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT `FK_Hotel2_TripLand` FOREIGN KEY (`hotel2`) REFERENCES `hotel` (`id`)
        ON UPDATE CASCADE ON DELETE RESTRICT    
);

CREATE TABLE `trip_air` (
    trip INT PRIMARY KEY,
    city1 INT NOT NULL,
    departure1 TIME,
    city2 INT NOT NULL,
    departure2 TIME,
    CONSTRAINT `FK_ID_TripAir` FOREIGN KEY (`trip`) REFERENCES `trip` (`id`)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `FK_City1_TripLand` FOREIGN KEY (`city1`) REFERENCES `city` (`id`)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT `FK_City2_TripLand` FOREIGN KEY (`city2`) REFERENCES `city` (`id`)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

/********** INSERTION OF EXAMPLE VALUES **********/

INSERT INTO `language` (`id`, `name`, `iso`) VALUES
    (1, 'catala', 'cat'),
    (2, 'english', 'eng'),
    (3, 'español', 'spa'),
    (4, 'chinese', 'zho'),
    (5, 'arabic', 'ara');

INSERT INTO `city` (`id`, `common_name`) VALUES
    (1, 'Barcelona'),(2, 'London'),(3, '北京市'),(4, 'الدوحة'),(5, 'Berlin'),(6, '上海市'),(7, 'بغداد'),(8, 'Madrid'),
    (9, 'Sevilla'), (10, 'Santander'), (11, 'Dublin'), (12, 'Edinburgh'), (13, 'Tokyo'), (14,'Hanoi'), (15,'New York'),
    (16, 'Los Angeles'), (17,'Chicago');

INSERT INTO `city_language` (`city`, `language`, `name`) VALUES
    (1,1,'Barcelona'), (1,2,'Barcelona'), (1,4,'巴塞隆納'), (1,5,'برشلونة'),
    (2,1,'Londres'), (2,2,'London'), (2,3,'Londres'), (2,4,'倫敦'), (2,5,'لندن'),
    (3,1,'Pequín'), (3,2,'Beijing'), (3,3,'Pekín'), (3,4,'北京市'), (3,5,'بكين'),
    (4,1,'Doha'), (4,2,'Doha'), (4,3,'Doha'), (4,4,'多哈'), (4,5,'الدوحة'),
    (5,1,'Berlín'), (5,2,'Berlin'), (5,3,'Berlín'), (5,4,'柏林'), (5,5,'برلين'),
    (6,1,'Xanghai'), (6,2,'Shanghai'), (6,3,'Shanghai'), (6,4,'上海市'), (6,5,'شانغهاي'),
    (7,1,'Bagdad'), (7,2,'Baghdad'), (7,3,'Bagdad'), (7,4,'巴格達'), (7,5,'بغداد'),
    (8,1,'Madrid'), (8,2,'Madrid'), (8,3,'Madrid'),(8,4,'马德里'), (8,5,'مدريد'),
    (9,1,'Sevilla'), (9,2,'Seville'), (9,3,'Sevilla'), (9,4,'塞维利亚'), (9,5,'إشبيلية'),
    (10,1,'Santander'), (10,2,'Santander'), (10,3,'Santander'), (10,4,'桑坦德'), (10,5,'شنت أندر'),
    (11,1,'Dublín'), (11,2,'Dublin'), (11,3,'Dublín'), (11,4,'都柏林'), (11,5,'دبلن'),
    (12,1,'Edimburg'), (12,2,'Edinburgh'), (12,3,'Edimburgo'), (12,4,'愛丁堡'), (12,5,'إدنبرة'),
    (13,1,'Tòquio'), (13,2,'Tokyo'), (13,3,'Tokio'), (13,4,'東京都'), (13,5,'طوكيو'),
    (14,1,'Hanoi'), (14,2,'Hanoi'), (14,3,'Hanói'), (14,4,'河內市'), (14,5,'هانوي'),
    (15,1,'Nova York'), (15,2,'New York'), (15,3,'Nueva York'), (15,4,'纽约'), (15,5,'نيويورك'),
    (16,1,'Los Angeles'), (16,2,'Los Angeles'), (16,3,'Los Ángeles'), (16,4,'洛杉矶'), (16,5,'لوس أنجلوس'),
    (17,1,'Chicago'), (17,2,'Chicago'), (17,3,'Chicago'), (17,4,'芝加哥'), (17,5,'شيكاغو');

INSERT INTO `hotel` (`id`, `name`, `stars`, `city`) VALUES
    (1, 'Hotel Mediterrània', 4, 1),
    (2, 'Hotel Wald der Greifen', 5, 5),
    (3, 'Hotel Núr al-Dín', 4, 7),
    (4, 'فندق الفيل', 3, 4),
    (5, 'Hotel Reial', 2, 8),
    (6, 'Hotel Al-Andalus', 4, 9),
    (7, 'Hotel Plaza', 5, 15),
    (8, 'Hotel California', 1, 16);

INSERT INTO `trip` (`id`, `name`, `type`, `days`) VALUES
    (1, 'The Asian Magnolia', 'air', 7),
    (2, 'One thousand and one nights', 'land', 6),
    (3, "Eruope's core", 'land', 4),
    (4, 'Spain from north to south', 'land', 4),
    (5, 'Discovering the commonwealth', 'air', 8),
    (6, 'The rising sun', 'air', 5),
    (7, 'American Dream', 'land', 14),
    (8, "Willy Fog's Envision", 'air', 80);

INSERT INTO `trip_cities` (`trip`, `city`, `ordre`) VALUES
    (1,1,1), (1,3,2), (1,6,3),
    (2,7,1), (2,4,2),
    (3,1,1), (3,2,2), (3,5,3),
    (4,10,1), (4,8,2), (4,9,3),
    (5,2,1), (5,11,2), (5,12,3),
    (6,14,1), (6,3,2), (6,13,3),
    (7,15,1), (7,16,2), (7,17,3),
    (8,2,1), (8,15,2), (8,13,3), (8,7,4), (8,5,5);

INSERT INTO `trip_land` (`trip`, `hotel1`, `hotel2`) VALUES
    (2,3,4), (3,1,2), (4,5,6), (7,7,8);

INSERT INTO `trip_air` (`trip`, `city1`, `departure1`, `city2`, `departure2`) VALUES
    (1,1,'07:30',6,'22:00'), (5,2,'06:30',12,'15:00'), (6,14,'23:30', 13, '08:40'), (8,2,"12:00",7,"21:45");