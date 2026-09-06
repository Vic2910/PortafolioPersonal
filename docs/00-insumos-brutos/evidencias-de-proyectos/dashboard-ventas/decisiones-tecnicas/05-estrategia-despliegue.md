# Decisión: Estrategia de Despliegue

## Contexto

El Dashboard de Ventas requiere una estrategia de despliegue que:
- Permita acceso público desde cualquier lugar
- Tenga buena performance (baja latencia)
- Sea económica (preferiblemente gratuita para desarrollo)
- Soporte HTTPS y dominio personalizado
- Permita despliegues continuos (CI/CD)

Se necesita decidir dónde y cómo desplegar tanto el frontend como el backend.

---

## Opciones Evaluadas

### Opción 1: Vercel (Frontend) + Railway (Backend)

**Pros:**
- Vercel: Despliegue automático desde Git, CDN global, gratuita para proyectos personales
- Railway: Fácil despliegue de backend, soporte para bases de datos, pricing generoso
- Integración directa con GitHub
- Dominios personalizados incluidos

**Contras:**
- Dos plataformas diferentes (complejidad operativa)
- Railway tiene costo después del tier gratuito
- Vendor lock-in parcial

### Opción 2: Netlify (Frontend) + Render (Backend)

**Pros:**
- Netlify: CDN global, serverless functions, gratuita para proyectos personales
- Render: Despliegue fácil, bases de datos managed, free tier generoso
- Buena integración con GitHub
- SSL automático

**Contras:**
- Render puede ser lento en free tier (cold starts)
- Funcionalidades limitadas en planes gratuitos
- Menor ecosistema que Vercel/Railway

### Opción 3: AWS (Todo en una plataforma)

**Pros:**
- Escalabilidad ilimitada
- Control total sobre la infraestructura
- Amplia gama de servicios (S3, EC2, RDS, CloudFront)
- Estándar de la industria

**Contras:**
- Curva de aprendizaje muy pronunciada
- Configuración compleja
- Costos impredecibles sin monitoreo
- Overhead operativo significativo

---

## Decisión Tomada

**Opción seleccionada: Vercel (Frontend) + Supabase (Backend + BD)**

### Justificación

1. **Frontend en Vercel:**
   - Despliegue automático al hacer push a `main`
   - CDN global con edge functions
   - SSL automático y dominio personalizado
   -免费 tier generosa para proyectos personales
   - Integración perfecta con Next.js (si se usa) o cualquier framework

2. **Backend + BD en Supabase:**
   - Backend como servicio (BaaS) reduce tiempo de desarrollo
   - Base de datos PostgreSQL managed
   - Autenticación integrada (puede simplificar o reemplazar JWT propio)
   - Storage para archivos (imágenes de productos)
   - API REST automática desde la base de datos
   - Free tier generosa (500MB BD, 1GB storage)

3. **Simplificación operativa:**
   - Menos infraestructura que manejar
   - Menos configuración que mantener
   - Enfoque en desarrollo de features en lugar de DevOps

---

## Arquitectura de Despliegue

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        INTERNET                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     CDN de Vercel                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 Frontend (React)                     │   │
│  │  - HTML/CSS/JS estático                             │   │
│  │  - Assets optimizados                               │   │
│  │  - Server-side rendering (si aplica)                │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Supabase                                │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │  PostgreSQL DB   │  │  Auth Service    │               │
│  │  - Datos         │  │  - JWT           │               │
│  │  - Migraciones   │  │  - Usuarios      │               │
│  │  - Índices       │  │  - Roles         │               │
│  └──────────────────┘  └──────────────────┘               │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │  Storage         │  │  Edge Functions  │               │
│  │  - Imágenes      │  │  - Lógica server │               │
│  │  - Archivos      │  │  - APIs custom   │               │
│  └──────────────────┘  └──────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de Desarrollo

```
Desarrollador → Git Push → GitHub → Vercel (Frontend) → Deploy automático
                                       ↓
                              Supabase (Backend) → Deploy automático
```

---

## Configuración de Vercel

### Variables de Entorno

```bash
# Frontend
VITE_API_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

### Configuración de Dominio

1. Comprar dominio (ej: `tudashboard.dev`)
2. Configurar en Vercel:
   - Settings → Domains → Add Domain
   - Configurar DNS con los registros proporcionados
   - SSL automático habilitado

### Optimizaciones de Performance

```javascript
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## Configuración de Supabase

### Estructura de la Base de Datos

```sql
-- Crear tablas principales
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER DEFAULT 0,
  category_id UUID REFERENCES categories(id),
  image_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL
);
```

### Políticas RLS (Row Level Security)

```hablarse
-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Política para usuarios autenticados
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Política para productos (lectura pública, escritura admin)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert products" ON products
  FOR INSERT USING (auth.jwt() ->> 'role' = 'admin');
```

---

## CI/CD Pipeline

### Flujo de Trabajo

```
1. Desarrollador crea feature branch
2. Desarrollador hace push a la branch
3. GitHub Actions ejecuta:
   - Linting (ESLint)
   - Tests (Jest/Vitest)
   - Build
4. Pull Request creado
5. Code review
6. Merge a main
7. Vercel despliega automáticamente
8. Supabase ejecuta migraciones si hay cambios
```

### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
```

---

## Monitoreo y Métricas

### Métricas a Monitorear

| Métrica | Herramienta | Objetivo |
|:--------|:------------|:---------|
| Uptime | Vercel Analytics | 99.9% |
| Tiempo de respuesta | Vercel Analytics | < 200ms |
| Errores JavaScript | Sentry | 0 errores críticos |
| Uso de base de datos | Supabase Dashboard | Dentro de límites free tier |
| Tráfico | Vercel Analytics | Monitorear crecimiento |

### Alertas Configuradas

- **Uptime < 99.9%:** Notificación por email
- **Errores > 100/día:** Notificación por Slack/email
- **Uso de BD > 80%:** Alerta de upgrade

---

## Costos Estimados

### Tier Gratuito (Desarrollo)

| Servicio | Tier | Costo |
|:---------|:-----|:------|
| Vercel | Hobby | $0/mes |
| Supabase | Free | $0/mes |
| Dominio | Compra propia | ~$12/año |
| **Total** | | **~$1/mes** |

### Tier de Producción (Escalado)

| Servicio | Tier | Costo |
|:---------|:-----|:------|
| Vercel | Pro | $20/mes |
| Supabase | Pro | $25/mes |
| Dominio | Renovación | ~$12/año |
| **Total** | | **~$46/mes** |

---

## Consecuencias

### Positivas
- Despliegue simplificado y automatizado
- Costos mínimos durante desarrollo
- Escalabilidad según necesidades
- Menos tiempo en infraestructura, más en desarrollo

### Negativas
- Vendor lock-in con Vercel y Supabase
- Limitaciones del free tier
- Menor control que infraestructura propia

### Riesgos
- Cambios de precio en el futuro (mitigado con alternativas)
- Limitaciones de rendimiento en free tier (mitigado con upgrade)
- Dependencia de terceros (mitigado con exportación de datos)

---

## Plan de Migración (si es necesario)

Si se necesita abandonar Vercel/Supabase:

1. **Frontend:** Exportar código estático, desplegar en Netlify/Cloudflare Pages
2. **Base de datos:** Exportar dump de PostgreSQL, importar en RDS/Render
3. **Auth:** Migrar a Firebase Auth o Auth0
4. **Storage:** Migrar a S3/Cloudflare R2

---

## Referencias

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Fecha de decisión:** *[Completar]*
**Tomada por:** *[Nombre del desarrollador]*
**Revisada por:** *[Si aplica]*
