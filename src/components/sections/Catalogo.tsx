import { ArrowRight } from 'lucide-react'
import { empresa, MODO_MAQUETA } from '../../data/empresa'
import { catalogo } from '../../data/contenido'
import { telHref, whatsappHref } from '../../lib/enlaces'
import ImagePlaceholder from '../ui/ImagePlaceholder'
import { Pendiente } from '../ui/Pendiente'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

// Sin carrito ni precios: cada categoría lleva a preguntar por WhatsApp (o por teléfono mientras no haya número)
const preguntarHref = (categoria: string) =>
  empresa.whatsapp
    ? whatsappHref(empresa.whatsapp, `Hola, quiero información sobre calzado de ${categoria.toLowerCase()}.`)
    : telHref(empresa.telefonoPrincipal)

export default function Catalogo() {
  return (
    <section id="catalogo" aria-labelledby="catalogo-titulo" className="bg-base-900 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle id="catalogo-titulo" eyebrow={catalogo.eyebrow} heading={catalogo.titulo} description={catalogo.descripcion} />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {catalogo.categorias.map((cat, i) => (
            <Reveal
              as="li"
              key={cat.id}
              delay={(i % 3) * 0.08}
              className={`flex flex-col rounded-2xl border bg-base-800 p-4 ${cat.destacado ? 'border-accent ring-1 ring-accent' : 'border-base-700'}`}
            >
              <ImagePlaceholder label={`Foto de calzado: ${cat.nombre}`} aspect="aspect-[4/3]" />
              <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                <h3 className="flex items-center gap-2 font-display text-xl font-extrabold text-ink">
                  {cat.nombre}
                  {cat.destacado && (
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                      Ofertas
                    </span>
                  )}
                </h3>
                <p className="mt-2 flex-1 text-ink-muted">{cat.descripcion}</p>
                <a
                  href={preguntarHref(cat.nombre)}
                  {...(empresa.whatsapp && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="mt-4 inline-flex min-h-11 items-center gap-1.5 self-start font-semibold text-accent-dark underline-offset-4 hover:underline"
                >
                  {catalogo.cta}
                  <span className="sr-only"> de {cat.nombre}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          ))}
        </ul>

        {empresa.marcas ? (
          <div className="mt-12">
            <h3 className="font-display text-lg font-bold text-ink">{catalogo.marcasTitulo}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {empresa.marcas.map((marca) => (
                <li key={marca} className="rounded-full border border-base-700 bg-base-800 px-4 py-1.5 text-sm font-medium text-ink">
                  {marca}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          MODO_MAQUETA && (
            <p className="mt-10">
              <Pendiente campo="marcas y líneas de calzado que manejan" />
            </p>
          )
        )}
      </div>
    </section>
  )
}
