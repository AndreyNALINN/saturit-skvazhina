// ── NAV SCROLL ──
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ── MOBILE MENU ──
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
  document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('open') ? 'hidden' : '';
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

// ── REVEAL ON SCROLL ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── COUNT UP ──
function countUp(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start).toLocaleString('ru');
    if (start >= target) clearInterval(timer);
  }, 16);
}
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { countUp(entry.target, parseInt(entry.target.dataset.target)); countObserver.unobserve(entry.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.count-up').forEach(el => countObserver.observe(el));

// ── MAP LAZY LOAD ──
(function() {
  const mapIframe = document.getElementById('wells-map');
  if (!mapIframe) return;
  function loadMap(element) {
    const params = new URLSearchParams(document.location.search);
    const wells = params.get("wells");
    const website = params.get("website");
    const urlSrc = new URL(element.dataset.src);
    if (wells && wells !== 'null') urlSrc.searchParams.set('wells', wells);
    if (website && website !== 'null') urlSrc.searchParams.set('website', website);
    element.src = urlSrc.toString();
  }
  const mapObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { loadMap(entry.target); mapObserver.unobserve(entry.target); } });
  }, { threshold: 0.1 });
  mapObserver.observe(mapIframe);
})();

// ── FORM ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn') || e.target.querySelector('[type=submit]');
  const orig = btn.textContent;
  btn.textContent = '✅ Заявка отправлена!';
  btn.style.background = 'linear-gradient(135deg, #2e7d32, #1b5e20)';
  btn.disabled = true;
  setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; e.target.reset(); }, 4000);
}

// ESC close
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileMenu(); });
