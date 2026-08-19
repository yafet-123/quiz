-- ============================================================
-- aceitcom_quiz - Complete database import file
-- Generated from the phpMyAdmin dump of aceitcom_quiz
-- (Generation Time: Aug 18, 2026 06:46 PM)
--
-- FIXES APPLIED to the original dump:
--   * Book table: added the missing `subjectId` column. The original
--     dump's INSERT listed 4 columns but each row had 5 values where
--     the last value was the subject id (3 = Chemistry, 11 = Physics).
--   * BookTopic row (id=1, bookId=1) was omitted because no matching
--     Book record exists in the data (Book ids 1/2 were deleted).
--   * PastPaper rows id 356-400 and Worksheet rows id 49-87 were NOT
--     re-created (their Google Drive file ids could not be reproduced
--     faithfully). Search this file for "PASTE_DATA_HERE" and paste
--     those rows from your original phpMyAdmin export before importing.
--
-- USAGE:
--   mysql -u USER -p aceitcom_quiz < aceitcom_quiz.sql
--   (or import via phpMyAdmin / any MySQL client)
--
-- WARNING: this script DROPS every table it recreates. Do not run it
-- against a database that contains data you want to keep.
-- ============================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- Drop existing tables (order does not matter while FK checks are off)
-- --------------------------------------------------------
DROP TABLE IF EXISTS `Announcement`;
DROP TABLE IF EXISTS `Article`;
DROP TABLE IF EXISTS `Book`;
DROP TABLE IF EXISTS `BookCategory`;
DROP TABLE IF EXISTS `BookTopic`;
DROP TABLE IF EXISTS `Definition`;
DROP TABLE IF EXISTS `Exam`;
DROP TABLE IF EXISTS `ExamOption`;
DROP TABLE IF EXISTS `ExamPreparation`;
DROP TABLE IF EXISTS `ExamPreparationCategory`;
DROP TABLE IF EXISTS `ExamPreparationTopic`;
DROP TABLE IF EXISTS `ExamQuestion`;
DROP TABLE IF EXISTS `Flashcard`;
DROP TABLE IF EXISTS `FlashcardTopic`;
DROP TABLE IF EXISTS `FormulaSheet`;
DROP TABLE IF EXISTS `Note`;
DROP TABLE IF EXISTS `NoteCategory`;
DROP TABLE IF EXISTS `OptionTable`;
DROP TABLE IF EXISTS `PastPaper`;
DROP TABLE IF EXISTS `PastPaperTopic`;
DROP TABLE IF EXISTS `Question`;
DROP TABLE IF EXISTS `Quiz`;
DROP TABLE IF EXISTS `RevisionNote`;
DROP TABLE IF EXISTS `Student`;
DROP TABLE IF EXISTS `StudentExamAnswer`;
DROP TABLE IF EXISTS `Subject`;
DROP TABLE IF EXISTS `Syllablus`;
DROP TABLE IF EXISTS `Task`;
DROP TABLE IF EXISTS `Topic`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Worksheet`;
DROP TABLE IF EXISTS `WorksheetTopic`;
DROP TABLE IF EXISTS `YoutubeLink`;
DROP TABLE IF EXISTS `YoutubeLinkTopic`;

-- --------------------------------------------------------
-- Table structure for table `User`
-- --------------------------------------------------------
CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'admin',
  `createdAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `resetToken` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `Announcement`
-- --------------------------------------------------------
CREATE TABLE `Announcement` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `authorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `Student`
-- --------------------------------------------------------
CREATE TABLE `Student` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gradeLevel` varchar(255) DEFAULT NULL,
  `schoolName` varchar(255) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `enrolledAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role` varchar(255) DEFAULT 'student',
  `resetToken` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `StudentExamAnswer`
