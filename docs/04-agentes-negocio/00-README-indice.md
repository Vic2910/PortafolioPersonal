# Agentes de Negocio — PortafolioVRAS

> **Propósito:** Definir los diferentes tipos de agentes (roles/usuarios) que interactuarán con el portafolio, sus objetivos, necesidades y recorridos esperados.

---

## Estructura del Directorio

```
04-agentes-negocio/
├── 00-README-indice.md              # Este archivo
├── 01-reclutador-tecnico.md         # Reclutador técnico / Director de ingeniería
├── 02-reclutador-rrhh.md            # Reclutador de RRHH / Non-technical
├── 03-cliente-freelance.md          # Posible cliente freelance
├── 04-desarrollador-par.md          # Desarrollador / Par técnico
└── 05-administrador.md              # Administrador del portafolio
```

---

## Índice de Agentes

| ID | Agente | Objetivo Principal | Prioridad |
|:---|:-------|:-------------------|:----------|
| AG-01 | [Reclutador Técnico](01-reclutador-tecnico.md) | Evaluar idoneidad técnica para contratación | Alta |
| AG-02 | [Reclutador RRHH](02-reclutador-rrhh.md) | Verificar requisitos básicos y profesionalismo | Alta |
| AG-03 | [Cliente Freelance](03-cliente-freelance.md) | Evaluar capacidad para resolver su problema | Media |
| AG-04 | [Desarrollador Par](04-desarrollador-par.md) | Evaluar calidad técnica y aprender | Media |
| AG-05 | [Administrador](05-administrador.md) | Gestionar y mantener el portafolio | Baja |

---

## Mapa de Relaciones

```
┌─────────────────────────────────────────────────────────────────┐
│                        PORTAFOLIO VRAS                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Reclutador │    │   Reclutador │    │   Cliente   │         │
│  │   Técnico    │    │    RRHH     │    │  Freelance  │         │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘         │
│         │                   │                   │                 │
│         ▼                   ▼                   ▼                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    SECCIONES DEL PORTAFOLIO               │   │
│  │  Hero → Proyectos → Habilidades → Sobre Mí → Contacto   │   │
│  └─────────────────────────────────────────────────────────┘   │
│         │                   │                   │                 │
│         ▼                   ▼                   ▼                 │
│  ┌─────────────┐    ┌─────────────┐                             │
│  │ Desarrollador│    │Administrador│                             │
│  │     Par      │    │             │                             │
│  └─────────────┘    └─────────────┘                             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Recursos Comunes a Todos los Agentes

| Recurso | Descripción |
|:--------|:------------|
| **Hero Section** | Identidad clara del desarrollador |
| **Proyectos** | Catálogo de trabajos realizados |
| **Habilidades** | Stack tecnológico disponible |
| **Contacto** | Canales de comunicación |

---

## Criterios de Éxito por Agente

| Agente | Criterio de Éxito | Métrica |
|:-------|:------------------|:--------|
| Reclutador Técnico | Decidir si programar entrevista | < 5 minutos de evaluación |
| Reclutador RRHH | Verificar profesionalismo | < 2 minutos de revisión |
| Cliente Freelance | Iniciar conversación | Completar formulario de contacto |
| Desarrollador Par | Encontrar código de calidad | Explorar GitHub y proyectos |
| Administrador | Realizar mantenimiento | Acceder al admin panel |

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*
