/* ══════════════════════════════════════════
   CASA RENDÓN — React Components (Islands)
   Montados sobre divs placeholder en el HTML.
   Requiere: React 18 + ReactDOM 18 + Babel standalone.
══════════════════════════════════════════ */

'use strict';
const { useState, useEffect, useCallback, useRef } = React;

// ═══════════════════════════════════════════
//  DATOS
// ═══════════════════════════════════════════

const NAV_LINKS = [
  { href: '#historia', label: 'Historia' },
  { href: '#cafe',     label: 'Café'     },
  { href: '#vino',     label: 'Vino'     },
  { href: '#galeria',  label: 'Galería'  },
  { href: '#visita',   label: 'Visítanos'},
];

const GALLERY_IMAGES = [
  { src: 'assets/FOTOS%20PAGINA%20WEB/HISTORIA/2026-05-01_10-09-28.jpg',            alt: 'El territorio de Buenos Aires, Andes', caption: 'El territorio que nos da todo'       },
  { src: 'assets/FOTOS%20PAGINA%20WEB/AUTENTICIDAD%2CCONFIABILIDAD/Foto7.png',      alt: 'Manos trabajando',                     caption: 'Las manos detrás de cada sorbo'    },
  { src: 'assets/FOTOS%20PAGINA%20WEB/AUTENTICIDAD%2CCONFIABILIDAD/Foto8.png',      alt: 'Proceso artesanal',                    caption: 'Proceso artesanal, sin atajos'     },
  { src: 'assets/FOTOS%20PAGINA%20WEB/AUTENTICIDAD%2CCONFIABILIDAD/Foto10.png',     alt: 'El café natural',                      caption: '100% natural, directo de la Casa'  },
  { src: 'assets/FOTOS%20PAGINA%20WEB/AUTENTICIDAD%2CCONFIABILIDAD/Foto14.png',     alt: 'Producto listo',                       caption: 'Listo para llegar a tus manos'     },
  { src: 'assets/FOTOS%20PAGINA%20WEB/VINO%20Y%20CAFE/Foto13.png',                  alt: 'Vino y café juntos',                   caption: 'Dos productos, una historia'       },
  { src: 'assets/FOTOS%20PAGINA%20WEB/AUTENTICIDAD%2CCONFIABILIDAD/Foto16.png',     alt: 'Calidad artesanal',                    caption: 'Calidad que se ve y se prueba'     },
  { src: 'assets/FOTOS%20PAGINA%20WEB/HISTORIA/Foto9.png',                          alt: 'Proceso auténtico',                    caption: 'Sin químicos, sin apuros'          },
  { src: 'assets/FOTOS%20PAGINA%20WEB/AUTENTICIDAD%2CCONFIABILIDAD/0060.png',       alt: 'El empaque artesanal',                 caption: 'Empacado con amor'                 },
  { src: 'assets/FOTOS%20PAGINA%20WEB/VINO%20Y%20CAFE/Foto15.png',                  alt: 'Vino y café',                          caption: 'Del fruto a tu mesa'               },
  { src: 'assets/FOTOS%20PAGINA%20WEB/AUTENTICIDAD%2CCONFIABILIDAD/Foto3.png',      alt: 'Café tostado',                         caption: 'Café tostado y molido'             },
  { src: 'assets/FOTOS%20PAGINA%20WEB/HISTORIA/2026-05-011_09-33-03.jpg',           alt: 'Historia de la finca',                 caption: 'La historia en cada imagen'        },
  // Ocultas — se revelan con "Ver más"
  { src: 'assets/FOTOS%20PAGINA%20WEB/VINO%20Y%20CAFE/0040.png',                    alt: 'Productos Casa Rendón',                caption: 'Directo del productor',             hidden: true },
  { src: 'assets/FOTOS%20PAGINA%20WEB/AUTENTICIDAD%2CCONFIABILIDAD/Taza.jpg',       alt: 'Taza de café Casa Rendón',             caption: 'Una taza, una historia',            hidden: true },
  { src: 'assets/FOTOS%20PAGINA%20WEB/AUTENTICIDAD%2CCONFIABILIDAD/Foto6.png',      alt: 'Café de altura',                       caption: 'Café de altura, sabor único',       hidden: true },
  { src: 'assets/FOTOS%20PAGINA%20WEB/AUTENTICIDAD%2CCONFIABILIDAD/Proceso1.jpg',   alt: 'El proceso del café',                  caption: 'Cada etapa, con dedicación',        hidden: true },
  { src: 'assets/FOTOS%20PAGINA%20WEB/AUTENTICIDAD%2CCONFIABILIDAD/Foto31.png',     alt: 'Artesanal desde el inicio',            caption: 'Artesanal desde el inicio',         hidden: true },
  { src: 'assets/FOTOS%20PAGINA%20WEB/VINO%20Y%20CAFE/007.png',                     alt: 'Café y vino artesanal',                caption: 'Café y vino, nuestra firma',        hidden: true },
  { src: 'assets/FOTOS%20PAGINA%20WEB/AUTENTICIDAD%2CCONFIABILIDAD/autenticidad.png', alt: 'Autenticidad Casa Rendón',           caption: 'Autenticidad en cada detalle',      hidden: true },
  { src: 'assets/FOTOS%20PAGINA%20WEB/HISTORIA/2026-05-01_16-23-58.jpg',            alt: 'En la finca',                          caption: 'Buenos Aires, Antioquia',           hidden: true },
];

