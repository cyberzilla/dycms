/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50620
Source Host           : localhost:3306
Source Database       : dycms_dzakiyyah

Target Server Type    : MYSQL
Target Server Version : 50620
File Encoding         : 65001

Date: 2016-11-30 17:28:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for mainMenu
-- ----------------------------
DROP TABLE IF EXISTS `mainMenu`;
CREATE TABLE `mainMenu` (
  `mainMenuId` int(11) NOT NULL AUTO_INCREMENT,
  `mainMenuNama` varchar(255) DEFAULT NULL,
  `mainMenuUrl` varchar(255) DEFAULT NULL,
  `mainMenuInfo` varchar(255) DEFAULT NULL,
  `mainMenuIcon` varchar(255) DEFAULT NULL,
  `mainMenuAktif` enum('Yes','No','') DEFAULT 'Yes',
  `mainMenuLevel` int(11) DEFAULT NULL,
  `mainMenuUrutan` int(11) DEFAULT NULL,
  PRIMARY KEY (`mainMenuId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of mainMenu
-- ----------------------------
INSERT INTO `mainMenu` VALUES ('1', 'Dashboard Horizontal', null, null, 'fa fa-dashboard', 'No', null, null);
INSERT INTO `mainMenu` VALUES ('2', 'Diagram', null, null, 'fa fa-pie-chart', 'No', null, null);
INSERT INTO `mainMenu` VALUES ('3', 'Manajemen File', null, null, 'fa fa-folder', 'No', null, null);
INSERT INTO `mainMenu` VALUES ('4', 'Testing', null, null, 'fa fa-bug', 'Yes', null, null);
INSERT INTO `mainMenu` VALUES ('5', 'Konfigurasi Web', 'konfigurasiWeb', 'Berisi Menu Konfigurasi Website', 'fa fa-cogs', 'Yes', null, '100');
INSERT INTO `mainMenu` VALUES ('6', 'Tes', 'anu', 'anu', 'fa fa-trash', 'Yes', null, null);

-- ----------------------------
-- Table structure for subMenu
-- ----------------------------
DROP TABLE IF EXISTS `subMenu`;
CREATE TABLE `subMenu` (
  `subMenuId` int(11) NOT NULL AUTO_INCREMENT,
  `subMenuNama` varchar(255) DEFAULT NULL,
  `subMenuUrl` varchar(255) DEFAULT NULL,
  `subMenuInfo` varchar(255) DEFAULT NULL,
  `subMenuIcon` varchar(255) DEFAULT NULL,
  `subMenuAktif` enum('Yes','No','') DEFAULT 'Yes',
  `subMenuMainMenuId` int(11) NOT NULL,
  `subMenuUrutan` int(11) DEFAULT NULL,
  PRIMARY KEY (`subMenuId`),
  KEY `subMenuMainMenu` (`subMenuMainMenuId`),
  CONSTRAINT `subMenu_ibfk_1` FOREIGN KEY (`subMenuMainMenuId`) REFERENCES `mainMenu` (`mainMenuId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of subMenu
-- ----------------------------
INSERT INTO `subMenu` VALUES ('1', 'Menu Utama', 'mainmenu', 'Konfigurasi Menu Utama', 'fa fa-bars', 'Yes', '5', null);
INSERT INTO `subMenu` VALUES ('3', 'Sub Menu', 'submenu', 'Konfigurasi Sub Menu', 'fa fa-bars', 'Yes', '5', null);
INSERT INTO `subMenu` VALUES ('4', 'Referensi', 'referensi', 'Berisi Informasi Referensi Website', 'fa fa-book', 'Yes', '5', null);
INSERT INTO `subMenu` VALUES ('5', 'Pengaturan', 'setting', 'Setting Website', 'fa fa-globe', 'Yes', '5', null);
INSERT INTO `subMenu` VALUES ('6', 'Diagram', 'bar', 'Diagram (c3.js)', 'fa fa-bar-chart', 'Yes', '2', null);
INSERT INTO `subMenu` VALUES ('7', 'Manajemen File', 'filemanager', 'Manajemen File', 'fa fa-folder-open', 'Yes', '3', null);
INSERT INTO `subMenu` VALUES ('8', 'Testing', 'testingTab', 'Percobaan', 'fa fa-bug', 'Yes', '4', null);
SET FOREIGN_KEY_CHECKS=1;
