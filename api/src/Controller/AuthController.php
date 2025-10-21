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
        $email = $request->getParam('email');
        $password = $request->getParam('password');
        
        if (!$email || !$password) {
            http_response_code(400);
            return ['error' => 'Email et mot de passe requis'];
        }
        
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
     * Non utilisé pour l'authentification
     */
    protected function processPatchRequest(HttpRequest $request) {
        return false;
    }

    /**
     * Non utilisé pour l'authentification
     */
    protected function processPutRequest(HttpRequest $request) {
        return false;
    }
}
