/* KYOTO PHOENIX FC — subpage.js (shared across sub-pages) */

// Header scroll effect
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Hamburger menu
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

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');
const io = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
  }),
  { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
);
fadeEls.forEach(el => io.observe(el));

// Category filter tabs (used on news page)
const filterBtns = document.querySelectorAll('[data-filter]');
const filterItems = document.querySelectorAll('[data-category]');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const cat = btn.dataset.filter;
      filterItems.forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.category === cat) ? '' : 'none';
      });
    });
  });
}

// Schedule tabs (used on schedule page)
const tabBtns  = document.querySelectorAll('[data-tab]');
const tabPanes = document.querySelectorAll('[data-pane]');
if (tabBtns.length) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      tabPanes.forEach(p => p.classList.toggle('is-active', p.dataset.pane === btn.dataset.tab));
    });
  });
}
