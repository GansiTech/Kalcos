import { Link } from 'react-router-dom'
import { empresa } from '../../data/empresa'
import { footer } from '../../data/contenido'
import { mailHref, telHref } from '../../lib/enlaces'
import { Dato } from '../ui/Pendiente'
import Logo from '../ui/Logo'

const anioActual = new Date().getFullYear()

const tituloClass = 'font-display text-sm font-bold uppercase tracking-[0.16em] text-accent-light'
const linkClass = 'underline-offset-4 transition-colors hover:text-white hover:underline'

// Meta pide razón social, domicilio y teléfono visibles en el pie de todas las páginas
export default function Footer() {
  return (
    <footer className="bg-ink text-base-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo className="text-white" />
          <dl className="mt-5 space-y-2 text-sm leading-relaxed">
            <div>
              <dt className="inline font-semibold text-white">Razón social: </dt>
              <dd className="inline">
                <Dato valor={empresa.razonSocial} campo="razón social" />
              </dd>
            </div>
            <div>
              <dt className="inline font-semibold text-white">RFC: </dt>
              <dd className="inline">
                <Dato valor={empresa.rfc} campo="RFC" />
              </dd>
            </div>
            <div>
              <dt className="inline font-semibold text-white">Domicilio fiscal: </dt>
              <dd className="inline">
                <Dato valor={empresa.domicilioFiscal} campo="domicilio fiscal" />
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className={tituloClass}>Contacto</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              Tel.{' '}
              <a href={telHref(empresa.telefonoPrincipal)} className={linkClass}>
                {empresa.telefonoPrincipal}
              </a>
            </li>
            <li>
              <Dato valor={empresa.correoContacto} campo="correo de contacto">
                {empresa.correoContacto && (
                  <a href={mailHref(empresa.correoContacto)} className={linkClass}>
                    {empresa.correoContacto}
                  </a>
                )}
              </Dato>
            </li>
            <li>
              {empresa.ciudad}, {empresa.estado}, {empresa.pais}
            </li>
          </ul>
        </div>

        <div>
          <h2 className={tituloClass}>Legal</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/privacidad" className={linkClass}>
                Aviso de privacidad
              </Link>
            </li>
            <li>
              <Link to="/terminos" className={linkClass}>
                Términos y condiciones
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-base-700 sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {anioActual} {empresa.nombreComercial}. {empresa.dominio}
          </p>
          <p>
            Sitio desarrollado por{' '}
            <a href={footer.desarrolladorUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {footer.desarrollador}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
