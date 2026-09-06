# Feature: Seguridad

> **ID:** F-10 | **Prioridad:** Alta | **Dependencias:** F-01

---

## 1. Objetivo

Implementar headers de seguridad OWASP, CSP, rate limiting y protecciones contra XSS/CSRF.

---

## 2. Implementación

### Headers de Seguridad (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" }
      ]
    }
  ]
}
```

### Rate Limiting
```typescript
// api/middleware/rateLimit.ts
const requests = new Map()

export function checkRateLimit(ip: string, limit = 10, window = 60000): boolean {
  const now = Date.now()
  const recent = requests.get(ip)?.filter((t: number) => now - t < window) || []
  if (recent.length >= limit) return false
  recent.push(now)
  requests.set(ip, recent)
  return true
}
```

---

## 3. Verificación

- [ ] Headers aparecen en respuesta HTTP
- [ ] Rate limiting funciona en APIs
- [ ] SSL forzado (HSTS)

---

**Última actualización:** *2026-09-06*