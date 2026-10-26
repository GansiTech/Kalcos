# Guía de desarrollo — Sitios web en React

Esta guía define cómo se programan los sitios web en React (landing pages, sitios de negocio, sitios con pocas páginas). Sirve para cualquier proyecto nuevo: copia este archivo a la raíz del repo y llena la última sección, **"Datos de este proyecto"**. Todo lo demás aplica igual en todos los proyectos.

Si el proyecto trae un brief o documento de instrucciones del cliente, úsalo como contexto de negocio. Si contradice una regla técnica de esta guía, manda esta guía, salvo que el usuario diga lo contrario.

---

## 1. Stack

| Capa | Herramienta | Notas |
|---|---|---|
| Framework | React (última estable) + Vite | Solo componentes funcionales con hooks. JavaScript (`.jsx`/`.js`), sin TypeScript salvo que el proyecto lo pida. |
| Rutas | `react-router-dom` (`BrowserRouter`) | Solo si hay más de una página. Una landing de una sola página usa anclas `#seccion`. |
| Estilos | TailwindCSS + PostCSS + autoprefixer | Utility-first. Sin CSS-in-JS ni archivos `.css` por componente. |
| Animación | `framer-motion` | Envuelta en `<MotionConfig reducedMotion="user">`. |
| Iconos | `lucide-react` | Importar iconos por nombre; no copiar SVG a mano si el icono existe en Lucide. |
| Lint | `oxlint` | Mínimo `react/rules-of-hooks` en error. |

Comandos estándar en `package.json`:

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción a dist/
npm run lint     # oxlint — debe pasar sin errores antes de commitear
npm run preview  # probar el build
```

No agregues dependencias sin una razón clara; los sitios deben ser ligeros. Si hace falta backend (formularios que guardan datos, panel de admin), va en un proyecto o carpeta aparte con sus propias reglas; esta guía cubre el frontend.

### Proyecto nuevo desde cero

```bash
npm create vite@latest nombre-proyecto -- --template react
cd nombre-proyecto
npm install framer-motion lucide-react
npm install react-router-dom            # solo si habrá varias páginas
npm install -D tailwindcss@3 postcss autoprefixer oxlint
npx tailwindcss init -p
```

Después: borrar los sobrantes de la plantilla (`App.css`, logos de ejemplo, contenido del `README.md`), crear la estructura de la sección 2 y definir los tokens de diseño de la sección 5.

---

## 2. Estructura de carpetas

```
public/                  # archivos servidos tal cual: favicons, og-image, robots.txt, sitemap.xml
src/
├── main.jsx             # punto de entrada: monta <App/> y hooks globales (analítica)
├── App.jsx              # MotionConfig + Router + Layout + definición de rutas
├── index.css            # @tailwind + estilos globales mínimos (:root, focus, scroll)
├── assets/              # imágenes importadas desde JS (Vite las optimiza y versiona)
├── data/
│   └── content.js       # TODO el texto, precios, enlaces y datos de contacto
├── hooks/               # hooks reutilizables
├── pages/               # un componente por ruta
└── components/
    ├── layout/          # lo que envuelve todas las páginas: Navbar, Footer
    ├── sections/        # bloques de una página: Hero, Services, Pricing, Contact...
    └── ui/              # piezas pequeñas y reutilizables: Reveal, SectionTitle, Card...
