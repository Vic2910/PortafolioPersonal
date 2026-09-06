# Validación y Métricas

> **Propósito:** Definir cómo se comprobará la comprensión, acceso a proyectos, descarga del CV, funcionamiento del contacto, accesibilidad y rendimiento del portafolio.

---

## 1. Criterios de Validación

### 1.1 Comprensión

**Objetivo:** Verificar que el visitante entiende en 5 segundos qué hace el desarrollador.

| Criterio | Método de Validación | Resultado Esperado | Estado |
|:---------|:---------------------|:-------------------|:-------|
| Hero es claro | Prueba con 5 personas: "¿Qué hace esta persona?" | Respuesta correcta en < 5s | *[Pendiente]* |
| Rol visible | Verificar que el título aparece en Hero | Visible sin scroll | *[Pendiente]* |
| Propuesta de valor | Prueba: "¿Qué ofrece?" | Respuesta clara | *[Pendiente]* |
| Es profesional | Opinión de 3 personas | Sensación de profesionalismo | *[Pendiente]* |

### 1.2 Acceso a Proyectos

**Objetivo:** Verificar que los proyectos se pueden ver y explorar.

| Criterio | Método de Validación | Resultado Esperado | Estado |
|:---------|:---------------------|:-------------------|:-------|
| Proyectos cargan | Probar en 3 navegadores | Sin errores | *[Pendiente]* |
| Enlaces GitHub funcionan | Hacer clic en cada enlace | Abren repositorio | *[Pendiente]* |
| Demos accesibles | Probar cada demo | Funcionan correctamente | *[Pendiente]* |
| Casos de estudio legibles | Leer cada caso | Información completa | *[Pendiente]* |

### 1.3 Descarga del CV

**Objetivo:** Verificar que el CV se puede descargar correctamente.

| Criterio | Método de Validación | Resultado Esperado | Estado |
|:---------|:---------------------|:-------------------|:-------|
| Botón visible | Verificar en Hero y sección de contacto | Visible y claro | *[Pendiente]* |
| PDF descarga | Hacer clic en botón | PDF se descarga | *[Pendiente]* |
| PDF legible | Abrir PDF | Formato correcto | *[Pendiente]* |
| PDF optimizado ATS | Revisar estructura | Sin tablas, formato simple | *[Pendiente]* |
| Tamaño razonable | Verificar tamaño | < 1MB | *[Pendiente]* |

### 1.4 Funcionamiento del Contacto

**Objetivo:** Verificar que el formulario de contacto funciona correctamente.

| Criterio | Método de Validación | Resultado Esperado | Estado |
|:---------|:---------------------|:-------------------|:-------|
| Formulario visible | Verificar en sección de contacto | Visible y accesible | *[Pendiente]* |
| Campos obligatorios | Enviar sin datos | Mensajes de error | *[Pendiente]* |
| Validación de email | Ingresar email inválido | Error de validación | *[Pendiente]* |
| Envío exitoso | Enviar formulario válido | Mensaje de éxito | *[Pendiente]* |
| Email llega | Verificar bandeja de entrada | Email recibido | *[Pendiente]* |
| Honeypot funciona | Probar con bot (si es posible) | Spam bloqueado | *[Pendiente]* |
| Rate limiting | Enviar múltiples formularios | Límite respetado | *[Pendiente]* |

### 1.5 Accesibilidad

**Objetivo:** Verificar que el portafolio cumple con WCAG 2.2 AA.

| Criterio WCAG | Método de Validación | Resultado Esperado | Estado |
|:--------------|:---------------------|:-------------------|:-------|
| **1.1.1 Contenido No Textual** | WAVE: verificar `alt` en imágenes | Todos los imágenes con `alt` | *[Pendiente]* |
| **1.4.3 Contraste Mínimo** | Chrome DevTools: verificar contraste | Ratio ≥ 4.5:1 texto, ≥ 3:1 UI | *[Pendiente]* |
| **2.1.1 Navegación por Teclado** | Navegar solo con Tab | Todos los elementos accesibles | *[Pendiente]* |
| **2.4.7 Enfoque Visible** | Presionar Tab | Foco visible en cada elemento | *[Pendiente]* |
| **2.5.8 Tamaño del Objetivo** | Chrome DevTools | Áreas táctiles ≥ 24px | *[Pendiente]* |
| **Skip to Content** | Presionar Tab al inicio | Enlace de salto visible | *[Pendiente]* |

