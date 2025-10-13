
import { Router } from "./lib/router.js";
import { AboutPage } from "./page/about-page.js";
import { HomePage } from "./page/home-page.js";
import { ProductPage } from "./page/product-page.js";
import { The404Page } from "./page/404-page.js";

// Exemple d'utilisation avec authentification
const router = new Router();


router.addRoute("/", HomePage);
router.addRoute("/products", ProductPage);
router.addRoute("/about", AboutPage);
router.addRoute("*", The404Page);

// Démarrer le routeur
router.start();