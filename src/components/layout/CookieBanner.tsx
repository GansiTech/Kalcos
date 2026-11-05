import { useEffect, useState, useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { cookiesBanner } from '../../data/contenido'
import { EVENTO_ABRIR, guardarConsentimiento, leerConsentimiento, suscribirConsentimiento } from '../../lib/consentimiento'

const botonClass = 'inline-flex min-h-11 flex-1 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors'

// En el servidor no hay localStorage: se pinta oculto para que la hidratación coincida
const SIN_LEER = 'sin-leer'

export default function CookieBanner() {
  const consentimiento = useSyncExternalStore(suscribirConsentimiento, leerConsentimiento, () => SIN_LEER)
  const [reabierto, setReabierto] = useState(false)

  useEffect(() => {
    const abrir = () => setReabierto(true)
    window.addEventListener(EVENTO_ABRIR, abrir)
    return () => window.removeEventListener(EVENTO_ABRIR, abrir)
  }, [])

  if (consentimiento === SIN_LEER || (consentimiento !== null && !reabierto)) return null

  const elegir = (acepta: boolean) => {
    guardarConsentimiento(acepta)
    setReabierto(false)
  }

  // No es modal ni bloquea la página: el aviso de privacidad y el pie deben poder leerse sin cerrarlo
  return (
    <section
      aria-label={cookiesBanner.titulo}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-base-700 bg-base-950 p-5 shadow-xl shadow-ink/15 sm:left-5 sm:right-auto sm:mx-0"
    >
      <h2 className="font-display text-lg font-extrabold text-ink">{cookiesBanner.titulo}</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        {cookiesBanner.texto}{' '}
        <Link to="/cookies" className="font-medium text-accent-dark underline underline-offset-4">
          {cookiesBanner.enlace}
        </Link>
      </p>
      {/* Aceptar y Rechazar con el mismo peso visual: rechazar debe ser igual de fácil */}
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => elegir(false)} className={`${botonClass} border-2 border-ink text-ink hover:bg-ink hover:text-base-950`}>
          {cookiesBanner.rechazar}
        </button>
        <button type="button" onClick={() => elegir(true)} className={`${botonClass} border-2 border-accent bg-accent text-white hover:bg-accent-dark`}>
          {cookiesBanner.aceptar}
        </button>
      </div>
    </section>
  )
}
