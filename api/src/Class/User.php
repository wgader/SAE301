<?php
require_once 'Entity.php';

/**
 * Class User
 * 
 * Représente un objet User
 * 
 * Implémente l'interface JsonSerializable pour permettre la conversion en JSON
 */
class User extends Entity {
    private int $id;
    private ?string $firstname = null;
    private ?string $lastname = null;
    private ?string $civ = null; // 'madame' | 'monsieur'
    private ?string $email = null;
    private ?string $password_hash = null;

    public function __construct(int $id) {
        $this->id = $id;
    }

    /**
     * Définit comment convertir l'objet User en JSON
     * 
     * @return mixed Tableau associatif représentant l'objet
     */
    public function jsonSerialize(): mixed {
        return [
            "id" => $this->id,
            "firstname" => $this->firstname,
            "lastname" => $this->lastname,
            "civ" => $this->civ,
            "email" => $this->email,
            // on ne montre pas password_hash pour des raisons de sécurité
        ];
    }

    /**
     * Get the value of id
     */
    public function getId(): int {
        return $this->id;
    }

    /**
     * Set the value of id
     */
    public function setId(int $id): self {
        $this->id = $id;
        return $this;
    }

    public function getFirstname(): ?string { return $this->firstname; }
    public function setFirstname(string $firstname): self { $this->firstname = $firstname; return $this; }

    public function getLastname(): ?string { return $this->lastname; }
    public function setLastname(string $lastname): self { $this->lastname = $lastname; return $this; }

    public function getCiv(): ?string { return $this->civ; }
    public function setCiv(string $civ): self { $this->civ = $civ; return $this; }

    public function getEmail(): ?string { return $this->email; }
    public function setEmail(string $email): self { $this->email = $email; return $this; }

    public function getPasswordHash(): ?string { return $this->password_hash; }
    public function setPasswordHash(string $hash): self { $this->password_hash = $hash; return $this; }
}
