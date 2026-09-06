# Feature: Performance

> **ID:** F-13 | **Prioridad:** Media | **Dependencias:** F-01

---

## 1. Objetivo

Optimizar rendimiento: Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1), lazy loading, code splitting.

---

## 2. Implementación

### Lazy Loading de Rutas
```typescript
import { lazy, Suspense } from 'react'

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))

<Suspense fallback={<Loading />}>
  <ProjectDetail />
</Suspense>
```

### Lazy Loading de Imágenes
```tsx
<img src="/project.jpg" loading="lazy" alt="..." />
```

### Code Splitting en Vite
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
})
```

### Optimización de Imágenes
- Formato WebP/AVIF
- Responsive srcset
- Compresión adecuada

---

## 3. Verificación

- [ ] LCP < 2.5s
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] Lighthouse Performance > 90

---

**Última actualización:** *2026-09-06*