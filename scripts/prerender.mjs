// Genera un HTML estático por ruta (dist/index.html, dist/privacidad.html, ...)
// para que cada URL responda con su propio contenido al entrar directo o al recargar.
// Meta revisa https://kalcos.com.mx/privacidad sin ejecutar necesariamente JavaScript.
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const raiz = process.cwd()
const dist = path.join(raiz, 'dist')
const distSsr = path.join(raiz, 'dist-ssr')

const { render, rutas, headPara, schemaOrganizacion } = await import(pathToFileURL(path.join(distSsr, 'entry-server.js')).href)

const plantilla = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
const jsonLd = `<script type="application/ld+json">${JSON.stringify(schemaOrganizacion())}</script>`

for (const ruta of rutas) {
  const html = plantilla
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, headPara(ruta))
    // Los datos estructurados solo van en la página de inicio
    .replace('<!--schema-->', ruta === '/' ? jsonLd : '')
    .replace('<div id="root"></div>', `<div id="root">${render(ruta)}</div>`)

  const archivo = ruta === '/' ? 'index.html' : `${ruta.slice(1)}.html`
  await fs.writeFile(path.join(dist, archivo), html)
  console.log(`  prerender  ${ruta.padEnd(12)} → dist/${archivo}`)
}

// Vite no copia archivos ocultos de public/: el .htaccess se copia aquí
await fs.copyFile(path.join(raiz, 'public', '.htaccess'), path.join(dist, '.htaccess'))

await fs.rm(distSsr, { recursive: true, force: true })
