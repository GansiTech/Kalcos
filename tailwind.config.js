/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Sitio claro: blancos y grises neutros, como el fondo y las líneas del logotipo
        base: {
          950: '#FFFFFF', // fondo principal
          900: '#F3F3F3', // fondo de secciones alternas
          800: '#FAFAFA', // cards, paneles
          700: '#E0E0E0', // bordes y divisores
        },
        ink: {
          DEFAULT: '#1A1A1A', // tinta casi negra
          muted: '#555555', // texto secundario (AA sobre base-900)
          soft: '#333333',
        },
        accent: {
          DEFAULT: '#CF0016', // rojo del logotipo: CTAs (blanco encima cumple AA)
          light: '#FF9AA2', // acento claro, para texto sobre fondo de tinta
          dark: '#A30012', // hover del CTA y texto de acento sobre blanco
        },
        pendiente: '#FDE68A', // resaltado de datos que faltan (solo en modo maqueta)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Archivo', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
