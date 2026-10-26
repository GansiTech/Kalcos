# Kalcos Zapatería · kalcos.com.mx

Sitio oficial de Kalcos Zapatería (Hermosillo, Sonora). Su objetivo principal es pasar la **verificación del negocio en Meta** para conectar la API de WhatsApp Business; en segundo lugar, es la presencia básica de la marca.

Stack: Vite + React 19 + TypeScript, Tailwind CSS 3, React Router, framer-motion y lucide-react. No tiene backend: el build es estático y se sube por cPanel.

## Comandos

Se necesita Node 20 o superior.

```bash
npm install       # una sola vez
npm run dev       # servidor local en http://localhost:5173
npm run lint      # oxlint
npm run build     # build de producción en dist/ (con las 3 rutas prerenderizadas)
npm run preview   # probar el build en http://localhost:4173
```

## Cómo llenar los datos (`src/data/empresa.ts`)

**Todo** lo que el sitio dice de la empresa está en `src/data/empresa.ts`. No hace falta tocar componentes.

1. Reemplaza cada `null` por el dato real. Los comentarios de cada campo dicen el formato (por ejemplo, `whatsapp` va con 10 dígitos, sin +52).
2. Mientras un dato sea `null`, el sitio lo muestra resaltado en amarillo con el texto "Pendiente: …".
3. Los horarios van en cada sucursal (`sucursales[].horario`), y el horario general en `horarioGeneral`.
4. Para el logo, pon el archivo en `public/` (por ejemplo `public/logo-kalcos.svg`) y escribe `logo: '/logo-kalcos.svg'`.
5. Cuando estén todos los datos, cambia `MODO_MAQUETA` a `false`. Con eso:
   - desaparecen el banner de maqueta y la nota "Texto base…" de las páginas legales;
   - los datos opcionales que sigan vacíos (Instagram, bolsa de trabajo, marcas, años, horarios) simplemente no se muestran;
   - el sitio se vuelve indexable en Google (en maqueta todas las páginas llevan `noindex`);
   - `npm run build` **falla** si falta algún dato obligatorio y dice cuál.

Datos obligatorios para salir con `MODO_MAQUETA = false`: razón social, RFC, domicilio fiscal, correo de contacto, correo de privacidad (ARCO), WhatsApp de atención y política de cambios y devoluciones.

Los textos de la interfaz (hero, categorías, títulos) están en `src/data/contenido.ts`. El texto de las páginas legales está en `src/pages/PrivacidadPage.tsx` y `src/pages/TerminosPage.tsx`, y toma de `empresa.ts` todos los datos de la empresa.

## Rutas y por qué cada URL funciona al entrar directo

Rutas: `/`, `/privacidad`, `/terminos` (más una página 404).

Elegí **prerenderizar** (la opción preferida del brief). `npm run build` genera un HTML completo por ruta:

```
dist/index.html        → https://kalcos.com.mx/
dist/privacidad.html   → https://kalcos.com.mx/privacidad
dist/terminos.html     → https://kalcos.com.mx/terminos
dist/404.html          → cualquier URL que no exista (responde 404 real)
```

Cada archivo ya trae su propio `<title>`, descripción, canonical, Open Graph y todo el texto en el HTML, así que Meta (o cualquier robot) ve el aviso de privacidad completo aunque no ejecute JavaScript. Después React "hidrata" la página y la navegación interna es instantánea.

Además se incluye `dist/.htaccess` para LiteSpeed/Apache, que:

- fuerza HTTPS y quita el `www`;
- sirve `/privacidad` desde `privacidad.html` sin que aparezca `.html` en la URL, y redirige `/privacidad/` a `/privacidad`;
- responde 404 real con `404.html`;
- pone caché larga a los assets con hash y `no-cache` al HTML.

El prerender lo hace `scripts/prerender.mjs` con un build SSR de Vite (`src/entry-server.tsx`). No agrega dependencias.

## Subir a cPanel

1. `npm run build`.
2. En cPanel, abre **Administrador de archivos** → `public_html`.
3. Activa "Mostrar archivos ocultos" (Configuración, arriba a la derecha) para ver el `.htaccess`.
4. Borra lo que haya en `public_html` (si hay algo que conservar, respáldalo antes).
5. Sube **el contenido** de `dist/`, no la carpeta: comprímelo en un .zip, súbelo y usa "Extraer". Debe quedar `public_html/index.html`, `public_html/privacidad.html`, `public_html/.htaccess`, `public_html/assets/…`.
6. Revisa en el navegador, en una ventana privada:
   - https://kalcos.com.mx/
   - https://kalcos.com.mx/privacidad (recarga la página: debe seguir mostrando el aviso)
   - https://kalcos.com.mx/terminos
   - http://kalcos.com.mx (debe redirigir a https)

### HTTPS en el hosting

