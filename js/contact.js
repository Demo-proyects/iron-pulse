// ─────────────────────────────────────────────
//  IRON PULSE — contact.js
//  Formulaire + pre-fill via URL params + modal d'envoi
// ─────────────────────────────────────────────

(function () {

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

  // ── Labels ───────────────────────────────────
  var SUBJECT_LABELS = {
    general:    "Renseignement g\u00e9n\u00e9ral",
    membership: "Abonnement",
    training:   "Entra\u00eenement personnel",
    classes:    "Cours en groupe"
  };

  var COACH_LABELS = {
    "james-carter":   "James Carter \u2014 Force & Hypertrophie",
    "emma-dubois":    "Emma Dubois \u2014 HIIT & Cardio",
    "marcus-fontaine":"Marcus Fontaine \u2014 Halt\u00e9rophilie \u00c9lite",
    "chen-wei":       "Chen Wei \u2014 Mobilit\u00e9 & Fonctionnel"
  };

  var TRAINING_LABELS = {
    "coaching-prive": "Coaching priv\u00e9 (1-on-1)",
    "semi-prive":     "Semi-priv\u00e9 (2\u20134 personnes)",
    "programme":      "Programme personnalis\u00e9",
    "bilan":          "Bilan fitness initial"
  };

  // ── Styles ──────────────────────────────────
  const style = document.createElement("style");
  style.textContent = [
    "#ip-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(0,0,0,0);backdrop-filter:blur(0px);-webkit-backdrop-filter:blur(0px);transition:background .4s ease,backdrop-filter .4s ease,-webkit-backdrop-filter .4s ease;pointer-events:none}",
    "#ip-overlay.ip-visible{background:rgba(0,0,0,.88);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);pointer-events:all}",
    "#ip-modal{width:100%;max-width:580px;max-height:95vh;overflow-y:auto;scrollbar-width:none;background:#0d0d0d;border:1px solid rgba(255,255,255,.08);border-radius:22px;transform:translateY(44px) scale(.95);opacity:0;transition:transform .45s cubic-bezier(.22,1,.36,1),opacity .45s ease;position:relative}",
    "#ip-modal::-webkit-scrollbar{display:none}",
    "#ip-overlay.ip-visible #ip-modal{transform:translateY(0) scale(1);opacity:1}",
    "#ip-modal::before{content:'';display:block;height:3px;background:linear-gradient(90deg,#ff6b00,#ef4444,#eab308,#ff6b00);background-size:300% 100%;animation:ip-grad 4s linear infinite}",
    "@keyframes ip-grad{0%{background-position:0% 50%}100%{background-position:300% 50%}}",
    "#ip-inner{padding:1.8rem 2rem 2rem}",
    "#ip-modal-header{text-align:center;position:relative;margin-bottom:1.6rem}",
    "#ip-modal-icon{width:60px;height:60px;margin:0 auto 1.1rem;background:linear-gradient(135deg,rgba(255,107,0,.13),rgba(239,68,68,.13));border:1px solid rgba(255,107,0,.28);border-radius:50%;display:flex;align-items:center;justify-content:center}",
    "#ip-modal-icon svg{width:27px;height:27px;color:#ff6b00}",
    "#ip-modal-title{font-family:var(--font-display,'Anton',sans-serif);font-size:clamp(1.7rem,4vw,2.1rem);color:#fff;letter-spacing:.05em;line-height:1;margin-bottom:.35rem}",
    "#ip-modal-subtitle{font-size:.75rem;color:rgba(255,255,255,.38);letter-spacing:.1em;text-transform:uppercase}",
    "#ip-preview{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:1.3rem 1.5rem;margin-bottom:1.6rem}",
    "#ip-preview-label{font-size:.68rem;text-transform:uppercase;letter-spacing:.13em;color:#ff6b00;margin-bottom:1rem;display:flex;align-items:center;gap:.5rem}",
    "#ip-preview-label::after{content:'';flex:1;height:1px;background:rgba(255,107,0,.18)}",
    ".ip-preview-row{display:flex;gap:.8rem;margin-bottom:.55rem;align-items:baseline}",
    ".ip-preview-key{color:rgba(255,255,255,.32);min-width:90px;flex-shrink:0;font-size:.72rem;text-transform:uppercase;letter-spacing:.06em}",
    ".ip-preview-val{color:rgba(255,255,255,.82);font-size:.84rem;line-height:1.5;word-break:break-all}",
    ".ip-preview-msg{margin-top:.9rem;padding-top:.9rem;border-top:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.65);font-size:.84rem;line-height:1.65;white-space:pre-wrap}",
    "#ip-choose-label{text-align:center;font-size:.68rem;text-transform:uppercase;letter-spacing:.15em;color:rgba(255,255,255,.22);margin-bottom:1rem}",
    "#ip-buttons{display:grid;grid-template-columns:1fr 1fr;gap:1rem}",
    ".ip-send-btn{position:relative;border:none;border-radius:16px;padding:1.6rem 1.2rem;cursor:pointer;overflow:hidden;display:flex;flex-direction:column;align-items:center;gap:.7rem;transition:transform .2s ease,box-shadow .25s ease,border-color .25s ease;text-decoration:none}",
    ".ip-send-btn:hover{transform:translateY(-4px)}.ip-send-btn:active{transform:translateY(0)}",
    ".ip-btn-wa{background:linear-gradient(160deg,#0d2016,#081208);border:1px solid rgba(37,211,102,.18)}",
    ".ip-btn-wa:hover{border-color:rgba(37,211,102,.5);box-shadow:0 10px 45px rgba(37,211,102,.14)}",
    ".ip-btn-wa .ip-btn-icon{width:48px;height:48px;background:rgba(37,211,102,.1);border:1px solid rgba(37,211,102,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background .2s,border-color .2s}",
    ".ip-btn-wa:hover .ip-btn-icon{background:rgba(37,211,102,.2);border-color:rgba(37,211,102,.4)}",
    ".ip-btn-wa .ip-btn-icon svg{width:24px;height:24px;fill:#25D366}",
    ".ip-btn-wa .ip-btn-name{color:#25D366;font-size:.78rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}",
    ".ip-btn-wa .ip-btn-desc{color:rgba(255,255,255,.28);font-size:.7rem}",
    ".ip-btn-email{background:linear-gradient(160deg,#1f0d00,#130800);border:1px solid rgba(255,107,0,.18)}",
    ".ip-btn-email:hover{border-color:rgba(255,107,0,.5);box-shadow:0 10px 45px rgba(255,107,0,.14)}",
    ".ip-btn-email .ip-btn-icon{width:48px;height:48px;background:rgba(255,107,0,.1);border:1px solid rgba(255,107,0,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background .2s,border-color .2s}",
    ".ip-btn-email:hover .ip-btn-icon{background:rgba(255,107,0,.2);border-color:rgba(255,107,0,.4)}",
    ".ip-btn-email .ip-btn-icon svg{width:24px;height:24px;stroke:#ff6b00;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}",
    ".ip-btn-email .ip-btn-name{color:#ff6b00;font-size:.78rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}",
    ".ip-btn-email .ip-btn-desc{color:rgba(255,255,255,.28);font-size:.7rem}",
    ".ip-send-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(110deg,transparent 38%,rgba(255,255,255,.045) 50%,transparent 62%);transform:translateX(-120%);transition:transform .55s ease}",
    ".ip-send-btn:hover::after{transform:translateX(120%)}",
    "#ip-close{position:absolute;top:0;right:0;width:34px;height:34px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.38);transition:background .2s,color .2s}",
    "#ip-close:hover{background:rgba(255,255,255,.13);color:#fff}",
    "#ip-close svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round}",
    "#ip-success{display:none;flex-direction:column;align-items:center;justify-content:center;padding:3.5rem 2rem;text-align:center;gap:1.1rem}",
    "#ip-success.ip-show{display:flex}",
    "#ip-success-ring{width:76px;height:76px;border-radius:50%;background:linear-gradient(135deg,rgba(255,107,0,.13),rgba(239,68,68,.13));border:2px solid #ff6b00;display:flex;align-items:center;justify-content:center;animation:ip-pop .5s cubic-bezier(.22,1,.36,1)}",
    "@keyframes ip-pop{0%{transform:scale(.6);opacity:0}70%{transform:scale(1.12)}100%{transform:scale(1);opacity:1}}",
    "#ip-success-ring svg{width:36px;height:36px;stroke:#ff6b00;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}",
    "#ip-success-title{font-family:var(--font-display,'Anton',sans-serif);font-size:clamp(1.6rem,4vw,2rem);color:#fff;letter-spacing:.05em}",
    "#ip-success-sub{color:rgba(255,255,255,.38);font-size:.86rem;line-height:1.6}",
    "@media(max-width:520px){#ip-inner{padding:1.4rem 1.2rem 1.6rem}#ip-preview{padding:1rem 1.1rem}#ip-buttons{grid-template-columns:1fr;gap:.8rem}.ip-send-btn{flex-direction:row;padding:1.1rem 1.3rem;gap:1rem;text-align:left}.ip-send-btn .ip-btn-name,.ip-send-btn .ip-btn-desc{text-align:left}}"
  ].join("");
  document.head.appendChild(style);

  // ── Modal DOM ────────────────────────────────
  const overlay = document.createElement("div");
  overlay.id = "ip-overlay";
  overlay.innerHTML =
    '<div id="ip-modal" role="dialog" aria-modal="true">' +
      '<div id="ip-inner">' +
        '<div id="ip-modal-header">' +
          '<button id="ip-close" aria-label="Fermer"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
          '<div id="ip-modal-icon"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg></div>' +
          '<div id="ip-modal-title">ENVOYER</div>' +
          '<div id="ip-modal-subtitle">Choisis ton moyen d\'envoi</div>' +
        '</div>' +
        '<div id="ip-preview"><div id="ip-preview-label">Aper\u00e7u du message</div><div id="ip-preview-content"></div></div>' +
        '<div id="ip-choose-label">Continuer avec</div>' +
        '<div id="ip-buttons">' +
          '<a id="ip-btn-wa" class="ip-send-btn ip-btn-wa" href="#" target="_blank" rel="noopener noreferrer">' +
            '<div class="ip-btn-icon"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div>' +
            '<span class="ip-btn-name">WhatsApp</span>' +
            '<span class="ip-btn-desc">Message direct</span>' +
          '</a>' +
          '<a id="ip-btn-email" class="ip-send-btn ip-btn-email" href="#">' +
            '<div class="ip-btn-icon"><svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 8.5 6a2 2 0 002 0L21 7"/></svg></div>' +
            '<span class="ip-btn-name">Courriel</span>' +
            '<span class="ip-btn-desc">Envoyer par mail</span>' +
          '</a>' +
        '</div>' +
        '<div id="ip-success">' +
          '<div id="ip-success-ring"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>' +
          '<div id="ip-success-title">ENVOY\u00c9 !</div>' +
          '<div id="ip-success-sub">Merci ! On revient vers toi tr\u00e8s bient\u00f4t.</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  var closeBtn     = document.getElementById("ip-close");
  var previewBlock = document.getElementById("ip-preview");
  var previewEl    = document.getElementById("ip-preview-content");
  var chooseLabel  = document.getElementById("ip-choose-label");
  var buttonsEl    = document.getElementById("ip-buttons");
  var headerEl     = document.getElementById("ip-modal-header");
  var successEl    = document.getElementById("ip-success");
  var btnWa        = document.getElementById("ip-btn-wa");
  var btnEmail     = document.getElementById("ip-btn-email");
  var formData     = {};

  function openModal()  { overlay.classList.add("ip-visible"); document.body.style.overflow = "hidden"; }
  function closeModal() { overlay.classList.remove("ip-visible"); document.body.style.overflow = ""; setTimeout(resetModal, 460); }
  function resetModal() {
    successEl.classList.remove("ip-show");
    [headerEl, previewBlock, chooseLabel, buttonsEl].forEach(function(el){ el.style.display = ""; });
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", function(e){ if(e.target === overlay) closeModal(); });
  document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeModal(); });

  function buildPreview(d) {
    var subj  = SUBJECT_LABELS[d.subject] || d.subject;
    var coach = d.coach ? (COACH_LABELS[d.coach] || d.coach) : "\u2014";
    var type  = d.training_type ? (TRAINING_LABELS[d.training_type] || d.training_type) : "\u2014";
    var rows  = [
      ["Nom",       d.name],
      ["Courriel",  d.email],
      ["T\u00e9l.", d.phone || "\u2014"],
      ["Sujet",     subj],
      ["Coach",     coach],
      ["Type",      type]
    ];
    var html = rows.map(function(r){
      return '<div class="ip-preview-row"><span class="ip-preview-key">'+r[0]+'</span><span class="ip-preview-val">'+r[1]+'</span></div>';
    }).join("");
    return html + '<div class="ip-preview-msg">'+d.message+'</div>';
  }

  function buildWaText(d) {
    var subj  = SUBJECT_LABELS[d.subject] || d.subject;
    var coach = d.coach ? (COACH_LABELS[d.coach] || d.coach) : "\u2014";
    var type  = d.training_type ? (TRAINING_LABELS[d.training_type] || d.training_type) : "\u2014";
    return E.muscle+" *"+GYM_NAME+" \u2014 Nouveau message*\n\n"+
           E.person+" *Nom :* "+d.name+"\n"+
           E.mail  +" *Courriel :* "+d.email+"\n"+
           E.phone +" *T\u00e9l\u00e9phone :* "+(d.phone||"\u2014")+"\n"+
           E.clip  +" *Sujet :* "+subj+"\n"+
           E.coach +" *Coach :* "+coach+"\n"+
           E.type  +" *Type :* "+type+"\n\n"+
           E.bubble+" *Message :*\n"+d.message;
  }

  function buildEmailSubject(d) {
    var coach = d.coach ? " \u2014 "+( COACH_LABELS[d.coach] || d.coach).split(" \u2014")[0] : "";
    return "["+GYM_NAME+"] "+(SUBJECT_LABELS[d.subject]||d.subject)+coach+" \u2014 "+d.name;
  }

  function buildEmailBody(d) {
    var subj  = SUBJECT_LABELS[d.subject] || d.subject;
    var coach = d.coach ? (COACH_LABELS[d.coach] || d.coach) : "\u2014";
    var type  = d.training_type ? (TRAINING_LABELS[d.training_type] || d.training_type) : "\u2014";
    var sep   = "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500";
    return "Bonjour,\n\nVous avez re\u00e7u un nouveau message via le formulaire de contact de "+GYM_NAME+".\n\n"+
           sep+"\n"+
           "Nom           : "+d.name+"\n"+
           "Courriel      : "+d.email+"\n"+
           "T\u00e9l\u00e9phone    : "+(d.phone||"\u2014")+"\n"+
           "Sujet         : "+subj+"\n"+
           "Coach souhait\u00e9 : "+coach+"\n"+
           "Type          : "+type+"\n"+
           sep+"\n\n"+d.message+"\n\n"+sep+"\nEnvoy\u00e9 depuis ironpulse.ca";
  }

  function showSuccess() {
    [headerEl, previewBlock, chooseLabel, buttonsEl].forEach(function(el){ el.style.display = "none"; });
    successEl.classList.add("ip-show");
    setTimeout(closeModal, 3000);
  }

  btnWa.addEventListener("click", function(e) {
    e.preventDefault();
    window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(buildWaText(formData)), "_blank", "noopener,noreferrer");
    setTimeout(showSuccess, 200);
  });

  btnEmail.addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "mailto:"+EMAIL_ADDRESS+"?subject="+encodeURIComponent(buildEmailSubject(formData))+"&body="+encodeURIComponent(buildEmailBody(formData));
    setTimeout(showSuccess, 400);
  });

  // ── Pre-fill depuis URL params (?coach=james-carter) ──
  function prefillFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var coachParam = params.get("coach");
    if (!coachParam) return;

    var subjectEl       = document.getElementById("subject");
    var coachEl         = document.getElementById("coach");
    var trainingTypeEl  = document.getElementById("training_type");

    if (subjectEl)      subjectEl.value = "training";
    if (coachEl)        coachEl.value   = coachParam;
    if (trainingTypeEl && !trainingTypeEl.value) trainingTypeEl.value = "coaching-prive";

    // Scroll doux vers le formulaire
    var form = document.querySelector("form");
    if (form) {
      setTimeout(function() {
        form.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }

  // ── Attach form ──────────────────────────────
  function attachForm() {
    prefillFromUrl();

    var form = document.querySelector("form");
    if (!form) return;
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      formData = {
        name          : (form.querySelector("#name")          ||{}).value.trim(),
        email         : (form.querySelector("#email")         ||{}).value.trim(),
        phone         : (form.querySelector("#phone")         ||{}).value.trim(),
        subject       : (form.querySelector("#subject")       ||{}).value || "general",
        coach         : (form.querySelector("#coach")         ||{}).value || "",
        training_type : (form.querySelector("#training_type") ||{}).value || "",
        message       : (form.querySelector("#message")       ||{}).value.trim()
      };
      if (!formData.name || !formData.email || !formData.message) return;
      previewEl.innerHTML = buildPreview(formData);
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