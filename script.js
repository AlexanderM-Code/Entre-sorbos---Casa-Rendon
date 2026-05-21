// ══════════════════════════════════════════
//  BARRA DE PROGRESO DE SCROLL
// ══════════════════════════════════════════
const progressBar = document.getElementById('scroll-progress');
function updateProgress() {
  const h = document.documentElement;
  const pct = scrollY / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = Math.min(pct, 100) + '%';
}
window.addEventListener('scroll', updateProgress, {passive:true});

// ══════════════════════════════════════════
//  PARALLAX ACTIVO (desktop only)
// ══════════════════════════════════════════
const isDesktop = window.innerWidth > 768;
const hv = document.getElementById('hv');

const parallaxItems = [
  { el: hv,                                          speed: 0.26, type: 'hero'    },
  { el: document.querySelector('.historia'),          speed: 0.04, type: 'bg'     },
  { el: document.querySelector('.vino-intro img'),    speed: 0.07, type: 'section' },
  { el: document.querySelector('.cafe-intro img'),    speed: 0.07, type: 'section' },
];

if (isDesktop) {
  window.addEventListener('scroll', () => {
    parallaxItems.forEach(({el, speed, type}) => {
      if (!el) return;
      if (type === 'hero') {
        if (scrollY < innerHeight * 1.2) el.style.transform = `translateY(${scrollY * speed}px)`;
        return;
      }
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > innerHeight + 200) return;
      const offset = (rect.top + rect.height / 2 - innerHeight / 2) * speed;
      if (type === 'section') el.style.transform = `translateY(${offset}px) scale(1.08)`;
    });
  }, {passive:true});
}

// ══════════════════════════════════════════
//  CONTADOR ANIMADO
// ══════════════════════════════════════════
function animateCounter(el) {
  const original = el.textContent.trim();
  const hasPlus = original.startsWith('+');
  const hasPct  = original.endsWith('%');
  const clean   = original.replace(/[^0-9.]/g, '');
  const isThousands = /^\d{1,3}\.\d{3}$/.test(clean);
  const target  = parseFloat(isThousands ? clean.replace('.', '') : clean);
  if (isNaN(target) || target === 0) return;
  const duration = 1600;
  const startTime = performance.now();
  function fmt(val) {
    const n = Math.round(val);
    return isThousands ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : n.toString();
  }
  function tick(now) {
    const p = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (hasPlus ? '+' : '') + fmt(eased * target) + (hasPct ? '%' : '');
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = original;
  }
  requestAnimationFrame(tick);
}

// ══════════════════════════════════════════
//  SCROLL REVEAL — expuesto globalmente para que
//  los componentes React puedan re-observar sus elementos
// ══════════════════════════════════════════
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    if (el.classList.contains('stat-n')) animateCounter(el);
    else el.classList.add('in');
    obs.unobserve(el);
  });
}, {threshold: 0.08, rootMargin: '0px 0px -28px 0px'});

window._revealObs = obs; // React components acceden a este observer

document.querySelectorAll('.r,.rl,.rr,.rs,.rblur,.sgrid,.reveal-line').forEach(el => obs.observe(el));
document.querySelectorAll('.stat-n').forEach(el => obs.observe(el));

// ══════════════════════════════════════════
//  STAGGER AUTOMÁTICO (solo secciones estáticas)
//  productos-grid / vino-products / test-grid /
//  galeria-grid → ahora los maneja React
// ══════════════════════════════════════════
const staggerSelectors = ['.tl-grid', '.pedido-steps', '.visita-cards'];

const staggerObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const children = Array.from(e.target.children).filter(c => !c.classList.contains('hidden'));
    children.forEach((child, i) => {
      child.style.transitionDelay = (i * 0.08) + 's';
      child.style.opacity = '1';
      child.style.transform = 'translateY(0) scale(1)';
    });
    staggerObs.unobserve(e.target);
  });
}, {threshold: 0.06, rootMargin: '0px 0px -20px 0px'});

