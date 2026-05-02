/* =============================================
   CAFÉ OLIVEIRA — script.js
   ============================================= */

'use strict';

/* ── Header: adiciona classe ao rolar ─────── */
(function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // estado inicial
})();

/* ── Menu mobile ────────────────────────────── */
(function initMobileNav() {
  const toggle    = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!toggle || !mobileNav) return;

  const open  = () => {
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    toggle.classList.contains('open') ? close() : open();
  });

  // Fecha ao clicar num link
  mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
    link.addEventListener('click', close);
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
      close();
    }
  });
})();

/* ── Scroll reveal ──────────────────────────── */
(function initReveal() {
  const targets = document.querySelectorAll(
    '.section__label, .section__title, .sobre__desc, .sobre__stats, ' +
    '.service-card, .local__address, .local__map-wrap, .footer__inner'
  );

  if (!targets.length) return;

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    // Atraso escalonado para cards
    if (el.classList.contains('service-card')) {
      el.style.transitionDelay = `${(i % 8) * 60}ms`;
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
})();

/* ── Smooth scroll para links âncora ─────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();

      const headerH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-h')
      ) || 68;

      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

console.log('☕ Café Oliveira — site carregado');
