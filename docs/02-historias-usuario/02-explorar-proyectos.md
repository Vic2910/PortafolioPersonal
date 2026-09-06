# HU-02: Explorar Proyectos Destacados

## Datos de la Historia

| Campo | Valor |
|:------|:------|
| **ID** | HU-02 |
| **Título** | Explorar Proyectos Destacados |
| **Como** | visitante (reclutador, director técnico) |
| **Quiero** | ver rápidamente los proyectos más relevantes del desarrollador |
| **Para** | evaluar si su experiencia es relevante para la posición o proyecto |
| **Prioridad** | Alta |
| **Estado** | *[Pendiente/En Progreso/Completada]* |

---

## Descripción

El visitante necesita ver una vista general de los proyectos destacados antes de decidir cuál explorar en detalle. La sección debe mostrar:
- Thumbnail o imagen representativa
- Nombre del proyecto
- Tecnologías utilizadas
- Breve descripción (1-2 líneas)
- Enlace al caso de estudio completo

---

## Criterios de Aceptación

### Contenido
1. [ ] Se muestran entre 3 y 5 proyectos destacados
2. [ ] Cada proyecto tiene nombre, thumbnail y descripción breve
3. [ ] Las tecnologías están visibles como badges o tags
4. [ ] Hay un enlace a "Ver más" o caso de estudio para cada proyecto
5. [ ] El orden de proyectos es estratégico (el más impactante primero)

### Diseño
6. [ ] Los proyectos se muestran en formato Bento Grid o tarjetas
7. [ ] Cada tarjeta tiene hover state con efecto visual
8. [ ] El grid es responsive (1 columna en móvil, 2-3 en desktop)
9. [ ] Los thumbnails tienen dimensiones consistentes
10. [ ] El espaciado entre tarjetas es uniforme (gap: 16-24px)

### Accesibilidad
11. [ ] Cada proyecto tiene un encabezado `<h2>` o `<h3>`
12. [ ] Los enlaces a casos de estudio son navegables por teclado
13. [ ] Las imágenes tienen texto alternativo descriptivo
14. [ ] El contraste cumple WCAG 2.2 AA
15. [ ] El foco es visible en cada tarjeta

### Rendimiento
16. [ ] Las imágenes están optimizadas (WebP/AVIF)
17. [ ] El grid carga en menos de 2.5 segundos
18. [ ] No hay layout shift durante la carga

---

## Referencias al Marco Normativo

| Norma | Archivo | Requisito Aplicable |
|:------|:--------|:---------------------|
| WCAG 2.2 AA | `01-wcag-2.2-aa.md` | 1.1.1 Contenido No Textual, 2.4.6 Encabezados |
| Core Web Vitals | `02-core-web-vitals.md` | LCP < 2.5s, CLS < 0.1 |
| ISO 9241 | `03-iso-9241-usabilidad-ux.md` | 9.2.2 Estructuración de información |

---

## Wireframe Propuesto

```
┌─────────────────────────────────────────────────────────────┐
│                    PROYECTOS DESTACADOS                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────┐  │
│  │   [Imagen]      │  │   [Imagen]      │  │  [Imagen]  │  │
│  │                 │  │                 │  │            │  │
│  │ Dashboard       │  │ E-commerce      │  │ API REST   │  │
│  │ Ventas          │  │ Completo        │  │ Documentada│  │
│  │                 │  │                 │  │            │  │
│  │ React, Spring   │  │ Spring, Angular │  │ Next.js    │  │
│  │ Boot, PostgreSQL│  │ MySQL           │  │            │  │
│  │                 │  │                 │  │            │  │
│  │ [Ver caso →]    │  │ [Ver caso →]    │  │ [Ver →]    │  │
│  └─────────────────┘  └─────────────────┘  └────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Notas Adicionales

- Los proyectos deben estar ordenados por relevancia para el objetivo profesional
- El primer proyecto debe ser el más completo y representativo
- Considerar lazy loading para las imágenes de proyectos
- Cada tarjeta debe ser un enlace completo (imagen + texto)

---

**Responsable de implementación:** *[Por definir]*
**Fecha de creación:** *[Fecha actual]*
**Última actualización:** *[Fecha actual]*
