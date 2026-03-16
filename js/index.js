(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════════════
     IRON PULSE — index.js
     Gère : nav, footer, loader, hero, scroll, menu mobile, reveal
  ══════════════════════════════════════════════════════════════════ */

  /* ── LAYOUT : NAV + FOOTER ──────────────────────────────────────── */

  /* Nav exacte — structure identique à l'originale, Iron Pulse + FR  */
  var NAV_HTML =
    '<nav class="fixed w-full z-50 transition-all duration-300 bg-transparent py-6">'
      + '<div class="container mx-auto px-4">'
        + '<div class="flex justify-between items-center">'
          + '<a class="text-3xl font-display text-white uppercase tracking-wider" href="index.html"><span class="text-white">Iron Pulse</span><span class="text-orangePulse">.</span></a>'
          + '<div class="hidden lg:flex items-center gap-12">'
            + '<div class="flex gap-8">'
              + '<a class="text-white hover:text-orangePulse transition-colors uppercase font-medium" href="classes.html">Cours</a>'
              + '<a class="text-white hover:text-orangePulse transition-colors uppercase font-medium" href="training.html">Entra\u00eeneurs</a>'
              + '<a class="text-white hover:text-orangePulse transition-colors uppercase font-medium" href="contact.html">Contact</a>'
            + '</div>'
            + '<a class="bg-orangePulse text-white px-8 py-3 uppercase font-bold tracking-wider hover:bg-white hover:text-orangePulse transition-all duration-300" href="membership.html">Rejoindre</a>'
          + '</div>'
          + '<button class="lg:hidden text-white p-2" tabindex="0">'
            + '<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>'
          + '</button>'
        + '</div>'
      + '</div>'
    + '</nav>';

  /* Footer ─────────────────────────────────────────────────────────── */
  var SOCIAL = [
    { name:'facebook',  href:'https://facebook.com',  evenodd:true,  path:'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
    { name:'twitter',   href:'https://twitter.com',   evenodd:false, path:'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
    { name:'instagram', href:'https://instagram.com', evenodd:true,  path:'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z' },
    { name:'youtube',   href:'https://youtube.com',   evenodd:true,  path:'M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z' }
  ];

  var _CI = 'flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-all duration-300';
  var _TC = 'font-athletic text-lg text-greyPulse group-hover:text-white transition-colors';

  function _bar(h) {
    return '<div class="relative w-1 ' + h + ' overflow-hidden">'
      + '<div class="absolute inset-0 bg-orangePulse/30"></div>'
      + '<div class="absolute inset-0 bg-orangePulse transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>'
      + '</div>';
  }

  function _socialIcon(s) {
    var pa = s.evenodd ? ' fill-rule="evenodd" clip-rule="evenodd"' : '';
    return '<a href="' + s.href + '" class="w-12 h-12 rounded-lg bg-white/5 hover:bg-orangePulse flex items-center justify-center text-greyPulse hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-6" target="_blank" rel="noopener noreferrer">'
      + '<span class="sr-only">' + s.name + '</span>'
      + '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path' + pa + ' d="' + s.path + '"></path></svg>'
      + '</a>';
  }

  var FOOTER_HTML =
    '<div class="absolute inset-0">'
      + '<div class="absolute inset-0 bg-[url(\'/noise.png\')] opacity-[0.03] mix-blend-overlay"></div>'
      + '<div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orangePulse to-transparent opacity-30"></div>'
      + '<div class="absolute -left-20 top-0 w-[500px] h-[500px] bg-orangePulse/10 rounded-full blur-[100px]"></div>'
      + '<div class="absolute -right-20 bottom-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px]"></div>'
    + '</div>'
    + '<div class="max-w-7xl mx-auto px-4 relative">'
      + '<div class="grid grid-cols-1 md:grid-cols-12 gap-12 py-20">'

        /* Col 1 : Brand + socials */
        + '<div class="md:col-span-4 space-y-6">'
          + '<h3 class="text-4xl font-display" style="opacity: 0; transform: translateY(20px);">Iron Pulse<span class="text-orangePulse">.</span></h3>'
          + '<p class="font-athletic text-xl text-greyPulse tracking-wide leading-relaxed">Propulse ta progression avec des installations de pointe et un encadrement expert.</p>'
          + '<div class="flex gap-4">' + SOCIAL.map(_socialIcon).join('') + '</div>'
        + '</div>'

        /* Col 2 : Liens */
        + '<div class="md:col-span-2 space-y-6">'
          + '<h4 class="text-xl font-display text-white">Liens Rapides</h4>'
          + '<ul class="space-y-4">'
            + '<li><a class="font-athletic text-lg text-greyPulse hover:text-orangePulse transition-colors" href="classes.html">Cours</a></li>'
            + '<li><a class="font-athletic text-lg text-greyPulse hover:text-orangePulse transition-colors" href="training.html">Entra\u00eeneurs</a></li>'
            + '<li><a class="font-athletic text-lg text-greyPulse hover:text-orangePulse transition-colors" href="membership.html">Abonnements</a></li>'
          + '</ul>'
        + '</div>'

        /* Col 3 : Contact */
        + '<div class="md:col-span-3 space-y-6">'
          + '<h4 class="text-xl font-display text-white">NOUS JOINDRE</h4>'
          + '<ul class="space-y-4">'
            + '<li class="group relative"><a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" class="' + _CI + '">' + _bar('h-12') + '<div><p class="' + _TC + '">4521 Rue Saint-Laurent</p><p class="' + _TC + '">Qu\u00e9bec, QC G1R 2K4</p></div></a></li>'
            + '<li class="group relative"><a href="tel:+18098786115" class="' + _CI + '">' + _bar('h-8') + '<p class="' + _TC + '">+1 (809) 878-6115</p></a></li>'
            + '<li class="group relative"><a href="mailto:lunarojadigital@gmail.com" class="' + _CI + '">' + _bar('h-8') + '<p class="' + _TC + '">lunarojadigital@gmail.com</p></a></li>'
          + '</ul>'
        + '</div>'

        /* Col 4 : Heures */
        + '<div class="md:col-span-3 space-y-6">'
          + '<h4 class="text-xl font-display text-white">HEURES D\'OUVERTURE</h4>'
          + '<ul class="space-y-4">'
            + ['Lun\u2013Ven\u00a0: 5h\u202f\u2013\u202f22h', 'Samedi\u00a0: 7h\u202f\u2013\u202f20h', 'Dimanche\u00a0: 8h\u202f\u2013\u202f18h'].map(function (h) {
                return '<li class="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">' + _bar('h-8') + '<div><p class="font-athletic text-lg text-greyPulse group-hover:text-white transition-colors">' + h + '</p></div></li>';
              }).join('')
          + '</ul>'
        + '</div>'

      + '</div>'
      + '<div class="border-t border-white/5 py-8 flex flex-col md:flex-row justify-between items-center gap-4">'
        + '<p class="font-athletic text-lg text-greyPulse order-2 md:order-1">\u00a9 2026 Iron Pulse. Tous droits r\u00e9serv\u00e9s.</p>'
        + '<div class="flex gap-6 order-1 md:order-2">'
          + '<a class="font-athletic text-sm text-greyPulse hover:text-orangePulse transition-colors" href="#">Politique de confidentialit\u00e9</a>'
          + '<a class="font-athletic text-sm text-greyPulse hover:text-orangePulse transition-colors" href="#">Conditions d\'utilisation</a>'
        + '</div>'
      + '</div>'
    + '</div>';

  function injectLayout() {
    /* ── Nav : inséré comme premier enfant du body ── */
    var tmp = document.createElement('div');
    tmp.innerHTML = NAV_HTML;
    document.body.insertBefore(tmp.firstChild, document.body.firstChild);

    /* ── Footer : remplir le <footer> vide ── */
    var footer = document.querySelector('footer');
    if (footer) {
      footer.className = 'bg-gradient-to-b from-blackPulse to-black relative overflow-hidden';
      footer.innerHTML = FOOTER_HTML;
    }

    /* ── Lien actif en orangé ── */
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a[href*=".html"]:not([href="index.html"])').forEach(function (a) {
      if (a.getAttribute('href') === page && !a.classList.contains('bg-orangePulse')) {
        a.classList.add('text-orangePulse');
        a.classList.remove('text-white');
      }
    });
  }

  /* ── 0. PERFORMANCE HINTS ───────────────────────────────────────── */
  function injectResourceHints() {
    var head = document.head;
    ['https://fonts.googleapis.com','https://fonts.gstatic.com','https://images.unsplash.com']
      .forEach(function (origin) {
        if (document.querySelector('link[href="' + origin + '"]')) return;
        var l = document.createElement('link');
        l.rel = 'preconnect'; l.href = origin;
        if (origin.includes('gstatic')) l.crossOrigin = 'anonymous';
        head.appendChild(l);
      });

    var isHome = !window.location.pathname.split('/').pop() ||
                  window.location.pathname.split('/').pop() === 'index.html' ||
                  window.location.pathname.endsWith('/');
    if (isHome && !document.querySelector('link[rel="preload"][as="image"]')) {
      var pl = document.createElement('link');
      pl.rel = 'preload'; pl.as = 'image'; pl.href = 'media/hero.webp';
      head.appendChild(pl);
    }
  }

  function initLazyImages() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var img = entry.target;
        if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
        img.loading = 'lazy';
        io.unobserve(img);
      });
    }, { rootMargin: '200px 0px' });
    document.querySelectorAll('img:not([loading="eager"])').forEach(function (img) {
      if (img.id === 'hero-img') return;
      io.observe(img);
    });
  }

  /* ── 1. LOADER + HERO ENTRANCE ──────────────────────────────────── */
  function initLoaderAndHero() {
    var hero = document.querySelector('section.relative.w-full') ||
               document.querySelector('section.relative.h-\\[70vh\\]') ||
               document.querySelector('section.relative.h-\\[100vh\\]') ||
               document.querySelector('section.relative');

    var veil = null;
    if (hero) {
      var vs = document.createElement('style');
      vs.textContent = [
        '#pg-hero-veil{position:absolute;inset:0;z-index:5;background:#0a0a0a;',
          'transition:opacity 0.85s ease;pointer-events:none;}',
        '#pg-hero-veil.pg-veil-out{opacity:0;}',
      ].join('');
      document.head.appendChild(vs);
      veil = document.createElement('div');
      veil.id = 'pg-hero-veil';
      hero.style.position = 'relative';
      hero.appendChild(veil);
    }

    var heroText = hero
      ? (hero.querySelector('.relative.z-10') || hero.querySelector('.relative.h-full'))
      : null;

    function startHeroEntrance() {
      if (veil) {
        requestAnimationFrame(function () {
          veil.classList.add('pg-veil-out');
          setTimeout(function () { if (veil.parentNode) veil.remove(); }, 950);
        });
      }
      if (hero) {
        requestAnimationFrame(function () { hero.classList.add('hero-anim-ready'); });
      }
      if (heroText && !hero.classList.contains('hero-index-section')) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(24px)';
        heroText.style.transition = 'opacity 0.75s ease 0.1s, transform 0.75s ease 0.1s';
        requestAnimationFrame(function () {
          setTimeout(function () {
            heroText.style.opacity = '1';
            heroText.style.transform = 'none';
          }, 30);
        });
      }
    }

    if (document.readyState === 'complete') { startHeroEntrance(); return; }

    var ls = document.createElement('style');
    ls.textContent = [
      '#pg-loader{position:fixed;inset:0;z-index:9999;background:#0a0a0a;',
        'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2rem;',
        'transition:opacity 0.4s ease;}',
      '#pg-loader.pg-hide{opacity:0;pointer-events:none;}',
      '#pg-loader-logo{font-family:"Bebas Neue",sans-serif;font-size:3.5rem;',
        'letter-spacing:6px;color:#fff;animation:pg-pulse 1.4s ease-in-out infinite;}',
      '#pg-loader-logo span{color:#FF5F1F;}',
      '#pg-bar-track{width:160px;height:2px;background:rgba(255,255,255,0.08);',
        'border-radius:2px;overflow:hidden;}',
      '#pg-bar-fill{height:100%;width:0%;background:linear-gradient(90deg,#FF5F1F,#ef4444);',
        'border-radius:2px;transition:width 0.25s ease;}',
      '@keyframes pg-pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}',
    ].join('');
    document.head.appendChild(ls);

    var loader = document.createElement('div');
    loader.id = 'pg-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = '<div id="pg-loader-logo">IRON PULSE<span>.</span></div>'
                     + '<div id="pg-bar-track"><div id="pg-bar-fill"></div></div>';
    document.body.appendChild(loader);

    var bar = document.getElementById('pg-bar-fill');
    var progress = 0;
    var ticker = setInterval(function () {
      var step = progress < 70 ? 14 : progress < 90 ? 5 : 1;
      progress = Math.min(progress + step, 94);
      bar.style.width = progress + '%';
    }, 100);

    function hideLoader() {
      clearInterval(ticker);
      bar.style.width = '100%';
      setTimeout(function () {
        loader.classList.add('pg-hide');
        setTimeout(function () { loader.remove(); startHeroEntrance(); }, 420);
      }, 80);
    }

    window.addEventListener('load', hideLoader);
    var fallback = setTimeout(hideLoader, 5000);
    window.addEventListener('load', function () { clearTimeout(fallback); });
  }

  /* ── 2. ROUTE MAP & LINKS ───────────────────────────────────────── */
  var ROUTES = {
    '/':           'index.html',
    '/classes':    'classes.html',
    '/trainers':   'training.html',
    '/training':   'training.html',
    '/schedule':   'schedule.html',
    '/contact':    'contact.html',
    '/membership': 'membership.html',
    '/privacy':    '#',
    '/terms':      '#'
  };

  function resolveHref(p) {
    if (/\.html$/.test(p) || /^https?:/.test(p) || p === '#') return p;
    return ROUTES[p] || (p.replace(/^\//, '') + '.html');
  }

  function fixLinks() {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var raw = a.getAttribute('href');
      if (!raw || /^https?:/.test(raw) || /^#/.test(raw) || /^mailto/.test(raw) || /^tel/.test(raw)) return;
      var resolved = resolveHref(raw);
      if (resolved !== raw) a.setAttribute('href', resolved);
    });
  }

  /* ── 3. HERO WEBP ───────────────────────────────────────────────── */
  function replaceHeroVideos() {
    var v1 = document.getElementById('hero-video-1');
    var v2 = document.getElementById('hero-video-2');
    if (!v1) return;
    var img = document.createElement('img');
    img.id = 'hero-img'; img.src = 'media/hero.webp'; img.alt = 'Iron Pulse';
    img.loading = 'eager'; img.fetchPriority = 'high';
    img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;';
    v1.parentNode.insertBefore(img, v1);
    v1.remove();
    if (v2) v2.remove();
  }

  /* ── 4. NAVBAR SCROLL ───────────────────────────────────────────── */
  function initNavbar() {
    var nav = document.querySelector('nav');
    if (!nav) return;
    function onScroll() {
      var scrolled = window.scrollY > 60;
      nav.style.background     = scrolled ? 'rgba(10,10,10,0.96)' : 'transparent';
      nav.style.backdropFilter = scrolled ? 'blur(12px)' : 'none';
      nav.style.boxShadow      = scrolled ? '0 1px 0 rgba(255,95,31,0.1)' : 'none';
      nav.style.paddingTop     = scrolled ? '0.8rem' : '';
      nav.style.paddingBottom  = scrolled ? '0.8rem' : '';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── 5. MOBILE MENU ─────────────────────────────────────────────── */
  function initMobileMenu() {
    var hamburger = document.querySelector('nav button');
    if (!hamburger) return;

    var currentFile = window.location.pathname.split('/').pop() || 'index.html';

    var style = document.createElement('style');
    style.textContent = [
      '#pm-overlay{position:fixed;inset:0;z-index:200;background:#0d0d0d;',
        'display:flex;flex-direction:column;opacity:0;pointer-events:none;',
        'transition:opacity 0.28s ease;}',
      '.pm-open #pm-overlay{opacity:1;pointer-events:auto;}',
      '.pm-open body{overflow:hidden;}',
      '#pm-overlay .pm-close{position:absolute;top:1.25rem;right:1.25rem;',
        'background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.7);',
        'padding:6px;line-height:1;transition:color 0.18s;}',
      '#pm-overlay .pm-close:hover{color:#FF5F1F;}',
      '#pm-overlay .pm-logo{font-family:"Bebas Neue",sans-serif;font-size:2rem;',
        'letter-spacing:3px;color:#fff;padding:1.4rem 1.5rem 0;flex-shrink:0;}',
      '#pm-overlay .pm-logo span{color:#FF5F1F;}',
      '#pm-overlay .pm-sep{height:1px;background:rgba(255,255,255,0.08);',
        'margin:1rem 1.5rem;flex-shrink:0;}',
      '#pm-nav{flex:1;display:flex;flex-direction:column;padding:0 1.5rem;',
        'justify-content:center;gap:0;overflow:hidden;}',
      '#pm-nav a{position:relative;display:block;font-family:"Oswald",sans-serif;',
        'font-size:0.95rem;letter-spacing:2px;text-transform:uppercase;',
        'text-decoration:none;color:#fff;padding:1rem 0;font-weight:500;',
        'border-bottom:1px solid rgba(255,255,255,0.08);transition:color 0.18s;',
        'opacity:0;transform:translateY(8px);}',
      '#pm-nav a::after{content:"";position:absolute;bottom:0;left:0;',
        'width:0;height:2px;background:#FF5F1F;transition:width 0.3s ease;}',
      '#pm-nav a.pm-active{color:#FF5F1F;}',
      '#pm-nav a.pm-active::after{width:100%;}',
      '#pm-nav a:hover{color:#FF5F1F;}',
      '#pm-cta{padding:1.25rem 1.5rem 2.25rem;flex-shrink:0;}',
      '#pm-cta a{display:block;text-align:center;',
        'background:linear-gradient(90deg,#FF5F1F,#ef4444);',
        'color:#fff;text-decoration:none;font-family:Oswald,sans-serif;',
        'font-size:0.85rem;font-weight:600;letter-spacing:4px;',
        'text-transform:uppercase;padding:1rem;transition:opacity 0.2s;}',
      '#pm-cta a:hover{opacity:0.88;}',
    ].join('');
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.id = 'pm-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    var closeBtn = document.createElement('button');
    closeBtn.className = 'pm-close';
    closeBtn.setAttribute('aria-label', 'Fermer le menu');
    closeBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    overlay.appendChild(closeBtn);

    var logoEl = document.createElement('div');
    logoEl.className = 'pm-logo';
    logoEl.innerHTML = 'PULSE<span>.</span>';
    overlay.appendChild(logoEl);

    var sep = document.createElement('div');
    sep.className = 'pm-sep';
    overlay.appendChild(sep);

    var navEl = document.createElement('nav');
    navEl.id = 'pm-nav';
    [
      { label:'Accueil',       href:'index.html'      },
      { label:'Cours',         href:'classes.html'    },
      { label:'Entra\u00eeneurs', href:'training.html' },
      { label:'Horaire',       href:'schedule.html'   },
      { label:'Contact',       href:'contact.html'    }
    ].forEach(function (pg) {
      var a = document.createElement('a');
      a.href = pg.href; a.textContent = pg.label;
      if (pg.href === currentFile) a.classList.add('pm-active');
      navEl.appendChild(a);
    });
    overlay.appendChild(navEl);

    var ctaDiv = document.createElement('div');
    ctaDiv.id = 'pm-cta';
    ctaDiv.innerHTML = '<a href="membership.html">REJOINDRE</a>';
    overlay.appendChild(ctaDiv);
    document.body.appendChild(overlay);

    var staggerTimers = [];
    function open() {
      document.body.classList.add('pm-open');
      overlay.setAttribute('aria-hidden', 'false');
      staggerTimers.forEach(clearTimeout); staggerTimers = [];
      var links = navEl.querySelectorAll('a');
      links.forEach(function (a) { a.style.transition='none'; a.style.opacity='0'; a.style.transform='translateY(8px)'; });
      links.forEach(function (a, i) {
        var t = setTimeout(function () {
          a.style.transition = 'opacity 0.3s ease, transform 0.3s ease, color 0.18s';
          a.style.opacity = '1'; a.style.transform = 'none';
        }, 80 + i * 60);
        staggerTimers.push(t);
      });
    }
    function close() {
      document.body.classList.remove('pm-open');
      overlay.setAttribute('aria-hidden', 'true');
    }
    hamburger.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    navEl.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    ctaDiv.querySelector('a').addEventListener('click', close);
  }

  /* ── 6. SCROLL REVEAL ───────────────────────────────────────────── */
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        setTimeout(function () {
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          el.style.opacity = '1'; el.style.transform = 'none';
        }, i * 55);
        observer.unobserve(el);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    document.querySelectorAll('*').forEach(function (el) {
      if (el.id === 'hero-video-2') return;
      var s = el.style;
      if (s && (s.opacity === '0' || s.opacity === 0)) observer.observe(el);
    });
  }

  /* ── INIT ────────────────────────────────────────────────────────── */
  function init() {
    injectLayout();        /* nav + footer */
    injectResourceHints();
    initLoaderAndHero();
    fixLinks();
    replaceHeroVideos();
    initNavbar();
    initMobileMenu();
    initReveal();
    initLazyImages();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();