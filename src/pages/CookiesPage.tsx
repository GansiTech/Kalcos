import { Link } from 'react-router-dom'
import { empresa } from '../data/empresa'
import { cookiesBanner, cookiesUsadas, type CookieUsada } from '../data/contenido'
import { abrirPreferencias } from '../lib/consentimiento'
import { mailHref } from '../lib/enlaces'
import { useSeo } from '../hooks/useSeo'
import DocumentoLegal, { Apartado, Lista } from '../components/ui/DocumentoLegal'
import { Dato } from '../components/ui/Pendiente'

const linkClass = 'font-medium text-accent-dark underline underline-offset-4'

// Una tarjeta por cookie en lugar de tabla: en celular una tabla de 4 columnas no cabe
function ListaCookies({ cookies }: { cookies: CookieUsada[] }) {
  return (
    <ul className="space-y-3">
      {cookies.map((cookie) => (
        <li key={cookie.nombre} className="rounded-2xl border border-base-700 bg-base-800 p-5">
          <p className="font-mono text-sm font-semibold text-ink">{cookie.nombre}</p>
          <dl className="mt-3 grid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-[7rem_1fr]">
            <dt className="font-semibold text-ink-muted">Proveedor</dt>
            <dd>{cookie.proveedor}</dd>
            <dt className="font-semibold text-ink-muted">Para qué sirve</dt>
            <dd>{cookie.finalidad}</dd>
            <dt className="font-semibold text-ink-muted">Duración</dt>
            <dd>{cookie.duracion}</dd>
          </dl>
        </li>
      ))}
    </ul>
  )
}

export default function CookiesPage() {
  useSeo('/cookies')

  return (
    <DocumentoLegal titulo="Política de cookies">
      <Apartado titulo="1. Qué son las cookies">
        <p>
          Las cookies son pequeños archivos que un sitio web guarda en tu navegador para recordar información sobre tu
          visita. Tecnologías parecidas, como el almacenamiento local del navegador, funcionan de forma similar; en esta
          política las llamamos a todas “cookies”.
        </p>
      </Apartado>

      <Apartado titulo="2. Cookies necesarias">
        <p>Permiten que el sitio funcione y recuerde tu elección sobre cookies. No requieren tu consentimiento.</p>
        <ListaCookies cookies={cookiesUsadas.necesarias} />
      </Apartado>

      <Apartado titulo="3. Cookies de analítica">
        <p>
          Sirven para saber cuántas personas visitan el sitio y qué secciones consultan, con datos agregados, para mejorar
          la información que publicamos. <strong>Solo se activan si las aceptas</strong> en el aviso de cookies.
        </p>
        {cookiesUsadas.analitica.length ? (
          <ListaCookies cookies={cookiesUsadas.analitica} />
        ) : (
          <p>
            Por ahora este sitio no instala cookies de analítica, aunque las aceptes. Si más adelante agregamos alguna, la
            listaremos aquí antes de activarla.
          </p>
        )}
        <p>No usamos cookies de publicidad ni compartimos datos de navegación con anunciantes.</p>
      </Apartado>

      <Apartado titulo="4. Servicios de terceros">
        <Lista>
          <li>
            Las tipografías del sitio se cargan desde Google Fonts. Para entregarlas, Google recibe la dirección IP de tu
            navegador; este servicio no instala cookies.
          </li>
          <li>
            Los enlaces a Google Maps, WhatsApp, Facebook e Instagram te llevan a sitios de terceros, que usan sus propias
            cookies según sus políticas. Kalcos no controla esas cookies.
          </li>
        </Lista>
      </Apartado>

      <Apartado titulo="5. Cómo cambiar tu elección">
        <p>Puedes aceptar o rechazar las cookies de analítica cuando quieras:</p>
        <button
          type="button"
          onClick={abrirPreferencias}
          className="inline-flex min-h-11 items-center rounded-xl border-2 border-ink px-5 py-2.5 font-semibold text-ink transition-colors hover:bg-ink hover:text-base-950"
        >
          {cookiesBanner.preferencias}
        </button>
        <p>
          También puedes borrar o bloquear las cookies desde la configuración de tu navegador. Si las bloqueas todas, el
          sitio te volverá a preguntar en cada visita.
        </p>
      </Apartado>

      <Apartado titulo="6. Más información">
        <p>
          Cómo tratamos tus datos personales se explica en el{' '}
          <Link to="/privacidad" className={linkClass}>
            aviso de privacidad
          </Link>
          . Si tienes dudas sobre esta política, escribe a{' '}
          <Dato valor={empresa.correoPrivacidad} campo="correo de privacidad (ARCO)">
            {empresa.correoPrivacidad && (
              <a href={mailHref(empresa.correoPrivacidad)} className={linkClass}>
                {empresa.correoPrivacidad}
              </a>
            )}
          </Dato>
          . Podemos actualizar esta política; la fecha de la última versión aparece al inicio de la página.
        </p>
      </Apartado>
    </DocumentoLegal>
  )
}
