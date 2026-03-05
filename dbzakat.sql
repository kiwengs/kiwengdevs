-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2026 at 04:26 PM
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
-- Database: `dbzakat`
--

-- --------------------------------------------------------

--
-- Table structure for table `berita`
--

CREATE TABLE `berita` (
  `id` int(11) NOT NULL,
  `judul` varchar(100) DEFAULT NULL,
  `isi` text DEFAULT NULL,
  `tanggal` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `berita`
--

INSERT INTO `berita` (`id`, `judul`, `isi`, `tanggal`) VALUES
(1, 'bantuan bencana di sumatra', 'penyaluran zakat sebesar 50 juta berhasil diterima oleh warga', '2025-12-29'),
(5, 'bantuan erupsi gunung', 'penyaluran zakat untuk bantuan bencana alam sudah diterima oleh warga sekitar', '2025-12-29'),
(8, 'penyaluran berita', 'jadi ini adalah test 123', '2026-01-12'),
(9, 'Mesjid Di mangjalengka Roboh!!', 'mesjid di mangjalengka ini robot dikarenakan pondasi dari tanah tersebut longsong', '2026-01-16');

-- --------------------------------------------------------

--
-- Table structure for table `pembayaran`
--

CREATE TABLE `pembayaran` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `metode` varchar(30) DEFAULT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pembayaran`
--

INSERT INTO `pembayaran` (`id`, `nama`, `jumlah`, `metode`, `tanggal`) VALUES
(1, 'kevin', 13889, 'QRIS', '2025-12-18 05:57:46'),
(2, 'admin', 1111, 'Transfer Bank', '2025-12-18 06:04:15'),
(3, 'kevin', 803608, 'Transfer Bank', '2025-12-18 06:10:17'),
(4, 'admin', 8359, 'QRIS', '2025-12-18 06:11:20'),
(5, 'admin', 863359, 'Transfer Bank', '2025-12-18 06:30:17'),
(6, 'kiweng', 8836, 'QRIS', '2025-12-18 06:31:54'),
(7, 'admin', 8586, 'Transfer Bank', '2025-12-18 06:48:23'),
(8, 'admin', 3080, 'QRIS', '2025-12-18 06:54:27'),
(9, 'admin', 5856, 'QRIS', '2025-12-18 14:59:32'),
(10, 'yoan', 811, 'E-Wallet', '2025-12-18 15:00:16'),
(11, 'admin', 811, 'Transfer Bank', '2025-12-19 06:21:19'),
(12, 'kevin', 81081061, 'E-Wallet', '2025-12-21 23:02:56'),
(13, '2', 1250000, 'QRIS', '2026-01-16 13:45:54'),
(14, '2', 125000, 'Transfer Bank', '2026-01-16 15:16:04');

-- --------------------------------------------------------

--
-- Table structure for table `penyaluran`
--

CREATE TABLE `penyaluran` (
  `id` int(11) NOT NULL,
  `program` varchar(150) NOT NULL,
  `persentase` int(11) NOT NULL,
  `jumlah` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penyaluran`
--

INSERT INTO `penyaluran` (`id`, `program`, `persentase`, `jumlah`, `created_at`) VALUES
(1, 'fakir', 33, 2200000, '2026-01-12 04:39:36'),
(2, 'bangun mesjid', 40, 5000000, '2026-01-12 04:40:11'),
(5, 'bencana banjir', 80, 1500000000, '2026-01-12 04:52:00'),
(6, 'Gempa bumi di TheoTown', 75, 10000000, '2026-01-12 07:58:21');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(2, '1', '1', 'admin'),
(4, 'kiweng', '', 'admin'),
(6, 'yoan', '12345', 'user'),
(7, 'orang baik', '12345', 'user'),
(8, 'admin', 'admin123', 'admin'),
(11, 'lololoolo', 'pwqrrq', 'user'),
(12, '2', '2', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `berita`
--
ALTER TABLE `berita`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penyaluran`
--
ALTER TABLE `penyaluran`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `berita`
--
ALTER TABLE `berita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `penyaluran`
--
ALTER TABLE `penyaluran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
