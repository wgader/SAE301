
import { Router } from "./lib/router.js";
import { AboutPage } from "./pages/about/page.js";
import { HomePage } from "./pages/home/page.js";
import { ProductsPage } from "./pages/products/page.js";
import { ProductDetailPage } from "./pages/productDetail/page.js";
import { ProfilePage } from "./pages/profile/page.js";
import { AuthData } from "./data/auth.js";

import { RootLayout } from "./layouts/root/layout.js";
import { The404Page } from "./pages/404/page.js";
import { SignUpPage } from "./pages/signup/page.js";
import { SignInPage } from "./pages/signin/page.js";

const router = new Router('app', { loginPath: '/signin' });

// Vérifier si user connecté via la session AVANT de démarrer le router
(async () => {
  const result = await AuthData.getCurrentUser();
  if (result && result.authenticated) {
    router.setAuth(true);
  }
  
  // Configurer les routes
  router.addLayout("/", RootLayout);

  router.addRoute("/", HomePage);
  router.addRoute("/about", AboutPage);

  router.addRoute("/products", ProductsPage);
  router.addRoute("/category/:id", ProductsPage);
  router.addRoute("/products/:id/:slug", ProductDetailPage);
  router.addRoute("/signin", SignInPage, { useLayout: false });
  router.addRoute("/signup", SignUpPage, { useLayout: false });
  router.addRoute("/profile", ProfilePage, { requireAuth: true });

  router.addRoute("*", The404Page);

  router.start();
})();













  