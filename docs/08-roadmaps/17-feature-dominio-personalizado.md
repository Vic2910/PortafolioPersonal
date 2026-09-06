# Feature: Dominio Personalizado

> **ID:** F-17 | **Prioridad:** Media | **Dependencias:** F-16

---

## 1. Objetivo

Configurar dominio personalizado (victorarevalo.dev) con DNS, SSL automático y redirects.

---

## 2. Implementación

### Compra de Dominio

Proveedores recomendados:
- Namecheap (~$10/año)
- Cloudflare (~$10/año)

### Configuración DNS

| Tipo | Host | Value |
|:-----|:-----|:------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### Configuración en Vercel

1. Settings → Domains
2. Agregar `victorarevalo.dev`
3. Verificar DNS
4. SSL automático

### Redirects (vercel.json)
```json
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

## 3. Verificación

- [ ] Dominio resuelve correctamente
- [ ] HTTPS funciona
- [ ] Redirección www funciona
- [ ] SSL válido

---

**Última actualización:** *2026-09-06*