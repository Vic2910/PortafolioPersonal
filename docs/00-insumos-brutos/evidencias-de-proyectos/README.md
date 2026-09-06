# Evidencias de Proyectos

> **Propósito:** Carpeta que contiene las evidencias documentales de cada proyecto del portafolio. Cada subcarpeta corresponde a un proyecto y contiene capturas, decisiones técnicas, pruebas, resultados y limitaciones.

---

## Estructura

```
evidencias-de-proyectos/
├── README.md                          # Este archivo
├── dashboard-ventas/
│   ├── capturas/                      # Screenshots de la interfaz
│   ├── decisiones-tecnicas/           # Justificación de tecnologías y arquitectura
│   ├── pruebas/                       # Resultados de pruebas
│   └── resultados/                    # Métricas de impacto y rendimiento
├── sistema-autenticacion/
│   ├── capturas/
│   ├── decisiones-tecnicas/
│   ├── pruebas/
│   └── resultados/
├── e-commerce/
│   ├── capturas/
│   ├── decisiones-tecnicas/
│   ├── pruebas/
│   └── resultados/
├── api-documentada/
│   ├── capturas/
│   ├── decisiones-tecnicas/
│   ├── pruebas/
│   └── resultados/
├── sistema-crud/
│   ├── capturas/
│   ├── decisiones-tecnicas/
│   ├── pruebas/
│   └── resultados/
└── chat-comunicacion/
    ├── capturas/
    ├── decisiones-tecnicas/
    ├── pruebas/
    └── resultados/
```

---

## Contenido por Subcarpeta

### capturas/

Almacenar screenshots de la interfaz de usuario. Recomendaciones:

- **Resolución mínima:** 1280x720 px
- **Formato:** PNG (para interfaces) o WebP (para optimizar tamaño)
- **Cantidad recomendada:** 3-5 capturas por proyecto
- **Tipos de captura:**
  - Vista general del dashboard/principal
  - Funcionalidad específica destacada
  - Versión móvil (responsive)
  - Formulario o componente interactivo
  - Estado de error o validación

**Nomenclatura sugerida:**
```
capturas/
├── 01-vista-general.png
├── 02-funcionalidad-especifica.png
├── 03-vista-movil.png
├── 04-formulario-contacto.png
└── 05-estado-validacion.png
```

### decisiones-tecnicas/

Documentar las decisiones de arquitectura y tecnología. Crear un archivo `.md` por decisión relevante:

**Plantilla para cada decisión:**
```markdown
# Decisión: [Título de la decisión]

## Contexto
[Descripción del problema o situación que requirió una decisión]

## Opciones Evaluadas
1. **Opción A:** [Descripción] - Pros/Contras
2. **Opción B:** [Descripción] - Pros/Contras
3. **Opción C:** [Descripción] - Pros/Contras

## Decisión Tomada
[Opción seleccionada y por qué]

## Consecuencias
- **Positivas:** [Beneficios esperados]
- **Negativas:** [Trade-offs aceptados]
- **Riesgos:** [Posibles problemas a futuro]
```

**Archivos sugeridos:**
```
decisiones-tecnicas/
├── 01-seleccion-framework-backend.md
├── 02-diseno-base-datos.md
├── 03-estrategia-autenticacion.md
├── 04-arquitectura-frontend.md
└── 05-estrategia-despliegue.md
```

### pruebas/

Documentar los resultados de pruebas realizadas. Incluir:

- **Pruebas manuales:** Checklists de funcionalidad
- **Pruebas automatizadas:** Resultados de ejecución
- **Pruebas de rendimiento:** Métricas de Lighthouse, GTmetrix
- **Pruebas de accesibilidad:** Resultados de WAVE, axe
- **Pruebas de seguridad:** Auditoría de cabeceras HTTP

**Plantilla para reporte de pruebas:**
```markdown
# Reporte de Pruebas: [Nombre del Proyecto]

## Fecha: [fecha]

## Pruebas Realizadas

### 1. Pruebas Funcionales
| Caso de prueba | Resultado | Notas |
|:---------------|:----------|:------|
| [Caso 1] | ✅ Pass / ❌ Fail | [Notas] |
| [Caso 2] | ✅ Pass / ❌ Fail | [Notas] |

### 2. Pruebas de Rendimiento
| Métrica | Resultado | Umbral objetivo |
|:--------|:----------|:----------------|
| LCP | [valor] | < 2.5s |
| INP | [valor] | < 200ms |
| CLS | [valor] | < 0.1 |
| Puntuación Lighthouse | [valor] | > 90 |

### 3. Pruebas de Accesibilidad
| Criterio WCAG | Estado | Notas |
|:--------------|:-------|:------|
| Navegación por teclado | ✅/❌ | [Notas] |
| Contraste mínimo | ✅/❌ | [Notas] |
| Texto alternativo | ✅/❌ | [Notas] |

### 4. Pruebas de Seguridad
| Cabecera | Estado | Valor |
|:---------|:-------|:------|
| HSTS | ✅/❌ | [valor] |
| CSP | ✅/❌ | [valor] |
| X-Frame-Options | ✅/❌ | [valor] |

## Conclusiones
[Resumen de resultados y áreas de mejora]
```

