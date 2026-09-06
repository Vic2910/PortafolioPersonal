# OWASP ASVS — Application Security Verification Standard (v5.0.0)

**Organización emisora:** OWASP Foundation
**Versión vigente:** 5.0.0, publicada en mayo de 2025 (sustituye a la versión 4.0.3 de 2021); es un "Proyecto Insignia" (*Flagship Project*) de OWASP.
**Licencia:** Creative Commons Attribution-ShareAlike 4.0 International.
**Naturaleza:** a diferencia del OWASP Top 10 (que identifica *riesgos*), el ASVS es un estándar de **requisitos de verificación** exhaustivo y accionable: aproximadamente 350 requisitos concretos organizados en 17 capítulos, pensados para usarse directamente en revisiones de código, pruebas de seguridad y cláusulas contractuales de adquisición de software.
**Aplicación en el marco SDD:** checklist técnico detallado que complementa al OWASP Top 10; el agente de IA debe seleccionar el **nivel de verificación** adecuado al portafolio y aplicar los requisitos correspondientes a los capítulos relevantes.

## 1. Niveles de verificación (acumulativos)

| Nivel | Proporción de requisitos totales | Propósito |
| :---- | :---- | :---- |
| **Nivel 1 (L1) — Básico** | ~20% | Defensas de primera capa contra las vulnerabilidades más comúnmente explotadas; nivel mínimo recomendado para cualquier aplicación web pública. |
| **Nivel 2 (L2) — Estándar** | ~50% (acumulado sobre L1) | Protecciones contra patrones de ataque menos comunes o más complejos; recomendado para aplicaciones que manejan datos sensibles o de negocio. |
| **Nivel 3 (L3) — Avanzado** | ~30% (acumulado sobre L2) | Controles de defensa en profundidad para contextos de máxima exigencia (banca, salud, infraestructura crítica). |

**Recomendación para un portafolio de software profesional:** dado que recolecta datos personales mínimos (formulario de contacto) y no procesa datos financieros ni de salud, el **Nivel 1 (L1)** constituye el estándar mínimo exigible; se recomienda incorporar selectivamente controles de **Nivel 2** en las áreas de autenticación (si existe panel de administración) y protección de datos.

## 2. Los 17 capítulos de la ASVS 5.0

| Capítulo | Nombre | Enfoque |
| :---- | :---- | :---- |
| **V1** | Encoding and Sanitization | Manejo seguro de datos no confiables; codificación de salida y saneamiento de entrada. |
| **V2** | Validation and Business Logic | Validación de entradas y consistencia de los flujos de lógica de negocio. |
| **V3** | Web Frontend Security | Protección frente a ataques ejecutados a través del navegador (XSS, clickjacking, políticas de origen). |
| **V4** | API and Web Service | Consideraciones de seguridad específicas de APIs y servicios web. |
| **V5** | File Handling | Requisitos para la carga, procesamiento y almacenamiento seguro de archivos. |
| **V6** | Authentication | Verificación de identidad de personas o dispositivos, resistencia a suplantación. |
| **V7** | Session Management | Gestión segura de sesiones de usuario. |
| **V8** | Authorization | Garantizar que el acceso otorgado corresponda exactamente a los permisos previstos. |
| **V9** | Self-Contained Tokens | Verificación de integridad y validez de tokens (JWT y similares). |
| **V10** | OAuth and OIDC | Buenas prácticas actuales para flujos OAuth 2.0 y OpenID Connect. |
| **V11** | Cryptography | Buenas prácticas de uso de criptografía. |
| **V12** | Secure Communication | Protección de datos en tránsito. |
| **V13** | Configuration | Guía de configuración segura para el desarrollo de aplicaciones. |
| **V14** | Data Protection | Identificación de datos a proteger e implementación de su protección. |
| **V15** | Secure Coding and Architecture | Requisitos generales de seguridad a considerar en el diseño y desarrollo. |
| **V16** | Security Logging and Error Handling | Registro adecuado de eventos relevantes de seguridad. |
| **V17** | WebRTC | Requisitos de seguridad para comunicación en tiempo real vía navegador. |

Cada requisito se identifica con el formato `<capítulo>.<sección>.<requisito>` (por ejemplo, `1.2.5`), y se recomienda citarlo siempre con el prefijo de versión (`v5.0.0-1.2.5`) para evitar ambigüedad frente a futuras revisiones del estándar.

## 3. Capítulos prioritarios para un portafolio de desarrollador (perfil de riesgo bajo/medio)

Dado que un portafolio típico es una aplicación mayormente estática (SSG) con, como máximo, un backend ligero para el formulario de contacto, los capítulos con mayor retorno de inversión en seguridad son:

1. **V1 (Encoding and Sanitization) y V2 (Validation and Business Logic):** saneamiento estricto de cualquier campo de entrada del formulario de contacto, tanto en cliente como —de forma obligatoria— en el servidor.
2. **V3 (Web Frontend Security):** cabeceras de seguridad (CSP con nonces, X-Frame-Options, Referrer-Policy), ausencia de `unsafe-inline` sin nonce.
3. **V4 (API and Web Service):** si el envío del formulario se procesa mediante una función serverless, validar el método HTTP, el origen (CORS) y el formato del cuerpo de la petición.
4. **V12 (Secure Communication):** HTTPS obligatorio en todo el sitio, HSTS con `includeSubDomains`.
5. **V13 (Configuration):** separación estricta de variables de entorno sensibles (claves de API de servicios de correo) respecto del código versionado.
6. **V14 (Data Protection):** minimización y cifrado de los datos personales capturados por el formulario de contacto, en línea con la Ley para la Protección de Datos Personales de El Salvador.
7. **V16 (Security Logging and Error Handling):** mensajes de error genéricos hacia el cliente, sin exponer trazas de pila ni detalles de la infraestructura.

## 4. Uso recomendado en el flujo de trabajo del agente de IA (SDD)

1. Al generar cualquier funcionalidad de backend, el agente debe indicar explícitamente **a qué requisito ASVS (capítulo.sección)** responde cada control de seguridad implementado, para trazabilidad.
2. Emplear la ASVS como **checklist de revisión de código** antes de fusionar cambios relevantes a la rama principal (equivalente funcional a una lista de verificación en el proceso de *pull request*).
3. Si el portafolio evoluciona para incluir autenticación de usuarios (por ejemplo, un panel privado de métricas), aplicar íntegramente los capítulos V6 (Authentication), V7 (Session Management), V8 (Authorization) y V9/V10 si se usan tokens u OAuth.
