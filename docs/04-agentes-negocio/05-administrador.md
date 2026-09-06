# AG-05: Administrador del Portafolio

## Datos del Agente

| Campo | Valor |
|:------|:------|
| **ID** | AG-05 |
| **Nombre** | Administrador / Desarrollador del Portafolio |
| **Objetivo** | Gestionar, mantener y mejorar el portafolio |
| **Tiempo Promedio** | Variable (según tarea) |
| **Prioridad** | Baja |

---

## Perfil

### ¿Quién es?
- El propio desarrollador (Victor Rafael Arévalo Sierra)
- Responsable del mantenimiento y actualización del portafolio
- Único usuario con acceso al panel de administración

### ¿Qué necesita?
- Gestionar contenido del portafolio
- Actualizar proyectos y habilidades
- Monitorear métricas y rendimiento
- Realizar mantenimiento técnico

### ¿Cómo interactúa?
- Accede al admin panel con autenticación
- Realiza operaciones CRUD sobre contenido
- Monitorear analytics y métricas
- Configurar y mantener el sistema

---

## Funcionalidades del Admin Panel

### Gestión de Contenido
| Entidad | Operaciones | Descripción |
|:--------|:------------|:------------|
| Proyectos | CRUD | Crear, editar, eliminar proyectos |
| Habilidades | CRUD | Actualizar stack tecnológico |
| Biografía | Update | Editar sección Sobre Mí |
| Configuración | Update | Ajustes generales del sitio |

### Gestión Técnica
| Tarea | Frecuencia | Descripción |
|:------|:-----------|:------------|
| Deploy | Cada push | Despliegue automático a Vercel |
| Monitoreo | Semanal | Revisar métricas de rendimiento |
| Seguridad | Mensual | Auditoría de cabeceras y dependencias |
| Backups | Semanal | Respaldo automático de base de datos |

---

## Panel de Administración

### Estructura Esperada
```
┌─────────────────────────────────────────────────────────────┐
│  ADMIN PANEL - PortafolioVRAS                                │
├─────────────────────────────────────────────────────────────┤
│  [Dashboard] [Proyectos] [Habilidades] [Config] [Salir]    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    DASHBOARD                              ││
│  │  - Visitantes hoy: 12                                    ││
│  │  - Proyectos: 6                                          ││
│  │  - Último deploy: hace 2 horas                           ││
│  │  - Estado: OK                                            ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    GESTIÓN DE PROYECTOS                   ││
│  │  [Nuevo Proyecto]                                        ││
│  │  - Dashboard Ventas         [Editar] [Eliminar]          ││
│  │  - Sistema Auth             [Editar] [Eliminar]          ││
│  │  - E-commerce               [Editar] [Eliminar]          ││
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Autenticación y Seguridad

### Credenciales
| Campo | Valor |
|:------|:------|
| **Método** | Supabase Auth (JWT) |
| **Email** | victorarevalosierra@gmail.com |
| **Password** | *[Definir en producción]* |
| **2FA** | *[Opcional - recomendar]* |

### Permisos
| Acción | Permiso |
|:-------|:--------|
| Leer contenido | Público |
| Crear contenido | Admin |
| Editar contenido | Admin |
| Eliminar contenido | Admin |
| Ver analytics | Admin |
| Configurar sistema | Admin |

---

## Tareas de Mantenimiento

### Diario
- [ ] Verificar deploy exitoso
- [ ] Revisar errores en consola
- [ ] Comprobar disponibilidad

### Semanal
- [ ] Revisar métricas de visitantes
- [ ] Actualizar proyectos si es necesario
- [ ] Verificar links rotos

### Mensual
- [ ] Auditoría de seguridad
- [ ] Actualizar dependencias
- [ ] Optimizar rendimiento
- [ ] Revisar Core Web Vitals

### Trimestral
- [ ] Revisar estrategia de contenido
- [ ] Evaluar nuevas tecnologías
- [ ] Planificar mejoras

---

## Variables de Entorno Requeridas

```env
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...

# Vercel
VERCEL_ORG_ID=xxxxx
VERCEL_PROJECT_ID=xxxxx

# Email (Opcional)
RESEND_API_KEY=re_xxxxx
```

---

## Métricas a Monitorear

### Rendimiento
| Métrica | Herramienta | Objetivo |
|:--------|:------------|:---------|
| LCP | Lighthouse | < 2.5s |
| INP | Lighthouse | < 200ms |
| CLS | Lighthouse | < 0.1 |
| Uptime | Vercel Status | 99.9% |

### Uso
| Métrica | Herramienta | Objetivo |
|:--------|:------------|:---------|
| Visitantes únicos | Analytics | Crecimiento mensual |
| Páginas vistas | Analytics | > 1000/mes |
| Tasa de rebote | Analytics | < 50% |
| Tiempo promedio | Analytics | > 2 min |

### Seguridad
| Métrica | Herramienta | Objetivo |
|:--------|:------------|:---------|
| Headers OWASP | securityheaders.com | A+ |
| Dependencias | npm audit | 0 vulnerabilidades |
| SSL | SSL Labs | A+ |

---

## Proceso de Deploy

```
1. Desarrollo local
   npm run dev

2. Commit cambios
   git add .
   git commit -m "feat: descripción"

3. Push a main
   git push origin main

4. Deploy automático
   Vercel detecta cambio → Build → Deploy

5. Verificación
   - Revisar logs en Vercel Dashboard
   - Verificar en producción
   - Probar funcionalidad
```

---

## Troubleshooting Común

| Problema | Causa Solución | Solución |
|:---------|:---------------|:---------|
| Deploy falla | Error en build | Revisar logs, corregir error |
| Página no carga | Error de runtime | Verificar variables de entorno |
| Lento | Imágenes grandes | Optimizar, usar CDN |
| Auth falla | Token expirado | Regenerar en Supabase |
| 404 en rutas | Configuración SPA | Verificar vercel.json |

---

## Referencias

| Documento | Relevancia |
|:----------|:-----------|
| `07-arquitectura/07-admin-panel.md` | Diseño del admin panel |
| `07-arquitectura/06-arquitectura-despliegue.md` | Proceso de deploy |
| `09-runbooks/06-runbook-deploy-vercel.md` | Guía de deploy |
| `09-runbooks/07-runbook-admin-panel.md` | Uso del admin panel |

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*
