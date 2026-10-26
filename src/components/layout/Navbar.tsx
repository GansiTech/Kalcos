import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navegacion, type EnlaceNav } from '../../data/contenido'
import Logo from '../ui/Logo'
import BannerMaqueta from './BannerMaqueta'

const anclas = navegacion.filter((e) => e.href.startsWith('#')).map((e) => e.href.slice(1))

// Marca en el menú la sección que está a la vista (solo en la página de inicio)
function useSeccionActiva(activo: boolean) {
  const [seccion, setSeccion] = useState<string | null>(null)

  useEffect(() => {
    if (!activo) return
    const elementos = anclas.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) setSeccion(entrada.target.id)
        }
      },
      // Cuenta como "visible" la sección que cruza la franja central de la pantalla
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elementos.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [activo])

  return activo ? seccion : null
}

const linkClass =
  'flex min-h-11 items-center rounded-lg px-3 text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-accent-dark aria-[current]:text-accent-dark aria-[current]:underline aria-[current]:decoration-2 aria-[current]:underline-offset-8'

function EnlaceMenu({ enlace, enInicio, seccion, onClick }: { enlace: EnlaceNav; enInicio: boolean; seccion: string | null; onClick?: () => void }) {
  const { pathname } = useLocation()

  if (enlace.href.startsWith('#')) {
    const actual = seccion === enlace.href.slice(1) ? 'location' : undefined
    // En inicio basta el ancla; desde otras páginas se vuelve a "/" con el hash
    return enInicio ? (
      <a href={enlace.href} className={linkClass} aria-current={actual} onClick={onClick}>
        {enlace.label}
      </a>
    ) : (
      <Link to={`/${enlace.href}`} className={linkClass} onClick={onClick}>
        {enlace.label}
      </Link>
    )
  }

  return (
    <Link to={enlace.href} className={linkClass} aria-current={pathname === enlace.href ? 'page' : undefined} onClick={onClick}>
      {enlace.label}
    </Link>
  )
}

export default function Navbar() {
  const { pathname } = useLocation()
  const enInicio = pathname === '/'
  const seccion = useSeccionActiva(enInicio)
  const [abierto, setAbierto] = useState(false)

  // Cerrar el menú móvil con Escape (al elegir un enlace se cierra desde su onClick)
  useEffect(() => {
    if (!abierto) return
    const alPresionar = (e: KeyboardEvent) => e.key === 'Escape' && setAbierto(false)
    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  }, [abierto])

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-base-700/70 bg-base-950/95 backdrop-blur">
      <BannerMaqueta />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex min-h-11 items-center text-ink" aria-label="Kalcos Zapatería, ir al inicio">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navegacion.map((enlace) => (
              <li key={enlace.href}>
                <EnlaceMenu enlace={enlace} enInicio={enInicio} seccion={seccion} />
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-ink lg:hidden"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setAbierto((v) => !v)}
        >
          {abierto ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <nav id="menu-movil" aria-label="Principal móvil" hidden={!abierto} className="border-t border-base-700 bg-base-950 lg:hidden">
        <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
          {navegacion.map((enlace) => (
            <li key={enlace.href}>
              <EnlaceMenu enlace={enlace} enInicio={enInicio} seccion={seccion} onClick={() => setAbierto(false)} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
