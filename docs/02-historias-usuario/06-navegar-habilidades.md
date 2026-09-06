# HU-06: Navegar Habilidades Técnicas

## Datos de la Historia

| Campo | Valor |
|:------|:------|
| **ID** | HU-06 |
| **Título** | Navegar Habilidades Técnicas |
| **Como** | visitante (reclutador técnico, director de ingeniería) |
| **Quiero** | ver el stack tecnológico del desarrollador organizado por categoría |
| **Para** | evaluar si sus habilidades coinciden con los requisitos del puesto |
| **Prioridad** | Media |
| **Estado** | *[Pendiente/En Progreso/Completada]* |

---

## Descripción

Las habilidades técnicas deben presentarse de forma taxonómica, no como una lista plana de logos. La organización por categorías (Backend, Frontend, Bases de Datos, Herramientas) permite al evaluador encontrar rápidamente lo que busca.

---

## Criterios de Aceptación

### Contenido
1. [ ] Las habilidades están organizadas por categoría
2. [ ] Cada categoría tiene un encabezado claro
2. [ ] Cada tecnología tiene un badge o icono representativo
3. [ ] Se indica el nivel de dominio (Básico/Intermedio/Avanzado)
4. [ ] Se muestra en qué proyectos se ha utilizado cada tecnología

### Diseño
5. [ ] Las categorías se muestran en secciones visuales
6. [ ] Los badges tienen estilo consistente
7. [ ] El layout es responsive (columnas adaptativas)
8. [ ] Hay suficiente contraste entre badges y fondo

### Accesibilidad
9. [ ] Cada categoría tiene encabezado semántico (h2/h3)
10. [ ] Los badges tienen texto alternativo
11. [ ] La sección es navegable por teclado
12. [ ] El contraste cumple WCAG 2.2 AA

---

## Referencias al Marco Normativo

| Norma | Archivo | Requisito Aplicable |
|:------|:--------|:---------------------|
| WCAG 2.2 AA | `01-wcag-2.2-aa.md` | 1.3.1 Info y Relaciones |
| ISO 9241 | `03-iso-9241-usabilidad-ux.md` | 9.2.2 Estructuración de información |

---

## Estructura Propuesta

```
HABILIDADES TÉCNICAS

Backend
[Java] [Spring Boot] [C#] [ASP.NET] [Node.js]

Frontend
[React] [Angular] [Vue.js] [Next.js] [TypeScript]

Bases de Datos
[PostgreSQL] [MySQL] [MongoDB]

Herramientas
[Git] [Docker] [AWS] [Linux]

Patrones y Arquitectura
[REST] [MVC] [Microservicios] [Clean Architecture]
```

---

**Responsable de implementación:** *[Por definir]*
**Fecha de creación:** *[Fecha actual]*
**Última actualización:** *[Fecha actual]*
