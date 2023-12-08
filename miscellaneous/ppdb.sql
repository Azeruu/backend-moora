-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2023 at 01:56 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ppdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `bukti`
--

CREATE TABLE `bukti` (
  `id` int(11) NOT NULL,
  `dataSiswaId` int(11) NOT NULL,
  `ijazah_sk` varchar(255) NOT NULL,
  `kartu_keluarga` varchar(255) NOT NULL,
  `akta_kelahiran` varchar(255) NOT NULL,
  `SS_lulus_dapodik` varchar(255) NOT NULL,
  `url_ijazah` varchar(255) DEFAULT NULL,
  `url_akta` varchar(255) DEFAULT NULL,
  `url_kk` varchar(255) DEFAULT NULL,
  `url_dapodik` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bukti`
--

INSERT INTO `bukti` (`id`, `dataSiswaId`, `ijazah_sk`, `kartu_keluarga`, `akta_kelahiran`, `SS_lulus_dapodik`, `url_ijazah`, `url_akta`, `url_kk`, `url_dapodik`, `createdAt`, `updatedAt`) VALUES
(6, 57, 'cab1feb85ea5a311a2d87fbeec530147.png', 'fd99f13f90ae548f8f419e8bf723bfec.png', '0536458c6b719b2104d996f22acac7eb.jpg', '9047f02864b147ccb256331153032710.jpg', 'http://localhost:5000/images/b9a9081bc325553843fafd61d51efd9e.jpg', 'http://localhost:5000/images/0536458c6b719b2104d996f22acac7eb.jpg', 'http://localhost:5000/images/fd99f13f90ae548f8f419e8bf723bfec.png', 'http://localhost:5000/images/9047f02864b147ccb256331153032710.jpg', '2023-12-06 14:05:45', '2023-12-06 14:08:14');

-- --------------------------------------------------------

--
-- Table structure for table `data_nilai`
--

CREATE TABLE `data_nilai` (
  `id` int(11) NOT NULL,
  `dataSiswaId` int(11) NOT NULL,
  `pkn1` int(11) NOT NULL,
  `bindo1` int(11) NOT NULL,
  `mtk1` int(11) NOT NULL,
  `ips1` int(11) NOT NULL,
  `ipa1` int(11) NOT NULL,
  `pkn2` int(11) NOT NULL,
  `bindo2` int(11) NOT NULL,
  `mtk2` int(11) NOT NULL,
  `ips2` int(11) NOT NULL,
  `ipa2` int(11) NOT NULL,
  `pkn3` int(11) NOT NULL,
  `bindo3` int(11) NOT NULL,
  `mtk3` int(11) NOT NULL,
  `ips3` int(11) NOT NULL,
  `ipa3` int(11) NOT NULL,
  `pkn4` int(11) NOT NULL,
  `bindo4` int(11) NOT NULL,
  `mtk4` int(11) NOT NULL,
  `ips4` int(11) NOT NULL,
  `ipa4` int(11) NOT NULL,
  `pkn5` int(11) NOT NULL,
  `bindo5` int(11) NOT NULL,
  `mtk5` int(11) NOT NULL,
  `ips5` int(11) NOT NULL,
  `ipa5` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_nilai`
--

INSERT INTO `data_nilai` (`id`, `dataSiswaId`, `pkn1`, `bindo1`, `mtk1`, `ips1`, `ipa1`, `pkn2`, `bindo2`, `mtk2`, `ips2`, `ipa2`, `pkn3`, `bindo3`, `mtk3`, `ips3`, `ipa3`, `pkn4`, `bindo4`, `mtk4`, `ips4`, `ipa4`, `pkn5`, `bindo5`, `mtk5`, `ips5`, `ipa5`, `createdAt`, `updatedAt`) VALUES
(42, 27, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 99, 99, 99, 99, '2023-11-13 11:58:49', '2023-11-13 11:58:49'),
(45, 53, 88, 81, 82, 83, 84, 80, 86, 87, 88, 89, 80, 90, 91, 92, 93, 80, 95, 96, 97, 98, 80, 99, 99, 99, 99, '2023-11-15 18:27:06', '2023-11-17 14:16:51'),
(48, 56, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 81, 82, 83, 84, 85, '2023-11-15 18:42:53', '2023-11-15 18:42:53'),
(49, 57, 81, 82, 83, 84, 85, 85, 86, 87, 88, 89, 89, 90, 91, 92, 93, 93, 94, 95, 96, 97, 97, 98, 99, 99, 99, '2023-11-17 12:36:38', '2023-11-17 12:36:38');

-- --------------------------------------------------------

--
-- Table structure for table `data_siswa`
--

CREATE TABLE `data_siswa` (
  `id` int(11) NOT NULL,
  `nama_jalur` varchar(255) NOT NULL,
  `NISN` varchar(255) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `jenis_kelamin` varchar(255) NOT NULL,
  `NIK` varchar(255) NOT NULL,
  `tempat_lahir` varchar(255) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `usia` varchar(255) NOT NULL,
  `asal_sekolah` varchar(255) NOT NULL,
  `nama_jalan` varchar(255) NOT NULL,
  `no_rumah` varchar(255) NOT NULL,
  `RT` varchar(255) NOT NULL,
  `RW` varchar(255) NOT NULL,
  `Desa` varchar(255) NOT NULL,
  `Kecamatan` varchar(255) NOT NULL,
  `jarak` float NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `jalurId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data_siswa`
--

INSERT INTO `data_siswa` (`id`, `nama_jalur`, `NISN`, `nama_lengkap`, `jenis_kelamin`, `NIK`, `tempat_lahir`, `tgl_lahir`, `usia`, `asal_sekolah`, `nama_jalan`, `no_rumah`, `RT`, `RW`, `Desa`, `Kecamatan`, `jarak`, `userId`, `createdAt`, `updatedAt`, `jalurId`) VALUES
(27, 'Afirmasi', '34534636', 'Sendy Arif', 'Laki - Laki', '856745745', 'Depok', '2002-12-09', '22', 'SDN 1 Sawangan', 'jl.jeungjing', '33', '002', '003', 'Guradog', 'sawangan', 3, 2, '2023-11-13 11:57:53', '2023-11-13 11:57:53', NULL),
(53, 'Zonasi', '0321546789', 'Reza Updated', 'Laki - Laki', '123456789', 'Tangerang', '2001-12-09', '22', 'SDN 1 Sukatani', 'jl.cempaka', '33', '001', '004', 'sukatani', 'cisoka', 3, 1, '2023-11-15 18:26:13', '2023-11-17 14:20:41', NULL),
(56, 'Zonasi', '0321546789', 'Rifuki', 'Laki - Laki', '456463245345', 'Solo', '2001-12-09', '23', 'SDN 1 Solo', 'jl.Panjaitan', '34', '004', '010', 'Parung', 'Parung Panjang', 2, 1, '2023-11-15 18:42:02', '2023-11-17 13:21:43', NULL),
(57, 'Prestasi', '6787969870', 'Bambang', 'Laki - Laki', '3452765756', 'Serpong', '1998-12-05', '25', 'SDN 1 Serpong timur', 'jl.jeungjing', '42', '002', '010', 'Guradog', 'Tigaraksa', 1, 1, '2023-11-17 12:35:30', '2023-11-17 12:35:30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hasil`
--

CREATE TABLE `hasil` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `dataSiswaId` int(11) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `skor_akhir` float NOT NULL,
  `peringkat` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hasil`
--

INSERT INTO `hasil` (`id`, `userId`, `dataSiswaId`, `nama_lengkap`, `skor_akhir`, `peringkat`, `createdAt`, `updatedAt`) VALUES
(6, 2, 27, 'Sendy Arif', 0.433056, 1, '2023-11-13 11:58:50', '2023-11-13 11:58:50'),
(8, 1, 53, 'Reza Updated', 0.413556, 1, '2023-11-15 18:27:08', '2023-11-17 14:20:41'),
(10, 1, 56, 'Rifuki', 0.261944, 1, '2023-11-15 18:42:55', '2023-11-17 13:21:43'),
(11, 1, 57, 'Bambang', 0.338222, 1, '2023-11-17 12:36:40', '2023-11-17 12:36:40'),
(12, 1, 56, 'Rifuki', 0.261944, 1, '2023-11-17 13:11:25', '2023-11-17 13:21:43');

-- --------------------------------------------------------

--
-- Table structure for table `jalur`
--

CREATE TABLE `jalur` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `nama_jalur` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jalur`
--

INSERT INTO `jalur` (`id`, `uuid`, `nama_jalur`, `createdAt`, `updatedAt`) VALUES
(1, '8e0b0c74-aea6-4e89-a0c2-14f1c203118f', 'Zonasi', '2023-09-28 15:30:41', '2023-09-28 15:30:41'),
(2, 'fde037ca-4cea-49f5-b32c-bf8981a4db97', 'Afirmasi', '2023-09-28 15:55:30', '2023-09-28 15:55:30'),
(3, 'acd0d627-e0fe-4e4f-80f6-783060cfeab9', 'Prestasi', '2023-09-28 15:55:44', '2023-09-28 15:55:44');

-- --------------------------------------------------------

--
-- Table structure for table `kriteria`
--

CREATE TABLE `kriteria` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `nama_kriteria` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rekap_nilai`
--

CREATE TABLE `rekap_nilai` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `dataSiswaId` int(11) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `avrg_nilai_pkn` float NOT NULL,
  `avrg_nilai_bindo` float NOT NULL,
  `avrg_nilai_mtk` float NOT NULL,
  `avrg_nilai_ips` float NOT NULL,
  `avrg_nilai_ipa` float NOT NULL,
  `jarak` float NOT NULL,
  `usia` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rekap_nilai`
--

INSERT INTO `rekap_nilai` (`id`, `userId`, `dataSiswaId`, `nama_lengkap`, `avrg_nilai_pkn`, `avrg_nilai_bindo`, `avrg_nilai_mtk`, `avrg_nilai_ips`, `avrg_nilai_ipa`, `jarak`, `usia`, `createdAt`, `updatedAt`) VALUES
(17, 2, 27, 'Sendy Arif', 89.4, 90.2, 91, 91.8, 92.6, 3, 22, '2023-11-13 11:58:50', '2023-11-13 11:58:50'),
(19, 1, 53, 'Reza Updated', 81.6, 90.2, 91, 91.8, 92.6, 3, 22, '2023-11-15 18:27:08', '2023-11-17 14:20:41'),
(21, 1, 56, 'Rifuki', 80.2, 80.4, 80.6, 80.8, 81, 2, 23, '2023-11-15 18:42:55', '2023-11-17 13:21:43'),
(22, 1, 57, 'Bambang', 89, 90, 91, 91.8, 92.6, 1, 25, '2023-11-17 12:36:40', '2023-11-17 12:36:40'),
(23, 1, 56, 'Rifuki', 80.2, 80.4, 80.6, 80.8, 81, 2, 23, '2023-11-17 13:11:25', '2023-11-17 13:21:43');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('-Lds9hCdA2TNO-V7CBc1ISim-EqcXr_H', '2023-12-07 13:59:03', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 13:59:03', '2023-12-06 13:59:03'),
('4XHly2BPhBv-0IHeAyVrIE1W-PJBwws2', '2023-12-07 12:21:39', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:21:39', '2023-12-06 12:21:39'),
('6h33A9KwZtM9XOWas696X6N4pvh3IyUh', '2023-12-07 11:46:02', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 11:46:02', '2023-12-06 11:46:02'),
('8XlcMcdZNpm1QmVPzhrsTArkeXk3MFk_', '2023-12-07 12:38:50', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:38:50', '2023-12-06 12:38:50'),
('96jCrdD3hvoWUcR2d-WuR0bov5ptiL9l', '2023-12-07 12:17:14', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:17:14', '2023-12-06 12:17:14'),
('atqkcBXogixnucE54QfHOrh0x8FvDSfD', '2023-12-07 13:28:41', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 13:28:41', '2023-12-06 13:28:41'),
('bpuM0l6R015YwsPoZx7vyKjbQlgi6yEC', '2023-12-07 12:56:57', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:56:57', '2023-12-06 12:56:57'),
('C4kokDhCEKro0AyKefO9rACx8f4UzGAU', '2023-12-07 13:24:21', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 13:24:21', '2023-12-06 13:24:21'),
('CxEjzvBt2q4At6skmHj01Mz_pI9lN4BU', '2023-12-06 14:27:20', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-05 14:27:20', '2023-12-05 14:27:20'),
('driJJKRIUrz_y77f0Z_TGjGA1aCj4Un0', '2023-12-07 13:33:20', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 13:33:20', '2023-12-06 13:33:20'),
('e4JbykMQ7wcVnJnLPdr2GHhH8UnNjmEl', '2023-12-07 13:22:42', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 13:22:42', '2023-12-06 13:22:42'),
('e9yBPCpcTvFjS4j2BI0vt7oIrARyce9e', '2023-12-07 12:52:13', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:52:13', '2023-12-06 12:52:13'),
('eGSAA2c4bKlEElGhBKpbmo2a_OGKGZVu', '2023-12-06 14:45:47', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-05 14:45:47', '2023-12-05 14:45:47'),
('Fe4hYRKKTYGpTUq8m9pYZwQsVkBULC-m', '2023-12-07 12:48:38', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:48:38', '2023-12-06 12:48:38'),
('fi4DJPDu_eGtq9pqijr_yVDB6Rl8IOxy', '2023-12-07 12:51:08', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:51:08', '2023-12-06 12:51:08'),
('fw6toakr9prS4Vljb5xqsB-DN8YH8nB2', '2023-12-07 14:06:20', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 14:06:20', '2023-12-06 14:06:20'),
('GdSqvc0W3i-4UKeISKBWITBDHNaF1NB3', '2023-12-07 13:59:58', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 13:59:58', '2023-12-06 13:59:58'),
('hR6VVQZbdv20Faam3ApXxIRc00ISPdtb', '2023-12-07 14:01:04', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 14:01:04', '2023-12-06 14:01:04'),
('iK_KUWlD_PxDHCFvRs8nanrZ2CXE2m_Z', '2023-12-07 12:47:27', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:47:27', '2023-12-06 12:47:27'),
('i_fAqe09UCRi7ZZtYhfKr6ESyaqiMdO4', '2023-12-07 13:25:58', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 13:25:58', '2023-12-06 13:25:58'),
('jPFOm2TKzfEXjU_K4uJhvj7fUea_lukx', '2023-12-07 11:51:22', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 11:51:22', '2023-12-06 11:51:22'),
('jraN7NwIXVDB5TUKp5hHyknCYDZn4S1A', '2023-12-07 14:08:17', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"729007c2-f232-4431-a030-4e788be7ff4a\"}', '2023-11-30 14:35:35', '2023-12-06 14:08:17'),
('KF6eC_Id52SD1o1VsM5dGb6pVS_5MAhq', '2023-12-07 12:47:10', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:47:10', '2023-12-06 12:47:10'),
('k_nZovcF2m1WeFnEv8oJt5wPBqkqcErb', '2023-12-07 12:10:36', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:10:36', '2023-12-06 12:10:36'),
('ldVQ7UBkaJR7VkogCYVFaDd5-Anwk77o', '2023-12-07 13:23:18', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 13:23:19', '2023-12-06 13:23:19'),
('lFwCzb7FyTT2t7VoryYeJsYvJuR-SfBE', '2023-12-07 12:19:03', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:19:03', '2023-12-06 12:19:03'),
('LkkkjMbFNfG9o2OU9mWYICjISN2rsm6U', '2023-12-07 12:48:01', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:48:01', '2023-12-06 12:48:01'),
('LmwSLqPE4G92UfGVF9TQKaP3GUA-to2m', '2023-12-07 12:24:01', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:24:01', '2023-12-06 12:24:01'),
('LpwMfjqjAkzsCI_1LaIeJ8wQMQCzFDpv', '2023-12-07 13:03:37', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 13:03:37', '2023-12-06 13:03:37'),
('Lr8d8IUt_m-PoSo8C-y6gog3kzJMpDHR', '2023-12-07 12:36:34', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:36:34', '2023-12-06 12:36:34'),
('lwhoElnfsnRI3XpKGlFG8FWY5JgW10o4', '2023-12-07 12:24:24', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:24:24', '2023-12-06 12:24:24'),
('M4DA74ADNVrcM7uzQPHEPPYuWQgnfpVX', '2023-12-07 12:24:42', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:24:42', '2023-12-06 12:24:42'),
('mD4iJXhcrT52CuXhwzq2Sa46qBMMKpDi', '2023-12-07 12:56:04', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:56:04', '2023-12-06 12:56:04'),
('Mku29vtzDZmg97aMBoWr9hAlEShGvdDc', '2023-12-07 12:30:00', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:30:00', '2023-12-06 12:30:00'),
('nKC9CPnM-zht1fRvVw3AMUbSFRAv3fpG', '2023-12-07 11:30:55', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 11:30:55', '2023-12-06 11:30:55'),
('OnhWcQQEahkxfoM-_jaY794E9sJv8aDf', '2023-12-07 12:49:39', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:49:39', '2023-12-06 12:49:39'),
('PejDVXC_kyY7t5mBjUbQa0EEX7fcDBGj', '2023-12-07 12:55:00', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:55:00', '2023-12-06 12:55:00'),
('PLM8ER9hAzOM73wF6A47AuroFLTY5Irq', '2023-12-07 13:30:01', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 13:30:01', '2023-12-06 13:30:01'),
('pSpNGzj27d1CkRpUEPU9cg2DsWkF4typ', '2023-12-07 13:04:00', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 13:04:00', '2023-12-06 13:04:00'),
('TpOyvUUwylPuGyZmkIf742VFFJT-rbQ7', '2023-12-07 14:00:13', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 14:00:13', '2023-12-06 14:00:13'),
('UR1WlTz3slyJU5l8Pid2CNP7lsvlDuAF', '2023-12-07 12:35:00', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:35:00', '2023-12-06 12:35:00'),
('uZVFdmrKR95P8-diZjrcyPKAXpcEMwU3', '2023-12-06 14:33:43', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-05 14:33:43', '2023-12-05 14:33:43'),
('vOTg2wkgQJVUtrBRyaVeyXc39nYVCtsy', '2023-12-07 12:57:10', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:57:10', '2023-12-06 12:57:10'),
('vQGk8rlx7T5JeH3zoXnsI0SHcvZZAI2U', '2023-12-06 14:25:53', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-05 14:25:53', '2023-12-05 14:25:53'),
('W6mzkAGGNWTeKx8U-ATK0I6QyDoOWZsK', '2023-12-07 12:32:27', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:32:27', '2023-12-06 12:32:27'),
('WbWSKX2hLrLcqmN9dpen_T0brvg28hp9', '2023-12-07 14:08:14', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 14:08:14', '2023-12-06 14:08:14'),
('X0JLaZELcf6E1p3iy6RQZF8WeIxHnnZY', '2023-12-07 13:05:34', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 13:05:34', '2023-12-06 13:05:34'),
('x3WV5k6Ig5wBtD_iuOiBf4Kgp_uIhTuB', '2023-12-07 11:50:52', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 11:50:52', '2023-12-06 11:50:52'),
('x6mPNBzZ8byFkOVPz7Kqt9noQvpD7sLs', '2023-12-07 12:46:56', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:46:56', '2023-12-06 12:46:56'),
('yKr2QDBPgWkvxUr6HF40Ae1iAtE1XdqR', '2023-12-07 11:52:49', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 11:52:49', '2023-12-06 11:52:49'),
('zCktsspaTPYepS8ueHlsIDFglBSlVXqc', '2023-12-07 12:31:33', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:31:33', '2023-12-06 12:31:33'),
('_H6OKozltLEgmpWyzHkouyFOk2FTNGRx', '2023-12-07 12:32:55', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-12-06 12:32:55', '2023-12-06 12:32:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `username`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, '729007c2-f232-4431-a030-4e788be7ff4a', 'admin', 'admin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$8pNmVjuUXt+dO+FnXLsfOQ$6qZo10Lp/h3wyhoeEXxpd/ToZ+0oH9cXW+ZT08iMMVk', 'admin', '2023-08-05 07:16:31', '2023-08-05 07:16:31'),
(2, '24630e77-e454-4295-b884-286dddd4d2c5', 'reza', 'reza@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$LfqVMMKQ+Zph35+djSHDqw$k4E5HOTOS1tmMOgfcMP6IiMLbR7sIi5l6f8F7vxW0ic', 'user', '2023-09-28 05:22:16', '2023-09-28 05:22:16'),
(5, 'eb01ce8a-fef4-4645-a597-84858998c607', 'aceng', 'aceng@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$wuWV7GWXBEnJbgkNuP5fSA$DEP4qcITvQTYifKyNNYSMySpVPx23YD2vRFKo99SWWI', 'user', '2023-10-03 11:52:30', '2023-10-03 11:52:30'),
(7, 'a69dbf4d-35c0-4aa9-8205-cbb3daa25e0b', 'ujang', 'ujang@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$B8m+Nq5dRtx3DahqmEu7cQ$UfCbhNHjVdsTIoZhxdYqTO7G0LboOY+Dnqp3Fr7NdcY', 'user', '2023-11-30 14:08:09', '2023-11-30 14:08:09'),
(8, '4ff0d697-4ffd-4006-8bc8-9ee1cfb4da18', 'pipin', 'pipin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Gp36uDgHizJDXVhFn+HXBQ$KqnUt/ZDgVMXJ05/pmctcs0vrjcqtn/UrNxj/s4AVps', 'user', '2023-11-30 14:12:18', '2023-11-30 14:12:18'),
(9, '24e86f53-ac52-450a-814b-fef7eb2df502', 'ucup', 'ucup@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$PRTSnG+PVaL9cGnU0mvwhA$UjrYbW/lk7P0r0EWJEWcTgHZi8Ejiv5fZ9rttcMAk1g', 'user', '2023-11-30 14:36:34', '2023-11-30 14:36:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bukti`
--
ALTER TABLE `bukti`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dataSiswaId` (`dataSiswaId`);

--
-- Indexes for table `data_nilai`
--
ALTER TABLE `data_nilai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dataSiswaId` (`dataSiswaId`);

--
-- Indexes for table `data_siswa`
--
ALTER TABLE `data_siswa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `jalurId` (`jalurId`);

--
-- Indexes for table `hasil`
--
ALTER TABLE `hasil`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `dataSiswaId` (`dataSiswaId`);

--
-- Indexes for table `jalur`
--
ALTER TABLE `jalur`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kriteria`
--
ALTER TABLE `kriteria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rekap_nilai`
--
ALTER TABLE `rekap_nilai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `dataSiswaId` (`dataSiswaId`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bukti`
--
ALTER TABLE `bukti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `data_nilai`
--
ALTER TABLE `data_nilai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `data_siswa`
--
ALTER TABLE `data_siswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `hasil`
--
ALTER TABLE `hasil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `jalur`
--
ALTER TABLE `jalur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `kriteria`
--
ALTER TABLE `kriteria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rekap_nilai`
--
ALTER TABLE `rekap_nilai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bukti`
--
ALTER TABLE `bukti`
  ADD CONSTRAINT `bukti_ibfk_1` FOREIGN KEY (`dataSiswaId`) REFERENCES `data_siswa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `data_nilai`
--
ALTER TABLE `data_nilai`
  ADD CONSTRAINT `data_nilai_ibfk_1` FOREIGN KEY (`dataSiswaId`) REFERENCES `data_siswa` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `data_siswa`
--
ALTER TABLE `data_siswa`
  ADD CONSTRAINT `data_siswa_ibfk_25` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `data_siswa_ibfk_26` FOREIGN KEY (`jalurId`) REFERENCES `jalur` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `hasil`
--
ALTER TABLE `hasil`
  ADD CONSTRAINT `hasil_ibfk_15` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `hasil_ibfk_16` FOREIGN KEY (`dataSiswaId`) REFERENCES `data_siswa` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `rekap_nilai`
--
ALTER TABLE `rekap_nilai`
  ADD CONSTRAINT `rekap_nilai_ibfk_19` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `rekap_nilai_ibfk_20` FOREIGN KEY (`dataSiswaId`) REFERENCES `data_siswa` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
