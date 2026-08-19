-- =====================================================
-- BACKUP of aceitcom_quiz @ 91.204.209.4:3306
-- Created 2026-08-19T13:37:31.613Z
-- =====================================================
SET FOREIGN_KEY_CHECKS = 0;

--------------------------------------------------------------
DROP TABLE IF EXISTS `Announcement`;
-- (table `Announcement` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `Article`;
-- (table `Article` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `Book`;
INSERT INTO `Book` (`id`, `title`, `bookFile`, `subjectId`, `categoryId`) VALUES
(3, 'Cambridge IGCSE Chemistry 4th Edition.pdf', 'https://drive.google.com/file/d/1qSEUxC4JMAH9JESwKAxapcifGfwaJ8e5/view', 3, 2),
(4, 'Cambridge IGCSE™ Physics .pdf', 'https://drive.google.com/file/d/1NtgowSDzkBL2haCTbtd0IRpu40-9HIK-/view', 11, 3),
(5, 'Cambridge IGCSE™ Physics Coursebook .pdf', 'https://drive.google.com/file/d/1tnP8zIkcHKFJFyedv9gGs686A6u6Z_WJ/view', 11, 3),
(6, 'Cambridge IGCSE™ Physics Practical Skills Workbook.pdf', 'https://drive.google.com/file/d/14lrbArz_o7ugDQ7PUfTyfS4PLA3857Vn/view', 11, 3),
(7, 'Cambridge IGCSE™ Physics Workbook .pdf', 'https://drive.google.com/file/d/1y8GuJkH_w2s380Qi-YeIuWYRtyH0adQt/view', 11, 3),
(8, 'Cambridge IGCSE™ Physics Workbook.pdf', 'https://drive.google.com/file/d/1YAVsK-N2f0bCJFvuLLluqA4xhQ4pr_Hv/view', 11, 3);

--------------------------------------------------------------
DROP TABLE IF EXISTS `BookCategory`;
INSERT INTO `BookCategory` (`id`, `title`, `subjectId`) VALUES
(1, 'General', 26),
(2, 'Cambridge Chemistry', 3),
(3, 'Cambridge Physics', 11);

--------------------------------------------------------------
DROP TABLE IF EXISTS `Definition`;
-- (table `Definition` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `DefinitionSheet`;
-- (table `DefinitionSheet` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `Exam`;
-- (table `Exam` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `ExamOption`;
-- (table `ExamOption` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `ExamPreparation`;
-- (table `ExamPreparation` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `ExamPreparationTopic`;
-- (table `ExamPreparationTopic` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `ExamQuestion`;
-- (table `ExamQuestion` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `Flashcard`;
-- (table `Flashcard` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `FlashcardTopic`;
-- (table `FlashcardTopic` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `FormulaSheet`;
-- (table `FormulaSheet` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `Note`;
-- (table `Note` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `OptionTable`;
-- (table `OptionTable` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `PastPaper`;
-- (table `PastPaper` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `PastPaperTopic`;
-- (table `PastPaperTopic` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `Question`;
-- (table `Question` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `Quiz`;
-- (table `Quiz` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `RevisionNote`;
-- (table `RevisionNote` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `Student`;
-- (table `Student` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `StudentExamAnswer`;
-- (table `StudentExamAnswer` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `Subject`;
INSERT INTO `Subject` (`id`, `name`, `description`, `svg`, `createdBy`, `createdAt`, `modifiedAt`, `approved`) VALUES
(2, 'Biology', 'Delve into the science of life, studying organisms, cells, genetics, evolution, ecosystems, and human anatomy. Understand how living things interact with each other and their environments.', '/categories/image--biology.svg', 2, '2025-11-26 13:55:30', '2025-11-26 14:51:25', 1),
(3, 'Chemistry', 'Uncover the mysteries of matter, its composition, properties, and reactions. Study atoms, molecules, chemical bonding, and laboratory experiments that explain everyday phenomena.', '/categories/image--chemistry.svg', 2, '2025-11-26 13:55:30', '2025-11-26 14:51:52', 1),
(7, 'Geography', 'Study the Earth’s physical features, climate patterns, natural resources, human populations, and cultural landscapes. Understand how humans interact with their environment and how the planet is interconnected.', '/categories/image--geography.svg', 2, '2025-11-26 13:55:33', '2025-11-26 14:53:37', 1),
(9, 'Mathematics', 'Develop analytical and logical thinking through numbers, algebra, geometry, calculus, probability, and statistics. Learn to solve complex problems and apply mathematical concepts in science, engineering, and daily life.', '/categories/image--mathematics.svg', 2, '2025-11-26 13:55:34', '2025-11-26 14:54:21', 1),
(11, 'Physics', 'Expand your physics knowledge with advanced topics such as electricity, magnetism, optics, thermodynamics, and quantum mechanics. Understand how physical laws govern natural and technological phenomena.', '/categories/image--physics.svg', 2, '2025-11-26 13:55:35', '2025-11-26 14:54:47', 1),
(24, 'ICT', 'ICT is the technology used to manage and communicate information through computers, the internet, mobile devices, and other digital systems. It helps people work faster, communicate easily, and access information quickly.', '/categories/image--computer-science.svg', 2, '2025-12-06 08:46:18', '2025-12-06 08:46:18', 0),
(25, 'Business', 'Business involves creating and delivering goods or services and managing resources like money, people, and materials. It helps organizations operate efficiently and meet customer needs.', '/categories/image--business.svg', 2, '2025-12-06 09:07:51', '2025-12-06 09:21:54', 0),
(26, 'Economics', 'Economics examines how resources are produced, distributed, and consumed. It helps us understand prices, markets, and how decisions affect individuals and society.', '/categories/image--economics.svg', 2, '2025-12-06 09:08:51', '2025-12-06 09:22:08', 0);

--------------------------------------------------------------
DROP TABLE IF EXISTS `Task`;
-- (table `Task` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `Topic`;
-- (table `Topic` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `User`;
INSERT INTO `User` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `modifiedAt`, `resetToken`) VALUES
(2, 'yab', 'addisuyafet321@gmail.com', '$2a$08$Ox6sxIE1NG85DOhcUi7bxuPmVMlzx.nYQb38Wyu0sxapLnsaULTYy', 'admin', '2025-11-26 15:59:00', '2026-07-16 09:49:34', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZGlzdXlhZmV0MzIxQGdtYWlsLmNvbSIsImlhdCI6MTc4NDE5NTM3NCwiZXhwIjoxNzg0MTk1Njc0fQ.1FKX5hi1Y0Vg551MFfuutZuEwhXgXIBQpkLUXBGsOgs'),
(3, 'yab123', 'yab123@gmail.com', '$2a$08$d6vItHADfoFWbB05b11Cpur19Et/PrkMdklMFrle4DdZxllNBbkoy', 'admin', '2025-11-26 10:05:20', '2025-11-26 10:05:20', NULL),
(6, 'Hiyabeal', 'hiyabealaa@gmail.com', '$2a$08$XY/kXY9mIfz9pCYqCZlsAOM/OhimS8t9B8rV2Gn0pKHViLst4vhVu', 'admin', '2025-11-29 07:59:55', '2025-11-29 08:35:37', NULL),
(7, 'yabu', 'yabu@gmail.com', '$2a$08$eOQGBt.aityqqXF/JezcN.4dzplrl4/iVr5n3BrSUGrFfs50h4coe', 'admin', '2026-07-16 10:06:05', '2026-07-16 10:06:05', NULL);

--------------------------------------------------------------
DROP TABLE IF EXISTS `Worksheet`;
-- (table `Worksheet` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `WorksheetOption`;
-- (table `WorksheetOption` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `WorksheetQuestion`;
-- (table `WorksheetQuestion` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `YoutubeLink`;
-- (table `YoutubeLink` is empty - no data to back up)
--------------------------------------------------------------
DROP TABLE IF EXISTS `YoutubeLinkTopic`;
-- (table `YoutubeLinkTopic` is empty - no data to back up)
SET FOREIGN_KEY_CHECKS = 1;