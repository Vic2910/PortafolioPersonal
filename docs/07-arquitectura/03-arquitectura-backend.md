# ARQ-03: Arquitectura Backend

> **Propósito:** Definir la arquitectura del backend serverless, incluyendo funciones Vercel, endpoints API, validación, manejo de errores y patrones de comunicación.

---

## 1. Visión General del Backend

El backend de PortafolioVRAS está construido con **Vercel Functions** (serverless) que ejecutan lógica de negocio sin necesidad de gestionar servidores. Las funciones se comunican directamente con Supabase para persistencia de datos.

### 1.1 Características del Backend

| Característica | Descripción |
|:---------------|:------------|
| **Tipo** | Serverless Functions |
| **Runtime** | Node.js 20+ |
| **Language** | TypeScript |
| **Hosting** | Vercel (Edge Network) |
| **Base de datos** | Supabase (PostgreSQL) |
| **Autenticación** | Supabase Auth (JWT) |
| **Ejecución máxima** | 10s (Free), 60s (Pro) |
| **Tamaño máximo** | 50MB (body) |

---

## 2. Estructura del Backend

### 2.1 Árbol de Directorios

```
api/
├── contact.ts                    # POST - Formulario de contacto
├── health.ts                     # GET - Health check
│
├── projects/
│   ├── index.ts                  # GET - Listar proyectos públicos
│   └── [id].ts                   # GET - Proyecto por ID
│
├── admin/
│   ├── auth.ts                   # POST - Verificar autenticación
│   ├── projects/
│   │   ├── index.ts              # GET/POST - Listar/Crear proyectos
│   │   └── [id].ts               # GET/PUT/DELETE - CRUD proyecto
│   ├── messages/
│   │   └── index.ts              # GET/DELETE - Listar/Eliminar mensajes
│   └── config/
│       └── index.ts              # GET/PUT - Configuración del sitio
│
├── analytics/
│   └── track.ts                  # POST - Registrar visita
│
├── storage/
│   └── upload.ts                 # POST - Subir archivos
│
└── utils/
    ├── supabase.ts               # Cliente Supabase singleton
    ├── auth.ts                   # Helpers de autenticación
    ├── validation.ts             # Schemas Zod
    ├── rate-limit.ts             # Rate limiting
    ├── errors.ts                 # Manejo de errores
    └── response.ts               # Respuestas estandarizadas
```

### 2.2 Diagrama de Flujo API

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (React)                           │
│                                                                  │
│  fetch('/api/contact', { method: 'POST', body: ... })           │
└─────────────────────────────────┬───────────────────────────────┘
                                  │ HTTPS
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK                           │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                  MIDDLEWARE STACK                             ││
│  │  1. CORS Validation                                         ││
│  │  2. Rate Limiting (per IP)                                  ││
│  │  3. Authentication (if admin route)                         ││
│  │  4. Request Parsing                                         ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                  VERCEL FUNCTION (Node.js)                       │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                  HANDLER                                     ││
│  │  1. Validate input (Zod schema)                             ││
│  │  2. Check honeypot                                          ││
│  │  3. Execute business logic                                  ││
│  │  4. Call Supabase                                           ││
│  │  5. Return response                                         ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SUPABASE                                    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  PostgreSQL + RLS Policies                                  ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Endpoints API

### 3.1 Tabla de Endpoints

| Método | Ruta | Descripción | Auth | Rate Limit |
|:-------|:-----|:------------|:-----|:-----------|
| `POST` | `/api/contact` | Enviar mensaje de contacto | No | 5/hora/IP |
| `GET` | `/api/health` | Health check | No | Sin límite |
| `GET` | `/api/projects` | Listar proyectos públicos | No | 100/hora |
| `GET` | `/api/projects/[id]` | Obtener proyecto por ID | No | 100/hora |
| `POST` | `/api/analytics/track` | Registrar visita | No | 100/hora |
| `POST` | `/api/admin/auth` | Verificar auth | Sí | 10/min |
| `GET` | `/api/admin/projects` | Listar todos los proyectos | Sí | 100/hora |
| `POST` | `/api/admin/projects` | Crear proyecto | Sí | 20/hora |
| `GET` | `/api/admin/projects/[id]` | Obtener proyecto (admin) | Sí | 100/hora |
| `PUT` | `/api/admin/projects/[id]` | Actualizar proyecto | Sí | 20/hora |
| `DELETE` | `/api/admin/projects/[id]` | Eliminar proyecto | Sí | 20/hora |
| `GET` | `/api/admin/messages` | Listar mensajes | Sí | 100/hora |
| `DELETE` | `/api/admin/messages/[id]` | Eliminar mensaje | Sí | 20/hora |
| `GET` | `/api/admin/config` | Obtener configuración | Sí | 100/hora |
| `PUT` | `/api/admin/config` | Actualizar configuración | Sí | 10/hora |

