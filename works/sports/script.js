/* KYOTO PHOENIX FC — script.js */

// ============================
// Header: transparent → dark on scroll
// ============================
const header = document.getElementById('header');
const onScroll = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 60);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ============================
// Hamburger menu
// ============================
const toggle = document.getElementById('headerToggle');
const nav    = document.getElementById('headerNav');

toggle.addEventListener('click', () => {
  const open = toggle.classList.toggle('is-active');
  nav.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    toggle.classList.remove('is-active');
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ============================
// Fade-in on scroll
// ============================
const fadeEls = document.querySelectorAll('.fade-in');
const io = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  }),
  { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
);
fadeEls.forEach(el => io.observe(el));

// ============================
// Match countdown (reads date from data-match-date attribute)
// ============================
const cdEl    = document.getElementById('countdown');
const cdDays  = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMins  = document.getElementById('cd-mins');
const cdSecs  = document.getElementById('cd-secs');

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const dateStr = cdEl && cdEl.dataset.matchDate;
  if (!dateStr || !cdDays) return;

  const target = new Date(dateStr);
  const diff = target - Date.now();

  if (isNaN(target.getTime()) || diff <= 0) {
    cdDays.textContent = cdHours.textContent = cdMins.textContent = cdSecs.textContent = '00';
    return;
  }
  cdDays.textContent  = pad(Math.floor(diff / 86400000));
  cdHours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
  cdMins.textContent  = pad(Math.floor((diff % 3600000)  / 60000));
  cdSecs.textContent  = pad(Math.floor((diff % 60000)    / 1000));
}

if (cdEl) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
