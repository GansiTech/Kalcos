import { empresa } from '../../data/empresa'
import { hero } from '../../data/contenido'
import { whatsappHref } from '../../lib/enlaces'
import BrandIcon from '../ui/BrandIcon'

// Botón flotante en todas las rutas. Sin número oficial no se muestra: un botón sin destino confunde.
export default function WhatsAppFlotante() {
  if (!empresa.whatsapp) return null
  return (
    <a
      href={whatsappHref(empresa.whatsapp, hero.mensajeWhatsApp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-ink/20 transition-transform hover:scale-105"
    >
      <BrandIcon name="whatsapp" className="h-7 w-7" />
    </a>
  )
}