-- --------------------------------------------------------
CREATE TABLE `StudentExamAnswer` (
  `id` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `examId` int(11) NOT NULL,
  `question` text NOT NULL,
  `selectedAnswer` text NOT NULL,
  `correctAnswer` text NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `Task`
-- --------------------------------------------------------
CREATE TABLE `Task` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `students_id` int(11) NOT NULL,
  `completed` tinyint(1) DEFAULT 0,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `Subject`
-- --------------------------------------------------------
CREATE TABLE `Subject` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `svg` text DEFAULT NULL,
  `createdBy` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `approved` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `Article`
-- --------------------------------------------------------
CREATE TABLE `Article` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdBy` int(11) NOT NULL,
  `subjectId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `BookCategory`
-- --------------------------------------------------------
CREATE TABLE `BookCategory` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subjectId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `Book`
-- NOTE: `subjectId` column restored (was missing in the original dump
-- even though every INSERT row contains a subject id value).
-- --------------------------------------------------------
CREATE TABLE `Book` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `bookFile` text NOT NULL,
  `subjectId` int(11) NOT NULL,
  `bookCategoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `BookTopic`
-- --------------------------------------------------------
CREATE TABLE `BookTopic` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `bookId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `Definition`
-- --------------------------------------------------------
CREATE TABLE `Definition` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `link` text NOT NULL,
  `subjectId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `FormulaSheet`
-- --------------------------------------------------------
CREATE TABLE `FormulaSheet` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `link` text NOT NULL,
  `subjectId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `Exam`
-- --------------------------------------------------------
CREATE TABLE `Exam` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subjectId` int(11) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `studentId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `ExamOption`
-- --------------------------------------------------------
CREATE TABLE `ExamOption` (
  `id` int(11) NOT NULL,
  `optionText` text NOT NULL,
  `examQuestionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `ExamPreparationCategory`
-- --------------------------------------------------------
CREATE TABLE `ExamPreparationCategory` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subjectId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `ExamPreparation`
-- --------------------------------------------------------
CREATE TABLE `ExamPreparation` (
  `id` int(11) NOT NULL,
  `nameOfBook` varchar(255) NOT NULL,
  `bookFile` text NOT NULL,
  `examPreparationCategoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `ExamPreparationTopic`
-- --------------------------------------------------------
CREATE TABLE `ExamPreparationTopic` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `examPrepId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `ExamQuestion`
-- --------------------------------------------------------
CREATE TABLE `ExamQuestion` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `correctAnswer` text NOT NULL,
  `examId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `Flashcard`
-- --------------------------------------------------------
CREATE TABLE `Flashcard` (
  `id` int(11) NOT NULL,
  `topicId` int(11) NOT NULL,
  `term` varchar(255) NOT NULL,
  `definition` text NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `FlashcardTopic`
-- --------------------------------------------------------
CREATE TABLE `FlashcardTopic` (
  `id` int(11) NOT NULL,
  `subjectId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `NoteCategory`
-- --------------------------------------------------------
CREATE TABLE `NoteCategory` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subjectId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `Note`
-- --------------------------------------------------------
CREATE TABLE `Note` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `noteCategoryId` int(11) DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `subjectId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `OptionTable`
-- --------------------------------------------------------
CREATE TABLE `OptionTable` (
  `id` int(11) NOT NULL,
  `optionText` text NOT NULL,
  `questionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `PastPaperTopic`
-- --------------------------------------------------------
CREATE TABLE `PastPaperTopic` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subjectId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `PastPaper`
-- --------------------------------------------------------
CREATE TABLE `PastPaper` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `paperFile` text NOT NULL,
  `year` int(11) DEFAULT NULL,
  `pastPaperTopicId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `Question`
-- --------------------------------------------------------
CREATE TABLE `Question` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `quizId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `Quiz`
-- --------------------------------------------------------
CREATE TABLE `Quiz` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subjectId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `RevisionNote`
-- --------------------------------------------------------
CREATE TABLE `RevisionNote` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `subjectId` int(11) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `Syllablus`
-- --------------------------------------------------------
CREATE TABLE `Syllablus` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT current_timestamp(),
  `subjectId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `Topic`
-- --------------------------------------------------------
CREATE TABLE `Topic` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `subjectId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `WorksheetTopic`
-- --------------------------------------------------------
CREATE TABLE `WorksheetTopic` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subjectId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `Worksheet`
-- --------------------------------------------------------
CREATE TABLE `Worksheet` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `link` text NOT NULL,
  `worksheetTopicId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `YoutubeLink`
-- --------------------------------------------------------
CREATE TABLE `YoutubeLink` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` text NOT NULL,
  `subjectId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `YoutubeLinkTopic`
-- --------------------------------------------------------
CREATE TABLE `YoutubeLinkTopic` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `youtubeLinkId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- DATA
-- ============================================================

--
-- Dumping data for table `User`
--
INSERT INTO `User` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `modifiedAt`, `resetToken`) VALUES
(2, 'yab', 'addisuyafet321@gmail.com', '$2a$08$Ox6sxIE1NG85DOhcUi7bxuPmVMlzx.nYQb38Wyu0sxapLnsaULTYy', 'admin', '2025-11-26 15:59:00', '2026-07-16 09:49:34', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZGlzdXlhZmV0MzIxQGdtYWlsLmNvbSIsImlhdCI6MTc4NDE5NTM3NCwiZXhwIjoxNzg0MTk1Njc0fQ.1FKX5hi1Y0Vg551MFfuutZuEwhXgXIBQpkLUXBGsOgs'),
(3, 'yab123', 'yab123@gmail.com', '$2a$08$d6vItHADfoFWbB05b11Cpur19Et/PrkMdklMFrle4DdZxllNBbkoy', 'admin', '2025-11-26 10:05:20', '2025-11-26 10:05:20', NULL),
(6, 'Hiyabeal', 'hiyabealaa@gmail.com', '$2a$08$XY/kXY9mIfz9pCYqCZlsAOM/OhimS8t9B8rV2Gn0pKHViLst4vhVu', 'admin', '2025-11-29 07:59:55', '2025-11-29 08:35:37', NULL),
(7, 'yabu', 'yabu@gmail.com', '$2a$08$eOQGBt.aityqqXF/JezcN.4dzplrl4/iVr5n3BrSUGrFfs50h4coe', 'admin', '2026-07-16 10:06:05', '2026-07-16 10:06:05', NULL);

--
-- Dumping data for table `Announcement`
--
INSERT INTO `Announcement` (`id`, `title`, `content`, `createdAt`, `authorId`) VALUES
(5, 'hello', 'website', '2025-11-29 08:02:34', 2);

--
-- Dumping data for table `Student`
--
INSERT INTO `Student` (`id`, `name`, `email`, `password`, `gradeLevel`, `schoolName`, `dateOfBirth`, `gender`, `enrolledAt`, `updatedAt`, `role`, `resetToken`) VALUES
(1, 'Yabsera', 'yab@gmail.com', '$2a$10$Q/c/JPZH7DN/I.TGs4ELwOniA0oFAfDgRKAYqfW0agyg252BMv5zq', 'Grade 12', 'Future Talent Academy', '2025-11-27', 'male', '2025-11-26 10:06:54', '2025-11-26 10:06:54', 'student', NULL),
(2, 'yab', 'yab123@gmail.com', '$2a$10$8PCS/i76EoznE20r1t/nEuqlk4g63ip9vUi0xmDTNGBxL3zOhCuzi', 'Grade 12', 'Future Talent Academy', '2025-11-27', 'male', '2025-11-26 10:12:25', '2025-11-26 10:12:25', 'student', NULL),
(6, 'yab123', 'yab123456@gmail.com', '$2a$10$CcOc9kCtQpTHCkItYF.8.OZKswhEq.ScZbags6QGydNSSEkIGXGNi', 'Grade 12', 'Future Talent Academy', '2024-12-05', 'male', '2025-11-26 18:57:37', '2025-11-26 18:57:37', 'student', NULL),
(8, 'Yeabsira Demis Tekeba', 'businessydts1@gmail.com', '$2a$10$g5wWKlgYidadxIz1hn4QNOVEtXS9zIjzxdKctOBurgPvT9lrO4L2O', '12', 'Future Talent Academy', '2007-11-12', 'male', '2025-11-27 18:22:08', '2025-11-27 18:22:08', 'student', NULL),
(11, 'yafet', 'yaf@gmail.com', '$2a$10$gWZPde.66nhQ/qAXx7AwQuF6yp/ydRq/M4LT1dhLZL.cb0EXocqXu', '11', 'fta', '2025-11-20', 'male', '2025-11-29 08:27:30', '2025-11-29 08:27:30', 'student', NULL),
(12, 'Assefa', 'hiyabeal.assefa08@gmail.com', '$2a$10$TdQLyDJUtXJesnO1cJZXGOqcpDEKWpfG/F.WPDM40DgUXYrMqlCAa', '11', 'flipper', '2018-06-12', 'male', '2025-11-29 08:29:00', '2025-11-29 08:29:00', 'student', NULL);
--
-- Dumping data for table `Subject`
--
INSERT INTO `Subject` (`id`, `name`, `description`, `svg`, `createdBy`, `createdAt`, `modifiedAt`, `approved`) VALUES
(2, 'Biology', 'Delve into the science of life, studying organisms, cells, genetics, evolution, ecosystems, and human anatomy. Understand how living things interact with each other and their environments.', '/categories/image--biology.svg', 2, '2025-11-26 13:55:30', '2025-11-26 14:51:25', 1),
(3, 'Chemistry', 'Uncover the mysteries of matter, its composition, properties, and reactions. Study atoms, molecules, chemical bonding, and laboratory experiments that explain everyday phenomena.', '/categories/image--chemistry.svg', 2, '2025-11-26 13:55:30', '2025-11-26 14:51:52', 1),
(7, 'Geography', 'Study the EarthÃ¢â‚¬â„¢s physical features, climate patterns, natural resources, human populations, and cultural landscapes. Understand how humans interact with their environment and how the planet is interconnected.', '/categories/image--geography.svg', 2, '2025-11-26 13:55:33', '2025-11-26 14:53:37', 1),
(9, 'Mathematics', 'Develop analytical and logical thinking through numbers, algebra, geometry, calculus, probability, and statistics. Learn to solve complex problems and apply mathematical concepts in science, engineering, and daily life.', '/categories/image--mathematics.svg', 2, '2025-11-26 13:55:34', '2025-11-26 14:54:21', 1),
(11, 'Physics', 'Expand your physics knowledge with advanced topics such as electricity, magnetism, optics, thermodynamics, and quantum mechanics. Understand how physical laws govern natural and technological phenomena.', '/categories/image--physics.svg', 2, '2025-11-26 13:55:35', '2025-11-26 14:54:47', 1),
(24, 'ICT', 'ICT is the technology used to manage and communicate information through computers, the internet, mobile devices, and other digital systems. It helps people work faster, communicate easily, and access information quickly.', '/categories/image--computer-science.svg', 2, '2025-12-06 08:46:18', '2025-12-06 08:46:18', 0),
(25, 'Business', 'Business involves creating and delivering goods or services and managing resources like money, people, and materials. It helps organizations operate efficiently and meet customer needs.', '/categories/image--business.svg', 2, '2025-12-06 09:07:51', '2025-12-06 09:21:54', 0),
(26, 'Economics', 'Economics examines how resources are produced, distributed, and consumed. It helps us understand prices, markets, and how decisions affect individuals and society.', '/categories/image--economics.svg', 2, '2025-12-06 09:08:51', '2025-12-06 09:22:08', 0);

--
-- Dumping data for table `Definition`
--
INSERT INTO `Definition` (`id`, `name`, `link`, `subjectId`, `createdAt`, `modifiedAt`) VALUES
(1, 'Definitions.pdf', 'https://drive.google.com/file/d/1YUvy6iyyHVljjKJ1qCfdZDfomseiJc8C/view', 11, '2026-08-15 20:29:59', '2026-08-15 20:29:59');

--
-- Dumping data for table `FormulaSheet`
--
INSERT INTO `FormulaSheet` (`id`, `name`, `link`, `subjectId`, `createdAt`, `updatedAt`) VALUES
(1, 'Formula Sheet.png', 'https://drive.google.com/file/d/12T6WyIqhwtbt9sqyU1-fjp3h2LTc-wOB/view', 11, '2026-08-15 20:45:21', '2026-08-15 20:45:21'),
(2, 'Physics Formula Sheet.pdf', 'https://drive.google.com/file/d/1Bo9GTqc2cQqqF0krEM9QWEBBCtzsGgex/view', 11, '2026-08-15 20:45:21', '2026-08-15 20:45:21'),
(3, 'States_of_Matter.docx', 'https://drive.google.com/file/d/1HS1HgWlylq5DbxAf0S05JRTkiR0t4VYg/view', 11, '2026-08-15 20:45:21', '2026-08-15 20:45:21');

--
-- Dumping data for table `Syllablus`
--
INSERT INTO `Syllablus` (`id`, `title`, `content`, `createdAt`, `modifiedAt`, `subjectId`) VALUES
(1, 'Chemistry syllabus', 'https://drive.google.com/file/d/1RXsOMdo-O0j2JNPPd3K7PpxDAJGXNuIG/view?usp=drive_open', '2026-08-15 18:58:21', '2026-08-15 18:58:21', 3),
(2, 'Physics syllabus', 'https://drive.google.com/file/d/1z4k0IvZh6Cxpf-d6IX4zhrSdrKu05NV_/view', '2026-08-15 19:02:59', '2026-08-15 19:02:59', 11);

--
-- Dumping data for table `Quiz`
--
INSERT INTO `Quiz` (`id`, `title`, `subjectId`, `createdAt`, `modifiedAt`) VALUES
(3, 'Addition', 9, '2025-11-27 13:50:37', '2025-11-27 13:50:37');

--
-- Dumping data for table `Question`
--
INSERT INTO `Question` (`id`, `question`, `answer`, `quizId`, `createdAt`, `modifiedAt`) VALUES
(3, '2+3', '5', 3, '2025-11-27 13:50:37', '2025-11-27 13:50:37'),
(4, '6+7', '13', 3, '2025-11-27 13:50:37', '2025-11-27 13:50:37');

--
-- Dumping data for table `OptionTable`
--
INSERT INTO `OptionTable` (`id`, `optionText`, `questionId`) VALUES
(9, '5', 3),
(10, '6', 3),
(11, '7', 3),
(12, '8', 3),
(13, '13', 4),
(14, '8', 4),
(15, '9', 4),
(16, '10', 4);

--
-- Dumping data for table `Exam`
--
INSERT INTO `Exam` (`id`, `title`, `subjectId`, `createdBy`, `studentId`, `createdAt`, `modifiedAt`) VALUES
(3, 'Addition', 9, 2, NULL, '2025-11-27 13:31:45', '2025-11-27 13:31:45');

--
-- Dumping data for table `ExamQuestion`
--
INSERT INTO `ExamQuestion` (`id`, `question`, `correctAnswer`, `examId`, `createdAt`, `modifiedAt`) VALUES
(3, '2+3', '5', 3, '2025-11-27 13:31:45', '2025-11-27 13:31:45'),
(4, '9+0', '9', 3, '2025-11-27 13:31:45', '2025-11-27 13:31:45');

--
-- Dumping data for table `ExamOption`
--
INSERT INTO `ExamOption` (`id`, `optionText`, `examQuestionId`) VALUES
(9, '3', 3),
(10, '4', 3),
(11, '5', 3),
(12, '6', 3),
(13, '7', 4),
(14, '8', 4),
(15, '9', 4),
(16, '10', 4);

--
-- Dumping data for table `StudentExamAnswer`
--
INSERT INTO `StudentExamAnswer` (`id`, `studentId`, `examId`, `question`, `selectedAnswer`, `correctAnswer`, `createdAt`) VALUES
(1, 8, 3, '2+3', '5', '5', '2025-11-27 18:25:53'),
(2, 8, 3, '9+0', '9', '9', '2025-11-27 18:25:53'),
(4, 12, 3, '2+3', '5', '5', '2025-11-29 08:33:37'),
(5, 12, 3, '9+0', '9', '9', '2025-11-29 08:33:37');

--
-- Dumping data for table `Task`
--
INSERT INTO `Task` (`id`, `text`, `students_id`, `completed`, `createdAt`, `updatedAt`) VALUES
(1, 'hjju', 2, 0, '2025-11-29 08:30:17', '2025-11-29 08:30:17');

--
-- Dumping data for table `RevisionNote`
--
INSERT INTO `RevisionNote` (`id`, `title`, `content`, `subjectId`, `createdBy`, `createdAt`, `modifiedAt`) VALUES
(1, 'sample sample sample', '<p>sample sample sample sample</p>', 11, 2, '2025-11-27 16:10:38', '2025-11-27 16:12:07'),
(3, 'Save my Exams Notes', '<p><a href="about:blank" rel="noopener noreferrer" target="_blank">file:///Users/hiyabealassefa/website/Physics%20Website/Notes/Save%20my%20exams/Unit%20one%20general%20Physics/1.1%20Physical%20Quantities%20&amp;%20Measurment%20Techniques.pdf</a></p>', 11, 3, '2026-01-07 14:34:49', '2026-01-07 14:34:49');

--
-- Dumping data for table `BookCategory`
--
INSERT INTO `BookCategory` (`id`, `title`, `subjectId`) VALUES
(1, 'General', 26),
(2, 'Cambridge Chemistry', 3),
(3, 'Cambridge Physics', 11);

--
-- Dumping data for table `Book`
-- (column list fixed: `subjectId` added back)
--
INSERT INTO `Book` (`id`, `title`, `bookFile`, `subjectId`, `bookCategoryId`) VALUES
(3, 'Cambridge IGCSE Chemistry 4th Edition.pdf', 'https://drive.google.com/file/d/1qSEUxC4JMAH9JESwKAxapcifGfwaJ8e5/view', 3, 2),
(4, 'Cambridge IGCSEÃ¢â€žÂ¢ Physics .pdf', 'https://drive.google.com/file/d/1NtgowSDzkBL2haCTbtd0IRpu40-9HIK-/view', 11, 3),
(5, 'Cambridge IGCSEÃ¢â€žÂ¢ Physics Coursebook .pdf', 'https://drive.google.com/file/d/1tnP8zIkcHKFJFyedv9gGs686A6u6Z_WJ/view', 11, 3),
(6, 'Cambridge IGCSEÃ¢â€žÂ¢ Physics Practical Skills Workbook.pdf', 'https://drive.google.com/file/d/14lrbArz_o7ugDQ7PUfTyfS4PLA3857Vn/view', 11, 3),
(7, 'Cambridge IGCSEÃ¢â€žÂ¢ Physics Workbook .pdf', 'https://drive.google.com/file/d/1y8GuJkH_w2s380Qi-YeIuWYRtyH0adQt/view', 11, 3),
(8, 'Cambridge IGCSEÃ¢â€žÂ¢ Physics Workbook.pdf', 'https://drive.google.com/file/d/1YAVsK-N2f0bCJFvuLLluqA4xhQ4pr_Hv/view', 11, 3);

--
-- Dumping data for table `BookTopic`
-- (Original row (1, 'Sample', 1) references Book id=1 which does not
--  exist in the data, so it was omitted to keep the FK valid.)
--
--
-- Dumping data for table `ExamPreparationCategory`
--
INSERT INTO `ExamPreparationCategory` (`id`, `title`, `subjectId`) VALUES
(1, 'General', 11);

--
-- Dumping data for table `ExamPreparation`
--
INSERT INTO `ExamPreparation` (`id`, `nameOfBook`, `bookFile`, `examPreparationCategoryId`) VALUES
(17, 'Motion, Forces and Energy', 'https://pmt.physicsandmathstutor.com/download/Physics/GCSE/Notes/CIE-IGCSE/1-Motion-Forces-and-Energy/Summary%20Notes%20-%20Topic%201%20CAIE%20Physics%20IGCSE.pdf', 1),
(18, 'Thermal Physics', 'https://pmt.physicsandmathstutor.com/download/Physics/GCSE/Notes/CIE-IGCSE/2-Thermal-Physics/Summary%20Notes%20-%20Topic%202%20CAIE%20Physics%20IGCSE.pdf', 1),
(19, 'Waves', 'https://pmt.physicsandmathstutor.com/download/Physics/GCSE/Notes/CIE-IGCSE/3-Waves/Summary%20Notes%20-%20Topic%203%20CAIE%20Physics%20IGCSE.pdf', 1),
(20, 'Electricity and Magnetism', 'https://pmt.physicsandmathstutor.com/download/Physics/GCSE/Notes/CIE-IGCSE/4-Electricity-and-Magnetism/Summary%20Notes%20-%20Topic%204%20CAIE%20Physics%20IGCSE.pdf', 1),
(21, 'Nuclear Physics', 'https://pmt.physicsandmathstutor.com/download/Physics/GCSE/Notes/CIE-IGCSE/5-Nuclear-Physics/Summary%20Notes%20-%20Topic%205%20CAIE%20Physics%20IGCSE.pdf', 1),
(22, 'Space Physics', 'https://pmt.physicsandmathstutor.com/download/Physics/GCSE/Notes/CIE-IGCSE/6-Space-Physics/Summary%20Notes%20-%20Topic%206%20CAIE%20Physics%20IGCSE.pdf', 1);

--
-- Dumping data for table `ExamPreparationTopic`
--
INSERT INTO `ExamPreparationTopic` (`id`, `title`, `examPrepId`) VALUES
(18, 'Notes', 17),
(19, 'Notes', 18),
(20, 'Notes', 19),
(21, 'Notes', 20),
(22, 'Notes', 21),
(23, 'Notes', 22);

--
-- Dumping data for table `NoteCategory`
--
INSERT INTO `NoteCategory` (`id`, `title`, `subjectId`) VALUES
(1, 'PMT Unit Eight Periodic Table', 3),
(2, 'PMT Unit Eleven Organic Chemistry', 3),
(3, 'PMT Unit four Electrochemistry', 3),
(4, 'PMT unit five chemical energetics', 3),
(5, 'PMT Unit nine metals', 3),
(6, 'PMT Unit one state of matter', 3),
(7, 'PMT Unit seven Acids, bases & salts', 3),
(8, 'PMT Unit six chemical reactions', 3),
(9, 'PMT Unit ten chemistry of the enviroment', 3),
(10, 'PMT Unit three stoichiometry', 3),
(11, 'PMT Unit twelve Expermintal techniques and chemical analysis', 3),
(12, 'PMT Unit two Atoms, Elements & compounds', 3),
(13, 'Save My Exam Unit Eight Periodic Table', 3),
(14, 'Save My Exam Unit Eleven Organic Chemistry', 3),
(15, 'Save My Exam Unit four Electrochemistry', 3),
(16, 'Save My Exam unit five chemical energetics', 3),
(17, 'Save My Exam Unit nine metals', 3),
(18, 'Save My Exam Unit one state of matter', 3),
(19, 'Save My Exam Unit seven Acids, bases & salts', 3),
(20, 'Save My Exam Unit six chemical reactions', 3),
(21, 'Save My Exam Unit ten chemistry of the enviroment', 3),
(22, 'Save My Exam Unit three stoichiometry', 3),
(23, 'Save My Exam Unit twelve Expermintal techniques and chemical analysis', 3),
(24, 'Save My Exam Unit two Atoms, Elements & compounds', 3),
(25, 'PMT unit one general physics', 11),
(26, 'PMT unit two thermal physics', 11),
(27, 'PMT unit three waves', 11),
(28, 'PMT Unit four Electricity and magnetism', 11),
(29, 'PMT Unit five Nuclear Physics', 11),
(30, 'PMT Unit six Space physics', 11),
(31, 'Save My Exams unit two thermal physics', 11),
(32, 'Save My Exams unit three waves', 11),
(33, 'Save My Exams Unit four Electricity and magnetism', 11),
(34, 'Save My Exams Unit five Nuclear Physics', 11),
(35, 'Save My Exams Unit six Space physics', 11),
(36, 'Save My Exams unit one general physics', 11),
(37, 'Extra Notes unit two thermal physics', 11),
(38, 'Extra Notes unit three waves', 11),
(39, 'Extra Notes Unit four Electricity and magnetism', 11),
(40, 'Extra Notes Unit five Nuclear Physics', 11),
(41, 'Extra Notes Unit One General Physics', 11),
(42, 'Extra Notes Unit six Space physics', 11),
(43, 'Z notes unit two thermal physics', 11),
(44, 'Z notes unit three waves', 11),
(45, 'Z notes Unit four Electricity and magnetism', 11),
(46, 'Z notes Unit five Nuclear Physics', 11),
(47, 'Z notes Unit one general physics', 11),
(48, 'Z notes Unit six Space physics', 11);

--
-- Dumping data for table `WorksheetTopic`
--
INSERT INTO `WorksheetTopic` (`id`, `title`, `subjectId`) VALUES
(1, 'PMT unit one MS', 11),
(2, 'PMT unit two Ms', 11),
(3, 'PMT unit three Ms', 11),
(4, 'PMT Unit four Ms', 11),
(5, 'PMT Unit five Ms', 11),
(6, 'PMT Unit six Ms', 11),
(7, 'PMT unit one QP', 11),
(8, 'PMT unit two QP', 11),
(9, 'PMT unit three QP', 11),
(10, 'PMT Unit four QP', 11),
(11, 'PMT Unit five Qp', 11),
(12, 'PMT Unit six Qp', 11),
(13, 'Rocket Revice unit one question Paper', 11),
(14, 'Rocket Revice unit two question Paper', 11),
(15, 'Rocket Revice unit three question Paper', 11),
(16, 'Rocket Revice Unit four question Paper', 11),
(17, 'Rocket Revice Unit five question Paper', 11);

--
-- Dumping data for table `Note`  (rows 8-31)
--
INSERT INTO `Note` (`id`, `title`, `content`, `createdAt`, `modifiedAt`, `noteCategoryId`, `createdBy`, `subjectId`) VALUES
(8, '8.1 Arrangement of elements.pdf', 'https://drive.google.com/file/d/1ICeDMVJcorP0vt-kEfjgyWMnfKFe3Alr/view', '2026-08-15 17:06:15', '2026-08-15 17:06:15', 1, NULL, NULL),
(9, '8.2 Group I properties.pdf', 'https://drive.google.com/file/d/1itkrGu1XYgfBeY3ddKqaU9L9v3zIsQkE/view', '2026-08-15 17:06:15', '2026-08-15 17:06:15', 1, NULL, NULL),
(10, '8.3 Group VII properties.pdf', 'https://drive.google.com/file/d/1YgeOI70B-6lBVnR9T2JsoaLsVw_u6bcW/view', '2026-08-15 17:06:15', '2026-08-15 17:06:15', 1, NULL, NULL),
(11, '8.4 Transition elements.pdf', 'https://drive.google.com/file/d/1mkkz6wtG9nWZEtmKmR3n2Dt3mJXOHqB1/view', '2026-08-15 17:06:15', '2026-08-15 17:06:15', 1, NULL, NULL),
(12, '8.5 Noble gases.pdf', 'https://drive.google.com/file/d/1iJ7fWa9DK05sQoKQ36AGLuOuLzXSM26K/view', '2026-08-15 17:06:15', '2026-08-15 17:06:15', 1, NULL, NULL),
(13, '11.1 Formulae, functional groups and terminology.pdf', 'https://drive.google.com/file/d/1yHEZMV2w4cujJfpEctYLIBG4MnE2LcAk/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 2, NULL, NULL),
(14, '11.2 Naming organic compounds.pdf', 'https://drive.google.com/file/d/1C_JuljVtkMilekSswR3brPhyB9YAE3wL/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 2, NULL, NULL),
(15, '11.3 Fuels.pdf', 'https://drive.google.com/file/d/15UW8Ie4UotB8UB3ouNl_OgbckdlFM7YV/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 2, NULL, NULL),
(16, '11.4 Alkanes.pdf', 'https://drive.google.com/file/d/1XIWRM2enJIpTSXhFkwvRi1h-OHzo5ehT/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 2, NULL, NULL),
(17, '11.5 Alkenes.pdf', 'https://drive.google.com/file/d/1lKitL0v-Tn2Y4-lnSQnzWWnroECvcOIg/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 2, NULL, NULL),
(18, '11.6 Alcohols.pdf', 'https://drive.google.com/file/d/16brAh43LxJA7CYkhBpOTLoufYGr5_Cuo/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 2, NULL, NULL),
(19, '11.7 Carboxylic acids.pdf', 'https://drive.google.com/file/d/1tnjZ--Vb1oBTJVnyv63m6lBSXFGExsVo/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 2, NULL, NULL),
(20, '11.8 Polymers.pdf', 'https://drive.google.com/file/d/1n-LYXfuvoTo1WK0U8EcuI4f5oLPtuwh_/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 2, NULL, NULL),
(21, '5.1 Exothermic and endothermic reactions.pdf', 'https://drive.google.com/file/d/1qrTcn2BBY8rYvn2W5_KhQQp9NOUJRjZ5/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 4, NULL, NULL),
(22, '4.1 Electrolysis.pdf', 'https://drive.google.com/file/d/16giOmAVvxwQI2pl0LRd6FNWT4E9gSRhv/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 3, NULL, NULL),
(23, '4.2 HydrogenÃ¢â‚¬â€œoxygen fuel cells.pdf', 'https://drive.google.com/file/d/1jS4BYKM1IILJYyA8GRlyCreHiztZkibv/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 3, NULL, NULL),
(24, '9.1 Properties of metals.pdf', 'https://drive.google.com/file/d/11HV7CBy5w3oSURn3K21VnB5-yGbANXiw/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 5, NULL, NULL),
(25, '9.2 Uses of metals.pdf', 'https://drive.google.com/file/d/1_7KJqJykJydlJ0IqXje1zn9Mk7jQJcz0/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 5, NULL, NULL),
(26, '9.3 Alloys and their properties.pdf', 'https://drive.google.com/file/d/1vOZTTw3K8kg0_GMBOstN4mxDkuw-4Oqm/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 5, NULL, NULL),
(27, '9.4 Reactivity series.pdf', 'https://drive.google.com/file/d/1D1qtnIQy0L6lp-WYu-OLj0Ta1uiWL74f/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 5, NULL, NULL),
(28, '9.5 Corrosion of metals.pdf', 'https://drive.google.com/file/d/1BxWPeKuKOQwGwsj4haBIYMac_nuc_vEm/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 5, NULL, NULL),
(29, '9.6 Extraction of metals.pdf', 'https://drive.google.com/file/d/1Kr2aflKlVcifiu1ii5lqt5RsVlxWazJ-/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 5, NULL, NULL),
(30, '1.1 Solids, liquids and gases.pdf', 'https://drive.google.com/file/d/1auY6ue-egMckabQDUYbwC_8WyLqPDDrz/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 6, NULL, NULL),
(31, '1.2 Diffusion.pdf', 'https://drive.google.com/file/d/1JlDyQrsT9GTbZ2XQr96B8pJW3_ehEz0b/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 6, NULL, NULL);
--
-- Dumping data for table `Note`  (rows 32-57)
--
INSERT INTO `Note` (`id`, `title`, `content`, `createdAt`, `modifiedAt`, `noteCategoryId`, `createdBy`, `subjectId`) VALUES
(32, '7.1 The characteristic properties of acids and bases.pdf', 'https://drive.google.com/file/d/1MUVgKG0UwPv7wiRtBmfHaLFtI8Sku7f2/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 7, NULL, NULL),
(33, '7.2 Oxides.pdf', 'https://drive.google.com/file/d/139STfoF93lJIkB2p6uY2h9rCRtKv54zx/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 7, NULL, NULL),
(34, '7.3 Preparation of salts.pdf', 'https://drive.google.com/file/d/19Dy1qK6uESD1-BUf9KgmleshWjHrkXxj/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 7, NULL, NULL),
(35, '6.1 Physical and chemical changes.pdf', 'https://drive.google.com/file/d/1DeHOj7uxzwuj2MyHaNNNumHFKTC-NhqX/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 8, NULL, NULL),
(36, '6.2 Rate of reaction.pdf', 'https://drive.google.com/file/d/1hpGg1ETlpUOKBgoAb56-R7qdV_9M4n1z/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 8, NULL, NULL),
(37, '6.3 Reversible reactions and equilibrium.pdf', 'https://drive.google.com/file/d/1ZLnOrdmpbhxzHMThLqTN-9esen5S-M53/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 8, NULL, NULL),
(38, '6.4 Redox.pdf', 'https://drive.google.com/file/d/1Igu4l4N3zLvRwNJK9cFHFAoYsbjsKGNd/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 8, NULL, NULL),
(39, '10.1 Water.pdf', 'https://drive.google.com/file/d/1CLFhbTSIjnXdT6szCCOM7RvLmO23p29L/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 9, NULL, NULL),
(40, '10.2 Fertilisers.pdf', 'https://drive.google.com/file/d/1aq05MN5y6a6AtRkLxyiuj89X0oSzZ4B3/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 9, NULL, NULL),
(41, '10.3 Air quality and climate.pdf', 'https://drive.google.com/file/d/1BLO4pr9KlBD6HzyNgXMv6txiRHDn6yOj/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 9, NULL, NULL),
(42, '3.1 Formulae.pdf', 'https://drive.google.com/file/d/1354759mFgYnBhsAgtV0aPCJ0L08SJN9o/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 10, NULL, NULL),
(43, '3.2 Relative masses of atoms and molecules.pdf', 'https://drive.google.com/file/d/1AMcg6M5-tk8pLOYR_HUMFNB6drJTRTDH/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 10, NULL, NULL),
(44, '3.3 The mole and the Avogadro constant.pdf', 'https://drive.google.com/file/d/1KknrK3SFKSwrnApyF3KiWN1T3poVgfoF/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 10, NULL, NULL),
(45, '12.1 Experimental design.pdf', 'https://drive.google.com/file/d/1op67Z_icP7a9L6bg7UzjG-nmnfUnd-8j/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 11, NULL, NULL),
(46, '12.2 AcidÃ¢â‚¬â€œbase titrations.pdf', 'https://drive.google.com/file/d/10OPrwacDBpE9OFiLV6l5XC8W3hCwXzsj/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 11, NULL, NULL),
(47, '12.3 Chromatography.pdf', 'https://drive.google.com/file/d/1N9fsqTunb5dyTvk3iqlSsYzpnrXMUPNN/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 11, NULL, NULL),
(48, '12.4 Separation and purification.pdf', 'https://drive.google.com/file/d/11i-OGiWXtyvutiwlftdTJXZe7KxO1HeJ/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 11, NULL, NULL),
(49, '12.5 Identification of ions and gases.pdf', 'https://drive.google.com/file/d/1A5YRKKdjtQb0Bfpkdc8l3d8L-qbI5A15/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 11, NULL, NULL),
(50, '2.1 Elements, compounds and mixtures .pdf', 'https://drive.google.com/file/d/1hvRh4FTKFeNcYVFTRcS3J3BwIb0MPPNS/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 12, NULL, NULL),
(51, '2.2 Atomic structure and the Periodic Table .pdf', 'https://drive.google.com/file/d/1GRXiqJ--4gT3GlaDilZiE-xJNPnjoet8/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 12, NULL, NULL),
(52, '2.3 Isotopes .pdf', 'https://drive.google.com/file/d/1KUhSFyCg9iJvnsz9Czi4LdluVCvoTiF4/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 12, NULL, NULL),
(53, '2.4 Ions and ionic bonds .pdf', 'https://drive.google.com/file/d/10bK3xKRgFHu-q0TEXpfykwu9n65tSGel/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 12, NULL, NULL),
(54, '2.5 Simple molecules and covalent bonds .pdf', 'https://drive.google.com/file/d/1dlMwW6pQWtCtnDTxB-eT7N5xoiuonTIk/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 12, NULL, NULL),
(55, '2.6 Giant covalent structures .pdf', 'https://drive.google.com/file/d/1SfzUWxCZ4PXbJ1YpHbjEScbrYPah9Wjg/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 12, NULL, NULL),
(56, '2.7 Metallic bonding .pdf', 'https://drive.google.com/file/d/1bA_404v2vRiFg9S8ec8rdGa3e_ACxuL8/view', '2026-08-15 17:06:39', '2026-08-15 17:06:39', 12, NULL, NULL),
(57, 'the periodic table and trends.pdf', 'https://drive.google.com/file/d/15QbYWp3BrZ0ysmYbeAs-Ad8U1bJScavB/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 13, NULL, NULL);
--
-- Dumping data for table `Note`  (rows 58-90)
--
INSERT INTO `Note` (`id`, `title`, `content`, `createdAt`, `modifiedAt`, `noteCategoryId`, `createdBy`, `subjectId`) VALUES
(58, 'Group Properties and trends.pdf', 'https://drive.google.com/file/d/1k6-WgGI_7FEpI6b3Vs_DIWnnJfLMzaDZ/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 13, NULL, NULL),
(59, 'Formulae, Functional Groups & Terminology.pdf', 'https://drive.google.com/file/d/1IP5obkAbb2ScOxeDQIvpwlyYt1i66EtZ/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 14, NULL, NULL),
(60, 'Organic Families.pdf', 'https://drive.google.com/file/d/1C4zhLWQCBm_mrU8QOOvBdhdVu8Y_LA_U/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 14, NULL, NULL),
(61, 'Polymers.pdf', 'https://drive.google.com/file/d/18ngnGivdfXarF509dunWiV23XHixDztf/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 14, NULL, NULL),
(62, 'Exothermic & Endothermic Reactions.pdf', 'https://drive.google.com/file/d/1MU4mHHaDOwG45XP59QJ0bj3lFTo88Oag/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 16, NULL, NULL),
(63, 'Electrolysis.pdf', 'https://drive.google.com/file/d/1YLekRbLmprQbIkaXojifyc-f14WWvu6T/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 15, NULL, NULL),
(64, 'Applications of Electrolysis.pdf', 'https://drive.google.com/file/d/1PV9d9rqd5YoPRKdXmNZw_JD7RbqaIFxE/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 15, NULL, NULL),
(65, 'Properties, uses & Alloys of metals.pdf', 'https://drive.google.com/file/d/1RpFOPBVOSzBZHp7jOBqFG_PmVWHm1fDT/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 17, NULL, NULL),
(66, 'Reactivity Series & corrosion of Metals.pdf', 'https://drive.google.com/file/d/1FEbO2XXlCLnJ19krwJPoTtGnC_nuhM6Z/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 17, NULL, NULL),
(67, 'Extraction of Metals.pdf', 'https://drive.google.com/file/d/1fGsZ7n8UuSK0FRhjS1cXEgP_JoYPRm1Z/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 17, NULL, NULL),
(68, 'Solids, Liquids & gases.pdf', 'https://drive.google.com/file/d/1oRhJvaR20JYa3dkqr4MFmIIkBFt2cJgQ/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 18, NULL, NULL),
(69, 'The Characteristic Properties of Acids & Bases.pdf', 'https://drive.google.com/file/d/1Z10UtlpnzqqSEn_nGjw4dhmtr4trwltI/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 19, NULL, NULL),
(70, 'Preparation of Salts.pdf', 'https://drive.google.com/file/d/1jR9xu03WW4HBhdjKiFu761OKBH9BcPdt/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 19, NULL, NULL),
(71, 'Chemical Change & Rate of Reaction.pdf', 'https://drive.google.com/file/d/1yzRDueCyEq8Fk4BiJQ-AfHgGqJ5GEnp5/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 20, NULL, NULL),
(72, 'Reversi le Reactions & Equili brium.pdf', 'https://drive.google.com/file/d/1IsXyGsG4qs4v5wkpHRlFPjXHEimOwqEO/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 20, NULL, NULL),
(73, 'Redox.pdf', 'https://drive.google.com/file/d/1PlQb1eMpLGWiUFdVQIZdgKdFcoMZzLZq/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 20, NULL, NULL),
(74, 'Water & water pollution.pdf', 'https://drive.google.com/file/d/1guC0F3BgjFAeCNE_5Y79wf3gmtMMbYF1/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 21, NULL, NULL),
(75, 'Air Quality & climate.pdf', 'https://drive.google.com/file/d/1EsTrhotQmGnArLw7Iq5zmUUiIePuii6f/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 21, NULL, NULL),
(76, 'Formulae & relative masses.pdf', 'https://drive.google.com/file/d/1UFz48ySBgUYMh8O2mQE8cO_PV2vgPNaz/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 22, NULL, NULL),
(77, 'The mole & the avogadro constant.pdf', 'https://drive.google.com/file/d/1WxWr2oss0LT7YMOvDg5SXXHRYhIkwGEV/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 22, NULL, NULL),
(78, 'Experimental Techniques.pdf', 'https://drive.google.com/file/d/18OIylAQwPPvnY9EfZeuz87o-88uTn9Qo/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 23, NULL, NULL),
(79, 'separation & Purification.pdf', 'https://drive.google.com/file/d/1KD7nqhE3cW2IiGYqsIOyRLaDEHxuW2ev/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 23, NULL, NULL),
(80, 'Identification of Ions & Gases.pdf', 'https://drive.google.com/file/d/1bUhuRFBQfPoc-h8HA1poMbQ_8Pz6gqjK/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 23, NULL, NULL),
(81, 'Atomic structure & the periodic table.pdf', 'https://drive.google.com/file/d/1ToSgc5uP5Zu1afF8D5opKz3TOcvEFpp_/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 24, NULL, NULL),
(82, 'Ions & ionic bonds.pdf', 'https://drive.google.com/file/d/1BoxZoI1pCDUI06_AQ_Os8gM7iSBBCgXR/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 24, NULL, NULL),
(83, 'simple molecules & covalents bonds.pdf', 'https://drive.google.com/file/d/1af8YWu9OaBBGFOnmTfkOnYQEcaeuhm8o/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 24, NULL, NULL),
(84, 'Gaint structures.pdf', 'https://drive.google.com/file/d/1FahrrDwJ-wNLxs-IjlcnO6peLrlBqDVm/view', '2026-08-15 17:38:56', '2026-08-15 17:38:56', 24, NULL, NULL),
(85, 'Nuclear Physics.pdf', 'https://drive.google.com/file/d/1t5oKKLzYJ3QTvNM2W7nMD3zu84DmVLUu/view', '2026-08-15 17:55:25', '2026-08-15 17:55:25', 29, NULL, NULL),
(86, 'Electricity and Magnetism.pdf', 'https://drive.google.com/file/d/1Xw_kev3tbAvYTxPFTU2zJQQcf3IXDk6g/view', '2026-08-15 17:55:25', '2026-08-15 17:55:25', 28, NULL, NULL),
(87, 'General physics.pdf', 'https://drive.google.com/file/d/16IdQ_w3aQpwGResSnbOj4mYfha8i4VHM/view', '2026-08-15 17:55:25', '2026-08-15 17:55:25', 25, NULL, NULL),
(88, 'Space Physics.pdf', 'https://drive.google.com/file/d/1s5hfPswjwBYk3_BjlRdLbpJA2cUGExGv/view', '2026-08-15 17:55:25', '2026-08-15 17:55:25', 30, NULL, NULL),
(89, 'Waves.pdf', 'https://drive.google.com/file/d/1iEtA3_TFBDf-s64S6g-VK7HDXy5zLXRg/view', '2026-08-15 17:55:25', '2026-08-15 17:55:25', 27, NULL, NULL),
(90, 'Thermal Physics.pdf', 'https://drive.google.com/file/d/1Stlcjm3A17VbyETFBg_lwAq2u-MywZel/view', '2026-08-15 17:55:25', '2026-08-15 17:55:25', 26, NULL, NULL);
--
-- Dumping data for table `Note`  (rows 91-110)
--
INSERT INTO `Note` (`id`, `title`, `content`, `createdAt`, `modifiedAt`, `noteCategoryId`, `createdBy`, `subjectId`) VALUES
(91, '5.1 The Nuclear Model of the Atom.pdf', 'https://drive.google.com/file/d/1VA4fUuw6cYLH5IZBslyM-z9GRNYgVSQL/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 34, NULL, NULL),
(92, '5.2 Radioactivity.pdf', 'https://drive.google.com/file/d/1kwCgGmCvDxSxbL9fToYiOS1Nz6mzpW-W/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 34, NULL, NULL),
(93, '4.1 Simple Phenomena of magnetism.pdf', 'https://drive.google.com/file/d/1flNLNJxmAH3QWjgfDVDxtuxUdOAqU1C3/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 33, NULL, NULL),
(94, '4.2 Electrical Quantities.pdf', 'https://drive.google.com/file/d/1PcPaqXzBWl5VWJhU14JgRPrgyIT7cs1P/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 33, NULL, NULL),
(95, '4.3 Electric Circuits & Electrical Safety.pdf', 'https://drive.google.com/file/d/1A21pZPaU6CIJfliXy9mHr_ro9lJLnp60/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 33, NULL, NULL),
(96, '4.4 Electromagnetic Effects.pdf', 'https://drive.google.com/file/d/1M5swHaL9aC3jOtaY5MHk1Wi6GQGA7rnd/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 33, NULL, NULL),
(97, '1.1 Physical Quantities & Measurment Techniques.pdf', 'https://drive.google.com/file/d/10-5Z7jrKCvB_pX4Z1n-Ogku65_BOZmDl/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 36, NULL, NULL),
(98, '1.2 Motion.pdf', 'https://drive.google.com/file/d/1SMXw5xixMiSwA6skgmsjRVAmPZG5j9Zf/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 36, NULL, NULL),
(99, '1.3 Mass, Weight & Density.pdf', 'https://drive.google.com/file/d/1LHnbGOFBXA_BMpeLlvhhWCGCxTX1mr7d/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 36, NULL, NULL),
(100, '1.4 Effects of forces.pdf', 'https://drive.google.com/file/d/1FwQ_ZPaLAxNVS95CV1k-fDncpbIkCB6a/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 36, NULL, NULL),
(101, '1.5 Moments.pdf', 'https://drive.google.com/file/d/1exdTrjY2wuvI990nTI5uUs16lWDfzKxE/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 36, NULL, NULL),
(102, '1.6 Momentum.pdf', 'https://drive.google.com/file/d/1pL8ulGSaiobPhcvxwj9bgIAhNmGTnenS/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 36, NULL, NULL),
(103, '1.7 Energy,Work & power.pdf', 'https://drive.google.com/file/d/1_W1ZKdF1YNA8N0kkp3SGRgTe0zn4t0uk/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 36, NULL, NULL),
(104, '1.8 Energy sources.pdf', 'https://drive.google.com/file/d/1Jb6CZarYYtroZa49PZQYH88UKYhjoexh/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 36, NULL, NULL),
(105, '1.9 Pressure.pdf', 'https://drive.google.com/file/d/1j3V0Z8vcmrLO--Hecd9uhSa6Z0LSi0qK/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 36, NULL, NULL),
(106, '6.1 Earth & The solar system.pdf', 'https://drive.google.com/file/d/1fs67uDxqYZmIE8ujK2n55F6Tb_oFMF81/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 35, NULL, NULL),
(107, '6.2 Stars & The universe.pdf', 'https://drive.google.com/file/d/1dnbZGVgkJ58ufK7svFbMPdUDtsGGQ5iS/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 35, NULL, NULL),
(108, '3.1 General Properties of Waves.pdf', 'https://drive.google.com/file/d/1FI1yZu0kXrCB0RQHxNIABeVOwjUjK2wU/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 32, NULL, NULL),
(109, '3.2 Light.pdf', 'https://drive.google.com/file/d/1ccFUflZLY2TfmtJua84u9XJQZIs0iLws/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 32, NULL, NULL),
(110, '3.3 Electromagnetic Spectrum.pdf', 'https://drive.google.com/file/d/1ALTt9A8wNWpGVUTnAHIeCrdRTk2LKSKF/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 32, NULL, NULL);
--
-- Dumping data for table `Note`  (rows 111-126)
--
INSERT INTO `Note` (`id`, `title`, `content`, `createdAt`, `modifiedAt`, `noteCategoryId`, `createdBy`, `subjectId`) VALUES
(111, '3.4 Sound.pdf', 'https://drive.google.com/file/d/1s1cgotl1qKQdVmmv_bYEztnT4aG8dg69/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 32, NULL, NULL),
(112, '2.1 Kinetic Particle Model of Matter.pdf', 'https://drive.google.com/file/d/143DBmhjH2FebYl3wesWImpYqQ1g0XVNr/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 31, NULL, NULL),
(113, '2.2 Thermal properties & Temperature.pdf', 'https://drive.google.com/file/d/1vpJOJbdjpN8qntROg6qH8_4Kq_-PHX46/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 31, NULL, NULL),
(114, '2.3 Transfer of thermal energy.pdf', 'https://drive.google.com/file/d/1K7SyQRxc-OdWAR2BIpfhDdttFRaJb4zf/view', '2026-08-15 18:09:10', '2026-08-15 18:09:10', 31, NULL, NULL),
(115, 'Nuclear Physics.pdf', 'https://drive.google.com/file/d/158PoB-Q_M0Wt2Zb7jEzoRLsza2MqIxgb/view', '2026-08-15 18:16:57', '2026-08-15 18:16:57', 40, NULL, NULL),
(116, 'Electricity and Magnetism .pdf', 'https://drive.google.com/file/d/19iil18wYZIBX78NmBY_W2Bsk4yV1FcoG/view', '2026-08-15 18:16:57', '2026-08-15 18:16:57', 39, NULL, NULL),
(117, 'General Physics.pdf', 'https://drive.google.com/file/d/1QxYTKeV07am_OOmzlcy8aBoY3h0IEqXS/view', '2026-08-15 18:16:57', '2026-08-15 18:16:57', 41, NULL, NULL),
(118, 'Space Physics.pdf', 'https://drive.google.com/file/d/1ik18JKUgFhK5Zz2oO6f9XI1OLlfoPqMn/view', '2026-08-15 18:16:57', '2026-08-15 18:16:57', 42, NULL, NULL),
(119, 'Waves.pdf', 'https://drive.google.com/file/d/1XNba6UKf__7lhnQg8o_sjJRgnyH9jOJL/view', '2026-08-15 18:16:57', '2026-08-15 18:16:57', 38, NULL, NULL),
(120, 'Thermal Physics.pdf', 'https://drive.google.com/file/d/1s7nP9Uxt33ddS8lS9jMCewhuwECtZxpN/view', '2026-08-15 18:16:57', '2026-08-15 18:16:57', 37, NULL, NULL),
(121, 'Nuclear Physics.png', 'https://drive.google.com/file/d/1nnyXu18v9GqUERxy5ffQuAHfeW3QQ4tg/view', '2026-08-15 18:23:30', '2026-08-15 18:23:30', 46, NULL, NULL),
(122, 'General Physics.png', 'https://drive.google.com/file/d/1Wsu4gVBNrbu752t7EKHqrc5akIUB19Eu/view', '2026-08-15 18:23:30', '2026-08-15 18:23:30', 47, NULL, NULL),
(123, 'Electricity and Magnetism.png', 'https://drive.google.com/file/d/1gD98uFV0Vsyw86F0sUjdRkdKm3Ch96CX/view', '2026-08-15 18:23:30', '2026-08-15 18:23:30', 45, NULL, NULL),
(124, 'Space physics.png', 'https://drive.google.com/file/d/1iZaigc77XX-V0zGSaQZbZlSKup0k3tsF/view', '2026-08-15 18:23:30', '2026-08-15 18:23:30', 48, NULL, NULL),
(125, 'Waves.png', 'https://drive.google.com/file/d/19UYdJDNySSYo65O4SC7LFT_H9K92mDJ7/view', '2026-08-15 18:23:30', '2026-08-15 18:23:30', 44, NULL, NULL),
(126, 'Thermal Physics.png', 'https://drive.google.com/file/d/1BXB50qrg9Q-uazJx599p2faCAoxGbslM/view', '2026-08-15 18:23:30', '2026-08-15 18:23:30', 43, NULL, NULL);
--
-- Dumping data for table `PastPaperTopic`
--
INSERT INTO `PastPaperTopic` (`id`, `title`, `subjectId`) VALUES
(58, '2023 MS', 2),
(59, '2023 QP', 2),
(60, '2024 MS', 2),
(61, '2024 QP', 2),
(62, '2025 MS', 2),
(63, '2025 QP', 2),
(64, '2023 Paper 2 QP', 3),
(65, '2023 Paper 2 MS', 3),
(68, '2023 Paper 4 MS', 3),
(69, '2023 Paper 4 QP', 3),
(70, '2023 Paper 6 QP', 3),
(71, '2023 Paper 6 MS', 3),
(72, '2024 Paper 2 MS', 3),
(73, '2024 Paper 2 QP', 3),
(74, '2024 Paper 4 MS', 3),
(75, '2024 Paper 4 QP', 3),
(76, '2024 Paper 6 MS', 3),
(77, '2024 Paper 6 QP', 3),
(78, '2025 Paper 2 MS', 3),
(79, '2025 Paper 2 QP', 3),
(80, '2025 Paper 4 MS', 3),
(81, '2025 Paper 4 QP', 3),
(82, '2025 Paper 6 MS', 3),
(83, '2025 Paper 6 QP', 3),
(84, '2023 Paper 2 Ms', 11),
(85, '2023 Paper 2 Qp', 11),
(87, '2023 Paper 4 Ms', 11),
(88, '2023 Paper 4 Qp', 11),
(89, '2023 Paper 6 Ms', 11),
(90, '2023 Paper 6 Qp', 11),
(91, '2024 Paper 2 Ms', 11),
(92, '2024 Paper 2 Qp', 11),
(93, '2024 Paper 4 Ms', 11),
(94, '2024 Paper 4 Qp', 11),
(95, '2024 Paper 6 Ms', 11),
(96, '2024 Paper 6 Qp', 11),
(97, '2025 Paper 2 Ms', 11),
(98, '2025 Paper 2 Qp', 11),
(99, '2025 Paper 4 Ms', 11),
(100, '2025 Paper 4 Qp', 11),
(103, '2025 Paper 6 Ms', 11),
(104, '2025 Paper 6 Qp', 11);

--
-- Dumping data for table `PastPaper`  (rows 58-82, Biology 2023 MS)
--
INSERT INTO `PastPaper` (`id`, `title`, `paperFile`, `year`, `pastPaperTopicId`) VALUES
(58, '0610_m23_ms_22.pdf', 'https://drive.google.com/file/d/1WZhiSCZEuiIYAFeNgYBURFIIzDnhUbri/view', 2023, 58),
(59, '0610_m23_ms_42.pdf', 'https://drive.google.com/file/d/1DDvpaMLAm1hgaj0xWpSxSwpBHhKhinpD/view', 2023, 58),
(60, '0610_m23_ms_62.pdf', 'https://drive.google.com/file/d/1h23e70aqCmq9yiviWBu0FqKJUhFON91U/view', 2023, 58),
(61, '0610_s23_ms_21.pdf', 'https://drive.google.com/file/d/1uXziSUIDt6PX0szzSymgQR1jbAGlfgbV/view', 2023, 58),
(62, '0610_s23_ms_22.pdf', 'https://drive.google.com/file/d/10O93aJiwAawK8Os8Ze7uDO2yQ9oKeqoa/view', 2023, 58),
(63, '0610_s23_ms_22.pdf', 'https://drive.google.com/file/d/1AtFnQ7LEBdAlZWyNvNLzwBHH4TDUUYYD/view', 2023, 58),
(64, '0610_s23_ms_23.pdf', 'https://drive.google.com/file/d/1WWP2rzmTkYa8FGSU_lVl7GaMmJ_iFm_5/view', 2023, 58),
(65, '0610_s23_ms_41.pdf', 'https://drive.google.com/file/d/1L929C9WFJbAckhkVYMhNfiB27eMUAJV5/view', 2023, 58),
(66, '0610_s23_ms_42.pdf', 'https://drive.google.com/file/d/1f4HIe1cVWy63Vwzv-nUofeM4fR0hN7dm/view', 2023, 58),
(67, '0610_s23_ms_43.pdf', 'https://drive.google.com/file/d/1heUNb7E2GrW_IQ1TJKPsnQQG4vUY7L5m/view', 2023, 58),
(68, '0610_s23_ms_61.pdf', 'https://drive.google.com/file/d/1xCtps01ycxEjJZ2uraCgCpL2A21GgAWB/view', 2023, 58),
(69, '0610_s23_ms_62.pdf', 'https://drive.google.com/file/d/1PmsSa0L0OAaK6rxrvYnNNzk2QwAyP8PH/view', 2023, 58),
(70, '0610_s23_ms_63.pdf', 'https://drive.google.com/file/d/11pxUWJCzo7TEGfgxlNE4tXmgjl-iGWRf/view', 2023, 58),
(71, '0610_w23_ms_21.pdf', 'https://drive.google.com/file/d/1D45YKkwTIY3R94cnCerYAUbDCPOeJ0P_/view', 2023, 58),
(72, '0610_w23_ms_21.pdf', 'https://drive.google.com/file/d/1HQXFgDo-33JiYOWK9RROIiHUQoGYPYYt/view', 2023, 58),
(73, '0610_w23_ms_22.pdf', 'https://drive.google.com/file/d/1gbraw3F6issBVQDGe35ebekx6wHToLhA/view', 2023, 58),
(74, '0610_w23_ms_22.pdf', 'https://drive.google.com/file/d/1qto0YHeByz8C03iaQfhkMsHQ4VJ_5TRf/view', 2023, 58),
(75, '0610_w23_ms_23.pdf', 'https://drive.google.com/file/d/1LHGygSOMMVg90m69oC0y2Ge8w8nOuIA7/view', 2023, 58),
(76, '0610_w23_ms_23.pdf', 'https://drive.google.com/file/d/1d-tnnjx4LWE68Ea_CehzerbIuaxN_aCb/view', 2023, 58),
(77, '0610_w23_ms_41.pdf', 'https://drive.google.com/file/d/10h_Gb_SVbNbMrw9XmZTXgwV4Gpp8eQEL/view', 2023, 58),
(78, '0610_w23_ms_42.pdf', 'https://drive.google.com/file/d/1J7hHHq4kzQQA3rJSADmOJELu86kY0Xvk/view', 2023, 58),
(79, '0610_w23_ms_43.pdf', 'https://drive.google.com/file/d/1wGEjS7PaSgksiIehjC0sw2bqZcHSSMkR/view', 2023, 58),
(80, '0610_w23_ms_61.pdf', 'https://drive.google.com/file/d/1xx5Lmo7eQFWgcXllLyjklVy4-v7HTXDn/view', 2023, 58),
(81, '0610_w23_ms_62.pdf', 'https://drive.google.com/file/d/1N9lOIdL08YMdvNSLFZ3qDNzRYySGaEuj/view', 2023, 58),
(82, '0610_w23_ms_63.pdf', 'https://drive.google.com/file/d/1rkF82tGb6-vrfXW_Y5QjG4ZO4ccVs86H/view', 2023, 58);
--
-- Dumping data for table `PastPaper`  (rows 83-103, Biology 2023 QP)
--
INSERT INTO `PastPaper` (`id`, `title`, `paperFile`, `year`, `pastPaperTopicId`) VALUES
(83, '0610_m23_qp_22.pdf', 'https://drive.google.com/file/d/13tDgjuc41KclRm5UmYeFPoTOXNIkVV3R/view', 2023, 59),
(84, '0610_m23_qp_42.pdf', 'https://drive.google.com/file/d/1zey7SHkywnHt4HESB6yCGHk5Kir-za7P/view', 2023, 59),
(85, '0610_m23_qp_62.pdf', 'https://drive.google.com/file/d/1WZKhlpd-EFJTdZrcsNh61An7oym5NfUV/view', 2023, 59),
(86, '0610_s23_qp_21.pdf', 'https://drive.google.com/file/d/1ix34eAJriu6Ll_xi1gv8RDURyaWgSpUR/view', 2023, 59),
(87, '0610_s23_qp_22.pdf', 'https://drive.google.com/file/d/1-OoC0f-LCLMTpipP91CGPwHHQ2T5SNBl/view', 2023, 59),
(88, '0610_s23_qp_23.pdf', 'https://drive.google.com/file/d/1aBgvZLRDqCcjOS32pE8fZqKJr8cj50jJ/view', 2023, 59),
(89, '0610_s23_qp_41.pdf', 'https://drive.google.com/file/d/1jLJWfuTMXeZMnG0dXxUxdiEfz1Rw-q2M/view', 2023, 59),
(90, '0610_s23_qp_42.pdf', 'https://drive.google.com/file/d/1K3CfCGHXDnEoluENPJ5OJiePN-U58MH4/view', 2023, 59),
(91, '0610_s23_qp_43.pdf', 'https://drive.google.com/file/d/14KnoeC68e-miNfSM1FFRDMzc4p9fTIzM/view', 2023, 59),
(92, '0610_s23_qp_61.pdf', 'https://drive.google.com/file/d/1OKuX-k0a52tqb77eZdeIEj_aQbPgAQyS/view', 2023, 59),
(93, '0610_s23_qp_62.pdf', 'https://drive.google.com/file/d/1zzY2HMTgEX2m9pKtuk63AgePZn20zMHf/view', 2023, 59),
(94, '0610_s23_qp_63.pdf', 'https://drive.google.com/file/d/1cX9jVtORorbloVQc3EPJtrwLNxbuABlb/view', 2023, 59),
(95, '0610_w23_qp_21.pdf', 'https://drive.google.com/file/d/1MP-S3vYIzX5pM7UYm7W2DU2AsZ_fHJBV/view', 2023, 59),
(96, '0610_w23_qp_22.pdf', 'https://drive.google.com/file/d/1waDfvq8YDIY_jXdTtCY_TkBpCrpMoVZv/view', 2023, 59),
(97, '0610_w23_qp_23.pdf', 'https://drive.google.com/file/d/1P86tHI5SGgaFOAYal7r9IDbuD2sGaGhx/view', 2023, 59),
(98, '0610_w23_qp_41.pdf', 'https://drive.google.com/file/d/1bHROZCHNX-QIeJHV1aKMNDgu8N-oaQY_/view', 2023, 59),
(99, '0610_w23_qp_42.pdf', 'https://drive.google.com/file/d/1TgVZsVgNMwCnmaguOEIBYRq7DmvAECNL/view', 2023, 59),
(100, '0610_w23_qp_43.pdf', 'https://drive.google.com/file/d/1cj8dgWPBl66wIAKIxVghTyyFYTwTCcQU/view', 2023, 59),
(101, '0610_w23_qp_61.pdf', 'https://drive.google.com/file/d/1iY2d5EhyuJ5kx5B7ciSRlYzZvBMt_aK6/view', 2023, 59),
(102, '0610_w23_qp_62.pdf', 'https://drive.google.com/file/d/1dpu2Jnw53KulBj1JWJaXUXQlfEpj84FJ/view', 2023, 59),
(103, '0610_w23_qp_63.pdf', 'https://drive.google.com/file/d/1Am3k8TNiycF0SKtSfOO8GIteSY_ClhWV/view', 2023, 59);
--
-- Dumping data for table `PastPaper`  (rows 104-127, Biology 2024 MS)
--
INSERT INTO `PastPaper` (`id`, `title`, `paperFile`, `year`, `pastPaperTopicId`) VALUES
(104, '0610_m24_ms_22.pdf', 'https://drive.google.com/file/d/1vQ_5VrIaNapMdUrv1y2Iig8fpQkWmEfm/view', 2024, 60),
(105, '0610_m24_ms_42.pdf', 'https://drive.google.com/file/d/1qH-bnBbopnLLkMMidFydi6jwj5yuHQvX/view', 2024, 60),
(106, '0610_m24_ms_62.pdf', 'https://drive.google.com/file/d/1auamR-XUqEQ6URaxYD3Fh3zFUCU2kD6z/view', 2024, 60),
(107, '0610_s24_ms_21.pdf', 'https://drive.google.com/file/d/1Ri_2iYG7TNHsK1EBEebwGETOsBSr1dUR/view', 2024, 60),
(108, '0610_s24_ms_22.pdf', 'https://drive.google.com/file/d/1pVQjUJD7Kg9F92QrNq--Dgkb2vAgIvpV/view', 2024, 60),
(109, '0610_s24_ms_23.pdf', 'https://drive.google.com/file/d/1HlW_uBViK8wRXcSRO457SpVSCtOYYXaO/view', 2024, 60),
(110, '0610_s24_ms_41.pdf', 'https://drive.google.com/file/d/1VTiizAr3RWEvlcNK9YFuUYxQqxA1KlMe/view', 2024, 60),
(111, '0610_s24_ms_42.pdf', 'https://drive.google.com/file/d/1Apahm9PGRqDSe2C7jyNsCDb_fpS-Yeh7/view', 2024, 60),
(112, '0610_s24_ms_43.pdf', 'https://drive.google.com/file/d/1kNocnPkYlx4WiOwG13qzpbXt2NjqKUMO/view', 2024, 60),
(113, '0610_s24_ms_61.pdf', 'https://drive.google.com/file/d/1M3jDtF1Oqm64k37o27XxHibi0OdQvjSS/view', 2024, 60),
(114, '0610_s24_ms_62.pdf', 'https://drive.google.com/file/d/18JEaHMebg3n3zJAGdt6rzzDH5XO95gdF/view', 2024, 60),
(115, '0610_s24_ms_63.pdf', 'https://drive.google.com/file/d/1RBeC-OeR8-1F9TUYsh4kweOx6wJT0LT6/view', 2024, 60),
(116, '0610_w24_ms_21.pdf', 'https://drive.google.com/file/d/1gTpSm00TCxYu91tmUSjhmQeWy9W_cvDm/view', 2024, 60),
(117, '0610_w24_ms_22.pdf', 'https://drive.google.com/file/d/1Jsuw1AQF7p1s5nungoPrNCn0APWCHjga/view', 2024, 60),
(118, '0610_w24_ms_23.pdf', 'https://drive.google.com/file/d/1mBVRbg1Ya6o2FgaWegF6rDD96jPuelsq/view', 2024, 60),
(119, '0610_w24_ms_41.pdf', 'https://drive.google.com/file/d/1A7vpx6SNI_e8CJ5BlEkrBIeIo1EofaQ6/view', 2024, 60),
(120, '0610_w24_ms_42.pdf', 'https://drive.google.com/file/d/1AVYenOWFX6VTYzu3TxnCb502E9QbcQGK/view', 2024, 60),
(121, '0610_w24_ms_43.pdf', 'https://drive.google.com/file/d/1yp5OHgnw2ecPzxbrlvnOME1ICij76WXa/view', 2024, 60),
(122, '0610_w24_ms_61.pdf', 'https://drive.google.com/file/d/1P7JYj314CpKsRE1tB8tZtWE6GRgk9JCA/view', 2024, 60),
(123, '0610_w24_ms_62.pdf', 'https://drive.google.com/file/d/1k1yaFeVyM9Yyhcvpv1bKTYdurAByIxrk/view', 2024, 60),
(124, '0610_w24_ms_63.pdf', 'https://drive.google.com/file/d/1OimM776YiBao9S_5in5tmBc8gF3BsMba/view', 2024, 60),
(125, '0610_m24_qp_22.pdf', 'https://drive.google.com/file/d/19STyb7YonRmzltEQITE6k4nTupx9g1-X/view', 2024, 61),
(126, '0610_m24_qp_42.pdf', 'https://drive.google.com/file/d/1KXHJchFGywfXRO3gpaZq4RMbE5WqMoEn/view', 2024, 61),
(127, '0610_m24_qp_62.pdf', 'https://drive.google.com/file/d/11_IZ0F_oEP8DiG_kvQKpLdbgBKkf1EOj/view', 2024, 61);
--
-- Dumping data for table `PastPaper`  (rows 128-145, Biology 2024 QP)
--
INSERT INTO `PastPaper` (`id`, `title`, `paperFile`, `year`, `pastPaperTopicId`) VALUES
(128, '0610_s24_qp_21.pdf', 'https://drive.google.com/file/d/12GoDYVMMLU8h3NkcV0XKRTif91wKFQPb/view', 2024, 61),
(129, '0610_s24_qp_22.pdf', 'https://drive.google.com/file/d/1XnkSmWKCjAAFgMeV1VFQW5dW6Xj9IeIU/view', 2024, 61),
(130, '0610_s24_qp_23.pdf', 'https://drive.google.com/file/d/1pG8sRIieJ_erPXzkaba6gU4osPmKC6mB/view', 2024, 61),
(131, '0610_s24_qp_41.pdf', 'https://drive.google.com/file/d/1fOR0RQYfMyt-T8tmuAJaX5q4lrVbuaY4/view', 2024, 61),
(132, '0610_s24_qp_42.pdf', 'https://drive.google.com/file/d/1UOOU6oaNLDBn35iCZ-kRMNrAUka4ek-k/view', 2024, 61),
(133, '0610_s24_qp_43.pdf', 'https://drive.google.com/file/d/1PoPocClzT-SMxBC_1SCMnT5JynEbIbHe/view', 2024, 61),
(134, '0610_s24_qp_61.pdf', 'https://drive.google.com/file/d/1-SjeITIuKg3c2M-cOoZGecsCDKFl_VAq/view', 2024, 61),
(135, '0610_s24_qp_62.pdf', 'https://drive.google.com/file/d/1FfTk4vQRuIR3mgSg6833UzSGlQ4sEfxM/view', 2024, 61),
(136, '0610_s24_qp_63.pdf', 'https://drive.google.com/file/d/1XI_Elf0lN_zbw67_k6V6F3TCJ08HDno3/view', 2024, 61),
(137, '0610_w24_qp_21.pdf', 'https://drive.google.com/file/d/11gI6rnvIaDGjNUZmJZcZdPGTGXLYDpMl/view', 2024, 61),
(138, '0610_w24_qp_22.pdf', 'https://drive.google.com/file/d/1KjIT99wCeOsY5c4vqym38uirioM3-waT/view', 2024, 61),
(139, '0610_w24_qp_23.pdf', 'https://drive.google.com/file/d/1EstCp7mCnEw66JqlquLopiqITGzmNuis/view', 2024, 61),
(140, '0610_w24_qp_41.pdf', 'https://drive.google.com/file/d/1Czp9M7Nr-Cxu7i9yD-3GpTJOotAFJKYx/view', 2024, 61),
(141, '0610_w24_qp_42.pdf', 'https://drive.google.com/file/d/1R0q4T9n61j4kKGSSlirmIuhM-JJt-t5l/view', 2024, 61),
(142, '0610_w24_qp_43.pdf', 'https://drive.google.com/file/d/1yn3YBSVr773XXUbGX6EZl-Evr_AfP_J9/view', 2024, 61),
(143, '0610_w24_qp_61.pdf', 'https://drive.google.com/file/d/1AhMdA62RvGaEjKNzY2KYa_MqKLoNu81J/view', 2024, 61),
(144, '0610_w24_qp_62.pdf', 'https://drive.google.com/file/d/1b7GZGW95ynIB1lV-iccHuWwYz3WHfOqB/view', 2024, 61),
(145, '0610_w24_qp_63.pdf', 'https://drive.google.com/file/d/1GQkcHWFwaSywcZIvSFNKNVtxrlU-bRiA/view', 2024, 61);

--
-- Dumping data for table `PastPaper`  (rows 146-169, Biology 2025 MS)
--
INSERT INTO `PastPaper` (`id`, `title`, `paperFile`, `year`, `pastPaperTopicId`) VALUES
(146, '0610_m25_ms_22.pdf', 'https://drive.google.com/file/d/1An0kDo-LTUK1yn9udFipnwAqyv69DxGL/view', 2025, 62),
(147, '0610_m25_ms_42.pdf', 'https://drive.google.com/file/d/1CK-Ikc3Mwc1F_AhS0axc1nkG7bkL0ZoU/view', 2025, 62),
(148, '0610_m25_ms_62.pdf', 'https://drive.google.com/file/d/1v4dXIpSepJxibLffF3gXS-4B4fp_5Bjs/view', 2025, 62),
(149, '0610_s25_ms_21.pdf', 'https://drive.google.com/file/d/1f05a6QPA9-ObNm2zpNvrKTkJpBd8VL4P/view', 2025, 62),
(150, '0610_s25_ms_22.pdf', 'https://drive.google.com/file/d/1KBf1VJsr5Y6ZirE-c3F7yrB8bDChpYMl/view', 2025, 62),
(151, '0610_s25_ms_23.pdf', 'https://drive.google.com/file/d/1C6Du_OAuW0VMuFNJ4J0JWVJM7D_nC9uS/view', 2025, 62),
(152, '0610_s25_ms_41.pdf', 'https://drive.google.com/file/d/1rBETX9Yf_Znz8DM5Mw569U3TV4oeGT29/view', 2025, 62),
(153, '0610_s25_ms_42.pdf', 'https://drive.google.com/file/d/1uM5lu1KkjGjg_qlvE3BBr0BVWUMRZmnw/view', 2025, 62),
(154, '0610_s25_ms_43.pdf', 'https://drive.google.com/file/d/1YKO9jTgPWabMcHmB5nWsNjS1IdkyVtJ9/view', 2025, 62),
(155, '0610_s25_ms_61.pdf', 'https://drive.google.com/file/d/1UVTwxsDYAudmdRBrAwbDFk-9nb304P39/view', 2025, 62),
(156, '0610_s25_ms_62.pdf', 'https://drive.google.com/file/d/11M3uKqueDIyGX2bE3YIFpo68nPhVnonO/view', 2025, 62),
(157, '0610_s25_ms_63.pdf', 'https://drive.google.com/file/d/1YpGA7wjRvLw2edvSZtAEaJbecnjQye9F/view', 2025, 62),
(158, '0610_w25_ms_21.pdf', 'https://drive.google.com/file/d/1kkuJhZs4iR_N6wyHnhBDBY2hiI08GPf4/view', 2025, 62),
(159, '0610_w25_ms_22.pdf', 'https://drive.google.com/file/d/1qWiZuBIadoGvXLSEbcdDhJqBXPRc9mtT/view', 2025, 62),
(160, '0610_w25_ms_23.pdf', 'https://drive.google.com/file/d/1EF-kk4RpTGdr2ec9w_aZHMWfzWrYPJUv/view', 2025, 62),
(161, '0610_w25_ms_41.pdf', 'https://drive.google.com/file/d/14tpHwALqh5k2pLNuVKB4KuJ8_6ni30xI/view', 2025, 62),
(162, '0610_w25_ms_42.pdf', 'https://drive.google.com/file/d/1zWHfDWIMso7xLGSCgYvpm_fZ3AXfPKv8/view', 2025, 62),
(163, '0610_w25_ms_43.pdf', 'https://drive.google.com/file/d/1yP2ry-M7W9NuFGV5i-Sj_mgHcZzAD6Zs/view', 2025, 62),
(164, '0610_w25_ms_61.pdf', 'https://drive.google.com/file/d/1reJfxpVo1KYaycRpjh-D10UVq7e5IasH/view', 2025, 62),
(165, '0610_w25_ms_62.pdf', 'https://drive.google.com/file/d/1KoaVdC1dH0kkpb_3BFm__1FOoi0j-qK0/view', 2025, 62),
(166, '0610_w25_ms_63.pdf', 'https://drive.google.com/file/d/1zndpAXkFSRd_kBggU9bIb31-am-ligXL/view', 2025, 62),
(167, '0610_m25_qp_22.pdf', 'https://drive.google.com/file/d/1L2CglwU-gHd9kzLB9dbb6CRCFtk189TN/view', 2025, 63),
(168, '0610_m25_qp_42.pdf', 'https://drive.google.com/file/d/19zc3D5PS0vhtcEzJuBaTuRLw9M9rHE-Z/view', 2025, 63),
(169, '0610_m25_qp_62.pdf', 'https://drive.google.com/file/d/1za0Y04NfSUfokjpISN-c_xx6tQ9LLBCU/view', 2025, 63);
--
-- Dumping data for table `PastPaper`  (rows 170-187, Biology 2025 QP)
--
INSERT INTO `PastPaper` (`id`, `title`, `paperFile`, `year`, `pastPaperTopicId`) VALUES
(170, '0610_s25_qp_21.pdf', 'https://drive.google.com/file/d/1pQo2decQ9DoBqy5kcgNsRIiwoXQ17O70/view', 2025, 63),
(171, '0610_s25_qp_22.pdf', 'https://drive.google.com/file/d/1sdSLeeLZ15l_WSw9sSyCXZQr1buMmaoP/view', 2025, 63),
(172, '0610_s25_qp_23.pdf', 'https://drive.google.com/file/d/1xcsJQ7rao8cQywKlSixJ5wguhjMZQzoa/view', 2025, 63),
(173, '0610_s25_qp_41.pdf', 'https://drive.google.com/file/d/1okGxa_A0z4E__zvQ_6Vja0twMn1HyJQc/view', 2025, 63),
(174, '0610_s25_qp_42.pdf', 'https://drive.google.com/file/d/1gpJ4LKz2-P54sswEckbMedjmxm4m_9no/view', 2025, 63),
(175, '0610_s25_qp_43.pdf', 'https://drive.google.com/file/d/1Vul9-j9j3Wg7lhpeL362GmfU7109JEUP/view', 2025, 63),
(176, '0610_s25_qp_61.pdf', 'https://drive.google.com/file/d/1pgTyjjTUx6IVvlfT6f1Fy-O-j_x5oH7Y/view', 2025, 63),
(177, '0610_s25_qp_62.pdf', 'https://drive.google.com/file/d/1x2t8_0gpbW18Bs3NaTFYy9cYQKHgrPk2/view', 2025, 63),
(178, '0610_s25_qp_63.pdf', 'https://drive.google.com/file/d/1nGwJN4gDZmssA-YMjV3cWe3f1eNc_5nG/view', 2025, 63),
(179, '0610_w25_qp_21.pdf', 'https://drive.google.com/file/d/1CWsiLDVOOKu0Ig0wnEb-JMRkzlcyAHsr/view', 2025, 63),
(180, '0610_w25_qp_22.pdf', 'https://drive.google.com/file/d/1Ais6tXQrx4GEiEAQGHNaJLVqeh0Wst0c/view', 2025, 63),
(181, '0610_w25_qp_23.pdf', 'https://drive.google.com/file/d/1dw2souVxXLXmfYzIdODZzI2JmWnE2NTq/view', 2025, 63),
(182, '0610_w25_qp_41.pdf', 'https://drive.google.com/file/d/1uQlvltBfrveYzKdS0IVKaykxCOdhagEP/view', 2025, 63),
(183, '0610_w25_qp_42.pdf', 'https://drive.google.com/file/d/1gFHMXbOgchQaTbJyk8LXdiID0jN98fhr/view', 2025, 63),
(184, '0610_w25_qp_43.pdf', 'https://drive.google.com/file/d/16hlGNsqq1CMiayAffuIxX4kfWlBs7flb/view', 2025, 63),
(185, '0610_w25_qp_61.pdf', 'https://drive.google.com/file/d/1ZXn2_oaFRXIPzx7JOxk3jVR2S08AFQAg/view', 2025, 63),
(186, '0610_w25_qp_62.pdf', 'https://drive.google.com/file/d/1V8o4smZmivsXuKTiLwj1yXFQ32aS85m2/view', 2025, 63),
(187, '0610_w25_qp_63.pdf', 'https://drive.google.com/file/d/12vJP4EjWaviglQU_WAHoQVytN3OH2vav/view', 2025, 63);

--
-- Dumping data for table `PastPaper`  (rows 188-211, Chemistry 2023)
--
INSERT INTO `PastPaper` (`id`, `title`, `paperFile`, `year`, `pastPaperTopicId`) VALUES
(188, 'Feb/Mar 2023 Paper 42 MS.pdf', 'https://drive.google.com/file/d/1wW4Le-2Noqh4iIR11Y6-l7NfUavHfZqy/view', 2023, 68),
(189, 'May/June 2023 Paper 41 MS.pdf', 'https://drive.google.com/file/d/1LOe153_T_2zfT-p56FwNUXYSTVEYOMWU/view', 2023, 68),
(190, 'May/June 2023 Paper 42 MS.pdf', 'https://drive.google.com/file/d/1mhYnJa04z_a_sgmGZiBtFWVcEJIYqBWa/view', 2023, 68),
(191, 'May/June 2023 Paper 43 MS.pdf', 'https://drive.google.com/file/d/1ASmSmk2-pSG9LNcUsOiGuVFTs8YOZrQ3/view', 2023, 68),
(192, 'Oct/Nov 2023 Paper 41 MS.pdf', 'https://drive.google.com/file/d/15QtahxCyMXYKDOt_k_0bseNF4EP2ea0t/view', 2023, 68),
(193, 'Oct/Nov 2023 Paper 42 MS.pdf', 'https://drive.google.com/file/d/1zBzw4tJNaKtkP98NiI89eiRe3InE5bDx/view', 2023, 68),
(194, 'Oct/Nov 2023 Paper 43 MS.pdf', 'https://drive.google.com/file/d/18PUBBTPKI1u1_h1LD0Fr3WZB9yFd0zQR/view', 2023, 68),
(195, 'Feb/Mar 2023 Paper 42 QP.pdf', 'https://drive.google.com/file/d/1k9j_QmxYQrLtpAqudWMX7CO1-legwqrO/view', 2023, 69),
(196, 'May/June 2023 Paper 43 QP.pdf', 'https://drive.google.com/file/d/1UMJ0qrbmbzJMXeHFwYGsjLWs7UTZKKbO/view', 2023, 69),
(197, 'May/June 2023 Paper 41 QP.pdf', 'https://drive.google.com/file/d/1OM31QYfrpiQr61dvNMPFkOawwm-b0ri-/view', 2023, 69),
(198, 'May/June 2023 Paper 42 QP.pdf', 'https://drive.google.com/file/d/1KbHvLqSLyr4d0n6dbzHlJ_STzS6oLkQn/view', 2023, 69),
(199, 'Oct/Nov 2023 Paper 41 QP.pdf', 'https://drive.google.com/file/d/1ERk1NxAxiuLd1fbFWdxfz4tiROsitKZT/view', 2023, 69),
(200, 'Oct/Nov 2023 Paper 42 QP.pdf', 'https://drive.google.com/file/d/1rSaq11Npj5yzG6pOGFkT4PeZxJjaxcgI/view', 2023, 69),
(201, 'Oct/Nov 2023 Paper 43 QP.pdf', 'https://drive.google.com/file/d/1pi6Mr0uf7PxZhqlf3YasjIfWEXjUr64S/view', 2023, 69),
(202, 'Feb/Mar 2023 Paper 22 MS.pdf', 'https://drive.google.com/file/d/19MVy32KqKmbiVrMCrT1O8e6N4jt6LOPN/view', 2023, 65),
(203, 'May/June 2023 Paper 21 MS.pdf', 'https://drive.google.com/file/d/1y3t-WZJ8FGx_wqP7hORIHRjBTyuPrhxK/view', 2023, 65),
(204, 'May/June 2023 Paper 22 MS.pdf', 'https://drive.google.com/file/d/1sfupz96uPbjlBVGZ6B8ObadxMtytCjCI/view', 2023, 65),
(205, 'May/June 2023 Paper 23 MS.pdf', 'https://drive.google.com/file/d/1xSy-Etf3RjU-yxxVhGWXzSFJENTSEkEe/view', 2023, 65),
(206, 'Oct/Nov 2023 Paper 21 MS.pdf', 'https://drive.google.com/file/d/1nQ9_viAgD3K4slbdijj6Qldg9jURmrHv/view', 2023, 65),
(207, 'Oct/Nov 2023 Paper 22 MS.pdf', 'https://drive.google.com/file/d/1YPUYDCF4xea_Yd0iRmtHfAJfWpsxlVgx/view', 2023, 65),
(208, 'Oct/Nov 2023 Paper 23 MS.pdf', 'https://drive.google.com/file/d/1nebf0HWhg5mRe3h-0E4kLahW2MhSqv-D/view', 2023, 65),
(209, 'Feb/Mar 2023 Paper 22 QP.pdf', 'https://drive.google.com/file/d/1XxzM1nk2baePP_z6io4jL22s8nmqCB5D/view', 2023, 64),
(210, 'May/June 2023 Paper 21 QP.pdf', 'https://drive.google.com/file/d/1vTWGmqplVcwu9ggvDGnW8oXkZ0m9AAp7/view', 2023, 64),
(211, 'May/June 2023 Paper 22 QP.pdf', 'https://drive.google.com/file/d/1mdzlt1gK7SbFinI5dbvTpNYIMzAXWjKQ/view', 2023, 64);
--
-- Dumping data for table `PastPaper`  (rows 212-229, Chemistry 2023 QP/MS)
--
INSERT INTO `PastPaper` (`id`, `title`, `paperFile`, `year`, `pastPaperTopicId`) VALUES
(212, 'May/June 2023 Paper 23 QP.pdf', 'https://drive.google.com/file/d/1nZnTwlCRt9DcYE8zcfO0Qoi4EF9nXE6-/view', 2023, 64),
(213, 'Oct/Nov 2023 Paper 21 QP.pdf', 'https://drive.google.com/file/d/12Arh26H3cMd3JcId7hgrfT2wtikUN16f/view', 2023, 64),
(214, 'Oct/Nov 2023 Paper 22 QP.pdf', 'https://drive.google.com/file/d/17NXWRBcosdVp-YPmXjV7gzCYOVe6-1kS/view', 2023, 64),
(215, 'Oct/Nov 2023 Paper 23 QP.pdf', 'https://drive.google.com/file/d/1fWiWXSAt_NUPKRso2OYy8lSyvP2gcDZs/view', 2023, 64),
(216, 'Feb/Mar 2023 Paper 62 MS.pdf', 'https://drive.google.com/file/d/1J1z3sW1jxQb2Xrk9tZNOSsmB5O2luHzW/view', 2023, 71),
(217, 'May/June 2023 Paper 61 MS.pdf', 'https://drive.google.com/file/d/1gMwh9E65iJSiWuhWL-GzUCAcBxH0rwV2/view', 2023, 71),
(218, 'May/June 2023 Paper 62 MS.pdf', 'https://drive.google.com/file/d/12YYFdI5fLsJbHEiLuJbwyQcu3ijH8v1O/view', 2023, 71),
(219, 'May/June 2023 Paper 63 MS.pdf', 'https://drive.google.com/file/d/1rhYtYFlvW_U5kDHJpWaRussP5mePKDV9/view', 2023, 71),
(220, 'Oct/Nov 2023 Paper 61 MS.pdf', 'https://drive.google.com/file/d/12eZyw2kD92eu1xruKZTI1_bftKJG5LaU/view', 2023, 71),
(221, 'Oct/Nov 2023 Paper 62 MS.pdf', 'https://drive.google.com/file/d/1xCRoUKut_apt7OwP83IF0yWCN_7wqnZO/view', 2023, 71),
(222, 'Oct/Nov 2023 Paper 63 MS.pdf', 'https://drive.google.com/file/d/1g5UMw7OWrckPA5NOjOeDGlWpVHTeYP6Q/view', 2023, 71),
(223, 'Feb/Mar 2023 Paper 62 QP.pdf', 'https://drive.google.com/file/d/1qGomeoux4vBvy06OMSO0zlVdPrcEKjlr/view', 2023, 70),
(224, 'May/June 2023 Paper 61 QP.pdf', 'https://drive.google.com/file/d/1mlQbHEOx7RzEvWxACXjejacyJPIsfCv4/view', 2023, 70),
(225, 'May/June 2023 Paper 62 QP.pdf', 'https://drive.google.com/file/d/1p1F4GeGUYQfXKg7gQWHFcSiueHgrrD15/view', 2023, 70),
(226, 'May/June 2023 Paper 63 QP.pdf', 'https://drive.google.com/file/d/1XtrGCRkzANUhWHl4KvUc8cOGnswg1XHk/view', 2023, 70),
(227, 'Oct/Nov 2023 Paper 61 QP.pdf', 'https://drive.google.com/file/d/18DRyCJyYZ3vaDRpDD75JuNOtI_8Pnm8y/view', 2023, 70),
(228, 'Oct/Nov 2023 Paper 62 QP.pdf', 'https://drive.google.com/file/d/1_N4QLkyMHpaZJz285nxnxpl9ScQUHwZG/view', 2023, 70),
(229, 'Oct/Nov 2023 Paper 63 QP.pdf', 'https://drive.google.com/file/d/1XGdN839wUN2R20_oJ4mXWB9bmomHOOmO/view', 2023, 70);
--
-- Dumping data for table `PastPaper`  (rows 230-257, Chemistry 2024)
--
INSERT INTO `PastPaper` (`id`, `title`, `paperFile`, `year`, `pastPaperTopicId`) VALUES
(230, 'Feb/Mar 2024 Paper 22 MS.pdf', 'https://drive.google.com/file/d/1fAkITNUtTvRX7FH7Xro0iM2tMzjfkZFM/view', 2024, 72),
(231, 'May/June 2024 Paper 21 MS.pdf', 'https://drive.google.com/file/d/1axW45jVPDLIQZKq2j64_rUQzMCDw7SbP/view', 2024, 72),
(232, 'May/June 2024 Paper 22 MS.pdf', 'https://drive.google.com/file/d/1F0wpSBDrNWKceAeMRmj_syh-1ooH-Xwe/view', 2024, 72),
(233, 'May/June 2024 Paper 23 MS.pdf', 'https://drive.google.com/file/d/190dsqST1roo8FXuljtKgVSqMSWJ4jIva/view', 2024, 72),
(234, 'Oct/Nov 2024 Paper 21 MS.pdf', 'https://drive.google.com/file/d/1p9wg6px1HoBJJ-tw_Nz7LOB_ogboM_QR/view', 2024, 72),
(235, 'Oct/Nov 2024 Paper 22 MS.pdf', 'https://drive.google.com/file/d/1H7tg2ZRElmhuFd6vz-1p0GKPmyiS3IDc/view', 2024, 72),
(236, 'Oct/Nov 2024 Paper 23 MS.pdf', 'https://drive.google.com/file/d/1eS_pYLw3dzN-w0xw1uazy9KJ-PTHBZxO/view', 2024, 72),
(237, 'Feb/Mar 2024 Paper 21 QP.pdf', 'https://drive.google.com/file/d/16hKGy0OrsPcgF35EVnCxEUo5T90D97cd/view', 2024, 73),
(238, 'May/June 2024 Paper 21 QP.pdf', 'https://drive.google.com/file/d/1S8a2dsbw5Y1T4jn0scUl10IAL3Kof8CT/view', 2024, 73),
(239, 'May/June 2024 Paper 22 QP.pdf', 'https://drive.google.com/file/d/1YZ4d2Q8Y9rcHAIHZQJuyNPQu7TZ0Tqnj/view', 2024, 73),
(240, 'May/June 2024 Paper 23 QP.pdf', 'https://drive.google.com/file/d/1-NqRu9YeXIM8O-pgCbnnbCfVgGcaP81Q/view', 2024, 73),
(241, 'Oct/Nov 2024 Paper 21 QP.pdf', 'https://drive.google.com/file/d/1bHKofrWggHG1JobkWrD3_LxslEJ3xQUe/view', 2024, 73),
(242, 'Oct/Nov 2024 Paper 22 QP.pdf', 'https://drive.google.com/file/d/18v6bhyQD75uhuAQocxYzk2F0peJeroZ-/view', 2024, 73),
(243, 'Oct/Nov 2024 Paper 23 QP.pdf', 'https://drive.google.com/file/d/1Ti3xmQwWuZBYPxOx1VSUr3Qqee4317LS/view', 2024, 73),
(244, 'Feb/Mar 2024 Paper 42 MS.pdf', 'https://drive.google.com/file/d/1C1cw1c92Znc-hJNlKUENKx-U6zO6Be05/view', 2024, 74),
(245, 'May/June 2024 Paper 41 MS.pdf', 'https://drive.google.com/file/d/1V0j6x5SEXawHaJt6-ZWa2ViIfoyPGlzQ/view', 2024, 74),
(246, 'May/June 2024 Paper 42 MS.pdf', 'https://drive.google.com/file/d/1JGSCorwoIsB5KaBQwnAaeCkAyHA8W5my/view', 2024, 74),
(247, 'May/June 2024 Paper 43 MS.pdf', 'https://drive.google.com/file/d/1cPDgd7lbhsn1zayN6WI3mtRrLs0vjOS5/view', 2024, 74),
(248, 'Oct/Nov 2024 Paper 41 MS.pdf', 'https://drive.google.com/file/d/1YcKfxVlXJ3T7F8vhkFHEof3jA8l-cd3C/view', 2024, 74),
(249, 'Oct/Nov 2024 Paper 42 MS.pdf', 'https://drive.google.com/file/d/1QgG1DINsN2Co0DQ1BVnCAJpI4uNnUWf3/view', 2024, 74),
(250, 'Oct/Nov 2024 Paper 43 MS.pdf', 'https://drive.google.com/file/d/1VsAFYXvApdW83qOd96NvDxW42jGeZtK_/view', 2024, 74),
(251, 'Feb/Mar 2024 Paper 42 QP.pdf', 'https://drive.google.com/file/d/1kOT3TUrps-CC0QuSuDPfixxv2Co7Je8T/view', 2024, 75),
(252, 'May/June 2024 Paper 41 QP.pdf', 'https://drive.google.com/file/d/1bvJDjPcULtRRh6eW5AntOHNImfCA15BA/view', 2024, 75),
(253, 'May/June 2024 Paper 42 QP.pdf', 'https://drive.google.com/file/d/1CIfg45FwbvFYSqXuUpf_oSOMBUJWEff5/view', 2024, 75),
(254, 'May/June 2024 Paper 43 QP.pdf', 'https://drive.google.com/file/d/1d61ENec19ln9sVi20WegfaACe0GKkFJB/view', 2024, 75),
(255, 'Oct/Nov 2024 Paper 41 QP.pdf', 'https://drive.google.com/file/d/1ftSSBnMqGrhNZDVFlHHNLBxZxpAhXqUn/view', 2024, 75),
(256, 'Oct/Nov 2024 Paper 42 QP.pdf', 'https://drive.google.com/file/d/1iWA7hgX2YPtQ_73nfFZjezouLALRGn7_/view', 2024, 75),
(257, 'Oct/Nov 2024 Paper 43 QP.pdf', 'https://drive.google.com/file/d/1th32jvAysbLH_DQ-5hG6nsoxQjlFsFV3/view', 2024, 75);
--
-- Dumping data for table `PastPaper`  (rows 258-271, Chemistry 2024 Paper 6)
--
INSERT INTO `PastPaper` (`id`, `title`, `paperFile`, `year`, `pastPaperTopicId`) VALUES
(258, 'Feb/Mar 2024 Paper 62 MS.pdf', 'https://drive.google.com/file/d/1ck_Nn0n863ySJtPbO8NnBpoV3uU6Eegx/view', 2024, 76),
(259, 'May/June 2024 Paper 61 MS.pdf', 'https://drive.google.com/file/d/1PP9g2e8HOfYjgQmDuXT8CMhqtz1NPFVr/view', 2024, 76),
(260, 'May/June 2024 Paper 62 MS.pdf', 'https://drive.google.com/file/d/1o5MJiA2Ueq7R-iybhYy3S1AmLcx5EuU4/view', 2024, 76),
(261, 'May/June 2024 Paper 63 MS.pdf', 'https://drive.google.com/file/d/1ZiHFnuL9r4uV9N9WjxjvLKfOm5mYlBKb/view', 2024, 76),
(262, 'Oct/Nov 2024 Paper 61 MS.pdf', 'https://drive.google.com/file/d/1pcDuEeMeHyj-oT5TLLhKBNTA_yHjZrCc/view', 2024, 76),
(263, 'Oct/Nov 2024 Paper 62 MS.pdf', 'https://drive.google.com/file/d/1LuOGjJHSeDKIUIhRthDo7tQn2ZEqHHfw/view', 2024, 76),
(264, 'Oct/Nov 2024 Paper 63 MS.pdf', 'https://drive.google.com/file/d/1IAkuEOuhEaIEqncIWkRc0ZwuYsGxH6Gz/view', 2024, 76),
(265, 'Feb/Mar 2024 Paper 62 QP.pdf', 'https://drive.google.com/file/d/1HuWA1-JiGzyxUxAuiIv6G_ARdUK1ps4O/view', 2024, 77),
(266, 'May/June 2024 Paper 61 QP.pdf', 'https://drive.google.com/file/d/1snCMQ1HusbiexeSvRQu9dZIvjqUYSNet/view', 2024, 77),
(267, 'May/June 2024 Paper 62 QP.pdf', 'https://drive.google.com/file/d/1QoEBxvVqJFOz8ePjl_RwDeddAG6XDfKs/view', 2024, 77),
(268, 'May/June 2024 Paper 63 QP.pdf', 'https://drive.google.com/file/d/1UZdOLqI7CRxFeFnX4lc0ViGjrFhjvuQ_/view', 2024, 77),
(269, 'Oct/Nov 2024 Paper 61 QP.pdf', 'https://drive.google.com/file/d/1kz9WUfCqR6RP1iiZ-V4Xok3iD90ba0UH/view', 2024, 77),
(270, 'Oct/Nov 2024 Paper 62 QP.pdf', 'https://drive.google.com/file/d/10dnBAkFeKZmZEdpbs4eLjm2PTUy_hprR/view', 2024, 77),
(271, 'Oct/Nov 2024 Paper 63 QP.pdf', 'https://drive.google.com/file/d/1OUzkG5mDJZm7vHPaRZACtmVrpNc6kciC/view', 2024, 77);
--
-- Dumping data for table `PastPaper`  (rows 272-295, Chemistry 2025)
--
INSERT INTO `PastPaper` (`id`, `title`, `paperFile`, `year`, `pastPaperTopicId`) VALUES
(272, 'Feb/Mar 2025 Paper 22 MS.pdf', 'https://drive.google.com/file/d/1dKqSub6mZaTtlckOFy_IXNvDEkeFNEHj/view', 2025, 78),
(273, 'May/June 2025 Paper 21 MS.pdf', 'https://drive.google.com/file/d/1MdeZZBrn-bUOGTqbk4SeY74X4R7IilA2/view', 2025, 78),
(274, 'May/June 2025 Paper 22 MS.pdf', 'https://drive.google.com/file/d/1VorsbmEb1AgBLBf4qgLXKi0hwlpCogtb/view', 2025, 78),
(275, 'May/June 2025 Paper 23 MS.pdf', 'https://drive.google.com/file/d/1JmxZm-jY4pXeM9Aw9RJnyb4UalI5m86u/view', 2025, 78),
(276, 'Feb/Mar 2025 Paper 22 QP.pdf', 'https://drive.google.com/file/d/1ih0f98hb1heo-gckKlKexjW7UEVDIC62/view', 2025, 79),
(277, 'May/June 2025 Paper 21 QP.pdf', 'https://drive.google.com/file/d/1N6o3AJqTEvqrHOsKhzWzB-KNBORLIdIG/view', 2025, 79),
(278, 'May/June 2025 Paper 22 QP.pdf', 'https://drive.google.com/file/d/1pjGKCYaa_UTgTPSpaSxeitceZozqkVO6/view', 2025, 79),
(279, 'May/June 2025 Paper 23 QP.pdf', 'https://drive.google.com/file/d/1O2QNKT7Qu2pXPC3nrNtl8ddVeoMJcVBS/view', 2025, 79),
(280, 'Feb/Mar 2025 Paper 42 MS.pdf', 'https://drive.google.com/file/d/1_mKLXL0IGaC48EW5z6XBWoFveyO9b96j/view', 2025, 80),
(281, 'May/June 2025 Paper 41 MS.pdf', 'https://drive.google.com/file/d/1wIvYAS-klgrJvOzlGCxOGG72IsulhXQN/view', 2025, 80),
(282, 'May/June 2025 Paper 42 MS.pdf', 'https://drive.google.com/file/d/1YNUyHJTdoT7ljbabK4m-_Dtpjczqt5Ce/view', 2025, 80),
(283, 'May/June 2025 Paper 43 MS.pdf', 'https://drive.google.com/file/d/1vY_hW5l8pq-kT_t2yfu9PObDXsAQmX36/view', 2025, 80),
(284, 'Feb/Mar 2025 Paper 42 QP.pdf', 'https://drive.google.com/file/d/1KD92JHwQyoGh6FB87ogAPhtSNIZfkkTt/view', 2025, 81),
(285, 'May/June 2025 Paper 41 QP.pdf', 'https://drive.google.com/file/d/1YQnBqDkL3sy9MleVnuAFAJLxzC7OeR7t/view', 2025, 81),
(286, 'May/June 2025 Paper 42 QP.pdf', 'https://drive.google.com/file/d/1tyXsvMZQA6Qda6-X9uGrbg-F3Ftc_S2A/view', 2025, 81),
(287, 'May/June 2025 Paper 43 QP.pdf', 'https://drive.google.com/file/d/1w1DGNnOh4G-t_u5dKWJTnU5sAppjSQLb/view', 2025, 81),
(288, 'Feb/Mar 2025 Paper 62 MS.pdf', 'https://drive.google.com/file/d/1A_MDXkWgIdVUVXINUTmz6yDFjpXrX7hQ/view', 2025, 82),
(289, 'May/June 2025 Paper 61 MS.pdf', 'https://drive.google.com/file/d/1MaHPxNmD2yWuN_OjgnHCcQpgaP4WUGLz/view', 2025, 82),
(290, 'May/June 2025 Paper 62 MS.pdf', 'https://drive.google.com/file/d/1OyR5d9S7yGIB0iBCkBXFB7AK-BqOqjwk/view', 2025, 82),
(291, 'May/June 2025 Paper 63 MS.pdf', 'https://drive.google.com/file/d/1aeBFCqr6gbwllXpCY76pdtZ5tuXCki-7/view', 2025, 82),
(292, 'Feb/Mar 2025 Paper 62 QP.pdf', 'https://drive.google.com/file/d/1Cq6YKmVOpgdyEFDXkjXckb0EmipKv3qu/view', 2025, 83),
(293, 'May/June 2025 Paper 61 QP.pdf', 'https://drive.google.com/file/d/1qkN8bKW-lgPLnKcoz6mKh5A1lUnHOy3I/view', 2025, 83),
(294, 'May/June 2025 Paper 62 QP.pdf', 'https://drive.google.com/file/d/1F30W9TvAygH1c9H7H4ZpWoQ4mciLovye/view', 2025, 83),
(295, 'May/June 2025 Paper 63 QP.pdf', 'https://drive.google.com/file/d/1djqRy42HVFQY4DjlYd43opyK3CFYNLx5/view', 2025, 83);
--
-- Dumping data for table `PastPaper`  (rows 296-313, Physics 2023 Paper 2)
--
INSERT INTO `PastPaper` (`id`, `title`, `paperFile`, `year`, `pastPaperTopicId`) VALUES
(296, 'Feb/Mar 2023 Paper 22 MS.pdf', 'https://drive.google.com/file/d/1vvqET13ILzqsymGK6-l-w0GSS9UxA5nv/view', 2023, 84),
(297, 'May/June 2023 Paper 21 MS.pdf', 'https://drive.google.com/file/d/1SiEiS-7PUfQAwTC7XUkIB_7ajA7VFDAB/view', 2023, 84),
(298, 'May/June 2023 Paper 22 MS.pdf', 'https://drive.google.com/file/d/191Yl_jhWSCpFF8MbW0R3qKJNRVjlCP85/view', 2023, 84),
(299, 'May/June 2023 Paper 23 MS.pdf', 'https://drive.google.com/file/d/1NTaBAha1Hdww6FFBDQXJGcF8XpyUA5Y6/view', 2023, 84),
(300, 'Oct/Nov 2023 Paper 21 MS.pdf', 'https://drive.google.com/file/d/1RhYVjJ5EeBhQ8vw3TmLbig2VZaYVmGi0/view', 2023, 84),
(301, 'Oct/Nov 2023 Paper 22 MS.pdf', 'https://drive.google.com/file/d/1WY7-VTgCz2QUJcmXInqfDNroeqCmpSvV/view', 2023, 84),
(302, 'Oct/Nov 2023 Paper 23 MS.pdf', 'https://drive.google.com/file/d/1RsQ2_Kf3uFpoMuIwPBTjOZ22XprLJo4u/view', 2023, 84),
(303, 'Feb/Mar 2023 Paper 22 QP.pdf', 'https://drive.google.com/file/d/1u3C_zD-a-orUE6To_k9ZoETsh-0YEvz-/view', 2023, 85),
(304, 'May/June 2023 Paper 21 QP.pdf', 'https://drive.google.com/file/d/1vNTSNISr75z8HtJKmCY27Q2-Xp1cBrF_/view', 2023, 85),
(305, 'May/June 2023 Paper 22 QP.pdf', 'https://drive.google.com/file/d/1OyadaSm4TPFcI7LsQ2GqMKn79wjX5hYz/view', 2023, 85),
(306, 'May/June 2023 Paper 23 QP.pdf', 'https://drive.google.com/file/d/1wbgSBqUZhRDLlvnGOIswARastaCWZxmz/view', 2023, 85),
(307, 'Oct/Nov 2023 Paper 21 QP.pdf', 'https://drive.google.com/file/d/1A97VximrbKMGpSjeqyHu2lXp1xSAsFdN/view', 2023, 85),
(308, 'Oct/Nov 2023 Paper 22 QP.pdf', 'https://drive.google.com/file/d/1vWljEtDsY9moub_V7O2b9RHQKhiJZK63/view', 2023, 85),
(309, 'Oct/Nov 2023 Paper 23 QP.pdf', 'https://drive.google.com/file/d/1dg0rrj9btuGawKm8QQNT_FvCqFHCWhPZ/view', 2023, 85),
(310, 'Feb/Mar 2023 Paper 42 MS.pdf', 'https://drive.google.com/file/d/16p5frOK7fZQl2VWUlhT3gDYBqDajmzMI/view', 2023, 87),
(311, 'May/June 2023 Paper 41 MS.pdf', 'https://drive.google.com/file/d/13Kd1qvM3qO7cIjB0kRPwjbQMUN3VOgXU/view', 2023, 87),
(312, 'May/June 2023 Paper 42 MS.pdf', 'https://drive.google.com/file/d/18f7lA15c8_q5AvkcbgShTeg0i_RD6xCF/view', 2023, 87),
(313, 'May/June 2023 Paper 43 MS.pdf', 'https://drive.google.com/file/d/1QU8NKQ9Wr5hftVkbOWlVxT68rIZcPf9n/view', 2023, 87);
--
-- Dumping data for table `PastPaper`  (rows 314-337, Physics 2023 Paper 4/6)
--
INSERT INTO `PastPaper` (`id`, `title`, `paperFile`, `year`, `pastPaperTopicId`) VALUES
(314, 'Oct/Nov 2023 Paper 41 MS.pdf', 'https://drive.google.com/file/d/1k710Dx1NaLyZxIxsq9WI4gye8oI2KJjA/view', 2023, 87),
(315, 'Oct/Nov 2023 Paper 42 MS.pdf', 'https://drive.google.com/file/d/1yaKYXRRvXinIi9SbCRx8-9srYIlVAnsM/view', 2023, 87),
(316, 'Oct/Nov 2023 Paper 43 MS.pdf', 'https://drive.google.com/file/d/1-9PetXP0GYbyKMZNh57pGcKLRkHvYlkn/view', 2023, 87),
(317, 'Feb/Mar 2023 Paper 42 QP.pdf', 'https://drive.google.com/file/d/1CHuyh0vIa--uP0Ie5-kjrvYqAfBDYwf5/view', 2023, 88),
(318, 'May/June 2023 Paper 41 QP.pdf', 'https://drive.google.com/file/d/19WXtKMrUCK6RLL0bERKGi5nGft8wEGlP/view', 2023, 88),
(319, 'May/June 2023 Paper 42 QP.pdf', 'https://drive.google.com/file/d/1skWK7h5v_trjDR-9-FCR2q6kA_ZqAw5t/view', 2023, 88),
(320, 'May/June 2023 Paper 43 QP.pdf', 'https://drive.google.com/file/d/1qYtyf4ubAW-9KfWUDNw3V8xui9Gn9jB6/view', 2023, 88),
(321, 'Oct/Nov 2023 Paper 41 QP.pdf', 'https://drive.google.com/file/d/1G_uK7YDCZO3WXDHO4FdiZojewq04avMe/view', 2023, 88),
(322, 'Oct/Nov 2023 Paper 42 QP.pdf', 'https://drive.google.com/file/d/1-LiAT2VWq7IUtrUNRGOyneVl42aa7YDQ/view', 2023, 88),
(323, 'Oct/Nov 2023 Paper 43 QP.pdf', 'https://drive.google.com/file/d/1IVbngLV85ZLNUizi8Ruzoud6GhbtaOYf/view', 2023, 88),
(324, 'Feb/Mar 2023 Paper 62 MS.pdf', 'https://drive.google.com/file/d/1QXRw9ccCrw3elsBaaqMPdzXEYK8E644E/view', 2023, 89),
(325, 'May/June 2023 Paper 61 MS.pdf', 'https://drive.google.com/file/d/13LQ7KmM9skaDRyyuEnymRgCU9kPIPnMx/view', 2023, 89),
(326, 'May/June 2023 Paper 62 MS.pdf', 'https://drive.google.com/file/d/1Zp_cbfRz3ujSYm5nUPvqzVvHTdmVWQyM/view', 2023, 89),
(327, 'May/June 2023 Paper 63 MS.pdf', 'https://drive.google.com/file/d/1sGGqJXG5yTohRFrqjRXK9OZ4vEGAbclQ/view', 2023, 89),
(328, 'Oct/Nov 2023 Paper 61 MS.pdf', 'https://drive.google.com/file/d/1LfwL12j0aSIPsSF5HFbRAk59TEIK1Mdx/view', 2023, 89),
(329, 'Oct/Nov 2023 Paper 62 MS.pdf', 'https://drive.google.com/file/d/1LY7Wcy8IzSsfBegblQ_elbVhll4f0-4w/view', 2023, 89),
(330, 'Oct/Nov 2023 Paper 63 MS.pdf', 'https://drive.google.com/file/d/10ewpG8uqDJ71IzRr7JQRqDt7B-v8mbOQ/view', 2023, 89),
(331, 'Feb/Mar 2023 Paper 62 QP.pdf', 'https://drive.google.com/file/d/1S8dMmQplw7BPgwH9d6Ry3_rWz_Q2KBN6/view', 2023, 90),
(332, 'May/June 2023 Paper 61 QP.pdf', 'https://drive.google.com/file/d/1Tm-1Xrr1EQfOpxurNIo_oe-oAX0WqrKL/view', 2023, 90),
(333, 'May/June 2023 Paper 62 QP.pdf', 'https://drive.google.com/file/d/18rl3HX16Yj9NXDqDOoK5AIfqYBUFSwYr/view', 2023, 90),
(334, 'May/June 2023 Paper 63 QP.pdf', 'https://drive.google.com/file/d/1gmGO1rUkNAhNSSWLx326flmWLL8tG6Dt/view', 2023, 90),
(335, 'Oct/Nov 2023 Paper 61 QP.pdf', 'https://drive.google.com/file/d/1dhzF-z63TYkeBwYmtXbtwcSLhE46vW3E/view', 2023, 90),
(336, 'Oct/Nov 2023 Paper 62 QP.pdf', 'https://drive.google.com/file/d/15QeqhuCs8SWyOLma5DjJyoTlbB0alypX/view', 2023, 90),
(337, 'Oct/Nov 2023 Paper 63 QP.pdf', 'https://drive.google.com/file/d/1lf1ez5OydKWZkvMO9LAu8OVkRalHQQyE/view', 2023, 90);
--
-- Dumping data for table `PastPaper`  (rows 338-355, Physics 2024 Paper 2/4)
--
INSERT INTO `PastPaper` (`id`, `title`, `paperFile`, `year`, `pastPaperTopicId`) VALUES
(338, 'Feb/Mar 2024 Paper 22 MS.pdf', 'https://drive.google.com/file/d/1uvkrb5BaV9bkVDCTcnBVgjp11MdQQls9/view', 2024, 91),
(339, 'May/June 2024 Paper 21 MS.pdf', 'https://drive.google.com/file/d/1NT1wOGSMZEE-76Z3BGKmPJvfYcK04203/view', 2024, 91),
(340, 'May/June 2024 Paper 22 MS.pdf', 'https://drive.google.com/file/d/1VOaAOXj4BOc1sCiE7c50ZjjD01GyqySK/view', 2024, 91),
(341, 'May/June 2024 Paper 23 MS.pdf', 'https://drive.google.com/file/d/1HdUSCGvJBmKAm43BA_jivfDtkBooxuxn/view', 2024, 91),
(342, 'Oct/Nov 2024 Paper 21 MS.pdf', 'https://drive.google.com/file/d/1kB7YU9pTp4Rqk_52YghE8pPUlEBm1f0x/view', 2024, 91),
(343, 'Oct/Nov 2024 Paper 22 MS.pdf', 'https://drive.google.com/file/d/1nBO7gAni-FV9mTjhOrVqBwR--R3_Lt5m/view', 2024, 91),
(344, 'Oct/Nov 2024 Paper 23 MS.pdf', 'https://drive.google.com/file/d/1AaFjyJDQVnrlNaZwCmoYoVunEQbvg4u4/view', 2024, 91),
(345, 'Feb/Mar 2024 Paper 22 QP.pdf', 'https://drive.google.com/file/d/1bp3qPkiXAzCl2vegNJ6TEbQP_fGnRS0y/view', 2024, 92),
(346, 'May/June 2024 Paper 21 QP.pdf', 'https://drive.google.com/file/d/1l-xlqj9Buw9hKB9NiN8sxDV_5UFxoZmB/view', 2024, 92),
(347, 'May/June 2024 Paper 22 QP.pdf', 'https://drive.google.com/file/d/1EgXehX-di2uC6axVqqPD1_irIfQ0hO__/view', 2024, 92),
(348, 'May/June 2024 Paper 23 QP.pdf', 'https://drive.google.com/file/d/1XjEkwdiDVZJQwh-gorJm4lwAwGvDzr3l/view', 2024, 92),
(349, 'Oct/Nov 2024 Paper 21 QP.pdf', 'https://drive.google.com/file/d/1q4DP477gX3nZL4xOOloO0BsSPGZm7Y1C/view', 2024, 92),
(350, 'Oct/Nov 2024 Paper 22 QP.pdf', 'https://drive.google.com/file/d/1GAT1aWL0YjtXwhabKmhUWTbYyypMUCHy/view', 2024, 92),
(351, 'Oct/Nov 2024 Paper 23 QP.pdf', 'https://drive.google.com/file/d/1mhc_FbDpOfXPASXJPZ7s0W7MSU0UkK5x/view', 2024, 92),
(352, 'Feb/Mar 2024 Paper 42 MS.pdf', 'https://drive.google.com/file/d/101DYr8ZiKdcKWWlhSbMC27r13V0DMUI3/view', 2024, 93),
(353, 'May/June 2024 Paper 41 MS.pdf', 'https://drive.google.com/file/d/1g65v0KKXx--uO1iBBbkX8LfowD9CasSp/view', 2024, 93),
(354, 'May/June 2024 Paper 42 MS.pdf', 'https://drive.google.com/file/d/1mVaIP28qqLhohb72vTZhMhaoZTPfGr72/view', 2024, 93),
(355, 'May/June 2024 Paper 43 MS.pdf', 'https://drive.google.com/file/d/1GqvfGdTwtRT3tka8rS2ptV-at6wo9CN7/view', 2024, 93);
--
-- Dumping data for table `PastPaper`  (rows 356-400)
-- ================================================================
-- THESE ROWS ARE NOT INCLUDED IN THIS FILE.
-- Rows with id 356-400 (2024 Paper 4/6 QP + Physics 2025 papers)
-- could not be re-created reliably, so instead of risking wrong Google
-- Drive file ids they have been left for you to paste straight from
-- your original phpMyAdmin export.
--
-- HOW TO ADD THEM:
--   1. Open your original dump/export file.
--   2. Find this line in it:
--        INSERT INTO `PastPaper` (`id`, `title`, `paperFile`, `year`, `pastPaperTopicId`) VALUES
--   3. Copy ONLY the block of rows with id 356 up to and including 400.
--   4. Paste them here below this comment, replacing the marker line:
--
-- PASTE_DATA_HERE
--
-- Topic ids used by those rows:
--   93 = 2024 Paper 4 Ms, 94 = 2024 Paper 4 Qp,
--   95 = 2024 Paper 6 Ms, 96 = 2024 Paper 6 Qp,
--   97 = 2025 Paper 2 Ms, 98 = 2025 Paper 2 Qp,
--   99 = 2025 Paper 4 Ms, 100 = 2025 Paper 4 Qp,
--   103 = 2025 Paper 6 Ms, 104 = 2025 Paper 6 Qp
-- ================================================================
--
-- Dumping data for table `Worksheet`  (rows 1-24)
--
INSERT INTO `Worksheet` (`id`, `title`, `link`, `worksheetTopicId`, `createdAt`, `updatedAt`) VALUES
(1, '1.1 Physical quantities and measurement techniques MS.pdf', 'https://drive.google.com/file/d/1k1rxDrrt7OQqAGH7xGDmIgDSh4nlQGFf/view', 1, '2026-08-15 21:19:02', '2026-08-15 21:19:02'),
(2, '1.2 Motion MS.pdf', 'https://drive.google.com/file/d/1azYknl80qTSXD297eKHETbGS83HlPuV2/view', 1, '2026-08-15 21:19:02', '2026-08-15 21:19:02'),
(3, '1.3 Mass and weight MS.pdf', 'https://drive.google.com/file/d/10A_C_wH8n0eD2VH7vhSQG2FmO1IMfxTj/view', 1, '2026-08-15 21:19:02', '2026-08-15 21:19:02'),
(4, '1.4 Density MS.pdf', 'https://drive.google.com/file/d/1frj_8obU0ygRZe5pakdyarabfujqZhcp/view', 1, '2026-08-15 21:19:02', '2026-08-15 21:19:02'),
(5, '1.5 Forces MS.pdf', 'https://drive.google.com/file/d/1J-yRCPMaF1Hy55UeQ2pY0MncFkaTkHya/view', 1, '2026-08-15 21:19:02', '2026-08-15 21:19:02'),
(6, '1.6 Momentum MS.pdf', 'https://drive.google.com/file/d/1EcVYFnuwzevSIrhgwKFPKNfAZpsBI0pD/view', 1, '2026-08-15 21:19:02', '2026-08-15 21:19:02'),
(7, '1.7 Energy work and power MS.pdf', 'https://drive.google.com/file/d/1ESoqDf5PfLoLDcDlSro3Fcx08K5KF4ge/view', 1, '2026-08-15 21:19:02', '2026-08-15 21:19:02'),
(8, '1.8 Pressure MS.pdf', 'https://drive.google.com/file/d/1JIBZu_aSJePGXZJ_yNKyZo0-ftOCWWUf/view', 1, '2026-08-15 21:19:02', '2026-08-15 21:19:02'),
(9, '1.1 Physical quantities and measurement techniques QP.pdf', 'https://drive.google.com/file/d/1p_kULaD2imMI1WFBQ4VMkioqeJrAx4iC/view', 7, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(10, '1.2 Motion QP.pdf', 'https://drive.google.com/file/d/1N5GUsOSV_vSI0s-C96yrejQP1KzczF1J/view', 7, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(11, '1.3 Mass and weight QP.pdf', 'https://drive.google.com/file/d/180lhWCpDQQ9_s1_Vidzfl2njiVnlR0Pf/view', 7, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(12, '1.4 Density QP.pdf', 'https://drive.google.com/file/d/1R-a5vWJgvA5uzB4QHFVH-DVAZh5Bx3X0/view', 7, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(13, '1.5 Forces QP.pdf', 'https://drive.google.com/file/d/18ooWjOrzqJR2GEO3PonCfooj6CsUt07P/view', 7, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(14, '1.6 Momentum QP.pdf', 'https://drive.google.com/file/d/1tXl8c-G12Lmg7OHZg-QMaF2a_iKyf_7u/view', 7, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(15, '1.7 Energy, work and power QP.pdf', 'https://drive.google.com/file/d/1elRNFrtKQHZon5N9NemYcckJH3JaDyus/view', 7, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(16, '1.8 Pressure QP.pdf', 'https://drive.google.com/file/d/1olxTcev1mazzRJD4wAHZ4awTckneRhs3/view', 7, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(17, '2.1 Kinetic particle model of matter MS.pdf', 'https://drive.google.com/file/d/131-dDWfVANsW8BDmPTFF3H70Ui9SR1ba/view', 2, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(18, '2.2 Thermal properties and temperature MS.pdf', 'https://drive.google.com/file/d/1CiKACkutWlShk3ygVXx7vpqHY7hDCE2E/view', 2, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(19, '2.3 Transfer of thermal energy MS.pdf', 'https://drive.google.com/file/d/1KGPeYpRpxuUG-Pv9Keh8vPJwCrtBfgwE/view', 2, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(20, '2.1 Kinetic particle model of matter QP.pdf', 'https://drive.google.com/file/d/19-Dmil3wNa1rWZ_SKEnw2x-t8fHAUg_V/view', 8, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(21, '2.2 Thermal properties and temperature QP.pdf', 'https://drive.google.com/file/d/1qrA2haCate3ApFj2a5MEeZxZc8X7cjIp/view', 8, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(22, '2.3 Transfer of thermal energy QP.pdf', 'https://drive.google.com/file/d/1kbZtZVBEdBF0VnGBVKF8wBvOjfrNlKP-/view', 8, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(23, '3.1 General properties of waves MS.pdf', 'https://drive.google.com/file/d/1-xvuizgt07F-LHA3Tu7pdOtXws8MO9bi/view', 3, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(24, '3.2 Light MS.pdf', 'https://drive.google.com/file/d/1NKoW47RGPw9OwA4VjZDILP_t50lNhalv/view', 3, '2026-08-15 21:30:36', '2026-08-15 21:30:36');
--
-- Dumping data for table `Worksheet`  (rows 25-48)
--
INSERT INTO `Worksheet` (`id`, `title`, `link`, `worksheetTopicId`, `createdAt`, `updatedAt`) VALUES
(25, '3.3 Electromagnetic spectrum MS.pdf', 'https://drive.google.com/file/d/1szFEvCwxY3B-vSKtt79d6Nsu89l-09BS/view', 3, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(26, '3.4 Sound MS.pdf', 'https://drive.google.com/file/d/1SqgkIZi16IuPqJQDNt7X5otog0yK_uUL/view', 3, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(27, '3.1 General properties of waves QP.pdf', 'https://drive.google.com/file/d/1Bud1-cIaOlGAcU_sv-bldyYHJ7bsY03Z/view', 9, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(28, '3.2 Light QP.pdf', 'https://drive.google.com/file/d/1wVkKC-taBbkAg6JETPOKPsSv0faCJvRo/view', 9, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(29, '3.3 Electromagnetic spectrum QP.pdf', 'https://drive.google.com/file/d/14jvQKmEogO9dXrTYN32fjaGhbm4NWuyj/view', 9, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(30, '3.4 Sound QP.pdf', 'https://drive.google.com/file/d/1CFWQktmQPg1aHu_QFTDyewTDO8cH_lGu/view', 9, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(31, '4.1 Simple phenomena of magnetism MS.pdf', 'https://drive.google.com/file/d/1NIxlSUtP80v1dTPzg4jR2t_Kl-cpoRrd/view', 4, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(32, '4.2 Electrical quantities MS.pdf', 'https://drive.google.com/file/d/1imQdh8_1qgsza16fp_TWhvL_bqHlrAmf/view', 4, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(33, '4.3 Electric circuits MS.pdf', 'https://drive.google.com/file/d/1pmId1TQMbUX5raDUxhBMQGENvjUzb7wp/view', 4, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(34, '4.4 Electrical safety MS.pdf', 'https://drive.google.com/file/d/1-5tS7Uh8SUulJNJeZw2cbUUlDZ0smCpa/view', 4, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(35, '4.5 Electromagnetic effects MS.pdf', 'https://drive.google.com/file/d/1UvC7qTc5uBz6M79v8mTIWN4AcAvHulfj/view', 4, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(36, '4.1 Simple phenomena of magnetism QP.pdf', 'https://drive.google.com/file/d/1hsYrYHE4lQINtJbH9J5YcSmzxWgCskQw/view', 10, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(37, '4.2 Electrical quantities QP.pdf', 'https://drive.google.com/file/d/14W0c0LXZDyfdYRUg2nBd2iNCm4XmjIDT/view', 10, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(38, '4.3 Electric circuits QP.pdf', 'https://drive.google.com/file/d/1tEy0udVUsXoXBhBYSurrBYMmdjV6wWgk/view', 10, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(39, '4.4 Electrical safety QP.pdf', 'https://drive.google.com/file/d/1oS3zUcYNonntZDFCz9a2Y5TIvXHIPtcN/view', 10, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(40, '4.5 Electromagnetic effects QP.pdf', 'https://drive.google.com/file/d/1xroi_Y9at9p9a7l3ZSz8Wpj5rbdXGyP-/view', 10, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(41, '5.1 The nuclear model of the atom MS.pdf', 'https://drive.google.com/file/d/1yhMuHP3NWa_eyXDY2gkY8jnV9gtYf_LY/view', 5, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(42, '5.2 Radioactivity MS.pdf', 'https://drive.google.com/file/d/1esJ9nl2SHO408RxOlJ8qGO_ZFU8-vo5-/view', 5, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(43, '5.1 The nuclear model of the atom QP.pdf', 'https://drive.google.com/file/d/1Qs7uiP9KENhfy7OPNCM2dKJr-aMfxDGi/view', 11, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(44, '5.2 Radioactivity QP.pdf', 'https://drive.google.com/file/d/1jZZY5u_QeEAtfo-HiDadQEmZgt-QRnPv/view', 11, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(45, '6.1 Earth and the solar system MS.pdf', 'https://drive.google.com/file/d/1lk8nZ_hDX2cIubsN78Z_o2xpxJzyP-lD/view', 6, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(46, '6.2 Stars and the universe MS.pdf', 'https://drive.google.com/file/d/1cGE5S7WSWik2mA0jyJXcb7UHb7JZ_a3a/view', 6, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(47, '6.1 Earth and the Solar System QP.pdf', 'https://drive.google.com/file/d/1BgjbwU9XSxm_L3R7TOU4ws8pnrXDeTWL/view', 12, '2026-08-15 21:30:36', '2026-08-15 21:30:36'),
(48, '6.2 Stars and the Universe QP.pdf', 'https://drive.google.com/file/d/1KE2mB0yqTXZ42EUKevywwgdusIhevdEt/view', 12, '2026-08-15 21:30:36', '2026-08-15 21:30:36');
--
-- Dumping data for table `Worksheet`  (rows 49-87)
-- ================================================================
-- THESE ROWS ARE NOT INCLUDED IN THIS FILE.
-- They are the "Rocket Revise" question papers (id 49-87) whose
-- Google Drive file ids could not be reproduced faithfully.
--
-- HOW TO ADD THEM:
--   1. Open your original dump/export file.
--   2. Find this line in it:
--        INSERT INTO `Worksheet` (`id`, `title`, `link`, `worksheetTopicId`, `createdAt`, `updatedAt`) VALUES
--   3. Copy the block of rows with id 49 up to and including 87.
--   4. Paste them here below this comment, replacing the marker line:
--
-- PASTE_DATA_HERE
--
-- Topics: 13 = Rocket Revice unit one, 14 = unit two, 15 = unit three,
--         16 = unit four, 17 = unit five.
-- Timestamps used: '2026-08-15 21:38:48'
-- ================================================================
--
-- Dumping data for table `YoutubeLink`
--
INSERT INTO `YoutubeLink` (`id`, `title`, `url`, `subjectId`) VALUES
(2, 'Sample 123', 'https://www.youtube.com/watch?v=Q7Ryv1M7CvI', 25);

--
-- Dumping data for table `YoutubeLinkTopic`
--
INSERT INTO `YoutubeLinkTopic` (`id`, `title`, `youtubeLinkId`) VALUES
(2, 'Sample', 2);

-- ============================================================
-- INDEXES, PRIMARY KEYS AND UNIQUE KEYS
-- ============================================================

ALTER TABLE `Announcement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authorId` (`authorId`);

ALTER TABLE `Article`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `Article_ibfk_2` (`subjectId`),
  ADD KEY `createdBy` (`createdBy`);

ALTER TABLE `Book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_book_title` (`title`),
  ADD KEY `idx_book_categoryId` (`bookCategoryId`),
  ADD KEY `idx_book_subjectId` (`subjectId`);

ALTER TABLE `BookCategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_bookCategory_subjectId` (`subjectId`),
  ADD KEY `idx_bookCategory_title` (`title`);

ALTER TABLE `BookTopic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_book_topic` (`bookId`);

ALTER TABLE `Definition`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_definition_subjectId` (`subjectId`);

ALTER TABLE `Exam`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentId` (`studentId`),
  ADD KEY `Exam_ibfk_1` (`subjectId`),
  ADD KEY `Exam_ibfk_2` (`createdBy`);

ALTER TABLE `ExamOption`
  ADD PRIMARY KEY (`id`),
  ADD KEY `examQuestionId` (`examQuestionId`);

ALTER TABLE `ExamPreparation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_nameOfBook` (`nameOfBook`),
  ADD KEY `idx_examPreparation_categoryId` (`examPreparationCategoryId`);

ALTER TABLE `ExamPreparationCategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_examPreparationCategory_subjectId` (`subjectId`),
  ADD KEY `idx_examPreparationCategory_title` (`title`);

ALTER TABLE `ExamPreparationTopic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_examPrepId` (`examPrepId`);

ALTER TABLE `ExamQuestion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ExamQuestion_ibfk_1` (`examId`);

ALTER TABLE `Flashcard`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Flashcard_ibfk_1` (`topicId`),
  ADD KEY `Flashcard_ibfk_2` (`createdBy`);

ALTER TABLE `FlashcardTopic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FlashcardTopic_ibfk_1` (`subjectId`);

ALTER TABLE `FormulaSheet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_formulaSheet_subjectId` (`subjectId`);

ALTER TABLE `Note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Note_ibfk_3` (`noteCategoryId`),
  ADD KEY `Note_ibfk_1` (`subjectId`),
  ADD KEY `Note_ibfk_2` (`createdBy`);

ALTER TABLE `NoteCategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_noteCategory_subjectId` (`subjectId`),
  ADD KEY `idx_noteCategory_title` (`title`);

ALTER TABLE `OptionTable`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OptionTable_ibfk_1` (`questionId`);

ALTER TABLE `PastPaper`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_pastpaper_title` (`title`),
  ADD KEY `idx_pastpaper_topic` (`pastPaperTopicId`);

ALTER TABLE `PastPaperTopic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_pastpaper_topic_subjectId` (`subjectId`),
  ADD KEY `idx_pastpaper_topic_title` (`title`);

ALTER TABLE `Question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Question_ibfk_1` (`quizId`);

ALTER TABLE `Quiz`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Quiz_ibfk_1` (`subjectId`);

ALTER TABLE `RevisionNote`
  ADD PRIMARY KEY (`id`),
  ADD KEY `RevisionNote_ibfk_1` (`subjectId`),
  ADD KEY `RevisionNote_ibfk_2` (`createdBy`);

ALTER TABLE `Student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `StudentExamAnswer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `StudentExamAnswer_ibfk_1` (`studentId`),
  ADD KEY `StudentExamAnswer_ibfk_2` (`examId`);

ALTER TABLE `Subject`
  ADD PRIMARY KEY (`id`),
  ADD KEY `createdBy` (`createdBy`);

ALTER TABLE `Syllablus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_syllablus_subjectId` (`subjectId`);

ALTER TABLE `Task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Task_ibfk_1` (`students_id`);

ALTER TABLE `Topic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Topic_ibfk_1` (`subjectId`);

ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `Worksheet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_worksheet_topicId` (`worksheetTopicId`);

ALTER TABLE `WorksheetTopic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_worksheetTopic_subjectId` (`subjectId`),
  ADD KEY `idx_worksheetTopic_title` (`title`);

ALTER TABLE `YoutubeLink`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_yt_title` (`title`),
  ADD KEY `idx_yt_subjectId` (`subjectId`);

ALTER TABLE `YoutubeLinkTopic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_yt_topic` (`youtubeLinkId`);
--
-- Constraints for dumped tables
--
ALTER TABLE `Announcement`
  ADD CONSTRAINT `Announcement_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`);

ALTER TABLE `Article`
  ADD CONSTRAINT `Article_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `User` (`id`),
  ADD CONSTRAINT `Article_ibfk_2` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`);

ALTER TABLE `Book`
  ADD CONSTRAINT `Book_category_fkey` FOREIGN KEY (`bookCategoryId`) REFERENCES `BookCategory` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `Book_subject_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`) ON DELETE CASCADE;

ALTER TABLE `BookCategory`
  ADD CONSTRAINT `BookCategory_subject_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`) ON DELETE CASCADE;

ALTER TABLE `BookTopic`
  ADD CONSTRAINT `BookTopic_book_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book` (`id`) ON DELETE CASCADE;

ALTER TABLE `Definition`
  ADD CONSTRAINT `Definition_subject_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`) ON DELETE SET NULL;

