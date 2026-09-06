# 08-Roadmaps: Índice

> **Propósito:** Documentar la hoja de ruta de desarrollo del portafolio, organizada por features/funcionalidades. Cada roadmap describe los pasos detallados para implementar una funcionalidad específica.

---

## Visión General

El desarrollo del portafolio se divide en **17 features**, agrupadas en categorías:

| Categoría | Features | Descripción |
|:----------|:---------|:------------|
| **Core** | 1-7 | Funcionalidades principales del portafolio |
| **Admin** | 8-9 | Panel de administración |
| **Calidad** | 10-14 | Seguridad, accesibilidad, SEO, performance, testing |
| **DevOps** | 15-17 | CI/CD, deploy, dominio |

---

## Estructura del Directorio

```
08-roadmaps/
├── 00-README-indice.md                    # Este archivo
├── 01-feature-setup-proyecto.md           # Inicialización del proyecto
├── 02-feature-herosection.md              # Hero Section
├── 03-feature-explorar-proyectos.md       # Exploración de proyectos
├── 04-feature-caso-estudio.md             # Caso de estudio detallado
├── 05-feature-habilidades.md              # Sección de habilidades
├── 06-feature-sobre-mi.md                # Biografía profesional
├── 07-feature-formulario-contacto.md      # Formulario de contacto
├── 08-feature-admin-panel.md              # Panel de administración
├── 09-feature-auth-admin.md               # Autenticación admin
├── 10-feature-seguridad.md                # Headers OWASP, CSP
├── 11-feature-accesibilidad.md            # WCAG 2.2 AA
├── 12-feature-seo.md                      # SEO técnico
├── 13-feature-performance.md              # Optimización rendimiento
├── 14-feature-testing.md                  # Pruebas automatizadas
├── 15-feature-cicd.md                     # CI/CD pipeline
├── 16-feature-deploy-produccion.md        # Despliegue a producción
└── 17-feature-dominio-personalizado.md    # Configuración de dominio
```

---

## Índice de Features

### Core (Funcionalidades Principales)

| ID | Feature | Dependencias | Prioridad |
|:---|:--------|:-------------|:----------|
| F-01 | [Setup Proyecto](01-feature-setup-proyecto.md) | Ninguna | Alta |
| F-02 | [Hero Section](02-feature-herosection.md) | F-01 | Alta |
| F-03 | [Explorar Proyectos](03-feature-explorar-proyectos.md) | F-01 | Alta |
| F-04 | [Caso de Estudio](04-feature-caso-estudio.md) | F-03 | Alta |
| F-05 | [Habilidades](05-feature-habilidades.md) | F-01 | Media |
| F-06 | [Sobre Mí](06-feature-sobre-mi.md) | F-01 | Media |
| F-07 | [Formulario Contacto](07-feature-formulario-contacto.md) | F-01 | Alta |

### Admin (Panel de Administración)

| ID | Feature | Dependencias | Prioridad |
|:---|:--------|:-------------|:----------|
| F-08 | [Admin Panel](08-feature-admin-panel.md) | F-01, F-09 | Media |
| F-09 | [Auth Admin](09-feature-auth-admin.md) | F-01 | Alta |

### Calidad

| ID | Feature | Dependencias | Prioridad |
|:---|:--------|:-------------|:----------|
| F-10 | [Seguridad](10-feature-seguridad.md) | F-01 | Alta |
| F-11 | [Accesibilidad](11-feature-accesibilidad.md) | F-01 | Alta |
| F-12 | [SEO](12-feature-seo.md) | F-01 | Alta |
| F-13 | [Performance](13-feature-performance.md) | F-01 | Media |
| F-14 | [Testing](14-feature-testing.md) | F-01 | Media |

### DevOps

| ID | Feature | Dependencias | Prioridad |
|:---|:--------|:-------------|:----------|
| F-15 | [CI/CD](15-feature-cicd.md) | F-01 | Alta |
| F-16 | [Deploy Producción](16-feature-deploy-produccion.md) | F-15 | Alta |
| F-17 | [Dominio Personalizado](17-feature-dominio-personalizado.md) | F-16 | Media |

---

## Orden de Implementación Recomendado

```
FASE 1: Fundamentos
└── F-01: Setup Proyecto

FASE 2: Core Features
├── F-02: Hero Section
├── F-03: Explorar Proyectos
├── F-05: Habilidades
├── F-06: Sobre Mí
└── F-07: Formulario Contacto

FASE 3: Features Avanzados
├── F-04: Caso de Estudio
├── F-09: Auth Admin
└── F-08: Admin Panel

FASE 4: Calidad
├── F-10: Seguridad
├── F-11: Accesibilidad
├── F-12: SEO
├── F-13: Performance
└── F-14: Testing

FASE 5: DevOps
├── F-15: CI/CD
├── F-16: Deploy Producción
└── F-17: Dominio Personalizado
```

---

## Formato de Cada Roadmap

Cada documento de feature sigue esta estructura:

```markdown
# Feature: [Nombre]

## 1. Objetivo
## 2. Dependencias
## 3. Prerrequisitos
## 4. Implementación
## 5. Verificación
## 6. Troubleshooting
## 7. Recursos
```

---

## Relación con Historias de Usuario

| Feature | Historia de Usuario Relacionada |
|:--------|:-------------------------------|
| F-02 Hero Section | HU-01 |
| F-03 Explorar Proyectos | HU-02 |
| F-04 Caso de Estudio | HU-03 |
| F-07 Formulario Contacto | HU-05 |
| F-05 Habilidades | HU-06 |
| F-06 Sobre Mí | HU-07 |

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*