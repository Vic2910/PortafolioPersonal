# Pruebas del Dashboard de Ventas

> **Propósito:** Documentar los resultados de pruebas funcionales, de rendimiento, accesibilidad y seguridad del proyecto.

---

## Tipos de Pruebas

### 1. Pruebas Funcionales

**Objetivo:** Verificar que todas las funcionalidades funcionan correctamente.

#### Checklist de Pruebas

| # | Funcionalidad | Caso de Prueba | Resultado | Notas |
|:--|:--------------|:---------------|:----------|:------|
| 1 | Login | Credenciales correctas | *[Pendiente]* | |
| 2 | Login | Credenciales incorrectas | *[Pendiente]* | |
| 3 | Login | Campo vacío | *[Pendiente]* | |
| 4 | Dashboard | Carga de gráficas | *[Pendiente]* | |
| 5 | Dashboard | Filtro por fecha | *[Pendiente]* | |
| 6 | Dashboard | Filtro por categoría | *[Pendiente]* | |
| 7 | Productos | Listado de productos | *[Pendiente]* | |
| 8 | Productos | Crear producto | *[Pendiente]* | |
| 9 | Productos | Editar producto | *[Pendiente]* | |
| 10 | Productos | Eliminar producto | *[Pendiente]* | |
| 11 | Órdenes | Listado de órdenes | *[Pendiente]* | |
| 12 | Órdenes | Detalle de orden | *[Pendiente]* | |
| 13 | Responsive | Vista en móvil | *[Pendiente]* | |
| 14 | Responsive | Vista en tablet | *[Pendiente]* | |

### 2. Pruebas de Rendimiento

**Objetivo:** Verificar que la aplicación cumple con los Core Web Vitals.

#### Resultados de Lighthouse

| Métrica | Resultado | Umbral | Estado |
|:--------|:----------|:-------|:-------|
| **Performance Score** | *[Pendiente]* | > 90 | *[Pendiente]* |
| **LCP** (Largest Contentful Paint) | *[Pendiente]* | < 2.5s | *[Pendiente]* |
| **INP** (Interaction to Next Paint) | *[Pendiente]* | < 200ms | *[Pendiente]* |
| **CLS** (Cumulative Layout Shift) | *[Pendiente]* | < 0.1 | *[Pendiente]* |
| **FCP** (First Contentful Paint) | *[Pendiente]* | < 1.8s | *[Pendiente]* |
| **TTFB** (Time to First Byte) | *[Pendiente]* | < 800ms | *[Pendiente]* |

#### Cómo Ejecutar Lighthouse

1. Abrir la aplicación en Chrome
2. Abrir DevTools (F12)
3. Ir a la pestaña "Lighthouse"
4. Seleccionar "Performance" y "Accessibility"
5. Hacer clic en "Analyze page load"
6. Capturar resultados y guardar en esta carpeta

### 3. Pruebas de Accesibilidad

**Objetivo:** Verificar cumplimiento de WCAG 2.2 AA.

#### Checklist WCAG

| # | Criterio | Nivel | Resultado | Herramienta |
|:--|:---------|:------|:----------|:------------|
| 1 | 1.1.1 Contenido No Textual | A | *[Pendiente]* | WAVE |
| 2 | 1.4.3 Contraste Mínimo | AA | *[Pendiente]* | Chrome DevTools |
| 3 | 2.1.1 Navegación por Teclado | A | *[Pendiente]* | Manual |
| 4 | 2.4.7 Enfoque Visible | AA | *[Pendiente]* | Manual |
| 5 | 2.5.8 Tamaño del Objetivo | AA | *[Pendiente]* | Chrome DevTools |
| 6 | 3.1.1 Idioma de la Página | A | *[Pendiente]* | WAVE |
| 7 | 4.1.1 Parsing | A | *[Pendiente]* | Validator |

#### Herramientas de Accesibilidad

