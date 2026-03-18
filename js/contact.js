// ─────────────────────────────────────────────
//  IRON PULSE — contact.js  (v3 — split modal)
//  Formulaire + pre-fill via URL params + modal d'envoi
// ─────────────────────────────────────────────

(function () {
  'use strict';

  const WHATSAPP_NUMBER = "18098786115";
  const EMAIL_ADDRESS   = "lunarojadigital@gmail.com";
  const GYM_NAME        = "Iron Pulse";

  const E = {
    muscle : "\uD83D\uDCAA",
    person : "\uD83D\uDC64",
    mail   : "\uD83D\uDCE7",
    phone  : "\uD83D\uDCDE",
    clip   : "\uD83D\uDCCB",
    bubble : "\uD83D\uDCAC",
    coach  : "\uD83C\uDFCB",
    type   : "\uD83D\uDCCB",
  };

  var SUBJECT_LABELS = {
    general:    "Renseignement g\u00e9n\u00e9ral",
    membership: "Abonnement",
    training:   "Entra\u00eenement personnel",
    classes:    "Cours en groupe"
  };

  var COACH_LABELS = {
    "james-carter":    "James Carter \u2014 Force & Hypertrophie",
    "emma-dubois":     "Emma Dubois \u2014 HIIT & Cardio",
    "marcus-fontaine": "Marcus Fontaine \u2014 Halt\u00e9rophilie \u00c9lite",
    "chen-wei":        "Chen Wei \u2014 Mobilit\u00e9 & Fonctionnel"
  };

  var COACH_META = {
    "james-carter":    { img: "img/james-wilson.jpg",  initials: "JC" },
    "emma-dubois":     { img: "img/emma-davis.jpg",    initials: "ED" },
    "marcus-fontaine": { img: "img/marcus-stone.jpg",  initials: "MF" },
    "chen-wei":        { img: "img/maya-chen.jpg",     initials: "CW" }
  };

  var TRAINING_LABELS = {
    "coaching-prive": "Coaching priv\u00e9 (1-on-1)",
    "semi-prive":     "Semi-priv\u00e9 (2\u20134 personnes)",
    "programme":      "Programme personnalis\u00e9",
    "bilan":          "Bilan fitness initial"
  };

  // ── Styles ──────────────────────────────────
  var style = document.createElement("style");
  style.textContent = [
    /* overlay */
    "#ip-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:12px;background:rgba(0,0,0,0);backdrop-filter:blur(0);-webkit-backdrop-filter:blur(0);transition:background .38s,backdrop-filter .38s,-webkit-backdrop-filter .38s;pointer-events:none}",
    "#ip-overlay.ip-visible{background:rgba(0,0,0,.86);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);pointer-events:all}",
    /* modal */
    "#ip-modal{width:100%;max-width:600px;max-height:96vh;overflow-y:auto;scrollbar-width:none;background:#0d0d0d;border:1px solid rgba(255,255,255,.07);transform:translateY(36px) scale(.96);opacity:0;transition:transform .42s cubic-bezier(.22,1,.36,1),opacity .38s ease}",
    "#ip-modal::-webkit-scrollbar{display:none}",
    "#ip-overlay.ip-visible #ip-modal{transform:translateY(0) scale(1);opacity:1}",
    "#ip-modal::before{content:'';display:block;height:2px;background:linear-gradient(90deg,#ff6b00,#ef4444,#ff6b00);background-size:200% 100%;animation:ip-grad 3s linear infinite}",
    "@keyframes ip-grad{0%{background-position:0%}100%{background-position:200%}}",
    /* split */
    "#ip-split{display:grid;grid-template-columns:1fr 1fr}",
    "@media(max-width:520px){#ip-split{grid-template-columns:1fr}}",
    /* left */
    "#ip-left{padding:20px 18px;border-right:1px solid rgba(255,255,255,.06)}",
    "@media(max-width:520px){#ip-left{border-right:none;border-bottom:1px solid rgba(255,255,255,.06);padding:16px 16px 14px}}",
    "#ip-recap-tag{font-family:'Oswald',sans-serif;font-size:.55rem;letter-spacing:4px;text-transform:uppercase;color:rgba(255,95,31,.55);margin-bottom:14px}",
    /* coach block */
    "#ip-coach-block{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.02);margin-bottom:14px}",
    "#ip-coach-block.ip-hidden{display:none}",
    "#ip-coach-avatar{width:40px;height:40px;border-radius:50%;object-fit:cover;object-position:top;border:1.5px solid rgba(255,95,31,.3);flex-shrink:0}",
    "#ip-coach-initials{width:40px;height:40px;border-radius:50%;background:rgba(255,95,31,.1);border:1.5px solid rgba(255,95,31,.25);display:none;align-items:center;justify-content:center;font-family:'Oswald',sans-serif;font-size:.72rem;letter-spacing:1px;color:#ff5f1f;flex-shrink:0}",
    "#ip-coach-nm{font-family:'Oswald',sans-serif;font-size:.8rem;letter-spacing:1.5px;text-transform:uppercase;color:#fff;line-height:1.2}",
    "#ip-coach-sp{font-family:'Oswald',sans-serif;font-size:.56rem;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,95,31,.5);margin-top:3px}",
    /* recap rows */
    ".ip-r-row{display:flex;justify-content:space-between;align-items:baseline;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.04)}",
    ".ip-r-row:last-of-type{border-bottom:none}",
    ".ip-r-k{font-family:'Oswald',sans-serif;font-size:.56rem;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.2);flex-shrink:0;padding-right:10px}",
    ".ip-r-v{font-family:'Oswald',sans-serif;font-size:.76rem;letter-spacing:.5px;color:rgba(255,255,255,.65);text-align:right;word-break:break-word}",
    /* message */
    "#ip-msg-box{margin-top:12px;padding:10px 12px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05)}",
    "#ip-msg-lbl{font-family:'Oswald',sans-serif;font-size:.54rem;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.18);margin-bottom:5px}",
    "#ip-msg-txt{font-family:'Oswald',sans-serif;font-size:.74rem;color:rgba(255,255,255,.38);line-height:1.65;max-height:72px;overflow:hidden}",
    /* right */
    "#ip-right{padding:20px 18px;display:flex;flex-direction:column;justify-content:space-between}",
    "@media(max-width:520px){#ip-right{padding:16px 16px 18px}}",
    "#ip-right-top{margin-bottom:18px}",
    "#ip-send-title{font-family:'Oswald',sans-serif;font-size:1.35rem;letter-spacing:2px;color:#fff;line-height:1;margin-bottom:4px}",
    "#ip-send-sub{font-family:'Oswald',sans-serif;font-size:.58rem;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.22)}",
    /* channel buttons */
    ".ip-ch-btn{display:flex;align-items:center;gap:11px;padding:12px 14px;border:1px solid;cursor:pointer;transition:background .18s,border-color .18s;margin-bottom:9px;text-decoration:none}",
    ".ip-ch-btn:last-of-type{margin-bottom:0}",
    ".ip-ch-btn.wa{border-color:rgba(37,211,102,.2);background:rgba(37,211,102,.03)}",
    ".ip-ch-btn.wa:hover{border-color:rgba(37,211,102,.45);background:rgba(37,211,102,.07)}",
    ".ip-ch-btn.em{border-color:rgba(255,107,0,.2);background:rgba(255,107,0,.03)}",
    ".ip-ch-btn.em:hover{border-color:rgba(255,107,0,.45);background:rgba(255,107,0,.07)}",
    ".ip-ch-ic{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}",
    ".ip-ch-ic.wa{background:rgba(37,211,102,.1);border:1px solid rgba(37,211,102,.2)}",
    ".ip-ch-ic.em{background:rgba(255,107,0,.1);border:1px solid rgba(255,107,0,.2)}",
    ".ip-ch-ic svg{width:15px;height:15px}",
    ".ip-ch-nm{font-family:'Oswald',sans-serif;font-size:.72rem;letter-spacing:2.5px;text-transform:uppercase;font-weight:600;line-height:1}",
    ".ip-ch-nm.wa{color:#25D366}",
    ".ip-ch-nm.em{color:#ff6b00}",
    ".ip-ch-ds{font-family:'Oswald',sans-serif;font-size:.56rem;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.2);margin-top:2px}",
    ".ip-ch-arr{margin-left:auto;font-size:.85rem;color:rgba(255,255,255,.12);transition:transform .18s,color .18s}",
    ".ip-ch-btn.wa:hover .ip-ch-arr{color:#25D366;transform:translateX(3px)}",
    ".ip-ch-btn.em:hover .ip-ch-arr{color:#ff6b00;transform:translateX(3px)}",
    /* cancel */
    "#ip-cancel{font-family:'Oswald',sans-serif;font-size:.58rem;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.18);cursor:pointer;text-align:center;margin-top:14px;transition:color .18s}",
    "#ip-cancel:hover{color:rgba(255,255,255,.4)}",
    /* success */
    "#ip-success{display:none;flex-direction:column;align-items:center;justify-content:center;padding:3rem 2rem;text-align:center;gap:1rem}",
    "#ip-success.ip-show{display:flex}",
    "#ip-success-ring{width:68px;height:68px;border-radius:50%;border:2px solid #ff6b00;display:flex;align-items:center;justify-content:center;animation:ip-pop .45s cubic-bezier(.22,1,.36,1)}",
    "@keyframes ip-pop{0%{transform:scale(.6);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}",
    "#ip-success-ring svg{width:30px;height:30px;stroke:#ff6b00;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}",
    "#ip-success-title{font-family:'Oswald',sans-serif;font-size:clamp(1.5rem,4vw,1.9rem);letter-spacing:3px;color:#fff}",
    "#ip-success-sub{font-family:'Oswald',sans-serif;font-size:.72rem;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.3);line-height:1.7}"
  ].join("");
  document.head.appendChild(style);

  // ── SVG constants ────────────────────────────
  var WA_SVG = '<svg viewBox="0 0 24 24" fill="#25D366" width="15" height="15"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  var EM_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="#ff6b00" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 8.5 6a2 2 0 002 0L21 7"/></svg>';

  // ── Modal DOM ────────────────────────────────
  var overlay = document.createElement("div");
  overlay.id = "ip-overlay";
  overlay.innerHTML =
    '<div id="ip-modal" role="dialog" aria-modal="true">' +
      '<div id="ip-split">' +
        '<div id="ip-left">' +
          '<div id="ip-recap-tag">\u2014 R\u00e9capitulatif \u2014</div>' +
          '<div id="ip-coach-block" class="ip-hidden">' +
            '<div id="ip-coach-avatar-wrap"></div>' +
            '<div id="ip-coach-text">' +
              '<div id="ip-coach-nm"></div>' +
              '<div id="ip-coach-sp"></div>' +
            '</div>' +
          '</div>' +
          '<div id="ip-recap-rows"></div>' +
          '<div id="ip-msg-box">' +
            '<div id="ip-msg-lbl">Message</div>' +
            '<div id="ip-msg-txt"></div>' +
          '</div>' +
        '</div>' +
        '<div id="ip-right">' +
          '<div id="ip-right-top">' +
            '<div id="ip-send-title">ENVOYER</div>' +
            '<div id="ip-send-sub">Choisis ton canal</div>' +
          '</div>' +
          '<div id="ip-channels">' +
            '<a id="ip-btn-wa" class="ip-ch-btn wa" href="#" target="_blank" rel="noopener noreferrer">' +
              '<div class="ip-ch-ic wa">' + WA_SVG + '</div>' +
              '<div><div class="ip-ch-nm wa">WhatsApp</div><div class="ip-ch-ds">Message direct</div></div>' +
              '<span class="ip-ch-arr">\u2192</span>' +
            '</a>' +
            '<a id="ip-btn-email" class="ip-ch-btn em" href="#">' +
              '<div class="ip-ch-ic em">' + EM_SVG + '</div>' +
              '<div><div class="ip-ch-nm em">Courriel</div><div class="ip-ch-ds">Envoyer par mail</div></div>' +
              '<span class="ip-ch-arr">\u2192</span>' +
            '</a>' +
          '</div>' +
          '<div id="ip-cancel">Annuler</div>' +
        '</div>' +
      '</div>' +
      '<div id="ip-success">' +
        '<div id="ip-success-ring"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>' +
        '<div id="ip-success-title">ENVOY\u00c9\u00a0!</div>' +
        '<div id="ip-success-sub">Merci\u00a0! On revient vers toi tr\u00e8s bient\u00f4t.</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  // ── Element refs ─────────────────────────────
  var splitEl   = document.getElementById("ip-split");
  var successEl = document.getElementById("ip-success");
  var btnWa     = document.getElementById("ip-btn-wa");
  var btnEmail  = document.getElementById("ip-btn-email");
  var cancelEl  = document.getElementById("ip-cancel");
  var formData  = {};

  // ── Modal controls ────────────────────────────
  function openModal()  {
    overlay.classList.add("ip-visible");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    overlay.classList.remove("ip-visible");
    document.body.style.overflow = "";
    setTimeout(resetModal, 460);
  }
  function resetModal() {
    successEl.classList.remove("ip-show");
    if (splitEl) splitEl.style.display = "";
  }

  cancelEl.addEventListener("click", closeModal);
  overlay.addEventListener("click", function(e) { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", function(e) { if (e.key === "Escape") closeModal(); });

  // ── Build preview (populates DOM directly) ───
  function buildPreview(d) {
    var coachBlock  = document.getElementById("ip-coach-block");
    var coachAvWrap = document.getElementById("ip-coach-avatar-wrap");
    var coachNm     = document.getElementById("ip-coach-nm");
    var coachSp     = document.getElementById("ip-coach-sp");

    if (d.coach && COACH_META[d.coach]) {
      var meta  = COACH_META[d.coach];
      var label = COACH_LABELS[d.coach] || d.coach;
      var parts = label.split(" \u2014 ");
      coachNm.textContent = parts[0] || label;
      coachSp.textContent = parts[1] || "";
      var img = document.createElement("img");
      img.id = "ip-coach-avatar";
      img.src = meta.img;
      img.alt = parts[0] || "";
      img.onerror = function() {
        img.style.display = "none";
        var ini = document.getElementById("ip-coach-initials");
        if (ini) ini.style.display = "flex";
      };
      var ini = document.createElement("div");
      ini.id = "ip-coach-initials";
      ini.textContent = meta.initials;
      coachAvWrap.innerHTML = "";
      coachAvWrap.appendChild(img);
      coachAvWrap.appendChild(ini);
      coachBlock.classList.remove("ip-hidden");
    } else {
      coachBlock.classList.add("ip-hidden");
    }

    var subj = SUBJECT_LABELS[d.subject] || d.subject;
    var type = d.training_type ? (TRAINING_LABELS[d.training_type] || d.training_type) : "\u2014";
    var rows = [
      ["Nom",       d.name],
      ["Courriel",  d.email],
      ["T\u00e9l.", d.phone || "\u2014"],
      ["Sujet",     subj],
      ["Type",      type]
    ];
    document.getElementById("ip-recap-rows").innerHTML = rows.map(function(r) {
      return '<div class="ip-r-row"><span class="ip-r-k">' + r[0] +
             '</span><span class="ip-r-v">' + r[1] + '</span></div>';
    }).join("");
    document.getElementById("ip-msg-txt").textContent = d.message;
  }

  // ── Success screen ───────────────────────────
  function showSuccess() {
    if (splitEl) splitEl.style.display = "none";
    successEl.classList.add("ip-show");
    setTimeout(closeModal, 3000);
  }

  // ── Message builders ─────────────────────────
  function buildWaText(d) {
    var subj  = SUBJECT_LABELS[d.subject] || d.subject;
    var coach = d.coach ? (COACH_LABELS[d.coach] || d.coach) : "\u2014";
    var type  = d.training_type ? (TRAINING_LABELS[d.training_type] || d.training_type) : "\u2014";
    return E.muscle + " *" + GYM_NAME + " \u2014 Nouveau message*\n\n" +
           E.person + " *Nom :* " + d.name + "\n" +
           E.mail   + " *Courriel :* " + d.email + "\n" +
           E.phone  + " *T\u00e9l\u00e9phone :* " + (d.phone || "\u2014") + "\n" +
           E.clip   + " *Sujet :* " + subj + "\n" +
           E.coach  + " *Coach :* " + coach + "\n" +
           E.type   + " *Type :* " + type + "\n\n" +
           E.bubble + " *Message :*\n" + d.message;
  }

  function buildEmailSubject(d) {
    var coach = d.coach ? " \u2014 " + (COACH_LABELS[d.coach] || d.coach).split(" \u2014")[0] : "";
    return "[" + GYM_NAME + "] " + (SUBJECT_LABELS[d.subject] || d.subject) + coach + " \u2014 " + d.name;
  }

  function buildEmailBody(d) {
    var subj  = SUBJECT_LABELS[d.subject] || d.subject;
    var coach = d.coach ? (COACH_LABELS[d.coach] || d.coach) : "\u2014";
    var type  = d.training_type ? (TRAINING_LABELS[d.training_type] || d.training_type) : "\u2014";
    var sep   = "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500";
    return "Bonjour,\n\nVous avez re\u00e7u un nouveau message via le formulaire de contact de " + GYM_NAME + ".\n\n" +
           sep + "\n" +
           "Nom            : " + d.name + "\n" +
           "Courriel       : " + d.email + "\n" +
           "T\u00e9l\u00e9phone     : " + (d.phone || "\u2014") + "\n" +
           "Sujet          : " + subj + "\n" +
           "Coach souhait\u00e9 : " + coach + "\n" +
           "Type           : " + type + "\n" +
           sep + "\n\n" + d.message + "\n\n" + sep + "\nEnvoy\u00e9 depuis ironpulse.ca";
  }

  // ── Channel buttons ──────────────────────────
  btnWa.addEventListener("click", function(e) {
    e.preventDefault();
    window.open(
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(buildWaText(formData)),
      "_blank", "noopener,noreferrer"
    );
    setTimeout(showSuccess, 200);
  });

  btnEmail.addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "mailto:" + EMAIL_ADDRESS +
      "?subject=" + encodeURIComponent(buildEmailSubject(formData)) +
      "&body=" + encodeURIComponent(buildEmailBody(formData));
    setTimeout(showSuccess, 400);
  });

  // ── Pre-fill depuis URL params (?coach=james-carter) ──
  function prefillFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var coachParam = params.get("coach");
    if (!coachParam) return;

    setTimeout(function() {
      if (window.ipSelectSubject) window.ipSelectSubject("training");
      if (window.ipSelectCoach)   window.ipSelectCoach(coachParam);
      if (window.ipSelectType)    window.ipSelectType("coaching-prive");
    }, 100);

    var form = document.querySelector("form");
    if (form) {
      setTimeout(function() {
        form.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }

  // ── Attach form submit ────────────────────────
  function attachForm() {
    prefillFromUrl();

    var form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      formData = {
        name          : (form.querySelector("#name")          || {}).value.trim(),
        email         : (form.querySelector("#email")         || {}).value.trim(),
        phone         : (form.querySelector("#phone")         || {}).value.trim(),
        subject       : (form.querySelector("#subject")       || {}).value || "general",
        coach         : (form.querySelector("#coach")         || {}).value || "",
        training_type : (form.querySelector("#training_type") || {}).value || "",
        message       : (form.querySelector("#message")       || {}).value.trim()
      };

      if (!formData.name || !formData.email || !formData.message) return;

      buildPreview(formData);
      resetModal();
      openModal();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachForm);
  } else {
    attachForm();
  }

})();
