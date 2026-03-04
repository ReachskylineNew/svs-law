/* =============================================
   ANVIKSHIKI – DEPARTMENT OF LAW | SCSVMV
   Main JavaScript
   ============================================= */

(function () {
  'use strict';

  // ---- NAVBAR SCROLL EFFECT ----
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- ACTIVE NAV LINK ON SCROLL ----
  const sections = ['home', 'programmes', 'facilities', 'faculty'];
  const navLinksMap = {
    home: document.getElementById('nav-home'),
    programmes: document.getElementById('nav-programmes'),
    facilities: document.getElementById('nav-facilities'),
    faculty: document.getElementById('nav-faculty'),
  };

  function updateActiveNav() {
    const scrollY = window.scrollY + 90;
    let activeSection = 'home';

    sections.forEach(function (id) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) {
        activeSection = id;
      }
    });

    sections.forEach(function (id) {
      const link = navLinksMap[id];
      if (link) {
        link.classList.toggle('active', id === activeSection);
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ---- FADE-UP SCROLL ANIMATION ----
  function observeFadeUps() {
    const els = document.querySelectorAll('.fade-up');
    if (!els.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    els.forEach(function (el) { observer.observe(el); });
  }

  // ---- PROGRAMME TABS ----
  window.showTab = function (tabKey) {
    // Hide all content
    document.querySelectorAll('.tab-content').forEach(function (el) {
      el.classList.remove('active');
    });
    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.classList.remove('active');
    });

    // Show selected content
    const contentEl = document.getElementById('content-' + tabKey);
    if (contentEl) contentEl.classList.add('active');

    // Activate selected button
    const btnEl = document.getElementById('tab-' + tabKey);
    if (btnEl) btnEl.classList.add('active');
  };

  // ---- HERO PARTICLES ----
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const count = window.innerWidth < 600 ? 12 : 22;
    const symbols = ['⚖', '§', '⚖', '🏛', '§', '⚖'];

    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.classList.add('hero-particle');
      const size = Math.random() * 16 + 8;
      const left = Math.random() * 100;
      const delay = Math.random() * 12;
      const duration = Math.random() * 10 + 10;
      const opacity = Math.random() * 0.12 + 0.04;

      p.style.cssText = [
        'position:absolute',
        'left:' + left + '%',
        'bottom:-60px',
        'font-size:' + size + 'px',
        'opacity:' + opacity,
        'color:#3B82F6',
        'pointer-events:none',
        'user-select:none',
        'animation:particle-drift ' + duration + 's ' + delay + 's linear infinite',
        'will-change:transform'
      ].join(';');

      const pickFrom = [
        '⚖', '§', '⚖', '§', '🏛', '⚖', '§'
      ];
      p.textContent = pickFrom[Math.floor(Math.random() * pickFrom.length)];
      container.appendChild(p);
    }
  }

  // ---- SMOOTH SCROLL OFFSET for fixed navbar ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---- INIT ----
  document.addEventListener('DOMContentLoaded', function () {
    observeFadeUps();
    createParticles();

    // Stagger fade-up delays within grids
    document.querySelectorAll('.programmes-grid .programme-card, .facilities-grid .facility-card, .faculty-grid .faculty-card').forEach(function (el, i) {
      el.classList.add('fade-up');
      el.style.transitionDelay = (i * 0.08) + 's';
    });

    // Re-observe after adding classes
    observeFadeUps();
  });

  // ---- TABLE ROW HOVER COLOUR (accessible) ----
  document.addEventListener('mouseover', function (e) {
    const row = e.target.closest('.sem-table tbody tr');
    if (row) row.setAttribute('data-hovered', '1');
  });
  document.addEventListener('mouseout', function (e) {
    const row = e.target.closest('.sem-table tbody tr');
    if (row) row.removeAttribute('data-hovered');
  });

})();
