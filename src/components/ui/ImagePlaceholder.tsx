import { ImageIcon } from 'lucide-react'

interface ImagePlaceholderProps {
  label: string
  aspect?: string
  className?: string
}

// Espacio reservado con proporción fija mientras llegan las fotos reales,
// para que el layout no se mueva cuando se reemplace por la <img> final.
export default function ImagePlaceholder({ label, aspect = 'aspect-[4/3]', className = '' }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Espacio para imagen: ${label}`}
      className={`${aspect} ${className} relative flex items-center justify-center overflow-hidden rounded-2xl border border-dashed border-base-700 bg-base-900`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60 [background-image:repeating-linear-gradient(135deg,transparent_0_14px,rgb(216_204_184/0.45)_14px_15px)]"
      />
      <div className="relative flex max-w-[80%] flex-col items-center gap-2 text-center text-sm text-ink-muted">
        <ImageIcon className="h-6 w-6" aria-hidden="true" />
        <span>{label}</span>
      </div>
    </div>
  )
}