#### Herramientas de Validación

| Herramienta | URL | Uso |
|:------------|:----|:----|
| WAVE | https://wave.webaim.org/ | Análisis de accesibilidad |
| axe DevTools | Extensión Chrome | Auditoría de accesibilidad |
| Lighthouse | Chrome DevTools | Reporte de accesibilidad |
| Color Contrast Analyzer | Aplicación de escritorio | Verificar contraste |

### 1.6 Rendimiento

**Objetivo:** Verificar que el portafolio cumple con Core Web Vitals.

| Métrica | Umbral | Método de Validación | Resultado Esperado | Estado |
|:--------|:-------|:---------------------|:-------------------|:-------|
| **LCP** | < 2.5s | Lighthouse | < 2.5 segundos | *[Pendiente]* |
| **INP** | < 200ms | Lighthouse | < 200 milisegundos | *[Pendiente]* |
| **CLS** | < 0.1 | Lighthouse | < 0.1 | *[Pendiente]* |
| **FCP** | < 1.8s | Lighthouse | < 1.8 segundos | *[Pendiente]* |
| **TTFB** | < 800ms | Lighthouse | < 800 milisegundos | *[Pendiente]* |
| **Performance Score** | > 90 | Lighthouse | > 90 puntos | *[Pendiente]* |

#### Cómo Ejecutar Lighthouse

1. Abrir la aplicación en Chrome
2. Presionar F12 (DevTools)
3. Ir a pestaña "Lighthouse"
4. Seleccionar: Performance, Accessibility, Best Practices, SEO
5. Hacer clic en "Analyze page load"
6. Capturar resultados

### 1.7 Seguridad

**Objetivo:** Verificar que las cabeceras HTTP y configuración de seguridad son correctas.

| Cabecera | Valor Esperado | Método de Validación | Estado |
|:---------|:---------------|:---------------------|:-------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | securityheaders.com | *[Pendiente]* |
| `Content-Security-Policy` | Configurada correctamente | securityheaders.com | *[Pendiente]* |
| `X-Frame-Options` | `DENY` | DevTools → Network | *[Pendiente]* |
| `X-Content-Type-Options` | `nosniff` | DevTools → Network | *[Pendiente]* |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | DevTools → Network | *[Pendiente]* |
| `Permissions-Policy` | Configurada | DevTools → Network | *[Pendiente]* |

---

## 2. Métricas a Monitorear

### 2.1 Métricas de Uso (Post-lanzamiento)

| Métrica | Objetivo (Mes 1) | Objetivo (Mes 3) | Objetivo (Mes 6) |
|:--------|:-----------------|:-----------------|:-----------------|
| Visitantes únicos | 50 | 150 | 300 |
| Páginas vistas | 150 | 500 | 1000 |
| Tiempo promedio en sitio | 1 min | 2 min | 3 min |
| Páginas por sesión | 1.5 | 2.0 | 2.5 |
| Tasa de rebote | < 70% | < 60% | < 50% |

### 2.2 Métricas de Conversión

| Métrica | Objetivo (Mes 1) | Objetivo (Mes 3) | Objetivo (Mes 6) |
|:--------|:-----------------|:-----------------|:-----------------|
| Descargas de CV | 5 | 15 | 30 |
| Envíos de formulario | 2 | 5 | 10 |
| Clics en GitHub | 10 | 30 | 60 |
| Clics en LinkedIn | 5 | 15 | 30 |

### 2.3 Métricas Técnicas

| Métrica | Objetivo | Método de Monitoreo |
|:--------|:---------|:--------------------|
| Uptime | 99.9% | Vercel Analytics |
| Tiempo de respuesta | < 200ms | Vercel Analytics |
| Errores JavaScript | 0 | Sentry (opcional) |
| Lighthouse Score | > 90 | Auditoría manual trimestral |

---

## 3. Plan de Validación Post-Lanzamiento

### Semana 1: Validación Técnica

| Día | Tarea | Responsable | Estado |
|:----|:------|:------------|:-------|
| 1 | Verificar despliegue en Vercel | Desarrollador | *[Pendiente]* |
| 2 | Probar formulario de contacto | Desarrollador | *[Pendiente]* |
| 3 | Verificar descarga de CV | Desarrollador | *[Pendiente]* |
| 4 | Ejecutar Lighthouse | Desarrollador | *[Pendiente]* |
| 5 | Verificar accesibilidad | Desarrollador | *[Pendiente]* |
| 6 | Probar en múltiples dispositivos | Desarrollador | *[Pendiente]* |
| 7 | Documentar hallazgos | Desarrollador | *[Pendiente]* |

