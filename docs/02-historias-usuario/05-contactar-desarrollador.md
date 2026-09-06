# HU-05: Contactar al Desarrollador

## Datos de la Historia

| Campo | Valor |
|:------|:------|
| **ID** | HU-05 |
| **Título** | Contactar al Desarrollador |
| **Como** | visitante (reclutador, cliente potencial, colaborador) |
| **Quiero** | enviar un mensaje al desarrollador de forma fácil y segura |
| **Para** | iniciar una conversación sobre oportunidades laborales o proyectos |
| **Prioridad** | Alta |
| **Estado** | *[Pendiente/En Progreso/Completada]* |

---

## Descripción

El formulario de contacto es el punto de conversión más importante del portafolio. Debe ser fácil de usar, seguro y confiable. El visitante debe poder enviar un mensaje sin crear cuenta ni salir del sitio.

---

## Criterios de Aceptación

### Contenido
1. [ ] El formulario tiene campos: nombre, email, asunto, mensaje
2. [ ] Hay un campo honeypot oculto para prevenir spam
3. [ ] Los campos obligatorios están marcados claramente
4. [ ] Hay un mensaje de éxito después del envío
5. [ ] Hay un mensaje de error claro si falla el envío

### Validación
6. [ ] Validación en cliente para campos vacíos
7. [ ] Validación de formato de email
8. [ ] Validación server-side de todos los datos
9. [ ] Rate limiting por IP (máximo 5 envíos por hora)
10. [ ] Los datos se sanitizan antes de procesar

### Seguridad
11. [ ] El formulario usa HTTPS
12. [ ] Las credenciales del servicio de email están en variables de entorno
13. [ ] El honeypot está oculto con CSS (opacity: 0, position: absolute)
14. [ ] No hay CAPTCHA externo (Google reCAPTCHA)
15. [ ] El envío se procesa en serverless (no expuesto al cliente)

### Accesibilidad
16. [ ] Todos los campos tienen `<label>` asociado
17. [ ] Los errores se anuncian a lectores de pantalla
18. [ ] El formulario es navegable por teclado
19. [ ] El botón de envío tiene texto descriptivo
20. [ ] El contraste cumple WCAG 2.2 AA

### Diseño
21. [ ] El formulario tiene un diseño limpio y profesional
22. [ ] Los campos tienen focus states visibles
23. [ ] El formulario es responsive
24. [ ] El botón de envío es prominente

---

## Referencias al Marco Normativo

| Norma | Archivo | Requisito Aplicable |
|:------|:--------|:---------------------|
| OWASP Top 10 | `01-owasp-top-10-2025.md` | A03:2021 — Inyección, A07:2021 — Fallos de Autenticación |
| OWASP ASVS | `02-owasp-asvs.md` | V5.1 — Validación de entrada |
| WCAG 2.2 AA | `01-wcag-2.2-aa.md` | 3.3.1 Identificación de Errores |
| Cabeceras HTTP | `03-cabeceras-seguridad-http.md` | CSP, HSTS |

---

## Flujo del Formulario

```
┌─────────────────────────────────────┐
│         FORMULARIO DE CONTACTO      │
├─────────────────────────────────────┤
│                                     │
│  Nombre: [___________________]      │
│                                     │
│  Email:  [___________________]      │
│                                     │
│  Asunto: [___________________]      │
│                                     │
│  Mensaje:                           │
│  [____________________________]     │
│  [____________________________]     │
│                                     │
│  [Campo honeypot oculto]            │
│                                     │
│         [Enviar Mensaje]            │
│                                     │
└─────────────────────────────────────┘
         ↓ (envío exitoso)
┌─────────────────────────────────────┐
│  ✅ Mensaje enviado correctamente   │
│  Me pondré en contacto contigo     │
│  en menos de 24 horas.             │
└─────────────────────────────────────┘
```

---

## Notas Adicionales

- El formulario es el canal principal de generación de leads
- Debe inspirar confianza y profesionalismo
- Considerar agregar enlaces directos a email y LinkedIn como alternativas
- Los emails recibidos deben tener un formato claro y profesional

---

**Responsable de implementación:** *[Por definir]*
**Fecha de creación:** *[Fecha actual]*
**Última actualización:** *[Fecha actual]*