- En cPanel → **SSL/TLS Status**, confirma que `kalcos.com.mx` y `www.kalcos.com.mx` tengan certificado válido (AutoSSL / Let's Encrypt). Si aparece en rojo, pulsa "Run AutoSSL". El DNS del dominio debe apuntar al hosting para que se emita.
- Si al entrar ves "demasiadas redirecciones", el hosting está detrás de un proxy que no avisa HTTPS: comenta las 3 líneas de la regla 1 del `.htaccess` y activa "Forzar HTTPS" desde cPanel → Dominios.

## Checklist para la verificación de Meta

**Datos (en `src/data/empresa.ts`)**

- [ ] `razonSocial` idéntica, letra por letra, a la Constancia de Situación Fiscal del SAT (incluye "S.A. de C.V." o el régimen tal como aparece).
- [ ] `rfc` y `domicilioFiscal` tal como vienen en la constancia.
- [ ] `telefonoPrincipal` es un número que conteste alguien de Kalcos (Meta puede llamar o mandar código).
- [ ] `correoContacto` y `correoPrivacidad` con el dominio `@kalcos.com.mx` (créalos en cPanel → Cuentas de correo). Meta puede verificar por correo del dominio.
- [ ] `whatsapp` de atención.
- [ ] `politicaDevoluciones`.
- [ ] `MODO_MAQUETA = false` y `npm run build` sin errores.

Razón social, RFC, domicilio fiscal y teléfono se muestran en el pie de **todas** las páginas y en la sección Contacto, tomados del mismo archivo, para que coincidan con los documentos.

**Etiqueta de verificación del dominio**

1. En Meta Business Suite → Configuración del negocio → Seguridad de la marca → **Dominios** → Agregar `kalcos.com.mx`.
2. Elige "Agregar una metaetiqueta a tu código fuente HTML" y copia solo el valor de `content="…"`.
3. Pégalo en `metaVerificacionDominio` de `empresa.ts`, **o** crea un archivo `.env` en la raíz con:
   ```
   VITE_FACEBOOK_DOMAIN_VERIFICATION=el_valor_que_te_dio_meta
   ```
   (la variable tiene prioridad; hay un ejemplo en `.env.example`).
4. `npm run build`, sube `dist/` y pulsa "Verificar dominio" en Meta.
5. Comprueba que el HTML publicado lo tenga: ver código fuente de https://kalcos.com.mx/ y buscar `facebook-domain-verification`.

**URL de la política de privacidad**

Para la app de WhatsApp Business / Meta for Developers, usa:

- Política de privacidad: `https://kalcos.com.mx/privacidad`
- Términos del servicio: `https://kalcos.com.mx/terminos`
- Sitio web del negocio: `https://kalcos.com.mx/`

El aviso no tiene login, ni pop-ups, ni banner de cookies que lo tape (el sitio no usa cookies).

## SEO y calidad

- `lang="es-MX"`, título, descripción, canonical y Open Graph por ruta (prerenderizados; `src/data/seo.ts`).
- JSON-LD en la página de inicio: `ShoeStore` para la organización y un `LocalBusiness` por sucursal, generado desde `empresa.ts` (`src/lib/schema.ts`). Los datos pendientes simplemente no se incluyen.
- `public/robots.txt`, `public/sitemap.xml`, `favicon.svg`, `apple-touch-icon.png` y `og-image.png` (1200×630).
- Lighthouse medido localmente (móvil, sobre `npm run preview`) en la página de inicio: Performance 99, Accessibility 100, Best Practices 100. SEO marca 66 **solo** porque en modo maqueta las páginas llevan `noindex`; con `MODO_MAQUETA = false` esa auditoría pasa.

## Supuestos y decisiones

- **Maqueta:** no encontré `Maqueta_Kalcos.html` en la carpeta del proyecto. Seguí la descripción del brief (fondo papel cálido, tinta casi negra, acento naranja quemado, Archivo + Inter) y la estructura de secciones que pide. Si me pasas la maqueta, ajusto los detalles para que coincida.
- **Sin WhatsApp todavía:** el botón principal del hero llama a la matriz en lugar de quedar muerto, y el botón flotante de WhatsApp aparece solo cuando hay número. Al llenar `whatsapp`, todos los botones abren WhatsApp con un mensaje ya escrito.
- **Catálogo:** cada categoría tiene "Preguntar por un modelo", que abre WhatsApp con la categoría en el mensaje (o llama, mientras no haya número). "Remate" se marca como destacado y remite a la sucursal Solidaridad Remate (por el nombre de la sucursal y de la página de Facebook).
- **Sin analítica ni cookies**, así que no hay banner de cookies y el aviso lo dice. Si después se agrega analítica, hay que poner banner de consentimiento y actualizar el apartado 8 del aviso.
- **Páginas legales indexables:** la guía interna dice `noindex` para páginas legales, pero el brief pide SEO ≥ 90 en todas las rutas y conviene que el aviso sea fácil de encontrar, así que se indexan y van en el sitemap.
- **Aviso de privacidad:** es un texto base conforme a la LFPDPPP (responsable, datos, finalidades primarias y secundarias, asistente automatizado con derecho a atención humana, proveedores tecnológicos descritos de forma genérica, ARCO, revocación, cookies y cambios). **Debe revisarlo el área legal de Kalcos** antes de publicarlo como definitivo, en especial los plazos ARCO y la mención de la autoridad, porque la ley se reformó en 2025.
- **Años de operación:** se guarda el año de fundación (`anioFundacion`) y los años se calculan solos, para que el dato no se quede viejo.
