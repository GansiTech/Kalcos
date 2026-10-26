# Prompt para Claude Code · Sitio web de Kalcos Zapatería (React)

Copia todo lo que está debajo de la línea y pégalo en Claude Code. Pon el archivo `Maqueta_Kalcos.html` en la carpeta del proyecto antes de empezar.

---

## Contexto

Soy Fernando, de GansiSolutions, una agencia web de Hermosillo, Sonora. Mi cliente **Kalcos Zapatería** es una cadena de zapaterías con 9 sucursales en Hermosillo. Estoy desarrollando para ellos un agente de ventas multicanal (WhatsApp, Messenger e Instagram) y un agente de recursos humanos con n8n. Para conectar la **API de WhatsApp Business**, Kalcos necesita completar la **verificación del negocio en Meta**, y para eso necesitan un sitio web propio en su dominio **kalcos.com.mx**. El dominio ya existe y está alojado en un hosting con LiteSpeed/cPanel, pero hoy no tiene ninguna página publicada.

Quiero que construyas ese sitio en **React**. Es un sitio sencillo y profesional, cuyo objetivo principal es pasar la verificación de Meta. En segundo lugar, sirve como presencia básica de la marca.

## Antes de empezar

1. Revisa qué **skills** tienes disponibles en este entorno y usa las que apliquen: diseño frontend, React, accesibilidad, SEO o despliegue. Dime cuáles vas a usar.
2. Abre `Maqueta_Kalcos.html`. Es la maqueta aprobada de diseño y contenido. Respeta su estructura, sus secciones y su estilo visual (fondo papel cálido, tinta casi negra, acento naranja quemado, tipografías Archivo e Inter). Puedes mejorar los detalles, pero no cambies el concepto.
3. Hazme las preguntas que necesites solo si algo te bloquea. Si no, decide con buen criterio y anota tus supuestos en el README.

## Stack

- Vite + React + TypeScript.
- Tailwind CSS. Si alguna skill indica otra forma de manejar estilos, síguela.
- React Router con estas rutas: `/`, `/privacidad`, `/terminos`.
- Nada de backend. El resultado tiene que ser un build estático para subir al hosting por cPanel.
- Cada ruta debe responder con su propia URL al recargar o al entrar directo, porque Meta revisa la URL del aviso de privacidad. Para lograrlo:
  - Prerenderiza las 3 rutas a HTML estático (preferido),
  - o incluye un `.htaccess` con el rewrite a `index.html` para LiteSpeed/Apache.
  - Explícame qué opción elegiste.

## Fuente única de datos

Pon **todos** los datos de la empresa en un solo archivo, `src/data/empresa.ts`, para que yo pueda llenarlos después sin tocar componentes. Los datos que aún están pendientes van como `null`, y la interfaz los muestra resaltados en amarillo con un texto tipo "Pendiente: razón social". Agrega una bandera `MODO_MAQUETA` que, en `false`, oculte el banner de maqueta y haga que `npm run build` falle si queda algún dato obligatorio en `null`.

### Datos confirmados (tomados de Google Maps y de la DENUE)

- **Nombre comercial:** Kalcos Zapatería
- **Giro:** comercio al por menor de calzado
- **Ciudad:** Hermosillo, Sonora, México
- **Dominio:** kalcos.com.mx
- **Facebook:** https://www.facebook.com/kalcossolidaridadremate/ (sucursal Remate)
- **Teléfono principal:** 662 312 3233 (Matriz)

**Sucursales:**

| Sucursal | Dirección | Teléfono | Coordenadas |
|---|---|---|---|
| Matriz | Blvd. Solidaridad y Av. Yécora, col. Miguel Hidalgo, C.P. 83117 | 662 312 3233 | 29.13257, -110.99293 |
| Solidaridad Remate | Blvd. Solidaridad esquina, col. Miguel Hidalgo, C.P. 83117 | 662 312 3233 | 29.13209, -110.99278 |
| Progreso | Blvd. Progreso 182, Solidaridad IV, C.P. 83116 | 662 311 5223 | 29.14252, -111.01556 |
| Karol Ley | Blvd. Solidaridad, col. Sahuaro, C.P. 83170 | 662 690 7891 | 29.09610, -110.99325 |
| Morelia | Av. Morelia, Centro, C.P. 83000 | 662 213 1475 | 29.07937, -110.95292 |
| Madrigal | Av. Morelia 2, Centro, C.P. 83000 | 662 158 8817 | 29.07934, -110.95099 |
| Monterrey | Av. Monterrey 15, Centro, C.P. 83000 | 662 158 8834 | 29.07873, -110.95182 |
| Altares | Av. Xólotl 273, Valle del Márquez, C.P. 83294 | 662 310 5008 | 29.02338, -110.94281 |
| Sunmall | Blvd. Juan Bautista de Escalante, Zona Industrial, C.P. 83117 | 662 145 2694 | 29.14613, -110.99361 |

