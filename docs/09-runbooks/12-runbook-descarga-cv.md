# Descarga dinámica de CV (HU-04)

## Español e inglés (2026-10-15)

El selector «Idioma del CV» permite descargar español (predeterminado) o inglés.
Los nombres de archivo terminan en `-ES.pdf` o `-EN.pdf`, y el PDF declara su idioma.
Los controles conservan altura y anchura durante generación, éxito y error; los
mensajes se sitúan fuera de la fila y se anuncian con una región de estado.

`src/services/cvLanguage.ts` contiene etiquetas y traducciones editoriales de los
textos narrativos actuales, incluidos los proyectos públicos consultados. Las
claves son los textos originales completos: al cambiar una descripción, actualizar
su traducción allí. Si falta una traducción exacta, se bloquea únicamente la
descarga inglesa con un mensaje específico y se ofrece español; nunca se exporta
una traducción vieja ni un documento parcialmente traducido. No se realizan
traducciones automáticas mediante servicios externos. Identidad, instituciones,
nombres de proyectos, tecnologías y enlaces se leen de las fuentes originales.

Las pruebas E2E se ejecutan en escritorio y móvil (320px), comprueban ambos
idiomas y comparan las dimensiones antes y después de descargar.
Validación del ajuste: build y ESLint correctos, 16 pruebas unitarias y los dos
escenarios E2E aprobados. Capturas de escritorio/móvil y PDF inglés revisados
visualmente, sin deformación de controles ni desbordamiento horizontal.

El botón compartido `src/components/common/DownloadCvButton.tsx` se usa en Hero y
Contacto. Importa `src/services/cv.ts` únicamente al descargar. jsPDF genera texto
seleccionable en A4, una columna, Helvetica, márgenes de 48 puntos y numeración.
La tipografía estándar cubre el español actual; antes de incorporar alfabetos
no latinos será necesario incrustar una fuente Unicode y ampliar las pruebas.

## Fuentes y actualización

- Identidad, ubicación y contacto: `src/config/hero.ts`.
- Perfil y formación: `src/data/about.ts` (mantener formación de más reciente a antigua).
- Competencias: `src/data/skills.ts`.
- Proyectos: `src/services/projects.ts`, compartido con `useProjects` y consultado
  nuevamente en cada descarga, sin sustituir errores con datos de ejemplo.

Los cambios de archivos fuente se reflejan tras publicar la nueva versión del
sitio; los cambios de Supabase se leen en la siguiente descarga. No hay un PDF
que actualizar manualmente. Se conserva el orden editorial de proyectos porque
el modelo actual no contiene fechas. No se inventa experiencia profesional,
idiomas, teléfonos ni logros cuantificados. Se omiten secciones vacías y URLs
provisionales como `#`.

## Fallos

El botón queda deshabilitado durante la operación y anuncia su estado. La consulta
tiene un límite de 15 segundos. Ante errores de red, importación, generación o
guardado, se muestra un mensaje que permite reintentar con otra pulsación; no se
guarda un documento parcial. El mensaje de éxito indica el inicio de la descarga:
el navegador controla el guardado final y el usuario puede cancelarlo.

## Verificación

El build comprueba también los tipos de las pruebas en `src/`. Por ello,
`@types/node` debe declararse explícitamente en `devDependencies`: las pruebas
PDF usan `node:url` y una referencia de tipos local. No depender de instalaciones
transitivas o del entorno del desarrollador. Esta corrección se valida contra
`docs/01-marco-normativo/01-iso-iec-25010-calidad-software.md` (portabilidad y fiabilidad).

```bash
npm run typecheck
npm run lint
npm test -- --run
npm run build
npm run test:e2e:cv
```

La prueba E2E usa Edge instalado y un servidor Vite aislado en el puerto 5174.
Intercepta Supabase con datos de prueba, sin credenciales ni cambios remotos.
Verifica los dos botones con teclado, archivos PDF descargados, actualización
entre descargas y fallo/reintento; renderiza las páginas en `tmp/pdfs/` para
inspección visual. Los archivos de descarga quedan en `test-results/`, ignorados
por Git. Las pruebas unitarias extraen texto del PDF real, verifican acentos,
campos ausentes, tamaño, márgenes y paginación con contenido largo.

Normas de validación: `docs/01-marco-normativo/01-wcag-2.2-aa.md`,
`docs/01-marco-normativo/03-iso-9241-usabilidad-ux.md`,
`docs/01-marco-normativo/01-iso-iec-25010-calidad-software.md` y
`docs/01-marco-normativo/02-core-web-vitals.md`.
No se certifican métricas de campo ni conformidad PDF/UA: la salida es un PDF
de texto, no un documento etiquetado para accesibilidad completa.

Validación realizada el 2026-10-14: TypeScript, ESLint, build, 13 pruebas unitarias
y un escenario E2E en Edge correctos. PDF renderizado e inspeccionado visualmente.
La prueba E2E usa proyectos controlados: no modifica ni certifica la disponibilidad
del servicio Supabase de producción. El build advierte de un paquete principal
mayor de 500 kB; el generador CV queda en un paquete diferido independiente.
La auditoría señala dos dependencias de desarrollo preexistentes vulnerables
(`brace-expansion`, `source-map-js`), fuera de esta funcionalidad.
