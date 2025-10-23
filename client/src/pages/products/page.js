import { ProductData } from "../../data/product.js";
import { CartData } from "../../data/cart.js";
import { HeaderView } from "../../ui/header/index.js";
import { ProductView } from "../../ui/product/index.js";
import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let M = {
  products: [],
};

let C = {};

C.handler_clickOnProduct = function (ev) {
  const buyBtn = ev.target.closest('[data-buy]');
  
  if (buyBtn && buyBtn.dataset.buy !== undefined) {
    let id = parseInt(buyBtn.dataset.buy);
    const product = M.products.find(p => p.id === id);
    
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
        const originalHTML = buyBtn.innerHTML;
        buyBtn.innerHTML = '✓';
        buyBtn.disabled = true;
        
        setTimeout(() => {
          buyBtn.innerHTML = originalHTML;
          buyBtn.disabled = false;
        }, 2000);
      }
    }
  }
};

C.init = async function (params) {
  if (params && params.id) {
    M.products = await ProductData.fetchAllByCategory(params.id);
  } else {
    M.products = await ProductData.fetchAll();
  }
  return V.init(M.products);
};

let V = {};

V.init = function (data) {
  let fragment = V.createPageFragment(data);
  V.attachEvents(fragment);
  return fragment;
};

V.createPageFragment = function (data) {
  // Créer le fragment depuis le template
  let pageFragment = htmlToFragment(template);
  console.log("Creating page fragment with data:", data);

  const count = pageFragment.querySelector('#nbrproduct');
  count.textContent = `${data.length} produit${data.length > 1 ? 's' : ''}`;

  // Générer les produits
  let productsDOM = ProductView.dom(data);

  // Remplacer le slot par les produits
  pageFragment.querySelector('slot[name="products"]').replaceWith(productsDOM);

  return pageFragment;
};

V.attachEvents = function (pageFragment) {
  let root = pageFragment.firstElementChild;
  root.addEventListener("click", C.handler_clickOnProduct);
  return pageFragment;
};

export function ProductsPage(params) {
  console.log("ProductsPage", params);
  return C.init(params);
}
