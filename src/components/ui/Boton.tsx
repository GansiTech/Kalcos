import type { AnchorHTMLAttributes, ReactNode } from 'react'

// Botones del sitio: el primario es la acción principal (WhatsApp), el secundario todo lo demás
const variantes = {
  primario: 'bg-accent text-white hover:bg-accent-dark',
  secundario: 'border-2 border-ink text-ink hover:bg-ink hover:text-base-950',
  claro: 'border border-base-700 bg-base-800 text-ink hover:border-accent',
}

interface BotonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variante?: keyof typeof variantes
  children: ReactNode
}

export default function Boton({ variante = 'primario', className = '', children, ...props }: BotonProps) {
  return (
    <a
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-colors ${variantes[variante]} ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}