Cada sucursal lleva un enlace "Cómo llegar" a Google Maps con sus coordenadas y un enlace `tel:`.

### Datos pendientes (van en `null`)

- Razón social exacta (debe coincidir letra por letra con la constancia del SAT que se sube a Meta)
- RFC
- Domicilio fiscal completo
- Correo de contacto con el dominio (por ejemplo contacto@kalcos.com.mx) y correo para privacidad / derechos ARCO
- Número oficial de WhatsApp de atención
- Usuario de Instagram
- Contacto de recursos humanos para la bolsa de trabajo
- Horarios por sucursal
- Años de operación
- Política de cambios y devoluciones
- Logo (mientras tanto, usa el texto "KALCOS." como en la maqueta)
- Fotos de tiendas y productos (mientras tanto, placeholders con proporción fija)
- Marcas y líneas de calzado que manejan

## Contenido y secciones

1. **Banner de maqueta**, solo con `MODO_MAQUETA: true`.
2. **Header fijo** con logo y navegación: Catálogo, Sucursales, Contacto, Aviso de privacidad, Términos. En celular, un menú hamburguesa accesible.
3. **Hero** con el título "Calzado para toda la familia, en 9 sucursales de Hermosillo", texto de apoyo, botón de WhatsApp y botón "Ver sucursales".
4. **Datos rápidos:** número de sucursales (calculado desde los datos), años de operación y horario.
5. **Catálogo de muestra** con las categorías Dama, Caballero, Niños y escolar, Botas, Tenis y Remate. No hay carrito ni precios.
6. **Sucursales:** tarjetas generadas desde `empresa.ts`.
7. **Contacto / Datos de la empresa**, con dos paneles:
   - Información legal: nombre comercial, razón social, RFC, domicilio fiscal, teléfono, correo y sitio.
   - Canales de atención: WhatsApp, Facebook, Instagram y bolsa de trabajo.
8. **Footer** con razón social, RFC, domicilio fiscal, teléfono, correo, enlaces legales y la línea "Sitio desarrollado por GansiSolutions".
9. **`/privacidad`:** aviso de privacidad integral conforme a la LFPDPPP. Debe incluir:
   - Responsable y domicilio.
   - Datos que se recaban, incluidos los mensajes por WhatsApp, Messenger e Instagram, y los datos de candidatos a vacantes.
   - Finalidades primarias y secundarias.
   - Uso de un **asistente automatizado** y el derecho a pedir atención humana.
   - Transferencias a proveedores tecnológicos (Meta, plataforma de automatización y proveedor de IA), descritas de forma genérica.
   - Derechos ARCO y medio para ejercerlos.
   - Revocación del consentimiento.
   - Uso de cookies (solo si agregas analítica).
   - Cambios al aviso y fecha de última actualización.
   - Una nota visible en modo maqueta: "Texto base, debe revisarlo el área legal de Kalcos".
10. **`/terminos`:** términos y condiciones con uso del sitio, precios y disponibilidad, cambios y devoluciones (pendiente), propiedad intelectual, ley aplicable (Sonora, México) y contacto.

## Requisitos para la verificación de Meta

- Razón social, domicilio y teléfono visibles en el pie de **todas** las páginas, tomados de `empresa.ts`, para que coincidan con los documentos.
- El aviso de privacidad tiene que estar en una URL pública fija (`https://kalcos.com.mx/privacidad`) sin login ni pop-ups que lo tapen.
- Deja en `index.html` un lugar comentado y claro para la meta etiqueta de verificación de dominio de Meta: `<meta name="facebook-domain-verification" content="PENDIENTE" />`. Toma el valor de `empresa.ts` o de una variable de entorno.
- HTTPS. Avísame si hace falta algo en el hosting.

## SEO y calidad

- Título y descripción por ruta, Open Graph básico y `lang="es-MX"`.
- Datos estructurados JSON-LD: `ShoeStore` para la organización y una `LocalBusiness` por sucursal, generados desde `empresa.ts`.
- `robots.txt`, `sitemap.xml` y favicon.
- Responsive desde 360 px, sin scroll horizontal.
- Accesibilidad AA: contraste, foco visible, textos alternativos y navegación con teclado.
- Lighthouse de 90 o más en Performance, Accessibility, Best Practices y SEO.
- Sin dependencias pesadas. Fuentes con `display=swap`.

## Entregables

1. El proyecto completo, con un README en español que explique cómo llenar `empresa.ts`, cómo correrlo (`npm run dev`), cómo generar el build (`npm run build`) y cómo subir la carpeta `dist/` a `public_html` por cPanel.
2. Una checklist en el README para la verificación de Meta: qué datos llenar, cómo poner la etiqueta de verificación del dominio y qué URL dar como política de privacidad.
3. Al terminar, corre el build, revisa que las 3 rutas carguen por URL directa y dame un resumen corto de lo que hiciste y de lo que falta que me entregue Kalcos.
