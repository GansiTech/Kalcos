import { empresa, MODO_MAQUETA, sucursales } from './empresa'

export interface SeoRuta {
  titulo: string
  descripcion: string
  noindex?: boolean
}

// Las páginas legales se indexan a propósito: el aviso de privacidad debe ser fácil de encontrar
// para Meta y el brief pide SEO >= 90 en Lighthouse en todas las rutas.
export const seoRutas: Record<string, SeoRuta> = {
  '/': {
    titulo: `${empresa.nombreComercial} | Calzado para toda la familia en Hermosillo`,
    descripcion:
      `Zapatería en Hermosillo, Sonora, con ${sucursales.length} sucursales. Calzado para dama, caballero y niños, botas, tenis, escolar y remate.`,
  },
  '/privacidad': {
    titulo: `Aviso de privacidad | ${empresa.nombreComercial}`,
    descripcion: `Aviso de privacidad integral de ${empresa.nombreComercial}: datos que recabamos, finalidades, derechos ARCO y uso de asistentes automatizados.`,
  },
  '/terminos': {
    titulo: `Términos y condiciones | ${empresa.nombreComercial}`,
    descripcion: `Términos y condiciones de uso del sitio de ${empresa.nombreComercial}: precios, disponibilidad, cambios y devoluciones.`,
  },
  '/404': {
    titulo: `Página no encontrada | ${empresa.nombreComercial}`,
    descripcion: 'La página que buscas no existe.',
    noindex: true,
  },
}

export const seoPara = (ruta: string) => seoRutas[ruta] ?? seoRutas['/404']

// Mientras el sitio esté en modo maqueta, ninguna página se indexa
export const robotsPara = (ruta: string) =>
  MODO_MAQUETA || seoPara(ruta).noindex ? 'noindex, follow' : 'index, follow'

export const urlCanonica = (ruta: string) => (ruta === '/' ? `${empresa.sitioUrl}/` : `${empresa.sitioUrl}${ruta}`)
