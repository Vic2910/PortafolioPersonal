# Runbook: Troubleshooting

> **ID:** RB-08 | **Audiencia:** Desarrolladores | **Frecuencia:** Cuando hay errores

---

## 1. Propósito

Resolver problemas comunes de desarrollo y deploy.

---

## 2. Problemas y Soluciones

### Errores de Desarrollo

| Problema | Causa | Solución |
|:---------|:------|:---------|
| `npm run dev` no inicia | Puerto en uso | Cambiar puerto o matar proceso |
| Blanco en navegador | Error de render | Verificar consola del navegador |
| `Module not found` | Import mal | Verificar ruta de import |
| `Type error` | Tipos incorrectos | Verificar interfaces TypeScript |

**Verificar errores:**
```powershell
# Verificar TypeScript
npm run typecheck

# Verificar Lint
npm run lint
```

### Errores de Build

| Problema | Causa | Solución |
|:---------|:------|:---------|
| Build falla | Errores TS/Lint | Corregir antes de push |
| Out of memory | Bundle grande | Dividir chunks |

**Debug build:**
```powershell
npm run build 2>&1 | Select-String "error"
```

### Errores de Deploy

| Problema | Causa | Solución |
|:---------|:------|:---------|
| Deploy falla | Variables faltantes | Configurar en Vercel |
| 404 en rutas | Router mal | Verificar vercel.json |
| API no responde | Functions fallan | Verificar logs |

### Errores de Supabase

| Problema | Causa | Solución |
|:---------|:------|:---------|
| Conexión falla | URL/Key incorrecta | Verificar .env.local |
| RLS bloquea | Política incorrecta | Verificar políticas |
| Datos no cargan | Tabla vacía | Insertar datos de prueba |

---

## 3. Comandos de Debug

```powershell
# Ver logs de npm
npm run dev --verbose

# Verificar Node.js
node --version
npm --version

# Limpiar caché
npm cache clean --force

# Reinstalar dependencias
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 4. Recursos

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*