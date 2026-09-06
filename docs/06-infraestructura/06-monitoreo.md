# Monitoreo

> **Propósito:** Documentar las herramientas de monitoreo, analytics y métricas de rendimiento.

---

## 1. Resumen de Herramientas

| Herramienta | Propósito | Costo |
|:------------|:----------|:------|
| **Vercel Analytics** | Métricas de visitantes | Free |
| **Vercel Speed Insights** | Core Web Vitals | Free |
| **Vercel Logs** | Logs de serverless functions | Free |
| **Supabase Dashboard** | Métricas de BD | Free |

---

## 2. Vercel Analytics

### 2.1 Configuración

```typescript
// src/main.tsx
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <>
      <Analytics />
      {/* resto de la app */}
    </>
  )
}
```

### 2.2 Métricas Disponibles

| Métrica | Descripción | Umbral |
|:--------|:------------|:-------|
| **Visitors** | Visitantes únicos | Tracking |
| **Page Views** | Vistas de página | Tracking |
| **Avg. Load Time** | Tiempo promedio de carga | < 2s |
| **Top Pages** | Páginas más visitadas | Tracking |
| **Referrers** | Fuentes de tráfico | Tracking |
| **Countries** | Países de visitantes | Tracking |

### 2.3 Dashboard

Acceder a: https://vercel.com/dashboard → Tu proyecto → Analytics

---

## 3. Core Web Vitals

### 3.1 Métricas

| Métrica | Nombre Completo | Objetivo | Descripción |
|:--------|:----------------|:---------|:------------|
| **LCP** | Largest Contentful Paint | < 2.5s | Tiempo de carga del contenido principal |
| **INP** | Interaction to Next Paint | < 200ms | Tiempo de respuesta a interacciones |
| **CLS** | Cumulative Layout Shift | < 0.1 | Estabilidad visual del layout |

### 3.2 Tabla de Estado

| Métrica | Objetivo | Estado Actual |
|:--------|:---------|:--------------|
| **LCP** | < 2.5s | ⬜ Pendiente medir |
| **INP** | < 200ms | ⬜ Pendiente medir |
| **CLS** | < 0.1 | ⬜ Pendiente medir |

### 3.3 Cómo Medir

```bash
# Opción 1: Chrome DevTools
# 1. Abrir DevTools (F12)
# 2. Pestaña Lighthouse
# 3. Ejecutar audit

# Opción 2: PageSpeed Insights
# https://pagespeed.web.dev/

# Opción 3: Vercel Speed Insights
# Dashboard → Analytics → Speed
```

---

## 4. Vercel Speed Insights

### 4.1 Configuración

```typescript
// src/main.tsx
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {
  return (
    <>
      <SpeedInsights />
      {/* resto de la app */}
    </>
  )
}
```

### 4.2 Métricas Reales

Speed Insights recolecta métricas reales de usuarios:

| Métrica | Fuente |
|:--------|:-------|
| **LCP** | Real User Monitoring |
| **INP** | Real User Monitoring |
| **CLS** | Real User Monitoring |
| **TTFB** | Real User Monitoring |
| **FCP** | Real User Monitoring |

---

## 5. Vercel Logs

### 5.1 Tipos de Logs

| Tipo | Propósito | Retención |
|:-----|:----------|:----------|
| **Build Logs** | Logs de construcción | 30 días |
| **Function Logs** | Logs de serverless functions | 24 horas |
| **Edge Logs** | Logs de Edge Network | 24 horas |

### 5.2 Acceso a Logs

1. Ir a **Vercel Dashboard** → **Tu proyecto**
2. Seleccionar pestaña **"Logs"**
3. Filtrar por tipo de log

### 5.3 Logging en Código

```typescript
// api/utils/logger.ts
export const logger = {
  info: (msg: string, data?: any) => {
    console.log(JSON.stringify({
      level: 'info',
      message: msg,
      data,
      timestamp: new Date().toISOString(),
    }))
  },
  error: (msg: string, error?: any) => {
    console.error(JSON.stringify({
      level: 'error',
      message: msg,
      error: error?.message,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
    }))
  },
}
```

---

## 6. Supabase Dashboard

### 6.1 Métricas de Base de Datos

| Métrica | Descripción | Umbral |
|:--------|:------------|:-------|
| **Database Size** | Tamaño de la BD | < 400 MB |
| **Active Connections** | Conexiones activas | < 50 |
| **Queries per Second** | Queries por segundo | Tracking |
| **Cache Hit Rate** | Tasa de acierto de cache | > 95% |

### 6.2 Acceso a Métricas

1. Ir a **Supabase Dashboard** → **Database**
2. Seleccionar pestaña **"Reports"**
3. Ver métricas en tiempo real

---

## 7. Performance Optimization

### 7.1 Cache Strategy

| Recurso | TTL | Strategy |
|:--------|:----|:---------|
| **HTML** | 0 (no cache) | Always fresh |
| **JS/CSS** | 1 year | Immutable (fingerprinted) |
| **Images** | 1 year | Immutable |
| **API responses** | 5 min | stale-while-revalidate |

### 7.2 Headers de Cache

```json
// Para assets estáticos
{
  "Cache-Control": "public, max-age=31536000, immutable"
}

// Para API
{
  "Cache-Control": "public, max-age=300, stale-while-revalidate"
}
```

### 7.3 Optimización de Bundle

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
```

---

## 8. Alertas

### 8.1 Alertas Configuradas

| Alerta | Condición | Acción |
|:-------|:----------|:-------|
| **Build Falla** | Build error | Notificación email |
| **Deploy Falla** | Deploy error | Notificación email |
| **Alto Uso de BD** | > 80% límite | Notificación email |
| **Errores de Runtime** | > 10/hora | Revisar logs |

### 8.2 Configurar Alertas

1. Ir a **Vercel Dashboard** → **Settings** → **Notifications**
2. Configurar alertas por email
3. Seleccionar eventos a monitorear

---

## 9. Reportes

### 9.1 Reporte Semanal

| Métrica | Frecuencia | Herramienta |
|:--------|:-----------|:------------|
| **Visitantes** | Semanal | Vercel Analytics |
| **Performance** | Semanal | Speed Insights |
| **Errores** | Diario | Vercel Logs |
| **Uso de BD** | Semanal | Supabase Dashboard |

### 9.2 Métricas de Éxito

| Métrica | Objetivo | Status |
|:--------|:---------|:-------|
| **LCP** | < 2.5s | ⬜ |
| **INP** | < 200ms | ⬜ |
| **CLS** | < 0.1 | ⬜ |
| **Uptime** | > 99.9% | ⬜ |
| **Errores** | < 1% | ⬜ |

---

## 10. Checklist

### Configuración
- [ ] Vercel Analytics habilitado
- [ ] Speed Insights habilitado
- [ ] Logs configurados
- [ ] Alertas configuradas

### Monitoreo
- [ ] Core Web Vitals medidos
- [ ] Performance optimizada
- [ ] Errores monitoreados
- [ ] Uptime verificado

### Reportes
- [ ] Reportes semanales programados
- [ ] Métricas de éxito definidas
- [ ] Dashboard revisado

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*