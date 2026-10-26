import type { ReactNode } from 'react'
import { MODO_MAQUETA } from '../../data/empresa'

// Marca en amarillo un dato que Kalcos todavía no entrega. Fuera de modo maqueta no se muestra.
export function Pendiente({ campo }: { campo: string }) {
  if (!MODO_MAQUETA) return null
  return (
    <mark className="rounded bg-pendiente px-1.5 py-0.5 text-[0.9em] font-medium text-ink [box-decoration-break:clone]">
      Pendiente: {campo}
    </mark>
  )
}

// Muestra el valor si existe; si es null, el aviso de pendiente.
export function Dato({ valor, campo, children }: { valor: string | null; campo: string; children?: ReactNode }) {
  if (valor === null) return <Pendiente campo={campo} />
  return <>{children ?? valor}</>
}
