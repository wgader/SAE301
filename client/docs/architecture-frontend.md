# Architecture Frontend — Application Client SPA

## Vue d'ensemble

Cette application frontend est une **Single Page Application (SPA)** qui utilise une architecture modulaire basée sur le pattern **MVC local par page**. Elle est conçue dans un cadre pédagogique pour comprendre les principes fondamentaux du développement frontend moderne.

### Principes directeurs

- **Router centralisé** : gère la navigation entre les pages
- **Pages autonomes** : chaque page est un mini-MVC indépendant
- **Composants réutilisables** : UI découplée dans `ui/`
- **Loaders de données** : logique de récupération centralisée dans `data/`
- **Pas de framework** : JavaScript vanilla pour comprendre les concepts

---

## Structure des dossiers

```
client/
├── index.html              # Point d'entrée HTML
├── src/
│   ├── main.js            # Configuration du router et routes
│   ├── global.css         # Styles globaux
│   │
│   ├── lib/               # Bibliothèques utilitaires
│   │   ├── router.js      # Routeur SPA
│   │   ├── api-request.js # Wrapper fetch pour l'API
│   │   └── utils.js       # Fonctions utilitaires
│   │
│   ├── page/              # Pages de l'application (MVC local)
│   │   ├── home-page.js
│   │   ├── product-page.js
│   │   ├── about-page.js
│   │   └── 404-page.js
│   │
│   ├── ui/                # Composants visuels (Vue)
│   │   └── product/
│   │       ├── index.js   # Logique de rendu
│   │       └── template.html  # Template HTML
│   │
│   └── data/              # Loaders de données (Modèle)
│       └── product.js     # Récupération des produits
│
└── docs/                  # Documentation
```

---

## Architecture d'une page (Pattern MVC local)

Chaque page est organisée selon le pattern **MVC** :

```javascript
// Exemple : product-page.js

// MODEL : État local de la page
let M = {
    products: []
};

// CONTROLLER : Orchestration
let C = {};
C.init = async function() {
    M.products = await ProductData.fetchAll();  // Charger les données
    V.init(M.products);                          // Mettre à jour la vue
}

// VIEW : Rendu
let V = {};
V.init = function(data) {
    let app = document.querySelector("#app");
    app.innerHTML = ProductView.render(data);    // Utiliser un composant UI
}

// Export de la fonction d'initialisation
export function ProductPage() {
    C.init();
}
```

### Responsabilités

| Couche | Rôle | Fichiers |
|--------|------|----------|
| **Model (M)** | Stocke l'état local de la page | Variables dans `page/*.js` |
| **Controller (C)** | Orchestre le chargement et l'affichage | Fonctions `C.init()`, gestion d'événements |
| **View (V)** | Affiche les données via les composants UI | Appelle les composants depuis `ui/` |

---

## Les composants UI (`ui/`)

Les composants sont des modules réutilisables pour le rendu visuel.

### Structure d'un composant

```
ui/
└── product/
    ├── index.js        # Logique de rendu
    └── template.html   # Template HTML
```

### Exemple : `ui/product/index.js`

```javascript
import { genericRenderer } from "../../lib/utils.js";
import template from "./template.html?raw";

let ProductView = {
  render: function (data) {
    let html = "";
    for (let obj of data) {
      html += genericRenderer(template, obj);
    }
    return html;
  },
};

export { ProductView };
```

### Template : `ui/product/template.html`

```html
<article class="product-card">
  <span>{{id}}</span>
  <span>{{name}}</span>
</article>
```

**Le système de templates** :
- Utilise des placeholders `{{propriété}}`
- La fonction `genericRenderer()` remplace les placeholders par les valeurs

---

## Les loaders de données (`data/`)

Les loaders encapsulent la logique de récupération des données (API, données factices, localStorage...).

### Structure d'un loader

```javascript
// data/product.js
import { getRequest } from '../lib/api-request.js';

let ProductData = {};

// Récupérer tous les produits
ProductData.fetchAll = async function() {
    let data = await getRequest('products');
    return data;
}

// Récupérer un produit par ID
ProductData.fetch = async function(id) {
    let data = await getRequest('products/' + id);
    return data;
}

export { ProductData };
```

### Avantages
- **Centralisation** : toute la logique API au même endroit
- **Réutilisabilité** : utilisable par plusieurs pages
- **Testabilité** : facile à mocker pour les tests
- **Flexibilité** : peut utiliser des données factices en développement

---

## Le routeur (`lib/router.js`)

Le routeur gère la navigation sans rechargement de page.

### Fonctionnalités

- Routes statiques : `/`, `/about`
- Routes dynamiques : `/products/:id`
- Route 404 : `*` (catch-all)
- Guards d'authentification : `requireAuth: true`
- Navigation : `router.navigate('/path')`

