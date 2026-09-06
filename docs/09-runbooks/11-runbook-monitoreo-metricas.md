# Runbook: Monitoreo y Métricas

> **ID:** RB-11 | **Audiencia:** Desarrolladores | **Frecuencia:** Semanal

---

## 1. Propósito

Monitorear el rendimiento, errores y uso del portafolio.

---

## 2. Procedimiento

### Revisar Vercel Analytics

**1. Ir a Vercel Dashboard → Analytics**

**2. Verificar métricas:**
- Visitors (visitantes únicos)
- Page Views (vistas de página)
- Avg. Load Time (tiempo promedio)

### Revisar Core Web Vitals

**1. Ir a Vercel Dashboard → Speed Insights**

**2. Verificar:**
- LCP (Largest Contentful Paint) < 2.5s
- INP (Interaction to Next Paint) < 200ms
- CLS (Cumulative Layout Shift) < 0.1

### Revisar Logs

**1. Ir a Vercel Dashboard → Logs**

**2. Verificar:**
- Errores de serverless functions
- Requests fallidos
- Tiempos de respuesta

### Revisar Supabase

**1. Ir a Supabase Dashboard → Database**

**2. Verificar:**
- Tamaño de BD
- Conexiones activas
- Queries lentas

---

## 3. Métricas Objetivo

| Métrica | Objetivo | Estado |
|:--------|:---------|:-------|
| LCP | < 2.5s | ⬜ |
| INP | < 200ms | ⬜ |
| CLS | < 0.1 | ⬜ |
| Lighthouse Performance | > 90 | ⬜ |
| Uptime | > 99.9% | ⬜ |

---

## 4. Herramientas

| Herramienta | Propósito | URL |
|:------------|:----------|:----|
| Vercel Analytics | Métricas de uso | vercel.com/dashboard |
| Vercel Speed Insights | Core Web Vitals | vercel.com/dashboard |
| PageSpeed Insights | Testing performance | pagespeed.web.dev |
| Security Headers | Auditoría headers | securityheaders.com |

---

## 5. Checklist Semanal

- [ ] Vercel Analytics revisado
- [ ] Core Web Vitals verificados
- [ ] Logs revisados (sin errores)
- [ ] Supabase health check

---

## 6. Acciones Correctivas

| Problema | Acción |
|:---------|:-------|
| LCP alto | Optimizar imágenes, lazy loading |
| CLS alto | Verificar dimensiones de imágenes |
| Errores en logs | Investigar y corregir |
| BD lenta | Optimizar queries, índices |

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*