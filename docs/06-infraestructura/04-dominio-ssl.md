# Dominio y SSL

> **Propósito:** Documentar la configuración de dominio personalizado, DNS y certificados SSL/TLS.

---

## 1. Opciones de Dominio

### 1.1 Comparativa

| Dominio | Costo | Recomendación | Profesional |
|:--------|:------|:--------------|:------------|
| `victorarevalo.dev` | ~$12/año | ✅ Recomendado | Sí |
| `victorarevalo.com` | ~$12/año | ✅ Alternativa | Sí |
| `portafolio-vras.vercel.app` | Gratis | ✅ Para desarrollo | No |

### 1.2 Recomendación

**Dominio recomendado:** `victorarevalo.dev`

**Razones:**
- TLD `.dev` es ideal para desarrolladores
- Corto y fácil de recordar
- Profesional y moderno
- Incluye HTTPS automático

---

## 2. Proveedores de Dominio

### 2.1 Comparativa de Proveedores

| Proveedor | Costo | SSL Gratis | DNS | Soporte |
|:----------|:------|:-----------|:----|:--------|
| **Namecheap** | ~$10/año | Sí | Sí | 24/7 |
| **Google Domains** | ~$12/año | Sí | Sí | Email |
| **Cloudflare** | ~$10/año | Sí | Sí | 24/7 |
| **GoDaddy** | ~$15/año | No | Sí | 24/7 |

### 2.2 Recomendación

**Proveedor recomendado:** Namecheap o Cloudflare

**Razones:**
- Precio competitivo
- SSL gratuito incluido
- DNS rápido y confiable
- Interfaz sencilla

---

## 3. Configuración DNS

### 3.1 Registros Necesarios

| Tipo | Nombre | Valor | TTL | Propósito |
|:-----|:-------|:------|:----|:----------|
| **A** | `@` | `76.76.21.21` | 3600 | Apuntar dominio raíz a Vercel |
| **CNAME** | `www` | `cname.vercel-dns.com` | 3600 | Redirigir www al dominio |

### 3.2 Configuración en Namecheap

```
1. Ir a Dashboard → Domain List → Manage
2. Seleccionar pestaña "Advanced DNS"
3. Agregar registros:

   Type: A Record
   Host: @
   Value: 76.76.21.21
   TTL: Automatic

   Type: CNAME Record
   Host: www
   Value: cname.vercel-dns.com
   TTL: Automatic
```

### 3.3 Configuración en Cloudflare

```
1. Ir a Dashboard → DNS
2. Agregar registros:

   Type: A
   Name: @
   Content: 76.76.21.21
   Proxy: DNS only (gray cloud)
   TTL: Auto

   Type: CNAME
   Name: www
   Content: cname.vercel-dns.com
   Proxy: DNS only (gray cloud)
   TTL: Auto
```

---

## 4. Configuración en Vercel

### 4.1 Agregar Dominio

1. Ir a **Vercel Dashboard** → **Project Settings** → **Domains**
2. Escribir el dominio: `victorarevalo.dev`
3. Click **"Add"**
4. Verificar configuración DNS
5. Esperar propagación (5-30 minutos)

### 4.2 Dominios Configurados

| Dominio | Tipo | Estado |
|:--------|:-----|:-------|
| `victorarevalo.dev` | Production | ✅ Activo |
| `www.victorarevalo.dev` | Redirect | ✅ Redirige a dominio raíz |
| `portafolio-vras.vercel.app` | Preview | ✅ Activo |

### 4.3 Redirects

```json
// vercel.json
{
  "redirects": [
    {
      "source": "/:path((?!admin).*)",
      "has": [{ "type": "host", "value": "www.victorarevalo.dev" }],
      "destination": "https://victorarevalo.dev/:path",
      "permanent": true
    }
  ]
}
```

---

## 5. SSL/TLS

### 5.1 Certificado Automático

Vercel proporciona automáticamente:

| Característica | Valor |
|:---------------|:------|
| **Proveedor** | Let's Encrypt |
| **Tipo** | Wildcard |
| **Renovación** | Automática (cada 90 días) |
| **Costo** | Gratis |
| **Cifrado** | TLS 1.2/1.3 |

### 5.2 Headers de Seguridad

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

### 5.3 Verificación SSL

```bash
# Verificar certificado
openssl s_client -connect victorarevalo.dev:443 -servername victorarevalo.dev

# O usar curl
curl -I https://victorarevalo.dev
```

---

## 6. Propagación DNS

### 6.1 Tiempo de Propagación

| Proveedor | Tiempo Estimado |
|:----------|:----------------|
| **Namecheap** | 5-30 minutos |
| **Cloudflare** | 1-5 minutos |
| **GoDaddy** | 30-60 minutos |

### 6.2 Verificar Propagación

```bash
# Verificar registro A
nslookup victorarevalo.dev

# Verificar registro CNAME
nslookup www.victorarevalo.dev

# Usar dig (más detallado)
dig victorarevalo.dev
```

### 6.3 Herramientas Online

- https://dnschecker.org
- https://www.whatsmydns.net
- https://dns.google

---

## 7. Troubleshooting

### 7.1 Problemas Comunes

| Problema | Causa Solución |
|:---------|:---------------|
| **Dominio no resuelve** | Esperar propagación, verificar DNS |
| **SSL no funciona** | Verificar registros DNS, esperar 5 min |
| **Error 404** | Verificar vercel.json, rutas configuradas |
| **Redirect loop** | Verificar configuración de redirects |

### 7.2 Pasos de Verificación

1. **Verificar DNS:**
   ```bash
   nslookup victorarevalo.dev
   ```

2. **Verificar SSL:**
   ```bash
   curl -I https://victorarevalo.dev
   ```

3. **Verificar Vercel:**
   - Ir a Dashboard → Deployments
   - Verificar que el último deploy fue exitoso

---

## 8. Checklist de Configuración

### Compra de Dominio
- [ ] Seleccionar proveedor
- [ ] Comprar dominio `victorarevalo.dev`
- [ ] Verificar propiedad

### Configuración DNS
- [ ] Agregar registro A (`@` → `76.76.21.21`)
- [ ] Agregar registro CNAME (`www` → `cname.vercel-dns.com`)
- [ ] Esperar propagación

### Configuración Vercel
- [ ] Agregar dominio en Dashboard
- [ ] Verificar verificación DNS
- [ ] Confirmar SSL automático

### Verificación
- [ ] Dominio resuelve correctamente
- [ ] HTTPS funciona
- [ ] Redirección www funciona
- [ ] Todos los endpoints responden

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*