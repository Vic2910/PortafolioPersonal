# ISO/IEC 25010 — Modelo de Calidad de Productos y Sistemas de Software

**Organización emisora:** ISO (Organización Internacional de Normalización) / IEC (Comisión Electrotécnica Internacional)
**Familia de normas:** SQuaRE — *Software Product Quality Requirements and Evaluation* (ISO/IEC 25000)
**Versión de referencia:** ISO/IEC 25010:2023 (revisión vigente, que actualiza a la edición de 2011)
**Naturaleza:** norma de pago, no de acceso público gratuito; este documento resume su estructura y aplicación práctica con fines de referencia técnica interna del equipo de desarrollo, sin reproducir el texto normativo protegido por derechos de autor de ISO.
**Aplicación en el marco SDD:** marco conceptual para definir los **criterios de aceptación no funcionales** del portafolio (qué significa "código de calidad" más allá de que "funcione"), útil para estructurar la sección de casos de estudio del portafolio y para justificar decisiones arquitectónicas ante un evaluador técnico.

## 1. Propósito de la norma

ISO/IEC 25010 define un modelo de calidad compuesto por **características y subcaracterísticas** que permiten especificar, medir y evaluar la calidad de un producto o sistema de software desde dos perspectivas complementarias: la **calidad del producto** (atributos internos y externos del software) y la **calidad en uso** (percepción del usuario final al operar el sistema en un contexto específico).

## 2. Las ocho características del modelo de calidad del producto

| Característica | Definición operativa | Ejemplo de aplicación en un portafolio de software |
| :---- | :---- | :---- |
| **Adecuación funcional** | El software provee funciones que satisfacen las necesidades declaradas e implícitas cuando se usa bajo condiciones especificadas. | El formulario de contacto entrega efectivamente el mensaje al destinatario y confirma el envío al usuario. |
| **Eficiencia de desempeño** | Rendimiento relativo a la cantidad de recursos utilizados bajo condiciones establecidas (tiempo de respuesta, utilización de recursos, capacidad). | Cumplimiento de los umbrales de Core Web Vitals (LCP, INP, CLS) documentados en el archivo correspondiente de este marco normativo. |
| **Compatibilidad** | Capacidad de intercambiar información y/o realizar sus funciones compartiendo el mismo entorno de hardware o software con otros productos. | El sitio se renderiza correctamente en los navegadores y sistemas operativos más usados, sin dependencias que rompan la interoperabilidad. |
| **Usabilidad** | Grado en que el software puede ser usado por usuarios específicos para alcanzar objetivos concretos con efectividad, eficiencia y satisfacción. | Navegación predecible, jerarquía visual clara, cumplimiento de WCAG 2.2 AA (ver archivo correspondiente). |
| **Fiabilidad** | Capacidad de mantener un nivel de desempeño específico bajo condiciones establecidas durante un período determinado (incluye madurez, disponibilidad, tolerancia a fallos y capacidad de recuperación). | El sitio permanece disponible pese a picos de tráfico (por ejemplo, tras compartir el enlace del portafolio); el formulario de contacto degrada de forma segura si el proveedor de correo falla. |
| **Seguridad** | Grado de protección de la información y los datos de modo que las personas o sistemas no autorizados no puedan leerlos o modificarlos. | Cumplimiento del OWASP Top 10:2025, las cabeceras HTTP de seguridad y la Ley para la Protección de Datos Personales de El Salvador. |
| **Mantenibilidad** | Grado de efectividad y eficiencia con que el software puede modificarse (corregirse, mejorarse, adaptarse) por los desarrolladores previstos. | Modularidad del código (separación de rutas, controladores, servicios), uso de linters (ESLint, Prettier), historial de commits siguiendo Conventional Commits. |
| **Portabilidad** | Grado de efectividad y eficiencia con que un sistema puede transferirse de un entorno de hardware, software u organizativo a otro. | Uso de variables de entorno para configuración específica del entorno (`.env.example`), ausencia de rutas o credenciales hardcodeadas. |

## 3. Las cinco características del modelo de calidad en uso

| Característica | Definición operativa |
| :---- | :---- |
| **Efectividad** | Precisión y completitud con que los usuarios alcanzan sus objetivos específicos. |
| **Eficiencia** | Recursos gastados en relación con la precisión y completitud con que los usuarios alcanzan sus objetivos. |
| **Satisfacción** | Grado en que las necesidades del usuario se satisfacen cuando el producto se usa en un contexto específico (incluye utilidad percibida, confianza, placer y comodidad). |
| **Libertad de riesgo** | Grado en que el producto mitiga el riesgo potencial hacia el estatus económico, la vida humana, la salud o el medioambiente. |
| **Cobertura de contexto** | Grado en que el producto puede usarse con efectividad, eficiencia, libertad de riesgo y satisfacción tanto en los contextos especificados como en otros no anticipados inicialmente. |

## 4. Aplicación práctica al portafolio de software (guía para el agente de IA)

1. Usar las ocho características como **checklist de revisión no funcional** antes de considerar terminado un caso de estudio del portafolio: no basta con que la funcionalidad "funcione" (adecuación funcional); debe evaluarse explícitamente su desempeño, seguridad, mantenibilidad y portabilidad.
2. En la narrativa de cada caso de estudio del portafolio, estructurar las "compensaciones técnicas" (*trade-offs*) explícitamente en términos de estas características (por ejemplo: "se priorizó la eficiencia de desempeño sobre la portabilidad al optar por una base de datos específica del proveedor de hosting").
3. Emplear el modelo como vocabulario común entre el agente de IA y el desarrollador al discutir decisiones arquitectónicas, evitando ambigüedad sobre qué significa "calidad" en cada contexto puntual del proyecto.