- **WAVE:** https://wave.webaim.org/
- **axe DevTools:** Extensión de Chrome
- **Chrome DevTools:** Pestaña Accessibility
- **Navegación por teclado:** Probar con Tab, Enter, Escape

### 4. Pruebas de Seguridad

**Objetivo:** Verificar que las cabeceras HTTP y configuración de seguridad son correctas.

#### Auditoría de Cabeceras HTTP

| Cabecera | Valor Esperado | Valor Actual | Estado |
|:---------|:---------------|:-------------|:-------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | *[Pendiente]* | *[Pendiente]* |
| `Content-Security-Policy` | `default-src 'self'; ...` | *[Pendiente]* | *[Pendiente]* |
| `X-Frame-Options` | `DENY` | *[Pendiente]* | *[Pendiente]* |
| `X-Content-Type-Options` | `nosniff` | *[Pendiente]* | *[Pendiente]* |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | *[Pendiente]* | *[Pendiente]* |
| `Permissions-Policy` | `camera=(), microphone=()` | *[Pendiente]* | *[Pendiente]* |

#### Cómo Verificar Cabeceras

1. Abrir la aplicación en Chrome
2. Abrir DevTools (F12)
3. Ir a la pestaña "Network"
4. Recargar la página
5. Seleccionar el primer request
6. Ir a la pestaña "Headers"
7. Buscar "Response Headers"

**Alternativa:** Usar https://securityheaders.com/

### 5. Pruebas de Formulario de Contacto

**Objetivo:** Verificar que el formulario es seguro y funciona correctamente.

#### Checklist

| # | Prueba | Resultado | Notas |
|:--|:-------|:----------|:------|
| 1 | Honeypot activo (campo oculto) | *[Pendiente]* | |
| 2 | Validación en cliente | *[Pendiente]* | |
| 3 | Validación en servidor | *[Pendiente]* | |
| 4 | Rate limiting funcionando | *[Pendiente]* | |
| 5 | Email llega correctamente | *[Pendiente]* | |
| 6 | No se exponen credenciales | *[Pendiente]* | |

---

## Registro de Pruebas

### Prueba: [Fecha]

**Ejecutado por:** *[Nombre]*
**Entorno:** *[Desarrollo/Producción]*
**Navegador:** *[Chrome/Firefox/Safari]*
**Versión:** *[Versión del navegador]*

#### Resultados

| Prueba | Resultado | Notas |
|:-------|:----------|:------|
| *[Prueba 1]* | ✅/❌ | *[Notas]* |
| *[Prueba 2]* | ✅/❌ | *[Notas]* |

#### Hallazgos

- **Hallazgo 1:** *[Descripción]*
- **Hallazgo 2:** *[Descripción]*

#### Acciones Correctivas

- *[Acción 1]*
- *[Acción 2]*

---

## Archivos de Resultados

| Archivo | Descripción | Fecha |
|:--------|:------------|:------|
| `resultados-lighthouse-YYYY-MM-DD.md` | Resultados de Lighthouse | *[Fecha]* |
| `resultados-accesibilidad-YYYY-MM-DD.md` | Resultados de accesibilidad | *[Fecha]* |
| `resultados-seguridad-YYYY-MM-DD.md` | Auditoría de seguridad | *[Fecha]* |

---

## Checklist General de Pruebas

- [ ] Pruebas funcionales completadas
- [ ] Pruebas de rendimiento (Lighthouse > 90)
- [ ] Pruebas de accesibilidad (WCAG 2.2 AA)
- [ ] Pruebas de seguridad (cabeceras HTTP)
- [ ] Pruebas de formulario de contacto
- [ ] Pruebas responsive (móvil, tablet, desktop)
- [ ] Pruebas multi-navegador (Chrome, Firefox, Safari)
- [ ] Documentación de resultados

---

**Última actualización:** *[Fecha]*
**Próxima revisión:** *[Fecha]*
