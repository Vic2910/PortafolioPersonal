# RN-04: Reglas de Seguridad

## Definición

El portafolio debe implementar medidas de seguridad para proteger la integridad del sitio, la privacidad de los visitantes y la confidencialidad de las credenciales.

---

## Criterios de Validación

### Cabeceras HTTP Obligatorias
1. [ ] **Strict-Transport-Security:** `max-age=31536000; includeSubDomains`
2. [ ] **Content-Security-Policy:** Configurada correctamente
3. [ ] **X-Frame-Options:** `DENY`
4. [ ] **X-Content-Type-Options:** `nosniff`
5. [ ] **Referrer-Policy:** `strict-origin-when-cross-origin`
6. [ ] **Permissions-Policy:** `camera=(), microphone=(), geolocation=()`

### Gestión de Secretos
7. [ ] No hay credenciales en el repositorio de código
8. [ ] Las variables de entorno se usan para servicios externos
9. [ ] Los secrets se almacenan en el provedor de hosting (Vercel/Netlify)
10. [ ] No se exponen API keys en el código del cliente

### Formulario de Contacto
11. [ ] El honeypot está implementado y funciona
12. [ ] El rate limiting está activo (máximo 5 envíos/hora por IP)
13. [ ] La validación server-side está implementada
14. [ ] Los datos se sanitizan antes de procesar
15. [ ] El envío se procesa en función serverless

### Dependencias
16. [ ] No hay dependencias con vulnerabilidades conocidas
17. [ ] `npm audit` / `yarn audit` no reporta errores críticos
18. [ ] Las dependencias se actualizan periódicamente

---

## Referencias

| Norma | Archivo | Requisito |
|:------|:--------|:----------|
| OWASP Top 10 | `01-owasp-top-10-2025.md` | Vulnerabilidades principales |
| OWASP ASVS | `02-owasp-asvs.md` | Estándar de verificación |
| Cabeceras HTTP | `03-cabeceras-seguridad-http.md` | Configuración de cabeceras |

---

## Herramientas de Validación

| Herramienta | Uso | Frecuencia |
|:------------|:----|:-----------|
| securityheaders.com | Verificar cabeceras HTTP | Cada release |
| npm audit | Auditar dependencias | Cada commit |
| Snyk | Escaneo de vulnerabilidades | Semanal |
| OWASP ZAP | Pruebas de seguridad | Mensual |

---

## Excepciones

- El sitio es estático, por lo que las amenazas de inyección son mínimas
- El formulario de contacto es el único punto de entrada dinámico
- Las funciones serverless se ejecutan en sandbox del provedor

---

**Responsable:** *[Por definir]*
**Última actualización:** *[Fecha]*
