import { MapPin } from 'lucide-react'
import { sucursales } from '../../data/empresa'
import { hero } from '../../data/contenido'
import Boton from '../ui/Boton'
import CtaWhatsApp from '../ui/CtaWhatsApp'
import ImagePlaceholder from '../ui/ImagePlaceholder'

// El hero no usa Reveal: es lo primero que se ve y debe pintarse de inmediato (LCP)
export default function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-titulo" className="bg-base-950 pb-16 pt-36 sm:pb-24 sm:pt-44">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.18em] text-accent-dark">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1
            id="hero-titulo"
            className="mt-5 text-balance font-display text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-6xl xl:text-7xl"
          >
            {hero.titulo(sucursales.length)}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{hero.texto}</p>
          <div className="mt-9 flex flex-wrap items-start gap-3">
            <CtaWhatsApp />
            <Boton variante="secundario" href="#sucursales">
              {hero.ctaSucursales}
            </Boton>
          </div>
        </div>

        <ImagePlaceholder label={hero.imagen} aspect="aspect-[4/3] lg:aspect-[4/5]" />
      </div>
    </section>
  )
}
