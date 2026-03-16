(function () {
  'use strict';

  /* ── TRADUCTIONS ─────────────────────────────────────────────────── */
  var T = {
    days: {
      Monday:'Lundi', Tuesday:'Mardi', Wednesday:'Mercredi',
      Thursday:'Jeudi', Friday:'Vendredi', Saturday:'Samedi', Sunday:'Dimanche'
    },
    periods: {
      Morning:'Matin', Afternoon:'Après-midi', Evening:'Soir'
    },
    levels: {
      'All Levels':'Tous niveaux', 'Beginner':'Débutant',
      'Intermediate':'Intermédiaire', 'Advanced':'Avancé'
    }
  };

  /* ── CLASSES CSS ─────────────────────────────────────────────────── */
  var CSS = {
    active:   'bg-gradient-to-r from-orangePulse to-red-500 text-white',
    inactive: 'bg-black/30 text-greyPulse hover:bg-black/50'
  };

  /* ── DATA ────────────────────────────────────────────────────────── */
  function cls(time, name, trainer, duration, level) {
    return { time:time, name:name, trainer:trainer, duration:duration, level:level };
  }

  var SCHEDULE = {
    Monday: {
      Morning: [
        cls('06:00','HIIT Fusion',      'Sarah Johnson',   '45 min','All Levels'),
        cls('07:30','Power Lifting',    'Mike Thompson',   '60 min','Intermediate'),
        cls('09:00','Yoga Flow',        'Emma Davis',      '75 min','All Levels')
      ],
      Afternoon: [
        cls('12:00','Boxing',           'James Wilson',    '60 min','Beginner'),
        cls('14:30','Spin Studio',      'Maya Chen',       '45 min','All Levels')
      ],
      Evening: [
        cls('17:00','CrossFit Elite',   'Alex Rivera',     '60 min','Advanced'),
        cls('18:30','Beast Mode',       'Marcus Stone',    '75 min','Advanced'),
        cls('20:00','Power Pilates',    'Sofia Rodriguez', '55 min','Intermediate')
      ]
    },
    Tuesday: {
      Morning: [
        cls('06:00','Cardio Blast',     'Maya Chen',       '45 min','All Levels'),
        cls('07:30','Strength & Core',  'Alex Rivera',     '60 min','Intermediate'),
        cls('09:00','Mindful Flow',     'Emma Davis',      '60 min','All Levels')
      ],
      Afternoon: [
        cls('12:00','Kickboxing',       'James Wilson',    '60 min','Intermediate'),
        cls('14:30','TRX Training',     'Mike Thompson',   '45 min','All Levels')
      ],
      Evening: [
        cls('17:00','Power Yoga',       'Sofia Rodriguez', '75 min','Intermediate'),
        cls('18:30','Circuit Training', 'Sarah Johnson',   '60 min','Advanced'),
        cls('20:00','Recovery Flow',    'Emma Davis',      '45 min','All Levels')
      ]
    },
    Wednesday: {
      Morning: [
        cls('06:00','HIIT & Core',      'Marcus Stone',    '45 min','Intermediate'),
        cls('07:30','Olympic Lifting',  'Mike Thompson',   '75 min','Advanced'),
        cls('09:00','Vinyasa Flow',     'Emma Davis',      '60 min','All Levels')
      ],
      Afternoon: [
        cls('12:00','Combat Fitness',   'James Wilson',    '60 min','Intermediate'),
        cls('14:30','Cycle & Burn',     'Maya Chen',       '45 min','All Levels')
      ],
      Evening: [
        cls('17:00','CrossFit Open',    'Alex Rivera',     '60 min','All Levels'),
        cls('18:30','Strength Wars',    'Marcus Stone',    '75 min','Advanced'),
        cls('20:00','Flex & Flow',      'Sofia Rodriguez', '45 min','All Levels')
      ]
    },
    Thursday: {
      Morning: [
        cls('06:00','Metabolic Burn',   'Sarah Johnson',   '45 min','All Levels'),
        cls('07:30','Power Training',   'Mike Thompson',   '60 min','Intermediate'),
        cls('09:00','Gentle Flow',      'Emma Davis',      '60 min','Beginner')
      ],
      Afternoon: [
        cls('12:00','Box & Burn',       'James Wilson',    '60 min','All Levels'),
        cls('14:30','Core Power',       'Sofia Rodriguez', '45 min','Intermediate')
      ],
      Evening: [
        cls('17:00','CrossFit Skills',  'Alex Rivera',     '75 min','Intermediate'),
        cls('18:30','HIIT Express',     'Maya Chen',       '30 min','All Levels'),
        cls('20:00','Restorative Yoga', 'Emma Davis',      '60 min','All Levels')
      ]
    },
    Friday: {
      Morning: [
        cls('06:00','Sprint & Strength','Marcus Stone',    '45 min','Advanced'),
        cls('07:30','Functional Fitness','Sarah Johnson',  '60 min','All Levels'),
        cls('09:00','Power Flow',       'Emma Davis',      '75 min','Intermediate')
      ],
      Afternoon: [
        cls('12:00','MMA Fitness',      'James Wilson',    '60 min','Intermediate'),
        cls('14:30','Endurance Cycle',  'Maya Chen',       '60 min','All Levels')
      ],
      Evening: [
        cls('17:00','CrossFit WOD',     'Alex Rivera',     '60 min','Advanced'),
        cls('18:30','Ultimate HIIT',    'Sarah Johnson',   '45 min','All Levels'),
        cls('20:00','Candlelight Yoga', 'Sofia Rodriguez', '60 min','All Levels')
      ]
    },
    Saturday: {
      Morning: [
        cls('08:00','Weekend Warriors', 'Marcus Stone',    '90 min','Advanced'),
        cls('09:30','Community Yoga',   'Emma Davis',      '75 min','All Levels'),
        cls('11:00','Boxing Bootcamp',  'James Wilson',    '60 min','All Levels')
      ],
      Afternoon: [
        cls('13:00','CrossFit Open Gym','Alex Rivera',     '120 min','All Levels'),
        cls('15:00','Dance Fitness',    'Maya Chen',       '60 min','All Levels')
      ],
      Evening: [
        cls('17:00','Sunset Flow',      'Sofia Rodriguez', '60 min','All Levels')
      ]
    },
    Sunday: {
      Morning: [
        cls('09:00','Sunday Stretch',   'Emma Davis',      '60 min','All Levels'),
        cls('10:30','Mobility & Flow',  'Sofia Rodriguez', '75 min','All Levels')
      ],
      Afternoon: [
        cls('12:00','Open Gym',         'Various Trainers','180 min','All Levels')
      ],
      Evening: [
        cls('16:00','Meditation & Restore','Emma Davis',   '60 min','All Levels')
      ]
    }
  };

  var DAYS    = Object.keys(SCHEDULE);
  var PERIODS = Object.keys(T.periods);

  /* ── TEMPLATES ───────────────────────────────────────────────────── */
  function buildCard(c) {
    return '<div class="bg-black/30 rounded-lg p-6 border border-white/5" style="opacity:0;transform:translateY(12px);transition:opacity 0.4s ease,transform 0.4s ease">'
      + '<div class="flex justify-between items-start mb-4">'
        + '<div>'
          + '<h3 class="text-2xl font-display text-white">' + c.name + '</h3>'
          + '<p class="text-sm font-athletic text-greyPulse">' + c.trainer + '</p>'
        + '</div>'
        + '<span class="text-2xl font-display text-orangePulse">' + c.time + '</span>'
      + '</div>'
      + '<div class="flex items-center space-x-4">'
        + '<span class="text-sm font-athletic text-greyPulse">' + c.duration + '</span>'
        + '<span class="w-1 h-1 bg-orangePulse rounded-full inline-block"></span>'
        + '<span class="text-sm font-athletic text-greyPulse">' + (T.levels[c.level] || c.level) + '</span>'
      + '</div>'
    + '</div>';
  }

  function buildPeriod(period, classes) {
    return '<div>'
      + '<h2 class="text-3xl font-display mb-6">' + T.periods[period] + '</h2>'
      + '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">'
        + classes.map(buildCard).join('')
      + '</div>'
    + '</div>';
  }

  function buildDay(day) {
    var data = SCHEDULE[day];
    return PERIODS
      .filter(function(p){ return data[p] && data[p].length; })
      .map(function(p){ return buildPeriod(p, data[p]); })
      .join('');
  }

  /* ── HELPERS ─────────────────────────────────────────────────────── */
  function setButtonState(btn, isActive) {
    CSS.active.split(' ').forEach(function(c){   btn.classList.toggle(c,  isActive); });
    CSS.inactive.split(' ').forEach(function(c){ btn.classList.toggle(c, !isActive); });
  }

  function revealCards(container) {
    container.querySelectorAll('[style*="opacity:0"]').forEach(function(card, i){
      setTimeout(function(){ card.style.opacity = '1'; card.style.transform = 'none'; }, i * 50);
    });
  }

  /* ── SWITCH DAY ──────────────────────────────────────────────────── */
  function switchDay(day, buttons, grid) {
    buttons.forEach(function(btn){ setButtonState(btn, btn.dataset.day === day); });
    grid.style.opacity = '0';
    setTimeout(function(){
      grid.innerHTML = buildDay(day);
      grid.style.opacity = '1';
      revealCards(grid);
    }, 180);
  }

  /* ── INIT ────────────────────────────────────────────────────────── */
  function init() {
    /* Remplacer les boutons anglais par des boutons français */
    var btnRow = document.querySelector('.flex.overflow-x-auto');
    if (!btnRow) return;

    var baseClass = 'px-8 py-4 rounded-lg font-athletic text-lg whitespace-nowrap transition-all duration-300';
    btnRow.innerHTML = DAYS.map(function(day, i){
      var state = i === 0 ? CSS.active : CSS.inactive;
      return '<button class="' + baseClass + ' ' + state + '" data-day="' + day + '">' + T.days[day] + '</button>';
    }).join('');

    var buttons = Array.from(btnRow.querySelectorAll('button'));
    var grid = btnRow.nextElementSibling;
    if (!grid) return;

    grid.style.transition = 'opacity 0.2s ease';
    buttons.forEach(function(btn){
      btn.addEventListener('click', function(){ switchDay(btn.dataset.day, buttons, grid); });
    });

    /* Afficher lundi par défaut */
    grid.innerHTML = buildDay(DAYS[0]);
    revealCards(grid);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();