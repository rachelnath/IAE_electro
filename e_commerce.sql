-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 02, 2025 at 04:37 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_commerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `account_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `type` enum('saler','customer') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `username`, `email`, `password`, `token`, `type`, `createdAt`, `updatedAt`) VALUES
('421fb950-d6bc-4363-89bc-420b1c272d19', 'rachel', 'rachel@gmail.com', '$2b$05$Q3hvKkwr27gby', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI0MjFmYjk1MC1kNmJjLTQzNjMtODliYy00MjBiMWMyNzJkMTkiLCJ1c2VybmFtZSI6InJhY2hlbCIsImVtYWlsIjoicmFjaGVsQGdtYWlsLmNvbSIsImlhdCI6MTczNTc4Njk1MiwiZXhwIjoxNzM2MDAyOTUyfQ.3t0Fn3npU2LU5X8wJEkjsQPwrOsH4xp87uQAtFT', 'customer', '2025-01-02 02:10:16', '2025-01-02 03:02:32'),
('c9cd8957-385b-430b-ace7-10178164df3c', 'annisa', 'annisamonti17@gmail.com', '$2b$05$r1U0Ic1i/fdRT', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiJjOWNkODk1Ny0zODViLTQzMGItYWNlNy0xMDE3ODE2NGRmM2MiLCJ1c2VybmFtZSI6ImFubmlzYSIsImVtYWlsIjoiYW5uaXNhbW9udGkxN0BnbWFpbC5jb20iLCJpYXQiOjE3MzU3ODY3MTgsImV4cCI6MTczNjAwMjcxOH0.8wIQQgbvclNMoW0U8cqV2Hgl6RHC8h', 'saler', '2025-01-02 02:09:40', '2025-01-02 02:58:38');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `cart_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `product_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `account_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `category_name` varchar(30) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `createdAt`, `updatedAt`) VALUES
('1a71aba7-2fcf-4c57-9aa6-649c4d9c4576', 'Accessories', '2025-01-02 02:04:42', '2025-01-02 02:04:42'),
('5fff3735-ca80-45e3-8a1b-480fef8f8aed', 'Laptop', '2025-01-02 02:04:42', '2025-01-02 02:04:42'),
('89412750-eff9-4870-993c-dcc8c4f8d265', 'Handphone', '2025-01-02 02:04:42', '2025-01-02 02:04:42');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  `product_description` varchar(255) DEFAULT NULL,
  `product_price` int(20) DEFAULT NULL,
  `product_stock` int(9) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `category_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `account_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_description`, `product_price`, `product_stock`, `product_image`, `createdAt`, `updatedAt`, `category_id`, `account_id`) VALUES
('71cd73eb-77b2-4b60-9496-f1bb685c4e66', 'laptop', 'Windows 11 Pro', 16000000, 3, 'PR-xUoQ-_RwjfX2M.jpg', '2025-01-02 02:13:18', '2025-01-02 02:13:28', '5fff3735-ca80-45e3-8a1b-480fef8f8aed', 'c9cd8957-385b-430b-ace7-10178164df3c'),
('c88ab864-f145-41e6-8b78-392abd9bda82', 'casing hp', ' bahan silikon TPU yang berkualitas tinggi', 100000, 10, 'PR-mEov-t-Qlg0h3.jpg', '2025-01-02 02:16:46', '2025-01-02 02:16:46', '1a71aba7-2fcf-4c57-9aa6-649c4d9c4576', 'c9cd8957-385b-430b-ace7-10178164df3c');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `review_text` text DEFAULT NULL,
  `review_skor` double DEFAULT NULL,
  `review_response` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `product_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `account_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Process',
  `gross_amount` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zipCode` varchar(255) DEFAULT NULL,
  `telphone` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `account_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`transaction_id`, `order_id`, `status`, `gross_amount`, `address`, `city`, `country`, `zipCode`, `telphone`, `notes`, `createdAt`, `updatedAt`, `account_id`) VALUES
('2f2eaa06-461e-425a-968e-7a572b786456', 'EC-ZcTw-OaslTX2a', 'Process', 100000, 'padang', 'purwokerto', 'Indonesia', '53182', '089617654480', 'pelan', '2025-01-02 02:18:52', '2025-01-02 02:18:52', '421fb950-d6bc-4363-89bc-420b1c272d19'),
('5ad4c262-5f8e-4063-903f-d23d7470d72a', 'EC-7xUO-tLBReNHv', 'Process', 100000, 'padang', 'purwokerto', 'Indonesia', '53182', '089617654480', '-', '2025-01-02 02:18:33', '2025-01-02 02:18:33', '421fb950-d6bc-4363-89bc-420b1c272d19'),
('6bff17d3-7e2a-457a-9a6d-78aa0388d0c9', 'EC-DhBw-Eks0-B8I', 'Process', 100000, 'padang', 'purwokerto', 'Indonesia', '53182', '089617654480', 'pelan', '2025-01-02 02:18:51', '2025-01-02 02:18:51', '421fb950-d6bc-4363-89bc-420b1c272d19'),
('6d895e8f-2024-4fc2-85ca-84920db1593f', 'EC-jP4G-KVhTcb84', 'Process', 100000, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-02 02:18:17', '2025-01-02 02:18:17', '421fb950-d6bc-4363-89bc-420b1c272d19'),
('76d56e94-037f-4cde-ad90-58a946a92752', 'EC-bpbB-CiUc095I', 'Process', 100000, 'padang', 'purwokerto', 'Indonesia', '53182', '089617654480', NULL, '2025-01-02 03:00:42', '2025-01-02 03:00:42', '421fb950-d6bc-4363-89bc-420b1c272d19'),
('a135cbb4-688f-4d75-b6c4-65f39196a506', 'EC-C1om-sGcjacZc', 'Process', 100000, 'padang', 'purwokerto', 'Indonesia', '53182', '089617654480', '-', '2025-01-02 02:18:39', '2025-01-02 02:18:39', '421fb950-d6bc-4363-89bc-420b1c272d19'),
('aee7d6bd-b665-484d-b552-3dd6fd721d34', 'EC-7ssn-5vE8Wub6', 'Success', 100000, 'padang', 'purwokerto', 'Indonesia', '53182', '089617654480', NULL, '2025-01-02 03:02:41', '2025-01-02 03:04:38', '421fb950-d6bc-4363-89bc-420b1c272d19'),
('c444f44f-f0ba-40bf-aa91-eb2cd8863dd6', 'EC-uPwT-aE4WU_b9', 'Success', 100000, 'padang', 'purwokerto', 'Indonesia', '53182', '089617654480', 'pelan', '2025-01-02 02:22:27', '2025-01-02 02:24:56', '421fb950-d6bc-4363-89bc-420b1c272d19'),
('e5030901-296a-464d-9746-a6cf849f6a1a', 'EC-P4tb-Nt6y4cOm', 'Process', 100000, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-02 02:18:19', '2025-01-02 02:18:19', '421fb950-d6bc-4363-89bc-420b1c272d19'),
('f550f452-caab-4180-a32e-038666e174a2', 'EC-Q_QO-w-qAN6HX', 'Process', 100000, 'padang', 'purwokerto', 'Indonesia', '53182', '089617654480', '-', '2025-01-02 02:18:39', '2025-01-02 02:18:39', '421fb950-d6bc-4363-89bc-420b1c272d19');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_details`
--