### Configuration dans `main.js`

```javascript
import { Router } from "./lib/router.js";
import { HomePage } from "./page/home-page.js";
import { ProductPage } from "./page/product-page.js";

const router = new Router();

router.addRoute("/", HomePage);
router.addRoute("/products", ProductPage);
router.addRoute("/products/:id", ProductDetailPage);
router.addRoute("*", The404Page);

router.start();
```

---

## Guide : Ajouter une nouvelle page

Voici le processus complet pour ajouter une page "Catégories" à l'application.

### Étape 1 : Créer le loader de données

**Fichier** : `src/data/category.js`

```javascript
import { getRequest } from '../lib/api-request.js';

let CategoryData = {};

CategoryData.fetchAll = async function() {
    let data = await getRequest('categories');
    return data;
}

CategoryData.fetch = async function(id) {
    let data = await getRequest('categories/' + id);
    return data;
}

export { CategoryData };
```

---

### Étape 2 : Créer le composant UI

**Fichier** : `src/ui/category/template.html`

```html
<div class="category-card">
  <h3>{{name}}</h3>
  <p>ID: {{id}}</p>
</div>
```

**Fichier** : `src/ui/category/index.js`

```javascript
import { genericRenderer } from "../../lib/utils.js";
import template from "./template.html?raw";

let CategoryView = {
  render: function (data) {
    let html = "";
    for (let obj of data) {
      html += genericRenderer(template, obj);
    }
    return html;
  },
};

export { CategoryView };
```

---

### Étape 3 : Créer la page (MVC local)

**Fichier** : `src/page/category-page.js`

```javascript
import { CategoryData } from "../data/category.js";
import { CategoryView } from "../ui/category/index.js";

// MODEL
let M = {
    categories: []
};

// CONTROLLER
let C = {};

C.init = async function() {
    M.categories = await CategoryData.fetchAll();
    V.init(M.categories);
}

// VIEW
let V = {};

V.init = function(data) {
    let app = document.querySelector("#app");
    app.innerHTML = `
        <h1>Liste des catégories</h1>
        ${CategoryView.render(data)}
    `;
}

// Export
export function CategoryPage() {
    C.init();
}
```

---

### Étape 4 : Ajouter la route

**Fichier** : `src/main.js`

```javascript
import { Router } from "./lib/router.js";
import { HomePage } from "./page/home-page.js";
import { ProductPage } from "./page/product-page.js";
import { CategoryPage } from "./page/category-page.js";  // ← Import

const router = new Router();

router.addRoute("/", HomePage);
router.addRoute("/products", ProductPage);
router.addRoute("/categories", CategoryPage);            // ← Route
router.addRoute("*", The404Page);

router.start();
```

---

### Étape 5 : Ajouter un lien de navigation (optionnel)

Dans `index.html` ou dans une page :

```html
<nav>
  <a href="/" data-link>Accueil</a>
  <a href="/products" data-link>Produits</a>
  <a href="/categories" data-link>Catégories</a>
</nav>
```

**Important** : l'attribut `data-link` est nécessaire pour que le routeur intercepte le clic.

---

## Gestion des événements

### Événements simples (dans la page)

```javascript
// Dans le Controller
C.handleClick = function(e) {
    console.log("Cliqué sur", e.target);
}

// Dans la View
V.init = function(data) {
    let app = document.querySelector("#app");
    app.innerHTML = CategoryView.render(data);
    
    // Attacher les événements après le rendu
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', C.handleClick);
    });
}
```

### Événements complexes (formulaires)

```javascript
// Controller
C.handleSubmit = async function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    
    // Envoyer à l'API
    await CategoryData.create({ name });
    
    // Rafraîchir la page
    await C.init();
}

// View
V.init = function(data) {
    app.innerHTML = `
        <form id="category-form">
            <input name="name" />
            <button>Ajouter</button>
        </form>
        ${CategoryView.render(data)}
    `;
    
    document.querySelector('#category-form')
        .addEventListener('submit', C.handleSubmit);
}
```

---

## Routes dynamiques

Pour une page de détail avec paramètre d'URL :

### Route avec paramètre

```javascript
// main.js
router.addRoute("/categories/:id", CategoryDetailPage);
```

### Page avec récupération du paramètre

```javascript
// page/category-detail-page.js
export function CategoryDetailPage(params) {
    C.init(params.id);  // params.id contient la valeur
}

C.init = async function(id) {
    M.category = await CategoryData.fetch(id);
    V.init(M.category);
}
```

---

## Routes protégées (authentification)

Pour protéger une page :

```javascript
// main.js
router.addRoute("/admin", AdminPage, { requireAuth: true });

// Se connecter
router.setAuth(true);

// Se déconnecter
router.logout();
```