const CAFE_PRODUCTS = [
  {
    img: 'assets/FOTOS%20PAGINA%20WEB/cafe/Foto1.png', name: 'Café Altura', origin: 'Buenos Aires, Andes',
    specs: [{ k: 'Altitud', v: '1.850 msnm' }, { k: 'Proceso', v: 'Lavado' }, { k: 'Tueste', v: 'Medio' }],
    notes: 'Notas de panela, chocolate negro y fruta madura. Un café equilibrado que recoge la esencia de la montaña.',
    wa: 'https://wa.me/573001234567?text=Hola%2C%20quiero%20el%20Caf%C3%A9%20Altura%20de%20Casa%20Rend%C3%B3n',
  },
  {
    img: 'assets/FOTOS%20PAGINA%20WEB/cafe/0020.png', name: 'Café Especial', origin: 'Buenos Aires, Andes',
    specs: [{ k: 'Altitud', v: '2.000 msnm' }, { k: 'Proceso', v: 'Honey' }, { k: 'Tueste', v: 'Claro' }],
    notes: 'Notas cítricas, floral y caramelo. Para quienes aprecian lo extraordinario en cada sorbo.',
    wa: 'https://wa.me/573001234567?text=Hola%2C%20quiero%20el%20Caf%C3%A9%20Especial%20de%20Casa%20Rend%C3%B3n',
  },
  {
    img: 'assets/FOTOS%20PAGINA%20WEB/cafe/0030.png', name: 'Blend Familiar', origin: 'Buenos Aires, Andes',
    specs: [{ k: 'Altitud', v: 'Blend Casa Rendón' }, { k: 'Proceso', v: 'Mixto' }, { k: 'Tueste', v: 'Medio oscuro' }],
    notes: 'La mezcla que lleva 30 años en nuestra mesa. Profundo, equilibrado, con sabor a hogar.',
    wa: 'https://wa.me/573001234567?text=Hola%2C%20quiero%20el%20Blend%20Familiar%20de%20Casa%20Rend%C3%B3n',
  },
];

