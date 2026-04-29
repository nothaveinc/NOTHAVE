/* =========================================
   SYNAPSE - Script
   ========================================= */

(function () {
  "use strict";

  /* --- Header: scroll border --- */
  const header = document.getElementById("header");

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // 初期状態

  /* --- Hamburger Menu --- */
  const navToggle = document.getElementById("navToggle");
  const navList   = document.getElementById("navList");

  navToggle.addEventListener("click", function () {
    const isOpen = navList.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // メニューリンクをクリックで閉じる
  navList.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navList.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-label", "メニューを開く");
      document.body.style.overflow = "";
    });
  });

  // オーバーレイ外クリックで閉じる
  document.addEventListener("click", function (e) {
    if (
      navList.classList.contains("open") &&
      !navList.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navList.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-label", "メニューを開く");
      document.body.style.overflow = "";
    }
  });

  /* --- IntersectionObserver: Fade-in --- */
  const fadeEls = document.querySelectorAll(".fade-in");

  const fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  fadeEls.forEach(function (el) {
    fadeObserver.observe(el);
  });

  /* --- Counter Animation --- */
  /**
   * data-count  : 整数の目標値（例: 9999 → 99.99% と表示したい場合は "9999" + data-decimal="2"）
   * data-decimal: 小数点以下の桁数（省略可）
   */
  const counters = document.querySelectorAll(".counter");

  function animateCounter(el) {
    const rawTarget  = parseInt(el.getAttribute("data-count"), 10);
    const decimals   = parseInt(el.getAttribute("data-decimal") || "0", 10);
    const divisor    = Math.pow(10, decimals);
    const target     = rawTarget / divisor;      // 実際の数値（例: 9999/100 = 99.99）
    const duration   = 1800;                     // ms
    const frameRate  = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    // 3桁区切り（整数部分のみ）
    function formatNumber(val) {
      if (decimals === 0) {
        return Math.floor(val).toLocaleString("ja-JP");
      }
      // 小数あり: 固定小数点
      return val.toFixed(decimals);
    }

    // easeOutExpo
    function easeOut(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    const timer = setInterval(function () {
      frame++;
      const progress = easeOut(frame / totalFrames);
      const current  = target * progress;
      el.textContent = formatNumber(current);

      if (frame >= totalFrames) {
        clearInterval(timer);
        el.textContent = formatNumber(target);
      }
    }, frameRate);
  }

  // stats セクションが見えたらカウント開始
  const statsSection = document.querySelector(".stats-section");

  if (statsSection && counters.length) {
    let counted = false;

    const statsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !counted) {
            counted = true;
            counters.forEach(animateCounter);
            statsObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    statsObserver.observe(statsSection);
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;
      e.preventDefault();
      const offset = 68; // header height
      const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

})();
