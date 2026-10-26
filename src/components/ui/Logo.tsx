import { empresa } from '../../data/empresa'

// Mientras no exista el logo oficial se usa el texto "KALCOS." de la maqueta
export default function Logo({ className = '' }: { className?: string }) {
  if (empresa.logo) {
    return <img src={empresa.logo} alt={empresa.nombreComercial} width={140} height={32} className={`h-8 w-auto ${className}`} />
  }
  return (
    <span className={`font-display text-2xl font-black tracking-tight ${className}`}>
      KALCOS<span className="text-accent">.</span>
    </span>
  )
}
