/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: authors
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `authors` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `birthdate` datetime NOT NULL,
  `nationality` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: book_author
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `book_author` (
  `authorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `bookId` int NOT NULL,
  PRIMARY KEY (`authorId`, `bookId`),
  KEY `bookId` (`bookId`),
  CONSTRAINT `book_author_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `book_author_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: book_categories
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `book_categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category_id` bigint DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Book_Categories_bookId_categoryId_unique` (`category_id`, `book_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `book_categories_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `book_categories_ibfk_4` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: books
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `isbn` bigint NOT NULL,
  `edition` varchar(255) DEFAULT NULL,
  `stock` int NOT NULL,
  `image` text,
  `average` float NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `publisher_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `isbn` (`isbn`),
  UNIQUE KEY `isbn_2` (`isbn`),
  KEY `publisher_id` (`publisher_id`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`publisher_id`) REFERENCES `publishers` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: categories
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: events
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `events` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fecha` datetime NOT NULL,
  `hora` time NOT NULL,
  `lugar` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `capacidadMaxima` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: libraries
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `libraries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `libraries_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: librarybooks
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `librarybooks` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `bookId` int NOT NULL,
  `libraryId` int NOT NULL,
  PRIMARY KEY (`bookId`, `libraryId`),
  KEY `libraryId` (`libraryId`),
  CONSTRAINT `librarybooks_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `librarybooks_ibfk_2` FOREIGN KEY (`libraryId`) REFERENCES `libraries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: loans
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `loans` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `startDate` datetime NOT NULL,
  `dueDate` datetime NOT NULL,
  `returned` tinyint(1) DEFAULT '0',
  `user_id` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `loans_bookId_userId_unique` (`user_id`, `book_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `loans_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `loans_ibfk_4` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: log_actions
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `log_actions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `log_actions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: publishers
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `publishers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `country` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: reviews
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(255) NOT NULL,
  `score` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `book_id` (`book_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: roles
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `membership_number` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `membership_number` (`membership_number`),
  UNIQUE KEY `membership_number_2` (`membership_number`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: authors
# ------------------------------------------------------------

INSERT INTO
  `authors` (
    `id`,
    `firstName`,
    `lastName`,
    `birthdate`,
    `nationality`
  )
VALUES
  (
    '1',
    'Federico',
    'Silva',
    '2023-12-12 00:00:00',
    'Argentino'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: book_author
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: book_categories
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: books
# ------------------------------------------------------------

INSERT INTO
  `books` (
    `id`,
    `title`,
    `description`,
    `isbn`,
    `edition`,
    `stock`,
    `image`,
    `average`,
    `isActive`,
    `createdAt`,
    `updatedAt`,
    `deletedAt`,
    `publisher_id`
  )
VALUES
  (
    1,
    'Harry Potter 1',
    'Nose',
    1,
    '1',
    9,
    'asd',
    4,
    1,
    '2021-12-12 00:00:00',
    '2023-12-14 21:19:51',
    NULL,
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: categories
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: events
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: libraries
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: librarybooks
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: loans
# ------------------------------------------------------------

INSERT INTO
  `loans` (
    `id`,
    `startDate`,
    `dueDate`,
    `returned`,
    `user_id`,
    `book_id`
  )
VALUES
  (
    1,
    '2023-12-14 21:19:51',
    '2023-12-30 00:00:00',
    0,
    5,
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: log_actions
# ------------------------------------------------------------

INSERT INTO
  `log_actions` (`id`, `action`, `createdAt`, `updatedAt`, `user_id`)
VALUES
  (
    1,
    'REGISTER_USER_ACTION',
    '2023-12-12 00:57:14',
    '2023-12-12 00:57:14',
    5
  );
INSERT INTO
  `log_actions` (`id`, `action`, `createdAt`, `updatedAt`, `user_id`)
VALUES
  (
    2,
    'SIGN_IN_USER_ACTION',
    '2023-12-12 01:03:09',
    '2023-12-12 01:03:09',
    5
  );
INSERT INTO
  `log_actions` (`id`, `action`, `createdAt`, `updatedAt`, `user_id`)
VALUES
  (
    3,
    'SIGN_IN_USER_ACTION',
    '2023-12-12 01:03:50',
    '2023-12-12 01:03:50',
    5
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: publishers
# ------------------------------------------------------------

INSERT INTO
  `publishers` (
    `id`,
    `name`,
    `country`,
    `isActive`,
    `createdAt`,
    `updatedAt`,
    `deletedAt`
  )
VALUES
  (
    1,
    'Editorial',
    'Argentina',
    1,
    '2021-12-12 00:00:00',
    '2021-12-12 00:00:00',
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: reviews
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: roles
# ------------------------------------------------------------

INSERT INTO
  `roles` (`id`, `name`)
VALUES
  (1, 'ADMIN');
INSERT INTO
  `roles` (`id`, `name`)
VALUES
  (2, 'BOOK_MANAGER');
INSERT INTO
  `roles` (`id`, `name`)
VALUES
  (3, 'USER');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (
    `id`,
    `firstname`,
    `lastname`,
    `email`,
    `password`,
    `membership_number`,
    `is_active`,
    `createdAt`,
    `updatedAt`,
    `deletedAt`,
    `role_id`
  )
VALUES
  (
    1,
    'Federico',
    'Silva',
    'fedes77777@gmail.com',
    '$2b$10$Xat4VOBtOFykecv1RBRg2O4WMlftLXTu/iWW7l8C5vZ7lgE/DdEoC',
    '1231231',
    1,
    '2023-12-12 00:51:26',
    '2023-12-12 00:51:26',
    NULL,
    3
  );
INSERT INTO
  `users` (
    `id`,
    `firstname`,
    `lastname`,
    `email`,
    `password`,
    `membership_number`,
    `is_active`,
    `createdAt`,
    `updatedAt`,
    `deletedAt`,
    `role_id`
  )
VALUES
  (
    3,
    'Federico',
    'Silva',
    'fedes777777@gmail.com',
    '$2b$10$AmOW8yH7Gl9B0UUwqJdcHOYRY7rSlTkESvs5bcKjAbONzKNk2o2oa',
    '12312341',
    1,
    '2023-12-12 00:55:41',
    '2023-12-12 00:55:41',
    NULL,
    3
  );
INSERT INTO
  `users` (
    `id`,
    `firstname`,
    `lastname`,
    `email`,
    `password`,
    `membership_number`,
    `is_active`,
    `createdAt`,
    `updatedAt`,
    `deletedAt`,
    `role_id`
  )
VALUES
  (
    5,
    'Federico',
    'Silva',
    'fedes7777@gmail.com',
    '$2b$10$0JZ.MPSZQRnWpgtKGbsv9OXCldse/6m1EOsaRGsHNbRqdO3uEMMWW',
    '1231234',
    1,
    '2023-12-12 00:57:11',
    '2023-12-12 00:57:11',
    NULL,
    1
  );
INSERT INTO
  `users` (
    `id`,
    `firstname`,
    `lastname`,
    `email`,
    `password`,
    `membership_number`,
    `is_active`,
    `createdAt`,
    `updatedAt`,
    `deletedAt`,
    `role_id`
  )
VALUES
  (
    8,
    'Federico',
    'Silva',
    'sfede330@gmail.com',
    '$2b$10$6eFADyh5F1X4S301Zn37teyodWyVO5DNXlGbOPXgf/cg/fHgTDacK',
    '123123asdasd41',
    1,
    '2023-12-14 20:12:10',
    '2023-12-14 20:12:10',
    NULL,
    3
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
