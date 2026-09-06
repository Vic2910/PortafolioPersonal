# RN-02: Reglas de Accesibilidad

## Definición

El portafolio debe ser accesible para todas las personas, incluyendo aquellas con discapacidades visuales, motoras o cognitivas. El cumplimiento mínimo es WCAG 2.2 nivel AA.

---

## Criterios de Validación

### WCAG 2.2 AA — Percepción
1. [ ] **1.1.1 Contenido No Textual:** Todas las imágenes tienen `alt` descriptivo
2. [ ] **1.3.1 Info y Relaciones:** La estructura semántica del HTML es correcta
3. [ ] **1.4.1 Uso del Color:** El color no es la única forma de transmitir información
4. [ ] **1.4.3 Contraste Mínimo:** Ratio ≥ 4.5:1 para texto, ≥ 3:1 para UI

### WCAG 2.2 AA — Operabilidad
5. [ ] **2.1.1 Teclado:** Todos los elementos son accesibles por teclado
6. [ ] **2.1.2 Sin Teclado Trampa:** No hay trampas de foco
7. [ ] **2.4.1 Bloques Omitibles:** Skip to content funciona correctamente
8. [ ] **2.4.3 Orden de Foco:** El orden de tabulación es lógico
9. [ ] **2.4.6 Encabezados:** Los encabezados describen la sección
10. [ ] **2.4.7 Enfoque Visible:** El foco es visible en todos los elementos
11. [ ] **2.5.8 Tamaño del Objetivo:** Áreas táctiles ≥ 24px

### WCAG 2.2 AA — Comprensibilidad
12. [ ] **3.1.1 Idioma de la Página:** El atributo `lang` está definido
13. [ ] **3.3.1 Identificación de Errores:** Los errores se describen claramente
14. [ ] **3.3.2 Etiquetas o Instrucciones:** Los campos tienen labels asociados

### WCAG 2.2 AA — Robustez
15. [ ] **4.1.1 Parsing:** El HTML es válido
16. [ ] **4.1.2 Nombre, Rol, Valor:** Los componentes tienen ARIA correcto

---

## Referencias

| Norma | Archivo | Requisito |
|:------|:--------|:----------|
| WCAG 2.2 AA | `01-wcag-2.2-aa.md` | Estándar completo |

---

## Herramientas de Validación

| Herramienta | Uso | Frecuencia |
|:------------|:----|:-----------|
| WAVE | Análisis automático de accesibilidad | Cada cambio de UI |
| axe DevTools | Auditoría en navegador | Cada sprint |
| Lighthouse | Reporte de accesibilidad | Cada release |
| Prueba manual | Navegación por teclado | Cada sprint |

---

## Excepciones

- El modo oscuro no es obligatorio pero se recomienda
- Las animaciones pueden desactivarse con `prefers-reduced-motion`
- El contenido de terceros (embeds) puede no cumplir WCAG

---

**Responsable:** *[Por definir]*
**Última actualización:** *[Fecha]*
