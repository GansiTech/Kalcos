// Textos de la interfaz. Los datos de la empresa (teléfonos, direcciones,
// correos, razón social) viven en empresa.ts, no aquí.

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
  imagen: 'Foto de fachada o interior de una tienda Kalcos',
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
}

export const catalogo = {
  eyebrow: 'Catálogo',
  titulo: 'Lo que encuentras en Kalcos',
  descripcion:
    'Una muestra de nuestras líneas. Los modelos, tallas y existencias cambian por sucursal: pregunta antes de ir.',
  marcasTitulo: 'Marcas que manejamos',
  categorias: [
    { id: 'dama', nombre: 'Dama', descripcion: 'Zapatillas, flats, sandalias y botines para diario o para salir.' },
    { id: 'caballero', nombre: 'Caballero', descripcion: 'Zapato de vestir, casual y de trabajo.' },
    { id: 'ninos', nombre: 'Niños y escolar', descripcion: 'Zapato escolar, tenis y sandalias para los más chicos.' },
    { id: 'botas', nombre: 'Botas', descripcion: 'Vaqueras, de trabajo y de moda.' },
    { id: 'tenis', nombre: 'Tenis', descripcion: 'Deportivos y casuales para toda la familia.' },
    {
      id: 'remate',
      nombre: 'Remate',
      descripcion: 'Modelos de temporada a precio especial. Pregunta en la sucursal Solidaridad Remate.',
      destacado: true,
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
