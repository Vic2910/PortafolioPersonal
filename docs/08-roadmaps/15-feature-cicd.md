# Feature: CI/CD

> **ID:** F-15 | **Prioridad:** Alta | **Dependencias:** F-01

---

## 1. Objetivo

Configurar pipeline de Integración Continua con GitHub Actions: lint, typecheck, tests, build automático.

---

## 2. Implementación

### GitHub Actions Workflow

**Crear .github/workflows/ci.yml:**
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run type check
        run: npm run typecheck
      
      - name: Run tests
        run: npm run test:coverage
      
      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

### GitHub Secrets

Configurar en Settings → Secrets:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## 3. Verificación

- [ ] CI ejecuta en cada push
- [ ] Lint pasa sin errores
- [ ] TypeCheck pasa
- [ ] Tests pasan
- [ ] Build exitoso

---

**Última actualización:** *2026-09-06*