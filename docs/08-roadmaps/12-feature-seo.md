# Feature: SEO

> **ID:** F-12 | **Prioridad:** Alta | **Dependencias:** F-01

---

## 1. Objetivo

Implementar SEO técnico: meta tags, sitemap, robots.txt, Open Graph, estructura semántica.

---

## 2. Implementación

### Meta Tags (index.html)
```html
<title>Victor Arévalo | Full Stack Developer</title>
<meta name="description" content="Portafolio de Victor Rafael Arévalo Sierra - Full Stack Developer especializado en Java/C#">
<meta name="keywords" content="developer, portfolio, full stack, react, java, c#">
<link rel="canonical" href="https://victorarevalo.dev">
```

### Open Graph
```html
<meta property="og:title" content="Victor Arévalo | Full Stack Developer">
<meta property="og:description" content="Portafolio profesional - Soluciones web completas">
<meta property="og:image" content="/og-image.png">
<meta property="og:url" content="https://victorarevalo.dev">
<meta property="og:type" content="website">
```

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://victorarevalo.dev/sitemap.xml
```

### sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://victorarevalo.dev</loc>
    <lastmod>2026-09-06</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 3. Verificación

- [ ] Title y description presentes
- [ ] Open Graph tags funcionan
- [ ] Sitemap válido
- [ ] robots.txt accesible

---

**Última actualización:** *2026-09-06*