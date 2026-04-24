// =========================================
// Cafe MOKUREN - Script
// =========================================

(function () {
  "use strict";

  // --- Scroll fade-in ---
  var fadeEls = document.querySelectorAll(".fade-in");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach(function (el) {
    observer.observe(el);
  });

  // --- Header scroll state ---
  var header = document.getElementById("header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- Mobile nav toggle ---
  var navToggle = document.getElementById("navToggle");
  var navList = document.getElementById("navList");

  navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("active");
    navList.classList.toggle("open");
  });

  // Close nav when a link is clicked
  navList.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navList.classList.remove("open");
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var headerHeight = header.offsetHeight;
      var top =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });
})();