ALTER TABLE `Exam`
  ADD CONSTRAINT `Exam_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`),
  ADD CONSTRAINT `Exam_ibfk_2` FOREIGN KEY (`createdBy`) REFERENCES `User` (`id`),
  ADD CONSTRAINT `Exam_ibfk_3` FOREIGN KEY (`studentId`) REFERENCES `Student` (`id`);

ALTER TABLE `ExamOption`
  ADD CONSTRAINT `ExamOption_ibfk_1` FOREIGN KEY (`examQuestionId`) REFERENCES `ExamQuestion` (`id`);

ALTER TABLE `ExamPreparation`
  ADD CONSTRAINT `ExamPreparation_category_fkey` FOREIGN KEY (`examPreparationCategoryId`) REFERENCES `ExamPreparationCategory` (`id`) ON DELETE CASCADE;

ALTER TABLE `ExamPreparationCategory`
  ADD CONSTRAINT `ExamPreparationCategory_subject_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`) ON DELETE CASCADE;

ALTER TABLE `ExamPreparationTopic`
  ADD CONSTRAINT `ExamPreparationTopic_ibfk_1` FOREIGN KEY (`examPrepId`) REFERENCES `ExamPreparation` (`id`) ON DELETE CASCADE;

ALTER TABLE `ExamQuestion`
  ADD CONSTRAINT `ExamQuestion_ibfk_1` FOREIGN KEY (`examId`) REFERENCES `Exam` (`id`);

