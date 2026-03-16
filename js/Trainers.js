const coaches = [
    {
        name:  "James Carter",
        slug:  "james-carter",
        theme: "Gold-1",
        img:   "img/james-wilson.jpg",
        title: "Force & Hypertrophie",
        desc:  "Avec James, vous ne suivez pas un programme — vous construisez un corps. Spécialiste en périodisation, il analyse votre point de départ et conçoit un plan progressif qui transforme chaque séance en résultat concret. Fini les plateaux et les routines sans direction : en 10 ans, il a aidé des centaines de clients à gagner une masse musculaire réelle et durable.",
        yrs: 10, rating: "4.9"
    },
    {
        name:  "Emma Dubois",
        slug:  "emma-dubois",
        theme: "Gold-2",
        img:   "img/emma-davis.jpg",
        title: "HIIT & Cardio",
        desc:  "Emma ne vous fera pas courir des heures sur un tapis. Elle vous fera brûler plus en 30 minutes que la plupart des gens en une heure. Ses circuits courts et intenses fondent la graisse, relancent le métabolisme et boostent l'énergie au quotidien — idéal si vous manquez de temps mais refusez de manquer de résultats.",
        yrs: 7, rating: "4.8"
    },
    {
        name:  "Marcus Fontaine",
        slug:  "marcus-fontaine",
        theme: "Gold-3",
        img:   "img/marcus-stone.jpg",
        title: "Haltérophilie Élite",
        desc:  "Marcus n'entraîne pas des athlètes — il en crée. Compétiteur de haut niveau, il transmet une technique pure et une approche mentale que peu de coachs peuvent enseigner. Arraché, épaulé-jeté, force explosive : chaque mouvement est décortiqué et maîtrisé jusqu'à ce qu'il devienne une seconde nature.",
        yrs: 12, rating: "5.0"
    },
    {
        name:  "Chen Wei",
        slug:  "chen-wei",
        theme: "Gold-4",
        img:   "img/maya-chen.jpg",
        title: "Mobilité & Fonctionnel",
        desc:  "Chen Wei s'attaque à ce que les autres ignorent : les blocages qui freinent vos performances et abîment votre corps sur le long terme. elle identifie vos déséquilibres, restaure votre mobilité et reconstruit des bases solides — pour que vous puissiez vous entraîner plus fort, plus longtemps, sans douleur.",
        yrs: 9, rating: "4.9"
    }
];

const tpl = document.getElementById('card-tpl').innerHTML;
const row = document.querySelector('.active-with-click');

coaches.forEach(b => {
    const html = tpl
        .replace(/{{name}}/g,   b.name)
        .replace(/{{slug}}/g,   b.slug)
        .replace(/{{theme}}/g,  b.theme)
        .replace(/{{img}}/g,    b.img)
        .replace(/{{title}}/g,  b.title)
        .replace(/{{desc}}/g,   b.desc)
        .replace(/{{yrs}}/g,    b.yrs)
        .replace(/{{rating}}/g, b.rating);
    row.insertAdjacentHTML('beforeend', html);
});

// Inject pick button inner HTML per theme style
document.querySelectorAll('.coach-pick-btn').forEach((btn, i) => {
    const c = coaches[i];
    const isStyleA = c.theme === 'Gold-1' || c.theme === 'Gold-2';
    if (isStyleA) {
        btn.innerHTML =
            '<div class="pick-stat">' +
                '<span class="pick-stat-val">' + c.yrs + 'yr</span>' +
                '<span class="pick-stat-lbl">Exp.</span>' +
            '</div>' +
            '<div class="pick-center">' +
                '<span class="pick-dot"></span>' +
                '<span class="pick-lbl">Choisir</span>' +
            '</div>' +
            '<div class="pick-stat">' +
                '<span class="pick-stat-val">' + c.rating + ' <i class="fa-solid fa-star" style="font-size:0.65em;color:#ff5f1f;"></i></span>' +
                '<span class="pick-stat-lbl">Rating</span>' +
            '</div>';
    } else {
        btn.innerHTML =
            '<div class="pick-stat">' +
                '<span class="pick-stat-val">' + c.yrs + 'yr</span>' +
                '<span class="pick-stat-lbl">Exp.</span>' +
            '</div>' +
            '<div class="pick-stat">' +
                '<span class="pick-stat-val">' + c.rating + ' <i class="fa-solid fa-star" style="font-size:0.65em;color:#ff5f1f;"></i></span>' +
                '<span class="pick-stat-lbl">Rating</span>' +
            '</div>' +
            '<div class="pick-brk">' +
                '<div class="pick-brk-icon"><span class="pick-brk-arr">→</span></div>' +
                '<span class="pick-brk-lbl">Choisir</span>' +
            '</div>';
    }
});

