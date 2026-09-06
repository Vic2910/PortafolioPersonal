# Ley de Ciberseguridad y Seguridad de la Información (El Salvador)

**Identificación:** Decreto Legislativo N.° 143 de 2024 (algunas fuentes secundarias citan números de decreto distintos por errores de transcripción; el texto oficial se publicó junto con la Ley para la Protección de Datos Personales el mismo día)
**Aprobación:** 12 de noviembre de 2024
**Publicación:** Diario Oficial N.° 219, Tomo N.° 445, del 15 de noviembre de 2024
**Vigencia:** 23 de noviembre de 2024 (ocho días después de la publicación)
**Aplicación en el marco SDD:** referencia de buenas prácticas de ciberseguridad exigibles al Estado salvadoreño; útil como estándar de referencia nacional que un portafolio profesional puede citar para demostrar conciencia regulatoria, especialmente si el desarrollador presta servicios a entidades públicas, municipales o que administran fondos públicos.

## 1. Objeto

Establecer los principios rectores, el marco legal, la institucionalidad, los lineamientos y las políticas de protección que permitan **estructurar, regular, auditar y fiscalizar** las medidas de ciberseguridad y seguridad de la información en poder de las instituciones públicas de El Salvador, fortaleciendo la protección del ciberespacio nacional y promoviendo un entorno tecnológico confiable para el desarrollo económico y social del país.

## 2. Ámbito de aplicación (sujetos obligados)

- Los órganos del Gobierno y sus dependencias.
- Las instituciones oficiales autónomas.
- Las autoridades municipales.
- Cualquier entidad u organismo que administre recursos públicos, ejecute actos de la Administración Pública o incida en las infraestructuras críticas del país (telecomunicaciones, energía, finanzas, entre otros sectores esenciales).
- De forma extensiva, puede alcanzar a entidades del sector privado que gestionen información pública o que interactúen con sistemas críticos del Estado (por ejemplo, proveedores tecnológicos contratados por instituciones públicas).

## 3. Institucionalidad: Agencia de Ciberseguridad del Estado (ACE)

La ley crea la **Agencia de Ciberseguridad del Estado (ACE)** como el organismo rector encargado de:

- Elaborar la **Política de Ciberseguridad y Seguridad de la Información** de la nación, con lineamientos, planes y programas de acción.
- Emitir normativas, protocolos, lineamientos, estándares y criterios técnicos basados en mejores prácticas internacionales (marco de referencia natural para alinear el desarrollo de software con estándares como ISO/IEC 27001 o el NIST Cybersecurity Framework).
- Crear e implementar programas de acción para responder a ciberamenazas o incidentes.
- Crear y administrar el **Registro Nacional de Amenazas e Incidentes de Ciberseguridad**.
- Diseñar campañas y planes de formación, capacitación y difusión en ciberseguridad.
- Coordinar con las instituciones obligadas y fiscalizar el cumplimiento de la ley.

La agencia es dirigida por un Director General, asistido por un Director de Ciberseguridad y Seguridad de la Información.

## 4. Obligaciones de los sujetos obligados (Art. 6)

1. Implementar **sistemas de gestión de ciberseguridad y seguridad de la información** (equivalentes funcionales a un SGSI conforme a ISO/IEC 27001).
2. Elaborar **estrategias de seguridad informática y de la información** apegadas a estándares internacionales.
3. Mantener un **registro actualizado** de todas las acciones ejecutadas que compongan el sistema de gestión.
4. Implementar **planes de continuidad operacional** y de ciberseguridad ante incidentes.
5. Designar un área o responsable de ciberseguridad con independencia y autoridad suficiente para ejecutar sus funciones.
6. Notificar de forma inmediata a la ACE cualquier incidente relevante de ciberseguridad, para su registro centralizado y la coordinación de la respuesta.

## 5. Régimen sancionador (Capítulo III)

Las infracciones se clasifican en **leves, graves y muy graves**. Las sanciones económicas se calculan en función de salarios mínimos mensuales del sector comercio:

| Clasificación | Rango orientativo de la multa |
| :---- | :---- |
| **Leve** | De 1 a 10 salarios mínimos mensuales |
| **Grave** | Rango superior, definido reglamentariamente |
| **Muy grave** | Rango más alto, definido reglamentariamente |

## 6. Relación con otras normas del marco

Esta ley opera en conjunto con la **Ley para la Protección de Datos Personales** (ambas publicadas el mismo día) y con la **Ley Especial contra los Delitos Informáticos y Conexos**: mientras la primera regula la gestión organizacional de la ciberseguridad en el sector público (y por extensión sus proveedores), la segunda protege el derecho a la intimidad informativa de las personas, y la tercera tipifica y sanciona penalmente las conductas delictivas cometidas mediante tecnologías de la información.

## 7. Aplicación práctica al portafolio de software (guía para el agente de IA)

Aunque un portafolio personal no es, por definición, un "sujeto obligado" de esta ley, adoptar sus principios rectores demuestra madurez profesional y previene riesgos si el desarrollador presta servicios a clientes del sector público o regulado:

1. Documentar en el propio repositorio (por ejemplo, en un archivo `SECURITY.md`) una **política de seguridad y divulgación responsable de vulnerabilidades**.
2. Establecer un **registro de incidentes y decisiones de seguridad** del proyecto (bitácora de hardening), análogo en escala al Registro Nacional de Amenazas.
3. Alinear las prácticas de desarrollo con estándares internacionales referenciados por la ACE (ISO/IEC 27001, OWASP ASVS, NIST CSF), tal como se detalla en los archivos correspondientes de este marco normativo.
4. Definir un **plan mínimo de continuidad**: copias de respaldo del código y la infraestructura, procedimientos de recuperación ante caída del sitio o del proveedor de hosting/CDN.