### 3.2 Ejemplo de Endpoint: Contact

```typescript
// api/contact.ts
import { VercelRequest, VercelResponse } from '@vercel/node'
import { z } from 'zod'
import { supabase } from './utils/supabase'
import { checkRateLimit } from './utils/rate-limit'
import { sendResponse } from './utils/response'

// Schema de validación
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
  honeypot: z.string().max(0).optional(), // Debe estar vacío
})

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return sendResponse(res, 405, { message: 'Method not allowed' })
  }

  // Rate limiting
  const clientIP = req.headers['x-forwarded-for'] || 'unknown'
  const rateLimitKey = `contact:${clientIP}`
  
  if (!checkRateLimit(rateLimitKey, 5, 3600)) { // 5 requests per hour
    return sendResponse(res, 429, { 
      message: 'Too many requests. Please try again later.' 
    })
  }

  try {
    // Validar input
    const validation = contactSchema.safeParse(req.body)
    
    if (!validation.success) {
      return sendResponse(res, 400, {
        message: 'Invalid input',
        errors: validation.error.flatten().fieldErrors,
      })
    }

    const { name, email, subject, message, honeypot } = validation.data

    // Verificar honeypot
    if (honeypot) {
      // Bot detectado, retornar éxito falsamente
      return sendResponse(res, 200, { 
        message: 'Message sent successfully' 
      })
    }

    // Sanitizar datos (prevenir XSS)
    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      subject: sanitize(subject),
      message: sanitize(message),
    }

    // Insertar en Supabase
    const { error: insertError } = await supabase
      .from('messages')
      .insert(sanitizedData)

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return sendResponse(res, 500, { 
        message: 'Error sending message. Please try again.' 
      })
    }

    // Enviar email de notificación (opcional)
    // await sendNotificationEmail(sanitizedData)

    return sendResponse(res, 200, { 
      message: 'Message sent successfully' 
    })

  } catch (error) {
    console.error('Contact handler error:', error)
    return sendResponse(res, 500, { 
      message: 'Internal server error' 
    })
  }
}

// Helper para sanitizar input
function sanitize(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}
```

### 3.3 Ejemplo de Endpoint: Projects (Admin)

```typescript
// api/admin/projects/index.ts
import { VercelRequest, VercelResponse } from '@vercel/node'
import { z } from 'zod'
import { supabase } from '../../utils/supabase'
import { verifyAuth } from '../../utils/auth'
import { checkRateLimit } from '../../utils/rate-limit'
import { sendResponse } from '../../utils/response'

// Schema para crear/actualizar proyecto
const projectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(10).max(2000),
  short_description: z.string().min(10).max(500),
  technologies: z.array(z.string()).min(1),
  category: z.enum(['web', 'mobile', 'backend', 'fullstack']),
  repo_url: z.string().url().optional().nullable(),
  demo_url: z.string().url().optional().nullable(),
  image_url: z.string().url().optional().nullable(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().min(0).default(0),
})

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Verificar autenticación
  const authResult = await verifyAuth(req)
  if (!authResult.authenticated) {
    return sendResponse(res, 401, { message: 'Unauthorized' })
  }

  // Rate limiting
  const rateLimitKey = `admin:projects:${authResult.userId}`
  
  if (req.method === 'GET') {
    if (!checkRateLimit(rateLimitKey, 100, 3600)) {
      return sendResponse(res, 429, { message: 'Too many requests' })
    }
    return handleGetProjects(res)
  }

  if (req.method === 'POST') {
    if (!checkRateLimit(rateLimitKey, 20, 3600)) {
      return sendResponse(res, 429, { message: 'Too many requests' })
    }
    return handleCreateProject(req, res)
  }

  return sendResponse(res, 405, { message: 'Method not allowed' })
}

async function handleGetProjects(res: VercelResponse) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return sendResponse(res, 500, { message: 'Error fetching projects' })
  }

  return sendResponse(res, 200, { data })
}

async function handleCreateProject(
  req: VercelRequest,
  res: VercelResponse
) {
  const validation = projectSchema.safeParse(req.body)
  
  if (!validation.success) {
    return sendResponse(res, 400, {
      message: 'Invalid input',
      errors: validation.error.flatten().fieldErrors,
    })
  }

  const { data, error } = await supabase
    .from('projects')
    .insert(validation.data)
    .select()
    .single()

  if (error) {
    return sendResponse(res, 500, { message: 'Error creating project' })
  }

  return sendResponse(res, 201, { data })
}
```