const VINO_PRODUCTS = [
  {
    name: 'Vino de Mora', type: 'Tinto artesanal · Receta original',
    specs: [{ k: 'Fruta', v: 'Moras silvestres' }, { k: 'Fermentación', v: '~12 meses' }, { k: 'Origen', v: 'Buenos Aires, Andes' }],
    desc: 'La receta que empezó todo. Taninos suaves, color rojo profundo, sabor a fruta silvestre de montaña. El original de nuestra madre.',
    wa: 'https://wa.me/573001234567?text=Hola%2C%20quiero%20el%20Vino%20de%20Mora%20de%20Casa%20Rend%C3%B3n',
  },
  {
    name: 'Vino de Habuticaba', type: 'Tinto exótico · Edición especial',
    specs: [{ k: 'Fruta', v: 'Habuticaba tropical' }, { k: 'Fermentación', v: 'Artesanal lenta' }, { k: 'Origen', v: 'Buenos Aires, Andes' }],
    desc: 'Una fruta única que da un vino sin igual. Color morado intenso, aroma frutal, sabor a jabuticaba madura con cuerpo y carácter.',
    wa: 'https://wa.me/573001234567?text=Hola%2C%20quiero%20el%20Vino%20de%20Habuticaba%20de%20Casa%20Rend%C3%B3n',
  },
  {
    name: 'Vino de Uchuva', type: 'Blanco afrutado · Ligero y fresco',
    specs: [{ k: 'Fruta', v: 'Uchuva fresca' }, { k: 'Fermentación', v: 'Artesanal' }, { k: 'Origen', v: 'Buenos Aires, Andes' }],
    desc: 'Dorado, vibrante y con acidez perfecta. La uchuva da notas cítricas y tropicales que lo hacen refrescante y distinto a todo.',
    wa: 'https://wa.me/573001234567?text=Hola%2C%20quiero%20el%20Vino%20de%20Uchuva%20de%20Casa%20Rend%C3%B3n',
  },
  {
    name: 'Vino de Pulpa de Café', type: 'Único en su tipo · Identidad Rendón',
    specs: [{ k: 'Fruta', v: 'Pulpa de cerezo de café' }, { k: 'Fermentación', v: 'Artesanal' }, { k: 'Origen', v: 'Buenos Aires, Andes' }],
    desc: 'Cuando el café y el vino se encuentran en la misma botella. La pulpa del cerezo da notas suaves de café, caramelo y fruta roja. Solo aquí.',
    wa: 'https://wa.me/573001234567?text=Hola%2C%20quiero%20el%20Vino%20de%20Pulpa%20de%20Caf%C3%A9%20de%20Casa%20Rend%C3%B3n',
  },
  {
    name: 'Vino de Borojo', type: 'Tinto tropical · Intenso y medicinal',
    specs: [{ k: 'Fruta', v: 'Borojó del Pacífico' }, { k: 'Fermentación', v: 'Artesanal lenta' }, { k: 'Origen', v: 'Buenos Aires, Andes' }],
    desc: 'El borojo tiene reputación de fruta poderosa. Nuestro vino captura su intensidad en cada sorbo: espeso, profundo, con un dulzor tropical característico.',
    wa: 'https://wa.me/573001234567?text=Hola%2C%20quiero%20el%20Vino%20de%20Borojo%20de%20Casa%20Rend%C3%B3n',
  },
];

const TESTIMONIALS = [
  { stars: 5, quote: '"El café de Casa Rendón tiene un sabor que no había encontrado en ninguna tienda. Se nota que lo hicieron con amor y conocimiento. Volvería a comprar mil veces."', author: 'María C. · Medellín' },
  { stars: 5, quote: '"El vino de moras es increíble. Tiene un sabor muy especial, diferente a todo lo que he probado. Me contaron la historia de cómo lo hacen y eso lo hace aún más especial."', author: 'Andrés M. · Bogotá' },
  { stars: 5, quote: '"Visité Casa Rendon y fue una experiencia hermosa. Nicolás nos mostró todo el proceso con mucho orgullo. El café que nos dieron ahí era el mejor que he tomado en mi vida."', author: 'Claudia R. · Manizales' },
];

