/* ═══════════════════════════════════════════════════════════════
   IRON PULSE — membership.js
   Déclenche l'animation SWEEP du hero après que index.js
   a caché le loader (classe pg-hide ou suppression du nœud)
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  function initHeroSweep() {
    var hero = document.querySelector('.hero[data-hero="membership"]');
    if (!hero) return;

    /* index.js masque le loader avec pg-hide puis le retire du DOM.
       On poll à 80ms jusqu'à ce que l'un ou l'autre se produise,
       puis on ajoute hero-sweep-ready pour déclencher le CSS.       */
    function tryFire() {
      var loader = document.getElementById('pg-loader');

      /* Loader absent (jamais existé ou déjà retiré) → feu immédiat */
      if (!loader) {
        fire();
        return;
      }

      /* Loader présent mais en cours de masquage */
      if (loader.classList.contains('pg-hide')) {
        /* Attendre la fin de la transition d'opacité (420ms dans index.js) */
        setTimeout(fire, 180);
        return;
      }

      /* Loader encore visible → on repoll */
      setTimeout(tryFire, 80);
    }

    function fire() {
      requestAnimationFrame(function () {
        hero.classList.add('hero-sweep-ready');
      });
    }

    /* Démarrer le poll dès que le DOM est prêt */
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', tryFire);
    } else {
      tryFire();
    }
  }

  initHeroSweep();

})();
