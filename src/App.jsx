import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import logoHColor from './assets/logos/logo-h-color.svg'
import logoHBlanco from './assets/logos/logo-h-blanco.svg'

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
  const isDiag = location.pathname === '/diagnostico'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Servicios', href: isDiag ? '/#servicios' : '#servicios' },
    { label: 'Cómo trabajamos', href: isDiag ? '/#proceso' : '#proceso' },
    { label: 'Para quién', href: isDiag ? '/#audiencia' : '#audiencia' },
  ]

  const ctaHref = isDiag ? '#contacto-diagnostico' : '#contacto'
  const ctaLabel = isDiag ? 'Solicitar diagnóstico' : 'Hablemos'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm' : 'bg-white border-b border-gray-100'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img src={logoHColor} alt="SURI" className="h-7 w-auto" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
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
        <button className="md:hidden p-2 text-gray-800" onClick={() => setOpen(!open)}>
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
  return (
    <footer className="bg-[#0D0D14] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <img src={logoHBlanco} alt="SURI" className="h-6 w-auto" />
        <p className="text-gray-400 text-xs">© {new Date().getFullYear()} SURI. Todos los derechos reservados.</p>
        <p className="text-gray-400 text-xs">Hecho con intención, no solo con IA.</p>
      </div>
    </footer>
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
            Convertimos procesos manuales en sistemas automáticos, eficientes y escalables. Sin complejidad técnica.
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
      featured: false,
      mobileOrder: 2,
    },
    {
      color: '#A37EF7',
      title: 'Implementación',
      tagline: 'Automatizaciones reales, funcionando en tu operación.',
      summary: 'Construimos e implementamos los flujos automáticos. También acompañamos a tu equipo si quieren desarrollarlos ellos mismos.',
      details: [
        { label: 'Desarrollo SURI', desc: 'Nosotros diseñamos, construimos e implementamos la automatización. Cobramos por horas de desarrollo.' },
        { label: 'Mentoría técnica', desc: 'Tu equipo desarrolla la automatización y nosotros los acompañamos hora a hora.' },
        { label: 'Mantenimiento continuo', desc: 'Fee mensual de mantenimiento sobre las implementaciones realizadas por SURI.' },
      ],
      cta: 'Quiero implementar',
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
      cta: 'Quiero evaluar mi operación',
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
                    href="#contacto"
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
    <section id="proceso" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="reveal text-[#0061FC] font-semibold tracking-widest text-sm uppercase mb-4">Metodología</p>
          <h2 className="reveal text-4xl md:text-5xl font-extrabold text-[#0D0D0D]">
            ¿Cómo <span className="gradient-text">trabajamos?</span>
          </h2>
          <p className="reveal text-gray-500 mt-4 max-w-lg mx-auto text-lg">
            Un proceso claro en tres pasos. Ordenado, medible y sin sorpresas.
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute h-0.5 bg-gradient-to-r from-[#0061FC] via-[#A37EF7] to-[#F58CF5]"
            style={{ top: '40px', left: 'calc(16.67%)', right: 'calc(16.67%)' }}
          />
          {steps.map((s, i) => (
            <div key={s.num} className={`reveal reveal-delay-${i + 1} relative text-center`}>
              <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-6 shadow-lg relative z-10">
                {s.num}
              </div>
              <h3 className="font-bold text-[#0D0D0D] text-lg mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal mt-14 text-center">
          <p className="text-[#0061FC] font-bold tracking-widest text-sm uppercase">Claro · Ordenado · Medible</p>
          <p className="text-gray-500 text-sm mt-2">Cada proyecto tiene métricas definidas, plazos concretos y entregables tangibles que podés evaluar.</p>
        </div>
      </div>
    </section>
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

function Contact() {
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
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
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
          <p className="reveal text-white/70 font-semibold tracking-widest text-sm uppercase mb-4">¿Listo para escalar?</p>
          <h2 className="reveal text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Empecemos a trabajar juntos.
          </h2>
          <p className="reveal text-white/75 text-lg max-w-lg mx-auto">
            Elegí cómo querés conectar con nosotros.
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
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Nombre</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Tu nombre"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A37EF7]/40 focus:border-[#A37EF7] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Correo electrónico</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="tu@empresa.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A37EF7]/40 focus:border-[#A37EF7] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Comentario</label>
                <textarea name="message" required rows={3} value={form.message} onChange={handleChange} placeholder="Contanos brevemente tu situación..."
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

      <div className="relative max-w-6xl mx-auto px-6 py-32 text-white">
        <div className="max-w-3xl">
          <div className="animate-fade-up flex flex-wrap gap-3 mb-8">
            {['DIAGNÓSTICO', 'MADUREZ DIGITAL', 'PYMES'].map(tag => (
              <span key={tag} className="px-4 py-1.5 rounded-full border border-white/30 text-sm font-semibold tracking-widest">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="animate-fade-up-delay-1 text-4xl md:text-6xl font-extrabold leading-[1.05] mb-6">
            ¿Qué tan preparada está tu empresa para el mundo digital?
          </h1>

          <p className="animate-fade-up-delay-2 text-xl md:text-2xl font-medium text-white/80 mb-10 max-w-2xl">
            Nuestro diagnóstico de madurez digital evalúa 8 dimensiones clave de tu organización y te entrega un plan de acción concreto para mejorar.
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
      </div>
    </section>
  )
}

/* ─── Diag Problem ─── */
function DiagProblem() {
  const pains = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 text-[#A37EF7]">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: 'Tiempo perdido en lo operativo',
      desc: 'Procesos manuales que consumen horas del equipo sin agregar valor estratégico.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 text-[#A37EF7]">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      ),
      title: 'Herramientas que no se usan bien',
      desc: 'Herramientas digitales que se adoptaron sin criterio y no generan el valor esperado.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 text-[#A37EF7]">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Brecha entre dirección y operación',
      desc: 'La dirección tiene una percepción del estado tecnológico que no coincide con la realidad operativa.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 text-[#A37EF7]">
          <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
        </svg>
      ),
      title: 'Sin hoja de ruta tecnológica',
      desc: 'No hay un plan claro de hacia dónde ir con la tecnología ni cómo priorizar las inversiones.',
    },
  ]

  return (
    <section className="bg-[#0D0D14] py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#A37EF7]/40 to-transparent" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="reveal text-[#A37EF7] font-semibold tracking-widest text-sm uppercase mb-4">El problema</p>
          <h2 className="reveal text-4xl md:text-5xl font-extrabold text-white leading-tight">
            La tecnología avanza.<br />
            <span className="gradient-text">¿Tu empresa avanza con ella?</span>
          </h2>
          <p className="reveal text-gray-400 mt-4 max-w-xl mx-auto text-lg">
            Muchas empresas invierten en tecnología sin un diagnóstico previo. El resultado: herramientas subutilizadas, procesos sin mejorar y equipos frustrados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pains.map((p, i) => (
            <div key={p.title} className={`reveal reveal-delay-${i + 1} bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#A37EF7]/30 transition-all duration-300`}>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">{p.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <p className="reveal mt-12 text-center text-[#A37EF7] font-semibold text-base">
          El primer paso para mejorar es medir. Y eso es exactamente lo que hacemos.
        </p>
      </div>
    </section>
  )
}

/* ─── Diag Qué es ─── */
function DiagQueEs() {
  const dimensions = [
    { title: 'Adopción de Inteligencia Artificial', color: '#0061FC' },
    { title: 'Estrategia y Liderazgo Digital', color: '#0061FC' },
    { title: 'Seguridad Informática y Privacidad', color: '#A37EF7' },
    { title: 'Automatización de Procesos', color: '#A37EF7' },
    { title: 'Cultura del Dato', color: '#A37EF7' },
    { title: 'Infraestructura y Herramientas', color: '#F58CF5' },
    { title: 'Capacidades Humanas', color: '#F58CF5' },
    { title: 'Marketing y Presencia Digital', color: '#F58CF5' },
  ]

  return (
    <section id="que-es" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="reveal text-[#0061FC] font-semibold tracking-widest text-sm uppercase mb-4">El diagnóstico</p>
          <h2 className="reveal text-4xl md:text-5xl font-extrabold text-[#0D0D0D]">
            Un diagnóstico profesional,<br />
            <span className="gradient-text">no una encuesta genérica</span>
          </h2>
          <p className="reveal text-gray-500 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            Evaluación integral que combina datos cuantitativos —cuestionario a múltiples niveles de la organización— con análisis cualitativo de nuestro equipo a través de entrevistas en profundidad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
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
    <section id="como-funciona" className="py-24 bg-[#F8F9FF]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="reveal text-[#0061FC] font-semibold tracking-widest text-sm uppercase mb-4">Metodología</p>
          <h2 className="reveal text-4xl md:text-5xl font-extrabold text-[#0D0D0D]">
            ¿Cómo <span className="gradient-text">lo hacemos?</span>
          </h2>
          <p className="reveal text-gray-500 mt-4 max-w-lg mx-auto text-lg">
            Cuatro pasos claros, ordenados y sin sorpresas.
          </p>
        </div>

        <div className="relative grid md:grid-cols-4 gap-8">
          <div className="hidden md:block absolute h-0.5 bg-gradient-to-r from-[#0061FC] via-[#A37EF7] to-[#F58CF5]"
            style={{ top: '40px', left: 'calc(12.5%)', right: 'calc(12.5%)' }}
          />
          {steps.map((s, i) => (
            <div key={s.num} className={`reveal reveal-delay-${i + 1} relative text-center`}>
              <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-6 shadow-lg relative z-10">
                {s.num}
              </div>
              <h3 className="font-bold text-[#0D0D0D] text-lg mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal mt-14 text-center">
          <p className="text-[#0061FC] font-bold tracking-widest text-sm uppercase">Claro · Ordenado · Medible</p>
          <p className="text-gray-500 text-sm mt-2">Cada etapa tiene responsables definidos y entregables concretos que podés evaluar.</p>
        </div>
      </div>
    </section>
  )
}

/* ─── Diag Entregables ─── */
function DiagEntregables() {
  const items = [
    { title: 'Puntaje global de madurez digital', desc: 'Nivel 1 a 4, con descripción de lo que significa cada nivel para tu organización.' },
    { title: 'Gráfico de araña por dimensión', desc: 'Visualización de scores en las 8 dimensiones evaluadas.' },
    { title: 'Análisis de brecha dirección-operativos', desc: 'Identificación de diferencias de percepción entre niveles jerárquicos.' },
    { title: 'Hallazgos cualitativos', desc: 'Voces anonimizadas de la organización que enriquecen el análisis cuantitativo.' },
    { title: 'Roadmap de mejora en 3 horizontes', desc: 'Iniciativas priorizadas para 0-3, 3-9 y 9-18 meses.' },
    { title: 'Plan de capacitaciones personalizado', desc: 'Recomendaciones de formación ajustadas al perfil y brechas detectadas.' },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="reveal text-[#0061FC] font-semibold tracking-widest text-sm uppercase mb-4">El entregable</p>
            <h2 className="reveal text-4xl md:text-5xl font-extrabold text-[#0D0D0D] leading-tight mb-6">
              Qué vas a<br />
              <span className="gradient-text">recibir</span>
            </h2>
            <p className="reveal text-gray-500 text-lg leading-relaxed mb-8">
              Cada hallazgo viene con una recomendación concreta. No cerramos en diagnóstico negativo: siempre hay un camino claro para mejorar.
            </p>
            <a
              href="#contacto-diagnostico"
              className="reveal inline-block px-8 py-4 rounded-full gradient-bg text-white font-bold text-base hover:opacity-90 transition-all duration-200"
            >
              Solicitar diagnóstico
            </a>
          </div>

          <div className="flex flex-col gap-4">
            {items.map((item, i) => (
              <div key={item.title} className={`reveal reveal-delay-${Math.min(i + 1, 6)} flex items-start gap-4 bg-[#F8F9FF] rounded-2xl px-5 py-4 hover:shadow-md transition-shadow duration-300`}>
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full gradient-bg" />
                <div>
                  <p className="font-bold text-[#0D0D0D] text-sm">{item.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Diag Para quién ─── */
function DiagParaQuien() {
  const traits = [
    { title: 'Empresas de 10 a 500 empleados', desc: 'Industriales, de servicios o familiares con masa crítica para medir y mejorar.' },
    { title: 'Empresas donde la tecnología es un medio', desc: 'No empresas de tecnología. Empresas que usan tecnología para operar mejor.' },
    { title: 'Dirección que quiere evidencia objetiva', desc: 'Antes de invertir en tecnología, primero entender qué está fallando y dónde.' },
    { title: 'Equipos que sienten que algo no funciona', desc: 'Pero no saben por dónde empezar ni cómo priorizar las mejoras.' },
  ]

  return (
    <section id="para-quien" className="py-24 bg-[#F8F9FF]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="reveal text-[#0061FC] font-semibold tracking-widest text-sm uppercase mb-4">Perfil del cliente</p>
            <h2 className="reveal text-4xl md:text-5xl font-extrabold text-[#0D0D0D] leading-tight mb-6">
              ¿Es para<br />
              <span className="gradient-text">tu empresa?</span>
            </h2>
            <p className="reveal text-gray-500 text-lg leading-relaxed">
              El diagnóstico está diseñado para organizaciones que quieren tomar decisiones tecnológicas con base en datos reales, no en percepciones.
            </p>
            <div className="reveal mt-8 inline-block px-5 py-3 rounded-xl bg-white border border-[#0061FC]/10 text-[#0061FC] font-medium text-sm shadow-sm">
              No es para empresas de tecnología. Es para empresas que usan tecnología.
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {traits.map((t, i) => (
              <div key={t.title} className={`reveal reveal-delay-${i + 1} flex items-start gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow duration-300`}>
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

/* ─── Diag Por qué SURI ─── */
function DiagPorQueSuri() {
  const reasons = [
    {
      color: '#0061FC',
      title: 'Hablamos el idioma del negocio',
      desc: 'No de la tecnología. Nuestro foco es tu operación, tus procesos y tus resultados.',
    },
    {
      color: '#A37EF7',
      title: 'Evaluamos 3 niveles organizacionales',
      desc: 'Dirección, mandos medios y operativos. Las brechas de percepción revelan los problemas reales.',
    },
    {
      color: '#F58CF5',
      title: 'Cada recomendación tiene ROI estimado',
      desc: 'Y un horizonte de implementación concreto. Priorizamos lo que más impacto tiene, primero.',
    },
    {
      color: '#0061FC',
      title: 'Es el primer paso de una relación',
      desc: 'El diagnóstico no es un producto aislado. Es el punto de partida para mejorar tu operación con nosotros.',
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="reveal text-[#0061FC] font-semibold tracking-widest text-sm uppercase mb-4">Por qué elegirnos</p>
          <h2 className="reveal text-4xl md:text-5xl font-extrabold text-[#0D0D0D]">
            Por qué <span className="gradient-text">SURI</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <div key={r.title} className={`reveal reveal-delay-${i + 1} bg-[#F8F9FF] rounded-2xl p-7 hover:shadow-md transition-shadow duration-300`}>
              <div className="w-3 h-3 rounded-full mb-5" style={{ background: r.color }} />
              <h3 className="font-bold text-[#0D0D0D] text-lg mb-3">{r.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
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
          message: `[Diagnóstico de Madurez Digital]\n\n${form.message}`,
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
            ¿Listo para medir tu madurez digital?
          </h2>
          <p className="reveal text-white/75 text-lg max-w-xl mx-auto">
            Contactanos para coordinar el diagnóstico de tu empresa. En menos de un mes vas a tener un mapa claro de dónde estás y hacia dónde ir.
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
                Reservá un espacio para una llamada de 30 minutos. Evaluamos si el diagnóstico es adecuado para tu empresa.
              </p>
              <ul className="flex flex-col gap-3">
                {['30 minutos, sin compromiso', 'Evaluamos si el diagnóstico es para vos', 'Respondemos todas tus preguntas'].map(item => (
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
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Nombre</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Tu nombre"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A37EF7]/40 focus:border-[#A37EF7] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Correo electrónico</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="tu@empresa.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A37EF7]/40 focus:border-[#A37EF7] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Comentario</label>
                <textarea name="message" required rows={3} value={form.message} onChange={handleChange} placeholder="Contanos brevemente tu empresa y situación..."
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
      <DiagProblem />
      <DiagQueEs />
      <DiagComoFunciona />
      <DiagEntregables />
      <DiagParaQuien />
      <DiagPorQueSuri />
      <DiagContact />
    </>
  )
}

/* ─── App shell ─── */
function AppShell() {
  return (
    <div className="font-sans">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diagnostico" element={<DiagnosticoPage />} />
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
