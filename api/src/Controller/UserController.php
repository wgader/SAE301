<?php
require_once "src/Controller/EntityController.php";
require_once "src/Repository/UserRepository.php";

/**
 * Classe UserController
 * 
 * Gère les requêtes HTTP concernant l'entité User
 * Hérite de Controller pour bénéficier de la méthode jsonResponse()
 */
class UserController extends EntityController {

    private UserRepository $users;

    public function __construct() {
        $this->users = new UserRepository();
    }

    /**
     * Traite les requêtes GET
     * 
     * GET /api/{strtolower(User)}s        → Récupère tous les Users
     * GET /api/{strtolower(User)}s/{id}   → Récupère un User spécifique
     * 
     * @param HttpRequest $request
     * @return mixed Données à convertir en JSON, ou false en cas d'erreur
     */
    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId();
        $email = $request->getParam('email');

        if ($id) {
            $user = $this->users->find($id);
            return $user == null ? false : $user;
        }
        
        if( $email ) {
            $user = $this->users->findByEmail($email);
            return $user == null ? false : $user;
        }
        
        else {
            // GET /api/{strtolower(User)}s
            return $this->users->findAll();
        }
    }

    /**
     * Traite les requêtes POST
     * 
     * POST /api/{strtolower(User)}s       → Crée un nouveau User
     * 
     * @param HttpRequest $request
     * @return mixed Le User créé avec son ID, ou false en cas d'erreur
     */
    protected function processPostRequest(HttpRequest $request) {
        $firstname = $request->getParam('firstname');
        $lastname = $request->getParam('lastname');
        $email = $request->getParam('email');
        $password = $request->getParam('password');
        $civ = $request->getParam('civ');

        if (!$firstname || !$lastname || !$email || !$password || !$civ) {
            http_response_code(400);
            return ['error' => 'Tous les champs sont obligatoires'];
        }
        
        $civ = strtolower($civ);
        if (!in_array($civ, ['madame','monsieur'])) {
            http_response_code(400);
            return ['error' => 'Civilité invalide'];
        }

        // Vérifier si l'email existe déjà
        $existingUser = $this->users->findByEmail($email);
        if ($existingUser) {
            http_response_code(400);
            return ['error' => 'Cette adresse email est déjà utilisée'];
        }

        $u = new User(0);
        $u->setFirstname($firstname);
        $u->setLastname($lastname);
        $u->setCiv($civ);
        $u->setEmail($email);
        $u->setPasswordHash(password_hash($password, PASSWORD_DEFAULT));

        $ok = $this->users->save($u);
        
        if (!$ok) {
            http_response_code(500);
            return ['error' => 'Erreur lors de la création du compte'];
        }
        
        return $u;
    }

    /**
     * Traite les requêtes DELETE
     * 
     * DELETE /api/{strtolower(User)}s/{id} → Supprime un User
     * 
     * @param HttpRequest $request
     * @return mixed true si supprimé, false sinon
     */
    protected function processDeleteRequest(HttpRequest $request) {
        $id = $request->getId();
        if (!$id) return false;
        return $this->users->delete($id);
    }

    /**
     * Traite les requêtes PATCH
     * 
     * PATCH /api/{strtolower(User)}s/{id}  → Met à jour un User
     * 
     * @param HttpRequest $request
     * @return mixed Le User modifié, ou false en cas d'erreur
     */
    protected function processPatchRequest(HttpRequest $request) {
        $id = $request->getId();
        if (!$id) return false;
        $u = $this->users->find($id);
        if (!$u) return false;

        $json = $request->getJson();
        $obj = json_decode($json);
        if (!$obj) return false;

        if (isset($obj->firstname)) $u->setFirstname((string)$obj->firstname);
        if (isset($obj->lastname)) $u->setLastname((string)$obj->lastname);
        if (isset($obj->email)) $u->setEmail((string)$obj->email);
        if (isset($obj->civ)) {
            $civ = strtolower((string)$obj->civ);
            if (in_array($civ, ['madame','monsieur'])) $u->setCiv($civ);
        }
        if (isset($obj->password)) {
            $u->setPasswordHash(password_hash((string)$obj->password, PASSWORD_BCRYPT));
        }

        $ok = $this->users->update($u);
        return $ok ? $u : false;
    }

    /**
     * Traite les requêtes PUT
     * 
     * PUT /api/{strtolower(User)}s/{id}    → Remplace complètement un User
     * 
     * @param HttpRequest $request
     * @return mixed Le User remplacé, ou false en cas d'erreur
     */
    protected function processPutRequest(HttpRequest $request) {
        // TODO: Implémenter le remplacement complet (optionnel)
        // Note : PATCH est généralement préféré à PUT
        return false;
    }
}
