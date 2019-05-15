-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 15, 2019 alle 10:28
-- Versione del server: 10.1.37-MariaDB
-- Versione PHP: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `biblioteca`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `library`
--

CREATE TABLE `library` (
  `ora` varchar(5) NOT NULL,
  `giorno` varchar(3) DEFAULT NULL,
  `data` date NOT NULL,
  `entrate` int(5) DEFAULT NULL,
  `uscite` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `segnalazione`
--

CREATE TABLE `segnalazione` (
  `ora` char(5) NOT NULL,
  `data` date NOT NULL,
  `segnalazione` char(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `stato_biblioteca`
--

CREATE TABLE `stato_biblioteca` (
  `ID` int(11) NOT NULL,
  `data` date NOT NULL,
  `stato` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `library`
--
ALTER TABLE `library`
  ADD PRIMARY KEY (`ora`,`data`);

--
-- Indici per le tabelle `segnalazione`
--
ALTER TABLE `segnalazione`
  ADD PRIMARY KEY (`ora`,`data`);

--
-- Indici per le tabelle `stato_biblioteca`
--
ALTER TABLE `stato_biblioteca`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `stato_biblioteca`
--
ALTER TABLE `stato_biblioteca`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
