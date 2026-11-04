import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import logoHColor from './assets/logos/logo-h-color.svg'
import logoHBlanco from './assets/logos/logo-h-blanco.svg'
import { automatizacionFaqs, capacitacionFaqs, diagnosticoFaqs } from './content/faqs.js'

/* ─── Scroll reveal hook ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ─── Scroll to top on route change ─── */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isDiag = location.pathname === '/diagnostico'
  const hasContact = ['/', '/automatizacion-de-procesos', '/capacitacion-ia'].includes(location.pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Servicios', href: isHome ? '#servicios' : '/#servicios' },
    { label: 'Cómo trabajamos', href: isHome ? '#proceso' : '/#proceso' },
    { label: 'Para quién', href: isHome ? '#audiencia' : '/#audiencia' },
    { label: 'Diagnóstico', href: '/diagnostico' },
  ]

  const ctaHref = isDiag ? '#contacto-diagnostico' : hasContact ? '#contacto' : '/#contacto'
  const ctaLabel = isDiag ? 'Solicitar diagnóstico' : 'Hablemos'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm' : 'bg-white border-b border-gray-100'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img src={logoHColor} alt="SURI" className="h-7 w-auto" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors duration-200 ${scrolled ? 'text-gray-600 hover:text-[#0061FC]' : 'text-gray-700 hover:text-[#0061FC]'}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={ctaHref}
            className="px-5 py-2 rounded-full text-sm font-semibold gradient-bg text-white hover:opacity-90 transition-all duration-200"
          >
            {ctaLabel}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-800"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          <div className="w-5 h-0.5 mb-1.5 bg-gray-800" />
          <div className="w-5 h-0.5 mb-1.5 bg-gray-800" />
          <div className="w-5 h-0.5 bg-gray-800" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-gray-700 font-medium" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href={ctaHref} onClick={() => setOpen(false)} className="px-5 py-2 rounded-full text-sm font-semibold text-center gradient-bg text-white">
            {ctaLabel}
          </a>
        </div>
      )}
    </nav>
  )
}

