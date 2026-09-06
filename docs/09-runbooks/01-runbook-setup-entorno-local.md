# Runbook: Setup Entorno Local

> **ID:** RB-01 | **Audiencia:** Desarrolladores nuevos | **Frecuencia:** Una vez

---

## 1. Propósito

Configurar el entorno de desarrollo local completo para trabajar en el portafolio.

---

## 2. Prerrequisitos

- [ ] Windows 10/11
- [ ] Acceso a internet
- [ ] Permisos de administrador (para instalar software)

---

## 3. Procedimiento

### Paso 1: Instalar Node.js

**Comando:**
```powershell
# Descargar desde https://nodejs.org/
# Seleccionar LTS version 20+
# Ejecutar instalador

# Verificar instalación
node --version
# Resultado esperado: v20.x.x

npm --version
# Resultado esperado: 10.x.x
```

### Paso 2: Instalar Git

**Comando:**
```powershell
# Descargar desde https://git-scm.com/
# Ejecutar instalador con opciones por defecto

# Verificar instalación
git --version
# Resultado esperado: git version 2.40.x
```

### Paso 3: Configurar Git

**Comando:**
```powershell
# Configurar nombre
git config --global user.name "Victor Rafael Arévalo Sierra"

# Configurar email
git config --global user.email "victorarevalosierra@gmail.com"

# Verificar configuración
git config --list
```

### Paso 4: Instalar VS Code

**Comando:**
```powershell
# Descargar desde https://code.visualstudio.com/
# Ejecutar instalador

# Abrir VS Code desde terminal (opcional)
code --version
```

### Paso 5: Instalar Extensiones VS Code

**Comando:**
```powershell
# Instalar extensiones desde terminal
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
```

### Paso 6: Clonar Repositorio

**Comando:**
```powershell
cd C:\Users\Lenovo\Desktop

git clone https://github.com/Vic2910/portafolio-vras.git

cd portafolio-vras
```

### Paso 7: Instalar Dependencias

**Comando:**
```powershell
npm install
```

**Resultado esperado:**
```
added 500+ packages in 30s
```

### Paso 8: Configurar Variables de Entorno

**Comando:**
```powershell
# Copiar archivo de ejemplo
Copy-Item .env.example .env.local

# Abrir en VS Code
code .env.local
```

**Editar .env.local:**
```bash
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### Paso 9: Iniciar Servidor de Desarrollo

**Comando:**
```powershell
npm run dev
```

**Resultado esperado:**
```
  VITE v5.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Paso 10: Verificar Funcionamiento

1. Abrir navegador en `http://localhost:5173/`
2. Verificar que el portafolio se muestra
3. Verificar que no hay errores en consola

---

## 4. Verificación Final

- [ ] `node --version` muestra v20+
- [ ] `npm --version` muestra 10+
- [ ] `git --version` muestra 2.40+
- [ ] VS Code abre con extensiones instaladas
- [ ] `npm run dev` inicia sin errores
- [ ] Sitio se muestra en navegador
- [ ] No hay errores en consola del navegador

---

## 5. Troubleshooting

### Problema: Node.js no se encuentra

**Causa:** Node.js no está en PATH

**Solución:**
```powershell
# Reinstalar Node.js marcando "Add to PATH"
# O agregar manualmente:
$env:PATH += ";C:\Program Files\nodejs"
```

### Problema: npm install falla

**Causa:** Permisos o conexión

**Solución:**
```powershell
# Limpiar caché
npm cache clean --force

# Reintentar
npm install
```

### Problema: Puerto 5173 en uso

**Causa:** Otro proceso usando el puerto

**Solución:**
```powershell
# Encontrar proceso
netstat -ano | findstr :5173

# Matar proceso (reemplazar PID)
taskkill /PID <PID> /F
```

### Problema: Variables de entorno no funcionan

**Causa:** Archivo .env.local mal configurado

**Solución:**
```powershell
# Verificar que el archivo existe
Test-Path .env.local

# Verificar contenido
Get-Content .env.local
```

---

## 6. Recursos

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Git Documentation](https://git-scm.com/doc)
- [VS Code Documentation](https://code.visualstudio.com/docs)

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*