ALTER TABLE `Flashcard`
  ADD CONSTRAINT `Flashcard_ibfk_1` FOREIGN KEY (`topicId`) REFERENCES `FlashcardTopic` (`id`),
  ADD CONSTRAINT `Flashcard_ibfk_2` FOREIGN KEY (`createdBy`) REFERENCES `User` (`id`);

ALTER TABLE `FlashcardTopic`
  ADD CONSTRAINT `FlashcardTopic_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`);

ALTER TABLE `FormulaSheet`
  ADD CONSTRAINT `FormulaSheet_subject_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`) ON DELETE SET NULL;

ALTER TABLE `Note`
  ADD CONSTRAINT `Note_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `Note_ibfk_2` FOREIGN KEY (`createdBy`) REFERENCES `User` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `Note_ibfk_3` FOREIGN KEY (`noteCategoryId`) REFERENCES `NoteCategory` (`id`) ON DELETE SET NULL;

ALTER TABLE `NoteCategory`
  ADD CONSTRAINT `NoteCategory_subject_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`) ON DELETE CASCADE;

ALTER TABLE `OptionTable`
  ADD CONSTRAINT `OptionTable_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `Question` (`id`);

ALTER TABLE `PastPaper`
  ADD CONSTRAINT `PastPaper_topic_fkey` FOREIGN KEY (`pastPaperTopicId`) REFERENCES `PastPaperTopic` (`id`) ON DELETE CASCADE;

