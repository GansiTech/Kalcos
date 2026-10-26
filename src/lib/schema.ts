import { empresa, sucursales } from '../data/empresa'
import { instagramHref } from './enlaces'

// JSON-LD de schema.org: la organización como ShoeStore y cada sucursal como LocalBusiness.
// Se genera desde empresa.ts para que siempre coincida con lo que muestra el sitio.

const telefonoIntl = (telefono: string) => `+52 ${telefono}`

export function schemaOrganizacion() {
  const idOrg = `${empresa.sitioUrl}/#organizacion`
  const sameAs = [empresa.facebook, empresa.instagram && instagramHref(empresa.instagram)].filter(Boolean)

  const organizacion = {
    '@type': 'ShoeStore',
    '@id': idOrg,
    name: empresa.nombreComercial,
    ...(empresa.razonSocial && { legalName: empresa.razonSocial }),
    ...(empresa.rfc && { taxID: empresa.rfc }),
    url: `${empresa.sitioUrl}/`,
    telephone: telefonoIntl(empresa.telefonoPrincipal),
    ...(empresa.correoContacto && { email: empresa.correoContacto }),
    ...(empresa.logo && { logo: `${empresa.sitioUrl}${empresa.logo}` }),
    image: `${empresa.sitioUrl}/og-image.png`,
    address: {
      '@type': 'PostalAddress',
      ...(empresa.domicilioFiscal && { streetAddress: empresa.domicilioFiscal }),
      addressLocality: empresa.ciudad,
      addressRegion: empresa.estado,
      addressCountry: 'MX',
    },
    areaServed: { '@type': 'City', name: empresa.ciudad },
    sameAs,
  }

  const tiendas = sucursales.map((s) => ({
    '@type': 'LocalBusiness',
    '@id': `${empresa.sitioUrl}/#sucursal-${s.id}`,
    name: `${empresa.nombreComercial} ${s.nombre}`,
    parentOrganization: { '@id': idOrg },
    telephone: telefonoIntl(s.telefono),
    url: `${empresa.sitioUrl}/#sucursales`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${s.direccion}, ${s.colonia}`,
      postalCode: s.cp,
      addressLocality: empresa.ciudad,
      addressRegion: empresa.estado,
      addressCountry: 'MX',
    },
    geo: { '@type': 'GeoCoordinates', latitude: s.lat, longitude: s.lng },
  }))

  return { '@context': 'https://schema.org', '@graph': [organizacion, ...tiendas] }
}
