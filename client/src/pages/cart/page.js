import { CartData } from "../../data/cart.js";
import { HeaderView } from "../../ui/header/index.js";
import { htmlToFragment, genericRenderer } from "../../lib/utils.js";
import template from "./template.html?raw";
import emptyTemplate from "../../ui/cart/empty.template.html?raw";
import cartTemplate from "../../ui/cart/template.html?raw";
import itemTemplate from "../../ui/cart/item.template.html?raw";

let M = {
    cart: {}
};

let C = {};

/**
 * Gère le changement de quantité d'un article
 */
C.handleQuantityChange = function(e) {
    const select = e.target;
    const productId = parseInt(select.dataset.qty);
    const newQuantity = parseInt(select.value);
    
    CartData.updateQuantity(productId, newQuantity);
    
    // Rafraîchir l'affichage
    V.refreshCartContent();
    
    // Mettre à jour le badge
    HeaderView.updateCartBadge(document);
};

/**
 * Gère la suppression d'un article
 */
C.handleRemoveItem = function(e) {
    const btn = e.target.closest('button[data-remove]');
    if (!btn) return;
    
    const productId = parseInt(btn.dataset.remove);
    
    if (confirm('Voulez-vous retirer cet article du panier ?')) {
        CartData.removeItem(productId);
        V.refreshCartContent();
        
        // Mettre à jour le badge
        HeaderView.updateCartBadge(document);
    }
};

/**
 * Initialise la page panier
 */
C.init = async function() {
    M.cart = CartData.getState();
    return V.init();
};

let V = {};

/**
 * Initialise la vue
 */
V.init = function() {
    const pageFragment = htmlToFragment(template);
    
    // Injecter le contenu du panier
    const slot = pageFragment.querySelector('slot[name="cart-content"]');
    
    if (M.cart.isEmpty) {
        // Panier vide
        slot.replaceWith(htmlToFragment(emptyTemplate));
    } else {
        // Panier avec articles
        const cartContent = V.createCartContent();
        slot.replaceWith(cartContent);
        V.attachEvents(pageFragment);
    }
    
    return pageFragment;
};

/**
 * Crée le contenu du panier (liste + récap)
 */
V.createCartContent = function() {
    const itemsCount = M.cart.itemCount;
    const itemsCountLabel = itemsCount > 1 ? 'articles' : 'article';
    
    const data = {
        'itemsCount': itemsCount,
        'itemsCountLabel': itemsCountLabel,
        'total': M.cart.total.toFixed(2)
    };
    
    let html = genericRenderer(cartTemplate, data);
    const fragment = htmlToFragment(html);
    
    // Injecter les articles
    const itemsSlot = fragment.querySelector('slot[name="items"]');
    const itemsList = V.createItemsList();
    itemsSlot.replaceWith(itemsList);
    
    return fragment;
};

/**
 * Crée la liste des articles
 */
V.createItemsList = function() {
    const fragment = document.createDocumentFragment();
    
    M.cart.items.forEach(item => {
        const itemDOM = V.createItemDOM(item);
        fragment.appendChild(itemDOM);
    });
    
    return fragment;
};

/**
 * Crée le DOM d'un article
 */
V.createItemDOM = function(item) {
    let html = itemTemplate;
    
    // Remplacer les placeholders avec valeurs par défaut si nécessaire
    html = html.replace(/{{id}}/g, item.id || '');
    html = html.replace(/{{image}}/g, item.image || 'default.png');
    html = html.replace(/{{name}}/g, item.name || 'Produit');
    html = html.replace(/{{description}}/g, item.description || '');
    html = html.replace(/{{unitPrice}}/g, (item.price || 0).toFixed(2));
    
    // Calculer le total de ligne
    const lineTotal = ((item.price || 0) * (item.quantity || 1)).toFixed(2);
    html = html.replace(/{{lineTotal}}/g, lineTotal);
    
    // Gérer les options sélectionnées pour la quantité
    for (let i = 1; i <= 5; i++) {
        const selected = item.quantity === i ? ' selected' : '';
        html = html.replace(`{{q${i}}}`, selected);
    }
    
    return htmlToFragment(html).firstElementChild;
};

/**
 * Attache les event listeners
 */
V.attachEvents = function(fragment) {
    // Écouter les changements de quantité
    const selects = fragment.querySelectorAll('select[data-qty]');
    selects.forEach(select => {
        select.addEventListener('change', C.handleQuantityChange);
    });
    
    // Écouter les suppressions
    const removeButtons = fragment.querySelectorAll('button[data-remove]');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', C.handleRemoveItem);
    });
};

/**
 * Rafraîchit le contenu du panier
 */
V.refreshCartContent = function() {
    M.cart = CartData.getState();
    
    const main = document.querySelector('main');
    if (!main) return;
    
    // Vider le contenu actuel
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    
    // Recréer le contenu
    const newContent = V.init();
    main.appendChild(newContent);
};

export function CartPage() {
    return C.init();
}