---

## 4. Utilidades del Backend

### 4.1 Cliente Supabase

```typescript
// api/utils/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

// Singleton pattern para evitar múltiples instancias
let supabaseInstance: ReturnType<typeof createClient> | null = null

export function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }
  return supabaseInstance
}

// Para uso directo
export const supabase = getSupabase()
```

### 4.2 Autenticación

```typescript
// api/utils/auth.ts
import { VercelRequest } from '@vercel/node'
import jwt from 'jsonwebtoken'
import { supabase } from './supabase'

interface AuthResult {
  authenticated: boolean
  userId?: string
  error?: string
}

export async function verifyAuth(req: VercelRequest): Promise<AuthResult> {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader?.startsWith('Bearer ')) {
      return { authenticated: false, error: 'No token provided' }
    }

    const token = authHeader.split(' ')[1]
    
    // Verificar JWT con Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return { authenticated: false, error: 'Invalid token' }
    }

    return { 
      authenticated: true, 
      userId: user.id 
    }

  } catch (error) {
    return { 
      authenticated: false, 
      error: 'Authentication error' 
    }
  }
}
```

### 4.3 Rate Limiting

```typescript
// api/utils/rate-limit.ts

// En producción, usar Redis o Vercel KV
// Para simplicity, usamos un Map en memoria (resetea en cold starts)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

interface RateLimitConfig {
  windowMs: number    // Ventana de tiempo en milisegundos
  max: number         // Máximo de requests por ventana
}

export function checkRateLimit(
  key: string,
  max: number,
  windowSeconds: number
): boolean {
  const now = Date.now()
  const windowMs = windowSeconds * 1000
  
  const record = rateLimitMap.get(key)
  
  if (!record || now > record.resetTime) {
    // Primera request o ventana expirada
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + windowMs,
    })
    return true
  }

  if (record.count >= max) {
    // Límite alcanzado
    return false
  }

  // Incrementar contador
  record.count++
  return true
}

// Cleanup periódico (opcional)
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}, 60000) // Cada minuto
```

### 4.4 Respuestas Estandarizadas

```typescript
// api/utils/response.ts
import { VercelResponse } from '@vercel/node'

interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
  errors?: Record<string, string[]>
}

export function sendResponse<T>(
  res: VercelResponse,
  statusCode: number,
  body: ApiResponse<T>
): void {
  res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    ...body,
  })
}
```

### 4.5 Manejo de Errores

```typescript
// api/utils/errors.ts

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(public errors: Record<string, string[]>) {
    super(400, 'Validation failed', 'VALIDATION_ERROR')
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, `${resource} not found`, 'NOT_FOUND')
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(401, message, 'UNAUTHORIZED')
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super(429, 'Too many requests', 'RATE_LIMIT_EXCEEDED')
  }
}
```

---

## 5. Configuración de Vercel

### 5.1 vercel.json

```json
{
  "version": 2,
  "name": "portafolio-vras",
  "builds": [
    {
      "src": "api/**/*.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ],
  "env": {
    "SUPABASE_URL": "@supabase-url",
    "SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_KEY": "@supabase-service-key"
  }
}
```

### 5.2 Variables de Entorno

