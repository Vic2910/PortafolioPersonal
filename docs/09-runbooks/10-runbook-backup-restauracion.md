# Runbook: Backup y Restauración

> **ID:** RB-10 | **Audiencia:** Desarrolladores | **Frecuencia:** Semanal/Mensual

---

## 1. Propósito

Realizar backups de la base de datos y código, y restaurar en caso de emergencia.

---

## 2. Procedimiento

### Backup de Código

**El código está respaldado en GitHub:**
```powershell
# Verificar que todo está push
git status

# Push pendientes
git push origin main
```

### Backup de Base de Datos

**Supabase realiza backups automáticos:**
- Free tier: 7 días de retención
- Verificar en Dashboard → Database → Backups

**Exportar manual:**
1. Ir a Supabase Dashboard
2. Settings → Database → Backups
3. Click "Create backup"

### Backup de Variables

**Documentar variables (sin valores):**
```bash
# .env.backup-template
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### Restaurar Backup

**Si se necesita restaurar la BD:**
1. Ir a Supabase Dashboard
2. Settings → Database → Backups
3. Seleccionar backup
4. Click "Restore"

**Si se necesita restaurar código:**
```powershell
# Clonar repositorio
git clone https://github.com/Vic2910/portafolio-vras.git

# Instalar dependencias
cd portafolio-vras
npm install

# Configurar variables
Copy-Item .env.example .env.local
# Editar .env.local
```

---

## 3. Checklist

### Semanal
- [ ] Código push a GitHub
- [ ] Verificar backups de Supabase

### Mensual
- [ ] Exportar backup manual
- [ ] Verificar restauración (test)

---

## 4. Verificación

- [ ] Código en GitHub actualizado
- [ ] Backups de Supabase disponibles
- [ ] Variables documentadas

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*