CREATE TABLE `transaction_details` (
  `transaction_detail_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `transaction_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `product_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction_details`
--

INSERT INTO `transaction_details` (`transaction_detail_id`, `quantity`, `createdAt`, `updatedAt`, `transaction_id`, `product_id`) VALUES
('14240358-67b6-4fc2-b07d-1d6eb7744275', 1, '2025-01-02 02:18:52', '2025-01-02 02:18:52', '2f2eaa06-461e-425a-968e-7a572b786456', 'c88ab864-f145-41e6-8b78-392abd9bda82'),
('1a30edb1-1e48-408d-b90d-73d3e3239765', 1, '2025-01-02 03:00:42', '2025-01-02 03:00:42', '76d56e94-037f-4cde-ad90-58a946a92752', 'c88ab864-f145-41e6-8b78-392abd9bda82'),
('25d8981b-4848-4a51-87dd-7c459c28bf16', 1, '2025-01-02 02:18:51', '2025-01-02 02:18:51', '6bff17d3-7e2a-457a-9a6d-78aa0388d0c9', 'c88ab864-f145-41e6-8b78-392abd9bda82'),
('33082aba-d65a-408d-829a-ccfbf434603b', 1, '2025-01-02 02:18:33', '2025-01-02 02:18:33', '5ad4c262-5f8e-4063-903f-d23d7470d72a', 'c88ab864-f145-41e6-8b78-392abd9bda82'),
('3377bf3e-7658-4493-a6f2-056c3251fecc', 1, '2025-01-02 02:18:39', '2025-01-02 02:18:39', 'a135cbb4-688f-4d75-b6c4-65f39196a506', 'c88ab864-f145-41e6-8b78-392abd9bda82'),
('4590b43f-88af-4060-8651-7600b9e9710f', 1, '2025-01-02 02:22:27', '2025-01-02 02:22:27', 'c444f44f-f0ba-40bf-aa91-eb2cd8863dd6', 'c88ab864-f145-41e6-8b78-392abd9bda82'),
('5d36dce0-14ae-43cc-9d61-ade27842c90f', 1, '2025-01-02 02:18:19', '2025-01-02 02:18:19', 'e5030901-296a-464d-9746-a6cf849f6a1a', 'c88ab864-f145-41e6-8b78-392abd9bda82'),
('7996b840-cb83-4ad4-9e36-ad804c4a85b8', 1, '2025-01-02 03:02:41', '2025-01-02 03:02:41', 'aee7d6bd-b665-484d-b552-3dd6fd721d34', 'c88ab864-f145-41e6-8b78-392abd9bda82'),
('efbf1232-6d4a-4317-bdd8-9b769760d8cf', 1, '2025-01-02 02:18:17', '2025-01-02 02:18:17', '6d895e8f-2024-4fc2-85ca-84920db1593f', 'c88ab864-f145-41e6-8b78-392abd9bda82'),
('fc7d03d9-13fa-42c8-a1a7-43c6d0ada4ea', 1, '2025-01-02 02:18:39', '2025-01-02 02:18:39', 'f550f452-caab-4180-a32e-038666e174a2', 'c88ab864-f145-41e6-8b78-392abd9bda82');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD PRIMARY KEY (`transaction_detail_id`),
  ADD KEY `transaction_id` (`transaction_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD CONSTRAINT `transaction_details_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
