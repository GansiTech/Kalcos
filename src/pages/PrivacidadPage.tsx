import { Link } from 'react-router-dom'
import { empresa } from '../data/empresa'
import { mailHref, telHref } from '../lib/enlaces'
import { useSeo } from '../hooks/useSeo'
import DocumentoLegal, { Apartado, Lista } from '../components/ui/DocumentoLegal'
import { Dato } from '../components/ui/Pendiente'

const linkClass = 'font-medium text-accent-dark underline underline-offset-4'

function CorreoPrivacidad() {
  return (
    <Dato valor={empresa.correoPrivacidad} campo="correo de privacidad (ARCO)">
      {empresa.correoPrivacidad && (
        <a href={mailHref(empresa.correoPrivacidad)} className={linkClass}>
          {empresa.correoPrivacidad}
        </a>
      )}
    </Dato>
  )
}

// Aviso de privacidad integral (LFPDPPP). Texto base: lo debe validar el área legal de Kalcos.
export default function PrivacidadPage() {
  useSeo('/privacidad')

  return (
    <DocumentoLegal titulo="Aviso de privacidad integral">
      <Apartado titulo="1. Responsable y domicilio">
        <p>
          <Dato valor={empresa.razonSocial} campo="razón social" />, que opera comercialmente como{' '}
          <strong>{empresa.nombreComercial}</strong> (en adelante, “Kalcos”), con domicilio en{' '}
          <Dato valor={empresa.domicilioFiscal} campo="domicilio fiscal" />, es responsable del tratamiento de tus datos
          personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, su
          reglamento y demás normativa aplicable.
        </p>
        <p>
          Para cualquier asunto relacionado con este aviso puedes escribir a <CorreoPrivacidad /> o llamar al{' '}
          <a href={telHref(empresa.telefonoPrincipal)} className={linkClass}>
            {empresa.telefonoPrincipal}
          </a>
          .
        </p>
      </Apartado>

      <Apartado titulo="2. Datos personales que recabamos">
        <p>Según cómo te comuniques con nosotros, podemos recabar:</p>
        <Lista>
          <li>
            <strong>Identificación y contacto:</strong> nombre, número de teléfono, correo electrónico y ciudad.
          </li>
          <li>
            <strong>Mensajes por WhatsApp, Messenger e Instagram:</strong> número telefónico o identificador de la cuenta,
            nombre y foto de perfil, el contenido de los mensajes que nos envías (texto, imágenes, audios o documentos),
            así como la fecha y hora de la conversación.
          </li>
          <li>
            <strong>Interés de compra:</strong> productos, tallas, sucursal de preferencia, pedidos o apartados, y
            solicitudes de cambio o devolución.
          </li>
          <li>
            <strong>Candidatos a vacantes:</strong> nombre, datos de contacto, edad, escolaridad, experiencia laboral,
            referencias, disponibilidad de horario, pretensiones económicas y la información que incluyas en tu solicitud
            o currículum.
          </li>
        </Lista>
        <p>
          No te pedimos datos personales sensibles ni datos bancarios por mensajería. Te pedimos no compartirlos por
          estos medios; si un currículum los incluye, solo se usarán para evaluar tu solicitud.
        </p>
        <p>
          Este sitio web no tiene formularios ni cuentas de usuario: solo recabamos datos cuando tú nos contactas por
          teléfono, mensajería, correo o en sucursal.
        </p>
      </Apartado>

      <Apartado titulo="3. Finalidades del tratamiento">
        <p>
          <strong>Finalidades primarias</strong>, necesarias para atenderte:
        </p>
        <Lista>
          <li>Responder tus preguntas sobre productos, tallas, precios, existencias, sucursales y horarios.</li>
          <li>Gestionar apartados, pedidos, cambios, devoluciones y aclaraciones.</li>
          <li>Darte seguimiento y canalizarte con el personal de la sucursal que corresponda.</li>
          <li>Llevar a cabo el proceso de reclutamiento y selección cuando te postulas a una vacante.</li>
          <li>Cumplir obligaciones legales, fiscales y requerimientos de autoridades.</li>
        </Lista>
        <p>
          <strong>Finalidades secundarias</strong>, que no son necesarias para atenderte:
        </p>
        <Lista>
          <li>Enviarte promociones, novedades y avisos de remates.</li>
          <li>Pedirte tu opinión sobre nuestra atención mediante encuestas.</li>
          <li>Elaborar estadísticas para mejorar nuestros productos y servicio.</li>
        </Lista>
        <p>
          Si no quieres que usemos tus datos para las finalidades secundarias, escríbelo en la misma conversación (por
          ejemplo, “no quiero promociones”) o envía un correo a <CorreoPrivacidad />. Negarte no afecta la atención que
          recibes.
        </p>
      </Apartado>

      <Apartado titulo="4. Uso de un asistente automatizado">
        <p>
          Para responder más rápido, Kalcos utiliza un <strong>asistente automatizado</strong>, que incluye herramientas de
          inteligencia artificial, para atender mensajes en WhatsApp, Messenger e Instagram y para hacer preguntas iniciales
          a los candidatos a vacantes.
        </p>
        <Lista>
          <li>El asistente responde con base en la información que Kalcos le proporciona y puede cometer errores.</li>
          <li>
            Las decisiones importantes, como la confirmación de un cambio o devolución o la contratación de un candidato,
            las toma personal de Kalcos, no el asistente.
          </li>
          <li>
            <strong>Tienes derecho a pedir atención de una persona en cualquier momento.</strong> Basta con escribir, por
            ejemplo, “quiero hablar con una persona”, o llamar a la sucursal.
          </li>
        </Lista>
      </Apartado>

      <Apartado titulo="5. Transferencias y proveedores tecnológicos">
        <p>
          Para operar nuestros canales de atención nos apoyamos en proveedores tecnológicos que tratan datos por cuenta de
          Kalcos y bajo sus instrucciones:
        </p>
        <Lista>
          <li>Las plataformas de mensajería de Meta (WhatsApp, Messenger e Instagram).</li>
          <li>Una plataforma de automatización de procesos que conecta esos canales con nuestros sistemas.</li>
          <li>Un proveedor de servicios de inteligencia artificial que genera las respuestas del asistente.</li>
          <li>Servicios de alojamiento web y almacenamiento en la nube.</li>
        </Lista>
        <p>
          Algunos de estos proveedores pueden estar fuera de México. Están obligados a proteger tus datos y a no usarlos
          para fines propios. Kalcos no vende ni renta tus datos personales. Solo los compartiremos con autoridades cuando
          una ley o un mandato judicial lo exija, supuestos en los que no se requiere tu consentimiento.
        </p>
      </Apartado>

      <Apartado titulo="6. Derechos ARCO">
        <p>
          Tienes derecho a <strong>acceder</strong> a tus datos, <strong>rectificarlos</strong> si son inexactos,{' '}
          <strong>cancelarlos</strong> cuando consideres que no se requieren para las finalidades señaladas, y{' '}
          <strong>oponerte</strong> a su uso para fines específicos.
        </p>
        <p>
          Para ejercerlos, envía una solicitud a <CorreoPrivacidad /> con:
        </p>
        <Lista>
          <li>Tu nombre y un medio para comunicarte la respuesta.</li>
          <li>Una copia de tu identificación oficial o, en su caso, la de tu representante y el documento que lo acredite.</li>
          <li>La descripción clara del derecho que quieres ejercer y de los datos involucrados.</li>
          <li>Para rectificaciones, el dato correcto y, si aplica, el documento que lo respalde.</li>
        </Lista>
        <p>
          Te responderemos en un plazo máximo de 20 días hábiles a partir de que recibamos tu solicitud completa. Si
          procede, la haremos efectiva dentro de los 15 días hábiles siguientes a la respuesta.
        </p>
      </Apartado>

      <Apartado titulo="7. Revocación del consentimiento y límites al uso">
        <p>
          Puedes revocar en cualquier momento el consentimiento que nos diste para tratar tus datos, salvo cuando la ley
          nos obligue a conservarlos. Envía tu solicitud a <CorreoPrivacidad /> con los mismos requisitos del apartado
          anterior. Ten en cuenta que, si revocas el consentimiento para finalidades primarias, es posible que no podamos
          seguir atendiéndote por esos canales.
        </p>
        <p>
          Para dejar de recibir promociones también puedes inscribirte en el Registro Público para Evitar Publicidad de la
          Procuraduría Federal del Consumidor (Profeco).
        </p>
      </Apartado>

      <Apartado titulo="8. Cookies y tecnologías similares">
        <p>
          Este sitio no utiliza cookies de analítica, publicidad ni rastreo. Solo se cargan los recursos necesarios para
          mostrar la página, como las tipografías.
        </p>
      </Apartado>

      <Apartado titulo="9. Cambios a este aviso">
        <p>
          Podemos actualizar este aviso por cambios en la ley, en nuestros servicios o en nuestros proveedores. La versión
          vigente siempre estará publicada en{' '}
          <Link to="/privacidad" className={linkClass}>
            {empresa.dominio}/privacidad
          </Link>{' '}
          con su fecha de última actualización.
        </p>
      </Apartado>
    </DocumentoLegal>
  )
}