!function(t,e){"object"==typeof module&&module.exports?module.exports=e():t.MaterialCards=e()}("undefined"!=typeof globalThis?globalThis:window,function(){"use strict";var t=new WeakMap;function i(t){if(!t||"string"==typeof t)return 0;var e=0;return t.split(",").forEach(function(t){var i=t.trim().match(/^([\d.]+)(ms|s)$/);if(i){var n=Number.parseFloat(i[1]);if(!Number.isNaN(n)){var o="s"===i[2]?1e3*n:n;o>e&&(e=o)}}}),e}function n(t,e){this.options=function(t,e){var i,n={};for(i in t)Object.prototype.hasOwnProperty.call(t,i)&&(n[i]=t[i]);if(!e||"object"!=typeof e)return n;for(i in e)Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i]);return n}(n.defaults,e),this.card=t,this.button=this.card.querySelector(this.options.buttonSelector),this.cardActivator=this.options.cardActivator,this.timing=this.getTransitionTiming(),this._timeout=null,this.button&&("BUTTON"===this.button.tagName&&this.button.setAttribute("type",this.button.getAttribute("type")||"button"),this.button.setAttribute("aria-expanded",String(this.isOpen())),this.ensureToggleIcon(),this.setToggleState(this.isOpen()),"click"===this.cardActivator?(this._onClick=this.toggle.bind(this),this.button.addEventListener("click",this._onClick)):this.button.style.display="none"),"hover"===this.cardActivator&&(this._onMouseEnter=this.open.bind(this),this._onMouseLeave=this.close.bind(this),this.card.addEventListener("mouseenter",this._onMouseEnter),this.card.addEventListener("mouseleave",this._onMouseLeave))}function o(e){return t.get(e)||null}return n.defaults={cardActivator:"click",buttonSelector:".mc-btn-action"},n.prototype.ensureToggleIcon=function(){if(this.button&&!this.button.querySelector(".mc-toggle-icon")){var t=document.createElement("span");t.setAttribute("class","mc-toggle-icon"),t.setAttribute("aria-hidden","true");var e=document.createElement("span");e.setAttribute("class","mc-toggle-icon__line mc-toggle-icon__line--top");var i=document.createElement("span");i.setAttribute("class","mc-toggle-icon__line mc-toggle-icon__line--middle");var n=document.createElement("span");n.setAttribute("class","mc-toggle-icon__line mc-toggle-icon__line--bottom"),t.appendChild(e),t.appendChild(i),t.appendChild(n),this.button.replaceChildren(t)}},n.prototype.setToggleState=function(t){this.button&&this.button.classList.toggle("mc-btn-action-open",Boolean(t))},n.prototype.dispatchCardEvent=function(t){this.card.dispatchEvent(new CustomEvent(t,{bubbles:!0}))},n.prototype.toggle=function(){this.button&&(this.isOpen()?this.close():this.open())},n.prototype.getTransitionTiming=function(){var t=0;return this.card.querySelectorAll("*").forEach(function(e){var n=window.getComputedStyle(e),o=i(n.transitionDuration)+i(n.transitionDelay);o>t&&(t=o)}),t},n.prototype.close=function(){var t=this;this.dispatchCardEvent("hide.material-card"),this.card.classList.remove("mc-active"),this.setToggleState(!1),this.button&&this.button.setAttribute("aria-expanded","false"),this._timeout&&window.clearTimeout(this._timeout),this._timeout=window.setTimeout(function(){t.dispatchCardEvent("hidden.material-card"),t._timeout=null},this.timing)},n.prototype.open=function(){var t=this;this.dispatchCardEvent("show.material-card"),this.card.classList.add("mc-active"),this.setToggleState(!0),this.button&&this.button.setAttribute("aria-expanded","true"),this._timeout&&window.clearTimeout(this._timeout),this._timeout=window.setTimeout(function(){t.dispatchCardEvent("shown.material-card"),t._timeout=null},this.timing)},n.prototype.isOpen=function(){return this.card.classList.contains("mc-active")},n.prototype.destroy=function(){this._onClick&&this.button&&this.button.removeEventListener("click",this._onClick),this._onMouseEnter&&this.card.removeEventListener("mouseenter",this._onMouseEnter),this._onMouseLeave&&this.card.removeEventListener("mouseleave",this._onMouseLeave),this._timeout&&(window.clearTimeout(this._timeout),this._timeout=null),t.delete(this.card)},{MaterialCard:n,getMaterialCardInstance:o,initMaterialCards:function(e,i){var s=function(t){return t?"string"==typeof t?Array.prototype.slice.call(document.querySelectorAll(t)):t instanceof Element?[t]:t instanceof NodeList||Array.isArray(t)?Array.prototype.slice.call(t).filter(function(t){return t instanceof Element}):[]:[]}(e||".material-card");if("string"==typeof i){if("isOpen"===i){if(!s.length)return!1;var r=o(s[0]);return!!r&&r.isOpen()}return s.forEach(function(t){var e=o(t);e&&"function"==typeof e[i]&&e[i]()}),s.map(function(t){return o(t)}).filter(Boolean)}return s.map(function(e){var s=o(e);return s||(s=new n(e,i),t.set(e,s)),s})}}});

window.MaterialCards.initMaterialCards('.material-card', { cardActivator: 'click' });