### Semana 2: Validación con Usuarios

| Día | Tarea | Responsable | Estado |
|:----|:------|:------------|:-------|
| 1 | Enviar a 5 personas para feedback | Desarrollador | *[Pendiente]* |
| 2 | Recopilar feedback | Desarrollador | *[Pendiente]* |
| 3 | Analizar resultados | Desarrollador | *[Pendiente]* |
| 4 | Implementar mejoras críticas | Desarrollador | *[Pendiente]* |
| 5 | Re-validar cambios | Desarrollador | *[Pendiente]* |
| 6 | Publicar en LinkedIn | Desarrollador | *[Pendiente]* |
| 7 | Monitorear métricas iniciales | Desarrollador | *[Pendiente]* |

### Mes 1: Monitoreo Continuo

| Semana | Tarea | Estado |
|:-------|:------|:-------|
| 1 | Revisar métricas de uso | *[Pendiente]* |
| 2 | Verificar formularios recibidos | *[Pendiente]* |
| 3 | Ejecutar Lighthouse nuevamente | *[Pendiente]* |
| 4 | Documentar aprendizajes | *[Pendiente]* |

---

## 4. Encuesta de Feedback

### Formulario para Feedback de Usuarios

```
¿Qué opinas de mi portafolio?

1. ¿El mensaje principal es claro? [1-5]
2. ¿Los proyectos son impresionantes? [1-5]
3. ¿Es fácil navegar? [1-5]
4. ¿Encontraste lo que buscabas? [Sí/No]
5. ¿Qué mejorarías? [Texto libre]
6. ¿Te contratarías o referirías? [Sí/No/Quizás]
```

### Preguntas para Entrevistas Técnicas

```
Basado en mi portafolio:

1. ¿Qué es lo primero que notaste?
2. ¿Qué proyectos te parecieron más relevantes?
3. ¿Qué información faltaba?
4. ¿Qué tan profesional se ve?
5. ¿Algún consejo para mejorar?
```

---

## 5. Checklist de Validación Completa

### Pre-Lanzamiento

- [ ] Hero claro y conciso
- [ ] 3-5 proyectos documentados
- [ ] Casos de estudio completos
- [ ] Formulario de contacto funcional
- [ ] CV descargable y legible
- [ ] Responsive en móvil y tablet
- [ ] Accesibilidad verificada (WAVE)
- [ ] Rendimiento verificado (Lighthouse > 90)
- [ ] Seguridad verificada (cabeceras HTTP)
- [ ] SEO básico configurado

### Post-Lanzamiento

- [ ] Formularios recibidos correctamente
- [ ] CV descargado al menos 1 vez
- [ ] Feedback de 5 personas recopilado
- [ ] Mejoras críticas implementadas
- [ ] Publicado en LinkedIn
- [ ] Métricas iniciales documentadas

---

## 6. Herramientas de Monitoreo

| Herramienta | Propósito | Costo | Configuración |
|:------------|:----------|:------|:--------------|
| Vercel Analytics | Métricas de uso | Gratis | Automático |
| Google Analytics | Analytics avanzado | Gratis | Requiere configuración |
| Sentry | Errores JavaScript | Gratis (free tier) | Requiere integración |
| Plausible | Analytics privado | $9/mes | Alternativa a GA |
| Lighthouse | Auditoría rendimiento | Gratis | Manual |

---

## 7. Iteraciones Post-Lanzamiento

### v1.0 (Lanzamiento Inicial)
- Funcionalidades básicas
- Validación con usuarios
- Corrección de bugs críticos

### v1.1 (1-2 semanas después)
- Mejoras de UX según feedback
- Optimización de rendimiento
- Contenido adicional (testimonios)

### v1.2 (1 mes después)
- Blog técnico (1-2 artículos)
- Modo oscuro
- Analytics avanzado

### v2.0 (3 meses después)
- Multi-idioma
- Sistema de comentarios
- PWA

---

**Última actualización:** *[Fecha]*
**Próxima revisión:** *[Fecha]*
