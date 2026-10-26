import { useSeo } from '../hooks/useSeo'
import Hero from '../components/sections/Hero'
import DatosRapidos from '../components/sections/DatosRapidos'
import Catalogo from '../components/sections/Catalogo'
import Sucursales from '../components/sections/Sucursales'
import Contacto from '../components/sections/Contacto'

export default function HomePage() {
  useSeo('/')

  return (
    <main id="contenido">
      <Hero />
      <DatosRapidos />
      <Catalogo />
      <Sucursales />
      <Contacto />
    </main>
  )
}
