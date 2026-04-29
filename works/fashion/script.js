/* =========================================
   MAISON NOIR - Script
   ========================================= */

(function () {
  'use strict';

  /* -----------------------------------------------
     1. Header: Hero Zone / Scrolled state
  ----------------------------------------------- */
  const header    = document.getElementById('header');
  const hero      = document.getElementById('hero');

  function updateHeader() {
    if (!hero || !header) return;

    const heroBottom = hero.getBoundingClientRect().bottom;

    if (heroBottom > 0) {
      // Still inside hero area
      header.classList.add('hero-zone');
      header.classList.remove('scrolled');
    } else {
      // Past hero
      header.classList.remove('hero-zone');
      header.classList.add('scrolled');
    }
  }

  // Initial call
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* -----------------------------------------------
     2. Mobile Navigation (Hamburger)
  ----------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navList   = document.getElementById('navList');

  function openMenu() {
    navToggle.classList.add('active');
    navList.classList.add('open');
    navToggle.setAttribute('aria-label', 'メニューを閉じる');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navToggle.classList.remove('active');
    navList.classList.remove('open');
    navToggle.setAttribute('aria-label', 'メニューを開く');
    document.body.style.overflow = '';
  }

  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      if (navList.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on nav link click
    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        navList.classList.contains('open') &&
        !navList.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navList.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* -----------------------------------------------
     3. IntersectionObserver — Fade-in
  ----------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* -----------------------------------------------
     4. Smooth scroll for anchor links
  ----------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '72',
        10
      );
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerH;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

})();