const FAQ_ITEMS = [
  { q: '¿Hacen envíos a todo Colombia?',         a: 'Sí. Enviamos café y vino a todo el país a través de transportadoras nacionales. El tiempo de entrega es de <b>3 a 6 días hábiles</b> dependiendo de tu ciudad. El costo de envío se coordina directamente por WhatsApp según destino y peso del pedido.' },
  { q: '¿Cómo hago un pedido?',                  a: 'Escríbenos directamente por <b>WhatsApp</b>. Te atendemos personalmente, te explicamos las opciones disponibles, acordamos cantidades y coordinamos el envío. Sin formularios complicados — como debe ser.' },
  { q: '¿Cuánto tiempo duran los productos?',    a: 'El <b>café tostado</b> se conserva en óptimas condiciones hasta 6 meses sellado y en lugar fresco, seco y alejado de la luz. El <b>vino artesanal</b> se mantiene bien entre 12 y 18 meses. Una vez abierto, consume en los primeros días para disfrutar mejor sus notas.' },
  { q: '¿Qué incluye la visita a Casa Rendón?',  a: 'La visita incluye <b>cata de café de altura</b>, <b>cata de vino artesanal</b>, recorrido por el cafetal y degustación de los productos de la finca. La experiencia tiene una duración aproximada de 3 horas y el cupo es de 2 a 8 personas. Disponible viernes, sábados y domingos con reserva previa.' },
  { q: '¿Puedo ir cualquier día de la semana?',  a: 'Las visitas están disponibles <b>viernes, sábados y domingos</b> con reserva previa. Para grupos o fechas especiales en días de semana, escríbenos y lo coordinamos. El cupo es limitado para garantizar una atención personalizada.' },
  { q: '¿Dónde está ubicada la finca exactamente?', a: 'Estamos en la <b>Vereda Buenos Aires, a 12 km del casco urbano de Andes, Antioquia</b>. Al confirmar tu reserva te enviamos las coordenadas exactas y una nota de voz de Don Rendón con las instrucciones para llegar. El camino hace parte de la experiencia.' },
];

// ═══════════════════════════════════════════
//  UTIL: scroll suave a ancla
// ═══════════════════════════════════════════
function smoothScroll(href) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ═══════════════════════════════════════════
//  ANIMACIONES VISUALES — inyección CSS única
// ═══════════════════════════════════════════
(function injectAnimStyles() {
  if (document.getElementById('cr-anim-styles')) return;
  const s = document.createElement('style');
  s.id = 'cr-anim-styles';
  s.textContent = `
/* ── Galería: zoom + oscurecer imagen al hover ── */
.gal-item { overflow: hidden; }
.gal-item img { transition: transform .55s cubic-bezier(.25,.46,.45,.94), filter .4s ease; will-change: transform; }
.gal-item:hover img { transform: scale(1.07); filter: brightness(.88); }
.gal-item .gal-caption { transition: transform .4s ease; }
.gal-item:hover .gal-caption { transform: translateY(-3px); }

/* ── Café cards: levantar + zoom imagen ── */
.prod-card { transition: transform .4s ease, box-shadow .4s ease; will-change: transform; }
.prod-card:hover { transform: translateY(-9px); box-shadow: 0 28px 64px rgba(0,0,0,.22); }
.prod-img { overflow: hidden; }
.prod-img img { transition: transform .55s cubic-bezier(.25,.46,.45,.94); will-change: transform; }
.prod-card:hover .prod-img img { transform: scale(1.06); }
.prod-cta { display: inline-block; transition: letter-spacing .3s ease; }
.prod-card:hover .prod-cta { letter-spacing: .04em; }

/* ── Vino cards: levantar + CTA nudge ── */
.vprod-card { transition: transform .4s ease, box-shadow .4s ease; will-change: transform; }
.vprod-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,.18); }
.vprod-cta { display: inline-block; transition: letter-spacing .3s ease; }
.vprod-card:hover .vprod-cta { letter-spacing: .04em; }

/* ── Testimonios: levantar + stars pulse ── */
.test-card { transition: transform .4s ease, box-shadow .4s ease; will-change: transform; }
.test-card:hover { transform: translateY(-7px); box-shadow: 0 20px 52px rgba(0,0,0,.14); }
@keyframes cr-star-pulse { 0%,100%{opacity:1;letter-spacing:.02em} 50%{opacity:.75;letter-spacing:.08em} }
.test-card:hover .test-stars { animation: cr-star-pulse 1.5s ease-in-out infinite; }

/* ── FAQ: icono rota a × al abrir ── */
.faq-ico svg { transition: transform .35s ease; display: block; }
.faq-item.open .faq-ico svg { transform: rotate(45deg); }
.faq-q { transition: color .25s ease, background .25s ease; }
.faq-item.open .faq-q { color: var(--gold, #c9a84c); }
.faq-q:not(.faq-item.open .faq-q):hover { background: rgba(0,0,0,.03); }

/* ── Nav: subrayado deslizante en links ── */
.nav-links a { position: relative; }
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 1px;
  background: var(--gold, #c9a84c);
  transition: width .32s ease;
}
.nav-links a:hover::after,
.nav-links a:focus-visible::after { width: 100%; }

/* ── Hamburger: barras cambian a dorado al hover ── */
.hbg span { transition: background .25s ease, transform .3s ease; }
.hbg:hover span { background: var(--gold, #c9a84c); }

/* ── Menú móvil: items aparecen en cascada ── */
@keyframes cr-mm-in { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:none; } }
.mm.o .mml { animation: cr-mm-in .38s ease both; }
.mm.o .mml:nth-child(2) { animation-delay:.05s }
.mm.o .mml:nth-child(3) { animation-delay:.10s }
.mm.o .mml:nth-child(4) { animation-delay:.15s }
.mm.o .mml:nth-child(5) { animation-delay:.20s }
.mm.o .mml:nth-child(6) { animation-delay:.25s }
.mm.o .mml:nth-child(7) { animation-delay:.30s }

/* ── Menú móvil: botón cerrar rota al hover ── */
.mm-x { transition: transform .3s ease, opacity .25s ease; }
.mm-x:hover { transform: rotate(90deg); opacity: .7; }

/* ── Lightbox: fade + escala al cambiar slide ── */
@keyframes cr-lb-in { from { opacity:0; transform:scale(.96); } to { opacity:1; transform:none; } }
.cr-lb-img { animation: cr-lb-in .3s ease; }

/* ── Botón "Ver más": punto pulsante ── */
@keyframes cr-dot-pulse { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.5);opacity:1} }
.load-btn::before {
  content: '';
  display: inline-block;
  width: 5px; height: 5px;
  border-radius: 50%;
  background: currentColor;
  margin-right: 8px;
  vertical-align: middle;
  animation: cr-dot-pulse 1.7s ease-in-out infinite;
}

/* ── Flechas del lightbox: escala al hover ── */
.lb-arrow { transition: transform .2s ease, opacity .2s ease; }
.lb-arrow:hover { transform: scale(1.18); }

/* ── Back to top: rebote sutil ── */
@keyframes cr-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
#back-top.visible { animation: cr-bounce 2.2s ease-in-out infinite; }
#back-top:hover { animation: none; transform: translateY(-2px) scale(1.08); transition: transform .2s ease; }
  `;
  document.head.appendChild(s);
})();

