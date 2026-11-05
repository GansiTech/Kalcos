import { empresa } from '../../data/empresa'

// Mientras no exista el archivo del logo oficial se imita con texto: "kalcos" blanco sobre la cápsula roja
export default function Logo({ className = '' }: { className?: string }) {
  if (empresa.logo) {
    return <img src={empresa.logo} alt={empresa.nombreComercial} width={140} height={32} className={`h-8 w-auto ${className}`} />
  }
  return (
    <span
      className={`inline-flex items-center rounded-full bg-accent px-3.5 pb-1 pt-0.5 font-display text-2xl font-black lowercase tracking-tight text-white ${className}`}
    >
      kalcos
    </span>
  )
}