### resultados/

Almacenar métricas de impacto y rendimiento del proyecto. Incluir:

- **Métricas de uso:** Visitantes, páginas vistas, tiempo en sitio
- **Métricas técnicas:** Rendimiento, disponibilidad, errores
- **Métricas de negocio:** Si aplica (ventas, registros, etc.)
- **Gráficas comparativas:** Antes/después de mejoras

**Plantilla para resultados:**
```markdown
# Resultados del Proyecto: [Nombre]

## Período de Análisis: [fechas]

## Métricas de Uso
| Métrica | Valor | Objetivo | Estado |
|:--------|:------|:---------|:-------|
| Visitantes únicos | [valor] | [objetivo] | ✅/❌ |
| Tiempo promedio en sitio | [valor] | [objetivo] | ✅/❌ |
| Tasa de rebote | [valor] | [objetivo] | ✅/❌ |

## Métricas Técnicas
| Métrica | Valor | Objetivo | Estado |
|:--------|:------|:---------|:-------|
| Tiempo de carga promedio | [valor] | < 2s | ✅/❌ |
| Disponibilidad | [valor] | 99.9% | ✅/❌ |
| Errores 404 | [valor] | 0 | ✅/❌ |

## Mejoras Implementadas
| Mejora | Impacto | Métrica mejorada |
|:-------|:--------|:-----------------|
| [Mejora 1] | [Impacto] | [Métrica] |
| [Mejora 2] | [Impacto] | [Métrica] |

## Lecciones Aprendidas
- [Lección 1]
- [Lección 2]
- [Lección 3]
```

---

## Cómo Usar Esta Carpeta

### Para el Desarrollador

1. **Al completar un proyecto:** Crear la subcarpeta correspondiente si no existe
2. **Capturar screenshots:** Tomar capturas de las vistas principales
3. **Documentar decisiones:** Crear archivos `.md` en `decisiones-tecnicas/`
4. **Ejecutar pruebas:** Guardar resultados en `pruebas/`
5. **Registrar métricas:** Almacenar datos en `resultados/`

### Para el Portafolio

Las evidencias de esta carpeta se usarán para:

- **Casos de estudio:** Narrativa técnica de cada proyecto
- **Sección de proyectos:** Descripción y capturas para el portafolio
- **CV:** Referencia a proyectos con evidencias verificables
- **Entrevistas:** Material de apoyo para discusiones técnicas

---

## Checklist de Evidencias por Proyecto

> Marcar con [x] cuando esté completo.

### Dashboard de Ventas/E-commerce
- [ ] Capturas de interfaz (3-5 imágenes)
- [ ] Documentación de decisiones técnicas
- [ ] Resultados de pruebas funcionales
- [ ] Métricas de rendimiento (Lighthouse)
- [ ] Pruebas de accesibilidad
- [ ] Resultados de seguridad
- [ ] Diagrama de arquitectura

### Sistema de Autenticación
- [ ] Capturas de interfaz
- [ ] Documentación de decisiones técnicas
- [ ] Diagrama de flujo de autenticación
- [ ] Resultados de pruebas de seguridad
- [ ] Pruebas de casos edge

### E-commerce
- [ ] Capturas de interfaz
- [ ] Documentación de decisiones técnicas
- [ ] Diagrama de flujo de compra
- [ ] Resultados de pruebas funcionales
- [ ] Métricas de rendimiento

### API Documentada
- [ ] Documentación Swagger generada
- [ ] Capturas de documentación
- [ ] Pruebas de endpoints
- [ ] Resultados de validación de esquemas

### Sistema CRUD
- [ ] Capturas de interfaz
- [ ] Diagrama ER de base de datos
- [ ] Documentación de decisiones técnicas
- [ ] Pruebas de operaciones CRUD

### Chat/Comunicación
- [ ] Capturas de interfaz
- [ ] Diagrama de flujo de comunicación
- [ ] Pruebas de WebSockets/SSE
- [ ] Métricas de tiempo real

---

## Convenciones de Nomenclatura

| Tipo de Archivo | Formato | Ejemplo |
|:----------------|:--------|:--------|
| Capturas de pantalla | PNG/WebP | `01-vista-general.png` |
| Documentación técnica | Markdown | `01-seleccion-framework.md` |
| Resultados de pruebas | Markdown | `reporte-pruebas-2024-01.md` |
| Métricas | CSV/Markdown | `metricas-rendimiento.csv` |
| Diagramas | Mermaid/PlantUML | `diagrama-arquitectura.md` |

---

**Última actualización:** *[Fecha]*
**Próxima revisión:** *[Fecha]*
