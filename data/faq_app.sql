-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2024 at 12:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `faq_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `faqId` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`faqId`, `question`, `answer`, `created_at`) VALUES
(1, 'What is Next.js?', 'Next.js is a React framework for building server-side rendered applications.', '2024-11-05 11:24:46'),
(2, 'How do I use API routes?', 'API routes provide a solution to build your API with Next.js. You can create API routes in the `pages/api` directory.', '2024-11-05 11:24:46'),
(3, 'What is the purpose of the `getStaticProps` function?', 'The `getStaticProps` function allows you to fetch data at build time, generating static pages.', '2024-11-05 11:24:46'),
(4, 'What is server-side rendering (SSR)?', 'Server-side rendering is the process of rendering a web page on the server instead of in the browser.', '2024-11-05 11:24:46'),
(5, 'How can I deploy a Next.js application?', 'You can deploy a Next.js application on platforms like Vercel, Netlify, or any hosting that supports Node.js.', '2024-11-05 11:24:46'),
(6, 'lorem', 'ipsum', '2024-11-05 11:40:13'),
(7, 'where are we located', 'at Norskken', '2024-11-05 12:25:30');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `qId` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text DEFAULT NULL,
  `clientId` int(11) DEFAULT NULL,
  `status` enum('pending','answered') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `answered_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`qId`, `question`, `answer`, `clientId`, `status`, `created_at`, `answered_at`) VALUES
(1, 'what is the name of this system?', NULL, 1, 'pending', '2024-11-05 11:31:58', NULL),
(2, 'is authentication already made?', NULL, 1, 'pending', '2024-11-05 11:42:05', NULL),
(3, 'what is my name?', NULL, 1, 'pending', '2024-11-05 12:25:04', NULL),
(4, 'what is my name?', NULL, 1, 'pending', '2024-11-05 12:55:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `usertype` enum('client','admin') NOT NULL,
  `isAdmin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `username`, `email`, `password`, `usertype`, `isAdmin`) VALUES
(1, 'wilson', 'wilsonnshi1@gmail.com', '$2a$10$81vgvxsim/DVfGQArLKp6OFu39e7bC/NeKmKeIOn8mkuDdY4Trk4e', 'client', 0),
(2, 'nshiziboi', 'nshiziboi.og@gmail.com', '$2a$10$c.ubfZdd87mIure6ryoQxeZ4u0yw4JpZhTWAwqiyU3cPZOy5qmwC6', 'admin', 1),
(3, 'tona', 'tonaelsie31@gmail.com', '$2a$10$fKEtge8g6T9GWCPJq4ktHOZajF8vQCiPI/CDyNY4KxX2.wRpUcyFG', 'client', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`faqId`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`qId`),
  ADD KEY `clientId` (`clientId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `faqId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `qId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
