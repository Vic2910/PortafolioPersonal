# HU-01: Hero Section — Identidad Profesional

## Datos de la Historia

| Campo | Valor |
|:------|:------|
| **ID** | HU-01 |
| **Título** | Hero Section — Identidad Profesional |
| **Como** | visitante (reclutador, director técnico, cliente potencial) |
| **Quiero** | identificar inmediatamente quién es el desarrollador y qué ofrece |
| **Para** | decidir si continúo explorando el portafolio o me voy |
| **Prioridad** | Alta |
| **Estado** | *[Pendiente/En Progreso/Completada]* |

---

## Descripción

Cuando un visitante llega al portafolio, en los primeros 5 segundos debe poder responder:
1. ¿Quién es esta persona?
2. ¿Qué tipo de desarrollador es?
3. ¿Qué tecnologías domina?
4. ¿Cómo puedo contactarlo o ver su trabajo?

El Hero Section es la primera impresión y debe ser clara, profesional y directa.

---

## Criterios de Aceptación

### Contenido
1. [ ] El nombre del desarrollador es visible y prominente
2. [ ] El rol profesional aparece claramente (Full Stack Developer)
3. [ ] Las tecnologías principales están listadas (Java, C#, React, etc.)
4. [ ] Hay un CTA (Call to Action) principal visible
5. [ ] Hay al menos 2 CTAs secundarios (Ver Proyectos, Contactar)

### Diseño
6. [ ] El Hero ocupa al menos el 100% del viewport en pantallas desktop
7. [ ] En móvil, el contenido es legible sin scroll horizontal
8. [ ] La paleta de colores sigue la proporción 60-30-10
9. [ ] La tipografía es sans-serif y legible
10. [ ] El diseño es mobile-first

### Accesibilidad
11. [ ] El Hero tiene un encabezado `<h1>` semántico
12. [ ] Los CTAs son botones o enlaces con texto descriptivo
13. [ ] El contraste de colores cumple WCAG 2.2 AA (4.5:1 mínimo)
14. [ ] El Hero es navegable por teclado (Tab)
15. [ ] El foco es visible en los elementos interactivos

### Rendimiento
16. [ ] El Hero carga en menos de 2.5 segundos (LCP)
17. [ ] No hay bloques que impidan la interacción (INP < 200ms)
18. [ ] No hay saltos de diseño (CLS < 0.1)

---

## Referencias al Marco Normativo

| Norma | Archivo | Requisito Aplicable |
|:------|:--------|:---------------------|
| WCAG 2.2 AA | `01-wcag-2.2-aa.md` | 1.3.1 Info y Relaciones, 1.4.3 Contraste Mínimo |
| Core Web Vitals | `02-core-web-vitals.md` | LCP < 2.5s, INP < 200ms, CLS < 0.1 |
| ISO 9241 | `03-iso-9241-usabilidad-ux.md` | 9.2.1 Visualización de información |

---

## Wireframe Propuesto

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo/Nombre]                              [GitHub] [LinkedIn] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                   VICTOR ARÉVALO SIERRA                     │
│                                                             │
│               Full Stack Developer                          │
│                                                             │
│       Java · C# · React · Spring Boot · ASP.NET            │
│                                                             │
│         [Ver Proyectos]        [Contactar]                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Notas Adicionales

- El Hero debe ser la primera sección visible sin scroll
- Los CTAs deben tener hover states y focus states visibles
- El texto debe ser scannable en menos de 5 segundos
- Considerar animación sutil pero no distraer del contenido

---

**Responsable de implementación:** *[Por definir]*
**Fecha de creación:** *[Fecha actual]*
**Última actualización:** *[Fecha actual]*
