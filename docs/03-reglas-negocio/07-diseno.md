# RN-07: Reglas de Diseño Visual

## Definición

El diseño del portafolio debe ser limpio, profesional y orientado a la legibilidad. Debe seguir principios de diseño de interfaces técnicas, no decorativas.

---

## Criterios de Validación

### Paleta de Colores
1. [ ] Se usa la proporción 60-30-10 (neutro base — estructura — acento)
2. [ ] El fondo es neutro (gris claro u oscuro)
3. [ ] El color de acento se usa solo para CTAs y elementos interactivos
4. [ ] El contraste cumple WCAG 2.2 AA (4.5:1 texto, 3:1 UI)

### Tipografía
5. [ ] Se usan máximo 2 familias tipográficas
6. [ ] Sans-serif para texto y encabezados
7. [ ] Monoespaciada para código y metadatos
8. [ ] La escala tipográfica es consistente (ratio 1.25 o similar)
9. [ ] El tamaño de texto base es ≥ 16px

### Layout
10. [ ] Se usa Bento Grid o CSS Grid para la estructura
11. [ ] El espaciado entre elementos es consistente (gap: 16-24px)
12. [ ] El ancho máximo de lectura es ~700px
13. [ ] El layout es mobile-first

### Componentes
14. [ ] Los botones tienen hover state y focus state
15. [ ] Los enlaces tienen hover state visible
16. [ ] Los formularios tienen focus states en los campos
17. [ ] Las tarjetas tienen sombras sutiles o bordes

### Imágenes
18. [ ] Las imágenes tienen dimensiones explícitas
19. [ ] Las imágenes se cargan de forma lazy
20. [ ] Las imágenes tienen fallbacks (placeholder o color de fondo)

### Responsive
21. [ ] El diseño se adapta a móvil (≤ 480px)
22. [ ] El diseño se adapta a tablet (481-768px)
23. [ ] El diseño se adapta a desktop (≥ 769px)
24. [ ] No hay scroll horizontal en ningún breakpoint

---

## Referencias

| Norma | Archivo | Requisito |
|:------|:--------|:----------|
| WCAG 2.2 AA | `01-wcag-2.2-aa.md` | 1.4.3 Contraste Mínimo |
| ISO 9241 | `03-iso-9241-usabilidad-ux.md` | 9.2.1 Visualización de información |

---

## Paleta de Colores Propuesta

### Modo Claro
```
--color-bg-primary: #ffffff      (60% - fondo principal)
--color-bg-secondary: #f5f5f5    (30% - estructura)
--color-accent: #2563eb          (10% - acento funcional)
--color-text-primary: #111827    (texto principal)
--color-text-secondary: #6b7280  (texto secundario)
```

### Modo Oscuro
```
--color-bg-primary: #111827      (60% - fondo principal)
--color-bg-secondary: #1f2937    (30% - estructura)
--color-accent: #3b82f6          (10% - acento funcional)
--color-text-primary: #f9fafb    (texto principal)
--color-text-secondary: #9ca3af  (texto secundario)
```

---

## Excepciones

- Las animaciones pueden desactivarse con `prefers-reduced-motion`
- El modo oscuro es opcional pero recomendado
- Los fragmentos de código pueden tener su propia paleta de syntax highlighting

---

**Responsable:** *[Por definir]*
**Última actualización:** *[Fecha]*
