import type { ReactNode } from 'react'
import { Briefcase } from 'lucide-react'
import { empresa, MODO_MAQUETA } from '../../data/empresa'
import { contactoSeccion } from '../../data/contenido'
import { contactoHref, instagramHref, mailHref, telHref, whatsappHref } from '../../lib/enlaces'
import BrandIcon from '../ui/BrandIcon'
import { Dato } from '../ui/Pendiente'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

const panelClass = 'h-full rounded-2xl border border-base-700 bg-base-800 p-6 sm:p-8'
const panelTituloClass = 'font-display text-xl font-extrabold text-ink'
const linkClass = 'font-medium text-accent-dark underline-offset-4 hover:underline'

function Fila({ etiqueta, children }: { etiqueta: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-base-700 py-3.5 last:border-0 sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="text-sm font-semibold text-ink-muted">{etiqueta}</dt>
      <dd className="break-words text-ink">{children}</dd>
    </div>
  )
}

export default function Contacto() {
  const externo = { target: '_blank', rel: 'noopener noreferrer' }

  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="bg-base-900 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          id="contacto-titulo"
          eyebrow={contactoSeccion.eyebrow}
          heading={contactoSeccion.titulo}
          description={contactoSeccion.descripcion}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className={panelClass}>
              <h3 className={panelTituloClass}>{contactoSeccion.legalTitulo}</h3>
              <dl className="mt-4">
                <Fila etiqueta="Nombre comercial">{empresa.nombreComercial}</Fila>
                <Fila etiqueta="Razón social">
                  <Dato valor={empresa.razonSocial} campo="razón social" />
                </Fila>
                <Fila etiqueta="RFC">
                  <Dato valor={empresa.rfc} campo="RFC" />
                </Fila>
                <Fila etiqueta="Domicilio fiscal">
                  <Dato valor={empresa.domicilioFiscal} campo="domicilio fiscal" />
                </Fila>
                <Fila etiqueta="Teléfono">
                  <a href={telHref(empresa.telefonoPrincipal)} className={linkClass}>
                    {empresa.telefonoPrincipal}
                  </a>
                </Fila>
                <Fila etiqueta="Correo">
                  <Dato valor={empresa.correoContacto} campo="correo de contacto">
                    {empresa.correoContacto && (
                      <a href={mailHref(empresa.correoContacto)} className={linkClass}>
                        {empresa.correoContacto}
                      </a>
                    )}
                  </Dato>
                </Fila>
                <Fila etiqueta="Sitio web">
                  <a href={`${empresa.sitioUrl}/`} className={linkClass}>
                    {empresa.dominio}
                  </a>
                </Fila>
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className={panelClass}>
              <h3 className={panelTituloClass}>{contactoSeccion.canalesTitulo}</h3>
              <ul className="mt-4 divide-y divide-base-700">
                <li className="flex items-start gap-4 py-4">
                  <BrandIcon name="whatsapp" className="mt-0.5 h-6 w-6 shrink-0 text-ink" />
                  <div>
                    <p className="font-semibold text-ink">WhatsApp</p>
                    <Dato valor={empresa.whatsapp} campo="número oficial de WhatsApp">
                      {empresa.whatsapp && (
                        <a href={whatsappHref(empresa.whatsapp)} {...externo} className={linkClass}>
                          {empresa.whatsapp}
                        </a>
                      )}
                    </Dato>
                  </div>
                </li>
                <li className="flex items-start gap-4 py-4">
                  <BrandIcon name="facebook" className="mt-0.5 h-6 w-6 shrink-0 text-ink" />
                  <div>
                    <p className="font-semibold text-ink">Facebook</p>
                    <a href={empresa.facebook} {...externo} className={linkClass}>
                      Kalcos Solidaridad Remate
                    </a>
                  </div>
                </li>
                {(empresa.instagram || MODO_MAQUETA) && (
                <li className="flex items-start gap-4 py-4">
                  <BrandIcon name="instagram" className="mt-0.5 h-6 w-6 shrink-0 text-ink" />
                  <div>
                    <p className="font-semibold text-ink">Instagram</p>
                    <Dato valor={empresa.instagram} campo="usuario de Instagram">
                      {empresa.instagram && (
                        <a href={instagramHref(empresa.instagram)} {...externo} className={linkClass}>
                          @{empresa.instagram}
                        </a>
                      )}
                    </Dato>
                  </div>
                </li>
                )}
                {(empresa.bolsaTrabajo || MODO_MAQUETA) && (
                <li className="flex items-start gap-4 py-4">
                  <Briefcase className="mt-0.5 h-6 w-6 shrink-0 text-ink" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-ink">Bolsa de trabajo</p>
                    <p className="text-sm text-ink-muted">¿Quieres trabajar en Kalcos? Envía tus datos a Recursos Humanos.</p>
                    <Dato valor={empresa.bolsaTrabajo} campo="contacto de Recursos Humanos">
                      {empresa.bolsaTrabajo && (
                        <a href={contactoHref(empresa.bolsaTrabajo)} className={linkClass}>
                          {empresa.bolsaTrabajo}
                        </a>
                      )}
                    </Dato>
                  </div>
                </li>
                )}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
