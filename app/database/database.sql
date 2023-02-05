DROP DATABASE IF EXISTS `vueling-nuwe-osr`;
CREATE DATABASE `vueling-nuwe-osr` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
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
    (1, 'Barcelona'),
    (2, 'London'),
    (3, '北京市'),
    (4, 'الدوحة'),
    (5, 'Berlin'),
    (6, '上海市'),
    (7, 'بغداد');

INSERT INTO `city_language` (`city`, `language`, `name`) VALUES
    (1,1,'Barcelona'), (1,2,'Barcelona'), (1,4,'巴塞隆納'), (1,5,'برشلونة'),
    (2,1,'Londres'), (2,2,'London'), (2,3,'Londres'), (2,4,'倫敦'), (2,5,'لندن'),
    (3,1,'Pequín'), (3,2,'Beijing'), (3,3,'Pekín'), (3,4,'北京市'), (3,5,'بكين'),
    (4,1,'Doha'), (4,2,'Doha'), (4,3,'Doha'), (4,4,'多哈'), (4,5,'الدوحة'),
    (5,1,'Berlín'), (5,2,'Berlin'), (5,3,'Berlín'), (5,4,'柏林'), (5,5,'برلين'),
    (6,1,'Xanghai'), (6,2,'Shanghai'), (6,3,'Shanghai'), (6,4,'上海市'), (6,5,'شانغهاي'),
    (7,1,'Bagdad'), (7,2,'Baghdad'), (7,3,'Bagdad'), (7,4,'巴格達'), (7,5,'بغداد');

INSERT INTO `hotel` (`id`, `name`, `stars`, `city`) VALUES
    (1, 'Hotel Mediterrània', 4, 1),
    (2, 'Hotel Wald der Greifen', 5, 5),
    (3, 'Hotel Núr al-Dín', 4, 7),
    (4, 'فندق الفيل', 3, 4);

INSERT INTO `trip` (`id`, `name`, `type`, `days`) VALUES
    (1, 'The Asian Magnolia', 'air', 7),
    (2, 'One thousand and one nights', 'land', 6),
    (3, 'Eruopes core', 'land', 4);

INSERT INTO `trip_cities` (`trip`, `city`, `ordre`) VALUES
    (1,1,1), (1,3,2), (1,6,3),
    (2,7,1), (2,4,2),
    (3,1,1), (3,2,2), (3,5,3);

INSERT INTO `trip_land` (`trip`, `hotel1`, `hotel2`) VALUES
    (2,3,4),
    (3,1,2);

INSERT INTO `trip_air` (`trip`, `city1`, `departure1`, `city2`, `departure2`) VALUES
    (1,1,'07:30',6,'22:00');