<?php
require_once "src/Controller/EntityController.php";
require_once "src/Repository/UserRepository.php";

/**
 * Classe AuthController
 * 
 * Gère l'authentification des utilisateurs
 */
class AuthController extends EntityController {

    private UserRepository $repository;

    public function __construct() {
        $this->repository = new UserRepository();
    }

    /**
     * Traite les requêtes POST
     * 
     * POST /api/auth   → Connexion (login)
     * 
     * @param HttpRequest $request
     * @return mixed Données utilisateur si succès, false sinon
     */
    protected function processPostRequest(HttpRequest $request) {
        $json = $request->getJson();
        $data = json_decode($json);
        
        if(empty($data)) {
            http_response_code(400);
            return ['error' => 'Données JSON invalides'];
        }

        if (!$data || !isset($data->email) || !isset($data->password)) {
            http_response_code(400);
            return ['error' => 'Email et mot de passe requis'];
        }
        
        $email = $data->email;
        $password = $data->password;
        
        $user = $this->repository->findByEmail($email);
        
        if (!$user) {
            http_response_code(401);
            return ['error' => 'Email ou mot de passe incorrect'];
        }
        
        if (!password_verify($password, $user->getPasswordHash())) {
            http_response_code(401);
            return ['error' => 'Email ou mot de passe incorrect'];
        }
        
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        $_SESSION['user_id'] = $user->getId();
        $_SESSION['user_email'] = $user->getEmail();
        $_SESSION['user_firstname'] = $user->getFirstname();
        $_SESSION['user_lastname'] = $user->getLastname();
        
        return [
            'success' => true,
            'message' => 'Connexion réussie',
            'user' => $user
        ];
    }

    /**
     * Traite les requêtes GET
     * 
     * GET /api/auth   → Récupère l'utilisateur connecté
     * 
     * @param HttpRequest $request
     * @return mixed Utilisateur connecté ou false
     */
    protected function processGetRequest(HttpRequest $request) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        if (!isset($_SESSION['user_id'])) {
            return [
                'authenticated' => false,
                'message' => 'Non connecté'
            ];
        }
        
        $user = $this->repository->find($_SESSION['user_id']);
        
        if (!$user) {
            return [
                'authenticated' => false,
                'message' => 'Utilisateur introuvable'
            ];
        }
        
        return [
            'authenticated' => true,
            'user' => $user
        ];
    }

    /**
     * Traite les requêtes DELETE
     * 
     * DELETE /api/auth   → Déconnexion (logout)
     * 
     * @param HttpRequest $request
     * @return mixed Message de succès
     */
    protected function processDeleteRequest(HttpRequest $request) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        session_destroy();
        
        return [
            'success' => true,
            'message' => 'Déconnexion réussie'
        ];
    }

    /**
     * Traite les requêtes PATCH
     * 
     * PATCH /api/auth   → Met à jour les informations du profil
     * PATCH /api/auth/password   → Change le mot de passe
     * 
     * @param HttpRequest $request
     * @return mixed Message de succès ou erreur
     */
    protected function processPatchRequest(HttpRequest $request) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            return ['error' => 'Non authentifié'];
        }
        
        // Changement de mot de passe : /api/auth/password
        if ($request->getId() === 'password') {
            return $this->changePassword($request);
        }
        
        // Mise à jour du profil : /api/auth
        return $this->updateProfile($request);
    }
    
    /**
     * Met à jour les informations du profil utilisateur
     * 
     * @param HttpRequest $request
     * @return array
     */
    private function updateProfile(HttpRequest $request) {
        $json = $request->getJson();
        $data = json_decode($json);
        
        if (empty($data)) {
            http_response_code(400);
            return ['error' => 'Données JSON invalides'];
        }
        
        $userId = $_SESSION['user_id'];
        $user = $this->repository->find($userId);
        
        if (!$user) {
            http_response_code(404);
            return ['error' => 'Utilisateur introuvable'];
        }
        
        // Mise à jour des champs
        if (isset($data->civ)) {
            $user->setCiv($data->civ);
        }
        if (isset($data->lastname)) {
            $user->setLastname($data->lastname);
        }
        if (isset($data->firstname)) {
            $user->setFirstname($data->firstname);
        }
        if (isset($data->email)) {
            // Vérifier si l'email n'est pas déjà utilisé par un autre utilisateur
            $existingUser = $this->repository->findByEmail($data->email);
            if ($existingUser && $existingUser->getId() !== $userId) {
                http_response_code(409);
                return ['error' => 'Cet email est déjà utilisé'];
            }
            $user->setEmail($data->email);
        }
        
        // Sauvegarder les modifications
        $success = $this->repository->update($user);
        
        if (!$success) {
            http_response_code(500);
            return ['error' => 'Erreur lors de la mise à jour'];
        }
        
        // Mettre à jour la session
        $_SESSION['user_email'] = $user->getEmail();
        $_SESSION['user_firstname'] = $user->getFirstname();
        $_SESSION['user_lastname'] = $user->getLastname();
        
        return [
            'success' => true,
            'message' => 'Profil mis à jour avec succès',
            'user' => $user
        ];
    }
    
    /**
     * Change le mot de passe de l'utilisateur
     * 
     * @param HttpRequest $request
     * @return array
     */
    private function changePassword(HttpRequest $request) {
        $json = $request->getJson();
        $data = json_decode($json);
        
        if (empty($data)) {
            http_response_code(400);
            return ['error' => 'Données JSON invalides'];
        }
        
        if (!isset($data->current_password) || !isset($data->new_password)) {
            http_response_code(400);
            return ['error' => 'Mot de passe actuel et nouveau mot de passe requis'];
        }
        
        $userId = $_SESSION['user_id'];
        $user = $this->repository->find($userId);
        
        if (!$user) {
            http_response_code(404);
            return ['error' => 'Utilisateur introuvable'];
        }
        
        // Vérifier le mot de passe actuel
        if (!password_verify($data->current_password, $user->getPasswordHash())) {
            http_response_code(401);
            return ['error' => 'Mot de passe actuel incorrect'];
        }
        
        // Valider le nouveau mot de passe (même regex que signup)
        if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/', $data->new_password)) {
            http_response_code(400);
            return ['error' => 'Le nouveau mot de passe ne respecte pas les critères de sécurité'];
        }
        
        // Hasher et sauvegarder le nouveau mot de passe
        $user->setPasswordHash(password_hash($data->new_password, PASSWORD_BCRYPT));
        $success = $this->repository->update($user);
        
        if (!$success) {
            http_response_code(500);
            return ['error' => 'Erreur lors du changement de mot de passe'];
        }
        
        return [
            'success' => true,
            'message' => 'Mot de passe changé avec succès'
        ];
    }

    /**
     * Non utilisé pour l'authentification
     */
    protected function processPutRequest(HttpRequest $request) {
        return false;
    }
}
