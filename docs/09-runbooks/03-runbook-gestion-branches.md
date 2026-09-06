# Runbook: Gestión de Branches

> **ID:** RB-03 | **Audiencia:** Desarrolladores | **Frecuencia:** Según necesidad

---

## 1. Propósito

Gestionar ramas de Git: crear, cambiar, eliminar y合并.

---

## 2. Estrategia de Ramas

```
main (producción)
├── develop (desarrollo)
├── feature/nombre-feature
├── fix/nombre-fix
└── hotfix/nombre-hotfix
```

---

## 3. Procedimiento

### Crear Feature Branch

```powershell
# Desde main o develop
git checkout main
git pull origin main

# Crear y cambiar a nueva rama
git checkout -b feature/hero-section

# Desarrollar y hacer commit
git add .
git commit -m "feat: add hero section"

# Push a origin
git push origin feature/hero-section
```

### Cambiar entre Ramas

```powershell
# Ver rama actual
git branch

# Cambiar a rama existente
git checkout main
git checkout feature/hero-section

# Crear y cambiar en un paso
git checkout -b feature/nueva-feature
```

### Eliminar Rama

```powershell
# Eliminar rama local
git branch -d feature/hero-section

# Eliminar rama remota
git push origin --delete feature/hero-section
```

###合并 Ramas

```powershell
# Cambiar a la rama destino
git checkout main

#合并 feature branch
git merge feature/hero-section

# Push
git push origin main
```

---

## 4. Nombres de Ramas

| Tipo | Formato | Ejemplo |
|:-----|:--------|:--------|
| Feature | `feature/nombre-descriptivo` | `feature/hero-section` |
| Fix | `fix/descripcion-fix` | `fix/form-validation` |
| Hotfix | `fix/urgente-descripcion` | `fix/security-patch` |
| Release | `release/version` | `release/v1.0.0` |

---

## 5. Verificación

- [ ] Rama creada correctamente
- [ ] Cambios realizados
- [ ] Commit realizado
- [ ] Push exitoso
- [ ]合并 sin conflictos

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*