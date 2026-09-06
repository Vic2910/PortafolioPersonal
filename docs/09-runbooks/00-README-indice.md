# 09-Runbooks: Índice

> **Propósito:** Documentar los procedimientos operativos paso a paso para mantener, desarrollar y troubleshootear el portafolio.

---

## Visión General

Los runbooks están organizados por tareas operativas:

| Categoría | Runbooks | Propósito |
|:----------|:---------|:----------|
| **Setup** | 1-2 | Configuración inicial |
| **Desarrollo** | 3-5 | Flujo de trabajo diario |
| **Deploy** | 6-7 | Despliegue y administración |
| **Mantenimiento** | 8-11 | Troubleshooting, seguridad, backups |

---

## Estructura del Directorio

```
09-runbooks/
├── 00-README-indice.md                    # Este archivo
├── 01-runbook-setup-entorno-local.md      # Setup completo del entorno
├── 02-runbook-flujo-desarrollo.md         # Flujo diario de desarrollo
├── 03-runbook-gestion-branches.md         # Git flow y branching
├── 04-runbook-creacion-componentes.md     # Patrones de componentes
├── 05-runbook-integracion-supabase.md     # Integración con Supabase
├── 06-runbook-deploy-vercel.md            # Deploy a Vercel
├── 07-runbook-admin-panel.md              # Gestión del admin panel
├── 08-runbook-troubleshooting.md          # Solución de problemas
├── 09-runbook-seguridad-auditoria.md      # Auditoría de seguridad
├── 10-runbook-backup-restauracion.md      # Backup y restauración
└── 11-runbook-monitoreo-metricas.md       # Monitoreo y métricas
```

---

## Índice de Runbooks

| ID | Runbook | Audiencia | Frecuencia |
|:---|:--------|:----------|:-----------|
| RB-01 | [Setup Entorno Local](01-runbook-setup-entorno-local.md) | Desarrolladores nuevos | Una vez |
| RB-02 | [Flujo Desarrollo](02-runbook-flujo-desarrollo.md) | Desarrolladores | Diario |
| RB-03 | [Gestión Branches](03-runbook-gestion-branches.md) | Desarrolladores | Según necesidad |
| RB-04 | [Creación Componentes](04-runbook-creacion-componentes.md) | Desarrolladores | Según necesidad |
| RB-05 | [Integración Supabase](05-runbook-integracion-supabase.md) | Desarrolladores | Según necesidad |
| RB-06 | [Deploy Vercel](06-runbook-deploy-vercel.md) | Desarrolladores | Cada deploy |
| RB-07 | [Admin Panel](07-runbook-admin-panel.md) | Administradores | Según necesidad |
| RB-08 | [Troubleshooting](08-runbook-troubleshooting.md) | Desarrolladores | Cuando hay errores |
| RB-09 | [Seguridad Auditoría](09-runbook-seguridad-auditoria.md) | Desarrolladores | Mensual |
| RB-10 | [Backup Restauración](10-runbook-backup-restauracion.md) | Desarrolladores | Semanal/Mensual |
| RB-11 | [Monitoreo Métricas](11-runbook-monitoreo-metricas.md) | Desarrolladores | Semanal |

---

## Cómo Usar Este Runbook

1. **Identificar la tarea** que necesitas realizar
2. **Buscar el runbook** correspondiente en la tabla
3. **Seguir los pasos** en orden
4. **Verificar** al final de cada procedimiento
5. **Consultar troubleshooting** si hay problemas

---

## Herramientas Requeridas

| Herramienta | Versión | Propósito |
|:------------|:--------|:----------|
| **Node.js** | 20+ LTS | Runtime |
| **npm** | 10+ | Package manager |
| **Git** | 2.40+ | Control de versiones |
| **VS Code** | Última | IDE |
| **PowerShell** | 5.1+ | Terminal (Windows) |

---

## Extensiones VS Code Recomendadas

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

---

## Comandos Rápidos de Referencia

```bash
# Iniciar desarrollo
npm run dev

# Build de producción
npm run build

# Lint
npm run lint

# TypeCheck
npm run typecheck

# Tests
npm test

# Deploy (automático con push a main)
git push origin main
```

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*