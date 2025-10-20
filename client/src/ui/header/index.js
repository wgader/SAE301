import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

// HeaderView est un composant statique
// on ne fait que charger le template HTML
// en donnant la possibilité de l'avoir sous forme html ou bien de dom
let HeaderView = {
  html: function () {
    return template;
  },

  dom: function () {
    let fragment = htmlToFragment(template);
    
    // Menu burger
    const btn = fragment.querySelector('#navBtn');
    const drawer = fragment.querySelector('#drawer');
    const backdrop = fragment.querySelector('#backdrop');
    const iconOpen = fragment.querySelector('#iconOpen');
    const iconClose = fragment.querySelector('#iconClose');
    
    if (btn && drawer && backdrop) {
      btn.onclick = () => {
        drawer.classList.toggle('hidden');
        iconOpen.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
      };
      backdrop.onclick = () => {
        drawer.classList.add('hidden');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      };
    }
       
    const path = window.location.pathname;
    const links = fragment.querySelectorAll('a[data-link]');
    links.forEach(link => link.classList.remove('active'));
    
    if (path === '/products') {
      fragment.querySelector('a[href="/products"]').classList.add('active');
    } else if (path.startsWith('/category/1')) {
      fragment.querySelector('a[href="/category/1"]').classList.add('active');
    } else if (path.startsWith('/category/2')) {
      fragment.querySelector('a[href="/category/2"]').classList.add('active');
    } else if (path.startsWith('/category/3')) {
      fragment.querySelector('a[href="/category/3"]').classList.add('active');
    }
    
    return fragment;
  }
};

export { HeaderView };
