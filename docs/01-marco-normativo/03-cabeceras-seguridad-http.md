# Cabeceras de Seguridad HTTP (Hardening de Transporte y Navegador)

**Fuentes de referencia:** especificaciones IETF (RFC 6797 - HSTS, RFC de Content Security Policy Level 3 del W3C), guías de OWASP Secure Headers Project, y herramientas de auditoría independientes como Mozilla Observatory.
**Aplicación en el marco SDD:** conjunto obligatorio de cabeceras de respuesta HTTP que debe emitir el servidor o la capa perimetral (CDN) del portafolio en producción; su ausencia es habitualmente uno de los primeros indicadores que un evaluador técnico revisa en la pestaña de red del navegador.

## 1. Por qué importa

Las cabeceras de respuesta HTTP son la primera línea de defensa declarativa contra vectores de ataque comunes: inyección de código entre sitios (XSS), secuestro de clics (*clickjacking*), degradación de la conexión cifrada y filtración accidental de metadatos de navegación. Su implementación no requiere cambios profundos en la lógica de negocio, por lo que su ausencia se interpreta como descuido, no como limitación técnica.

## 2. Cabeceras obligatorias y su configuración recomendada

| Cabecera | Directiva recomendada para producción | Vulnerabilidad mitigada |
| :---- | :---- | :---- |
| **Strict-Transport-Security (HSTS)** | `max-age=31536000; includeSubDomains` (considerar `preload` una vez verificada la estabilidad del certificado) | Fuerza la comunicación exclusivamente sobre HTTPS durante un año, previniendo ataques de degradación de protocolo (*SSL stripping*) en redes públicas o no confiables. |
| **Content-Security-Policy (CSP)** | `default-src 'self'; script-src 'self' 'nonce-{valor-aleatorio-por-respuesta}'; object-src 'none'; base-uri 'self'; frame-ancestors 'none';` | Mitiga la inyección de código malicioso (XSS) al restringir explícitamente los orígenes autorizados para ejecutar scripts; se debe generar un *nonce* criptográfico distinto en cada respuesta para scripts en línea indispensables y evitar por completo el comodín `'unsafe-inline'`. |
| **X-Frame-Options** | `DENY` | Impide que la interfaz sea incrustada en `<iframe>` de sitios externos, previniendo ataques de *clickjacking*; se recomienda complementar con la directiva CSP `frame-ancestors 'none'` (más moderna y flexible). |
| **X-Content-Type-Options** | `nosniff` | Detiene la inferencia de tipos MIME por parte del navegador, evitando que archivos planos o imágenes se interpreten y ejecuten como código. |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | Controla qué información de la URL de origen se filtra hacia dominios externos al navegar fuera del sitio. |
| **Permissions-Policy** | `camera=(), microphone=(), geolocation=()` (ajustar según las APIs realmente utilizadas) | Deshabilita explícitamente el acceso a APIs de hardware del dispositivo que la aplicación no necesita consumir. |

## 3. Consideraciones de implementación por entorno

- **Node.js / Express:** el paquete `helmet` facilita la inyección conjunta de estas cabeceras, pero **requiere configuración explícita**: sus valores por defecto no son necesariamente los más restrictivos posibles (por ejemplo, la CSP por defecto puede ser demasiado permisiva si no se personaliza).
- **Arquitecturas estáticas (SSG) desplegadas en CDN (Cloudflare Pages, Vercel, Netlify):** las cabeceras se configuran a nivel de la capa perimetral (archivo de configuración de la plataforma, p. ej. `_headers` en Netlify o reglas de Cloudflare), no en el código de la aplicación.
- **Verificación:** tras el despliegue, auditar las cabeceras efectivamente emitidas mediante herramientas automatizadas (Mozilla Observatory o equivalentes) y mediante inspección manual de la pestaña de red del navegador, verificando que no existan políticas permisivas heredadas de configuraciones por defecto.

## 4. Relación con otros documentos de este marco normativo

Esta guía opera como la capa de implementación técnica concreta de los principios definidos en `owasp-top-10-2025.md` (particularmente A02 - Security Misconfiguration) y en los requisitos V3 (Web Frontend Security) y V12 (Secure Communication) de `owasp-asvs.md`.

## 5. Aplicación práctica al portafolio de software (guía para el agente de IA)

1. Definir estas cabeceras como parte de la configuración de despliegue del proyecto (no como código de la aplicación), de forma que se apliquen uniformemente a todas las rutas del sitio.
2. Generar el *nonce* de la CSP de forma dinámica en cada respuesta del servidor (o, en sitios estáticos con hidratación mínima, evitar por completo scripts en línea que requieran `'unsafe-inline'`).
3. Revisar, tras cada despliegue, que ninguna cabecera quedó en un valor por defecto permisivo introducido accidentalmente por el framework o la plataforma de hosting.
4. Documentar en el `README.md` del proyecto qué cabeceras se implementaron y con qué herramienta se verificó su correcta aplicación.
