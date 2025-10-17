import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let DetailView = {
  html: function (data) {
    return genericRenderer(template, data);
  },

  dom: function (data) {
    let fragment = htmlToFragment(DetailView.html(data));
    
    // Galerie d'images
    const main = fragment.querySelector('#p-main');
    const thumbs = fragment.querySelectorAll('[data-thumb]');
    const dots = fragment.querySelectorAll('[data-dot]');

    if (main && thumbs.length) {
      function setActive(i) {
        main.src = thumbs[i].getAttribute('data-src');
        thumbs.forEach((thumb, k) => {
          const active = (k === i);
          thumb.classList.toggle('border-2', active);
          thumb.classList.toggle('border-black', active);
          thumb.classList.toggle('border', !active);
          thumb.classList.toggle('border-gray-200', !active);
        });
        dots.forEach((dot, k) => {
          if (dot) dot.style.opacity = (k === i) ? '1' : '.3';
        });
      }

      thumbs.forEach((thumb, i) => {
        thumb.addEventListener('click', () => setActive(i));
      });
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => setActive(i));
      });

      setActive(0);
    }

    // Scroll doux
    const anchors = fragment.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const el = document.querySelector(href);
        if (!el) return;
        e.preventDefault();
        
        console.log('Scroll vers:', href);
        
        el.scrollIntoView({ behavior: 'smooth' });
      });
    });
    
    return fragment;
  }
};

export { DetailView };
