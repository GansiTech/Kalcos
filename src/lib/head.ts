import { robotsPara, seoPara, urlCanonica } from '../data/seo'

const escapar = (texto: string) =>
  texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Etiquetas <head> propias de cada ruta, para el HTML prerenderizado
export function headPara(ruta: string) {
  const seo = seoPara(ruta)
  const titulo = escapar(seo.titulo)
  const descripcion = escapar(seo.descripcion)
  const url = urlCanonica(ruta)
  return [
    `<title>${titulo}</title>`,
    `<meta name="description" content="${descripcion}" />`,
    `<meta name="robots" content="${robotsPara(ruta)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${titulo}" />`,
    `<meta property="og:description" content="${descripcion}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:title" content="${titulo}" />`,
    `<meta name="twitter:description" content="${descripcion}" />`,
  ].join('\n    ')
}
