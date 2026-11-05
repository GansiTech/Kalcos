// Textos de la interfaz. Los datos de la empresa (teléfonos, direcciones,
// correos, razón social) viven en empresa.ts, no aquí.

import fotoTienda from '../assets/fotos/tienda-kalcos-3.webp'
import fotoDama from '../assets/fotos/dama.webp'
import fotoCaballero from '../assets/fotos/caballero.webp'
import fotoEscolar from '../assets/fotos/escolar.webp'
import fotoBotas from '../assets/fotos/botas.webp'
import fotoTenis from '../assets/fotos/tenis.webp'
import fotoRemate from '../assets/fotos/remate.webp'

// `ancho`/`alto` son las medidas reales del archivo: evitan que el layout salte al cargar.
// `completa`: la foto no tiene la proporción de la tarjeta y se muestra entera
// (sin recortar) para no cortar el texto que trae impreso.
export interface Foto {
  src: string
  alt: string
  ancho: number
  alto: number
  completa?: boolean
}

export interface EnlaceNav {
  label: string
  href: string // '#seccion' para anclas de la página de inicio, '/ruta' para páginas
}

export const navegacion: EnlaceNav[] = [
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Sucursales', href: '#sucursales' },
  { label: 'Contacto', href: '#contacto' },
  { label: 'Aviso de privacidad', href: '/privacidad' },
  { label: 'Términos', href: '/terminos' },
]

export const banner = {
  texto: 'Versión de revisión.',
  detalle: 'Los datos resaltados en amarillo están pendientes de confirmar con Kalcos.',
}

export const hero = {
  eyebrow: 'Zapatería en Hermosillo, Sonora',
  titulo: (sucursales: number) => `Calzado para toda la familia, en ${sucursales} sucursales de Hermosillo`,
  texto:
    'Zapatos, botas, tenis y calzado escolar para dama, caballero y niños. Visita la sucursal que te quede más cerca o escríbenos para preguntar por modelos y tallas.',
  ctaWhatsApp: 'Escríbenos por WhatsApp',
  ctaLlamar: 'Llamar a la matriz',
  ctaSucursales: 'Ver sucursales',
  mensajeWhatsApp: 'Hola, vi su sitio web y quiero información sobre un modelo.',
  imagen: {
    src: fotoTienda,
    alt: 'Fachada de una tienda Kalcos Zapatería con aparadores llenos de zapatillas, botas y tenis',
    ancho: 928,
    alto: 1152,
  } satisfies Foto,
}

export const datosRapidos = {
  sucursales: 'Sucursales en Hermosillo',
  anios: 'Años atendiendo a Hermosillo',
  horario: 'Horario de atención',
}

export interface Categoria {
  id: string
  nombre: string
  descripcion: string
  destacado?: boolean
  foto: Foto
}

export const catalogo = {
  eyebrow: 'Catálogo',
  titulo: 'Lo que encuentras en Kalcos',
  descripcion:
    'Una muestra de nuestras líneas. Los modelos, tallas y existencias cambian por sucursal: pregunta antes de ir.',
  marcasTitulo: 'Marcas que manejamos',
  categorias: [
    {
      id: 'dama',
      nombre: 'Dama',
      descripcion: 'Zapatillas, flats, sandalias y botines para diario o para salir.',
      foto: { src: fotoDama, alt: 'Zapatillas rojas de charol con moño y tacón bajo', ancho: 720, alto: 900 },
    },
    {
      id: 'caballero',
      nombre: 'Caballero',
      descripcion: 'Zapato de vestir, casual y de trabajo.',
      foto: { src: fotoCaballero, alt: 'Par de mocasines negros de piel', ancho: 720, alto: 900 },
    },
    {
      id: 'ninos',
      nombre: 'Niños y escolar',
      descripcion: 'Zapato escolar, tenis y sandalias para los más chicos.',
      foto: { src: fotoEscolar, alt: 'Zapato escolar negro de niña con hebilla, junto a una calceta blanca', ancho: 720, alto: 900 },
    },
    {
      id: 'botas',
      nombre: 'Botas',
      descripcion: 'Vaqueras, de trabajo y de moda.',
      foto: { src: fotoBotas, alt: 'Botas vaqueras negras con bordado gris', ancho: 720, alto: 900 },
    },
    {
      id: 'tenis',
      nombre: 'Tenis',
      descripcion: 'Deportivos y casuales para toda la familia.',
      foto: { src: fotoTenis, alt: 'Tenis deportivos, uno blanco y uno negro', ancho: 720, alto: 900 },
    },
    {
      id: 'remate',
      nombre: 'Remate',
      descripcion: 'Modelos de temporada a precio especial. Pregunta en tu sucursal más cercana.',
      destacado: true,
      foto: {
        src: fotoRemate,
        alt: 'Bota de trabajo café de piel con suela blanca',
        ancho: 800,
        alto: 800,
        completa: true,
      },
    },
  ] satisfies Categoria[],
  cta: 'Preguntar por un modelo',
}

export const sucursalesSeccion = {
  eyebrow: 'Sucursales',
  titulo: 'Hay un Kalcos cerca de ti',
  descripcion: 'Toca “Cómo llegar” para abrir la ruta en Google Maps, o llama directo a la tienda.',
  comoLlegar: 'Cómo llegar',
  llamar: 'Llamar',
}

export const contactoSeccion = {
  eyebrow: 'Contacto',
  titulo: 'Datos de la empresa',
  descripcion: 'Información fiscal y canales oficiales de atención de Kalcos Zapatería.',
  legalTitulo: 'Información legal',
  canalesTitulo: 'Canales de atención',
}

export const footer = {
  desarrollador: 'GansiSolutions',
  desarrolladorUrl: 'https://gansisolutions.com/',
}

export const cookiesBanner = {
  titulo: 'Cookies',
  texto: 'Usamos cookies de analítica solo si las aceptas, para saber qué secciones se visitan y mejorar el sitio.',
  enlace: 'Ver política de cookies',
  aceptar: 'Aceptar',
  rechazar: 'Rechazar',
  preferencias: 'Preferencias de cookies',
}

export interface CookieUsada {
  nombre: string
  proveedor: string
  finalidad: string
  duracion: string
}

// Inventario de cookies y almacenamiento del sitio. Al agregar analítica, añade aquí cada cookie
// que instale (nombre, proveedor, finalidad y duración) para que la política quede al día.
export const cookiesUsadas: { necesarias: CookieUsada[]; analitica: CookieUsada[] } = {
  necesarias: [
    {
      nombre: 'cookieConsent',
      proveedor: 'Kalcos (este sitio)',
      finalidad: 'Recordar si aceptaste o rechazaste las cookies de analítica. Se guarda en el almacenamiento local de tu navegador.',
      duracion: 'Hasta que la borres o cambies tu elección',
    },
  ],
  analitica: [],
}
