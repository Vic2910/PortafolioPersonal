# Conventional Commits — Especificación de Mensajes de Confirmación

**Origen:** especificación abierta impulsada por la comunidad (inspirada en el formato de commits de Angular), con adopción amplia en la industria del software.
**Versión de referencia:** Conventional Commits 1.0.0
**Aplicación en el marco SDD:** estándar obligatorio del historial de control de versiones del portafolio; su cumplimiento riguroso es uno de los primeros elementos que un líder técnico revisa al auditar un repositorio público durante un proceso de contratación.

## 1. Estructura del mensaje de commit

```
<tipo>[ámbito opcional]: <descripción>

[cuerpo opcional]

[pie(s) opcional(es)]
```

## 2. Tipos de commit estandarizados

| Tipo | Uso |
| :---- | :---- |
| **feat** | Introduce una nueva funcionalidad (se correlaciona con un incremento de versión MINOR en Semantic Versioning). |
| **fix** | Corrige un error (se correlaciona con un incremento de versión PATCH). |
| **docs** | Cambios exclusivamente de documentación. |
| **style** | Cambios que no afectan el significado del código (espacios en blanco, formato, punto y coma faltantes). |
| **refactor** | Cambio de código que no corrige un error ni añade una funcionalidad. |
| **perf** | Cambio de código que mejora el rendimiento. |
| **test** | Adición o corrección de pruebas existentes. |
| **build** | Cambios que afectan el sistema de compilación o dependencias externas (npm, webpack, etc.). |
| **ci** | Cambios en archivos y scripts de configuración de integración continua. |
| **chore** | Otros cambios que no modifican archivos de código fuente ni de pruebas (mantenimiento general). |

## 3. Indicación de cambios incompatibles (Breaking Changes)

Un cambio incompatible con versiones anteriores se señala de dos formas posibles (ambas correlacionadas con un incremento de versión MAJOR):

1. Añadiendo un signo de exclamación inmediatamente antes de los dos puntos: `feat!: eliminar endpoint de la API v1`.
2. Incluyendo un pie de página `BREAKING CHANGE:` seguido de la descripción del cambio.

## 4. Reglas de la especificación

- La descripción debe redactarse en **modo imperativo, tiempo presente** ("agrega", no "agregado" o "agregando"), en minúsculas y sin punto final.
- El ámbito (*scope*), opcional, se coloca entre paréntesis inmediatamente después del tipo, indicando la sección del código afectada: `feat(formulario-contacto): agrega validación de campo de correo`.
- Los mensajes deben ser **atómicos**: un commit debe representar un único cambio lógico coherente, no una mezcla de correcciones y nuevas funcionalidades no relacionadas.

## 5. Beneficios verificables para el evaluador técnico

- Permite generar automáticamente un `CHANGELOG.md` a partir del historial de commits.
- Permite determinar automáticamente el siguiente número de versión semántica del proyecto.
- Facilita a un revisor externo comprender, sin necesidad de leer el diff completo, la naturaleza e intención de cada cambio incluido en el historial del repositorio.

## 6. Aplicación práctica al portafolio de software (guía para el agente de IA)

1. Todo commit generado por el agente de IA en nombre del desarrollador debe seguir estrictamente el formato `<tipo>[ámbito]: <descripción>`, sin excepción, incluyendo en tareas de mantenimiento rutinario.
2. Antes de fusionar una serie de cambios experimentales o de una sesión de trabajo con el agente, reescribir el historial (squash / rebase interactivo) para producir commits atómicos y descriptivos, evitando mensajes genéricos como "cambios varios" o "wip".
3. Usar el prefijo `feat!` o el pie `BREAKING CHANGE:` explícitamente cuando una modificación de la arquitectura del portafolio invalide una URL pública, una API expuesta o un contrato de datos existente.
4. Configurar, si el flujo de trabajo lo permite, un *hook* de validación de mensajes de commit (por ejemplo, `commitlint`) que rechace automáticamente mensajes no conformes a la especificación.
