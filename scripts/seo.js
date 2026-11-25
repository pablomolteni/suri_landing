// Per-page SEO metadata, injected into the prerendered HTML by scripts/prerender.js
import { homeFaqs, automatizacionFaqs, capacitacionFaqs, diagnosticoFaqs, plainAnswer } from '../src/content/faqs.js'
import { founders, FOUNDING_YEAR } from '../src/content/team.js'

export const SITE_URL = 'https://www.suri.lat'

const people = founders.map(f => ({
  '@type': 'Person',
  name: f.name,
  jobTitle: f.role,
  worksFor: { '@id': `${SITE_URL}/#organization` },
  ...(f.linkedin && { sameAs: [f.linkedin] }),
  ...(f.org && { affiliation: { '@type': 'Organization', name: f.org.name, url: f.org.url } }),
}))

const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'SURI',
  alternateName: 'SURI IA',
  description: 'SURI es una consultora de inteligencia artificial y automatización de procesos con base en Buenos Aires, Argentina. Ayuda a pymes y empresas de todo el país y Latinoamérica a automatizar tareas repetitivas, capacitar a sus equipos en IA y medir su madurez digital.',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.png`,
  email: 'info@suri.lat',
  foundingDate: FOUNDING_YEAR,
  foundingLocation: { '@type': 'Place', name: 'Buenos Aires, Argentina' },
  founder: people,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'info@suri.lat',
    availableLanguage: ['es'],
    areaServed: 'AR',
  },
  knowsAbout: [
    'Inteligencia artificial',
    'Automatización de procesos',
    'IA generativa',
    'Capacitación en inteligencia artificial',
    'Madurez digital',
    'Transformación digital',
    'n8n',
    'Make',
    'Zapier',
    'ChatGPT',
    'Claude',
    'Gemini',
    'Grok',
    'Google Workspace',
  ],
  sameAs: ['https://www.linkedin.com/company/suri-ia/', 'https://diagnostico.suri.lat'],
  address: { '@type': 'PostalAddress', addressLocality: 'Buenos Aires', addressCountry: 'AR' },
  areaServed: [
    { '@type': 'Country', name: 'Argentina' },
    { '@type': 'Place', name: 'Latinoamérica' },
  ],
}

const provider = { '@id': `${SITE_URL}/#organization` }

const faqPage = faqs => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: plainAnswer(f.a) },
  })),
})

const breadcrumb = (name, path) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` },
  ],
})

const services = {
  automatizacion: {
    '@type': 'Service',
    name: 'Automatización de procesos con IA',
    serviceType: 'Automatización de procesos',
    description: 'Diseñamos, construimos e implementamos flujos automáticos con IA, o acompañamos a tu equipo para que los desarrolle. Incluye mantenimiento continuo.',
    url: `${SITE_URL}/automatizacion-de-procesos`,
    provider,
  },
  capacitacion: {
    '@type': 'Service',
    name: 'Capacitación en inteligencia artificial para empresas',
    serviceType: 'Capacitación en inteligencia artificial',
    description: 'Capacitación en IA para equipos no técnicos, 80% práctica y con ejemplos del propio trabajo. Curso general y cursos a medida por área.',
    url: `${SITE_URL}/capacitacion-ia`,
    provider,
  },
  diagnostico: {
    '@type': 'Service',
    name: 'Diagnóstico de madurez digital',
    serviceType: 'Consultoría de transformación digital',
    description: 'Cuestionario por rol y entrevistas en profundidad que evalúan 6 dimensiones de tu organización, con informe ejecutivo y roadmap en 3 horizontes.',
    url: `${SITE_URL}/diagnostico`,
    provider,
  },
}

export const pages = [
  {
    path: '/',
    file: 'index.html',
    updated: '2026-11-24',
    title: 'Automatización e IA para pymes | SURI',
    description: 'Consultora de IA y automatización en Buenos Aires. Automatizamos procesos, capacitamos equipos en IA y diagnosticamos la madurez digital de tu empresa.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          name: 'SURI',
          url: `${SITE_URL}/`,
          inLanguage: 'es-AR',
          publisher: provider,
        },
        services.automatizacion,
        services.capacitacion,
        services.diagnostico,
        faqPage(homeFaqs),
      ],
    },
  },
  {
    path: '/nosotros',
    file: 'nosotros.html',
    updated: '2026-11-24',
    title: 'Quiénes somos | SURI, consultora de IA en Buenos Aires',
    description: 'Conocé quiénes empezamos SURI, la consultora de inteligencia artificial y automatización de procesos con base en Buenos Aires.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        {
          '@type': 'AboutPage',
          name: 'Quiénes somos',
          url: `${SITE_URL}/nosotros`,
          inLanguage: 'es-AR',
          about: provider,
        },
        breadcrumb('Nosotros', '/nosotros'),
      ],
    },
  },
  {
    path: '/automatizacion-de-procesos',
    file: 'automatizacion-de-procesos.html',
    updated: '2026-11-24',
    title: 'Automatización de procesos con IA para pymes | SURI Buenos Aires',
    description: 'Automatizamos tareas repetitivas de tu empresa con flujos inteligentes e IA. Diseño, implementación y mantenimiento, desde Buenos Aires para todo el país.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [organization, services.automatizacion, faqPage(automatizacionFaqs), breadcrumb('Automatización de procesos', '/automatizacion-de-procesos')],
    },
  },
  {
    path: '/capacitacion-ia',
    file: 'capacitacion-ia.html',
    updated: '2026-11-04',
    title: 'Capacitación en inteligencia artificial para empresas | SURI',
    description: 'Capacitación en IA para equipos, 80% práctica y con ejemplos de tu propio trabajo. Cursos generales y a medida por área, en Buenos Aires y en todo el país.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [organization, services.capacitacion, faqPage(capacitacionFaqs), breadcrumb('Capacitación en IA', '/capacitacion-ia')],
    },
  },
  {
    path: '/diagnostico',
    file: 'diagnostico.html',
    updated: '2026-11-04',
    title: 'Diagnóstico de madurez digital e IA para pymes | SURI',
    description: 'Medí la madurez digital y la adopción de IA de tu empresa. Cuestionario por rol, entrevistas y un roadmap priorizado. Más que un autodiagnóstico.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [organization, services.diagnostico, faqPage(diagnosticoFaqs), breadcrumb('Diagnóstico de madurez digital', '/diagnostico')],
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
