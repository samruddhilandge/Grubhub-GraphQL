-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2019 at 03:35 PM
-- Server version: 5.7.9
-- PHP Version: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grubhub`
--

-- --------------------------------------------------------

--
-- Table structure for table `bagtable`
--

DROP TABLE IF EXISTS `bagtable`;
CREATE TABLE IF NOT EXISTS `bagtable` (
  `bag_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) DEFAULT NULL,
  `item_id` int(11) NOT NULL,
  `price` float DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `restaurant_id` int(11) DEFAULT NULL,
  `buyer_id` int(11) NOT NULL,
  PRIMARY KEY (`bag_item_id`)
) ENGINE=MyISAM AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bagtable`
--

INSERT INTO `bagtable` (`bag_item_id`, `item_name`, `item_id`, `price`, `quantity`, `restaurant_id`, `buyer_id`) VALUES
(69, 'Pizza', 20, 9, 2, 10, 2),
(38, 'pizza', 2, 7, 2, 2, 6),
(68, 'Pizza', 1, 6, 3, 1, 2),
(52, 'Coffee', 17, 3.98, 3, 5, 3),
(53, 'Rice', 19, 15, 1, 5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `buyer`
--

DROP TABLE IF EXISTS `BUYER`;
CREATE TABLE IF NOT EXISTS `BUYER` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `hashpwd` varchar(100) DEFAULT NULL,
  `pwd` varchar(100) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `imagelocation` varchar(255) DEFAULT NULL,
  `imagename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `buyer`
--

