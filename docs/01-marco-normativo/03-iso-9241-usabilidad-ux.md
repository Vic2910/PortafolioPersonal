# ISO 9241 — Ergonomía de la Interacción Humano-Sistema

**Organización emisora:** ISO
**Parte de referencia principal:** ISO 9241-11:2018 (definición y contexto de la usabilidad) e ISO 9241-210:2019 (procesos de diseño centrado en el ser humano para sistemas interactivos)
**Naturaleza:** norma de pago; este documento resume su estructura y aplicación práctica con fines de referencia técnica interna, sin reproducir el texto normativo protegido por derechos de autor de ISO.
**Aplicación en el marco SDD:** fundamento conceptual formal de las decisiones de UI/UX del portafolio (jerarquía visual, navegación, tipografía), permitiendo justificar dichas decisiones ante un evaluador técnico en términos de un estándar internacional reconocido, y no solo como preferencia estética subjetiva.

## 1. ISO 9241-11: definición de usabilidad

La norma define **usabilidad** como el grado en que un producto puede ser usado por usuarios específicos para lograr objetivos específicos con:

| Componente | Definición operativa | Métrica orientativa aplicable a un portafolio |
| :---- | :---- | :---- |
| **Efectividad** | Precisión y completitud con la que los usuarios alcanzan los objetivos especificados. | Porcentaje de evaluadores que logran identificar en menos de 10 segundos la especialidad técnica y el valor que aporta el candidato. |
| **Eficiencia** | Recursos utilizados en relación con la efectividad alcanzada (tiempo, esfuerzo cognitivo, clics). | Número de interacciones necesarias para acceder al CV en PDF, al repositorio de GitHub o al formulario de contacto desde la página principal. |
| **Satisfacción** | Ausencia de incomodidad y actitudes positivas hacia el uso del producto. | Percepción cualitativa de fluidez, ausencia de fricción visual o de animaciones que retrasen artificialmente la lectura. |

Un aspecto clave de esta definición es que la usabilidad **no es una propiedad absoluta** del producto, sino que depende del **contexto de uso**: usuarios específicos (reclutadores vs. líderes técnicos), objetivos específicos (cribado rápido vs. análisis profundo de arquitectura) y un contexto de uso específico (dispositivo, entorno, tiempo disponible).

## 2. ISO 9241-210: diseño centrado en el ser humano

Esta parte de la norma establece los **principios y actividades** de un proceso de diseño centrado en el ser humano (*Human-Centred Design*, HCD) para sistemas interactivos, estructurado en un ciclo iterativo:

1. **Comprender y especificar el contexto de uso:** identificar quiénes son los usuarios (en este caso, dos perfiles divergentes: personal de reclutamiento y líderes técnicos), qué objetivos persiguen y en qué condiciones interactúan con el portafolio.
2. **Especificar los requisitos del usuario:** traducir las necesidades identificadas en requisitos concretos de diseño (por ejemplo, "el evaluador debe poder identificar la especialidad técnica en los primeros segundos de interacción").
3. **Producir soluciones de diseño:** generar prototipos o iteraciones de la interfaz que respondan a los requisitos especificados.
4. **Evaluar el diseño frente a los requisitos:** contrastar las soluciones propuestas contra los objetivos de usabilidad definidos, idealmente mediante pruebas con usuarios reales o heurísticas de evaluación.

Este ciclo se repite de forma iterativa hasta que los objetivos de usabilidad se satisfacen.

## 3. Principios de diseño centrado en el ser humano (según la norma)

- El diseño se basa en una comprensión explícita de usuarios, tareas y contextos de uso.
- Los usuarios participan durante todo el diseño y desarrollo (o, en su defecto, se simulan sus perfiles mediante investigación previa).
- El diseño se perfecciona mediante evaluación centrada en el usuario.
- El proceso es iterativo.
- El diseño aborda la experiencia de usuario completa (no solo la funcionalidad aislada).
- El equipo de diseño incluye habilidades y perspectivas multidisciplinares.

## 4. Relación con otras normas de este marco

ISO 9241 provee el **fundamento conceptual y procesual** de la usabilidad, mientras que WCAG 2.2 AA (ver archivo correspondiente) provee los **criterios técnicos verificables** que garantizan que esa usabilidad se extienda a personas con discapacidad; ambas normas son complementarias, no sustitutas entre sí.

## 5. Aplicación práctica al portafolio de software (guía para el agente de IA)

1. Antes de definir la arquitectura de información del portafolio, documentar explícitamente los **dos contextos de uso divergentes** (cribado rápido de reclutamiento vs. análisis técnico profundo) como parte del "contexto de uso" exigido por ISO 9241-210.
2. Justificar decisiones de diseño (por ejemplo, evitar animaciones de escritura tipo *typewriter*, o priorizar los proyectos destacados sobre la biografía extensa) en términos explícitos de **efectividad, eficiencia y satisfacción**, no solo como preferencia estética.
3. Aplicar el ciclo iterativo de HCD incluso a pequeña escala: tras cada iteración relevante del portafolio, contrastar el resultado contra los requisitos de usuario originalmente definidos (por ejemplo, solicitando retroalimentación breve a colegas que actúen como *proxy* de reclutadores o líderes técnicos).
