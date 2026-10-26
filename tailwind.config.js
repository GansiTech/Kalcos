/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Sitio claro: "base" es la escala de papel cálido de la maqueta
        base: {
          950: '#F5EFE4', // fondo principal (papel)
          900: '#ECE4D6', // fondo de secciones alternas
          800: '#FBF8F2', // cards, paneles
          700: '#D8CCB8', // bordes y divisores
        },
        ink: {
          DEFAULT: '#1B1814', // tinta casi negra
          muted: '#544C42', // texto secundario (AA sobre papel)
          soft: '#3A342D',
        },
        accent: {
          DEFAULT: '#B8420F', // naranja quemado: CTAs
          light: '#F2C9A8', // acento claro, para texto sobre fondo de tinta
          dark: '#8F310A', // hover del CTA y texto de acento sobre papel
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
