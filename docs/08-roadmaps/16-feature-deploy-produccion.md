# Feature: Deploy Producción

> **ID:** F-16 | **Prioridad:** Alta | **Dependencias:** F-15

---

## 1. Objetivo

Configurar despliegue automático a producción en Vercel con integración a GitHub.

---

## 2. Implementación

### Pasos en Vercel

1. Ir a https://vercel.com/new
2. Importar repositorio de GitHub
3. Configurar:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Agregar Environment Variables
5. Deploy

### vercel.json
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### Deploy Automático
- Push a `main` → Deploy a producción
- Push a `develop` → Deploy a preview
- PR → Deploy a preview

---

## 3. Verificación

- [ ] Sitio accesible en Vercel URL
- [ ] Deploy automático funciona
- [ ] Variables de entorno configuradas
- [ ] SSL habilitado

---

**Última actualización:** *2026-09-06*