import type { ReactNode } from 'react'
import { empresa, MODO_MAQUETA } from '../../data/empresa'

const fecha = new Intl.DateTimeFormat('es-MX', { dateStyle: 'long', timeZone: 'UTC' })

// Sin animaciones ni ventanas encima: Meta revisa este contenido y debe leerse completo al cargar
export default function DocumentoLegal({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <main id="contenido" className="bg-base-950 pb-24 pt-36 sm:pt-44">
      <article className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">{titulo}</h1>
        <p className="mt-4 text-ink-muted">
          Última actualización: <time dateTime={empresa.legalActualizado}>{fecha.format(new Date(empresa.legalActualizado))}</time>
        </p>
        {MODO_MAQUETA && (
          <p role="note" className="mt-6 rounded-xl border border-ink/20 bg-pendiente px-5 py-4 font-medium text-ink">
            Texto base, debe revisarlo el área legal de Kalcos.
          </p>
        )}
        <div className="mt-10 space-y-10 leading-relaxed text-ink-soft">{children}</div>
      </article>
    </main>
  )
}

export function Apartado({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl font-extrabold text-ink">{titulo}</h2>
      {children}
    </section>
  )
}

export function Lista({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-6 marker:text-accent">{children}</ul>
}
