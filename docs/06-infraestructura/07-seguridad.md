# Seguridad

> **Propósito:** Documentar las medidas de seguridad implementadas en la infraestructura.

---

## 1. Resumen de Seguridad

| Capa | Medidas | Estado |
|:-----|:--------|:-------|
| **Transporte** | HTTPS, HSTS | ✅ |
| **Aplicación** | CSP, CORS | ✅ |
| **Autenticación** | Supabase Auth | ✅ |
| **Base de Datos** | RLS, Encriptación | ✅ |
| **Secrets** | Variables de entorno | ✅ |

---

## 2. HTTPS/TLS

### 2.1 Certificado SSL

| Campo | Valor |
|:------|:------|
| **Proveedor** | Let's Encrypt (via Vercel) |
| **Tipo** | Wildcard |
| **Renovación** | Automática (cada 90 días) |
| **Cifrado** | TLS 1.2/1.3 |
| **Costo** | Gratis |

### 2.2 HSTS (HTTP Strict Transport Security)

```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ]
}
```

**Efecto:**
- Navegador solo accede por HTTPS
- Prevén ataques man-in-the-middle
- Duración: 1 año (31536000 segundos)

---

## 3. Headers de Seguridad

### 3.1 Headers Configurados

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### 3.2 Descripción de Headers

| Header | Valor | Propósito |
|:-------|:------|:----------|
| **X-Content-Type-Options** | `nosniff` | Previene MIME sniffing |
| **X-Frame-Options** | `DENY` | Previene clickjacking |
| **X-XSS-Protection** | `1; mode=block` | Activa XSS filter del navegador |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | Controla información de referrer |
| **Permissions-Policy** | `camera=(), microphone=(), geolocation=()` | Deshabilita APIs peligrosas |
| **Strict-Transport-Security** | `max-age=31536000; includeSubDomains` | Fuerza HTTPS |

---

## 4. Autenticación

### 4.1 Supabase Auth

| Característica | Estado |
|:---------------|:-------|
| **Email/Password** | ✅ |
| **Magic Link** | ⬜ |
| **OAuth (Google, GitHub)** | ⬜ |
| **MFA** | ⬜ |

### 4.2 Sesiones

```typescript
// Verificar sesión
const { data: { session } } = await supabase.auth.getSession()

// Escuchar cambios de sesión
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)
})
```

### 4.3 Tokens

| Token | Duración | Renovación |
|:------|:---------|:-----------|
| **Access Token** | 1 hora | Automática |
| **Refresh Token** | 7 días | Automática |

---

## 5. Row Level Security (RLS)

### 5.1 Concepto

RLS asegura que los usuarios solo puedan acceder a los datos que tienen permitidos.

### 5.2 Políticas Implementadas

| Tabla | Lectura | Escritura |
|:------|:--------|:----------|
| **projects** | Público | Solo admin |
| **messages** | Solo admin | Público |
| **admin_users** | Solo admin | Solo superadmin |

### 5.3 Ejemplo de Política

```sql
-- Solo admins pueden leer mensajes
CREATE POLICY "messages_select_admin" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
    )
  );
```

---

## 6. Encriptación

### 6.1 En Tránsito

| Capa | Protocolo | Estado |
|:-----|:----------|:-------|
| **Navegador → Vercel** | HTTPS (TLS 1.2/1.3) | ✅ |
| **Vercel → Supabase** | HTTPS (TLS 1.2/1.3) | ✅ |

### 6.2 En Reposo

| Capa | Estado |
|:-----|:-------|
| **Supabase Database** | ✅ Encriptado por defecto |
| **Vercel Assets** | ✅ Encriptado en CDN |
| **Backups** | ✅ Encriptados |

---

## 7. Protección de Secrets

### 7.1 Variables de Entorno

| Secret | Ubicación | Acceso |
|:-------|:----------|:-------|
| `SUPABASE_URL` | Vercel Dashboard | Server only |
| `SUPABASE_ANON_KEY` | Vercel Dashboard | Server + Client |
| `SUPABASE_SERVICE_KEY` | Vercel Dashboard | Server only |

### 7.2 .gitignore

```gitignore
# Variables de entorno
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 7.3 Rotación de Keys

| Key | Frecuencia |
|:----|:-----------|
| **Supabase Anon Key** | Cada 6 meses |
| **Supabase Service Key** | Cada 6 meses |

---

## 8. Protección de APIs

### 8.1 Rate Limiting

```typescript
// api/middleware/rateLimit.ts
const rateLimit = new Map()

export function checkRateLimit(ip: string, limit = 10, window = 60000): boolean {
  const now = Date.now()
  const requests = rateLimit.get(ip) || []
  
  const recentRequests = requests.filter((time: number) => now - time < window)
  
  if (recentRequests.length >= limit) {
    return false
  }
  
  recentRequests.push(now)
  rateLimit.set(ip, recentRequests)
  return true
}
```

### 8.2 Validación de Input

```typescript
// api/utils/validation.ts
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}
```

---

## 9. Auditoría de Seguridad

### 9.1 Checklist

| Categoría | Item | Estado |
|:----------|:-----|:-------|
| **HTTPS** | Certificado válido | ✅ |
| **HTTPS** | HSTS habilitado | ✅ |
| **Headers** | X-Content-Type-Options | ✅ |
| **Headers** | X-Frame-Options | ✅ |
| **Headers** | X-XSS-Protection | ✅ |
| **Headers** | Referrer-Policy | ✅ |
| **Headers** | Permissions-Policy | ✅ |
| **Auth** | Sesiones seguras | ✅ |
| **DB** | RLS habilitado | ✅ |
| **Secrets** | No commiteados | ✅ |
| **APIs** | Rate limiting | ✅ |
| **APIs** | Input validation | ✅ |

### 9.2 Herramientas de Auditoría

- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)

---

## 10. Incidentes

### 10.1 Proceso de Respuesta

1. **Detectar** → Monitoreo automático
2. **Contener** → Deshabilitar acceso afectado
3. **Erradicar** → Corregir vulnerabilidad
4. **Recuperar** → Restaurar servicio
5. **Lecciones** → Documentar y mejorar

### 10.2 Contactos de Emergencia

| Rol | Contacto |
|:----|:---------|
| **Desarrollador** | victorarevalosierra@gmail.com |
| **Supabase Support** | https://supabase.com/support |
| **Vercel Support** | https://vercel.com/support |

---

## 11. Checklist Final

### Transporte
- [ ] HTTPS habilitado
- [ ] HSTS configurado
- [ ] Certificado válido

### Headers
- [ ] X-Content-Type-Options
- [ ] X-Frame-Options
- [ ] X-XSS-Protection
- [ ] Referrer-Policy
- [ ] Permissions-Policy

### Autenticación
- [ ] Supabase Auth configurado
- [ ] Sesiones seguras
- [ ] Tokens renovados

### Base de Datos
- [ ] RLS habilitado
- [ ] Políticas configuradas
- [ ] Encriptación activa

### Secrets
- [ ] Variables de entorno
- [ ] .gitignore configurado
- [ ] Keys rotadas

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*