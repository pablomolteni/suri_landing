// Founders, in the order the cards appear. Shared by /nosotros (App.jsx) and the Organization
// structured data (scripts/seo.js). bio is a list of paragraphs; leave it or linkedin empty to hide them.

export const FOUNDING_YEAR = '2025'

export const founders = [
  {
    name: 'Fede Tozzi',
    role: 'Fundador',
    bio: [
      'Desarrolló y acompañó negocios desde una mirada estratégica, combinando experiencia emprendedora, consultoría y gestión. Es fundador y director de MADIBA y advisor de empresas, ayudándolas a definir estrategias de crecimiento, profesionalizar su gestión comercial y desarrollar nuevos negocios.',
      'Hoy integra esa experiencia en SURI, impulsando la adopción de inteligencia artificial y automatización para transformar procesos, mejorar la eficiencia y ayudar a las empresas a escalar de manera sostenible.',
    ],
    linkedin: 'https://www.linkedin.com/in/fedetozzi/',
    // Other company the founder leads: its name is linked wherever it appears in the bio
    org: { name: 'MADIBA', url: 'https://madiba.me' },
  },
  {
    name: 'Pablo Molteni',
    role: 'Fundador',
    bio: [
      'Lideró proyectos y operaciones en corporaciones, startups y el sector público, con implementaciones para empresas como Walmart y AB InBev en Latinoamérica.',
      'Hoy une esa experiencia en gestión y tecnología para que las pymes adopten IA de forma concreta y sostenible. Ingeniero industrial con MBA.',
    ],
    linkedin: 'https://www.linkedin.com/in/pablomolteni',
  },
]
