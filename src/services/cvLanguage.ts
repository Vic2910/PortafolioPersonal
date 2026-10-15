export type CvLanguage = 'es' | 'en'

export class MissingCvTranslationError extends Error {
  constructor() {
    super('Falta actualizar una traducción del CV. Puedes descargarlo en español.')
    this.name = 'MissingCvTranslationError'
  }
}

// Exact source text is the key: editing Spanish invalidates an old translation.
// Names, institutions, contact details and technologies are preserved separately.
const english: Record<string, string> = {
  'Soy Victor Rafael Arévalo Sierra, desarrollador Full Stack de Santa Ana, El Salvador. Me apasiona crear soluciones web completas que resuelvan problemas reales. Aunque soy junior en experiencia profesional, cuento con sólidos proyectos académicos que demuestran mis habilidades técnicas.':
    'I am Victor Rafael Arévalo Sierra, a Full Stack developer from Santa Ana, El Salvador. I enjoy building complete web solutions that solve real problems. As an early-career developer, I have a strong portfolio of academic projects that demonstrate my technical skills.',
  'Ingeniería en Desarrollo de Software': 'Software Development Engineering',
  'Formación en desarrollo de software, arquitectura y bases de datos.': 'Studies in software development, architecture and databases.',
  'Sistema simulado de una cafetería salvadoreña ficticia, donde se tenía un control de pedidos, ventas y gestiones graficas sobre catalogos y productos':
    'Simulated management system for a fictional Salvadoran coffee shop, with order and sales tracking and graphical interfaces for managing catalogs and products.',
  'Dashboard de ventas para e-commerce con métricas en tiempo real, gráficas interactivas y reportes exportables. Desarrollado con ASP.NET y SQL Server.':
    'E-commerce sales dashboard with real-time metrics, interactive charts and exportable reports. Built with ASP.NET and SQL Server.',
  'Plataforma de comercio electrónico completa con carrito de compras, pasarela de pagos, gestión de inventario y panel de administración.':
    'Complete e-commerce platform with a shopping cart, payment gateway, inventory management and an administration panel.',
  'API RESTful con documentación Swagger completa, autenticación JWT, validación de datos y tests automatizados.':
    'RESTful API with complete Swagger documentation, JWT authentication, data validation and automated tests.',
  'Aplicación de mensajería en tiempo real con WebSockets, salas de chat privadas y grupales, y notificaciones push.':
    'Real-time messaging application with WebSockets, private and group chat rooms, and push notifications.',
  'Sistema de gestión de inventarios con operaciones CRUD completas, reportes y exportación a Excel.':
    'Inventory management system with complete CRUD operations, reporting and Excel export.',
  'Sistema de autenticación y autorización con roles, recuperación de contraseña y autenticación de dos factores.':
    'Authentication and authorization system with roles, password recovery and two-factor authentication.',
}

export function translateCvText(value: string, language: CvLanguage): string {
  if (language === 'es' || !value.trim()) return value
  const translated = english[value]
  if (!translated) throw new MissingCvTranslationError()
  return translated
}

export const cvLabels = {
  es: { profile: 'Perfil profesional', education: 'Formación académica', skills: 'Competencias técnicas',
    projects: 'Proyectos', tools: 'Herramientas', technologies: 'Tecnologías', repository: 'Repositorio' },
  en: { profile: 'Professional profile', education: 'Education', skills: 'Technical skills',
    projects: 'Projects', tools: 'Tools', technologies: 'Technologies', repository: 'Repository' },
}
