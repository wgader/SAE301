import { Router } from '../../../src/lib/router.js';

const app = document.getElementById('app');

const products = [
  { id: '1', name: 'Chaise' },
  { id: '2', name: 'Table' },
  { id: '3', name: 'Lampe' }
];

const router = new Router();

router
  .addRoute('/', () => {
    app.innerHTML = `
      <h2>Liste des produits</h2>
      <ul>
        ${products.map(p => `<li><a href="/products/${p.id}" data-link>${p.name}</a></li>`).join('')}
      </ul>
    `;
  })
  .addRoute('/products/:id', ({ id }) => {
    const p = products.find(x => x.id === id);
    if (!p) {
      app.innerHTML = '<h2>Produit introuvable</h2>';
      return;
    }
    app.innerHTML = `
      <h2>Détails produit</h2>
      <p>id: ${p.id}</p>
      <p>nom: ${p.name}</p>
      <p><a href="/" data-link>Retour</a></p>
    `;
  })
  .addRoute('*', () => {
    app.innerHTML = '<h2>404</h2>';
  });

router.start();