/* ─── Footer ─── */
function Footer() {
  const services = [
    { label: 'Automatización de procesos', href: '/automatizacion-de-procesos' },
    { label: 'Capacitación en IA', href: '/capacitacion-ia' },
    { label: 'Diagnóstico de madurez digital', href: '/diagnostico' },
  ]

  return (
    <footer className="bg-[#0D0D14] pt-12 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 sm:grid-cols-3 mb-10">
          <div>
            <img src={logoHBlanco} alt="SURI" className="h-6 w-auto mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">Automatización de procesos e IA para empresas.</p>
            <p className="text-gray-400 text-sm mt-1">Buenos Aires, Argentina</p>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-3">Servicios</p>
            <ul className="flex flex-col gap-2">
              {services.map(s => (
                <li key={s.href}>
                  <a href={s.href} className="text-gray-400 text-sm hover:text-white transition-colors">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-3">Contacto</p>
            <ul className="flex flex-col gap-2">
              <li><a href="mailto:info@suri.lat" className="text-gray-400 text-sm hover:text-white transition-colors">info@suri.lat</a></li>
              <li><a href="https://www.linkedin.com/company/suri-ia/" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-400 text-xs">© {new Date().getFullYear()} SURI. Todos los derechos reservados.</p>
          <p className="text-gray-400 text-xs">Hecho con intención, no solo con IA.</p>
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════
   SHARED SECTIONS
   ══════════════════════════════════════════════ */

/* ─── Page hero (service pages) ─── */
function PageHero({ tags, title, subtitle, primary, secondary }) {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden noise">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-6xl mx-auto px-6 py-32 text-white w-full">
        <div className="max-w-3xl">
          <div className="animate-fade-up flex flex-wrap gap-3 mb-8">
            {tags.map(tag => (
              <span key={tag} className="px-4 py-1.5 rounded-full border border-white/30 text-sm font-semibold tracking-widest">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="animate-fade-up-delay-1 text-4xl md:text-6xl font-extrabold leading-[1.05] mb-6">
            {title}
          </h1>

          <p className="animate-fade-up-delay-2 text-lg md:text-xl font-medium text-white/80 mb-10 max-w-2xl">
            {subtitle}
          </p>

          <div className="animate-fade-up-delay-3 flex flex-wrap gap-4">
            <a href={primary.href} className="px-8 py-4 rounded-full bg-white text-[#0061FC] font-bold text-base hover:scale-105 transition-transform duration-200 shadow-lg">
              {primary.label}
            </a>
            <a href={secondary.href} className="px-8 py-4 rounded-full border border-white/40 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200">
              {secondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Section header ─── */
function SectionHeader({ eyebrow, title, subtitle, dark = false }) {
  return (
    <div className="text-center mb-16">
      <p className={`reveal font-semibold tracking-widest text-sm uppercase mb-4 ${dark ? 'text-[#A37EF7]' : 'text-[#0061FC]'}`}>{eyebrow}</p>
      <h2 className={`reveal text-4xl md:text-5xl font-extrabold leading-tight ${dark ? 'text-white' : 'text-[#0D0D0D]'}`}>{title}</h2>
      {subtitle && (
        <p className={`reveal mt-4 max-w-2xl mx-auto text-lg leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>
      )}
    </div>
  )
}

/* ─── Text with inline [text](/path) links ─── */
function RichText({ text }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    return m
      ? <a key={i} href={m[2]} className="text-[#0061FC] font-semibold hover:underline">{m[1]}</a>
      : part
  })
}

/* ─── Problem statement (dark band) ─── */
function ProblemSection({ eyebrow, title, paragraphs }) {
  return (
    <section className="bg-[#0D0D14] py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#A37EF7]/40 to-transparent" />
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeader eyebrow={eyebrow} title={title} dark />
        <div className="flex flex-col gap-5 -mt-8">
          {paragraphs.map(p => (
            <p key={p} className="reveal text-gray-400 text-lg leading-relaxed">{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Card grid ─── */
function CardGrid({ items, cardBg = 'bg-[#F8F9FF]', cols = 'lg:grid-cols-3' }) {
  const colors = ['#0061FC', '#A37EF7', '#F58CF5']
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols} gap-4`}>
      {items.map((item, i) => (
        <div key={item.title} className={`reveal reveal-delay-${(i % 3) + 1} ${cardBg} rounded-2xl p-6 hover:shadow-md transition-shadow duration-300`}>
          <div className="w-3 h-3 rounded-full mb-4" style={{ background: colors[i % 3] }} />
          <h3 className="font-bold text-[#0D0D0D] text-lg mb-2">{item.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed"><RichText text={item.desc} /></p>
        </div>
      ))}
    </div>
  )
}

/* ─── Numbered steps ─── */
function StepsSection({ id, eyebrow, title, subtitle, steps, footerTitle, footerText, bg = 'bg-white' }) {
  const gridCols = { 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' }[steps.length]
  const inset = `${50 / steps.length}%`

  return (
    <section id={id} className={`py-24 ${bg}`}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <div className={`relative grid ${gridCols} gap-8`}>
          <div className="hidden md:block absolute h-0.5 bg-gradient-to-r from-[#0061FC] via-[#A37EF7] to-[#F58CF5]"
            style={{ top: '40px', left: inset, right: inset }}
          />
          {steps.map((s, i) => (
            <div key={s.title} className={`reveal reveal-delay-${i + 1} relative text-center`}>
              <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-6 shadow-lg relative z-10">
                {i + 1}
              </div>
              <h3 className="font-bold text-[#0D0D0D] text-lg mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal mt-14 text-center">
          <p className="text-[#0061FC] font-bold tracking-widest text-sm uppercase">{footerTitle}</p>
          <p className="text-gray-500 text-sm mt-2">{footerText}</p>
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ─── */
function FaqSection({ faqs, bg = 'bg-white' }) {
  return (
    <section id="preguntas-frecuentes" className={`py-24 ${bg}`}>
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeader eyebrow="FAQ" title={<>Preguntas <span className="gradient-text">frecuentes</span></>} />
        <div className="flex flex-col gap-3">
          {faqs.map(f => (
            <details key={f.q} className="reveal group bg-[#F8F9FF] rounded-2xl px-6 py-5 open:shadow-md transition-shadow duration-300">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-bold text-[#0D0D0D]">
                <h3 className="text-base">{f.q}</h3>
                <span className="text-[#A37EF7] text-xl leading-none transition-transform duration-200 group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="text-gray-600 text-sm leading-relaxed mt-3"><RichText text={f.a} /></p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   HOME PAGE SECTIONS
   ══════════════════════════════════════════════ */

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden noise">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-6xl mx-auto px-6 py-32 text-white">
        <div className="max-w-3xl">
          <div className="animate-fade-up flex flex-wrap gap-3 mb-8">
            {['IA', 'AUTOMATIZACIÓN', 'PROCESOS'].map(tag => (
              <span key={tag} className="px-4 py-1.5 rounded-full border border-white/30 text-sm font-semibold tracking-widest">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="animate-fade-up-delay-1 text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6">
            Automatización inteligente para empresas que quieren escalar
          </h1>

          <p className="animate-fade-up-delay-2 text-xl md:text-2xl font-medium text-white/80 mb-10 max-w-xl">
            Convertimos procesos manuales en sistemas automáticos, eficientes y escalables. Sin complejidad técnica. Desde Buenos Aires, para empresas de todo el país y Latinoamérica.
          </p>

          <div className="animate-fade-up-delay-3 flex flex-wrap gap-4">
            <a href="#contacto" className="px-8 py-4 rounded-full bg-white text-[#0061FC] font-bold text-base hover:scale-105 transition-transform duration-200 shadow-lg">
              Hablemos
            </a>
            <a href="#servicios" className="px-8 py-4 rounded-full border border-white/40 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200">
              Ver servicios
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Problem ─── */
function Problem() {
  const problems = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 text-[#A37EF7]">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: 'Tiempo perdido', desc: 'Se pierden horas en tareas repetitivas que no aportan valor estratégico.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 text-[#A37EF7]">
          <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      title: 'Operación costosa', desc: 'La operación consume más tiempo y recursos del que debería invertirse.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 text-[#A37EF7]">
          <rect x="2" y="3" width="8" height="8" rx="1"/><rect x="14" y="3" width="8" height="8" rx="1"/><rect x="2" y="13" width="8" height="8" rx="1"/><rect x="14" y="13" width="8" height="8" rx="1"/>
        </svg>
      ),
      title: 'Información fragmentada', desc: 'Los datos viven en sistemas desconectados, dificultando la toma de decisiones.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 text-[#A37EF7]">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: 'Resistencia al cambio', desc: 'Adoptar nuevas formas de trabajar genera fricción interna que frena la transformación.'
    },
  ]

  return (
    <section className="bg-[#0D0D14] pt-24 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#A37EF7]/40 to-transparent" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="reveal text-[#A37EF7] font-semibold tracking-widest text-sm mb-4 uppercase">El problema</p>
          <h2 className="reveal text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Las empresas crecen.<br />
            <span className="gradient-text">Los procesos no siempre acompañan.</span>
          </h2>
          <p className="reveal text-gray-400 mt-4 max-w-xl mx-auto text-lg">
            Tareas manuales, operación pesada y equipos sobrecargados terminan frenando el crecimiento que tu organización necesita.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className={`reveal reveal-delay-${i + 1} bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-[#A37EF7]/30 transition-all duration-300`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">{p.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── What is SURI ─── */
function WhatIsSuri() {
  const pillars = [
    { color: 'bg-[#0061FC]', title: 'Simple', desc: 'Soluciones comprensibles y accesibles para todo el equipo.' },
    { color: 'bg-[#A37EF7]', title: 'Sin fricción', desc: 'Integración natural con tus sistemas, sin complejidad técnica.' },
    { color: 'bg-[#F58CF5]', title: 'Rápido', desc: 'Implementación ágil con resultados medibles desde el día uno.' },
  ]

  return (
    <section id="suri" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="reveal text-[#0061FC] font-semibold tracking-widest text-sm uppercase mb-4">¿Para qué estamos?</p>
            <h2 className="reveal text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-[#0D0D0D]">
              <span className="gradient-text">Acompañamos a las organizaciones a operar mejor.</span>
            </h2>
            <p className="reveal text-gray-600 text-lg leading-relaxed mb-8">
              SURI ayuda a empresas a automatizar tareas repetitivas mediante flujos inteligentes e inteligencia artificial aplicada. La IA es un medio — poderoso cuando se aplica con criterio estratégico.
            </p>
            <div className="reveal inline-block px-5 py-3 rounded-xl bg-[#F8F9FF] border border-[#0061FC]/10 text-[#0061FC] font-medium text-sm">
              Procesos escalables
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className={`reveal reveal-delay-${i + 1} flex items-start gap-4 bg-[#F8F9FF] rounded-2xl p-5 hover:shadow-md transition-shadow duration-300`}
              >
                <div className={`${p.color} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0D0D0D] text-base">{p.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Services ─── */
function Services() {
  const [open, setOpen] = useState(null)

  const services = [
    {
      color: '#0061FC',
      title: 'Capacitación IA',
      tagline: 'Enseñamos haciendo, no explicando.',
      summary: 'Entrenamos a tu equipo con un enfoque 80% práctico, usando ejemplos de su propio día a día.',
      details: [
        { label: 'Curso general', desc: 'Fundamentos de IA aplicada para toda la organización.' },
        { label: 'Cursos ad-hoc', desc: 'Formación personalizada por área o equipo dentro de tu empresa.' },
        { label: 'Kit de recursos', desc: 'Consejos, herramientas e ideas que el equipo puede aplicar de inmediato.' },
      ],
      cta: 'Quiero capacitar a mi equipo',
      ctaHref: '/capacitacion-ia',
      featured: false,
      mobileOrder: 2,
    },
    {
      color: '#A37EF7',
      title: 'Implementación',
      tagline: 'Automatizaciones reales, funcionando en tu operación.',
      summary: 'Construimos e implementamos los flujos automáticos. También acompañamos a tu equipo si quieren desarrollarlos ellos mismos.',
      details: [
        { label: 'Desarrollo SURI', desc: 'Nosotros diseñamos, construimos e implementamos la automatización.' },
        { label: 'Mentoría técnica', desc: 'Tu equipo desarrolla la automatización y nosotros los acompañamos hora a hora.' },
        { label: 'Mantenimiento continuo', desc: 'Nos ocupamos de que las implementaciones realizadas por SURI sigan funcionando.' },
      ],
      cta: 'Quiero implementar',
      ctaHref: '/automatizacion-de-procesos',
      featured: true,
      mobileOrder: 1,
    },
    {
      color: '#F58CF5',
      title: 'Diagnóstico y Evaluación',
      tagline: 'Entendemos tu operación antes de proponer cualquier cambio.',
      summary: 'Entrevistamos a tu equipo, medimos la penetración real de IA y automatización, e identificamos oportunidades con ROI concreto.',
      details: [
        { label: 'AI Readiness Score', desc: 'Medición del nivel actual de adopción de IA en tu organización.' },
        { label: 'Mapa de oportunidades', desc: 'Identificación de procesos automatizables con impacto estimado por proyecto.' },
        { label: 'Plan de implementación', desc: 'Hoja de ruta priorizada: nombre, descripción, ROI, tiempo y fecha sugerida de inicio.' },
        { label: 'Informe ejecutivo', desc: 'Documento con abstract, background, fortalezas, debilidades y recomendaciones accionables.' },
      ],
      cta: 'Quiero diagnosticar mi operación',
      ctaHref: '/diagnostico',
      featured: false,
      mobileOrder: 3,
    },
  ]

  return (
    <section id="servicios" className="py-24 bg-[#F8F9FF]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="reveal text-[#0061FC] font-semibold tracking-widest text-sm uppercase mb-4">Servicios</p>
          <h2 className="reveal text-4xl md:text-5xl font-extrabold text-[#0D0D0D]">
            ¿En qué podemos <span className="gradient-text">ayudarte?</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {services.map((s, i) => {
            const isOpen = open === i
            return (
              <div
                key={s.title}
                style={{ order: s.mobileOrder }}
                className={`reveal lg:order-none rounded-3xl p-7 flex flex-col transition-all duration-300
                  ${s.featured
                    ? 'bg-white shadow-2xl ring-2 ring-[#A37EF7]/30 lg:-mt-4 lg:mb-4'
                    : 'bg-white shadow-sm hover:shadow-lg'
                  }`}
              >
                <div className="w-3 h-3 rounded-full mb-5" style={{ background: s.color }} />
                <h3 className={`font-bold text-[#0D0D0D] mb-2 ${s.featured ? 'text-2xl' : 'text-xl'}`}>{s.title}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: s.color }}>{s.tagline}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.summary}</p>

                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ maxHeight: isOpen ? '600px' : '0px', opacity: isOpen ? 1 : 0 }}
                >
                  <div className="mb-5 flex flex-col gap-3">
                    {s.details.map(d => (
                      <div key={d.label} className="rounded-xl bg-[#F8F9FF] px-4 py-3">
                        <p className="font-semibold text-[#0D0D0D] text-sm mb-0.5">{d.label}</p>
                        <p className="text-gray-500 text-xs leading-relaxed">{d.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="text-sm font-semibold transition-colors text-left flex items-center gap-1"
                    style={{ color: isOpen ? '#9ca3af' : s.color }}
                  >
                    <span>{isOpen ? '↑ Menos detalle' : '↓ Ver más detalle'}</span>
                  </button>
                  <a
                    href={s.ctaHref || '#contacto'}
                    className="w-full text-center py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                    style={{ background: s.featured ? `linear-gradient(135deg, #0061FC, #A37EF7)` : s.color }}
                  >
                    {s.cta}
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── How we work ─── */
function HowWeWork() {
  const steps = [
    { num: '1', title: 'Identificamos tareas repetitivas', desc: 'Analizamos tu operación actual y mapeamos todos los procesos que consumen tiempo sin aportar valor diferencial.' },
    { num: '2', title: 'Diseñamos flujos inteligentes', desc: 'Construimos la arquitectura de automatización: qué se automatiza, cómo se conecta y qué métricas vamos a medir.' },
    { num: '3', title: 'Implementamos y escalamos con IA', desc: 'Ponemos a funcionar los flujos, medimos el impacto y escalamos lo que funciona. Cada entregable es tangible y evaluable.' },
  ]

  return (
    <StepsSection
      id="proceso"
      eyebrow="Metodología"
      title={<>¿Cómo <span className="gradient-text">trabajamos?</span></>}
      subtitle="Un proceso claro en tres pasos. Ordenado, medible y sin sorpresas."
      steps={steps}
      footerTitle="Claro · Ordenado · Medible"
      footerText="Cada proyecto tiene métricas definidas, plazos concretos y entregables tangibles que podés evaluar."
    />
  )
}

/* ─── For whom ─── */
function ForWhom() {
  const traits = [
    { title: 'Valoran el enfoque consultivo', desc: 'Prefieren un socio estratégico antes que un proveedor de tecnología.' },
    { title: 'Entienden que la eficiencia es estratégica', desc: 'Reconocen que optimizar la operación es clave para competir.' },
    { title: 'Quieren modernizar su operación', desc: 'Buscan actualizar procesos sin generar disrupción en el día a día.' },
    { title: 'Buscan optimizar presupuestos', desc: 'Necesitan hacer más con los recursos existentes.' },
    { title: 'Necesitan escalar su operación', desc: 'Quieren crecer sin incrementar costos fijos significativamente.' },
  ]

  return (
    <section id="audiencia" className="py-24 bg-[#F8F9FF]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="reveal text-[#0061FC] font-semibold tracking-widest text-sm uppercase mb-4">Nuestro cliente</p>
            <h2 className="reveal text-4xl md:text-5xl font-extrabold text-[#0D0D0D] leading-tight mb-6">
              ¿Para quién<br />
              <span className="gradient-text">es SURI?</span>
            </h2>
            <p className="reveal text-gray-500 text-lg leading-relaxed">
              Trabajamos con empresas que buscan modernizar su operación sin perder el foco en el negocio.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {traits.map((t, i) => (
              <div
                key={t.title}
                className={`reveal reveal-delay-${i + 1} flex items-start gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full gradient-bg" />
                <div>
                  <p className="font-bold text-[#0D0D0D] text-sm">{t.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA / Contact ─── */
const SCHEDULING_URL = 'https://calendar.app.google/wd3pFyhNQ5cvne6e9'

function Contact({
  eyebrow = '¿Listo para escalar?',
  title = 'Empecemos a trabajar juntos.',
  subtitle = 'Elegí cómo querés conectar con nosotros.',
  source,
}) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: source ? `[${source}]\n\n${form.message}` : form.message,
        }),
      })
      if (res.ok) { setStatus('ok'); setForm({ name: '', email: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="contacto" className="relative py-24 overflow-hidden noise">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center text-white mb-14">
          <p className="reveal text-white/70 font-semibold tracking-widest text-sm uppercase mb-4">{eyebrow}</p>
          <h2 className="reveal text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            {title}
          </h2>
          <p className="reveal text-white/75 text-lg max-w-lg mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="reveal bg-white/15 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-white flex flex-col justify-between gap-8">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6 text-white">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Agendá una reunión</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Reservá un espacio en nuestra agenda para una llamada de 30 minutos. Sin compromiso, sin formularios.
              </p>
              <ul className="flex flex-col gap-3">
                {['30 minutos, sin compromiso', 'Te contamos cómo podemos ayudarte', 'Respondemos todas tus preguntas'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={SCHEDULING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-4 rounded-xl bg-white text-[#0061FC] font-bold text-sm hover:scale-[1.02] transition-transform duration-200 shadow-lg"
            >
              Hablemos →
            </a>
          </div>

          <div className="reveal reveal-delay-1 bg-white rounded-3xl p-8 flex flex-col">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F9FF] flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="#0061FC" strokeWidth="1.8" className="w-6 h-6">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0D0D0D] mb-2">Escribinos</h3>
              <p className="text-gray-500 text-sm">Te respondemos dentro de las 24 horas hábiles.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Nombre</label>
                <input type="text" id="contact-name" name="name" autoComplete="name" required value={form.name} onChange={handleChange} placeholder="Tu nombre"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A37EF7]/40 focus:border-[#A37EF7] transition-all" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Correo electrónico</label>
                <input type="email" id="contact-email" name="email" autoComplete="email" required value={form.email} onChange={handleChange} placeholder="tu@empresa.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A37EF7]/40 focus:border-[#A37EF7] transition-all" />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Comentario</label>
                <textarea id="contact-message" name="message" required rows={3} value={form.message} onChange={handleChange} placeholder="Contanos brevemente tu situación..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A37EF7]/40 focus:border-[#A37EF7] transition-all resize-none" />
              </div>

              {status === 'ok' && <p className="text-green-600 text-sm font-medium text-center py-2">✓ Mensaje enviado. ¡Nos ponemos en contacto pronto!</p>}
              {status === 'error' && <p className="text-red-500 text-sm text-center py-2">Hubo un error al enviar. Intentá de nuevo o escribinos a <span className="font-semibold">info@suri.lat</span></p>}

              <button type="submit" disabled={status === 'sending'}
                className="w-full py-3.5 rounded-xl gradient-bg text-white font-bold text-sm hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          </div>
        </div>

        <div className="reveal mt-12 flex flex-wrap justify-center gap-8 text-white/60 text-sm">
          <a href="https://www.suri.lat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.suri.lat</a>
          <span className="text-white/30">·</span>
          <a href="mailto:info@suri.lat" className="hover:text-white transition-colors">info@suri.lat</a>
          <span className="text-white/30">·</span>
          <a href="https://www.linkedin.com/company/suri-ia/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   DIAGNÓSTICO PAGE SECTIONS
   ══════════════════════════════════════════════ */

/* ─── Diag Hero ─── */
function DiagHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden noise">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-6xl mx-auto px-6 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — copy */}
          <div className="text-white">
            <div className="animate-fade-up flex flex-wrap gap-3 mb-8">
              {['DIAGNÓSTICO', 'MADUREZ DIGITAL', 'PYMES'].map(tag => (
                <span key={tag} className="px-4 py-1.5 rounded-full border border-white/30 text-sm font-semibold tracking-widest">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="animate-fade-up-delay-1 text-4xl md:text-5xl font-extrabold leading-[1.05] mb-6">
              ¿Qué tan preparada está tu empresa para el mundo digital?
            </h1>

            <p className="animate-fade-up-delay-2 text-lg md:text-xl font-medium text-white/80 mb-10">
              Nuestro diagnóstico de madurez digital evalúa 6 dimensiones clave de tu organización, mide la adopción real de tecnología e IA, y te entrega un plan de acción concreto para mejorar.
            </p>

            <div className="animate-fade-up-delay-3 flex flex-wrap gap-4">
              <a
                href="#contacto-diagnostico"
                className="px-8 py-4 rounded-full bg-white text-[#0061FC] font-bold text-base hover:scale-105 transition-transform duration-200 shadow-lg"
              >
                Solicitar diagnóstico
              </a>
              <a
                href="#como-funciona"
                className="px-8 py-4 rounded-full border border-white/40 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200"
              >
                Ver cómo funciona
              </a>
            </div>
          </div>

          {/* Right — product screenshot */}
          <div className="animate-fade-up-delay-2 hidden lg:flex justify-end items-center">
            <div className="relative w-full max-w-lg">
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-white/10 blur-2xl rounded-3xl scale-95" />
              <img
                src="/scoring_1.webp"
                width="1212"
                height="810"
                alt="Gráfico de araña con el puntaje de adopción tecnológica por dimensión"
                className="relative rounded-2xl shadow-2xl w-full h-auto border border-white/20"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─── Diag Qué es ─── */
function DiagQueEs() {
  const dimensions = [
    { title: 'Operaciones y Ejecución', color: '#0061FC' },
    { title: 'Marketing y Ventas', color: '#0061FC' },
    { title: 'Administración de Recursos', color: '#A37EF7' },
    { title: 'Madurez Digital y Disposición al Cambio', color: '#A37EF7' },
    { title: 'Gestión del Conocimiento y Comunicación Interna', color: '#F58CF5' },
    { title: 'Seguridad y Cumplimiento', color: '#F58CF5' },
  ]

  return (
    <section id="que-es" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="reveal text-[#0061FC] font-semibold tracking-widest text-sm uppercase mb-4">El diagnóstico</p>
          <h2 className="reveal text-4xl md:text-5xl font-extrabold text-[#0D0D0D]">
            Un diagnóstico profesional,<br />
            <span className="gradient-text">con acciones concretas</span>
          </h2>
          <p className="reveal text-gray-500 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            Evaluación integral que combina datos cuantitativos —cuestionario a múltiples niveles de la organización— con análisis cualitativo de nuestro equipo a través de entrevistas en profundidad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {dimensions.map((d, i) => (
            <div key={d.title} className={`reveal reveal-delay-${(i % 4) + 1} bg-[#F8F9FF] rounded-2xl p-5 hover:shadow-md transition-shadow duration-300`}>
              <div className="w-3 h-3 rounded-full mb-3" style={{ background: d.color }} />
              <p className="text-[#0D0D0D] font-semibold text-sm leading-tight">{d.title}</p>
            </div>
          ))}
        </div>

        <p className="reveal text-center text-gray-400 text-sm max-w-lg mx-auto">
          Cada dimensión tiene un peso calibrado según su impacto real en PYMEs latinoamericanas.
        </p>
      </div>
    </section>
  )
}

/* ─── Diag Cómo funciona ─── */
function DiagComoFunciona() {
  const steps = [
    {
      num: '1',
      title: 'Configuración',
      desc: 'Cargamos los datos de tu empresa y definimos quiénes participan del diagnóstico —dirección, mandos medios y operativos.',
    },
    {
      num: '2',
      title: 'Relevamiento',
      desc: 'Cada participante completa un cuestionario online adaptado a su rol (15-20 min). El equipo de Suri realiza entrevistas en vivo con personas clave.',
    },
    {
      num: '3',
      title: 'Análisis',
      desc: 'Procesamos las respuestas, calculamos el scoring por dimensión y nivel organizacional, y analizamos las brechas críticas.',
    },
    {
      num: '4',
      title: 'Entrega',
      desc: 'Te entregamos un informe completo con diagnóstico, hallazgos y un roadmap priorizado de iniciativas de mejora.',
    },
  ]

  return (
    <StepsSection
      id="como-funciona"
      bg="bg-[#F8F9FF]"
      eyebrow="Metodología"
      title={<>¿Cómo <span className="gradient-text">lo hacemos?</span></>}
      subtitle="Cuatro pasos claros, ordenados y sin sorpresas."
      steps={steps}
      footerTitle="Claro · Ordenado · Medible"
      footerText="Cada etapa tiene responsables definidos y entregables concretos que podés evaluar."
    />
  )
}

/* ─── Diag Entregables ─── */
function DiagEntregables() {
  const items = [
    { title: 'Puntaje global de adopción tecnológica', desc: 'Nivel 1 a 4, con descripción de lo que significa para tu organización.' },
    { title: 'Gráfico de araña por dimensión', desc: 'Visualización de scores en las 6 dimensiones evaluadas.' },
    { title: 'Análisis de brecha dirección-operativos', desc: 'Diferencias de percepción entre niveles jerárquicos.' },
    { title: 'Hallazgos cualitativos', desc: 'Voces anonimizadas de la organización que enriquecen el análisis.' },
    { title: 'Roadmap en 3 horizontes', desc: 'Iniciativas priorizadas para 0-3, 3-9 y 9-18 meses.' },
    { title: 'Plan de capacitaciones personalizado', desc: 'Recomendaciones ajustadas al perfil y brechas detectadas.' },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="reveal text-[#0061FC] font-semibold tracking-widest text-sm uppercase mb-4">El entregable</p>
          <h2 className="reveal text-4xl md:text-5xl font-extrabold text-[#0D0D0D] leading-tight">
            Qué vas a <span className="gradient-text">recibir</span>
          </h2>
          <p className="reveal text-gray-500 mt-4 max-w-xl mx-auto text-lg">
            Cada hallazgo viene con una recomendación concreta. No cerramos en diagnóstico negativo.
          </p>
        </div>

        {/* Two columns: bullets + screenshots */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — deliverable list */}
          <div className="flex flex-col gap-3">
            {items.map((item, i) => (
              <div key={item.title} className={`reveal reveal-delay-${Math.min(i + 1, 6)} flex items-start gap-4 bg-[#F8F9FF] rounded-2xl px-5 py-4 hover:shadow-md transition-shadow duration-300`}>
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full gradient-bg" />
                <div>
                  <p className="font-bold text-[#0D0D0D] text-sm">{item.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
            <a
              href="#contacto-diagnostico"
              className="reveal mt-2 inline-block px-8 py-4 rounded-full gradient-bg text-white font-bold text-base hover:opacity-90 transition-all duration-200 text-center"
            >
              Solicitar diagnóstico
            </a>
          </div>

          {/* Right — screenshot */}
          <div className="reveal">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <img src="/scoring_5.webp" width="983" height="889" loading="lazy" decoding="async" alt="Informe de diagnóstico con el detalle del puntaje por dimensión" className="w-full h-auto" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─── Diag Más que un autodiagnóstico ─── */
function DiagAutodiagnostico() {
  const views = [
    { title: 'Cuestionario por rol', desc: 'Dirección, mandos medios y operativos responden por separado, y comparamos sus respuestas.' },
    { title: 'Entrevistas en profundidad', desc: 'Nuestro equipo conversa con personas clave para entender el porqué detrás de los números.' },
    { title: 'Análisis externo', desc: 'Cruzamos todo con nuestra experiencia para detectar brechas que desde adentro cuesta ver.' },
  ]

  return (
    <section className="py-24 bg-[#F8F9FF]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Nuestro enfoque"
          title={<>Más que un <span className="gradient-text">autodiagnóstico</span></>}
          subtitle="Los cuestionarios de autodiagnóstico son un buen primer paso, pero tienen un límite: muestran cómo se percibe la empresa a sí misma, y esa percepción no siempre coincide con la realidad. Por eso nuestro diagnóstico combina tres miradas."
        />
        <CardGrid items={views} cardBg="bg-white" />
        <p className="reveal text-center text-gray-600 text-lg font-medium mt-10 max-w-2xl mx-auto">
          El resultado no es un puntaje para archivar, sino una hoja de ruta con iniciativas priorizadas.
        </p>
      </div>
    </section>
  )
}

/* ─── Diag Contact ─── */
function DiagContact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `[Diagnóstico de Adopción Tecnológica]\n\n${form.message}`,
        }),
      })
      if (res.ok) { setStatus('ok'); setForm({ name: '', email: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="contacto-diagnostico" className="relative py-24 overflow-hidden noise">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center text-white mb-14">
          <p className="reveal text-white/70 font-semibold tracking-widest text-sm uppercase mb-4">¿Listo para medir?</p>
          <h2 className="reveal text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            ¿Listo para medir tu adopción tecnológica?
          </h2>
          <p className="reveal text-white/75 text-lg max-w-xl mx-auto">
            Contactanos para coordinar el diagnóstico de tu empresa. En menos de un mes vamos a estar cambiando la forma de trabajar en tu empresa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="reveal bg-white/15 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-white flex flex-col justify-between gap-8">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6 text-white">
                  <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Hacé el diagnóstico inicial</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Respondé las preguntas iniciales sobre tu empresa y obtené un mapa de tu adopción tecnológica en minutos. Sin reuniones, sin compromisos.
              </p>
              <ul className="flex flex-col gap-3">
                {['Menos de 20 minutos', 'Resultados inmediatos y personalizados', 'Sin registrarse ni dar datos de pago'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="https://diagnostico.suri.lat"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-4 rounded-xl bg-white text-[#0061FC] font-bold text-sm hover:scale-[1.02] transition-transform duration-200 shadow-lg"
            >
              Empezar diagnóstico →
            </a>
          </div>

          <div id="escribinos" className="reveal reveal-delay-1 bg-white rounded-3xl p-8 flex flex-col scroll-mt-24">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F9FF] flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="#0061FC" strokeWidth="1.8" className="w-6 h-6">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0D0D0D] mb-2">Escribinos</h3>
              <p className="text-gray-500 text-sm">Te respondemos dentro de las 24 horas hábiles.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="diag-name" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Nombre</label>
                <input type="text" id="diag-name" name="name" autoComplete="name" required value={form.name} onChange={handleChange} placeholder="Tu nombre"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A37EF7]/40 focus:border-[#A37EF7] transition-all" />
              </div>
              <div>
                <label htmlFor="diag-email" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Correo electrónico</label>
                <input type="email" id="diag-email" name="email" autoComplete="email" required value={form.email} onChange={handleChange} placeholder="tu@empresa.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A37EF7]/40 focus:border-[#A37EF7] transition-all" />
              </div>
              <div>
                <label htmlFor="diag-message" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Comentario</label>
                <textarea id="diag-message" name="message" required rows={3} value={form.message} onChange={handleChange} placeholder="Contanos brevemente tu empresa y situación..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A37EF7]/40 focus:border-[#A37EF7] transition-all resize-none" />
              </div>

              {status === 'ok' && <p className="text-green-600 text-sm font-medium text-center py-2">✓ Mensaje enviado. ¡Nos ponemos en contacto pronto!</p>}
              {status === 'error' && <p className="text-red-500 text-sm text-center py-2">Hubo un error al enviar. Intentá de nuevo o escribinos a <span className="font-semibold">info@suri.lat</span></p>}

              <button type="submit" disabled={status === 'sending'}
                className="w-full py-3.5 rounded-xl gradient-bg text-white font-bold text-sm hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                {status === 'sending' ? 'Enviando...' : 'Solicitar diagnóstico'}
              </button>
            </form>
          </div>
        </div>

        <div className="reveal mt-12 flex flex-wrap justify-center gap-8 text-white/60 text-sm">
          <a href="https://www.suri.lat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.suri.lat</a>
          <span className="text-white/30">·</span>
          <a href="mailto:info@suri.lat" className="hover:text-white transition-colors">info@suri.lat</a>
          <span className="text-white/30">·</span>
          <a href="https://www.linkedin.com/company/suri-ia/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   PAGES
   ══════════════════════════════════════════════ */

function HomePage() {
  useReveal()
  return (
    <>
      <Hero />
      <Problem />
      <WhatIsSuri />
      <Services />
      <HowWeWork />
      <ForWhom />
      <Contact />
    </>
  )
}

function DiagnosticoPage() {
  useReveal()
  return (
    <>
      <DiagHero />
      <DiagEntregables />
      <DiagAutodiagnostico />
      <DiagComoFunciona />
      <DiagQueEs />
      <FaqSection faqs={diagnosticoFaqs} bg="bg-white" />
      <DiagContact />
    </>
  )
}

/* ══════════════════════════════════════════════
   SERVICE PAGES
   ══════════════════════════════════════════════ */

/* ─── Callout with inline links ─── */
function Callout({ title, text, bg = 'bg-white' }) {
  return (
    <section className={`py-16 ${bg}`}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="reveal rounded-3xl p-8 md:p-10 bg-gradient-suri-soft border border-[#A37EF7]/20 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D0D0D] mb-4">{title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed"><RichText text={text} /></p>
        </div>
      </div>
    </section>
  )
}

function AutomatizacionPage() {
  useReveal()

  const areas = [
    { title: 'Administración y facturación', desc: 'Carga de comprobantes, conciliaciones, recordatorios de cobro y reportes que hoy se arman a mano.' },
    { title: 'Ventas y CRM', desc: 'Registro automático de leads, seguimiento de oportunidades y asignación de consultas al vendedor que corresponde.' },
    { title: 'Atención al cliente', desc: 'Respuestas iniciales a consultas frecuentes, derivación al área correcta y asistentes con IA.' },
    { title: 'Operaciones', desc: 'Alertas de stock, actualización de planillas y sincronización entre sistemas que hoy no se hablan.' },
    { title: 'Documentos e información interna', desc: 'Clasificación de documentos, extracción de datos de PDFs y mails, y resúmenes automáticos con IA.' },
    { title: 'Reportes', desc: 'Tableros que se actualizan solos, en lugar de consolidar planillas cada semana.' },
  ]

  const tools = ['n8n', 'Make', 'Zapier', 'OpenAI', 'ChatGPT', 'Claude', 'Google Workspace']

  const modes = [
    { title: 'Desarrollo SURI', desc: 'Nosotros diseñamos, construimos e implementamos la automatización de punta a punta. Te entregamos el flujo funcionando, documentado y medido.' },
    { title: 'Mentoría técnica', desc: 'Si tu empresa tiene gente con ganas de desarrollar sus propias automatizaciones, los acompañamos: revisamos el diseño, destrabamos problemas y transferimos el conocimiento para que el equipo gane autonomía.' },
    { title: 'Mantenimiento continuo', desc: 'Las automatizaciones necesitan ajustes cuando cambian los procesos o las herramientas. Nos ocupamos de que todo lo que implementamos siga funcionando.' },
  ]

  const steps = [
    { title: 'Identificamos tareas repetitivas', desc: 'Analizamos tu operación y mapeamos los procesos que consumen tiempo sin aportar valor diferencial. Priorizamos por impacto y facilidad de implementación.' },
    { title: 'Diseñamos flujos inteligentes', desc: 'Definimos qué se automatiza, cómo se conecta con tus sistemas actuales y qué métricas vamos a medir para saber si funcionó.' },
    { title: 'Implementamos y escalamos', desc: 'Ponemos los flujos en producción, medimos el impacto real y escalamos lo que funciona.' },
  ]

  return (
    <>
      <PageHero
        tags={['IMPLEMENTACIÓN']}
        title="Automatización de procesos con IA para pymes"
        subtitle="Convertimos las tareas manuales que frenan a tu equipo en flujos automáticos que funcionan solos. Vos definís qué querés resolver; lo diseñamos, lo construimos y lo dejamos funcionando."
        primary={{ label: 'Quiero automatizar', href: '#contacto' }}
        secondary={{ label: 'Ver cómo trabajamos', href: '#proceso' }}
      />
      <ProblemSection
        eyebrow="El problema"
        title={<>Tu equipo no debería estar <span className="gradient-text">copiando datos de un lado a otro</span></>}
        paragraphs={[
          'En la mayoría de las pymes hay horas que se van todos los días en tareas que no necesitan criterio humano: pasar pedidos de un sistema a otro, cargar facturas, responder siempre las mismas consultas, armar el mismo reporte cada lunes. Son tareas necesarias, pero no hacen crecer a la empresa.',
          'Automatizarlas no requiere cambiar todos tus sistemas ni contratar un equipo técnico. Requiere entender bien el proceso, elegir la herramienta correcta y conectarla con lo que ya usás.',
        ]}
      />
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            eyebrow="Qué automatizamos"
            title={<>Procesos que automatizamos en <span className="gradient-text">empresas como la tuya</span></>}
          />
          <CardGrid items={areas} />
          <div className="reveal mt-12 text-center">
            <p className="text-gray-500 text-sm mb-4">Trabajamos con herramientas como</p>
            <ul className="flex flex-wrap justify-center gap-3">
              {tools.map(t => (
                <li key={t} className="px-4 py-2 rounded-full bg-[#F8F9FF] border border-[#0061FC]/10 text-[#0D0D0D] text-sm font-semibold">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="py-24 bg-[#F8F9FF]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            eyebrow="Formas de trabajo"
            title={<>Lo hacemos nosotros, <span className="gradient-text">o acompañamos a tu equipo</span></>}
          />
          <CardGrid items={modes} cardBg="bg-white" />
        </div>
      </section>
      <StepsSection
        id="proceso"
        eyebrow="Metodología"
        title={<>Un proceso claro <span className="gradient-text">en tres pasos</span></>}
        steps={steps}
        footerTitle="Claro · Ordenado · Medible"
        footerText="Cada proyecto tiene métricas definidas, plazos concretos y entregables que podés evaluar."
      />
      <Callout
        bg="bg-white"
        title="¿No sabés por dónde empezar?"
        text="Si todavía no tenés claro qué conviene automatizar primero, el [Diagnóstico de madurez digital](/diagnostico) te da un mapa de oportunidades con el impacto estimado de cada una."
      />
      <FaqSection faqs={automatizacionFaqs} bg="bg-white" />
      <Contact
        eyebrow="¿Empezamos?"
        title="Contanos qué tarea querés sacarle de encima a tu equipo"
        subtitle="Agendá una llamada de 30 minutos, sin compromiso, o escribinos y te respondemos dentro de las 24 horas hábiles."
        source="Automatización de procesos"
      />
    </>
  )
}

function CapacitacionPage() {
  useReveal()

  const approach = [
    { title: 'Ejemplos del día a día de tu equipo', desc: 'Antes de cada capacitación relevamos qué hace cada área, para practicar con tareas reales y no con ejemplos genéricos.' },
    { title: 'Herramientas que ya están a mano', desc: 'Trabajamos con asistentes de IA generativa de uso común, como ChatGPT y Claude.' },
    { title: 'Criterio, no solo trucos', desc: 'Enseñamos cuándo conviene usar IA, cuándo no, y cómo revisar lo que produce. Incluye buenas prácticas de privacidad y uso responsable de la información de la empresa.' },
    { title: 'Aplicación inmediata', desc: 'Cada participante se lleva ideas y recursos para usar al día siguiente.' },
  ]

  const formats = [
    { title: 'Curso general de IA aplicada', desc: 'Fundamentos de inteligencia artificial para toda la organización: qué es, qué puede hacer hoy, cómo escribir buenas instrucciones y cómo integrarla al trabajo diario. El curso básico se dicta en 3 jornadas.' },
    { title: 'Cursos a medida por área', desc: 'Formación específica para un equipo o sector (administración, ventas, marketing, recursos humanos, operaciones), diseñada a partir de sus procesos y desafíos.' },
    { title: 'Kit de recursos', desc: 'Consejos, herramientas e ideas que el equipo puede aplicar de inmediato y consultar después de la capacitación.' },
  ]

  return (
    <>
      <PageHero
        tags={['CAPACITACIÓN IA']}
        title="Capacitación en inteligencia artificial para empresas"
        subtitle="Enseñamos haciendo, no explicando. Entrenamos a tu equipo para usar la IA en su trabajo de todos los días, con ejemplos reales de tu empresa."
        primary={{ label: 'Quiero capacitar a mi equipo', href: '#contacto' }}
        secondary={{ label: 'Ver modalidades', href: '#modalidades' }}
      />
      <ProblemSection
        eyebrow="El problema"
        title={<>Todos hablan de IA. <span className="gradient-text">Pocos equipos saben usarla bien.</span></>}
        paragraphs={[
          'La mayoría de las personas ya probó ChatGPT u otra herramienta de IA, pero pocas la usan de forma consistente para trabajar mejor. Sin una guía, cada uno la prueba por su cuenta, los resultados son desparejos y la empresa no aprovecha lo que la IA ya puede hacer hoy.',
          'Una buena capacitación no es una charla sobre el futuro de la tecnología. Es una sesión de trabajo donde tu equipo sale sabiendo resolver tareas concretas más rápido.',
        ]}
      />
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            eyebrow="Nuestro enfoque"
            title={<>80% práctica, <span className="gradient-text">con tus propios casos</span></>}
          />
          <CardGrid items={approach} cols="lg:grid-cols-4" />
        </div>
      </section>
      <section id="modalidades" className="py-24 bg-[#F8F9FF]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            eyebrow="Modalidades"
            title={<>Formatos de <span className="gradient-text">capacitación</span></>}
            subtitle="Presencial en Buenos Aires o virtual, según lo que necesite tu equipo. Grupos de hasta 15 personas para que todos practiquen."
          />
          <CardGrid items={formats} cardBg="bg-white" />
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="reveal text-[#0061FC] font-semibold tracking-widest text-sm uppercase mb-4">Para quién es</p>
          <h2 className="reveal text-4xl md:text-5xl font-extrabold text-[#0D0D0D] leading-tight mb-6">
            Pensada para equipos <span className="gradient-text">que no son técnicos</span>
          </h2>
          <p className="reveal text-gray-500 text-lg leading-relaxed">
            No hace falta saber programar ni tener experiencia previa con IA. La capacitación está pensada para equipos de negocio, líderes que quieren entender cómo aplicar la IA en su área y empresas que quieren que la adopción sea ordenada y no improvisada.
          </p>
        </div>
      </section>
      <Callout
        bg="bg-white"
        title="Después de la capacitación"
        text="Si durante la capacitación aparecen procesos que conviene automatizar, podemos ayudarte a [implementarlos](/automatizacion-de-procesos). Y si querés medir el punto de partida de toda la organización, el [Diagnóstico de madurez digital](/diagnostico) incluye un plan de capacitaciones personalizado."
      />
      <FaqSection faqs={capacitacionFaqs} bg="bg-white" />
      <Contact
        eyebrow="¿Empezamos?"
        title="Capacitá a tu equipo para trabajar con IA"
        subtitle="Agendá una llamada de 30 minutos o escribinos y armamos una propuesta para tu equipo."
        source="Capacitación IA"
      />
    </>
  )
}

function NotFoundPage() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden noise">
      <div className="absolute inset-0 gradient-bg" />
      <div className="relative max-w-6xl mx-auto px-6 py-32 text-white text-center">
        <p className="font-semibold tracking-widest text-sm uppercase mb-4 text-white/70">Error 404</p>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">Página no encontrada</h1>
        <p className="text-lg text-white/80 mb-10 max-w-lg mx-auto">
          La página que buscás no existe o fue movida.
        </p>
        <a href="/" className="px-8 py-4 rounded-full bg-white text-[#0061FC] font-bold text-base hover:scale-105 transition-transform duration-200 shadow-lg">
          Volver al inicio
        </a>
      </div>
    </section>
  )
}

/* ─── App shell ─── */
export function AppShell() {
  return (
    <div className="font-sans">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diagnostico" element={<DiagnosticoPage />} />
        <Route path="/automatizacion-de-procesos" element={<AutomatizacionPage />} />
        <Route path="/capacitacion-ia" element={<CapacitacionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
