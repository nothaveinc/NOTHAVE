/* =========================================
   Fleur & Co. - Script
   ========================================= */

(function () {
  'use strict';

  /* -----------------------------------------
     1. Header scroll effect
     ----------------------------------------- */
  const header = document.getElementById('header');

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 初期実行

  /* -----------------------------------------
     2. Hamburger menu
     ----------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navList   = document.getElementById('navList');

  navToggle.addEventListener('click', function () {
    const isOpen = navList.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // ナビリンク クリックで閉じる
  navList.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navList.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-label', 'メニューを開く');
      document.body.style.overflow = '';
    });
  });

  // オーバーレイクリックで閉じる（モバイル）
  document.addEventListener('click', function (e) {
    if (
      navList.classList.contains('open') &&
      !navList.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navList.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-label', 'メニューを開く');
      document.body.style.overflow = '';
    }
  });

  /* -----------------------------------------
     3. IntersectionObserver — Fade-in
     ----------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // 親コンテナ内の同種要素にスタガー遅延を付与
            const siblings = entry.target.parentElement
              ? Array.from(entry.target.parentElement.querySelectorAll('.fade-in'))
              : [];
            const index = siblings.indexOf(entry.target);
            const delay = index >= 0 ? index * 90 : 0;

            entry.target.style.transitionDelay = delay + 'ms';
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* -----------------------------------------
     4. Contact form — preventDefault + thanks
     ----------------------------------------- */
  const form        = document.getElementById('contactForm');
  const thanksEl    = document.getElementById('contactThanks');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // 簡易バリデーション
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = '#F2D4D0';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      // フォームをフェードアウト
      form.style.transition = 'opacity 0.5s ease';
      form.style.opacity    = '0';

      setTimeout(function () {
        form.style.display = 'none';
        thanksEl.classList.add('show');

        // サンクスもフェードイン
        thanksEl.style.opacity    = '0';
        thanksEl.style.transition = 'opacity 0.6s ease';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            thanksEl.style.opacity = '1';
          });
        });
      }, 500);
    });

    // 入力時にエラースタイルをリセット
    form.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        this.style.borderColor = '';
      });
    });
  }

  /* -----------------------------------------
     5. Hero parallax (subtle, performance-safe)
     ----------------------------------------- */
  const hero = document.querySelector('.hero');
  let ticking = false;

  function updateParallax() {
    if (hero) {
      const scrolled = window.scrollY;
      // ヒーロー内にとどまる間だけ適用
      if (scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = Math.round(scrolled * 0.35) + 'px';
      }
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

})();
