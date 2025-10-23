import { ProductData } from "../../data/product.js";
import { CartData } from "../../data/cart.js";
import { HeaderView } from "../../ui/header/index.js";
import { htmlToFragment } from "../../lib/utils.js";
import { DetailView } from "../../ui/detail/index.js";
import template from "./template.html?raw";


let M = {
    products: []
};

M.getProductById = function(id){
    return M.products.find(product => product.id == id);
}


let C = {};

C.handler_clickOnProduct = function(ev){
    if (ev.target.dataset.buy!==undefined){
        let id = parseInt(ev.target.dataset.buy);
        const product = M.getProductById(id);
        
        if (product) {
            const added = CartData.addItem({
                id: product.id,
                name: product.name,
                description: product.description || product.descriptionShort,
                image: product.image,
                price: product.price
            });
            
            if (added) {
                // Mettre à jour le badge
                HeaderView.updateCartBadge(document);
                
                // Notification visuelle
                const btn = ev.target;
                const originalText = btn.textContent;
                btn.textContent = '✓ Ajouté au panier';
                btn.disabled = true;
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 2000);
            }
        }
    }
}

C.init = async function(params) {
    // Récupérer l'ID depuis les paramètres de route
    const productId = params.id;
    
    // Charger le produit depuis l'API
    M.products = await ProductData.fetchAll();
    
    let p = M.getProductById(productId);
    console.log("Product loaded:", p);
    if (p) {
        p.image = (p.images && Array.isArray(p.images) && p.images.length) ? p.images[0] : (p.image || 'default.png');
    }

    return V.init(p);
}


let V = {};

V.init = function(data) {
    let fragment = V.createPageFragment(data);
    V.attachEvents(fragment);
    return fragment;
}

V.createPageFragment = function(data) {
    // Créer le fragment depuis le template
    let pageFragment = htmlToFragment(template);
    
    // Générer le composant detail
    let detailDOM = DetailView.dom(data);
    
    // Remplacer le slot par le composant detail
    pageFragment.querySelector('slot[name="detail"]').replaceWith(detailDOM);
    
    return pageFragment;
}

V.attachEvents = function(pageFragment) {
    // Attacher un event listener au bouton
    const addToCartBtn = pageFragment.querySelector('[data-buy]');
    addToCartBtn.addEventListener('click', C.handler_clickOnProduct);
    return pageFragment;
}



export function ProductDetailPage(params) {
    console.log("ProductDetailPage", params);
    return C.init(params);
}
