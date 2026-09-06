# 06-Infraestructura: Índice

> **Propósito:** Documentar toda la infraestructura técnica utilizada en el portafolio, incluyendo servicios en la nube, configuración de dominios, CI/CD, bases de datos y herramientas de monitoreo.

---

## Documentos Incluidos

| # | Documento | Descripción | Estado |
|:--|:----------|:------------|:-------|
| 01 | [Servicios en la Nube](01-servicios-nube.md) | Vercel, Supabase, GitHub | Pendiente |
| 02 | [Base de Datos](02-base-datos.md) | Supabase PostgreSQL, esquemas | Pendiente |
| 03 | [CI/CD y Despliegue](03-cicd-despliegue.md) | GitHub Actions, Vercel | Pendiente |
| 04 | [Dominio y SSL](04-dominio-ssl.md) | Configuración de dominio | Pendiente |
| 05 | [Variables de Entorno](05-variables-entorno.md) | Gestión de secrets | Pendiente |
| 06 | [Monitoreo](06-monitoreo.md) | Analytics, logs | Pendiente |
| 07 | [Seguridad](07-seguridad.md) | Headers, autenticación | Pendiente |

---

## Resumen de Servicios

| Servicio | Tipo | Plan | Costo |
|:---------|:-----|:-----|:------|
| **Vercel** | Hosting + Serverless | Free | $0 |
| **Supabase** | BaaS (Database + Auth) | Free | $0 |
| **GitHub** | Control de versiones | Free | $0 |
| **Dominio** | DNS + SSL | Personalizado | ~$12/año |

---

## Stack de Infraestructura

```
┌─────────────────────────────────────────────────────────────┐
│                    INFRAESTRUCTURA PORTAFOLIOVRAS           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │    GITHUB     │    │    VERCEL    │    │   SUPABASE   │  │
│  │              │    │              │    │              │  │
│  │ • Código     │───▶│ • Build      │───▶│ • PostgreSQL │  │
│  │ • CI/CD      │    │ • Deploy     │    │ • Auth       │  │
│  │ • Issues     │    │ • CDN        │    │ • Storage    │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                   │                   │           │
│         │                   │                   │           │
│         ▼                   ▼                   ▼           │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  DOMINIO     │    │   SSL/TLS    │    │  ANALYTICS   │  │
│  │  DNS         │    │  Certificado │    │  Speed       │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Costos Estimados

| Concepto | Costo Mensual | Costo Anual |
|:---------|:--------------|:------------|
| Vercel Free | $0 | $0 |
| Supabase Free | $0 | $0 |
| GitHub Free | $0 | $0 |
| Dominio (opcional) | $1 | $12 |
| **Total** | **~$1** | **~$12** |

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*