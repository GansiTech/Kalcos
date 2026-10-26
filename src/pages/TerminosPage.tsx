import { Link } from 'react-router-dom'
import { empresa } from '../data/empresa'
import { mailHref, telHref } from '../lib/enlaces'
import { useSeo } from '../hooks/useSeo'
import DocumentoLegal, { Apartado, Lista } from '../components/ui/DocumentoLegal'
import { Dato } from '../components/ui/Pendiente'

const linkClass = 'font-medium text-accent-dark underline underline-offset-4'

// Términos base. Lo debe validar el área legal de Kalcos.
export default function TerminosPage() {
  useSeo('/terminos')

  return (
    <DocumentoLegal titulo="Términos y condiciones">
      <Apartado titulo="1. Uso del sitio">
        <p>
          Este sitio, {empresa.dominio}, pertenece a <Dato valor={empresa.razonSocial} campo="razón social" /> (
          {empresa.nombreComercial}). Al usarlo aceptas estos términos. Es un sitio informativo: muestra nuestras
          categorías de calzado, sucursales y canales de contacto. No hay ventas, pagos ni registro de usuarios en línea.
        </p>
      </Apartado>

      <Apartado titulo="2. Productos, precios y disponibilidad">
        <Lista>
          <li>Las categorías y fotografías del sitio son ilustrativas y no representan todo nuestro inventario.</li>
          <li>
            Los precios, modelos, tallas y existencias varían por sucursal y pueden cambiar sin previo aviso. Confírmalos en
            la sucursal o por nuestros canales de atención antes de tu visita.
          </li>
          <li>Las promociones y remates aplican en las sucursales, fechas y condiciones que se indiquen en cada caso.</li>
        </Lista>
      </Apartado>

      <Apartado titulo="3. Cambios y devoluciones">
        <div className="whitespace-pre-line">
          <Dato valor={empresa.politicaDevoluciones} campo="política de cambios y devoluciones" />
        </div>
        <p>
          Lo anterior, sin perjuicio de los derechos que te otorga la Ley Federal de Protección al Consumidor.
        </p>
      </Apartado>

      <Apartado titulo="4. Atención por mensajería">
        <p>
          Nuestros canales de WhatsApp, Messenger e Instagram pueden ser atendidos por un asistente automatizado. Puedes
          pedir atención de una persona en cualquier momento. Cómo tratamos tus datos en esos canales se explica en el{' '}
          <Link to="/privacidad" className={linkClass}>
            aviso de privacidad
          </Link>
          .
        </p>
      </Apartado>

      <Apartado titulo="5. Propiedad intelectual">
        <p>
          La marca {empresa.nombreComercial}, el logotipo, los textos, el diseño y las imágenes de este sitio pertenecen a
          Kalcos o a sus titulares y están protegidos por la ley. No puedes copiarlos ni usarlos con fines comerciales sin
          autorización por escrito. Las marcas de calzado que se mencionan pertenecen a sus respectivos dueños.
        </p>
      </Apartado>

      <Apartado titulo="6. Enlaces a terceros">
        <p>
          El sitio incluye enlaces a servicios de terceros, como Google Maps, WhatsApp, Facebook e Instagram. Kalcos no
          controla esos servicios; su uso se rige por sus propios términos y avisos de privacidad.
        </p>
      </Apartado>

      <Apartado titulo="7. Ley aplicable y jurisdicción">
        <p>
          Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se
          someten a los tribunales competentes de {empresa.ciudad}, {empresa.estado}, sin perjuicio de tu derecho a acudir
          a la Procuraduría Federal del Consumidor.
        </p>
      </Apartado>

      <Apartado titulo="8. Contacto">
        <p>
          Teléfono:{' '}
          <a href={telHref(empresa.telefonoPrincipal)} className={linkClass}>
            {empresa.telefonoPrincipal}
          </a>
          <br />
          Correo:{' '}
          <Dato valor={empresa.correoContacto} campo="correo de contacto">
            {empresa.correoContacto && (
              <a href={mailHref(empresa.correoContacto)} className={linkClass}>
                {empresa.correoContacto}
              </a>
            )}
          </Dato>
          <br />
          Domicilio: <Dato valor={empresa.domicilioFiscal} campo="domicilio fiscal" />
        </p>
      </Apartado>
    </DocumentoLegal>
  )
}