```

Dónde va cada archivo:

- **`sections/`**: un `<section id="...">` completo de la página. Uno por archivo, nombrado por su función (`Pricing.jsx`, no `Section3.jsx`).
- **`ui/`**: algo que se usa en más de un lugar o que una sección renderiza en lista (`PricingCard`). Recibe datos por props; no importa `content.js` por su cuenta.
- **`layout/`**: lo que aparece en todas las rutas.
- **`pages/`**: un componente por ruta. Si la página de inicio solo compone secciones, puede vivir en `App.jsx` como `HomePage`; si crece, se mueve a `pages/HomePage.jsx`.
- `App.jsx` solo arma rutas y layout. No pongas lógica ni contenido ahí.

Esqueleto de `App.jsx`:

```jsx
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Al cambiar de ruta: ir a la sección del hash (p. ej. /#precios) o al inicio de la página
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

function Layout() {
  return (
    <div className="min-h-screen bg-base-950 text-white">
      <ScrollManager />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}
```

---

## 3. Contenido centralizado (`src/data/content.js`)

Todo el copy, precios, listas, enlaces y datos de contacto viven en `content.js` como exports con nombre (`hero`, `services`, `pricingTiers`, `contact`, `navigation`...). Los componentes importan solo lo que usan:

```js
import { pricingTiers } from '../../data/content'
```

- **Nunca** escribas un teléfono, correo, precio o URL de contacto directamente en un componente. Guarda los datos base en `content.js` y arma lo demás a partir de ellos:
  ```js
  // content.js
  export const contact = {
    phone: '+52 ...',
    whatsappNumber: '52...',
    email: '...',
  }

  // componente
  const href = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(mensaje)}`
  ```
- `navigation` es la lista de enlaces del menú (`{ label, href: '#seccion' }`); Navbar y Footer la recorren.
- Los iconos de una lista se guardan como **string** (`icon: 'Clock'`) y el componente los traduce con un mapa:
  ```js
  const icons = { Clock, Workflow, Users }
  const Icon = icons[item.icon] ?? Check
  ```
- Las reglas de negocio que dependen de los datos se expresan con campos explícitos (`ctaType: 'quote-form'`, `highlighted: true`) y el componente decide el comportamiento a partir de ellos.
- Credenciales o llaves de API **nunca** van en `content.js`. Van en `.env` como `VITE_*` solo si son públicas; lo secreto va en un backend. `.env` siempre en `.gitignore`.

---

## 4. Estilo de código

- Componentes en PascalCase (`PricingCard.jsx`); hooks en camelCase con prefijo `use` (`useScrollAnalytics.js`).
- `export default function NombreComponente()`: un componente principal por archivo. Helpers pequeños (un hook local, una función `validate`) pueden vivir arriba del componente en el mismo archivo.
- **Comillas simples y sin punto y coma.** Si un archivo existente usa otro estilo, respétalo al editarlo.
- Comentarios en **español**, cortos, que expliquen el *porqué* (reglas de negocio, decisiones no obvias), no el *qué*.
- Textos visibles en el idioma y tono del cliente (por defecto español de México, tuteando).
- Clases de Tailwind repetidas dentro de un archivo se extraen a una constante (`const inputClass = '...'`). Si se repiten entre archivos, se crea un componente en `ui/`.

---

## 5. Sistema de diseño

Cada proyecto define sus tokens en `tailwind.config.js` dentro de `theme.extend`, y los componentes **solo usan tokens**: nada de colores hex sueltos en `className` (excepción: colores de marca de terceros, como el verde de WhatsApp `#25D366`).

Nombres de tokens que se usan en todos los proyectos (cambian los valores, no los nombres):

```js
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {           // fondos y bordes (escala de la marca)
          950: '...',     // fondo principal
          900: '...',     // fondo de secciones alternas
          800: '...',     // cards, formularios
          700: '...',     // bordes y divisores
        },
        accent: {         // color de acción / CTA
          DEFAULT: '...',
          light: '...',   // texto de acento sobre fondo oscuro (mejor contraste)
          dark: '...',    // hover del CTA
        },
      },
      fontFamily: {
        sans: ['...', 'system-ui', 'sans-serif'],    // cuerpo
        display: ['...', 'sans-serif'],              // títulos
      },
    },
  },
  plugins: [],
}
```

Reglas de uso:

- Alternar `base-950` / `base-900` entre secciones para dar ritmo.
- `accent` se reserva para CTAs, estados activos, iconos destacados y el elemento recomendado. Si todo es de color de acento, nada destaca.
- Títulos (`h1`, `h2`, precios) con `font-display`, peso 600–700; cuerpo con `font-sans`.
- Si el sitio es claro en vez de oscuro, se mantienen los mismos nombres de token con valores claros.

Patrones de UI que se repiten igual en todos los proyectos:

- **Contenedor de sección**:
  ```jsx
  <section id="precios" className="bg-base-950 py-24">
    <div className="mx-auto max-w-7xl px-6">
      <SectionTitle eyebrow="Precios" heading="..." description="..." />
      ...
    </div>
  </section>
  ```
- **Botón primario**: `rounded-xl bg-accent px-6 py-3.5 font-semibold text-white transition hover:bg-accent-dark`
- **Botón secundario**: `rounded-xl border border-base-700 px-6 py-3.5 font-semibold transition hover:border-accent/50`
- **Card**: `rounded-2xl border border-base-700 bg-base-800 p-6`
- Grids mobile-first: `grid gap-6 md:grid-cols-2 xl:grid-cols-4`, `grid gap-8 lg:grid-cols-3`.

Antes de diseñar UI nueva o rediseñar, revisa si el repo tiene skills de diseño (por ejemplo en `.agents/skills/`) y úsalas.

---

## 6. Componentes base

Estos componentes de `ui/` se crean al inicio de cada proyecto y se reutilizan en todas las secciones.

**`Reveal.jsx`**: aparición al hacer scroll. Ninguna sección repite `initial/whileInView` a mano.

```jsx
import { motion } from 'framer-motion'

// Hace aparecer su contenido (sube y se desvanece) cuando entra en pantalla al hacer scroll.
// `once` evita que el contenido vuelva a ocultarse al subir: lo ya leído se queda visible.
export default function Reveal({ children, delay = 0, y = 24, x = 0, className, as = 'div' }) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  )
}
```

**`SectionTitle.jsx`**: encabezado estándar de sección (`eyebrow`, `heading` como `<h2>`, `description`), envuelto en `Reveal`.

**`ImagePlaceholder.jsx`**: espacio reservado mientras no existe la imagen final. Recibe un `label` que describe qué imagen va ahí y un `aspect` (`aspect-[4/3]`, `aspect-video`) para que el layout no cambie cuando llegue la imagen real.

---

## 7. Animaciones

- Toda la app va dentro de `<MotionConfig reducedMotion="user">`: framer-motion respeta la preferencia de movimiento reducido del sistema.
- Entradas al hacer scroll: siempre con `Reveal` (`<Reveal as="li" x={32} y={0}>` para entrar de lado). Escalonar listas con `delay={index * 0.08–0.12}`.
- Animaciones ligadas al scroll (`useScroll`, `useTransform`, parallax): consultar `useReducedMotion()` y no aplicar el `style` animado si devuelve `true`.
- Curva estándar `ease: [0.22, 1, 0.36, 1]`, duración 0.5–0.8 s.
- Animar solo `opacity` y `transform` (`x`, `y`, `scale`). Nunca `width`, `height`, `top` o `margin`.
- En `index.css`, `body { overflow-x: clip; }` para que lo que entra de lado no genere scroll horizontal.
- La animación acompaña al contenido; si una animación no ayuda a entender o a dirigir la atención, se quita.

---

## 8. Estilos globales (`index.css`)

Solo lo mínimo; todo lo demás es Tailwind:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
  /* Evita que el header fijo tape los títulos al saltar a una sección */
  scroll-padding-top: 5rem;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

:focus-visible {
  outline: 2px solid /* color de acento claro */;
  outline-offset: 3px;
}

body {
  margin: 0;
  min-height: 100vh;
  /* Los elementos que entran de lado al hacer scroll no deben generar scroll horizontal */
  overflow-x: clip;
}
```

Las fuentes (Google Fonts u otras) se cargan en `index.html` con `preconnect`.

---

## 9. Rutas y navegación

- Rutas en `App.jsx`, todas dentro de `<Route element={<Layout />}>` para heredar Navbar, Footer y elementos flotantes.
- `ScrollManager` sube al inicio al cambiar de ruta o salta al `#hash`. Desde otras páginas, las anclas se escriben como `/#seccion`.
- Navegación entre rutas con `<Link to="...">`; anclas en la misma página con `<a href="#id">`; enlaces externos con `target="_blank" rel="noopener noreferrer"`.
- La Navbar marca la sección visible con `aria-current="location"` (usando `IntersectionObserver`) y en móvil usa un menú desplegable.
- Al agregar una ruta pública: añadirla a `public/sitemap.xml`. Con `BrowserRouter`, el hosting debe redirigir todas las rutas a `index.html` (rewrite de SPA); confirmar que esté configurado.

---

## 10. Accesibilidad (obligatorio)

- Un solo `<h1>` por página; `h2` por sección y `h3` dentro de cards. No saltar niveles.
- Etiquetas semánticas: `<main>`, `<section id>`, `<nav aria-label>`, `<header>`, `<footer>`, `<ol>/<ul>` para listas.
- Iconos decorativos con `aria-hidden="true"`. Botones de solo icono con `aria-label`.
- Toda `<img>` lleva `alt` (vacío, `alt=""`, si es decorativa) y `width`/`height` para evitar saltos de layout.
- Formularios: `<label htmlFor>` en cada campo; `aria-invalid` y `aria-describedby` apuntando al mensaje de error; foco al primer campo inválido; validar al salir del campo (`onBlur`) y corregir el error mientras el usuario escribe; mensajes de estado en `role="status" aria-live="polite"`; `autoComplete` e `inputMode` correctos.
- Menús desplegables con `aria-expanded` y `aria-controls`.
- No quitar el estilo de `:focus-visible`. Áreas táctiles de al menos 44 px (`min-h-11`).
- Contraste AA como mínimo. Sobre fondo oscuro, texto de acento con `accent-light`.

---

## 11. SEO

- En `index.html`: `lang` correcto, `<title>`, meta description, canonical, Open Graph, Twitter Card, `theme-color`, favicons, y JSON-LD de schema.org con el tipo que corresponda al negocio (`LocalBusiness`, `ProfessionalService`, `Restaurant`...).
- Si cambian precios o datos de contacto en `content.js`, actualízalos también en los meta tags y el JSON-LD.
- Páginas secundarias declaran su propio `<title>` y `<meta>` dentro del componente (React 19 los sube al `<head>`). Páginas legales llevan `noindex, follow`.
- `og-image` de 1200×630 en `public/`.
- `robots.txt` y `sitemap.xml` en `public/`, siempre al día.

---

## 12. Analítica y cookies

- Un hook `useScrollAnalytics([...ids])` en `main.jsx` registra qué secciones se ven. Al agregar una sección con `id`, añádela a la lista.
- **Nada se envía sin consentimiento.** Todo evento revisa `localStorage.getItem('cookieConsent') === 'true'` antes de llamar al proveedor, y lo llama de forma segura (`window?.gtag?.(...)`).
- Si el sitio usa cookies de analítica, incluye un `CookieBanner` (Aceptar / Rechazar, guardado en `localStorage`) y una página `/cookie-policy`. El banner se puede reabrir con `window.dispatchEvent(new Event('cookie-preferences-open'))`.
- Envuelve los accesos a `localStorage` en `try/catch` cuando corren al cargar (pueden fallar en modo privado).

---

## 13. Conversión

Los sitios de negocio son embudos de venta, no folletos. Cada sección debe acercar al usuario a la acción principal del proyecto (WhatsApp, formulario, llamada, reservar, comprar):

- CTA principal visible sin hacer scroll.
- Si el canal principal es WhatsApp: botón flotante visible en todas las rutas (dentro de `Layout`), y el formulario arma el mensaje y abre `wa.me` con `encodeURIComponent`, dejando un enlace de respaldo por si el navegador bloquea la ventana.
- Copy enfocado en beneficios para el cliente final, sin jerga técnica.
- La mayoría del tráfico es móvil: se diseña primero para celular.

---

## 14. Imágenes y rendimiento

- Imágenes que usa el código: en `src/assets/` e importadas (`import heroImage from '../../assets/hero.jpg'`). Archivos con URL fija (favicons, og-image): en `public/`.
- Preferir `.webp`/`.avif`. La imagen principal (above the fold) carga normal; las demás con `loading="lazy"`.
- Mientras no exista la imagen final, usar `ImagePlaceholder`.
- Si una página pesada hace crecer el bundle, cargarla con `React.lazy` + `Suspense`.

---

## 15. Checklist antes de dar algo por terminado

1. `npm run lint` y `npm run build` sin errores.
2. Revisado en ancho de celular (~375 px) y escritorio, sin scroll horizontal.
3. Textos y datos nuevos en `content.js`, no en el componente.
4. Secciones nuevas con `id`, añadidas a `navigation` (si van en el menú) y a la lista de analítica.
5. Rutas nuevas en `sitemap.xml`.
6. Accesibilidad de la sección 10 cumplida.
7. Animaciones respetan movimiento reducido.

---

## Datos de este proyecto

- **Proyecto:** Kalcos Zapatería, sitio oficial. Cadena de 9 zapaterías en Hermosillo, Sonora. Cliente de GansiSolutions.
- **Objetivo:** pasar la verificación del negocio en Meta (API de WhatsApp Business); en segundo lugar, presencia de marca.
- **URL:** https://kalcos.com.mx/ — idioma `es-MX`. Hosting LiteSpeed/cPanel, build estático.
- **Stack:** el brief pide **TypeScript** (`.ts`/`.tsx`), así que aquí no aplica "JavaScript sin TypeScript" de la sección 1.
- **Datos:** la fuente única es `src/data/empresa.ts` (en lugar de `content.js`); los textos de interfaz van en `src/data/contenido.ts`. Pendientes en `null`, mostrados en amarillo con `<Dato>`/`<Pendiente>`. `MODO_MAQUETA = false` hace fallar el build si falta un dato obligatorio (plugin en `vite.config.ts`).
- **Tema:** claro. `base` papel cálido, `ink` tinta casi negra, `accent` naranja quemado `#B8420F`. Fuentes: Inter (cuerpo) y Archivo (títulos).
- **Secciones:** `#inicio`, `#catalogo`, `#sucursales`, `#contacto`. Rutas: `/`, `/privacidad`, `/terminos` (+ 404).
- **Prerender:** `npm run build` genera `dist/*.html` por ruta (`scripts/prerender.mjs` + `src/entry-server.tsx`). Al agregar una ruta, súmala a `rutas` en `entry-server.tsx`, a `seoRutas` y al sitemap.
- **Reglas Meta:** razón social, RFC, domicilio fiscal y teléfono visibles en el pie de todas las páginas. El aviso de privacidad sin pop-ups ni animaciones que lo tapen. Páginas legales indexables (excepción a la sección 11, por decisión del brief).
- **Sin analítica ni cookies**, por eso no hay `CookieBanner` ni `useScrollAnalytics`.
- **Brief original:** `Prompt_Claude_Code_Kalcos.md`. Node está en `/home/linuxbrew/.linuxbrew/bin`.
