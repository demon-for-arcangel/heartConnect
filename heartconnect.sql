-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: heartconnect
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ruta` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assets`
--

LOCK TABLES `assets` WRITE;
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;
INSERT INTO `assets` VALUES (1,'1.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(2,'2.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(3,'3.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(4,'4.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(5,'5.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(6,'6.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(7,'7.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(8,'8.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(9,'9.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(10,'10.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(11,'11.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(12,'12.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(13,'13.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(14,'14.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(15,'15.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(16,'16.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(17,'17.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(18,'18.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(19,'19.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48'),(20,'20.jpg','2024-05-07 21:25:48','2024-05-07 21:25:48');
/*!40000 ALTER TABLE `assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `des` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `public` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Evento 1','Descripción del Evento 1','2024-05-07 21:25:51',1,'2024-05-07 21:25:51','2024-05-07 21:25:51'),(2,'Evento 2','Descripción del Evento 2','2024-05-07 21:25:51',0,'2024-05-07 21:25:51','2024-05-07 21:25:51');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preferences`
--

DROP TABLE IF EXISTS `preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preferences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sports` varchar(255) DEFAULT NULL,
  `artistic` varchar(255) DEFAULT NULL,
  `politicians` varchar(255) DEFAULT NULL,
  `relationship_type` varchar(255) DEFAULT NULL,
  `has_children` tinyint(1) DEFAULT '0',
  `wants_children` tinyint(1) DEFAULT NULL,
  `interest` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preferences`
--

LOCK TABLES `preferences` WRITE;
/*!40000 ALTER TABLE `preferences` DISABLE KEYS */;
INSERT INTO `preferences` VALUES (1,'Volleyball','Painting','Democrat','seria',0,1,'mujeres','2024-05-07 21:25:51','2024-05-07 23:23:28'),(2,'Basketball','Sculpture','Republican','esporádica',1,0,'ambos','2024-05-07 21:25:51','2024-05-07 21:25:51');
/*!40000 ALTER TABLE `preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'administrador','Administrador de toda la aplicación.','2024-05-07 21:25:50','2024-05-07 21:25:50'),(2,'usuario','Usuario normal que disfruta de la aplicación.','2024-05-07 21:25:50','2024-05-07 21:25:50');
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20240316232758-create-rol.js'),('20240316232917-create-asset.js'),('20240316233046-create-events.js'),('20240316233114-create-preferences.js'),('920240316203342-create-user.js'),('920240316232739-create-user-rols.js'),('920240316232904-create-user-assets.js'),('920240316232936-create-user-friend-ship.js'),('920240316233010-create-user-events.js'),('920240316233101-create-user-preferences.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_assets`
--

DROP TABLE IF EXISTS `user_assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_assets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_asset` int NOT NULL,
  `public` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`id_user`,`id_asset`),
  KEY `id_user` (`id_user`),
  KEY `id_asset` (`id_asset`),
  CONSTRAINT `user_assets_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `user_assets_ibfk_2` FOREIGN KEY (`id_asset`) REFERENCES `assets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_assets`
--

LOCK TABLES `user_assets` WRITE;
/*!40000 ALTER TABLE `user_assets` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_events`
--

DROP TABLE IF EXISTS `user_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_events` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`id_user`,`id_events`),
  KEY `id_user` (`id_user`),
  KEY `id_events` (`id_events`),
  CONSTRAINT `user_events_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `user_events_ibfk_2` FOREIGN KEY (`id_events`) REFERENCES `events` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_events`
--

LOCK TABLES `user_events` WRITE;
/*!40000 ALTER TABLE `user_events` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_friendship`
--

DROP TABLE IF EXISTS `user_friendship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_friendship` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_friendship` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`id_user`,`id_friendship`),
  KEY `id_user` (`id_user`),
  KEY `id_friendship` (`id_friendship`),
  CONSTRAINT `user_friendship_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `user_friendship_ibfk_2` FOREIGN KEY (`id_friendship`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_friendship`
--

LOCK TABLES `user_friendship` WRITE;
/*!40000 ALTER TABLE `user_friendship` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_friendship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_preferences`
--

DROP TABLE IF EXISTS `user_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_preferences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_preferences` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`id_user`,`id_preferences`),
  KEY `id_user` (`id_user`),
  KEY `id_preferences` (`id_preferences`),
  CONSTRAINT `user_preferences_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `user_preferences_ibfk_2` FOREIGN KEY (`id_preferences`) REFERENCES `preferences` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_preferences`
--

LOCK TABLES `user_preferences` WRITE;
/*!40000 ALTER TABLE `user_preferences` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_rols`
--

DROP TABLE IF EXISTS `user_rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_rols` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_rol` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`id_user`,`id_rol`),
  KEY `id_user` (`id_user`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `user_rols_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_rols_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `rols` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_rols`
--

LOCK TABLES `user_rols` WRITE;
/*!40000 ALTER TABLE `user_rols` DISABLE KEYS */;
INSERT INTO `user_rols` VALUES (1,1,1,'2024-05-07 21:25:51','2024-05-07 21:25:51'),(2,2,2,'2024-05-07 21:25:51','2024-05-07 21:25:51'),(3,4,2,'2024-05-07 21:25:51','2024-05-07 21:25:51'),(4,6,2,'2024-05-07 21:25:51','2024-05-07 21:25:51'),(6,11,2,'2024-05-07 21:25:51','2024-05-07 21:25:51'),(7,7,2,'2024-05-07 21:25:51','2024-05-07 21:25:51');
/*!40000 ALTER TABLE `user_rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `photo_profile` int DEFAULT '1',
  `born_date` datetime DEFAULT NULL,
  `domicile` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `photo_profile` (`photo_profile`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`photo_profile`) REFERENCES `assets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin1','admin@heartconnect.com','$2b$10$zFOGf8jy2mETl6NJNptam.9lVvwlEafMMVeebQVEctEg7acVVO.F6',1,'2000-01-01 00:00:00','403691.30310115 4282638.6555873','666 66 66 66',1,'2024-05-07 21:25:50','2024-05-07 21:25:50'),(2,'user','user1','user@heartconnect.com','$2b$10$kNgsyq2JwoF/pCgoi.W1GuqfJG6gDellrwpLITLgbTeUcddlPm12K',1,'2000-01-01 00:00:00','403691.30310115 4282638.6555873','666 66 66 66',1,'2024-05-07 21:25:50','2024-05-07 21:25:50'),(3,'marina','laguna','marinalaguna2004@gmail.com','$2b$10$.XsL3r5sDorB/RbXMKaxYuDw5Qeixa3qxpUdwN1i2YZ8qrnOMESim',1,'2004-06-22 00:00:00','403691.30310115 4282638.6555873','666 66 66 66',1,'2024-05-07 21:25:50','2024-05-08 08:06:20'),(4,'Yasmine','Swift','Jarrod.Lehner-Kshlerin@yahoo.com','$2b$10$GL.oxhCvqb0AgNMR3mjc5u6odVj762iJl2XeYWzainmX393Nk670e',7,'1975-05-22 11:30:34','3226 West Plaza','347-352-7552',0,'2024-05-07 21:25:50','2024-05-07 21:25:50'),(5,'Brent','Kunze','Raheem_Hegmann@yahoo.com','$2b$10$N/hkOACu9wLo/zOA1zcXvOkUh.WXNkhwdkRaw2bkd9.yCtdI3FX9u',8,'1948-06-17 16:03:05','15980 Broad Street','609.911.3688 x80123',1,'2024-05-07 21:25:50','2024-05-07 21:25:50'),(6,'Rosina','Okuneva','Myriam69@gmail.com','$2b$10$MajDnyfAI4zzutL.rihUUeA9DMY9PbYshSAuUe9TWl52b7iydt3Jy',9,'1980-03-31 14:07:09','254 Schuppe Forge','1-970-573-9090 x5370',0,'2024-05-07 21:25:50','2024-05-07 21:25:50'),(7,'Abdullah','Kreiger','Ericka27@gmail.com','$2b$10$KDbX2Eby4mnwgmS7Ud3gdOe0SZ5Chvcv/0SzZgQo05sytw6Rf2zvq',10,'1955-01-09 03:57:11','72364 Schneider Plaza','(557) 820-8226 x548',0,'2024-05-07 21:25:50','2024-05-07 21:25:50'),(8,'Derick','Fadel','Roselyn.Feeney52@yahoo.com','$2b$10$LnUh9gg6YhtBZXwlZ3S.o.AAXWYxy4duZPE4w4f08aBQ7f1XTHIDm',11,'1976-10-14 22:13:10','1959 Graham Crescent','515.465.6483 x17742',0,'2024-05-07 21:25:50','2024-05-07 21:25:50'),(9,'Manley','Goyette','Tremayne34@hotmail.com','$2b$10$hyptgdN5TeeZ7fcwpF85kedMI0a6He44JaEBt/QFVirU9YizcTy3O',12,'1997-06-23 20:19:12','38474 Kilback Freeway','1-545-678-6465 x230',0,'2024-05-07 21:25:50','2024-05-07 21:25:50'),(10,'Antoinette','Bayer-Barrows','Heaven.Hudson@hotmail.com','$2b$10$6lxRCHU1HMp4qYE2NvPPEOaZCnp26yJxjED3H7eHsZNKzCWfyIoQG',13,'2004-11-06 19:44:50','347 Kylie Drive','1-481-755-2077',1,'2024-05-07 21:25:50','2024-05-07 21:25:50'),(11,'Fae','Hudson','Oda36@gmail.com','$2b$10$swVsfx.QILTnvX6MOJaRZu8ZqfGeg2P0hPNIhOlrdvRkQOPmpywTC',14,'1958-01-05 12:07:39','302 Lindgren Lock','668.318.5269',1,'2024-05-07 21:25:50','2024-05-07 21:25:50'),(13,'Devan','Simonis','Terrill_Tillman@yahoo.com','$2b$10$APvdTNXhOnC8vHx8fqfrb.HKvSyXPdRkkPZqagBmtlV5PK.hgE9..',16,'1988-03-10 15:32:34','4557 Grayce Springs','632-756-6904 x842',0,'2024-05-07 21:25:50','2024-05-08 08:07:31'),(15,'Marina','Laguna','usuario1@gmail.com','$2b$10$ycnjZEQXszswW.IWXeK5tOAfIeJGJ3vRVcU1q4FnEMoHuitluytGC',1,NULL,NULL,NULL,1,'2024-05-08 06:02:07','2024-05-08 06:02:07');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-08 10:13:51
