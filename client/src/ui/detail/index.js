import { genericRenderer, htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";

let DetailView = {
  html: function (data) {
    return genericRenderer(template, data);
  },

  dom: function (data) {
    let fragment = htmlToFragment(DetailView.html(data));
    
    const main = fragment.querySelector('#p-main');
    const thumbsContainer = fragment.querySelector('#p-thumbs');
    const dotsContainer = fragment.querySelector('#p-dots');

    var images = ['default.png'];
    if (data && data.images && Array.isArray(data.images) && data.images.length) {
      images = data.images;
    } else if (data && data.image) {
      images = [data.image];
    }

    if (main && data && data.id) {
      main.src = '/assets/images/products/' + data.id + '/' + images[0];
      main.alt = data.name || '';
    }

    if (thumbsContainer) {
      thumbsContainer.innerHTML = '';
      for (var i = 0; i < images.length; i++) {
        var file = images[i];
        var li = document.createElement('li');
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('data-src', '/assets/images/products/' + data.id + '/' + file);
        btn.className = (i === 0) ? 'block overflow-hidden border-2 border-black' : 'block overflow-hidden border border-gray-200';
        var imgEl = document.createElement('img');
        imgEl.src = '/assets/images/products/' + data.id + '/' + file;
        imgEl.alt = data.name || '';
        imgEl.className = 'w-full aspect-[4/5] object-cover';
        btn.appendChild(imgEl);

        
        // fonction locale juste pour ce bout 
        (function(index, button){
          button.addEventListener('click', function(){
            if (main) main.src = button.getAttribute('data-src');
            var all = thumbsContainer.querySelectorAll('button');
            for (var k = 0; k < all.length; k++) {
              if (k === index) {
                all[k].className = 'block overflow-hidden border-2 border-black';
              } else {
                all[k].className = 'block overflow-hidden border border-gray-200';
              }
            }
            // mettre à jour les dots
            if (dotsContainer) {
              var dots = dotsContainer.querySelectorAll('button');
              for (var d = 0; d < dots.length; d++) {
                dots[d].style.opacity = (d === index) ? '1' : '.3';
              }
            }
          });
        })(i, btn);

        li.appendChild(btn);
        thumbsContainer.appendChild(li);
      }
    }

    // Génère les dots (mobile)
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (var j = 0; j < images.length; j++) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'h-2 w-2 rounded-full bg-black';
        dot.style.opacity = (j === 0) ? '1' : '.3';
        (function(idx){
          dot.addEventListener('click', function(){
            if (main) main.src = '/assets/images/products/' + data.id + '/' + images[idx];
            // sync miniatures
            if (thumbsContainer) {
              var all = thumbsContainer.querySelectorAll('button');
              for (var k = 0; k < all.length; k++) {
                if (k === idx) {
                  all[k].className = 'block overflow-hidden border-2 border-black';
                } else {
                  all[k].className = 'block overflow-hidden border border-gray-200';
                }
              }
            }
            var dotsAll = dotsContainer.querySelectorAll('button');
            for (var d = 0; d < dotsAll.length; d++) {
              dotsAll[d].style.opacity = (d === idx) ? '1' : '.3';
            }
          });
        })(j);
        dotsContainer.appendChild(dot);
      }
    }

    
    return fragment;
  }
};

export { DetailView };
