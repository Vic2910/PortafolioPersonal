# Runbook: Deploy a Vercel

> **ID:** RB-06 | **Audiencia:** Desarrolladores | **Frecuencia:** Cada deploy

---

## 1. Propósito

Desplegar el portafolio a producción en Vercel.

---

## 2. Procedimiento

### Deploy Automático (Recomendado)

```powershell
# 1. Asegurar que todo está committeado
git status

# 2. Push a main
git push origin main

# 3. Vercel detecta el push y deploya automáticamente
# 4. Verificar en Vercel Dashboard
```

### Deploy Manual

```powershell
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy a preview
vercel

# Deploy a producción
vercel --prod
```

### Verificar Deploy

1. Ir a https://vercel.com/dashboard
2. Seleccionar proyecto `portafolio-vras`
3. Verificar último deploy
4. Click en URL para ver sitio

---

## 3. Variables de Entorno

**Configurar en Vercel Dashboard:**

1. Settings → Environment Variables
2. Agregar:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Seleccionar ambientes: Production, Preview

---

## 4. Verificación

- [ ] Push a main exitoso
- [ ] Deploy completado en Vercel
- [ ] Sitio accesible
- [ ] Variables de entorno funcionan
- [ ] SSL habilitado

---

## 5. Troubleshooting

### Problema: Build falla

**Verificar:**
```powershell
npm run build
```

Corregir errores antes de push.

### Problema: Variables no funcionan

**Verificar en Vercel:**
- Settings → Environment Variables
- Nombres correctos
- Valores correctos

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*