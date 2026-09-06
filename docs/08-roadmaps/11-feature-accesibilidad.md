# Feature: Accesibilidad

> **ID:** F-11 | **Prioridad:** Alta | **Dependencias:** F-01

---

## 1. Objetivo

Cumplir con WCAG 2.2 Nivel A: contraste, alt texts, navegación por teclado, aria labels.

---

## 2. Implementación

### Colores con Contraste Suficiente
```typescript
// Verificar contraste mínimo 4.5:1
const colors = {
  text: '#ffffff',      // Blanco
  background: '#111827', // Gray-900
  // Ratio: 15.4:1 ✓
}
```

### Alt Texts en Imágenes
```tsx
<img 
  src="/project.jpg" 
  alt="Dashboard del proyecto Nexo-Ferretero mostrando métricas de ventas"
/>
```

### Navegación por Teclado
```tsx
<button
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  tabIndex={0}
>
  Ver Proyecto
</button>
```

### Aria Labels
```tsx
<a href="/github" aria-label="Visitar perfil de GitHub">
  <GitHubIcon />
</a>
```

---

## 3. Verificación

- [ ] Lighthouse Accessibility > 90
- [ ] Navegación completa por teclado
- [ ] Contraste suficiente (4.5:1)
- [ ] Todos los imgs tienen alt

---

**Última actualización:** *2026-09-06*