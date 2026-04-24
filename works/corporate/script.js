/* ================================================
   NEXT BRIDGE Inc. — Corporate Site Script
   ================================================ */

(function () {
  "use strict";

  // --- Header scroll effect ---
  const header = document.getElementById("header");

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // --- Mobile nav ---
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    nav.classList.toggle("open");
  });

  // Close nav on link click
  nav.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      nav.classList.remove("open");
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        var offset = header.offsetHeight;
        var top =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  });

  // --- Fade-in on scroll (Intersection Observer) ---
  var fadeEls = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window) {
    var fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeEls.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    // Fallback
    fadeEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // --- Count-up animation (Intersection Observer) ---
  var numberEls = document.querySelectorAll(".number-value[data-target]");

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-target"), 10);
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * (target - start) + start);
      el.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    numberEls.forEach(function (el) {
      countObserver.observe(el);
    });
  } else {
    numberEls.forEach(function (el) {
      el.textContent = el.getAttribute("data-target");
    });
  }

  // --- Contact form ---
  var form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var btn = form.querySelector('button[type="submit"]');
    var originalText = btn.textContent;
    btn.textContent = "送信中...";
    btn.disabled = true;

    // Simulate submission
    setTimeout(function () {
      btn.textContent = "送信完了";
      btn.style.background = "#27ae60";
      btn.style.borderColor = "#27ae60";

      setTimeout(function () {
        form.reset();
        btn.textContent = originalText;
        btn.style.background = "";
        btn.style.borderColor = "";
        btn.disabled = false;
      }, 2000);
    }, 1200);
  });
})();
