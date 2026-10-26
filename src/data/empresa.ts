// FUENTE ÚNICA DE DATOS DE KALCOS
// Todo lo que el sitio dice de la empresa sale de aquí. Para completar el sitio
// solo hay que reemplazar los `null` por el dato real; no hace falta tocar componentes.
//
// Importante para Meta: razón social, RFC y domicilio fiscal deben coincidir
// letra por letra con la Constancia de Situación Fiscal del SAT que se sube
// en la verificación del negocio.

// En `true` se muestra el banner de maqueta y los datos faltantes en amarillo.
// En `false` se ocultan, y `npm run build` falla si falta algún dato obligatorio.
export const MODO_MAQUETA: boolean = true

export interface Sucursal {
  id: string
  nombre: string
  direccion: string
  colonia: string
  cp: string
  telefono: string
  lat: number
  lng: number
  // Ej.: 'Lun a sáb 10:00–20:00 · Dom 10:00–15:00'
  horario: string | null
}

export interface Empresa {
  nombreComercial: string
  giro: string
  ciudad: string
  estado: string
  pais: string
  dominio: string
  sitioUrl: string
  telefonoPrincipal: string
  facebook: string

  // Pendientes
  razonSocial: string | null
  rfc: string | null
  domicilioFiscal: string | null
  correoContacto: string | null // ej. contacto@kalcos.com.mx
  correoPrivacidad: string | null // ej. privacidad@kalcos.com.mx (derechos ARCO)
  whatsapp: string | null // 10 dígitos, ej. '6621234567'
  instagram: string | null // usuario sin @, ej. 'kalcoszapateria'
  bolsaTrabajo: string | null // correo o teléfono de Recursos Humanos
  horarioGeneral: string | null // horario que se muestra en "Datos rápidos"
  anioFundacion: number | null // año en que abrió la primera tienda; los años se calculan solos
  politicaDevoluciones: string | null // texto de la política de cambios y devoluciones
  logo: string | null // ruta en /public, ej. '/logo-kalcos.svg'. Mientras sea null se usa "KALCOS."
  marcas: string[] | null // marcas y líneas de calzado que manejan

  // Valor de <meta name="facebook-domain-verification">. También puede venir de
  // VITE_FACEBOOK_DOMAIN_VERIFICATION en .env (tiene prioridad la variable).
  metaVerificacionDominio: string | null

  // Fecha de la última actualización del aviso de privacidad y los términos (AAAA-MM-DD)
  legalActualizado: string
}

export const empresa: Empresa = {
  nombreComercial: 'Kalcos Zapatería',
  giro: 'Comercio al por menor de calzado',
  ciudad: 'Hermosillo',
  estado: 'Sonora',
  pais: 'México',
  dominio: 'kalcos.com.mx',
  sitioUrl: 'https://kalcos.com.mx',
  telefonoPrincipal: '662 312 3233',
  facebook: 'https://www.facebook.com/kalcossolidaridadremate/',

  razonSocial: null,
  rfc: null,
  domicilioFiscal: null,
  correoContacto: null,
  correoPrivacidad: null,
  whatsapp: null,
  instagram: null,
  bolsaTrabajo: null,
  horarioGeneral: null,
  anioFundacion: null,
  politicaDevoluciones: null,
  logo: null,
  marcas: null,

  metaVerificacionDominio: null,

  legalActualizado: '2026-10-26',
}

// Fuente: Google Maps y DENUE (INEGI)
export const sucursales: Sucursal[] = [
  {
    id: 'matriz',
    nombre: 'Matriz',
    direccion: 'Blvd. Solidaridad y Av. Yécora',
    colonia: 'Col. Miguel Hidalgo',
    cp: '83117',
    telefono: '662 312 3233',
    lat: 29.13257,
    lng: -110.99293,
    horario: null,
  },
  {
    id: 'solidaridad-remate',
    nombre: 'Solidaridad Remate',
    direccion: 'Blvd. Solidaridad esquina',
    colonia: 'Col. Miguel Hidalgo',
    cp: '83117',
    telefono: '662 312 3233',
    lat: 29.13209,
    lng: -110.99278,
    horario: null,
  },
  {
    id: 'progreso',
    nombre: 'Progreso',
    direccion: 'Blvd. Progreso 182',
    colonia: 'Solidaridad IV',
    cp: '83116',
    telefono: '662 311 5223',
    lat: 29.14252,
    lng: -111.01556,
    horario: null,
  },
  {
    id: 'karol-ley',
    nombre: 'Karol Ley',
    direccion: 'Blvd. Solidaridad',
    colonia: 'Col. Sahuaro',
    cp: '83170',
    telefono: '662 690 7891',
    lat: 29.0961,
    lng: -110.99325,
    horario: null,
  },
  {
    id: 'morelia',
    nombre: 'Morelia',
    direccion: 'Av. Morelia',
    colonia: 'Centro',
    cp: '83000',
    telefono: '662 213 1475',
    lat: 29.07937,
    lng: -110.95292,
    horario: null,
  },
  {
    id: 'madrigal',
    nombre: 'Madrigal',
    direccion: 'Av. Morelia 2',
    colonia: 'Centro',
    cp: '83000',
    telefono: '662 158 8817',
    lat: 29.07934,
    lng: -110.95099,
    horario: null,
  },
  {
    id: 'monterrey',
    nombre: 'Monterrey',
    direccion: 'Av. Monterrey 15',
    colonia: 'Centro',
    cp: '83000',
    telefono: '662 158 8834',
    lat: 29.07873,
    lng: -110.95182,
    horario: null,
  },
  {
    id: 'altares',
    nombre: 'Altares',
    direccion: 'Av. Xólotl 273',
    colonia: 'Valle del Márquez',
    cp: '83294',
    telefono: '662 310 5008',
    lat: 29.02338,
    lng: -110.94281,
    horario: null,
  },
  {
    id: 'sunmall',
    nombre: 'Sunmall',
    direccion: 'Blvd. Juan Bautista de Escalante',
    colonia: 'Zona Industrial',
    cp: '83117',
    telefono: '662 145 2694',
    lat: 29.14613,
    lng: -110.99361,
    horario: null,
  },
]

// Datos sin los cuales el sitio no puede salir a producción (los pide Meta o la ley).
// Los demás pendientes son opcionales: si siguen en null, la interfaz simplemente no los muestra.
const obligatorios: { campo: keyof Empresa; etiqueta: string }[] = [
  { campo: 'razonSocial', etiqueta: 'razón social' },
  { campo: 'rfc', etiqueta: 'RFC' },
  { campo: 'domicilioFiscal', etiqueta: 'domicilio fiscal' },
  { campo: 'correoContacto', etiqueta: 'correo de contacto' },
  { campo: 'correoPrivacidad', etiqueta: 'correo de privacidad (ARCO)' },
  { campo: 'whatsapp', etiqueta: 'WhatsApp de atención' },
  { campo: 'politicaDevoluciones', etiqueta: 'política de cambios y devoluciones' },
]

export function datosFaltantes(): string[] {
  return obligatorios.filter(({ campo }) => empresa[campo] === null).map(({ etiqueta }) => etiqueta)
}
