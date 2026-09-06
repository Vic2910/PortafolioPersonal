# RN-03: Reglas de Rendimiento

## Definición

El portafolio debe cargar rápidamente y ser interactuable en menos de 2.5 segundos. El rendimiento afecta directamente la experiencia del usuario y el SEO.

---

## Criterios de Validación

### Core Web Vitals
1. [ ] **LCP (Largest Contentful Paint):** < 2.5 segundos
2. [ ] **INP (Interaction to Next Paint):** < 200 milisegundos
3. [ ] **CLS (Cumulative Layout Shift):** < 0.1

### Métricas Adicionales
4. [ ] **FCP (First Contentful Paint):** < 1.8 segundos
5. [ ] **TTFB (Time to First Byte):** < 800 milisegundos
6. [ ] **Speed Index:** < 3.0 segundos

### Optimización de Recursos
7. [ ] Las imágenes están en formato WebP o AVIF
8. [ ] Las imágenes tienen dimensiones explícitas (width/height)
9. [ ] Las fuentes se precargan con `rel="preload"`
10. [ ] El JavaScript se carga de forma diferida (async/defer)
11. [ ] El CSS crítico se inyecta inline

### Infraestructura
12. [ ] El sitio se sirve desde CDN perimetral
13. [ ] Se usa HTTP/2 o HTTP/3
14. [ ] El cache del navegador se configura correctamente
15. [ ] Gzip/Brotli está habilitado

---

## Referencias

| Norma | Archivo | Requisito |
|:------|:--------|:----------|
| Core Web Vitals | `02-core-web-vitals.md` | Estándar completo |
| ISO 25010 | `01-iso-iec-25010-calidad-software.md` | Eficiencia de rendimiento |

---

## Herramientas de Medición

| Herramienta | Métrica | Frecuencia |
|:------------|:--------|:-----------|
| Lighthouse | Todas las CWV | Cada release |
| PageSpeed Insights | CWV en campo | Semanal |
| Chrome DevTools | Performance | Cada cambio |
| WebPageTest | Análisis profundo | Mensual |

---

## Excepciones

- Las páginas con contenido dinámico pueden tener CLS temporal
- Las primeras visitas pueden tener TTFB más alto (cold start)
- El modo desarrollo tiene rendimiento degradado

---

**Responsable:** *[Por definir]*
**Última actualización:** *[Fecha]*
