import { sucursales } from '../../data/empresa'
import { sucursalesSeccion } from '../../data/contenido'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import SucursalCard from '../ui/SucursalCard'

export default function Sucursales() {
  return (
    <section id="sucursales" aria-labelledby="sucursales-titulo" className="bg-base-950 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          id="sucursales-titulo"
          eyebrow={sucursalesSeccion.eyebrow}
          heading={sucursalesSeccion.titulo}
          description={sucursalesSeccion.descripcion}
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sucursales.map((sucursal, i) => (
            <Reveal as="li" key={sucursal.id} delay={(i % 3) * 0.08}>
              <SucursalCard sucursal={sucursal} textos={sucursalesSeccion} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
