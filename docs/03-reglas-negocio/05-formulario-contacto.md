# RN-05: Reglas del Formulario de Contacto

## Definición

El formulario de contacto es el punto de conversión principal del portafolio. Debe ser funcional, seguro y accesible. El envío exitoso debe generar un email profesional al desarrollador.

---

## Criterios de Validación

### Campos Obligatorios
1. [ ] **Nombre:** Texto, mínimo 2 caracteres, máximo 100
2. [ ] **Email:** Formato válido, máximo 254 caracteres
3. [ ] **Asunto:** Texto, mínimo 3 caracteres, máximo 200
4. [ ] **Mensaje:** Texto, mínimo 10 caracteres, máximo 5000
5. [ ] **Honeypot:** Campo oculto, debe estar vacío

### Validación en Cliente
6. [ ] Todos los campos obligatorios tienen validación `required`
7. [ ] El email tiene validación de formato HTML5 o regex
8. [ ] Los errores se muestran junto al campo correspondiente
9. [ ] Los errores se anuncian a lectores de pantalla (aria-live)

### Validación en Servidor
10. [ ] Todos los campos se validan en server-side
11. [ ] El email se valida con regex estricto
12. [ ] El honeypot se verifica (si tiene contenido, se rechaza)
13. [ ] El rate limiting está implementado por IP
14. [ ] Los datos se sanitizan contra XSS

### Envío
15. [ ] El envío se procesa en función serverless
16. [ ] Se envía un email al desarrollador con los datos
17. [ ] Se muestra mensaje de éxito al usuario
18. [ ] Se muestra mensaje de error si falla el envío
19. [ ] El formulario se resetea después del envío exitoso

### Seguridad
20. [ ] Las credenciales del servicio de email están en variables de entorno
21. [ ] No hay CAPTCHA externo (Google reCAPTCHA)
22. [ ] El formulario usa HTTPS
23. [ ] No se almacenan datos en base de datos (solo envío de email)

---

## Referencias

| Norma | Archivo | Requisito |
|:------|:--------|:----------|
| OWASP Top 10 | `01-owasp-top-10-2025.md` | A03:2021 — Inyección |
| OWASP ASVS | `02-owasp-asvs.md` | V5.1 — Validación de entrada |
| WCAG 2.2 AA | `01-wcag-2.2-aa.md` | 3.3.1 Identificación de Errores |

---

## Flujo de Validación

```
┌─────────────────────────────────────┐
│         USUARIO LLENA FORMULARIO    │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│    VALIDACIÓN EN CLIENTE            │
│    - Campos vacíos                 │
│    - Formato de email              │
│    - Longitud de texto             │
└─────────────────────────────────────┘
                  ↓ (válido)
┌─────────────────────────────────────┐
│    VERIFICACIÓN HONEYPOT           │
│    - Si tiene contenido → RECHAZAR │
└─────────────────────────────────────┘
                  ↓ (vacío)
┌─────────────────────────────────────┐
│    RATE LIMITING                   │
│    - Si > 5 envíos/hora → RECHAZAR│
└─────────────────────────────────────┘
                  ↓ (permitido)
┌─────────────────────────────────────┐
│    VALIDACIÓN EN SERVIDOR          │
│    - Sanitización de datos         │
│    - Validación de esquema         │
└─────────────────────────────────────┘
                  ↓ (válido)
┌─────────────────────────────────────┐
│    ENVÍO DE EMAIL                  │
│    - Email al desarrollador        │
│    - Mensaje de éxito al usuario   │
└─────────────────────────────────────┘
```

---

## Excepciones

- El formulario no almacena datos (solo envía email)
- No hay sistema de autenticación
- No hay dashboard de mensajes

---

**Responsable:** *[Por definir]*
**Última actualización:** *[Fecha]*
