import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { datosFaltantes, empresa, MODO_MAQUETA } from './src/data/empresa'

// Reglas que dependen de empresa.ts
function datosKalcos({ validar, verificacionMeta }: { validar: boolean; verificacionMeta: string }): Plugin {
  return {
    name: 'kalcos-datos',
    buildStart() {
      // Fuera de modo maqueta no se publica nada con datos obligatorios vacíos.
      // Solo en el build: en desarrollo se deja trabajar aunque falten datos.
      if (!validar || MODO_MAQUETA) return
      const faltantes = datosFaltantes()
      if (faltantes.length) {
        this.error(
          `MODO_MAQUETA está en false, pero faltan datos obligatorios en src/data/empresa.ts: ${faltantes.join(', ')}.`,
        )
      }
    },
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace('%FACEBOOK_DOMAIN_VERIFICATION%', verificacionMeta),
    },
  }
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const verificacionMeta = env.VITE_FACEBOOK_DOMAIN_VERIFICATION || empresa.metaVerificacionDominio || 'PENDIENTE'

  return {
    plugins: [react(), datosKalcos({ validar: command === 'build', verificacionMeta })],
  }
})
