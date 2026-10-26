import { useEffect } from 'react'
import { robotsPara, seoPara, urlCanonica } from '../data/seo'

const ponerMeta = (selector: string, atributo: string, valor: string) => {
  document.head.querySelector(selector)?.setAttribute(atributo, valor)
}

// Al navegar dentro del sitio actualiza título y metas. En la carga inicial ya vienen
// en el HTML prerenderizado (scripts/prerender.mjs), así que esto solo cubre la navegación.
export function useSeo(ruta: string) {
  useEffect(() => {
    const seo = seoPara(ruta)
    document.title = seo.titulo
    ponerMeta('meta[name="description"]', 'content', seo.descripcion)
    ponerMeta('meta[name="robots"]', 'content', robotsPara(ruta))
    ponerMeta('meta[property="og:title"]', 'content', seo.titulo)
    ponerMeta('meta[property="og:description"]', 'content', seo.descripcion)
    ponerMeta('meta[property="og:url"]', 'content', urlCanonica(ruta))
    ponerMeta('link[rel="canonical"]', 'href', urlCanonica(ruta))
  }, [ruta])
}
