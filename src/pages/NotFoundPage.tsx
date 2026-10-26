import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'

export default function NotFoundPage() {
  useSeo('/404')

  return (
    <main id="contenido" className="flex min-h-[70vh] items-center bg-base-950 pb-20 pt-36">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-accent-dark">Error 404</p>
        <h1 className="mt-3 font-display text-4xl font-black text-ink">Esta página no existe</h1>
        <p className="mt-4 text-lg text-ink-muted">Puede que el enlace esté mal escrito o que la página se haya movido.</p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
