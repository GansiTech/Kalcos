import Reveal from './Reveal'

interface SectionTitleProps {
  eyebrow: string
  heading: string
  description?: string
  id?: string
}

export default function SectionTitle({ eyebrow, heading, description, id }: SectionTitleProps) {
  return (
    <Reveal className="max-w-2xl">
      <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-accent-dark">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
        {heading}
      </h2>
      {description && <p className="mt-4 text-lg leading-relaxed text-ink-muted">{description}</p>}
    </Reveal>
  )
}
