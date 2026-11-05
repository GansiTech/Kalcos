import type { Foto as FotoDatos } from '../../data/contenido'

interface FotoProps {
  foto: FotoDatos
  aspect: string
  // Encuadre del recorte, p. ej. 'object-[50%_30%]' para no cortar el letrero
  encuadre?: string
  // Solo la imagen principal (above the fold) carga de inmediato
  prioridad?: boolean
  className?: string
}

// Foto con proporción fija, la misma que usaba ImagePlaceholder, para que el layout no cambie.
export default function Foto({ foto, aspect, encuadre = 'object-center', prioridad = false, className = '' }: FotoProps) {
  const carga = prioridad ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const }

  return (
    <div className={`${aspect} ${className} relative overflow-hidden rounded-2xl bg-base-900`}>
      {foto.completa && (
        // Fondo desenfocado con la misma foto: rellena las franjas sin cortar el texto impreso en la imagen
        <img
          src={foto.src}
          alt=""
          aria-hidden="true"
          width={foto.ancho}
          height={foto.alto}
          {...carga}
          decoding="async"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-70 blur-2xl"
        />
      )}
      <img
        src={foto.src}
        alt={foto.alt}
        width={foto.ancho}
        height={foto.alto}
        {...carga}
        decoding="async"
        className={`relative h-full w-full ${foto.completa ? 'object-contain' : `object-cover ${encuadre}`}`}
      />
    </div>
  )
}
