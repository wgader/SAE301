<?php
require_once "src/Repository/EntityRepository.php";
require_once "src/Class/User.php";

/**
 * Classe UserRepository
 * 
 * Gère l'accès aux données de l'entité User
 * Toutes les opérations CRUD doivent passer par cette classe
 */
class UserRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }

    /**
     * Récupère un User par son ID
     * 
     * @param mixed $id L'identifiant du User
     * @return ?User L'objet User ou null si non trouvé
     */
    public function find($id): ?User {
        $requete = $this->cnx->prepare("SELECT * FROM User WHERE id=:value");
        $requete->bindParam(':value', $id);
        $requete->execute();
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        if ($answer == false) return null;
        $u = new User($answer->id);
        $u->setFirstname($answer->firstname);
        $u->setLastname($answer->lastname);
        $u->setCiv($answer->civ);
        $u->setEmail($answer->email);
        $u->setPasswordHash($answer->password_hash);
        return $u;
    }

    /**
     * Récupère tous les Users
     * 
     * @return array Tableau d'objets User
     */
    public function findAll(): array {
        $requete = $this->cnx->prepare("SELECT * FROM User");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
        $res = [];
        foreach ($answer as $obj) {
            $u = new User($obj->id);
            $u->setFirstname($obj->firstname);
            $u->setLastname($obj->lastname);
            $u->setCiv($obj->civ);
            $u->setEmail($obj->email);
            $u->setPasswordHash($obj->password_hash);
            $res[] = $u;
        }
        return $res;
    }

    /**
     * Sauvegarde un nouveau User dans la base de données
     * 
     * @param mixed $user L'objet User à sauvegarder
     * @return bool true si succès, false sinon
     */
    public function save($user): bool {
        $requete = $this->cnx->prepare(
            "INSERT INTO User (firstname, lastname, civ, email, password_hash) VALUES (:firstname, :lastname, :civ, :email, :password_hash)"
        );
        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();
        $civ = $user->getCiv();
        $email = $user->getEmail();
        $password_hash = $user->getPasswordHash();
        $requete->bindParam(':firstname', $firstname);
        $requete->bindParam(':lastname', $lastname);
        $requete->bindParam(':civ', $civ);
        $requete->bindParam(':email', $email);
        $requete->bindParam(':password_hash', $password_hash);
        $answer = $requete->execute();
        if ($answer) {
            $id = $this->cnx->lastInsertId();
            $user->setId($id);
            return true;
        }
        return false;
    }

    /**
     * Supprime un User de la base de données
     * 
     * @param mixed $id L'identifiant du User à supprimer
     * @return bool true si succès, false sinon
     */
    public function delete($id): bool {
        $requete = $this->cnx->prepare("DELETE FROM User WHERE id=:value");
        $requete->bindParam(':value', $id);
        return $requete->execute();
    }

    /**
     * Met à jour un User existant dans la base de données
     * 
     * @param mixed $user L'objet User à mettre à jour
     * @return bool true si succès, false sinon
     */
    public function update($user): bool {
        $requete = $this->cnx->prepare(
            "UPDATE User SET firstname=:firstname, lastname=:lastname, civ=:civ, email=:email, password_hash=:password_hash WHERE id=:id"
        );
        $id = $user->getId();
        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();
        $civ = $user->getCiv();
        $email = $user->getEmail();
        $password_hash = $user->getPasswordHash();
        $requete->bindParam(':id', $id);
        $requete->bindParam(':firstname', $firstname);
        $requete->bindParam(':lastname', $lastname);
        $requete->bindParam(':civ', $civ);
        $requete->bindParam(':email', $email);
        $requete->bindParam(':password_hash', $password_hash);
        return $requete->execute();
    }

    /**
     * Trouve un utilisateur par son email
     */
    public function findByEmail($email): ?User {
        $requete = $this->cnx->prepare("SELECT * FROM User WHERE email=:email");
        $requete->bindParam(':email', $email);
        $requete->execute();
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        
        if ($answer == false) return null;
        
        $u = new User((int)$answer->id);
        $u->setFirstname($answer->firstname);
        $u->setLastname($answer->lastname);
        $u->setCiv($answer->civ);
        $u->setEmail($answer->email);
        $u->setPasswordHash($answer->password_hash);
        return $u;
    }
}
