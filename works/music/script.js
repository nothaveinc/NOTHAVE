/* =========================================
   ECHO SESSIONS - Script
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
  onScroll(); // 初期チェック

  /* --- Hamburger Menu --- */
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");

  navToggle.addEventListener("click", function () {
    const isOpen = navList.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // ナビリンクをクリックしたらメニューを閉じる
  navList.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navList.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-label", "メニューを開く");
      document.body.style.overflow = "";
    });
  });

  // オーバーレイ（ナビ外クリック）でメニューを閉じる
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

  /* --- IntersectionObserver: slide-in animation --- */
  const slideEls = document.querySelectorAll(".slide-in");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    slideEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // フォールバック: アニメーションなしで全要素を表示
    slideEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* --- Event rows: keyboard accessibility --- */
  // イベント行はhoverでyellowになるがリンクもあるので行全体クリック不要
  // ticketリンクはそのまま機能する

})();
