import { useEffect, useRef, useState } from 'react'
import logoHColor from './assets/logos/logo-h-color.svg'
import logoVBlanco from './assets/logos/logo-v-blanco.svg'
import logoHNegro from './assets/logos/logo-h-negro.svg'
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

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Cómo trabajamos', href: '#proceso' },
    { label: 'Para quién', href: '#audiencia' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm' : 'bg-white border-b border-gray-100'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img
            src={logoHColor}
            alt="SURI"
            className="h-7 w-auto"
          />
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
            href="#contacto"
            className="px-5 py-2 rounded-full text-sm font-semibold gradient-bg text-white hover:opacity-90 transition-all duration-200"
          >
            Hablemos
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-800"
          onClick={() => setOpen(!open)}
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
          <a href="#contacto" onClick={() => setOpen(false)} className="px-5 py-2 rounded-full text-sm font-semibold text-center gradient-bg text-white">
            Hablemos
          </a>
        </div>
      )}
    </nav>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden noise">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-bg" />

      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-6xl mx-auto px-6 py-32 text-white">
        <div className="max-w-3xl">
          {/* Badges */}
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
            <a
              href="#contacto"
              className="px-8 py-4 rounded-full bg-white text-[#0061FC] font-bold text-base hover:scale-105 transition-transform duration-200 shadow-lg"
            >
              Hablemos
            </a>
            <a
              href="#servicios"
              className="px-8 py-4 rounded-full border border-white/40 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200"
            >
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
      {/* Subtle gradient glow */}
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
          {/* Left */}
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

          {/* Right — Pillars */}
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

  // Desktop: Capacitación | Implementación (centro) | Auditoría
  // Mobile: Implementación primero (order CSS)
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
      title: 'Evaluación y Auditoría',
      tagline: 'Entendemos tu operación antes de proponer cualquier cambio.',
      summary: 'Entrevistamos a tu equipo, medimos la penetración real de IA y automatización, e identificamos oportunidades con ROI concreto.',
      details: [
        { label: 'AI Readiness Score', desc: 'Medición del nivel actual de adopción de IA en tu organización.' },
        { label: 'Mapa de oportunidades', desc: 'Identificación de procesos automatizables con impacto estimado por proyecto.' },
        { label: 'Plan de implementación', desc: 'Hoja de ruta priorizada: nombre, descripción, ROI, tiempo y fecha sugerida de inicio.' },
        { label: 'Informe ejecutivo', desc: 'Documento con abstract, background, fortalezas, debilidades y recomendaciones accionables.' },
      ],
      cta: 'Quiero auditar mi operación',
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
                {/* Color dot */}
                <div className="w-3 h-3 rounded-full mb-5" style={{ background: s.color }} />

                <h3 className={`font-bold text-[#0D0D0D] mb-2 ${s.featured ? 'text-2xl' : 'text-xl'}`}>{s.title}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: s.color }}>{s.tagline}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.summary}</p>

                {/* Expandable detail */}
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
          {/* Full connector line: from center of col1 bubble to center of col3 bubble */}
          <div className="hidden md:block absolute h-0.5 bg-gradient-to-r from-[#0061FC] via-[#A37EF7] to-[#F58CF5]"
            style={{ top: '40px', left: 'calc(16.67%)', right: 'calc(16.67%)' }}
          />

          {steps.map((s, i) => (
            <div key={s.num} className={`reveal reveal-delay-${i + 1} relative text-center`}>
              {/* Number bubble */}
              <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-6 shadow-lg">
                {s.num}
              </div>
              <h3 className="font-bold text-[#0D0D0D] text-lg mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Tagline */}
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
          {/* Left */}
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

          {/* Right */}
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
  const [status, setStatus] = useState(null) // null | 'sending' | 'ok' | 'error'

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
      if (res.ok) {
        setStatus('ok')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="relative py-24 overflow-hidden noise">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
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

          {/* Opción 1 — Agendar reunión */}
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
              {/* Feature list */}
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

          {/* Opción 2 — Formulario */}
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
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A37EF7]/40 focus:border-[#A37EF7] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@empresa.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A37EF7]/40 focus:border-[#A37EF7] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Comentario</label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Contanos brevemente tu situación..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A37EF7]/40 focus:border-[#A37EF7] transition-all resize-none"
                />
              </div>

              {status === 'ok' && (
                <p className="text-green-600 text-sm font-medium text-center py-2">✓ Mensaje enviado. ¡Nos ponemos en contacto pronto!</p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-sm text-center py-2">Hubo un error al enviar. Intentá de nuevo o escribinos a <span className="font-semibold">info@suri.lat</span></p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 rounded-xl gradient-bg text-white font-bold text-sm hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          </div>
        </div>

        {/* Links footer */}
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

/* ─── App ─── */
export default function App() {
  useReveal()

  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <Problem />
      <WhatIsSuri />
      <Services />
      <HowWeWork />
      <ForWhom />
      <Contact />
      <Footer />
    </div>
  )
}
