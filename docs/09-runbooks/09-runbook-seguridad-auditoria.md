# Runbook: Seguridad y Auditoría

> **ID:** RB-09 | **Audiencia:** Desarrolladores | **Frecuencia:** Mensual

---

## 1. Propósito

Realizar auditorías de seguridad periódicas y mantener el portafolio seguro.

---

## 2. Procedimiento

### Auditoría Mensual

**1. Verificar dependencias:**
```powershell
npm audit
npm audit fix
```

**2. Verificar headers de seguridad:**
- Ir a https://securityheaders.com
- Ingresar URL del portafolio
- Verificar score A+

**3. Verificar SSL:**
- Ir a https://www.ssllabs.com/ssltest/
- Ingresar dominio
- Verificar calificación A+

**4. Revisar variables de entorno:**
- Verificar que no hay secrets commiteados
- Revisar .gitignore

### Rotación de Keys

**Cada 6 meses:**
1. Ir a Supabase Dashboard → Settings → API
2. Regenerate anon key
3. Regenerate service key
4. Actualizar en Vercel Dashboard
5. Actualizar en .env.local

### Verificar RLS

**En Supabase SQL Editor:**
```sql
-- Ver políticas de projects
SELECT * FROM pg_policies WHERE tablename = 'projects';

-- Ver políticas de messages
SELECT * FROM pg_policies WHERE tablename = 'messages';
```

---

## 3. Checklist

### Mensual
- [ ] `npm audit` ejecutado
- [ ] Headers verificados
- [ ] SSL válido
- [ ] Variables seguras

### Semestral
- [ ] Keys rotadas
- [ ] Dependencias actualizadas
- [ ] RLS revisado

---

## 4. Verificación

- [ ] Score securityheaders.com A+
- [ ] Score ssllabs.com A+
- [ ] npm audit sin vulnerabilidades
- [ ] No hay secrets commiteados

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*