INSERT INTO `BUYER` (`id`, `name`, `email`, `hashpwd`, `pwd`, `phone`, `address`, `imagelocation`, `imagename`) VALUES
(6, 'Angel1', 'angel@gmail.com', 'e080016f7dcc7a573d2735ce5ad8128342b3972ecc4e4513a32bf9a150cfeb7e', 'angel', '8563241526', 'Villa Torrino, San Jose', NULL, NULL),
(5, 'Foram', 'foram@gmail.com', '71fc17a45cbed7a9df1b476d46a12e312fbee85eda46527257f35290446af379', 'foram', '8523614296', '101 San Fernando, San Jose', NULL, NULL),
(4, 'Mitali', 'mitu@gmail.com', '3c5b976b1489b35f9544378c486cc29f772ab1da33ff03298fbeb5fc3545c124', 'mitu', '8547896325', 'Foundry Commons, San Jose', NULL, NULL),
(2, 'Bhagyashree', 'bhagu@gmail.com', '84b563ad27135e8d1fe1eb3e84f733618413f07da4dda8ba8a2babb00fd726b8', 'bhagu', '3159324756', 'Foundry Commons, San Jose', NULL, NULL),
(1, 'Samruddhi', 'samruddhi.landge@sjsu.edu', 'd52c10a26eb21bacac875fd66ddafdf0419b303f59fc9e49dedb6d94889ad6dd', 'samruddhi', '4085236544', 'Centerra Apartments, San jose', 'uploads\\1\\Picture1.jpg', 'Picture1.jpg'),
(3, 'Himani', 'himu@gmail.com', '0e9440dad76cf2faa7ddfc3a4431dc7c4b2f0fa8bd4880efdfb30b1b750fde6d', 'himu', '5124789636', '33 South Apartments, San Jose', NULL, NULL),
(21, 'Noopur ', 'noopur@gmail.com', '7337e9e97e92708ba1375b4f9b016e934b078947c1894ff295e0c355286c5bca', 'noopur', '4125632587', 'Colonade Apartment, San Jose', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ITEMTABLE`
--

DROP TABLE IF EXISTS `ITEMTABLE`;
CREATE TABLE IF NOT EXISTS `ITEMTABLE` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `restaurant_id` int(11) DEFAULT NULL,
  `section_name` varchar(255) DEFAULT NULL,
  `cuisine` varchar(255) DEFAULT NULL,
  `imagelocation` varchar(255) NOT NULL,
  `imagename` varchar(255) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ITEMTABLE`
--

INSERT INTO `ITEMTABLE` (`item_id`, `item_name`, `description`, `price`, `restaurant_id`, `section_name`, `cuisine`, `imagelocation`, `imagename`) VALUES
(1, 'Pizza', 'margarita', 6, 1, 'breakfast', 'italian', 'uploads\\pizza1.jpg', ''),
(2, 'Pizza', 'Mozzarella Cheese capsicum-tomato Pizza', 19.99, 1, 'meal', 'italian', 'uploads\\pizza2.jpg', ''),
(5, 'Guacamole', 'Sweet Appetizer', 4.99, 1, 'appetizer', '', 'uploads\\guacamole.jpg', ''),
(6, 'Sandwich', 'Vegetarian Sandwich', 7.59, 1, 'breakfast', '', 'uploads\\sandwich.jpg', ''),
(36, 'Pizza', 'Cheese Piizza', 15, 2, 'meal', 'italian', 'uploads\\pizza5.jpg', 'Screenshot (11).png'),
(38, 'Coffee', 'classic Coffee', 9.99, 2, 'beverage', 'general', 'uploads\\coffee.jpg', 'Screenshot (11).png'),
(8, 'Coke', 'Coke', 3.25, 1, 'beverage', '', 'uploads\\coke.jpg', ''),
(9, 'Coke', 'Coke', 3.66, 10, 'beverage', '', 'uploads\\coke.jpg', ''),
(11, 'Coke', 'Coke', 3.25, 11, 'beverage', '', 'uploads\\coke.jpg', ''),
(12, 'Diet Coke', 'Diet Coke', 3.25, 1, 'beverage', '', 'uploads\\dietcoke.jpg', ''),
(13, 'Diet Coke', 'Diet Coke', 3.24, 10, 'beverage', '', 'uploads\\dietcoke.jpg', ''),
(14, 'Diet Coke', 'Diet Coke', 3.25, 11, 'beverage', '', 'uploads\\dietcoke.jpg', ''),
(15, 'Coffee', 'Coffee', 3.98, 1, 'beverage', '', 'uploads\\coffee.jpg', ''),
(17, 'Coffee', 'Coffee', 3.98, 5, 'beverage', '', 'uploads\\coffee.jpg', ''),
(18, 'Rice', 'Slow cooked rice', 13, 4, 'meal', 'indian', 'uploads\\rice.jpg', ''),
(19, 'Rice', 'Slow cooked rice with few Spices', 15, 5, 'meal', 'indian', 'uploads\\rice.jpg', ''),
(21, 'Pizza', 'Capsicum Tomato Cottage Cheese', 20, 11, 'meal', 'italian', 'uploads\\pizza1.jpg', ''),
(20, 'Pizza', 'Cheese Pizza ', 9, 10, 'meal', 'italian', 'uploads\\pizza1.jpg', ''),
(22, 'Pizza', 'Thin Crust Pizza', 15, 4, 'meal', 'italian', 'uploads\\pizza3.jpg', ''),
(24, 'Pasta', 'White Sauce Pasta', 10, 11, 'breakfast', 'italian', 'uploads\\pasta3.jpg', ''),
(23, 'Pasta', 'White Sauce Pasta', 7, 1, 'breakfast', 'italian', 'uploads\\pasta4.jpg', ''),
(25, 'Pasta', 'Red Sauce Pasta', 12, 12, 'breakfast', 'italian', 'uploads\\pasta1.jpg', ''),
(26, 'Pasta', 'Red Chiili Sauce Pasta ', 13.99, 13, 'breakfast', 'italian', 'uploads\\pasta2.jpg', ''),
(27, 'Dal', 'Yellow Dal with classic Indian Spices', 25, 4, 'meal', 'indian', 'uploads\\dal.jpg', ''),
(28, 'Dal', 'Yellow Dal with classic Indian Spices and garnished with Curry Leaves', 29.5, 5, 'meal', 'indian', 'uploads\\dal2.jpg', ''),
(29, 'Dal', 'Black Dal with Kidney Beans', 30, 6, 'meal', 'indian', 'uploads\\dal3.jpg', ''),
(30, 'Sambhar', 'Classic Soth Indian Sambhar with spices', 25, 4, 'meal', 'indian', 'uploads\\dal5.jpg', ''),
(31, 'Sambhar ', 'Classic Indian Style Sambhar', 26.99, 6, 'meal', 'indian', 'uploads\\dal5.jpg', ''),
(32, 'Sushi ', 'Unagi', 30, 12, 'meal', 'asian', 'uploads\\sushi.jpg', ''),
(33, 'Rice', 'Jeera Rice', 20.99, 6, 'meal', 'indian', 'uploads\\rice2.jpg', ''),
(34, 'Pulao', 'Rice cooked with Classic Indian Spices', 30, 4, 'meal', 'indian', 'uploads\\pulao.jpg', ''),
(37, 'Pizza', 'Cottage Cheese Pizza', 18.99, 2, 'meal', 'italian', 'uploads\\paneer.jpg', 'Screenshot (11).png');

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

DROP TABLE IF EXISTS `OWNER`;
CREATE TABLE IF NOT EXISTS `OWNER` (
  `restaurant_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `hashpwd` varchar(100) DEFAULT NULL,
  `pwd` varchar(100) DEFAULT NULL,
  `restaurant_name` varchar(100) DEFAULT NULL,
  `restaurant_zip` varchar(10) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `cuisine` varchar(30) DEFAULT NULL,
  `imagelocation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`restaurant_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `OWNER`
--

INSERT INTO `OWNER` (`restaurant_id`, `name`, `email`, `hashpwd`, `pwd`, `restaurant_name`, `restaurant_zip`, `phone`, `cuisine`, `imagelocation`) VALUES
(1, 'Mac', 'mac@gmail.com', '62b24ab82eeb09a4cad61a3a9d43c4b8977e886ca20af3450be5adc27bef0cc1', 'mac', 'Pizza My Heart', '95112', '9562341256', 'italian', 'uploads\\r1.jpg'),
(2, 'Lisa', 'lisa@gmail.com', '2cebab8bd3b61cd5f1950012564f4658b1fdc8dbd116513d2bc4573a46afcb1f', 'lisa', 'Arroz Rojo', '95120', '4085632545', 'Asian', 'uploads\\r2.jpg'),
(3, 'Mike', 'mike2@gmail.com', 'ed25face73061cb8f5a4e6bb3cbf14591a08c8af9a9420e3eb6c3550a8798e3a', 'mike', 'Not Only Nuts', '95117', '4083651258', 'thai', 'uploads\\r3.jpg'),
(4, 'Ajay', 'ajay23@gmail.com', '153b00c0f5821a2c4ff4372ed70dfde5c37b9764e5e1ec4c3b64ef567f1be083', 'ajay', 'Mumbai Local', '95139', '4085632656', 'indian', 'uploads\\r4.jpg'),
(5, 'Nisha', 'nisha@gmail.com', '4f46315abfcfd52798adbf7cf63f2f3d97ef52ad7016be3a0b88134cd9721421', 'nisha', 'Punjab Cafe', '95138', '3152696562', 'indian', 'uploads\\r5.jpg'),
(6, 'Ravi', 'ravi@gmail.com', '7759e546430422b8919dc4cfabbf62aca5048bd46ed46afee2364b539effb4a8', 'ravi', 'Chennai Kings', '95118', '4125632521', 'indian', 'uploads\\r6.jpg'),
(7, 'Nitya', 'nitya@yahoo.com', '8f2bf331267dd3a6f7b201797da9e4cdb5e505f936fa356215035b7c00c1d818', 'nitya', 'Blue Mango Sushi', '95134', '4125639878', 'asian', 'uploads\\r7.jpg'),
(8, 'Bill', 'bill@gmail.com', '651350926872f1a469f8ae7baed7e8c57a517934009ab6b7c33febfe16d147db', 'bill', 'Tempulet Sushi', '95148', '4125632541', 'asian', 'uploads\\r8.jpg'),
(9, 'Richard', 'richard@yahoo.com', '9fc54651c14cbb56bda653a15a34ae2e75d46ad78ec50839abb0f22b958a1d2d', 'richard', 'Sun-Ly Chinese Food', '95050', '4125896342', 'chinese', 'uploads\\r9.jpg'),
(10, 'Jerry', 'jerry@gmail.com', '1e334cd2fae6849b742a527ae69da88b04b231177165f2ffd3345d84e857f565', 'jerry', 'Papa John''s Pizza', '95054', '408256332', 'italian', 'uploads\\r10.jpg'),
(11, 'Anita', 'anita10@gmail.com', 'f41415d22aff850ba3415c8f68be3b88096a1f1ec6ad8f77df011c51df3aeb13', 'anita', 'Pizza Express', '95112', '4085213694', 'italian', 'uploads\\r11.jpg'),
(12, 'Ben', 'ben@gmail.com', '64ab8d65f7da38a9735852a5bfcc4197c8ee7bcc34cd36eba1266270860852ea', 'ben', 'Al Castello', '94043', '3156234856', 'italian', 'uploads\\r12.jpg'),
(13, 'George', 'george@gmail.com', '6fbd71bc054194a3ada559b20b5adf2e16ab89171de2986d08a856e96b7d5d74', 'george', 'Old Spaghetti Factory', '94085', '6154236958', 'italian', 'uploads\\r13.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `placed_order`
--

DROP TABLE IF EXISTS `PLACED_ORDER`;
CREATE TABLE IF NOT EXISTS `PLACED_ORDER` (
  `placed_order_id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurant_id` int(11) DEFAULT NULL,
  `buyer_id` int(11) DEFAULT NULL,
  `buyer_name` varchar(255) DEFAULT NULL,
  `buyer_address` varchar(255) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'new',
  PRIMARY KEY (`placed_order_id`)
) ENGINE=MyISAM AUTO_INCREMENT=69 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `placed_order`
--

INSERT INTO `PLACED_ORDER` (`placed_order_id`, `restaurant_id`, `buyer_id`, `buyer_name`, `buyer_address`, `item_id`, `item_name`, `quantity`, `price`, `status`) VALUES
(63, 12, 1, 'Samruddhi', 'Centerra Apartments, San jose', 32, 'Sushi ', 1, 1, 'cancel'),
(64, 2, 1, 'Samruddhi', 'Centerra Apartments, San jose', 36, 'Pizza', 2, 2, 'ready'),
(65, 2, 1, 'Samruddhi', 'Centerra Apartments, San jose', 37, 'Pizza', 3, 3, 'cancel'),
(66, 2, 1, 'Samruddhi', 'Centerra Apartments, San jose', 36, 'Pizza', 2, 2, 'delivered'),
(67, 15, 27, 'Mark', 'sanJose', 48, 'pizza', 3, 3, 'cancel'),
(68, 15, 27, 'Mark', 'sanJose', 47, 'pasta1', 2, 2, 'cancel');

-- --------------------------------------------------------

--
-- Table structure for table `restauranttable`
--

DROP TABLE IF EXISTS `RESTAURANTTABLE`;
CREATE TABLE IF NOT EXISTS `RESTAURANTTABLE` (
  `restaurant_id` int(11) NOT NULL AUTO_INCREMENT,
  `restaurant_name` varchar(255) DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`restaurant_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `RESTAURANTTABLE`
--

INSERT INTO `RESTAURANTTABLE` (`restaurant_id`, `restaurant_name`, `owner_id`) VALUES
(1, 'BJ''s Restaurant & Brewhouse', 1),
(2, 'Pizza My Heart', 2);

-- --------------------------------------------------------

--
-- Table structure for table `SECTIONTABLE`
--

DROP TABLE IF EXISTS `SECTIONTABLE`;
CREATE TABLE IF NOT EXISTS `SECTIONTABLE` (
  `section_id` int(11) NOT NULL AUTO_INCREMENT,
  `section_name` varchar(255) DEFAULT NULL,
  `restaurant_id` int(11) NOT NULL,
  PRIMARY KEY (`section_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `SECTIONTABLE`
--

INSERT INTO `SECTIONTABLE` (`section_id`, `section_name`, `restaurant_id`) VALUES
(1, 'breakfast', 1),
(2, 'meal', 4),
(3, 'appetizer', 0),
(5, 'meal', 5),
(6, 'meal', 2),
(8, 'bye', 1),
(9, 'snacks', 15);

-- --------------------------------------------------------

--
-- Table structure for table `STATUSTABLE`
--

DROP TABLE IF EXISTS `STATUSTABLE`;
CREATE TABLE IF NOT EXISTS `STATUSTABLE` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `buyer_id` int(11) DEFAULT NULL,
  `restaurant_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'new',
  PRIMARY KEY (`status_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
