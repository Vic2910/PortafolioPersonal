# ARQ-05: Arquitectura de Seguridad

> **Propósito:** Definir las medidas de seguridad implementadas en PortafolioVRAS, incluyendo autenticación, autorización, cabeceras HTTP, protección contra ataques y cumplimiento OWASP.

---

## 1. Visión General de Seguridad

PortafolioVRAS implementa seguridad en múltiples capas siguiendo las mejores prácticas de **OWASP Top 10** y estándares de la industria. La seguridad es un componente crítico dado que el sistema maneja:
- Formulario de contacto (punto de entrada de datos)
- Panel de administración (acceso restringido)
- Datos personales del desarrollador

---

## 2. Modelo de Seguridad

### 2.1 Capas de Seguridad

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CAPA 1: RED Y TRANSPORTE                         │
│  • HTTPS forzado (Vercel)                                          │
│  • HSTS (HTTP Strict Transport Security)                           │
│  • Certificate pinning (Vercel SSL)                                │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CAPA 2: APLICACIÓN                               │
│  • Cabeceras de seguridad HTTP                                      │
│  • Content Security Policy (CSP)                                    │
│  • Rate Limiting                                                    │
│  • Input Validation (Zod)                                           │
│  • Honeypot Anti-Spam                                               │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CAPA 3: AUTENTICACIÓN                            │
│  • Supabase Auth (JWT)                                              │
│  • Tokens de corta vida                                              │
│  • Refresh tokens                                                   │
│  • Sesiones seguras                                                 │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CAPA 4: DATOS                                     │
│  • Row Level Security (RLS)                                         │
│  • Encriptación en tránsito                                         │
│  • Encriptación en reposo (Supabase)                                │
│  • Sanitización de datos                                            │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CAPA 5: INFRAESTRUCTURA                          │
│  • Variables de entorno seguras                                      │
│  • Secrets management                                               │
│  • Network isolation                                                │
│  • DDoS protection (Vercel)                                         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Cabeceras HTTP de Seguridad

### 3.1 Cabeceras Implementadas

| Cabecera | Valor | Propósito |
|:---------|:------|:----------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Forzar HTTPS |
| `Content-Security-Policy` | Ver política completa abajo | Prevenir XSS |
| `X-Frame-Options` | `DENY` | Prevenir clickjacking |
| `X-Content-Type-Options` | `nosniff` | Prevenir MIME sniffing |
| `X-XSS-Protection` | `1; mode=block` | Protección XSS legacy |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control de referrer |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Restringir APIs |
| `X-DNS-Prefetch-Control` | `on` | Mejorar performance DNS |

### 3.2 Content Security Policy (CSP)

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https://*.supabase.co;
font-src 'self';
connect-src 'self' https://*.supabase.co;
media-src 'self';
object-src 'none';
frame-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
```

### 3.3 Implementación en Vercel

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
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

---

## 4. Autenticación y Autorización

### 4.1 Flujo de Autenticación

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Admin    │     │    React    │     │  Supabase   │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │ 1. Login (email+pwd)                  │
       │──────────────────>│                   │
       │                   │                   │
       │                   │ 2. signInWithPassword()
       │                   │──────────────────>│
       │                   │                   │
       │                   │ 3. JWT Token      │
       │                   │<──────────────────│
       │                   │                   │
       │                   │ 4. Store token    │
       │                   │    in memory      │
       │                   │                   │
       │ 5. Admin Panel    │                   │
       │<──────────────────│                   │
       │                   │                   │
       │ 6. API Request    │                   │
       │   (Authorization: Bearer xxx)        │
       │──────────────────>│                   │
       │                   │                   │
       │                   │ 7. Verify JWT     │
       │                   │──────────────────>│
       │                   │                   │
       │                   │ 8. User data      │
       │                   │<──────────────────│
       │                   │                   │
```

### 4.2 Gestión de Tokens

