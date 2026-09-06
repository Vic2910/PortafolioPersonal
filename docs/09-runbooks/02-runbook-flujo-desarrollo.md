# Runbook: Flujo de Desarrollo

> **ID:** RB-02 | **Audiencia:** Desarrolladores | **Frecuencia:** Diario

---

## 1. Propósito

Definir el flujo de trabajo diario de desarrollo: crear features, hacer commits y push.

---

## 2. Prerrequisitos

- [ ] RB-01 completado (entorno configurado)
- [ ] Repositorio clonado
- [ ] Dependencias instaladas

---

## 3. Procedimiento

### Inicio del Día

```powershell
# 1. Navegar al proyecto
cd C:\Users\Lenovo\Desktop\portafolio-vras

# 2. Actualizar código
git pull origin main

# 3. Instalar nuevas dependencias (si las hay)
npm install

# 4. Iniciar servidor de desarrollo
npm run dev
```

### Flujo de Desarrollo

```powershell
# 1. Crear rama para la feature
git checkout -b feature/nombre-feature

# 2. Desarrollar (editar archivos en VS Code)

# 3. Verificar código
npm run lint
npm run typecheck

# 4. Hacer commit
git add .
git commit -m "feat: descripción de la feature"

# 5. Push a GitHub
git push origin feature/nombre-feature

# 6. Crear Pull Request en GitHub
# 7. Esperar revisión y merge
# 8. Volver a main
git checkout main
git pull origin main
```

### Fin del Día

```powershell
# 1. Guardar cambios pendientes
git add .
git commit -m "wip: trabajo en progreso"

# 2. Push
git push

# 3. Detener servidor (Ctrl+C en terminal)
```

---

## 4. Convenciones de Commits

| Prefijo | Uso | Ejemplo |
|:--------|:----|:--------|
| `feat:` | Nueva feature | `feat: add hero section` |
| `fix:` | Corrección de bug | `fix: form validation` |
| `docs:` | Documentación | `docs: update README` |
| `style:` | Estilos | `style: adjust colors` |
| `refactor:` | Refactorización | `refactor: extract hook` |
| `test:` | Tests | `test: add ProjectCard tests` |
| `chore:` | Tareas | `chore: update dependencies` |

---

## 5. Verificación

- [ ] Código actualizado (`git pull`)
- [ ] Dependencias instaladas
- [ ] Lint sin errores
- [ ] TypeCheck sin errores
- [ ] Feature desarrollada
- [ ] Commit realizado
- [ ] Push exitoso

---

## 6. Troubleshooting

### Problema: Conflictos de merge

**Solución:**
```powershell
# Ver archivos con conflicto
git status

# Abrir en VS Code y resolver conflictos
# Después de resolver:
git add .
git commit -m "fix: resolve merge conflicts"
```

### Problema: Push rechazado

**Solución:**
```powershell
# Pull con rebase
git pull --rebase origin main

# Resolver conflictos si los hay
# Push nuevamente
git push origin feature/nombre-feature
```

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*