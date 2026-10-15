# HU-04: Descargar CV

## Ajuste 2026-10-15: idiomas y estabilidad visual

- Selector accesible Español/Inglés junto al botón, con Español predeterminado.
- Los estados de descarga no modifican las dimensiones de los botones ni estiran el CTA de proyectos.
- Traducir encabezados y textos narrativos; conservar identidad, contactos, instituciones y tecnologías de la fuente compartida.
- Las traducciones se vinculan al texto original exacto: si cambia un texto sin traducción vigente, informar del problema al solicitar inglés, sin generar un CV mezclado ni usar traducciones obsoletas. Español siempre consume el contenido actual.
- Validar selección, PDF en ambos idiomas, errores, teclado y geometría antes/después de descargar en escritorio y móvil.
- Normas: `docs/01-marco-normativo/01-wcag-2.2-aa.md` (etiquetas, teclado y estados), `docs/01-marco-normativo/03-iso-9241-usabilidad-ux.md` (estabilidad y retroalimentación) y `docs/01-marco-normativo/01-iso-iec-25010-calidad-software.md` (consistencia).

## Especificación de implementación (2026-10-14)

- Generar un PDF nuevo en el navegador en cada pulsación, sin mantener un CV estático ni copiar datos del perfil.
- Consumir `heroData`, `aboutData`, `skills` y la misma consulta de proyectos de Supabase que usa el portafolio; volver a consultar en cada descarga. No usar proyectos de ejemplo como sustituto ante errores.
- Una columna A4, texto seleccionable, márgenes y paginación automáticos; perfil, formación, competencias y proyectos. Omitir secciones vacías y enlaces provisionales. No inferir experiencia laboral ni fechas ausentes.
- Botones en Hero y Contacto con bloqueo durante generación, estado anunciado y error recuperable mediante nueva pulsación. Si falla la consulta o generación, no descargar un CV incompleto.
- Cargar el generador mediante importación dinámica para evitar incorporarlo al paquete inicial.
- Validar PDF real mediante extracción de texto, paginación y revisión visual; probar descarga, fallo/reintento y cambios entre descargas.

Referencias normativas aplicables (rutas reales):
`docs/01-marco-normativo/01-wcag-2.2-aa.md` (teclado, foco, estados),
`docs/01-marco-normativo/03-iso-9241-usabilidad-ux.md` (retroalimentación y recuperación),
`docs/01-marco-normativo/01-iso-iec-25010-calidad-software.md` (fiabilidad y mantenibilidad),
`docs/01-marco-normativo/02-core-web-vitals.md` (carga diferida).

Presentación basada en las recomendaciones de claridad, concisión y jerarquía de
[Harvard](https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/) y
[Oxford](https://www.ox.ac.uk/careers/careers-guidance/job-search-and-applications/writing-applications/cvs).
Conservar el orden editorial de proyectos, que no tienen fechas; formación en orden cronológico inverso según su fuente.

## Datos de la Historia

| Campo | Valor |
|:------|:------|
| **ID** | HU-04 |
| **Título** | Descargar CV |
| **Como** | visitante (reclutador de RRHH, reclutador técnico) |
| **Quiero** | descargar el CV del desarrollador en formato PDF |
| **Para** | evaluar su perfil formal y guardarlo para el proceso de selección |
| **Prioridad** | Alta |
| **Estado** | *[Pendiente/En Progreso/Completada]* |

---

## Descripción

El CV es el documento formal que complementa el portafolio. Debe ser fácil de encontrar, descargar y leer. El formato PDF optimizado para ATS (Applicant Tracking System) es esencial para que los sistemas de seguimiento de candidatos puedan procesarlo.

---

## Criterios de Aceptación

### Contenido
1. [ ] El CV está disponible en formato PDF
2. [ ] El CV tiene nombre profesional (ej: `CV-Victor-Arevalo-Desarrollador.pdf`)
3. [ ] El CV tiene estructura ATS-friendly (sin tablas, columnas simples)
4. [ ] Incluye: perfil, habilidades, proyectos, educación, contacto
5. [ ] El CV tiene menos de 1MB de tamaño

### Accesibilidad
6. [ ] Hay al menos un botón de descarga visible en Hero Section
7. [ ] Hay otro botón de descarga en sección de contacto
8. [ ] El botón tiene texto descriptivo (no solo "Descargar")
9. [ ] El botón es navegable por teclado
10. [ ] El foco es visible en el botón

### Diseño
11. [ ] El botón de descarga tiene un icono representativo
12. [ ] El botón tiene hover state y focus state
13. [ ] El botón es responsive (se adapta a móvil)

### Rendimiento
14. [ ] La descarga inicia en menos de 2 segundos
15. [ ] El PDF está optimizado para web

---

## Referencias al Marco Normativo

| Norma | Archivo | Requisito Aplicable |
|:------|:--------|:---------------------|
| WCAG 2.2 AA | `01-wcag-2.2-aa.md` | 2.4.4 Propósito del Enlace |
| ISO 9241 | `03-iso-9241-usabilidad-ux.md` | 9.3.1 Control del usuario |

---

## Notas Adicionales

- El CV debe actualizarse periódicamente
- Considerar mantener una versión online (HTML) además del PDF
- El CV debe ser consistente con la información del portafolio
- Incluir palabras clave relevantes para ATS

---

**Responsable de implementación:** *[Por definir]*
**Fecha de creación:** *[Fecha actual]*
**Última actualización:** *[Fecha actual]*
