import { MODO_MAQUETA } from '../../data/empresa'
import { banner } from '../../data/contenido'

export default function BannerMaqueta() {
  if (!MODO_MAQUETA) return null
  return (
    <div className="bg-pendiente px-4 py-1.5 text-center text-xs text-ink sm:text-sm">
      <strong className="font-semibold">{banner.texto}</strong> {banner.detalle}
    </div>
  )
}