```typescript
// src/services/supabase/auth.ts
import { supabase } from './client'

export const authService = {
  // Login
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    return data
  },

  // Logout
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Obtener sesión actual
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  },

  // Obtener token actual
  async getAccessToken() {
    const session = await this.getSession()
    return session?.access_token || null
  },

  // Escuchar cambios de auth
  onAuthStateChange(callback: (session: any) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session)
    })
  },
}
```

### 4.3 Protección de Rutas (Frontend)

```typescript
// src/components/auth/ProtectedRoute.tsx
import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}
```

---

## 5. Protección Anti-Spam

### 5.1 Honeypot

El campo honeypot es un campo oculto que solo los bots llenan. Si tiene contenido, se rechaza el envío silenciosamente.

```typescript
// Frontend: Campo honeypot oculto
<input
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  style={{
    position: 'absolute',
    left: '-9999px',
    opacity: 0,
    height: 0,
    width: 0,
  }}
  aria-hidden="true"
/>

// Backend: Verificación
if (honeypot && honeypot.length > 0) {
  // Bot detectado, retornar éxito falsamente
  return sendResponse(res, 200, { 
    message: 'Message sent successfully' 
  })
}
```

### 5.2 Rate Limiting

```typescript
// api/utils/rate-limit.ts
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  key: string,
  max: number,
  windowSeconds: number
): boolean {
  const now = Date.now()
  const windowMs = windowSeconds * 1000
  
  const record = rateLimitMap.get(key)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + windowMs,
    })
    return true
  }

  if (record.count >= max) {
    return false
  }

  record.count++
  return true
}

// Configuración por endpoint
export const RATE_LIMITS = {
  contact: { max: 5, window: 3600 },      // 5 por hora
  admin: { max: 10, window: 600 },         // 10 por 10 min
  projects: { max: 100, window: 3600 },    // 100 por hora
  analytics: { max: 100, window: 3600 },   // 100 por hora
}
```

### 5.3 Validación de Input

```typescript
// api/utils/validation.ts
import { z } from 'zod'

// Schema de contacto con validación estricta
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  
  email: z
    .string()
    .email('Invalid email format')
    .max(254, 'Email must be less than 254 characters'),
  
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must be less than 200 characters'),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),
  
  honeypot: z
    .string()
    .max(0, 'Honeypot must be empty')
    .optional(),
})
```

---

## 6. Sanitización de Datos

### 6.1 Prevención de XSS

```typescript
// api/utils/sanitize.ts
export function sanitize(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj }
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitize(sanitized[key])
    }
  }
  
  return sanitized
}
```

### 6.2 Prevención de SQL Injection

Con Supabase, la prevención de SQL injection es automática debido a:
- Uso de parameterized queries
- PostgREST que sanitiza automáticamente
- RLS que limita el acceso a datos

---

## 7. Seguridad del Panel Admin

### 7.1 Autenticación

```typescript
// Login seguro con Supabase
const { data, error } = await supabase.auth.signInWithPassword({
  email: adminEmail,
  password: adminPassword,
})

// Almacenar token en memoria (no en localStorage para mayor seguridad)
// El token se gestiona automáticamente por Supabase client
```

### 7.2 Autorización (RLS)

```sql
-- Solo el usuario autenticado (admin) puede modificar datos
CREATE POLICY "Admin full access"
  ON projects
  FOR ALL
  USING (auth.role() = 'authenticated');
```

### 7.3 Protección de Rutas API

```typescript
// api/utils/auth.ts
export async function verifyAuth(req: VercelRequest): Promise<AuthResult> {
  const authHeader = req.headers.authorization
  
  if (!authHeader?.startsWith('Bearer ')) {
    return { authenticated: false, error: 'No token provided' }
  }

  const token = authHeader.split(' ')[1]
  
  const { data: { user }, error } = await supabase.auth.getUser(token)
  
  if (error || !user) {
    return { authenticated: false, error: 'Invalid token' }
  }

  return { authenticated: true, userId: user.id }
}
```

---

## 8. Protección de Secretos

### 8.1 Variables de Entorno

