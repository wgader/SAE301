import { Router } from '../../../src/lib/router.js';

const app = document.getElementById('app');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

const router = new Router({ loginPath: '/login' });

router
  .addRoute('/', () => {
    app.innerHTML = '<h2>Accueil public</h2><p>Tout le monde peut voir cette page.</p>';
  })
  .addRoute('/private', () => {
    app.innerHTML = '<h2>Espace privé</h2><p>Contenu réservé aux utilisateurs connectés.</p>';
  }, { requireAuth: true })
  .addRoute('/login', () => {
    app.innerHTML = `
      <h2>Connexion</h2>
      <p>Cliquez sur le bouton Login pour simuler une connexion.</p>
    `;
  })
  .addRoute('*', () => {
    app.innerHTML = '<h2>404</h2>';
  });

router.start();

loginBtn.addEventListener('click', () => {
  // Simuler un login
  router.login();
});

logoutBtn.addEventListener('click', () => {
  router.logout();
});
