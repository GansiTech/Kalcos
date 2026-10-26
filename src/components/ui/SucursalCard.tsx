import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import type { Sucursal } from '../../data/empresa'
import { mapsHref, telHref } from '../../lib/enlaces'
import { Dato } from './Pendiente'

interface SucursalCardProps {
  sucursal: Sucursal
  textos: { comoLlegar: string; llamar: string }
}

const accionClass =
  'inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors'

export default function SucursalCard({ sucursal, textos }: SucursalCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-base-700 bg-base-800 p-6">
      <h3 className="font-display text-xl font-extrabold text-ink">{sucursal.nombre}</h3>
      <ul className="mt-4 flex-1 space-y-3 text-[0.95rem] text-ink-soft">
        <li className="flex gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark" aria-hidden="true" />
          <span>
            {sucursal.direccion}, {sucursal.colonia}, C.P. {sucursal.cp}
          </span>
        </li>
        <li className="flex gap-3">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark" aria-hidden="true" />
          <span>{sucursal.telefono}</span>
        </li>
        <li className="flex gap-3">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark" aria-hidden="true" />
          <span>
            <Dato valor={sucursal.horario} campo="horario" />
          </span>
        </li>
      </ul>
      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={mapsHref(sucursal.lat, sucursal.lng)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${accionClass} bg-ink text-base-950 hover:bg-ink-soft`}
        >
          <Navigation className="h-4 w-4" aria-hidden="true" />
          {textos.comoLlegar}
          <span className="sr-only"> a la sucursal {sucursal.nombre} (abre Google Maps)</span>
        </a>
        <a href={telHref(sucursal.telefono)} className={`${accionClass} border border-base-700 text-ink hover:border-accent`}>
          <Phone className="h-4 w-4" aria-hidden="true" />
          {textos.llamar}
          <span className="sr-only"> a la sucursal {sucursal.nombre}</span>
        </a>
      </div>
    </article>
  )
}
