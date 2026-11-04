// FAQ copy per page. Shared by the pages (App.jsx) and the FAQPage structured data (scripts/seo.js).
// Answers may contain inline links written as [text](/path).

export const automatizacionFaqs = [
  {
    q: '¿Qué es la automatización de procesos?',
    a: 'Es usar herramientas de software para que una tarea repetitiva se haga sola, sin intervención manual. Por ejemplo: que cada pedido que entra por email se cargue automáticamente en tu sistema y se avise al responsable.',
  },
  {
    q: '¿Qué diferencia hay entre automatizar y usar inteligencia artificial?',
    a: 'La automatización ejecuta pasos que siempre son iguales. La IA agrega la capacidad de interpretar: leer un mail y entender qué pide, clasificar un documento o redactar una respuesta. En la práctica, los mejores resultados vienen de combinar las dos.',
  },
  {
    q: '¿Tengo que cambiar los sistemas que uso?',
    a: 'Casi nunca. Trabajamos sobre las herramientas que tu empresa ya usa y las conectamos entre sí. Si en algún caso conviene sumar una herramienta nueva, te lo explicamos antes, con el porqué.',
  },
  {
    q: '¿Cuánto tarda en estar funcionando una automatización?',
    a: 'Depende de la complejidad del proceso. Una automatización simple puede estar lista en pocos días; un flujo que conecta varios sistemas lleva más. Antes de empezar te damos un plazo concreto.',
  },
  {
    q: '¿Trabajan solo en Buenos Aires?',
    a: 'Estamos en Buenos Aires y trabajamos con empresas de todo el país y Latinoamérica, de forma remota o presencial según el proyecto.',
  },
]

export const capacitacionFaqs = [
  {
    q: '¿Qué aprende mi equipo en una capacitación de IA?',
    a: 'A usar herramientas de IA generativa para tareas concretas de su trabajo: redactar y resumir, analizar información, preparar presentaciones y reportes, investigar y automatizar pasos simples. Siempre con ejemplos de su propia área.',
  },
  {
    q: '¿Hace falta tener conocimientos técnicos?',
    a: 'No. La capacitación está pensada para personas sin perfil técnico. Empezamos desde lo básico y avanzamos según el nivel del grupo.',
  },
  {
    q: '¿Se adapta a mi empresa?',
    a: 'Sí. Además del curso general, armamos cursos a medida por área, a partir de los procesos y desafíos reales de cada equipo.',
  },
  {
    q: '¿Es presencial o virtual?',
    a: 'Según lo que necesite tu equipo: presencial en tus oficinas en Buenos Aires o virtual para equipos de todo el país y Latinoamérica.',
  },
  {
    q: '¿Cómo cuidan la información confidencial de la empresa?',
    a: 'Parte de la capacitación es justamente eso: qué información se puede compartir con una herramienta de IA, qué configuraciones conviene usar y qué buenas prácticas seguir para no exponer datos sensibles.',
  },
]

export const diagnosticoFaqs = [
  {
    q: '¿Qué es la madurez digital?',
    a: 'Es el grado en que una empresa usa la tecnología para operar, vender, gestionar y tomar decisiones. Mide herramientas y también cultura: qué tan preparada está la organización para adoptar cambios.',
  },
  {
    q: '¿Qué diferencia hay entre el diagnóstico inicial online y el diagnóstico completo?',
    a: 'El diagnóstico inicial es un cuestionario breve que te da un primer mapa en minutos. El diagnóstico completo suma cuestionarios a varios niveles de la organización, entrevistas con nuestro equipo, análisis de brechas y un informe con roadmap.',
  },
  {
    q: '¿Cuánto tiempo lleva?',
    a: 'Cada participante completa el cuestionario en 15 a 20 minutos. El proceso completo, desde la configuración hasta la entrega del informe, lleva menos de un mes.',
  },
  {
    q: '¿Quiénes de mi empresa tienen que participar?',
    a: 'Idealmente personas de distintos niveles: dirección, mandos medios y equipos operativos. Así podemos comparar percepciones y detectar diferencias entre lo que se planifica y lo que pasa en el día a día.',
  },
  {
    q: '¿Qué pasa después del diagnóstico?',
    a: 'Recibís un roadmap con iniciativas para 0–3, 3–9 y 9–18 meses. Podés implementarlo con tu equipo o con nosotros, a través de [automatizaciones](/automatizacion-de-procesos) y [capacitaciones](/capacitacion-ia).',
  },
]

// Plain-text version of an answer, for structured data
export const plainAnswer = a => a.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