ALTER TABLE `PastPaperTopic`
  ADD CONSTRAINT `PastPaperTopic_subject_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`) ON DELETE CASCADE;

ALTER TABLE `Question`
  ADD CONSTRAINT `Question_ibfk_1` FOREIGN KEY (`quizId`) REFERENCES `Quiz` (`id`);

ALTER TABLE `Quiz`
  ADD CONSTRAINT `Quiz_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`);

ALTER TABLE `RevisionNote`
  ADD CONSTRAINT `RevisionNote_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`),
  ADD CONSTRAINT `RevisionNote_ibfk_2` FOREIGN KEY (`createdBy`) REFERENCES `User` (`id`);

ALTER TABLE `StudentExamAnswer`
  ADD CONSTRAINT `StudentExamAnswer_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `Student` (`id`),
  ADD CONSTRAINT `StudentExamAnswer_ibfk_2` FOREIGN KEY (`examId`) REFERENCES `Exam` (`id`);

ALTER TABLE `Subject`
  ADD CONSTRAINT `Subject_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `User` (`id`);

ALTER TABLE `Syllablus`
  ADD CONSTRAINT `Syllablus_subject_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`) ON DELETE CASCADE;

ALTER TABLE `Task`
  ADD CONSTRAINT `Task_ibfk_1` FOREIGN KEY (`students_id`) REFERENCES `Student` (`id`);

