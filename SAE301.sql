-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 24 oct. 2025 à 12:46
-- Version du serveur : 10.11.14-MariaDB-0+deb12u2
-- Version de PHP : 8.3.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gader3`
--

-- --------------------------------------------------------

--
-- Structure de la table `Category`
--

CREATE TABLE `Category` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `Category`
--

INSERT INTO `Category` (`id`, `name`) VALUES
(1, 'Vêtements'),
(2, 'Chaussures'),
(3, 'Accessoires');

-- --------------------------------------------------------

--
-- Structure de la table `Gallery`
--

CREATE TABLE `Gallery` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Gallery`
--

INSERT INTO `Gallery` (`id`, `product_id`, `filename`) VALUES
(1, 1, 'bracelet-lacoste-1.jpg'),
(2, 1, 'bracelet-lacoste-2.jpg'),
(3, 2, 'tshirt-ami-1.jpg'),
(4, 2, 'tshirt-ami-2.jpg'),
(5, 2, 'tshirt-ami-3.jpg'),
(6, 2, 'tshirt-ami-4.jpg'),
(7, 2, 'tshirt-ami-5.jpg'),
(8, 3, 'doudoune-ralph-lauren-1.jpg'),
(9, 3, 'doudoune-ralph-lauren-2.jpg'),
(10, 3, 'doudoune-ralph-lauren-3.jpg'),
(11, 3, 'doudoune-ralph-lauren-4.jpg'),
(12, 3, 'doudoune-ralph-lauren-5.jpg'),
(13, 31, 'montre-maserati-1.jpg'),
(14, 31, 'montre-maserati-2.jpg'),
(15, 31, 'montre-maserati-3.jpg'),
(16, 31, 'montre-maserati-5.jpg'),
(17, 31, 'montre-maserati4.jpg'),
(18, 32, 'baskets-asics-gel-nyc-1.jpg'),
(19, 32, 'baskets-asics-gel-nyc-4.jpg'),
(20, 32, 'baskets_basses_gel_nyc-2.jpg'),
(21, 32, 'baskets_basses_gel_nyc-3.jpg'),
(22, 32, 'baskets_basses_gel_nyc-5.jpg'),
(23, 33, 'casquette-prada-1.jpg'),
(24, 33, 'casquette-prada-2.jpg'),
(25, 33, 'casquette-prada-3.jpg'),
(26, 34, 'sabots-birkenstock-boston-1.jpg'),
(27, 34, 'sabots-birkenstock-boston-2.jpg'),
(28, 35, 'montre-seiko-sur311p1.jpg'),
(29, 4, 'chaussure-prada-1.jpg'),
(30, 4, 'chaussure-prada-2.jpg'),
(31, 4, 'chaussure-prada-3.jpg'),
(32, 4, 'chaussure-prada-4.jpg'),
(33, 4, 'chaussure-prada-5.jpg'),
(34, 5, 'hoodie-jacquemus-1.jpg'),
(35, 5, 'hoodie-jacquemus-2.jpg'),
(36, 6, 'blouson-comme-des-garcons-1.jpg'),
(37, 6, 'blouson-comme-des-garcons-2.jpg'),
(38, 7, 'basket-ape-1.jpg'),
(39, 7, 'basket-ape-2.jpg'),
(40, 7, 'basket-ape-3.jpg'),
(41, 7, 'basket-ape-4.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `Order`
--

CREATE TABLE `Order` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'En Cours',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Order`
--

INSERT INTO `Order` (`id`, `user_id`, `total`, `status`, `created_at`) VALUES
(1, 6, '150.00', 'Validé', '2025-10-24 00:19:05'),
(2, 6, '150.00', 'En Cours', '2025-10-24 00:19:09'),
(3, 6, '150.00', 'Annulé', '2025-10-24 00:25:19'),
(4, 6, '150.00', 'En Cours', '2025-10-24 00:25:31'),
(5, 6, '150.00', 'En Cours', '2025-10-24 00:26:25'),
(16, 6, '170.00', 'En Cours', '2025-10-24 08:57:06'),
(17, 6, '290.00', 'En Cours', '2025-10-24 09:03:43'),
(18, 6, '315.00', 'En Cours', '2025-10-24 09:27:51'),
(19, 6, '130.00', 'En Cours', '2025-10-24 09:38:24'),
(20, 6, '495.00', 'En Cours', '2025-10-24 10:17:01');

-- --------------------------------------------------------

--
-- Structure de la table `OrderItem`
--

CREATE TABLE `OrderItem` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `OrderItem`
--

INSERT INTO `OrderItem` (`id`, `order_id`, `product_id`, `quantity`, `unit_price`) VALUES
(1, 1, 32, 1, '150.00'),
(2, 2, 32, 1, '150.00'),
(3, 3, 32, 1, '150.00'),
(4, 4, 32, 1, '150.00'),
(5, 5, 32, 1, '150.00'),
(18, 16, 6, 1, '170.00'),
(19, 17, 34, 1, '160.00'),
(20, 17, 2, 1, '130.00'),
(21, 18, 7, 1, '315.00'),
(22, 19, 2, 1, '130.00'),
(23, 20, 3, 1, '495.00');

-- --------------------------------------------------------

--
-- Structure de la table `Product`
--

CREATE TABLE `Product` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `category` int(11) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `details` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `Product`
--

INSERT INTO `Product` (`id`, `name`, `category`, `description`, `price`, `details`) VALUES
(1, 'Lacoste', 3, 'Bracelet Metropole Argenté 2040117-PAR', '89.00', 'Bracelet Lacoste de la collection Metropole en acier avec fermoir à clip. Longueur ajustable de 13 à 19 cm.'),
(2, 'AMI Paris', 1, 'T-shirt Ami de Coeur Rouge unisexe', '130.00', 'Détails et composition T-shirt Ami de Coeur en jersey de coton biologique.  Coupe classique Produit unisexe Longueur milieu dos 58 cm (taille XS) Longueur milieu dos 66 cm (taille M) Broderie poitrine Ami de Coeur rouge Broderie \"AMI\" ton-sur-ton sous encolure dos Fabriqué au Portugal (avec amour) Ce modèle est unisexe. Pour l\'homme, prenez votre taille habituelle. Pour la femme, prenez une taille en dessous de votre taille habituelle. Le mannequin homme mesure 1m89 et porte une taille M. Le mannequin femme mesure 1m75 et porte une taille XS.'),
(3, 'Polo Ralph Lauren', 1, 'Doudoune droite effet matelassé', '495.00', 'Cette doudoune droite courte Polo Ralph Lauren séduit par son effet matelassé, sa capuche, sa fermeture zippée ainsi que ses manches longues.'),
(4, 'Prada', 2, 'Sneakers Prada America’s Cup en cuir verni et tissu technique', '780.00', 'Tige : cuir verni et tissu technique Logo Prada Linea Rossa sur la languette et la semelle Semelle souple et légère en gomme de 40 mm Semelle crantée en gomme'),
(5, 'Jacquemus', 1, 'Le Hoodie Gros Grain', '320.00', 'Ce sweat à capuche Jacquemus en coton est muni d’un col rond et d’une signature sur la poitrine.'),
(6, 'Comme des Garçons PLAY', 1, 'Blouson zippé Comme des Garçons PLAY x K-way unisexe capuche', '170.00', 'Ce blouson droit en nylon issu de la collaboration Comme des Garçons PLAY x K-way, se pare d\'une capuche, d\'un col montant, de manches longues, d\'une fermeture à glissière, de 2 poches latérales devant et d\'une broderie de 2 logos sur la poitrine.'),
(7, 'A BATHING APE ®', 2, 'Baskets basses Bape Sta #1', '315.00', 'Ces baskets basses A Bathing Ape conçues en cuir séduisent par leur effet verni, leur bout arrondi ainsi que leur fermeture à lacets.'),
(31, 'Maserati', 3, 'Montre Competizione Bleu R8853100029', '179.00', 'Montre de la collection Competizione, 3 aiguilles date, composée d\'un boitier de 43mm en acier, d\'un cadran bleu et d\'un bracelet en acier.'),
(32, 'Asics', 2, 'Baskets basses Gel-Nyc', '150.00', 'Ces baskets basses Asics conçues en mesh et synthétique suédé, séduisent par leur bout arrondi, leur fermeture à lacets ainsi que leur languette signature.'),
(33, 'Prada', 3, 'Casquette de baseball en Re-Nylon', '480.00', 'Logo triangulaire en métal émaillé Doublure en coton'),
(34, 'Birkenstock', 2, 'Sabots plats Boston SFB en cuir', '160.00', 'Ces sabots plats Birkenstock conçus en cuir séduisent par leur bout arrondi ainsi que leur fermeture à boucle ardillon siglée. Modèle Etroit.'),
(35, 'Seiko', 3, 'Montre Homme Classiques Noir SUR311P1', '260.00', 'Montre Seiko Classique homme, boitier 40,2mm en acier rond, 3 aiguilles date, cadran noir index et bracelet acier. Etanchéité 100m. Verre saphir.');

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `civ` enum('madame','monsieur') NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `User`
--

INSERT INTO `User` (`id`, `firstname`, `lastname`, `civ`, `email`, `password_hash`) VALUES
(6, 'Fréderic', 'Mora', 'monsieur', 'frederic.mora@unilim.fr', '$2y$10$Vsx0oQmYtITIxaMvrAe/.OqUzqJQOVWJ8ImIEOuLKxfT40LVt.fE.');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Gallery`
--
ALTER TABLE `Gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Index pour la table `Order`
--
ALTER TABLE `Order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `OrderItem`
--
ALTER TABLE `OrderItem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Index pour la table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Category`
--
ALTER TABLE `Category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `Gallery`
--
ALTER TABLE `Gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `Order`
--
ALTER TABLE `Order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `OrderItem`
--
ALTER TABLE `OrderItem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `Product`
--
ALTER TABLE `Product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Gallery`
--
ALTER TABLE `Gallery`
  ADD CONSTRAINT `Gallery_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`);

--
-- Contraintes pour la table `Order`
--
ALTER TABLE `Order`
  ADD CONSTRAINT `Order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

--
-- Contraintes pour la table `OrderItem`
--
ALTER TABLE `OrderItem`
  ADD CONSTRAINT `OrderItem_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Order` (`id`),
  ADD CONSTRAINT `OrderItem_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`);

--
-- Contraintes pour la table `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `category` FOREIGN KEY (`category`) REFERENCES `Category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

