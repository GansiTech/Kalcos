import { useEffect } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppFlotante from './components/layout/WhatsAppFlotante'
import HomePage from './pages/HomePage'
import PrivacidadPage from './pages/PrivacidadPage'
import TerminosPage from './pages/TerminosPage'
import NotFoundPage from './pages/NotFoundPage'

// Al cambiar de ruta: ir a la sección del hash (p. ej. /#sucursales) o al inicio de la página
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

function Layout() {
  return (
    <div className="min-h-screen bg-base-950 font-sans text-ink antialiased">
      <a
        href="#contenido"
        className="sr-only z-50 rounded-lg bg-ink px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <ScrollManager />
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppFlotante />
    </div>
  )
}

// El router (Browser o Static) lo pone quien monta la app: main.tsx en el navegador, entry-server.tsx al prerenderizar
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      {/* LazyMotion + `m` carga solo las animaciones que usa el sitio y aligera el bundle */}
      <LazyMotion features={domAnimation} strict>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacidad" element={<PrivacidadPage />} />
          <Route path="/terminos" element={<TerminosPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      </LazyMotion>
    </MotionConfig>
  )
}
