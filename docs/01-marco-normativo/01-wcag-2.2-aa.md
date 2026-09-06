# WCAG 2.2 — Pautas de Accesibilidad para el Contenido Web (Nivel de Conformidad AA)

**Organización emisora:** W3C (World Wide Web Consortium), a través de la Web Accessibility Initiative (WAI)
**Versión vigente:** WCAG 2.2, Recomendación W3C (actualiza a WCAG 2.1, con la cual es retrocompatible: todo contenido conforme a 2.2 también satisface 2.1)
**Niveles de conformidad:** A (mínimo), AA (estándar recomendado, exigido habitualmente por normativas de accesibilidad digital) y AAA (óptimo, no exigido de forma general)
**Aplicación en el marco SDD:** nivel de conformidad **AA obligatorio** para el portafolio; su incumplimiento se interpreta como falta de rigor técnico y desconocimiento de estándares fundamentales de la plataforma web.

## 1. Los cuatro principios (POUR)

WCAG organiza sus criterios de éxito en torno a cuatro principios: el contenido debe ser **Perceptible, Operable, Comprensible y Robusto**.

## 2. Semántica estructural HTML5

- Debe erradicarse la sobreutilización de etiquetas `<div>` no semánticas en favor de hitos de navegación explícitos: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>` y `<footer>`.
- Debe incluirse un **enlace de salto de navegación** ("skip to content"), oculto visualmente pero accesible por teclado, que permita situar el foco de lectura directamente sobre el contenido principal.

## 3. Navegación por teclado y gestión del foco

- Todo elemento interactivo debe ser completamente operable mediante teclado, con un **orden de tabulación predecible** y sin bloqueos de foco (criterio 2.1.1, Nivel A).
- El foco de cualquier componente interactivo debe ser **visualmente identificable** mediante la pseudoclase `:focus-visible` (criterio 2.4.7, Nivel AA).

## 4. Criterios de contraste y color

| Criterio WCAG | Nivel | Requisito de conformidad |
| :---- | :---- | :---- |
| **1.4.3 Contraste (mínimo)** | AA | Ratio de contraste mínimo de **4.5:1** para texto estándar; **3:1** para texto grande (≥18pt o ≥14pt en negrita) y componentes visuales de interfaz. |
| **1.4.11 Contraste de componentes no textuales** | AA | Los elementos gráficos de interfaz y los indicadores de estado requieren igualmente un ratio mínimo de 3:1 frente a colores adyacentes. |

## 5. Nuevos criterios introducidos en WCAG 2.2

| Criterio WCAG 2.2 | Nivel | Requisito de conformidad |
| :---- | :---- | :---- |
| **2.5.8 Tamaño del objetivo (mínimo)** | AA | Las áreas de pulsación táctil deben tener un tamaño mínimo de **24×24 píxeles CSS**, o contar con suficiente espaciado perimetral para evitar activaciones accidentales, salvo excepciones (elementos en línea dentro de una oración, o cuando el tamaño lo determina el agente de usuario). |
| **2.4.11 Foco no oculto (mínimo)** | AA | Cuando un componente recibe el foco de teclado, al menos una parte del indicador de foco debe permanecer visible, sin quedar completamente oculto por otro contenido (por ejemplo, encabezados fijos superpuestos). |
| **3.3.7 Entrada redundante** | A | La información ya proporcionada previamente por el usuario en un mismo proceso no debe volver a solicitarse, salvo excepciones justificadas (seguridad, verificación). |

## 6. Contenido no textual

Cualquier elemento gráfico que transmita significado debe contar con **texto alternativo** mediante el atributo `alt` (criterio 1.1.1, Nivel A); los elementos meramente ornamentales deben ocultarse de la tecnología asistiva mediante `aria-hidden="true"` o un atributo `alt=""` vacío.

## 7. Tabla resumen de criterios técnicos priorizados

| Criterio WCAG 2.1/2.2 | Nivel | Mecanismo de validación técnica |
| :---- | :---- | :---- |
| 1.4.3 Contraste Mínimo | AA | Medición con analizadores de contraste en las paletas de color claras y oscuras del sitio. |
| 2.1.1 Navegación por Teclado | A | Recorrido interactivo del sitio completo usando exclusivamente la tecla Tab y activación con Enter/Espacio. |
| 2.4.7 Enfoque Visible | AA | Verificación de estilos explícitos en `:focus-visible` para todo elemento interactivo. |
| 2.5.8 Tamaño del Objetivo (Mínimo) | AA | Medición de las dimensiones mínimas de pulsación en CSS, especialmente en la versión móvil. |
| 1.1.1 Contenido No Textual | A | Revisión de atributos `alt` contextuales y marcadores `aria-hidden="true"` en iconografía auxiliar. |

## 8. Aplicación práctica al portafolio de software (guía para el agente de IA)

1. Antes de marcar cualquier sección del portafolio como completa, ejecutar una verificación automatizada (por ejemplo, Lighthouse o axe-core) y una verificación manual de navegación por teclado.
2. Al elegir la paleta cromática del sitio (ver el archivo de diseño visual del portafolio), validar que la combinación de colores propuesta cumpla el ratio de contraste 4.5:1 antes de darla por definitiva, no después.
3. En componentes táctiles del diseño móvil (botones, enlaces del menú), verificar explícitamente el tamaño mínimo de 24×24px exigido por el criterio 2.5.8, particularmente en la versión reorganizada en flujo vertical del *Bento Grid*.
4. No solicitar dos veces la misma información al usuario dentro de un mismo flujo (por ejemplo, en un formulario de contacto de varios pasos), conforme al criterio 3.3.7.