Voir la documentation `router.md` pour plus de détails sur l'authentification.

---

## Bonnes pratiques

### ✅ À faire

- **Un loader par ressource** : `ProductData`, `CategoryData`
- **Un composant par type d'élément** : `ProductView`, `CategoryCard`
- **MVC clair dans chaque page** : séparer M, C, V
- **Événements dans le Controller** : pas dans la Vue
- **Utiliser `data-link`** pour les liens internes
- **Async/await** pour les appels API

### ❌ À éviter

- Mélanger logique métier et affichage
- Accéder directement à l'API depuis une page (toujours passer par un loader)
- Oublier `data-link` sur les liens (rechargement de page)
- Manipulation DOM directe complexe (préférer re-render)
- Variables globales (utiliser le Model local M)

---

## Outils de développement

### Démarrer le serveur de développement

```bash
cd client
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Construire pour la production

```bash
npm run build
```

Les fichiers optimisés seront dans `client/dist/`

---

## Flux de données complet

```
1. Utilisateur clique sur un lien avec data-link
   ↓
2. Router intercepte et appelle la fonction de page
   ↓
3. Page : Controller.init()
   ↓
4. Controller charge les données via un Loader (data/)
   ↓
5. Loader fait un fetch() vers l'API
   ↓
6. API retourne du JSON
   ↓
7. Controller stocke dans le Model (M)
   ↓
8. Controller appelle View.init(data)
   ↓
9. View utilise un composant UI pour générer le HTML
   ↓
10. HTML injecté dans #app
   ↓
11. Controller attache les événements sur le DOM
```

---

## Exemple complet : Page de liste + détail

### Liste des produits

```javascript
// page/product-list-page.js
import { ProductData } from "../data/product.js";
import { ProductView } from "../ui/product/index.js";

let M = { products: [] };
let C = {};
let V = {};

C.init = async function() {
    M.products = await ProductData.fetchAll();
    V.init(M.products);
}

V.init = function(data) {
    let app = document.querySelector("#app");
    app.innerHTML = `
        <h1>Nos produits</h1>
        <div class="product-grid">
            ${ProductView.render(data)}
        </div>
    `;
}

export function ProductListPage() {
    C.init();
}
```

### Détail d'un produit

```javascript
// page/product-detail-page.js
import { ProductData } from "../data/product.js";

let M = { product: null };
let C = {};
let V = {};

C.init = async function(id) {
    M.product = await ProductData.fetch(id);
    V.init(M.product);
}

V.init = function(product) {
    let app = document.querySelector("#app");
    app.innerHTML = `
        <h1>${product.name}</h1>
        <p>ID: ${product.id}</p>
        <p>Catégorie: ${product.category}</p>
        <a href="/products" data-link>← Retour</a>
    `;
}

export function ProductDetailPage(params) {
    C.init(params.id);
}
```

### Routes

```javascript
// main.js
router.addRoute("/products", ProductListPage);
router.addRoute("/products/:id", ProductDetailPage);
```

---

## Comparaison avec des frameworks

| Concept | Notre architecture | React | Vue |
|---------|-------------------|-------|-----|
| **Routage** | Router custom | React Router | Vue Router |
| **Page** | Fonction MVC | Component | Component |
| **Composant** | Objet + template | JSX Component | SFC |
| **Données** | Loader + fetch | Redux/Context | Vuex/Pinia |
| **État** | Variable M | useState/useReducer | ref/reactive |
| **Événements** | addEventListener | onClick={} | @click |

---

## Pour aller plus loin

Une fois les concepts maîtrisés, vous pouvez :

1. **Ajouter un state manager** global (type Redux simplifié)
2. **Implémenter un système de composants** plus avancé (slots, props)
3. **Créer des hooks** personnalisés (type React hooks)
4. **Ajouter du TypeScript** pour le typage
5. **Migrer vers un framework** (React, Vue, Svelte) en comprenant ce qui se passe sous le capot

---

## Ressources

- Documentation du Router : `client/docs/router.md`
- Exemples de composants : `client/src/ui/`
- Exemples de pages : `client/src/page/`
- API Backend : `api/docs/`

---

## Récapitulatif : Checklist nouvelle page

- [ ] Créer le loader dans `src/data/{resource}.js`
- [ ] Créer le template dans `src/ui/{component}/template.html`
- [ ] Créer le composant dans `src/ui/{component}/index.js`
- [ ] Créer la page dans `src/page/{name}-page.js` avec M, C, V
- [ ] Ajouter la route dans `src/main.js`
- [ ] Ajouter le lien de navigation (optionnel)
- [ ] Tester dans le navigateur

---

Cette architecture est volontairement simple et pédagogique. Elle permet de comprendre les fondamentaux avant de passer à des outils plus sophistiqués.