// ═══════════════════════════════════════════
//  COMPONENTE: NAV + MENÚ MÓVIL
// ═══════════════════════════════════════════
function NavApp() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleLink = (e, href) => {
    e.preventDefault();
    const wasOpen = menuOpen;
    closeMenu();
    setTimeout(() => smoothScroll(href), wasOpen ? 340 : 0);
  };

  return (
    <>
      <nav className={`nav${scrolled ? ' s' : ''}`} id="nav">
        <a href="#inicio" className="nav-logo" onClick={e => handleLink(e, '#inicio')}>
          <img src="assets/FOTOS%20PAGINA%20WEB/LOGO/logo.png" alt="Casa Rendón" />
          <div className="nav-logo-text">
            <span className="n1">Entre Sorbos</span>
            <span className="n2">Casa Rendón</span>
          </div>
        </a>
        <div className="nav-links">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={e => handleLink(e, l.href)}>{l.label}</a>
          ))}
        </div>
        <button className="hbg" aria-label="Menú" onClick={() => setMenuOpen(true)}>
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mm${menuOpen ? ' o' : ''}`} id="mm">
        <button className="mm-x" onClick={closeMenu}>Cerrar ✕</button>
        {NAV_LINKS.map(l => (
          <a key={l.href} href={l.href} className="mml" onClick={e => handleLink(e, l.href)}>{l.label}</a>
        ))}
        <a href="https://wa.me/573001234567" className="mml" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════
//  COMPONENTE: GALERÍA + LIGHTBOX
// ═══════════════════════════════════════════
function GaleriaApp() {
  const [showAll, setShowAll] = useState(false);
  const [lbOpen,  setLbOpen]  = useState(false);
  const [lbIdx,   setLbIdx]   = useState(0);
  const touchX = useRef(0);

  const visible = showAll ? GALLERY_IMAGES : GALLERY_IMAGES.filter(i => !i.hidden);
  const hiddenCount = GALLERY_IMAGES.filter(i => i.hidden).length;

  const openLb = (idx) => { setLbIdx(idx); setLbOpen(true); document.body.style.overflow = 'hidden'; };
  const closeLb = useCallback(() => { setLbOpen(false); document.body.style.overflow = ''; }, []);
  const prevLb  = useCallback(() => setLbIdx(i => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length), []);
  const nextLb  = useCallback(() => setLbIdx(i => (i + 1) % GALLERY_IMAGES.length), []);

  useEffect(() => {
    const onKey = (e) => {
      if (!lbOpen) return;
      if (e.key === 'Escape')     closeLb();
      if (e.key === 'ArrowLeft')  prevLb();
      if (e.key === 'ArrowRight') nextLb();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lbOpen, closeLb, prevLb, nextLb]);

  // re-observar elementos reveal después de expandir galería
  useEffect(() => {
    if (window._revealObs) {
      document.querySelectorAll('#react-galeria .r').forEach(el => window._revealObs.observe(el));
    }
  }, [showAll]);

  return (
    <>
      <div className="galeria-grid" id="galGrid">
        {visible.map((img, i) => {
          const delay = i % 4 === 1 ? ' d1' : i % 4 === 2 ? ' d2' : i % 4 === 3 ? ' d3' : '';
          return (
            <div key={img.src} className={`gal-item r${delay}`}>
              <img src={img.src} alt={img.alt} loading="lazy" style={{ cursor: 'zoom-in' }}
                onClick={() => openLb(GALLERY_IMAGES.findIndex(x => x.src === img.src))} />
              <div className="gal-caption">{img.caption}</div>
            </div>
          );
        })}
      </div>

      {!showAll && (
        <div className="load-wrap">
          <button className="load-btn" onClick={() => setShowAll(true)}>
            Ver más fotos <span className="load-count">({hiddenCount} más)</span>
          </button>
        </div>
      )}

      {/* Lightbox */}
      <div
        style={{
          position: 'fixed', inset: 0, background: 'rgba(10,5,2,.96)', zIndex: 9500,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: lbOpen ? 1 : 0, visibility: lbOpen ? 'visible' : 'hidden',
          transition: 'opacity .35s ease, visibility .35s ease', padding: '20px',
        }}
        onClick={e => { if (e.target === e.currentTarget) closeLb(); }}
        onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={e => { const dx = e.changedTouches[0].clientX - touchX.current; if (Math.abs(dx) >= 48) dx < 0 ? nextLb() : prevLb(); }}
        role="dialog" aria-modal="true"
      >
        <button className="lb-close" onClick={closeLb} aria-label="Cerrar">
          <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, stroke: 'currentColor', strokeWidth: 2, fill: 'none' }}>
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <button className="lb-arrow lb-prev" onClick={prevLb} aria-label="Anterior">
          <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: 'currentColor', strokeWidth: 1.8, fill: 'none' }}>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <img
          key={lbIdx}
          src={GALLERY_IMAGES[lbIdx]?.src || ''}
          alt={GALLERY_IMAGES[lbIdx]?.alt  || ''}
          className="cr-lb-img"
          style={{ maxWidth: '92vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: 2, boxShadow: '0 32px 96px rgba(0,0,0,.7)', display: 'block' }}
        />
        <button className="lb-arrow lb-next" onClick={nextLb} aria-label="Siguiente">
          <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: 'currentColor', strokeWidth: 1.8, fill: 'none' }}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        <div className="lb-counter">{lbIdx + 1} / {GALLERY_IMAGES.length}</div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════
//  COMPONENTE: TARJETAS CAFÉ
// ═══════════════════════════════════════════
function ProductosCafeApp() {
  useEffect(() => {
    if (window._revealObs)
      document.querySelectorAll('#react-productos-cafe .r').forEach(el => window._revealObs.observe(el));
  }, []);

  return (
    <div className="products-grid">
      {CAFE_PRODUCTS.map((p, i) => (
        <div key={p.name} className={`prod-card r${i === 1 ? ' d2' : i === 2 ? ' d4' : ''}`}>
          <div className="prod-img">
            <img src={p.img} alt={p.name} loading="lazy" />
          </div>
          <div className="prod-body">
            <div className="prod-header">
              <h3 className="prod-name">{p.name}</h3>
            </div>
            <p className="prod-origin">{p.origin}</p>
            <div className="prod-specs">
              {p.specs.map(s => <span key={s.k}><b>{s.k}:</b> {s.v}</span>)}
            </div>
            <p className="prod-notes">{p.notes}</p>
            <a href={p.wa} className="prod-cta" target="_blank" rel="noopener">Habla conmigo →</a>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════
//  COMPONENTE: TARJETAS VINO
// ═══════════════════════════════════════════
function ProductosVinoApp() {
  useEffect(() => {
    if (window._revealObs)
      document.querySelectorAll('#react-productos-vino .r').forEach(el => window._revealObs.observe(el));
  }, []);

  return (
    <div className="vino-products r" style={{ marginTop: '64px' }}>
      {VINO_PRODUCTS.map(p => (
        <div key={p.name} className="vprod-card">
          <h3 className="vprod-name">{p.name}</h3>
          <p className="vprod-type">{p.type}</p>
          <div className="vprod-specs">
            {p.specs.map(s => <span key={s.k}><b>{s.k}:</b> {s.v}</span>)}
          </div>
          <p className="vprod-desc">{p.desc}</p>
          <a href={p.wa} className="vprod-cta" target="_blank" rel="noopener">Habla conmigo →</a>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════
//  COMPONENTE: TESTIMONIOS
// ═══════════════════════════════════════════
function TestimoniosApp() {
  useEffect(() => {
    if (window._revealObs)
      document.querySelectorAll('#react-testimonios .r').forEach(el => window._revealObs.observe(el));
  }, []);

  return (
    <div className="test-grid">
      {TESTIMONIALS.map((t, i) => (
        <div key={t.author} className={`test-card r${i === 1 ? ' d2' : i === 2 ? ' d4' : ''}`}>
          <div className="test-stars">{'★'.repeat(t.stars)}</div>
          <p className="test-quote">{t.quote}</p>
          <p className="test-author">{t.author}</p>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════
//  COMPONENTE: FAQ ACORDEÓN
//  El reveal se gestiona en estado React para que
//  la clase .in no se pierda al re-renderizar por openIdx.
// ═══════════════════════════════════════════
function FAQApp() {
  const [openIdx,   setOpenIdx]  = useState(null);
  const [revealed,  setRevealed] = useState([]);
  const answerRefs = useRef([]);
  const itemRefs   = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const idx = Number(e.target.dataset.faqIdx);
        setRevealed(prev => prev.includes(idx) ? prev : [...prev, idx]);
        observer.unobserve(e.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });

    itemRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const toggle = (i) => setOpenIdx(prev => prev === i ? null : i);

  return (
    <div className="faq-list">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen     = openIdx === i;
        const isRevealed = revealed.includes(i);
        const delay      = i > 0 ? ` d${Math.min(i, 5)}` : '';
        return (
          <div
            key={i}
            data-faq-idx={i}
            ref={el => itemRefs.current[i] = el}
            className={`faq-item r${delay}${isRevealed ? ' in' : ''}${isOpen ? ' open' : ''}`}
          >
            <button className="faq-q" onClick={() => toggle(i)}>
              {item.q}
              <span className="faq-ico">
                <svg viewBox="0 0 24 24">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </button>
            <div
              className="faq-a"
              ref={el => answerRefs.current[i] = el}
              style={{ maxHeight: isOpen ? (answerRefs.current[i]?.scrollHeight + 'px') : '0' }}
            >
              <div className="faq-a-inner" dangerouslySetInnerHTML={{ __html: item.a }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════
//  MONTAR TODOS LOS COMPONENTES
// ═══════════════════════════════════════════
ReactDOM.createRoot(document.getElementById('react-nav')).render(<NavApp />);
ReactDOM.createRoot(document.getElementById('react-galeria')).render(<GaleriaApp />);
ReactDOM.createRoot(document.getElementById('react-productos-cafe')).render(<ProductosCafeApp />);
ReactDOM.createRoot(document.getElementById('react-productos-vino')).render(<ProductosVinoApp />);
ReactDOM.createRoot(document.getElementById('react-testimonios')).render(<TestimoniosApp />);
ReactDOM.createRoot(document.getElementById('react-faq')).render(<FAQApp />);
