# ISO/IEC 27001 — Sistema de Gestión de Seguridad de la Información (SGSI)

**Organización emisora:** ISO / IEC
**Familia de normas:** serie ISO/IEC 27000 (sistemas de gestión de seguridad de la información)
**Versión de referencia:** ISO/IEC 27001:2022 (revisión vigente, alineada con la estructura armonizada de alto nivel —*Annex SL*— común a todas las normas de sistemas de gestión ISO)
**Naturaleza:** norma de pago, certificable por organismos acreditados; este documento resume su estructura y aplicación práctica con fines de referencia técnica, sin reproducir el texto normativo protegido por derechos de autor de ISO.
**Aplicación en el marco SDD:** marco organizacional de referencia para estructurar la gestión de seguridad del proyecto a escala de un desarrollador individual o equipo pequeño; sirve como el estándar internacional que la Ley de Ciberseguridad y Seguridad de la Información de El Salvador exige implícitamente a las instituciones obligadas, y como referencia de buenas prácticas para cualquier desarrollador que desee demostrar madurez en seguridad.

## 1. Propósito de la norma

ISO/IEC 27001 especifica los requisitos para **establecer, implementar, mantener y mejorar continuamente** un Sistema de Gestión de Seguridad de la Información (SGSI) dentro del contexto de una organización. No prescribe controles técnicos específicos de forma aislada, sino un **proceso de gestión de riesgos** que determina qué controles son necesarios según el contexto, los activos de información y el apetito de riesgo de la organización.

## 2. Ciclo de gestión (enfoque de mejora continua)

La norma se estructura conforme al ciclo **Planificar–Hacer–Verificar–Actuar (PDCA)**:

1. **Planificar:** definir el alcance del SGSI, identificar activos de información, realizar una evaluación de riesgos y seleccionar los controles aplicables.
2. **Hacer:** implementar los controles seleccionados y los procesos de gestión de riesgos.
3. **Verificar:** monitorear, medir y auditar el desempeño del SGSI (auditorías internas, revisión por la dirección).
4. **Actuar:** implementar acciones correctivas y de mejora continua basadas en los hallazgos de la fase de verificación.

## 3. Anexo A: dominios de control (referencia ISO/IEC 27002)

La edición 2022 reorganiza los controles de seguridad de la información en **cuatro grandes temas**, reduciendo la dispersión de las 14 categorías de la edición 2013:

| Tema | Enfoque | Ejemplo de aplicación a escala de un proyecto de portafolio |
| :---- | :---- | :---- |
| **Controles organizacionales** | Políticas de seguridad, roles y responsabilidades, gestión de proveedores/terceros, gestión de incidentes, continuidad del negocio. | Política de seguridad documentada en `SECURITY.md`, criterios de selección de proveedores de hosting/correo (evaluar sus propias certificaciones de seguridad). |
| **Controles de personas** | Concienciación y formación en seguridad, acuerdos de confidencialidad, gestión de accesos del personal. | Buenas prácticas personales de higiene de credenciales (gestor de contraseñas, autenticación multifactor en las cuentas de los proveedores usados). |
| **Controles físicos** | Seguridad de las instalaciones, equipos y medios de almacenamiento físico. | Cifrado de disco en el equipo de desarrollo, bloqueo automático de sesión. |
| **Controles tecnológicos** | Control de acceso, criptografía, seguridad de redes, desarrollo seguro, gestión de vulnerabilidades, registro y monitoreo. | Alineado directamente con OWASP Top 10:2025, OWASP ASVS y las cabeceras de seguridad HTTP descritas en este marco normativo. |

## 4. Relación con la evaluación de riesgos

El núcleo metodológico de la norma es la **evaluación de riesgos**: identificar activos de información (código fuente, credenciales, datos de contacto de visitantes), las amenazas y vulnerabilidades asociadas, y decidir de forma documentada si el riesgo se **mitiga, transfiere, evita o acepta**. Esta metodología es aplicable a cualquier escala, incluyendo un proyecto individual, adaptando el nivel de formalidad documental al tamaño del equipo.

## 5. Relación con otras normas de este marco

ISO/IEC 27001 provee el **marco de gestión** (qué proceso seguir y cómo documentar decisiones de seguridad), mientras que OWASP Top 10 y OWASP ASVS proveen los **controles técnicos concretos** a nivel de código de aplicación web. La Ley de Ciberseguridad y Seguridad de la Información de El Salvador exige a sus sujetos obligados implementar "sistemas de gestión de ciberseguridad" alineados a estándares internacionales como este.

## 6. Aplicación práctica al portafolio de software (guía para el agente de IA)

1. Mantener un **inventario mínimo de activos** del proyecto (código fuente, credenciales de servicios externos, datos personales recolectados) y documentar dónde se almacena cada uno y quién tiene acceso.
2. Documentar, aunque sea de forma breve, una **evaluación de riesgos informal** para las decisiones de seguridad relevantes del portafolio (por ejemplo: "se evaluó el riesgo de exponer la clave de API del proveedor de correo en el cliente; se mitigó delegando el envío a una función serverless").
3. Establecer un proceso mínimo de **revisión periódica** de dependencias, configuración de cabeceras y vigencia de certificados TLS, como manifestación a pequeña escala del ciclo PDCA.
4. Documentar en `SECURITY.md` el procedimiento para reportar una vulnerabilidad descubierta por terceros, como parte de los controles organizacionales de gestión de incidentes.
