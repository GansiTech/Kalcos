// Consentimiento de cookies guardado en localStorage. Toda analítica que se agregue
// debe revisar `analiticaPermitida()` antes de enviar cualquier evento.

const CLAVE = 'cookieConsent'
const EVENTO_CAMBIO = 'cookie-consent-change'
export const EVENTO_ABRIR = 'cookie-preferences-open'

export type Consentimiento = 'true' | 'false' | null

// localStorage puede fallar en modo privado o con el almacenamiento bloqueado
export function leerConsentimiento(): Consentimiento {
  try {
    const valor = localStorage.getItem(CLAVE)
    return valor === 'true' || valor === 'false' ? valor : null
  } catch {
    return null
  }
}

export function guardarConsentimiento(acepta: boolean) {
  try {
    localStorage.setItem(CLAVE, String(acepta))
  } catch {
    // Sin almacenamiento la elección dura solo esta visita
  }
  window.dispatchEvent(new Event(EVENTO_CAMBIO))
}

export const analiticaPermitida = () => leerConsentimiento() === 'true'

// Para reabrir el banner desde cualquier lugar (pie de página, política de cookies)
export const abrirPreferencias = () => window.dispatchEvent(new Event(EVENTO_ABRIR))

export function suscribirConsentimiento(alCambiar: () => void) {
  window.addEventListener(EVENTO_CAMBIO, alCambiar)
  window.addEventListener('storage', alCambiar)
  return () => {
    window.removeEventListener(EVENTO_CAMBIO, alCambiar)
    window.removeEventListener('storage', alCambiar)
  }
}
