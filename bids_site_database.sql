-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Φιλοξενητής: 127.0.0.1:3306
-- Χρόνος δημιουργίας: 06 Σεπ 2019 στις 15:01:30
-- Έκδοση διακομιστή: 5.7.24
-- Έκδοση PHP: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `bids_site`
--

DELIMITER $$
--
-- Διαδικασίες
--
DROP PROCEDURE IF EXISTS `create_conn`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_conn` (IN `p_user_id_1` VARCHAR(20), IN `p_user_id_2` VARCHAR(20))  INSERT INTO user_connection (user_id_1,user_id_2)
    SELECT * FROM (SELECT p_user_id_1,p_user_id_2) AS tmp
    WHERE NOT EXISTS (
        SELECT * FROM user_connection 
                   WHERE (user_id_1 = p_user_id_1
                   AND user_id_2 = p_user_id_2)
                   OR  (user_id_1= p_user_id_2 AND user_id_2=p_user_id_1)
    ) LIMIT 1$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `bids`
--

DROP TABLE IF EXISTS `bids`;
CREATE TABLE IF NOT EXISTS `bids` (
  `bid_id` int(11) NOT NULL AUTO_INCREMENT,
  `bidder_id` varchar(20) NOT NULL,
  `time` datetime NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  PRIMARY KEY (`bid_id`),
  KEY `Bids_fk0` (`bidder_id`)
) ENGINE=MyISAM AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(5) NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(50) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Άδειασμα δεδομένων του πίνακα `category`
--

INSERT INTO `category` (`category_id`, `cat_name`) VALUES
(1, 'Computers'),
(2, 'Cameras'),
(3, 'Cell phones and Accessories'),
(4, 'Home'),
(5, 'Video Games'),
(6, 'Fashion'),
(7, 'Musical Instruments and Gear');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `items`
--

DROP TABLE IF EXISTS `items`;
CREATE TABLE IF NOT EXISTS `items` (
  `item_id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `image` varchar(300) DEFAULT NULL,
  `first_bid` float(10,0) NOT NULL,
  `currently` float(10,0) NOT NULL,
  `location` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `description` varchar(300) NOT NULL,
  `number_of_bids` int(10) NOT NULL,
  `buy_price` float(10,0) NOT NULL,
  `bought` int(1) NOT NULL DEFAULT '0',
  `started` datetime DEFAULT NULL,
  `ends` int(2) NOT NULL,
  `enddate` datetime DEFAULT NULL,
  `user_id` varchar(20) NOT NULL,
  `last_bidder` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `Items_fk0` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=121 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `items_bids`
--

DROP TABLE IF EXISTS `items_bids`;
CREATE TABLE IF NOT EXISTS `items_bids` (
  `item_id` int(10) NOT NULL,
  `bid_id` int(10) NOT NULL,
  KEY `Items_Bids_fk0` (`item_id`),
  KEY `Items_Bids_fk1` (`bid_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `item_category`
--

DROP TABLE IF EXISTS `item_category`;
CREATE TABLE IF NOT EXISTS `item_category` (
  `category_id` int(5) NOT NULL,
  `item_id` int(10) NOT NULL,
  KEY `Item_Category_fk0` (`category_id`),
  KEY `Item_Category_fk1` (`item_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(1000) NOT NULL,
  `mes_date` datetime NOT NULL,
  `sender` varchar(20) NOT NULL,
  `receiver` varchar(20) NOT NULL,
  PRIMARY KEY (`message_id`)
) ENGINE=MyISAM AUTO_INCREMENT=88 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` varchar(20) NOT NULL,
  `password` varchar(60) NOT NULL,
  `name` varchar(32) NOT NULL,
  `surname` varchar(32) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `afm` varchar(50) NOT NULL,
  `rating_bidder` int(50) DEFAULT NULL,
  `rating_seller` int(50) DEFAULT NULL,
  `approved` int(1) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Άδειασμα δεδομένων του πίνακα `users`
--

INSERT INTO `users` (`user_id`, `password`, `name`, `surname`, `email`, `phone`, `address`, `city`, `country`, `afm`, `rating_bidder`, `rating_seller`, `approved`) VALUES
('giannis', '$2b$10$pDwd2Ys/BNQnGqgQX6Vgtu7AanPE5KRVgb4jN6XyLhqfGrNxaHcHe', 'Giannis', 'Kampourelis', 'giannis@gmail.com', '6977833421', 'Ελευθερίου Βενιζέλου 59', 'Pallini', 'Greece', '100231456', NULL, NULL, 1),
('administrator', '$2b$10$R2b.HRaYbwARqVYr9jcyceAfRYlJpYZfvZ6XKyQ6.yk3qh08sqVSK', '-', '-', 'admin@gmail.com', '-', '-', '-', 'Greece', '111111111', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `user_connection`
--

DROP TABLE IF EXISTS `user_connection`;
CREATE TABLE IF NOT EXISTS `user_connection` (
  `conn_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id_1` varchar(20) NOT NULL,
  `user_id_2` varchar(20) NOT NULL,
  PRIMARY KEY (`conn_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

DELIMITER $$
--
-- Συμβάντα
--
DROP EVENT `Every_10_Minutes_Cleanup`$$
CREATE DEFINER=`root`@`localhost` EVENT `Every_10_Minutes_Cleanup` ON SCHEDULE EVERY 10 MINUTE STARTS '2015-08-14 16:35:00' ON COMPLETION PRESERVE ENABLE DO BEGIN
  	INSERT INTO user_connection(user_id_1,user_id_2)
	SELECT user_id,last_bidder FROM items as i
              WHERE i.enddate<NOW() AND i.last_bidder IS NOT NULL AND NOT EXISTS ( SELECT * FROM user_connection  as conn
                                                      WHERE (conn.user_id_1 = i.user_id AND conn.user_id_2 = i.last_bidder) OR (conn.user_id_1= i.last_bidder AND conn.user_id_2=i.user_id) LIMIT 1);
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
