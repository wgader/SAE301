(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();class N{constructor(t,n={}){let r=document.getElementById(t);r||(r=document.createElement("div"),console.warn(`Element with id "${t}" not found. Creating a new div as root.`),document.body.appendChild(r)),this.root=r,this.routes=[],this.layouts={},this.currentRoute=null,this.isAuthenticated=!1,this.loginPath=n.loginPath||"/login",window.addEventListener("popstate",()=>this.handleRoute()),document.addEventListener("click",s=>{s.target.matches("[data-link]")&&(s.preventDefault(),this.navigate(s.target.getAttribute("href")))})}setAuth(t){this.isAuthenticated=t}addLayout(t,n){return this.layouts[t]=n,this}findLayout(t){let n=null,r=0;for(const[s,a]of Object.entries(this.layouts))t.startsWith(s)&&s.length>r&&(n=a,r=s.length);return n}addRoute(t,n,r={}){const s=this.pathToRegex(t),a=this.extractParams(t);return this.routes.push({path:t,regex:s,keys:a,handler:n,requireAuth:r.requireAuth||!1,useLayout:r.useLayout!==!1}),this}pathToRegex(t){if(t==="*")return/.*/;const n=t.replace(/\//g,"\\/").replace(/:(\w+)/g,"([^\\/]+)").replace(/\*/g,".*");return new RegExp("^"+n+"$")}extractParams(t){const n=[],r=t.matchAll(/:(\w+)/g);for(const s of r)n.push(s[1]);return n}getParams(t,n){const r=n.match(t.regex);if(!r)return{};const s={};return t.keys.forEach((a,i)=>{s[a]=r[i+1]}),s}navigate(t){window.history.pushState(null,null,t),this.handleRoute()}handleRoute(){const t=window.location.pathname;for(const r of this.routes)if(r.regex.test(t)){if(r.requireAuth&&!this.isAuthenticated){sessionStorage.setItem("redirectAfterLogin",t),this.navigate(this.loginPath);return}this.currentRoute=t;const s=this.getParams(r,t),a=r.handler(s);a instanceof Promise?a.then(i=>{this.renderContent(i,r,t)}):this.renderContent(a,r,t);return}const n=this.routes.find(r=>r.path==="*");if(n){const r=n.handler({});this.root.innerHTML=r}}renderContent(t,n,r){const s=t instanceof DocumentFragment;if(n.useLayout){const a=this.findLayout(r);if(a){const i=a(),u=i.querySelector("slot");if(u)if(s)u.replaceWith(t);else{const p=document.createElement("template");p.innerHTML=t,u.replaceWith(p.content)}else console.warn("Layout does not contain a <slot> element. Content will not be inserted.");this.root.innerHTML="",this.root.appendChild(i)}else s?(this.root.innerHTML="",this.root.appendChild(t)):this.root.innerHTML=t}else s?(this.root.innerHTML="",this.root.appendChild(t)):this.root.innerHTML=t;this.attachEventListeners(r)}attachEventListeners(t){const n=document.getElementById("loginBtn");n&&n.addEventListener("click",()=>{this.login()});const r=document.getElementById("logoutBtn");r&&r.addEventListener("click",()=>{this.logout()})}login(){this.setAuth(!0);const t=sessionStorage.getItem("redirectAfterLogin");sessionStorage.removeItem("redirectAfterLogin"),this.navigate(t||"/dashboard")}logout(){this.setAuth(!1),this.navigate(this.loginPath)}start(){this.handleRoute()}}const H=`<div class="mx-auto max-w-4xl p-6">\r
  <h1 class="mb-6 text-4xl font-bold text-gray-900">À propos</h1>\r
  <p class="mb-6 text-lg text-gray-700">\r
    Base de code pour la SAE 3.01. Octobre 2025</p>\r
<p class="mb-6 text-lg text-gray-700">\r
    Se référer à la documentation pour comprendre comment l'utiliser\r
    </p>\r
   \r
</div>`;function D(){return H}const F=`<div class="mx-auto max-w-4xl p-6">\r
  <h1 class="mb-6 text-4xl font-bold text-gray-900">Accueil</h1>\r
  \r
<img \r
    src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=400&fit=crop" \r
    alt="Image d'accueil - Shopping" \r
    class="mb-6 rounded-lg shadow-lg w-full h-64 object-cover"\r
    style="filter: grayscale(1);"\r
  />\r
\r
  <p>\r
    Bienvenue sur notre plateforme de Click & Collect ! Découvrez une sélection variée de produits et profitez d'une expérience d'achat simple et rapide.\r
  </p>\r
</div>\r
`;function W(){return F}let z="http://mmi.unilim.fr/~gader3/SAE301/api/",w=async function(e){let t={method:"GET"};try{var n=await fetch(z+e,t)}catch(s){return console.error("Echec de la requête : "+s),!1}return n.status!=200?(console.error("Erreur de requête : "+n.status),!1):await n.json()},y={},C=[{id:1,name:"Marteau",description:"Un marteau est un outil utilisé pour enfoncer des clous dans du bois ou d'autres matériaux. Il se compose d'une tête lourde en métal fixée à un manche en bois ou en fibre de verre.",price:9.99},{id:2,name:"Tournevis",description:"Un tournevis est un outil utilisé pour visser ou dévisser des vis. Il se compose d'une tige en métal avec une tête qui s'adapte à la fente de la vis.",price:5.99},{id:3,name:"Clé à molette",description:"Une clé à molette est un outil utilisé pour serrer ou desserrer des écrous et des boulons. Elle se compose d'une mâchoire réglable qui s'adapte à différentes tailles d'écrous.",price:12.99},{id:4,name:"Pince",description:"Une pince est un outil utilisé pour saisir, tenir ou plier des objets. Elle se compose de deux bras articulés qui se rejoignent en un point de pivot.",price:7.99},{id:5,name:"Scie",description:"Une scie est un outil utilisé pour couper des matériaux, généralement en bois. Elle se compose d'une lame dentée fixée à un manche.",price:14.99},{id:6,name:"Perceuse",description:"Une perceuse est un outil utilisé pour percer des trous dans divers matériaux. Elle se compose d'un moteur qui fait tourner une mèche.",price:49.99},{id:7,name:"Ponceuse",description:"Une ponceuse est un outil utilisé pour lisser des surfaces en bois ou en métal. Elle se compose d'un moteur qui fait vibrer ou tourner un abrasif.",price:79.99},{id:8,name:"Mètre",description:"Un mètre est un outil utilisé pour mesurer des distances. Il se compose d'une bande graduée en métal ou en plastique.",price:19.99},{id:9,name:"Niveau à bulle",description:"Un niveau à bulle est un outil utilisé pour vérifier l'horizontalité ou la verticalité d'une surface. Il se compose d'un tube rempli de liquide avec une bulle d'air à l'intérieur.",price:9.99}];y.fetch=async function(e){let t=await w("products/"+e);return t==!1?C.pop():[t]};y.fetchAll=async function(){let e=await w("products");return e==!1?C:e};y.fetchAllByCategory=async function(e){let t=await w(`products?category=${e}`);return t==!1?C:t};let I=function(e,t){let n=e;for(let r in t)n=n.replaceAll(new RegExp("{{"+r+"}}","g"),t[r]);return n};function o(e){const t=document.createElement("template");return t.innerHTML=e.trim(),t.content}const _=`<article>\r
  <a href="/products/{{id}}/{{name}}" data-link class="block">\r
    <figure>\r
      <img\r
        src="/assets/images/products/{{id}}/{{image}}"\r
        alt="{{name}}"\r
        class="w-full aspect-[4/5] object-cover bg-white"\r
      >\r
      <figcaption class="p-4">\r
        <p class="font-display text-base font-bold tracking-wide text-text uppercase">\r
          {{name}}\r
        </p>\r
        <p class="mt-1 text-base font-body text-description">\r
          {{description}}\r
        </p>\r
        <p class="mt-4 text-base font-body font-bold text-text">\r
          {{price}} €\r
        </p>\r
      </figcaption>\r
    </figure>\r
  </a>\r
</article>\r
`;let T={html:function(e){let t='<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">';for(let n of e)n.image=n.images&&n.images.length>0?n.images[0]:"default.png",t+=I(_,n);return t+"</div>"},dom:function(e){return o(T.html(e))}};const G=`<div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-4">\r
  <h1 class="font-display text-2xl md:text-3xl text-black mb-2">Nos produits</h1>\r
  <p id="nbrproduct" class="font-body text-sm text-gray mb-8"></p>\r
  <slot name="products"></slot>\r
</div>`;let q={products:[]},P={};P.handler_clickOnProduct=function(e){if(e.target.dataset.buy!==void 0){let t=e.target.dataset.buy;alert(`Le produit d'identifiant ${t} ? Excellent choix !`)}};P.init=async function(e){return e&&e.id?q.products=await y.fetchAllByCategory(e.id):q.products=await y.fetchAll(),x.init(q.products)};let x={};x.init=function(e){let t=x.createPageFragment(e);return x.attachEvents(t),t};x.createPageFragment=function(e){let t=o(G);const n=t.querySelector("#nbrproduct");n.textContent=`${e.length} produit${e.length>1?"s":""}`;let r=T.dom(e);return t.querySelector('slot[name="products"]').replaceWith(r),t};x.attachEvents=function(e){return e.firstElementChild.addEventListener("click",P.handler_clickOnProduct),e};function U(e){return console.log("ProductsPage",e),P.init(e)}const K=`<article class="mx-auto max-w-[1200px] bg-white text-black font-body">\r
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 mt-4">\r
\r
    <!-- Galerie (desktop) -->\r
    <aside class="hidden lg:block lg:col-span-2">\r
      <ul id="p-thumbs" class="space-y-4 sticky top-20">\r
        <!-- thumbnails seront insérés dynamiquement -->\r
      </ul>\r
    </aside>\r
\r
    <!-- Image principale -->\r
    <figure class="lg:col-span-7">\r
  <img id="p-main" src="/assets/images/products/{{id}}/{{image}}" alt="{{name}}"\r
           class="w-full aspect-[4/5] lg:h-[720px] lg:aspect-auto object-cover bg-white">\r
      <figcaption class="mt-3 flex items-center justify-center gap-2 lg:hidden" id="p-dots">\r
        <!-- dots générés dynamiquement -->\r
      </figcaption>\r
    </figure>\r
\r
    <!-- Infos -->\r
    <section class="lg:col-span-3">\r
      <header class="mb-4">\r
        <h1 class="font-display text-3xl md:text-4xl">{{name}}</h1>\r
        <p class="mt-1 text-gray-600">{{description}}</p>\r
        <a href="#details" class="mt-2 inline-block text-sm underline">Description détaillée</a>\r
      </header>\r
\r
      <p class="text-lg font-bold mb-6">{{price}} €</p>\r
\r
      <button\r
        data-buy="{{id}}"\r
        class="w-full md:w-auto rounded-full bg-black text-white cursor-pointer\r
               px-6 py-3 text-base font-display uppercase\r
               lg:px-12 lg:py-4"\r
      >\r
        Ajouter au panier\r
      </button>\r
\r
      <details id="details" class="mt-12">\r
        <summary class="cursor-pointer flex items-center justify-between text-xl font-display">\r
          <span>Détails et composition</span>\r
          <img src="/assets/images/icons/chevron-right.svg" alt="Ouvrir" class="h-4 w-4">\r
        </summary>\r
        <div class="mt-6 pt-6 border-t">\r
          <p class="text-sm md:text-base">{{details}}</p>\r
        </div>\r
      </details>\r
    </section>\r
  </div>\r
</article>`;let j={html:function(e){return I(K,e)},dom:function(e){let t=o(j.html(e));const n=t.querySelector("#p-main"),r=t.querySelector("#p-thumbs"),s=t.querySelector("#p-dots");var a=["default.png"];if(e&&e.images&&Array.isArray(e.images)&&e.images.length?a=e.images:e&&e.image&&(a=[e.image]),n&&e&&e.id&&(n.src="/assets/images/products/"+e.id+"/"+a[0],n.alt=e.name||""),r){r.innerHTML="";for(var i=0;i<a.length;i++){var u=a[i],p=document.createElement("li"),f=document.createElement("button");f.type="button",f.setAttribute("data-src","/assets/images/products/"+e.id+"/"+u),f.className=i===0?"block overflow-hidden border-2 border-black":"block overflow-hidden border border-gray-200";var k=document.createElement("img");k.src="/assets/images/products/"+e.id+"/"+u,k.alt=e.name||"",k.className="w-full aspect-[4/5] object-cover",f.appendChild(k),(function(g,h){h.addEventListener("click",function(){n&&(n.src=h.getAttribute("data-src"));for(var c=r.querySelectorAll("button"),d=0;d<c.length;d++)d===g?c[d].className="block overflow-hidden border-2 border-black":c[d].className="block overflow-hidden border border-gray-200";if(s)for(var m=s.querySelectorAll("button"),L=0;L<m.length;L++)m[L].style.opacity=L===g?"1":".3"})})(i,f),p.appendChild(f),r.appendChild(p)}}if(s){s.innerHTML="";for(var S=0;S<a.length;S++){var v=document.createElement("button");v.type="button",v.className="h-2 w-2 rounded-full bg-black",v.style.opacity=S===0?"1":".3",(function(g){v.addEventListener("click",function(){if(n&&(n.src="/assets/images/products/"+e.id+"/"+a[g]),r)for(var h=r.querySelectorAll("button"),c=0;c<h.length;c++)c===g?h[c].className="block overflow-hidden border-2 border-black":h[c].className="block overflow-hidden border border-gray-200";for(var d=s.querySelectorAll("button"),m=0;m<d.length;m++)d[m].style.opacity=m===g?"1":".3"})})(S),s.appendChild(v)}}return t}};const Q=`<div class="px-4 md:px-6 lg:px-8 py-4">\r
   <a href="/products" data-link class="inline-flex items-center gap-2 text-sm">\r
     <img src="/assets/images/icons/chevron-right.svg" alt="Retour" class="h-4 w-4 rotate-180" />\r
     <span class="hidden md:inline">Retour</span>\r
   </a>\r
 \r
   <slot name="detail"></slot>\r
 </div>\r
 `;let E={products:[]};E.getProductById=function(e){return E.products.find(t=>t.id==e)};let A={};A.handler_clickOnProduct=function(e){e.target.dataset.buy!==void 0&&(e.target.dataset.buy,alert("Produit ajouté au panier ! (Quand il y en aura un)"))};A.init=async function(e){const t=e.id;E.products=await y.fetchAll();let n=E.getProductById(t);return console.log("Product loaded:",n),n&&(n.image=n.images&&Array.isArray(n.images)&&n.images.length?n.images[0]:n.image||"default.png"),b.init(n)};let b={};b.init=function(e){let t=b.createPageFragment(e);return b.attachEvents(t),t};b.createPageFragment=function(e){let t=o(Q),n=j.dom(e);return t.querySelector('slot[name="detail"]').replaceWith(n),t};b.attachEvents=function(e){return e.querySelector("[data-buy]").addEventListener("click",A.handler_clickOnProduct),e};function J(e){return console.log("ProductDetailPage",e),A.init(e)}let R={};R.fetchAll=async function(){const e=await w("users");return e===!1?[]:e};R.fetch=async function(e){const t=await w("users/"+e);return t===!1?null:t};const X=`<div class="px-4 md:px-6 lg:px-8 py-6">\r
  <h1 class="text-2xl font-display mb-4">Utilisateurs</h1>\r
  <ul id="users-list" class="divide-y divide-gray-200">\r
    <!-- items will be inserted here -->\r
  </ul>\r
</div>\r
`;let O={};O.render=function(e){const t=o(X),n=t.querySelector("#users-list");n.innerHTML="";for(let r of e){const s=document.createElement("li");s.className="py-3 flex items-center justify-between",s.innerHTML=`
      <div>
        <div class="font-medium">${r.firstname} ${r.lastname}</div>
        <div class="text-sm text-gray-600">${r.email} • ${r.civ}</div>
      </div>
    `,n.appendChild(s)}return t};async function Y(){const e=await R.fetchAll();return O.render(e)}const Z=`<div style="min-height: 100vh; display: flex; flex-direction: column;">\r
    <slot name="header"></slot>\r
    <main style="flex: 1; padding: 2rem;">\r
        <slot></slot>\r
    </main>\r
    <slot name="footer"></slot>\r
</div>\r
    `,$=`<header class="bg-white text-black border-b border-black/10">\r
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">\r
  <div class="h-16 flex items-center justify-between">\r
      <!-- Burger -->\r
      <button id="navBtn" type="button" class="p-2 -ml-2 md:hidden">\r
        <img id="iconOpen"  src="/assets/images/icons/burger.svg" alt="Ouvrir le menu" class="h-6 w-6">\r
        <img id="iconClose" src="/assets/images/icons/close.svg"  alt="Fermer le menu" class="h-6 w-6 hidden">\r
      </button>\r
\r
      <!-- Logo -->\r
      <a href="/" class="flex-1 md:flex-none flex justify-center md:justify-start">\r
        <img src="/assets/images/brands/logo.svg" alt="Galeries Lafayette" class="h-7 w-auto">\r
      </a>\r
\r
      <!-- Nav desktop -->\r
      <nav class="hidden md:block flex-1">\r
        <ul class="flex justify-center gap-12 text-sm font-medium tracking-wide">\r
          <li><a href="/products"   data-link class="pb-3 border-b-2 border-transparent hover:border-black px-1">PRODUITS</a></li>\r
          <li><a href="/category/1" data-link class="pb-3 border-b-2 border-transparent hover:border-black px-1">VÊTEMENTS</a></li>\r
          <li><a href="/category/2" data-link class="pb-3 border-b-2 border-transparent hover:border-black px-1">CHAUSSURES</a></li>\r
          <li><a href="/category/3" data-link class="pb-3 border-b-2 border-transparent hover:border-black px-1">ACCESSOIRES</a></li>\r
        </ul>\r
      </nav>\r
\r
      <div class="w-8 md:hidden"></div>\r
\r
      <a href="/signin">\r
        <img src="/assets/images/icons/profile.svg" alt="Se connecter" class="h-auto">\r
      </a>\r
\r
    </div>\r
  </div>\r
\r
  <!-- Mobile -->\r
  <div id="drawer" class="fixed inset-0 z-50 hidden md:hidden">\r
    <div id="backdrop" class="absolute inset-0 bg-black/25"></div>\r
    <nav class="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-white border-r border-black/10 p-6">\r
      <ul class="mt-10 space-y-8 text-base font-medium tracking-wide">\r
        <li>\r
          <a href="/products" data-link class="flex items-center justify-between">\r
            <span>PRODUITS</span><img src="/assets/images/icons/chevron-right.svg" alt="Voir" class="h-4 w-4">\r
          </a>\r
          <span class="block mt-2 w-12 h-[2px] bg-black"></span>\r
        </li>\r
        <li><a href="/category/1" data-link class="flex items-center justify-between"><span>VÊTEMENTS</span><img src="/assets/images/icons/chevron-right.svg" alt="Voir" class="h-4 w-4"></a></li>\r
        <li><a href="/category/2" data-link class="flex items-center justify-between"><span>CHAUSSURES</span><img src="/assets/images/icons/chevron-right.svg" alt="Voir" class="h-4 w-4"></a></li>\r
        <li><a href="/category/3" data-link class="flex items-center justify-between"><span>ACCESSOIRES</span><img src="/assets/images/icons/chevron-right.svg" alt="Voir" class="h-4 w-4"></a></li>\r
      </ul>\r
    </nav>\r
    <a href="/signin">\r
        <img src="/assets/images/icons/profile.svg" alt="Se connecter" class="h-auto">\r
      </a>\r
  </div>\r
</header>`;let ee={html:function(){return $},dom:function(){let e=o($);const t=e.querySelector("#navBtn"),n=e.querySelector("#drawer"),r=e.querySelector("#backdrop"),s=e.querySelector("#iconOpen"),a=e.querySelector("#iconClose");t&&n&&r&&(t.onclick=()=>{n.classList.toggle("hidden"),s.classList.toggle("hidden"),a.classList.toggle("hidden")},r.onclick=()=>{n.classList.add("hidden"),s.classList.remove("hidden"),a.classList.add("hidden")});const i=window.location.pathname;return e.querySelectorAll("a[data-link]").forEach(p=>p.classList.remove("active")),i==="/products"?e.querySelector('a[href="/products"]').classList.add("active"):i.startsWith("/category/1")?e.querySelector('a[href="/category/1"]').classList.add("active"):i.startsWith("/category/2")?e.querySelector('a[href="/category/2"]').classList.add("active"):i.startsWith("/category/3")&&e.querySelector('a[href="/category/3"]').classList.add("active"),e}};const M=`<footer style="background: #f5f5f5; padding: 1rem; text-align: center;">\r
    <p style="margin: 0;">&copy; 2025 - MMI - SAE 3.01</p>\r
</footer>\r
`;let te={html:function(){return M},dom:function(){return o(M)}};function ne(){let e=o(Z),t=ee.dom(),n=te.dom();return e.querySelector('slot[name="header"]').replaceWith(t),e.querySelector('slot[name="footer"]').replaceWith(n),e}const re=` <section>\r
    <h1>404 - Page non trouvée</h1>\r
        <p>Cette page n'existe pas</p>\r
    <nav>\r
        <a href="/" data-link>Retour à l'accueil</a>\r
    </nav>\r
</section>`;function se(){return re}const ae=`<main class="mx-auto w-full max-w-[360px] px-3 pt-3 pb-10 md:max-w-[420px] md:px-4 font-body text-text">\r
  <h1 class="font-display leading-tight text-4xl md:text-5xl">Inscription</h1>\r
\r
  <nav class="mt-2">\r
    <a href="/signin" data-link class="inline-flex items-center gap-2 underline text-sm md:text-base">\r
      Vous avez déjà un compte ?\r
      <img src="/assets/images/icons/chevron-right.svg" alt="" class="h-4 w-4" />\r
    </a>\r
  </nav>\r
\r
  <form action="#" method="post" class="mt-6">\r
    <div class="flex items-center gap-5 text-[15px]">\r
      <label class="inline-flex items-center gap-2">\r
        <input type="radio" name="civ" class="h-4 w-4 border-text/30 text-text  focus:ring-0" />\r
        Madame\r
      </label>\r
      <label class="inline-flex items-center text-[15px] gap-2">\r
        <input type="radio" name="civ" checked class="h-4 w-4 border-text/30 text-text focus:ring-0" />\r
        Monsieur\r
      </label>\r
    </div>\r
\r
    <div class="mt-5 space-y-1.5">\r
      <label for="sn-lastname" class="block text-sm text-description">Nom</label>\r
      <input id="sn-lastname" name="lastname" type="text" autocomplete="family-name"\r
        class="w-full box-border border border-text/20 px-3 py-[10px]\r
               h-[44px] text-[15px] leading-[22px] font-body\r
               rounded-none outline-none appearance-none\r
               placeholder:text-description focus:border-text" />\r
    </div>\r
\r
    <div class="mt-4 space-y-1.5">\r
      <label for="sn-firstname" class="block text-sm text-description">Prénom</label>\r
      <input id="sn-firstname" name="firstname" type="text" autocomplete="given-name"\r
        class="w-full box-border border border-text/20 px-3 py-[10px]\r
               h-[44px] text-[15px] leading-[22px] font-body\r
               rounded-none outline-none appearance-none\r
               placeholder:text-description focus:border-text" />\r
    </div>\r
\r
    <div class="mt-4 space-y-1.5">\r
      <label for="sn-email" class="block text-sm text-description">Email</label>\r
      <input id="sn-email" name="email" type="email" inputmode="email" autocomplete="email"\r
        class="w-full box-border border border-text/20 px-3 py-[10px]\r
               h-[44px] text-[15px] leading-[22px] font-body\r
               rounded-none outline-none appearance-none\r
               placeholder:text-description focus:border-text" />\r
    </div>\r
\r
    <div class="mt-4 space-y-1.5">\r
      <label for="sn-pass" class="block text-sm text-description">Mot de passe</label>\r
      <input id="sn-pass" name="password" type="password" autocomplete="new-password"\r
        class="w-full box-border border border-text/20 px-3 py-[10px]\r
               h-[44px] text-xl leading-[22px] font-body\r
               rounded-none outline-none appearance-none\r
               placeholder:text-description focus:border-text" />\r
    </div>\r
\r
    <ul class="mt-3 grid grid-cols-1 gap-2 text-[13px] text-description md:grid-cols-2">\r
      <li class="inline-flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-text"></span>12&nbsp;caractères minimum</li>\r
      <li class="inline-flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-text"></span>Un caractère en majuscule</li>\r
      <li class="inline-flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-text"></span>Un caractère en minuscule</li>\r
      <li class="inline-flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-text"></span>Un caractère spécial</li>\r
      <li class="inline-flex items-center gap-2 md:col-span-2"><span class="h-1.5 w-1.5 rounded-full bg-text"></span>Un chiffre</li>\r
    </ul>\r
\r
    <p class="mt-5">\r
      <button type="submit"\r
        class="w-full rounded-[var(--radius-btn)] bg-btn-primary-bg px-5 py-3 text-center font-display tracking-wide uppercase text-btn-primary-fg text-base cursor-pointer md:text-[17px]">\r
        Continuer\r
      </button>\r
    </p>\r
  </form>\r
</main>\r
`,ie={dom(){return o(ae)}},oe=`<div class="px-4 md:px-6 lg:px-8 py-4">\r
   <a href="/products" data-link class="inline-flex items-center gap-2 text-sm">\r
     <img src="/assets/images/icons/chevron-right.svg" alt="Retour" class="h-4 w-4 rotate-180" />\r
     <span class="hidden md:inline">Retour</span>\r
   </a>\r
 \r
   <slot name="form"></slot>\r
 </div>\r
 `;let V={};V.init=function(){const e=o(oe),t=ie.dom();return e.querySelector('slot[name="form"]').replaceWith(t),e};function le(){return V.init()}const ce=`<main class="mx-auto w-full max-w-[360px] px-3 pt-3 pb-10 md:max-w-[420px] md:px-4 font-body text-text">\r
  <h1 class="font-display leading-tight text-4xl md:text-5xl">Connexion</h1>\r
\r
  <nav class="mt-2">\r
    <a href="/signup" data-link class="inline-flex items-center gap-2 underline text-sm md:text-base">\r
      Vous n’avez pas de compte ?\r
      <img src="/assets/images/icons/chevron-right.svg" alt="" class="h-4 w-4" />\r
    </a>\r
  </nav>\r
\r
  <form action="#" method="post" class="mt-6">\r
    <div class="space-y-1.5">\r
      <label for="login-email" class="block text-sm text-description">Email</label>\r
      <input id="login-email" name="email" type="email" inputmode="email" autocomplete="email"\r
        class="w-full box-border border border-text/20 px-3 py-[10px]\r
               h-[44px] text-[15px] leading-[22px] font-body\r
               rounded-none outline-none appearance-none\r
               placeholder:text-description focus:border-text" />\r
    </div>\r
\r
    <div class="mt-4 space-y-1.5">\r
      <label for="login-pass" class="block text-sm text-description">Mot de passe</label>\r
      <input id="login-pass" name="password" type="password" autocomplete="current-password"\r
        class="w-full box-border border border-text/20 px-3 py-[10px]\r
               h-[44px] text-[15px] leading-[22px] font-body\r
               rounded-none outline-none appearance-none\r
               placeholder:text-description focus:border-text" />\r
    </div>\r
\r
    <nav class="mt-3">\r
      <a href="/forgot-password" data-link class="underline text-sm">Mot de passe oublié ?</a>\r
    </nav>\r
\r
    <p class="mt-5">\r
      <button type="submit"\r
        class="w-full rounded-[var(--radius-btn)] bg-btn-primary-bg px-5 py-3 text-center font-display tracking-wide uppercase text-btn-primary-fg text-base cursor-pointer md:text-[17px]">\r
        Continuer\r
      </button>\r
    </p>\r
  </form>\r
</main>\r
`,de={dom(){return o(ce)}},ue=`<main class="px-4 py-4 md:px-6 lg:px-8">\r
  <nav class="inline-flex items-center gap-2 text-sm">\r
    <a href="/" data-link class="inline-flex items-center gap-2">\r
      <img src="/assets/images/icons/chevron-right.svg" alt="Retour" class="h-4 w-4 rotate-180" />\r
      <span class="hidden md:inline">Retour</span>\r
    </a>\r
  </nav>\r
\r
  <slot name="form"></slot>\r
</main>\r
`;let B={};B.create=function(){const e=o(ue),t=de.dom();return e.querySelector('slot[name="form"]').replaceWith(t),e};function pe(){return B.create()}const l=new N("app");l.addLayout("/",ne);l.addRoute("/",W);l.addRoute("/about",D);l.addRoute("/products",U);l.addRoute("/category/:id",U);l.addRoute("/products/:id/:slug",J);l.addRoute("/signin",pe);l.addRoute("/signup",le);l.addRoute("/users",Y);l.addRoute("*",se);l.start();
