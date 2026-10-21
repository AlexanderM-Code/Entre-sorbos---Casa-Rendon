# Entre Sorbos — Casa Rendón

Sitio web de **Casa Rendón**, una marca familiar de café de altura y vino artesanal de Buenos Aires, Andes (Antioquia). El objetivo fue darle presencia digital al negocio: contar su historia, mostrar sus productos y facilitar que los clientes reserven una visita.

**Sitio en producción:** [casarendon.com](https://casarendon.com)

> Proyecto desarrollado en equipo — 2026.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)

---

## Secciones del sitio

- **Inicio:** portada con video de fondo.
- **Historia:** el origen familiar de la marca y su territorio.
- **Café y Vino:** catálogo de productos en tarjetas.
- **Galería:** fotos del proceso, la cosecha y la finca, con visor ampliado (lightbox).
- **Impacto y testimonios:** opiniones de clientes.
- **Preguntas frecuentes:** acordeón con las dudas más comunes.
- **Visita:** formulario de reserva que envía la solicitud directamente por WhatsApp.

## Funcionalidades destacadas

- Componentes de **React 18** para la navegación, los productos, la galería, los testimonios y las preguntas frecuentes.
- Animaciones al hacer scroll con `IntersectionObserver`.
- Barra de progreso de lectura, botón para volver arriba y notificaciones tipo *toast*.
- Formulario de reserva y reseñas integrados con **WhatsApp**.
- Diseño responsive con menú móvil.

## Estructura

```
Entre-sorbos---Casa-Rendon/
├── Casa Rendon.html       # Página principal
├── styles.css             # Estilos y diseño responsive
├── script.js              # Interacciones: animaciones, formulario, lightbox
├── react-components.jsx   # Componentes React
└── assets/                # Videos y fotografías
```

## Cómo verlo localmente

No necesita instalación: React se carga desde CDN.

```bash
git clone https://github.com/AlexanderM-Code/Entre-sorbos---Casa-Rendon.git
cd Entre-sorbos---Casa-Rendon
python -m http.server 8000
```

Abre `http://localhost:8000/Casa%20Rendon.html` en el navegador.

## Equipo

<!-- Agrega aquí los nombres y enlaces de GitHub de tus compañeros -->
- **Alexander Mejía Ospina** — [GitHub](https://github.com/AlexanderM-Code) · [LinkedIn](https://www.linkedin.com/in/alexander-mejia-ospina)
