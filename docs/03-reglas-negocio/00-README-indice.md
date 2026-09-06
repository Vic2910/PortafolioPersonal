# Reglas de Negocio — PortafolioVRAS

> **Propósito:** Este directorio contiene las reglas de negocio que gobiernan el comportamiento del portafolio. Cada regla define una restricción o validación que el sistema debe cumplir.

---

## Estructura del Directorio

```
03-reglas-negocio/
├── 00-README-indice.md              # Este archivo
├── 01-contenido.md                  # Reglas de contenido y presentación
├── 02-accesibilidad.md              # Reglas de accesibilidad WCAG
├── 03-rendimiento.md                # Reglas de rendimiento y performance
├── 04-seguridad.md                  # Reglas de seguridad
├── 05-formulario-contacto.md        # Reglas del formulario de contacto
├── 06-proyectos.md                  # Reglas de presentación de proyectos
└── 07-diseno.md                     # Reglas de diseño visual
```

---

## Índice de Reglas

| ID | Regla | Categoría | Prioridad |
|:---|:------|:----------|:----------|
| RN-01 | [Contenido](01-contenido.md) | Presentación | Alta |
| RN-02 | [Accesibilidad](02-accesibilidad.md) | Accesibilidad | Alta |
| RN-03 | [Rendimiento](03-rendimiento.md) | Técnica | Alta |
| RN-04 | [Seguridad](04-seguridad.md) | Seguridad | Alta |
| RN-05 | [Formulario de Contacto](05-formulario-contacto.md) | Funcionalidad | Alta |
| RN-06 | [Proyectos](06-proyectos.md) | Contenido | Media |
| RN-07 | [Diseño](07-diseno.md) | Visual | Media |

---

## Formato de Regla

Cada regla sigue el formato:

```markdown
# RN-XX: [Título de la Regla]

## Definición
[Descripción clara de la regla]

## Criterios de Validación
1. [Criterio 1]
2. [Criterio 2]

## Referencias
- [Norma o estándar aplicable]

## Excepciones
- [Cuándo NO aplica la regla]
```

---

## Relación con Marco Normativo

Las reglas de negocio se validan contra los siguientes estándares:

| Categoría | Archivo | Aplicación |
|:----------|:--------|:-----------|
| Accesibilidad | `01-wcag-2.2-aa.md` | Requisitos de accesibilidad |
| Rendimiento | `02-core-web-vitals.md` | Métricas de rendimiento |
| Seguridad | `01-owasp-top-10-2025.md` | Vulnerabilidades |
| Seguridad | `03-cabeceras-seguridad-http.md` | Cabeceras HTTP |
| Calidad | `01-iso-iec-25010-calidad-software.md` | Calidad de software |
| Usabilidad | `03-iso-9241-usabilidad-ux.md` | Experiencia de usuario |

---

**Última actualización:** *[Fecha]*
**Próxima revisión:** *[Fecha]*
