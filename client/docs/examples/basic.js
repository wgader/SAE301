import { Router } from '../../../src/lib/router.js';

const app = document.getElementById('app');

const router = new Router();

router
  .addRoute('/', () => {
    app.innerHTML = '<h2>Accueil</h2><p>Bienvenue sur la page d\'accueil.</p>';
  })
  .addRoute('/about', () => {
    app.innerHTML = '<h2>À propos</h2><p>Ceci est un exemple basique du Router.</p>';
  })
  .addRoute('*', () => {
    app.innerHTML = '<h2>404</h2><p>Page non trouvée.</p>';
  });

// Démarrer et s'assurer d'être sur la route correcte
router.start();