ALTER TABLE `Topic`
  ADD CONSTRAINT `Topic_ibfk_1` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`);

ALTER TABLE `Worksheet`
  ADD CONSTRAINT `Worksheet_topic_fkey` FOREIGN KEY (`worksheetTopicId`) REFERENCES `WorksheetTopic` (`id`) ON DELETE CASCADE;

ALTER TABLE `WorksheetTopic`
  ADD CONSTRAINT `WorksheetTopic_subject_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`) ON DELETE CASCADE;

ALTER TABLE `YoutubeLink`
  ADD CONSTRAINT `YoutubeLink_subject_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject` (`id`) ON DELETE CASCADE;

ALTER TABLE `YoutubeLinkTopic`
  ADD CONSTRAINT `YoutubeLinkTopic_yt_fkey` FOREIGN KEY (`youtubeLinkId`) REFERENCES `YoutubeLink` (`id`) ON DELETE CASCADE;
--
-- AUTO_INCREMENT for dumped tables
--
ALTER TABLE `Announcement` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
ALTER TABLE `Article` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `Book` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
ALTER TABLE `BookCategory` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `BookTopic` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `Definition` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
ALTER TABLE `Exam` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
ALTER TABLE `ExamOption` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
ALTER TABLE `ExamPreparation` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
ALTER TABLE `ExamPreparationCategory` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
ALTER TABLE `ExamPreparationTopic` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
ALTER TABLE `ExamQuestion` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
ALTER TABLE `Flashcard` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
ALTER TABLE `FlashcardTopic` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
ALTER TABLE `FormulaSheet` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `Note` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;
ALTER TABLE `NoteCategory` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
ALTER TABLE `OptionTable` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
ALTER TABLE `PastPaper` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=401;
ALTER TABLE `PastPaperTopic` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;
ALTER TABLE `Question` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
ALTER TABLE `Quiz` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
ALTER TABLE `RevisionNote` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `Student` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
ALTER TABLE `StudentExamAnswer` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
ALTER TABLE `Subject` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
ALTER TABLE `Syllablus` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `Task` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `Topic` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
ALTER TABLE `User` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
ALTER TABLE `Worksheet` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;
ALTER TABLE `WorksheetTopic` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
ALTER TABLE `YoutubeLink` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `YoutubeLinkTopic` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

-- End of import
