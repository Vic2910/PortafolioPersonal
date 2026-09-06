# Core Web Vitals — Métricas de Experiencia de Página (Google)

**Organización emisora:** Google (equipo de Chrome / Web.dev), como subconjunto de las señales de "Experiencia de Página" utilizadas en la evaluación de calidad web y en el posicionamiento en buscadores.
**Aplicación en el marco SDD:** conjunto de umbrales cuantitativos obligatorios de rendimiento que el portafolio debe cumplir en producción; su incumplimiento es una de las primeras señales fácticas que un evaluador técnico interpreta como incapacidad para construir sistemas escalables.

## 1. Las tres métricas centrales

| Métrica | Qué mide | Umbral óptimo ("bueno") | Técnica de optimización primaria |
| :---- | :---- | :---- | :---- |
| **Largest Contentful Paint (LCP)** | Tiempo transcurrido hasta que se renderiza en pantalla el elemento visual más representativo (habitualmente la imagen o bloque de texto principal del *hero*). | **≤ 2.5 segundos** | Precarga de fuentes tipográficas mediante `rel="preload"` alojadas localmente (evitando la latencia de resolución DNS de servidores de fuentes de terceros); conversión de imágenes a formatos modernos (AVIF, WebP) con directivas de tamaño adaptativo (`<picture>`, atributo `srcset`). |
| **Interaction to Next Paint (INP)** | Latencia de respuesta visual tras cualquier interacción del usuario (clic, toque, tecla), medida a lo largo de toda la vida de la página (sustituyó a *First Input Delay* como métrica central en marzo de 2024). | **≤ 200 milisegundos** | Hilo principal libre de tareas computacionales bloqueantes o scripts analíticos excesivos; delegación de tareas asíncronas no esenciales fuera de los eventos de entrada de la interfaz. |
| **Cumulative Layout Shift (CLS)** | Estabilidad visual de los elementos de la página durante toda su vida útil (suma de puntuaciones de desplazamiento inesperado de elementos visibles). | **≤ 0.1** | Fijar dimensiones explícitas de ancho y alto (`width`, `height`) o la propiedad CSS `aspect-ratio` en todas las imágenes, vídeos y contenedores interactivos, evitando saltos visuales durante la descarga de recursos. |

## 2. Metodología de evaluación

Google clasifica cada métrica en tres rangos: **bueno**, **necesita mejora** y **deficiente**, calculados sobre el percentil 75 de las visitas de usuarios reales (datos de campo, *Chrome User Experience Report*), no únicamente sobre pruebas de laboratorio. Esto implica que la optimización debe validarse en condiciones reales de red y dispositivo, no solo en el entorno de desarrollo local.

## 3. Arquitectura de renderizado recomendada

Para portafolios técnicos, la arquitectura más adecuada es la **Generación de Sitios Estáticos (Static Site Generation, SSG)** asistida por hidratación selectiva o arquitectura de islas. Herramientas como Astro, Next.js (con exportación estática) o SvelteKit generan documentos HTML previamente procesados en el servidor, reduciendo al mínimo estrictamente necesario el paquete de JavaScript enviado al cliente.

## 4. Infraestructura de despliegue

El despliegue debe gestionarse sobre redes de distribución de contenido (CDN) globales (Cloudflare Pages, Vercel, Netlify), garantizando resolución sobre el protocolo **HTTP/3** y almacenamiento en caché perimetral con latencias objetivo inferiores a 50 milisegundos. El uso de un dominio propio de primer nivel (`.dev`, `.com`) refuerza adicionalmente el perfil profesional de la candidatura, aunque no incide directamente en las métricas de Core Web Vitals.

## 5. Relación con otras normas de este marco

Core Web Vitals opera como la métrica cuantitativa de la subcaracterística **"Eficiencia de Desempeño"** del modelo de calidad ISO/IEC 25010, y complementa a WCAG 2.2 AA: un sitio accesible pero lento, o rápido pero inaccesible, no satisface el estándar de madurez técnica exigido en este marco normativo.

## 6. Aplicación práctica al portafolio de software (guía para el agente de IA)

1. Medir las tres métricas en cada iteración relevante del portafolio, tanto en laboratorio (Lighthouse) como, una vez desplegado, en campo (PageSpeed Insights / CrUX).
2. Priorizar la optimización del LCP en la sección *Hero* (primera pantalla visible), dado que es la primera impresión que recibe el evaluador dentro de los ~7.4 segundos promedio de escaneo inicial.
3. Evitar bibliotecas de JavaScript pesadas (terminales simuladas completas, entornos 3D no esenciales) que degraden el INP sin aportar valor funcional al caso de estudio presentado.
4. Reservar explícitamente las dimensiones de cualquier elemento multimedia embebido (capturas de pantalla de proyectos, videos de demostración) para prevenir regresiones en el CLS.
