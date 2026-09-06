# HU-03: Ver Caso de Estudio Detallado

## Datos de la Historia

| Campo | Valor |
|:------|:------|
| **ID** | HU-03 |
| **Título** | Ver Caso de Estudio Detallado |
| **Como** | visitante (director técnico, reclutador técnico) |
| **Quiero** | entender la narrativa técnica de un proyecto específico |
| **Para** | evaluar el criterio de ingeniería y capacidad de resolución de problemas |
| **Prioridad** | Alta |
| **Estado** | *[Pendiente/En Progreso/Completada]* |

---

## Descripción

Un caso de estudio es más que una galería de capturas. Debe contar la historia completa del proyecto:
1. ¿Qué problema resolvía?
2. ¿Qué restricciones existían?
3. ¿Qué decisiones técnicas se tomaron?
4. ¿Por qué se eligieron esas tecnologías sobre otras?
5. ¿Cuál fue el resultado medible?

---

## Criterios de Aceptación

### Contenido
1. [ ] El caso tiene un resumen ejecutivo claro (1-2 párrafos)
2. [ ] Se describe el problema o necesidad que motivó el proyecto
3. [ ] Se listan las restricciones técnicas (presupuesto, tiempo, tecnologías)
4. [ ] Se documentan las decisiones arquitectónicas y trade-offs
5. [ ] Se incluyen métricas de impacto (si están disponibles)
6. [ ] Hay enlaces a repositorio de código y demo en vivo

### Estructura
7. [ ] El caso sigue una estructura narrativa coherente
8. [ ] Hay encabezados claros para cada sección
9. [ ] Los fragmentos de código son relevantes y están comentados
10. [ ] Hay diagramas de arquitectura o flujo
11. [ ] El caso es escaneable (bullet points, tablas)

### Diseño
12. [ ] El caso tiene un layout de lectura cómodo (ancho máximo ~700px)
13. [ ] Los fragmentos de código tienen syntax highlighting
14. [ ] Los diagramas son legibles y están explicados
15. [ ] El caso es responsive

### Accesibilidad
16. [ ] Los encabezados siguen jerarquía semántica (h1 → h2 → h3)
17. [ ] Las imágenes y diagramas tienen texto alternativo
18. [ ] Los enlaces externos indican que abren en nueva ventana
19. [ ] El contenido es navegable por teclado
20. [ ] El contraste cumple WCAG 2.2 AA

---

## Estructura del Caso de Estudio

```markdown
# [Nombre del Proyecto]

## Resumen Ejecutivo
[Breve descripción del proyecto, rol individual, resultado]

## Problema y Contexto
[Qué problema se resolvía, para quién, por qué importaba]

## Restricciones
[Presupuesto, tiempo, tecnologías obligatorias, etc.]

## Decisiones Técnicas
### Arquitectura
[Diagrama y justificación]
### Tecnologías Seleccionadas
[Por qué estas sobre otras alternativas]
### Patrones de Diseño
[Patrones aplicados y por qué]

## Implementación
[Fragmentos de código clave, explicación de lógica]

## Resultados y Métricas
[Datos cuantificables: latencia, usuarios, errores, etc.]

## Lecciones Aprendidas
[Qué funcionó, qué no, qué se haría diferente]

## Enlaces
- [Repositorio](URL)
- [Demo en vivo](URL)
- [Documentación](URL)
```

---

## Referencias al Marco Normativo

| Norma | Archivo | Requisito Aplicable |
|:------|:--------|:---------------------|
| WCAG 2.2 AA | `01-wcag-2.2-aa.md` | 1.3.1 Info y Relaciones, 2.4.6 Encabezados |
| ISO 9241 | `03-iso-9241-usabilidad-ux.md` | 9.2.1 Visualización de información |
| ISO 25010 | `01-iso-iec-25010-calidad-software.md` | Funcionalidad, Fiabilidad, Usabilidad |

---

## Notas Adicionales

- Los casos de estudio son el contenido más valioso del portafolio
- Deben demostrar pensamiento analítico, no solo habilidad técnica
- Los evaluadores buscan justificación de decisiones, no solo código
- Incluir tanto éxitos como limitaciones muestra madurez

---

**Responsable de implementación:** *[Por definir]*
**Fecha de creación:** *[Fecha actual]*
**Última actualización:** *[Fecha actual]*
