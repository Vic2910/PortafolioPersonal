# Feature: Testing

> **ID:** F-14 | **Prioridad:** Media | **Dependencias:** F-01

---

## 1. Objetivo

Implementar pruebas unitarias y de integración con Vitest + React Testing Library.

---

## 2. Implementación

### Instalación
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### Configuración (vitest.config.ts)
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
```

### Ejemplo de Test
```typescript
// src/components/common/__tests__/ProjectCard.test.tsx
import { render, screen } from '@testing-library/react'
import { ProjectCard } from '../ProjectCard'

const mockProject = {
  id: '1',
  name: 'Test Project',
  slug: 'test-project',
  description: 'Test description',
  shortDesc: 'Short desc',
  technologies: ['React', 'TypeScript'],
  imageUrl: '/test.jpg',
  featured: true,
  orderIndex: 1,
}

test('renders project name', () => {
  render(<ProjectCard project={mockProject} onClick={() => {}} />)
  expect(screen.getByText('Test Project')).toBeInTheDocument()
})
```

### Scripts
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

---

## 3. Verificación

- [ ] Tests pasan con `npm test`
- [ ] Coverage > 70%
- [ ] Tests de componentes críticos

---

**Última actualización:** *2026-09-06*