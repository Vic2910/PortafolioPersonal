# AG-04: Desarrollador / Par Técnico

## Datos del Agente

| Campo | Valor |
|:------|:------|
| **ID** | AG-04 |
| **Nombre** | Desarrollador / Ingeniero de Software / Par Técnico |
| **Objetivo** | Evaluar la calidad técnica y aprender del trabajo de otro desarrollador |
| **Tiempo Promedio** | 5-10 minutos |
| **Prioridad** | Media |

---

## Perfil

### ¿Quién es?
- Desarrollador que busca referencias técnicas
- Ingeniero evaluando posibles colaboradores
- Estudiante aprendiendo de otros desarrolladores
- Contribuidor open source buscando nuevos talentos

### ¿Qué busca?
- Calidad de código y buenas prácticas
- Arquitectura y patrones de diseño
- Soluciones creativas a problemas complejos
- Tecnologías y herramientas interesantes

### ¿Cómo evalúa?
- Revisión del Hero Section (5 segundos)
- Exploración de proyectos (3-5 minutos)
- Análisis profundo de GitHub (5-10 minutos)
- Revisión de documentación técnica (5 minutos)

---

## Recorrido Esperado

```
1. Hero Section (5 seg)
   → Entiende: Stack tecnológico principal
   → Pregunta: ¿Usa tecnologías que me interesan?
   → Decisión: ¿Explorar código?

2. Proyectos (3-5 min)
   → Entiende: Qué ha construido, cómo lo ha resuelto
   → Evalúa: Creatividad, eficiencia
   → Pregunta: ¿Ha resuelto problemas interesantes?

3. GitHub (5-10 min)
   → Entiende: Código fuente, documentación
   → Evalúa: Calidad de código, buenas prácticas
   → Pregunta: ¿Aprendería algo de su código?

4. Blog/Artículos (5 min) - Si existen
   → Entiende: Conocimiento profundo
   → Evalúa: Capacidad de comunicación
   → Pregunta: ¿Puede explicar conceptos técnicos?

5. Contacto (1 min)
   → Decide: Conectar para networking
   → Acción: Seguir en GitHub, enviar mensaje
```

---

## Criterios de Evaluación

### Must Have (Eliminación)
| Criterio | Descripción | Requisito |
|:---------|:------------|:----------|
| Código accesible | Repositorios públicos | Al menos 2 repos |
| README descriptivo | Documentación básica | En cada proyecto |
| Código organizado | Estructura clara | Sin archivos sueltos |

### Should Have (Fortalezas)
| Criterio | Descripción | Ideal |
|:---------|:------------|:------|
| TypeScript | Type safety | Proyecto en TS |
| Tests | Pruebas unitarias | Cobertura medible |
| CI/CD | Integración continua | GitHub Actions |
| Documentación técnica | ADRs, diagramas | Casos de estudio |

### Nice to Have (Diferenciadores)
| Criterio | Descripción | Valor Agregado |
|:---------|:------------|:---------------|
| Contribuciones OSS | Open source | Muestra comunidad |
| Arquitectura limpia | Patrones de diseño | Código mantenible |
| Optimización | Performance | Métricas de rendimiento |

---

## Contenido Crítico para Este Agente

### Hero Section
- Stack tecnológico detallado
- Enlace a GitHub prominente

### Proyectos
- Arquitectura aplicada
- Decisiones técnicas documentadas
- trade-offs explicados

### GitHub
- Código limpio y organizado
- Commits atómicos y descriptivos
- Branches strategias claras

---

## Qué Evalúa Este Agente en GitHub

### Estructura del Repositorio
```
mi-proyecto/
├── src/
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── types/
├── tests/
├── docs/
├── README.md
├── .gitignore
└── package.json
```

### Calidad de Código
| Aspecto | Lo que busca | Ejemplo Bueno |
|:--------|:------------|:--------------|
| Nombres | Variables/funciones descriptivas | `getUserById` no `fn1` |
| Funciones | Pequeñas, responsabilidad única | < 50 líneas |
| Comentarios | Solo cuando es necesario | No código obvio |
| Error handling | Manejo robusto | Try-catch, validación |

### Documentación
| Documento | Contenido Esperado |
|:----------|:-------------------|
| README | Instalación, uso, ejemplos |
| CHANGELOG | Versiones, cambios |
| CONTRIBUTING | Guía para contribuir |
| LICENSE | Licencia clara |

---

## Preguntas que Este Agente se Hace

1. ¿El código es legible y mantenible?
2. ¿Usa patrones de diseño apropiados?
3. ¿Tiene buenas prácticas de testing?
4. ¿Documenta sus decisiones técnicas?
5. ¿Ha contribuido a proyectos open source?
6. ¿Aprendería algo nuevo de su trabajo?

---

## Errores que Provocan Rechazo

| Error | Impacto | Solución |
|:------|:--------|:---------|
| Código desordenado | Alto | Refactorizar y organizar |
| Sin documentación | Alto | Agregar READMEs |
| Sin tests | Medio | Agregar pruebas |
| Variables confusas | Medio | Renombrar descriptivamente |
| Código duplicado | Medio | Extraer funciones |

---

## Métricas que Evalúa

### GitHub
| Métrica | Ideal | Mínimo |
|:--------|:------|:-------|
| Commits/día | > 1 | > 0.5 |
| Repos públicos | > 5 | > 2 |
| Stars recibidos | > 10 | > 0 |
| Contribuciones | > 100 | > 50 |

### Código
| Métrica | Ideal | Mínimo |
|:--------|:------|:-------|
| Cobertura tests | > 80% | > 50% |
| Líneas por función | < 30 | < 50 |
| Complejidad ciclomática | < 5 | < 10 |
| Deuda técnica | < 5% | < 10% |

---

## Referencias

| Documento | Relevancia |
|:----------|:-----------|
| `07-arquitectura/01-arquitectura-general.md` | Decisiones arquitectónicas |
| `07-arquitectura/02-arquitectura-frontend.md` | Estructura frontend |
| `07-arquitectura/03-arquitectura-backend.md` | Estructura backend |

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*