| Variable | Ubicación | Acceso |
|:---------|:----------|:-------|
| `SUPABASE_URL` | Vercel (server) | Serverless only |
| `SUPABASE_SERVICE_KEY` | Vercel (server) | Serverless only |
| `SUPABASE_ANON_KEY` | Vercel (server) | Serverless only |
| `VITE_SUPABASE_URL` | Vercel (client) | Frontend (pública) |
| `VITE_SUPABASE_ANON_KEY` | Vercel (client) | Frontend (pública) |

### 8.2 Reglas de Secretos

1. **Nunca** commitear secretos en el repositorio
2. **Usar** variables de entorno para todos los secretos
3. **Rotar** keys periódicamente
4. **Auditar** acceso a secretos en Vercel Dashboard

### 8.3 .gitignore

```
# Variables de entorno
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Supabase
supabase/.temp/
```

---

## 9. Cumplimiento OWASP Top 10

### 9.1 Mapeo de Controles

| OWASP Category | Control Implementado |
|:---------------|:---------------------|
| **A01:2021 - Broken Access Control** | RLS en Supabase, JWT verification |
| **A02:2021 - Cryptographic Failures** | HTTPS forzado, Supabase encryption |
| **A03:2021 - Injection** | Input validation (Zod), parameterized queries |
| **A04:2021 - Insecure Design** | Security by design, least privilege |
| **A05:2021 - Security Misconfiguration** | Secure headers, CSP |
| **A06:2021 - Vulnerable Components** | Regular dependency updates |
| **A07:2021 - Authentication Failures** | Supabase Auth, rate limiting |
| **A08:2021 - Data Integrity Failures** | Input sanitization |
| **A09:2021 - Logging & Monitoring** | Error logging, analytics |
| **A10:2021 - SSRF** | No external URL fetching |

### 9.2 Checklist de Seguridad

```markdown
## Seguridad - Checklist

### Transporte
- [x] HTTPS forzado
- [x] HSTS habilitado
- [x] Certificate pinning (Vercel SSL)

### Cabeceras
- [x] CSP configurado
- [x] X-Frame-Options: DENY
- [x] X-Content-Type-Options: nosniff
- [x] X-XSS-Protection habilitado
- [x] Referrer-Policy configurado
- [x] Permissions-Policy restringido

### Autenticación
- [x] Supabase Auth implementado
- [x] Tokens JWT
- [x] Rate limiting en login

### Datos
- [x] RLS habilitado en todas las tablas
- [x] Input validation (Zod)
- [x] Output sanitization
- [x] SQL injection prevented (parameterized queries)

### Infraestructura
- [x] Secrets en variables de entorno
- [x] .gitignore configurado
- [x] No secrets en código fuente
```

---

## 10. Auditoría de Seguridad

### 10.1 Herramientas de Auditoría

| Herramienta | Uso | Frecuencia |
|:------------|:----|:-----------|
| **npm audit** | Dependencias con vulnerabilidades | Cada commit |
| **securityheaders.com** | Cabeceras HTTP | Cada release |
| **OWASP ZAP** | Pruebas de penetración | Mensual |
| **Snyk** | Escaneo de vulnerabilidades | Semanal |

### 10.2 Proceso de Auditoría

```bash
# 1. Auditar dependencias
npm audit
npm audit fix

# 2. Verificar cabeceras
# Usar https://securityheaders.com

# 3. Pruebas de penetración
# Usar OWASP ZAP o Burp Suite

# 4. Revisar logs
# Verificar que no hay datos sensibles en logs
```

---

## 11. Incidentes de Seguridad

### 11.1 Procedimiento de Respuesta

1. **Detectar** → Monitoreo automático o reporte manual
2. **Contener** → Deshabilitar endpoint afectado
3. **Erradicar** → Corregir vulnerabilidad
4. **Recuperar** → Restaurar servicio
5. **Lecciones** → Documentar y prevenir

### 12.2 Contacto de Seguridad

| Rol | Contacto |
|:----|:---------|
| **Responsable** | Victor Rafael Arévalo Sierra |
| **Email** | victorarevalosierra@gmail.com |
| **GitHub** | github.com/Vic2910 |

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*
