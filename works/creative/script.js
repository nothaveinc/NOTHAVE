/* ============================================
   VOID CREATIVE — Script (Vanilla JS)
   ============================================ */

(function () {
  'use strict';

  // ---------- Cursor Glow ----------
  const glow = document.getElementById('cursorGlow');
  let mouseX = -500;
  let mouseY = -500;
  let glowX = -500;
  let glowY = -500;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    const ease = 0.12;
    glowX += (mouseX - glowX) * ease;
    glowY += (mouseY - glowY) * ease;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // ---------- Hero Split Text Animation ----------
  function splitAndAnimate(elementId) {
    var el = document.getElementById(elementId);
    if (!el) return;
    var text = el.textContent.trim();
    el.textContent = '';

    for (var i = 0; i < text.length; i++) {
      var span = document.createElement('span');
      span.className = 'char';
      span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
      el.appendChild(span);
    }

    var chars = el.querySelectorAll('.char');
    chars.forEach(function (ch, idx) {
      setTimeout(function () {
        ch.classList.add('visible');
      }, 100 + idx * 60);
    });
  }

  window.addEventListener('load', function () {
    splitAndAnimate('heroLine1');
    setTimeout(function () {
      splitAndAnimate('heroLine2');
    }, 500);
  });

  // ---------- Scroll Fade-In ----------
  var fadeEls = document.querySelectorAll('.fade-in');

  function checkFade() {
    var windowHeight = window.innerHeight;
    fadeEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < windowHeight * 0.88) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkFade, { passive: true });
  window.addEventListener('load', checkFade);

  // ---------- Header background on scroll ----------
  var header = document.getElementById('header');

  function checkHeader() {
    if (window.scrollY > 60) {
      header.style.background = 'rgba(10,10,10,0.92)';
      header.style.backdropFilter = 'blur(12px)';
    } else {
      header.style.background = 'transparent';
      header.style.backdropFilter = 'none';
    }
  }

  window.addEventListener('scroll', checkHeader, { passive: true });
})();
