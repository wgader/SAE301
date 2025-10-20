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
    const thumbsContainer = fragment.querySelector('#p-thumbs');
    const dotsContainer = fragment.querySelector('#p-dots');
    let thumbs = [];
    let dots = [];

    const images = (data.images && Array.isArray(data.images) && data.images.length) ? data.images : [data.image || 'default.png'];

    // build thumbs
    if (thumbsContainer) {
      thumbsContainer.innerHTML = '';
      images.forEach((img, idx) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('data-thumb', '');
        btn.setAttribute('data-src', `/assets/images/products/${data.id}/${img}`);
        btn.className = idx === 0 ? 'block overflow-hidden border-2 border-black' : 'block overflow-hidden border border-gray-200';
        const imgel = document.createElement('img');
        imgel.src = `/assets/images/products/${data.id}/${img}`;
        imgel.alt = data.name || '';
        imgel.className = 'w-full aspect-[4/5] object-cover';
        btn.appendChild(imgel);
        li.appendChild(btn);
        thumbsContainer.appendChild(li);
      });
      thumbs = Array.from(thumbsContainer.querySelectorAll('[data-thumb]'));
    }

    // build dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      images.forEach((img, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('data-dot', '');
        btn.className = 'h-2 w-2 rounded-full bg-black';
        btn.style.opacity = idx === 0 ? '1' : '.3';
        dotsContainer.appendChild(btn);
      });
      dots = Array.from(dotsContainer.querySelectorAll('[data-dot]'));
    }

    if (main && thumbs.length) {
      function setActive(i) {
        const src = thumbs[i].getAttribute('data-src');
        if (src) main.src = src;
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
