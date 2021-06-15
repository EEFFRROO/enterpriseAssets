-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 23 2021 г., 14:46
-- Версия сервера: 8.0.19
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `enterprise`
--

-- --------------------------------------------------------

--
-- Структура таблицы `monetary_assets`
--

CREATE TABLE `monetary_assets` (
  `id` int NOT NULL,
  `amount` int NOT NULL,
  `bank_name` varchar(50) DEFAULT NULL,
  `account_number` int DEFAULT NULL,
  `denomination` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `monetary_assets`
--

INSERT INTO `monetary_assets` (`id`, `amount`, `bank_name`, `account_number`, `denomination`) VALUES
(1, 1000, 'ЕвроВорБанк', 5, 'Руб'),
(2, 5, 'Внешторгабк', 3, 'Доллар'),
(4, 3000, NULL, NULL, 'Талоны на бензин от Аспека в рублях'),
(30, 100, '', NULL, 'Руб');

-- --------------------------------------------------------

--
-- Структура таблицы `non_monetary_assets`
--

CREATE TABLE `non_monetary_assets` (
  `id` int NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `balance_value` int NOT NULL,
  `residual_value` int NOT NULL,
  `assessed_value` int NOT NULL,
  `creation_date` int DEFAULT NULL,
  `measure` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `denomination` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `additional_information` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `non_monetary_assets`
--

INSERT INTO `non_monetary_assets` (`id`, `name`, `balance_value`, `residual_value`, `assessed_value`, `creation_date`, `measure`, `denomination`, `additional_information`) VALUES
(1, 'Гвозди', 1000, 100, 2000, 2000, '100 кг', 'Руб', NULL),
(2, 'Торговое здание', 30000, 5000, 1000000, 1970, NULL, 'Руб', 'Бассейная-6');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `monetary_assets`
--
ALTER TABLE `monetary_assets`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `non_monetary_assets`
--
ALTER TABLE `non_monetary_assets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `monetary_assets`
--
ALTER TABLE `monetary_assets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT для таблицы `non_monetary_assets`
--
ALTER TABLE `non_monetary_assets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
