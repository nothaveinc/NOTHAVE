/* ==========================================
   LUMIÈRE Wellness — Script
   ========================================== */

// --- Fade-in on scroll (IntersectionObserver) ---
(function () {
  var targets = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    targets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();

// --- Mobile menu toggle ---
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    toggle.classList.toggle('is-active');
    nav.classList.toggle('is-open');
  });

  // Close menu when a nav link is tapped
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.classList.remove('is-active');
      nav.classList.remove('is-open');
    });
  });
})();

// --- Reserve form feedback ---
(function () {
  var form = document.querySelector('.reserve-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('.btn-submit');
    btn.textContent = '送信しました';
    btn.disabled = true;
    btn.style.background = '#8BA888';

    setTimeout(function () {
      btn.textContent = '予約する';
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 2000);
  });
})();
