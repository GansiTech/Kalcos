import { Phone } from 'lucide-react'
import { empresa } from '../../data/empresa'
import { hero } from '../../data/contenido'
import { telHref, whatsappHref } from '../../lib/enlaces'
import Boton from './Boton'
import BrandIcon from './BrandIcon'
import { Pendiente } from './Pendiente'

// Acción principal del sitio. Si todavía no hay WhatsApp oficial, el botón llama a la matriz
// en lugar de quedar muerto, y en modo maqueta se marca el dato pendiente.
export default function CtaWhatsApp({ mensaje = hero.mensajeWhatsApp }: { mensaje?: string }) {
  if (empresa.whatsapp) {
    return (
      <Boton href={whatsappHref(empresa.whatsapp, mensaje)} target="_blank" rel="noopener noreferrer">
        <BrandIcon name="whatsapp" />
        {hero.ctaWhatsApp}
      </Boton>
    )
  }
  return (
    <span className="inline-flex flex-col items-start gap-1.5">
      <Boton href={telHref(empresa.telefonoPrincipal)}>
        <Phone className="h-5 w-5" aria-hidden="true" />
        {hero.ctaLlamar}
      </Boton>
      <Pendiente campo="número oficial de WhatsApp" />
    </span>
  )
}
