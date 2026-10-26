import { empresa, MODO_MAQUETA, sucursales } from '../../data/empresa'
import { datosRapidos } from '../../data/contenido'
import { Dato } from '../ui/Pendiente'
import Reveal from '../ui/Reveal'

// Se calcula una vez al cargar: los años de operación cambian solo una vez al año
const anios = empresa.anioFundacion ? `${new Date().getFullYear() - empresa.anioFundacion}` : null

export default function DatosRapidos() {
  const datos = [
    { etiqueta: datosRapidos.sucursales, valor: String(sucursales.length), campo: 'sucursales' },
    { etiqueta: datosRapidos.anios, valor: anios, campo: 'años de operación' },
    { etiqueta: datosRapidos.horario, valor: empresa.horarioGeneral, campo: 'horario' },
  ].filter((d) => d.valor !== null || MODO_MAQUETA)

  return (
    <section aria-label="Datos rápidos" className="border-y border-ink bg-ink text-base-950">
      <dl className="mx-auto flex max-w-7xl flex-col divide-y divide-white/15 px-4 sm:flex-row sm:divide-x sm:divide-y-0 sm:px-6">
        {datos.map((dato, i) => (
          <Reveal key={dato.etiqueta} delay={i * 0.1} className="flex flex-1 flex-col-reverse gap-1 py-7 sm:px-8 sm:first:pl-0">
            <dt className="text-sm text-base-700">{dato.etiqueta}</dt>
            <dd className={dato.valor ? 'font-display text-3xl font-extrabold text-white sm:text-4xl' : 'py-2'}>
              <Dato valor={dato.valor} campo={dato.campo} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
