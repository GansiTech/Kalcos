import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { headPara } from './lib/head'
import { schemaOrganizacion } from './lib/schema'

// Rutas que se generan como HTML estático. '/404' produce 404.html para el ErrorDocument del hosting.
export const rutas = ['/', '/privacidad', '/terminos', '/404']

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}

export { headPara, schemaOrganizacion }
