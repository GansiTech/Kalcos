// Arma enlaces a partir de los datos base de empresa.ts, para no escribir
// teléfonos ni URLs a mano en los componentes.

const soloDigitos = (texto: string) => texto.replace(/\D/g, '')

export const telHref = (telefono: string) => `tel:+52${soloDigitos(telefono)}`

export const whatsappHref = (numero: string, mensaje?: string) =>
  `https://wa.me/52${soloDigitos(numero)}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ''}`

export const mapsHref = (lat: number, lng: number) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

export const instagramHref = (usuario: string) => `https://www.instagram.com/${usuario.replace(/^@/, '')}/`

export const mailHref = (correo: string) => `mailto:${correo}`

// La bolsa de trabajo puede ser un correo o un teléfono
export const contactoHref = (valor: string) => (valor.includes('@') ? mailHref(valor) : telHref(valor))
