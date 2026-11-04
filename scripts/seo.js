// Per-page SEO metadata, injected into the prerendered HTML by scripts/prerender.js
export const SITE_URL = 'https://www.suri.lat'

const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'SURI',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  email: 'info@suri.lat',
  sameAs: ['https://www.linkedin.com/company/suri-ia/'],
}

const provider = { '@id': `${SITE_URL}/#organization` }

export const pages = [
  {
    path: '/',
    file: 'index.html',
    title: 'SURI | Automatización de procesos e IA para empresas',
    description: 'Automatizamos procesos y aplicamos inteligencia artificial para que tu empresa escale sin sumar complejidad. Diagnóstico, implementación y capacitación en IA.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          name: 'SURI',
          url: `${SITE_URL}/`,
          inLanguage: 'es',
          publisher: provider,
        },
        {
          '@type': 'Service',
          name: 'Capacitación en IA para equipos',
          serviceType: 'Capacitación en inteligencia artificial',
          description: 'Entrenamos a tu equipo con un enfoque 80% práctico, usando ejemplos de su propio día a día.',
          provider,
        },
        {
          '@type': 'Service',
          name: 'Implementación de automatizaciones',
          serviceType: 'Automatización de procesos',
          description: 'Construimos e implementamos flujos automáticos con IA, o acompañamos a tu equipo para que los desarrolle.',
          provider,
        },
        {
          '@type': 'Service',
          name: 'Diagnóstico de adopción tecnológica',
          serviceType: 'Consultoría de transformación digital',
          description: 'Evaluamos tu operación, medimos la adopción real de IA y automatización e identificamos oportunidades con ROI concreto.',
          url: `${SITE_URL}/diagnostico`,
          provider,
        },
      ],
    },
  },
  {
    path: '/diagnostico',
    file: 'diagnostico.html',
    title: 'Diagnóstico de adopción tecnológica para pymes | SURI',
    description: 'Medí qué tan preparada está tu empresa para la IA y la automatización. Evaluamos 6 dimensiones clave y te entregamos un roadmap priorizado de mejoras.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        {
          '@type': 'Service',
          name: 'Diagnóstico de adopción tecnológica',
          serviceType: 'Consultoría de transformación digital',
          description: 'Cuestionario por rol y entrevistas en profundidad que evalúan 6 dimensiones de tu organización, con informe ejecutivo y roadmap en 3 horizontes.',
          url: `${SITE_URL}/diagnostico`,
          provider,
        },
      ],
    },
  },
  {
    path: '/404',
    file: '404.html',
    title: 'Página no encontrada | SURI',
    description: 'La página que buscás no existe o fue movida.',
    noindex: true,
  },
]
