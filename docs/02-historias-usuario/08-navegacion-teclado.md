# HU-08: Navegación por Teclado

## Datos de la Historia

| Campo | Valor |
|:------|:------|
| **ID** | HU-08 |
| **Título** | Navegación por Teclado |
| **Como** | usuario con discapacidad motriz o visual |
| **Quiero** | navegar por todo el portafolio usando solo el teclado |
| **Para** | acceder a toda la información sin depender del mouse |
| **Prioridad** | Alta |
| **Estado** | *[Pendiente/En Progreso/Completada]* |

---

## Descripción

La navegación por teclado es un requisito fundamental de accesibilidad (WCAG 2.2 AA). Todos los elementos interactivos deben ser accesibles mediante Tab, Enter y Space. El foco debe ser visible en todo momento.

---

## Criterios de Aceptación

### Navegación
1. [ ] Tab recorre todos los enlaces y botones en orden lógico
2. [ ] Enter activa enlaces y botones
3. [ ] Space activa botones y casillas de verificación
4. [ ] Escape cierra modales o menús abiertos
5. [ ] No hay "trampas de foco" (el foco no se queda atrapado)

### Foco Visible
6. [ ] Todos los elementos interactivos tienen focus state visible
7. [ ] El estilo de foco es consistente en todo el sitio
8. [ ] El foco tiene contraste suficiente con el fondo
9. [ ] El foco no se oculta nunca (no usar outline: none sin reemplazo)

### Skip to Content
10. [ ] Hay un enlace "Skip to content" al inicio del DOM
11. [ ] El enlace es visible solo cuando recibe foco
12. [ ] El enlace lleva el foco al contenido principal
13. [ ] El enlace funciona correctamente en todos los navegadores

### Orden de Tabulación
14. [ ] El orden de tabulación es lógico (de arriba a izquierda, de derecha)
15. [ ] La navegación sigue el flujo visual del diseño
16. [ ] No hay elementos con tabindex positivo que alteren el orden

---

## Referencias al Marco Normativo

| Norma | Archivo | Requisito Aplicable |
|:------|:--------|:---------------------|
| WCAG 2.2 AA | `01-wcag-2.2-aa.md` | 2.1.1 Teclado, 2.4.7 Enfoque Visible |
| WCAG 2.2 AA | `01-wcag-2.2-aa.md` | 2.1.2 Sin Teclado Trampa |

---

## Implementación del Skip to Content

```html
<body>
  <a href="#main-content" class="skip-to-content">
    Saltar al contenido principal
  </a>
  
  <header><!-- Navegación --></header>
  
  <main id="main-content" tabindex="-1">
    <!-- Contenido principal -->
  </main>
  
  <footer><!-- Pie de página --></footer>
</body>
```

```css
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}

.skip-to-content:focus {
  top: 0;
}
```

---

## Notas Adicionales

- Probar la navegación completa con Tab en cada página
- Verificar que el skip to content funciona en Chrome, Firefox y Safari
- Los modales deben capturar el foco y devolverlo al cerrar
- Los menús desplegables deben ser navegables con flechas

---

**Responsable de implementación:** *[Por definir]*
**Fecha de creación:** *[Fecha actual]*
**Última actualización:** *[Fecha actual]*