staggerSelectors.forEach(sel => {
  document.querySelectorAll(sel).forEach(grid => {
    const children = Array.from(grid.children);
    const hasOwnReveal = children.some(c => c.classList.contains('r') || c.classList.contains('rs'));
    if (hasOwnReveal) return;
    children.forEach(child => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(16px) scale(0.98)';
      child.style.transition = 'opacity .6s var(--ease), transform .6s var(--ease)';
    });
    staggerObs.observe(grid);
  });
});

// ══════════════════════════════════════════
//  FORMULARIO DE RESEÑA
// ══════════════════════════════════════════
function submitReview(e) {
  e.preventDefault();
  const form = e.target;
  const name    = form['rev-name'].value.trim() || 'Anónimo';
  const city    = form['rev-city'].value.trim();
  const product = form['rev-product'].value.trim();
  const msg     = form['rev-msg'].value.trim();
  const checked = document.querySelector('input[name="rev-stars"]:checked');
  const stars   = checked ? '★'.repeat(+checked.value) + '☆'.repeat(5 - +checked.value) : '★★★★★';
  const text = `Hola Casa Rendón, quiero dejar mi reseña:\n\n${stars}\n${product ? '📦 ' + product + '\n' : ''}\n"${msg}"\n\n— ${name}${city ? ' · ' + city : ''}`;
  window.open('https://wa.me/573002972172?text=' + encodeURIComponent(text), '_blank');
  showToast('Gracias por tu reseña — redirigiendo a WhatsApp');
}

// ══════════════════════════════════════════
//  FORMULARIO DE RESERVA → WHATSAPP
// ══════════════════════════════════════════
function enviarReserva(e) {
  e.preventDefault();
  const nombre   = document.getElementById('f-nombre').value;
  const ciudad   = document.getElementById('f-ciudad').value;
  const fecha    = document.getElementById('f-fecha').value;
  const personas = document.getElementById('f-personas').value;
  const msg      = document.getElementById('f-msg').value;
  const texto = `Hola Casa Rendón, quiero reservar una visita.\n\nNombre: ${nombre}\nCiudad: ${ciudad || 'No especificada'}\nFecha: ${fecha || 'A coordinar'}\nPersonas: ${personas || 'No especificado'}\nMensaje: ${msg || 'Ninguno'}`;
  window.open(`https://wa.me/573002972172?text=${encodeURIComponent(texto)}`, '_blank');
  showToast('Redirigiendo a WhatsApp… ¡Hasta pronto!');
}

// ══════════════════════════════════════════
//  SLIDESHOW PROCESO CAFÉ
// ══════════════════════════════════════════
document.querySelectorAll('.cp-item').forEach(item => {
  const slides = Array.from(item.querySelectorAll('.cp-slide'));
  if (slides.length < 2) return;
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('cp-slide-active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('cp-slide-active');
  }, 3000);
});

// ══════════════════════════════════════════
//  SMOOTH ANCHOR — delegación de eventos
//  (cubre links estáticos y los renderizados por React)
// ══════════════════════════════════════════
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const tgt = document.querySelector(a.getAttribute('href'));
  if (tgt) { e.preventDefault(); tgt.scrollIntoView({behavior:'smooth', block:'start'}); }
});

// Efecto magnético suave en botones primarios (desktop)
if (isDesktop) {
  document.addEventListener('mousemove', e => {
    const btn = e.target.closest('.btn-primary, .visita-cta-btn, .form-submit');
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
    btn.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
  });
  document.addEventListener('mouseleave', e => {
    const btn = e.target.closest('.btn-primary, .visita-cta-btn, .form-submit');
    if (btn) btn.style.transform = '';
  }, true);
}

// ══════════════════════════════════════════
//  PRELOADER
// ══════════════════════════════════════════
(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  const minWait = new Promise(res => setTimeout(res, 1800));
  const pageLoad = new Promise(res => {
    if (document.readyState === 'complete') res();
    else window.addEventListener('load', res);
  });
  Promise.all([minWait, pageLoad]).then(() => preloader.classList.add('done'));
})();

