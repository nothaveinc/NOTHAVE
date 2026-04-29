/* =========================================
   ARCH PROPERTIES - Script
   ========================================= */

(function () {
  'use strict';

  /* --- Header: scroll behavior --- */
  const header = document.getElementById('header');

  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // initialize on load

  /* --- Hamburger Menu --- */
  const navToggle = document.getElementById('navToggle');
  const navList   = document.getElementById('navList');

  navToggle.addEventListener('click', function () {
    const isOpen = navList.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // close on nav link click
  navList.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navList.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-label', 'メニューを開く');
      document.body.style.overflow = '';
    });
  });

  // close on outside click
  document.addEventListener('click', function (e) {
    if (!navList.contains(e.target) && !navToggle.contains(e.target)) {
      navList.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-label', 'メニューを開く');
      document.body.style.overflow = '';
    }
  });

  /* --- IntersectionObserver: Fade-in --- */
  const fadeEls = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  fadeEls.forEach(function (el) {
    fadeObserver.observe(el);
  });

  /* --- Hero image subtle zoom on load --- */
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    // slight scale in on page load for cinematic feel
    heroImg.style.transform = 'scale(1.05)';
    requestAnimationFrame(function () {
      heroImg.style.transform = 'scale(1.0)';
    });
  }

  /* --- Property card: add class for stagger on entry --- */
  const propertyItems = document.querySelectorAll('.property-item');
  const propObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = '0s';
          propObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  propertyItems.forEach(function (item) {
    propObserver.observe(item);
  });

  /* --- Stat counter animation --- */
  function animateCounter(el, target, suffix, duration) {
    const start    = performance.now();
    const isFloat  = target % 1 !== 0;

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(eased * target);
      el.textContent = current.toLocaleString('ja-JP') + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  const statNumbers = document.querySelectorAll('.stat-number');

  const statObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el      = entry.target;
          const plusEl  = el.querySelector('.stat-plus');
          const unitEl  = el.querySelector('.stat-unit');
          const suffix  = plusEl ? plusEl.textContent : (unitEl ? unitEl.textContent : '');
          const rawText = el.textContent.replace(suffix, '').trim();
          const target  = parseInt(rawText.replace(/,/g, ''), 10);

          if (!isNaN(target)) {
            // temporarily clear to avoid flicker
            el.textContent = '0' + suffix;
            animateCounter(el, target, suffix, 1600);
          }
          statObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(function (el) {
    statObserver.observe(el);
  });

  /* --- Contact Form: demo submit with thanks message --- */
  const form         = document.getElementById('contactForm');
  const thanksMsg    = document.getElementById('thanksMessage');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // simple validation
      const name    = form.querySelector('#name');
      const email   = form.querySelector('#email');
      const message = form.querySelector('#message');
      let valid     = true;

      [name, email, message].forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = 'rgba(201, 169, 110, 0.7)';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      // show thanks message
      form.style.opacity    = '0';
      form.style.transition = 'opacity 0.4s ease';

      setTimeout(function () {
        form.style.display = 'none';
        thanksMsg.classList.add('visible');
        thanksMsg.style.opacity    = '0';
        thanksMsg.style.transition = 'opacity 0.6s ease';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            thanksMsg.style.opacity = '1';
          });
        });
      }, 400);
    });

    // restore border on input
    form.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        field.style.borderColor = '';
      });
    });
  }

  /* --- Smooth anchor offset for fixed header --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = header ? header.offsetHeight + 16 : 80;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

})();