| Variable | Ubicación | Descripción |
|:---------|:----------|:------------|
| `SUPABASE_URL` | Vercel (server) | URL del proyecto Supabase |
| `SUPABASE_ANON_KEY` | Vercel (server) | Anon key de Supabase |
| `SUPABASE_SERVICE_KEY` | Vercel (server) | Service key (admin) |
| `VITE_SUPABASE_URL` | Vercel (client) | URL para el frontend |
| `VITE_SUPABASE_ANON_KEY` | Vercel (client) | Anon key para el frontend |
| `CONTACT_EMAIL` | Vercel (server) | Email de notificación |

---

## 6. Validación con Zod

### 6.1 Schemas Compartidos

```typescript
// api/utils/validation.ts
import { z } from 'zod'

// Schema común para strings
const nameSchema = z.string().min(2).max(100).trim()
const emailSchema = z.string().email().max(254).trim()
const urlSchema = z.string().url().optional().nullable()

// Schema de contacto
export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z.string().min(3).max(200).trim(),
  message: z.string().min(10).max(5000).trim(),
  honeypot: z.string().max(0).optional(),
})

// Schema de proyecto
export const projectSchema = z.object({
  title: z.string().min(1).max(200).trim(),
  description: z.string().min(10).max(2000).trim(),
  short_description: z.string().min(10).max(500).trim(),
  technologies: z.array(z.string().min(1).max(50)).min(1).max(20),
  category: z.enum(['web', 'mobile', 'backend', 'fullstack']),
  repo_url: urlSchema,
  demo_url: urlSchema,
  image_url: urlSchema,
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().int().min(0).max(1000).default(0),
})

// Schema de configuración
export const configSchema = z.object({
  site_title: z.string().min(1).max(200).trim(),
  site_description: z.string().min(1).max(500).trim(),
  hero_name: z.string().min(1).max(100).trim(),
  hero_title: z.string().min(1).max(200).trim(),
  hero_tagline: z.string().min(1).max(500).trim(),
  contact_email: emailSchema,
  social_github: urlSchema,
  social_linkedin: urlSchema,
})

// Tipos inferidos
export type ContactInput = z.infer<typeof contactSchema>
export type ProjectInput = z.infer<typeof projectSchema>
export type ConfigInput = z.infer<typeof configSchema>
```

---

## 7. Logging y Monitoreo

### 7.1 Logging

```typescript
// api/utils/logger.ts
type LogLevel = 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, unknown>
}

export function log(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>
): void {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
  }

  // En producción, enviar a servicio de logging
  console[level === 'error' ? 'error' : 'log'](JSON.stringify(entry))
}

export const logger = {
  info: (msg: string, ctx?: Record<string, unknown>) => log('info', msg, ctx),
  warn: (msg: string, ctx?: Record<string, unknown>) => log('warn', msg, ctx),
  error: (msg: string, ctx?: Record<string, unknown>) => log('error', msg, ctx),
}
```

### 7.2 Métricas a Monitorear

| Métrica | Descripción | Umbral |
|:--------|:------------|:-------|
| **Tasa de errores** | % de requests fallidos | < 1% |
| **Latencia promedio** | Tiempo de respuesta promedio | < 500ms |
| **Cold starts** | Frecuencia de cold starts | < 10% |
| **Rate limits** | Requests rechazados | < 5% |
| **Contactos recibidos** | Mensajes de contacto válidos | Tracking |

---

## 8. Pruebas

### 8.1 Tipos de Pruebas

| Tipo | Herramienta | Cobertura |
|:-----|:------------|:----------|
| **Unit** | Vitest | Utilidades, helpers |
| **Integration** | Vitest + Supertest | Endpoints API |
| **E2E** | Playwright | Flujos completos |
| **Load** | k6 | Rendimiento |

### 8.2 Ejemplo de Prueba

```typescript
// api/__tests__/contact.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { createMocks } from 'node-mocks-http'
import contactHandler from '../contact'

describe('Contact API', () => {
  it('should return 405 for non-POST methods', async () => {
    const { req, res } = createMocks({ method: 'GET' })
    await contactHandler(req, res)
    expect(res._getStatusCode()).toBe(405)
  })

  it('should return 400 for invalid input', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { name: '' },
    })
    await contactHandler(req, res)
    expect(res._getStatusCode()).toBe(400)
  })

  it('should return 200 for valid input', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
      },
    })
    await contactHandler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })
})
```

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*