// ══════════════════════════════════════════
//  TOAST
// ══════════════════════════════════════════
function showToast(msg, duration) {
  duration = duration || 3200;
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._tid);
  toast._tid = setTimeout(() => toast.classList.remove('show'), duration);
}

// ══════════════════════════════════════════
//  BACK TO TOP
// ══════════════════════════════════════════
(function () {
  const btn = document.getElementById('back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', scrollY > 420);
  }, {passive: true});
  btn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
})();

// ══════════════════════════════════════════
//  ANIMACIÓN HÉROE — tagline palabra a palabra
// ══════════════════════════════════════════
(function () {
  const tagline = document.querySelector('.hero-tagline');
  if (!tagline) return;
  tagline.style.animation = 'none';
  tagline.style.opacity   = '0';
  const words = tagline.textContent.trim().split(/\s+/);
  const baseDelay = 0.65;
  tagline.innerHTML = words.map((w, i) =>
    `<span style="display:inline-block;opacity:0;transform:translateY(14px);` +
    `transition:opacity .6s var(--ease),transform .6s var(--ease);` +
    `transition-delay:${(baseDelay + i * 0.10).toFixed(2)}s">${w}</span>`
  ).join(' ');
  function activate() {
    tagline.style.opacity = '1';
    tagline.querySelectorAll('span').forEach(s => {
      s.style.opacity   = '1';
      s.style.transform = 'translateY(0)';
    });
  }
  if (document.readyState === 'complete') setTimeout(activate, 60);
  else window.addEventListener('load', () => setTimeout(activate, 60));
})();

// ══════════════════════════════════════════
//  FIT TEXT — sec-h2 llena el ancho en móvil
// ══════════════════════════════════════════
(function () {
  function fitHeadings() {
    if (window.innerWidth > 768) return;
    document.querySelectorAll('.sec-h2, .review-heading, .visita-h2').forEach(function (h) {
      h.style.removeProperty('font-size');
      h.style.removeProperty('width');
      var cw = h.getBoundingClientRect().width;
      if (!cw) return;
      h.style.setProperty('font-size', '30px', 'important');
      h.style.setProperty('width', 'max-content', 'important');
      var maxW = h.getBoundingClientRect().width;
      h.style.removeProperty('width');
      if (maxW > 0) {
        var newPx = Math.floor(30 * (cw / maxW) * 0.97);
        h.style.setProperty('font-size', newPx + 'px', 'important');
      }
    });
  }
  function run() { fitHeadings(); setTimeout(fitHeadings, 300); }
  document.fonts.ready.then(run);
  window.addEventListener('resize', fitHeadings, { passive: true });
})();

// FIT TEXT desktop — vino-h2
(function () {
  function fitVinoH2() {
    if (window.innerWidth <= 768) return;
    document.querySelectorAll('.vino-h2').forEach(function (h) {
      h.style.removeProperty('font-size');
      h.style.removeProperty('width');
      var cw = h.getBoundingClientRect().width;
      if (!cw) return;
      h.style.setProperty('font-size', '30px', 'important');
      h.style.setProperty('width', 'max-content', 'important');
      var maxW = h.getBoundingClientRect().width;
      h.style.removeProperty('width');
      if (maxW > 0) {
        var newPx = Math.floor(30 * (cw / maxW) * 0.97);
        h.style.setProperty('font-size', newPx + 'px', 'important');
      }
    });
  }
  function run() { fitVinoH2(); setTimeout(fitVinoH2, 300); }
  document.fonts.ready.then(run);
  window.addEventListener('resize', fitVinoH2, { passive: true });
})();

// ── FOTOS IMPACTO: clic superpone la foto ──
(function(){
  document.querySelectorAll('.impacto-foto').forEach(function(card){
    card.addEventListener('click', function(){
      var yaActiva = card.classList.contains('activa');
      document.querySelectorAll('.impacto-foto').forEach(function(c){ c.classList.remove('activa'); });
      if(!yaActiva) card.classList.add('activa');
    });
  });
})();
