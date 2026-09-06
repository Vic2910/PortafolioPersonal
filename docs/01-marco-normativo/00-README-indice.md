# Marco Normativo — Portafolio de Desarrollador de Software (SDD + OpenCode)

Este directorio contiene el **marco normativo completo**, separado en archivos `.md` individuales por norma, que debe usarse como contexto de referencia (*rules* / *specs*) para cualquier agente de IA —incluido **OpenCode**— que participe en el desarrollo del portafolio bajo una metodología de **Desarrollo Dirigido por Especificaciones (Spec-Driven Development, SDD)**.

Cada archivo contiene la información sustantiva real de la norma correspondiente (identificación oficial, fecha, alcance, requisitos concretos) y una sección final **"Aplicación práctica al portafolio de software (guía para el agente de IA)"**, pensada para ser consumida directamente como instrucción operativa.

## Cómo usar este marco con OpenCode

Se recomienda colocar esta carpeta en la raíz del repositorio (por ejemplo, en `docs/marco-normativo/`) y referenciarla desde el archivo de configuración de reglas del agente (`AGENTS.md`, `opencode.json` u equivalente), de modo que cada tarea de generación o revisión de código cite explícitamente contra qué norma(s) de este conjunto se validó.

## Índice de archivos

### 01 — Leyes de El Salvador
| Archivo | Norma |
| :---- | :---- |
| `01-leyes-el-salvador/01-ley-proteccion-datos-personales.md` | Ley para la Protección de Datos Personales (Decreto 144/2024) |
| `01-leyes-el-salvador/02-ley-ciberseguridad-seguridad-informacion.md` | Ley de Ciberseguridad y Seguridad de la Información (Decreto 143/2024) |
| `01-leyes-el-salvador/03-ley-especial-delitos-informaticos.md` | Ley Especial contra los Delitos Informáticos y Conexos (Decreto 260/2016 y reformas) |
| `01-leyes-el-salvador/04-ley-firma-electronica.md` | Ley de Firma Electrónica (Decreto 133/2015) |
| `01-leyes-el-salvador/05-ley-propiedad-intelectual.md` | Ley de Propiedad Intelectual (Decreto 66/2024) |

### 02 — Seguridad (OWASP)
| Archivo | Norma |
| :---- | :---- |
| `02-seguridad-owasp/01-owasp-top-10-2025.md` | OWASP Top 10:2025 |
| `02-seguridad-owasp/02-owasp-asvs.md` | OWASP Application Security Verification Standard (ASVS) 5.0.0 |
| `02-seguridad-owasp/03-cabeceras-seguridad-http.md` | Cabeceras de Seguridad HTTP (HSTS, CSP, X-Frame-Options, etc.) |

### 03 — Calidad (ISO)
| Archivo | Norma |
| :---- | :---- |
| `03-calidad-iso/01-iso-iec-25010-calidad-software.md` | ISO/IEC 25010 — Modelo de Calidad de Software |
| `03-calidad-iso/02-iso-iec-27001-seguridad-informacion.md` | ISO/IEC 27001 — Sistema de Gestión de Seguridad de la Información |
| `03-calidad-iso/03-iso-9241-usabilidad-ux.md` | ISO 9241-11 / 9241-210 — Ergonomía de la Interacción Humano-Sistema |

### 04 — Accesibilidad y Rendimiento
| Archivo | Norma |
| :---- | :---- |
| `04-accesibilidad-rendimiento/01-wcag-2.2-aa.md` | WCAG 2.2 — Nivel de Conformidad AA (W3C) |
| `04-accesibilidad-rendimiento/02-core-web-vitals.md` | Core Web Vitals (Google) |

### 05 — Prácticas de Ingeniería
| Archivo | Norma |
| :---- | :---- |
| `05-practicas-ingenieria/01-conventional-commits.md` | Conventional Commits 1.0.0 |
| `05-practicas-ingenieria/02-semantic-versioning.md` | Semantic Versioning (SemVer) 2.0.0 |

## Notas metodológicas

- Este marco se elaboró a partir de fuentes oficiales y especializadas verificadas (Diario Oficial de la República de El Salvador, sitios oficiales de OWASP, W3C y Google, y análisis especializado de las normas ISO referenciadas), y resume su contenido sustantivo en redacción propia, evitando la reproducción literal de textos protegidos por derechos de autor (particularmente en el caso de las normas ISO, que son de pago).
- Las leyes salvadoreñas incluidas corresponden al marco vigente más reciente disponible a la fecha de elaboración de este documento (septiembre de 2026). Ante cualquier decisión con implicaciones legales concretas, se recomienda contrastar el texto vigente publicado en el Diario Oficial y, de ser necesario, consultar asesoría legal especializada; este marco tiene fines de referencia técnica para el equipo de desarrollo, no constituye asesoría jurídica.
- Los estándares técnicos (OWASP, ISO, WCAG, Core Web Vitals) evolucionan periódicamente; se recomienda revisar este marco normativo al menos una vez al año o ante el anuncio de una nueva versión mayor de alguno de los estándares referenciados.
