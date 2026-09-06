# ARQ-04: Arquitectura de Datos

> **Propósito:** Definir el modelo de datos, schema de base de datos, relaciones entre entidades, políticas de seguridad (RLS) y estrategia de almacenamiento.

---

## 1. Visión General de la Capa de Datos

PortafolioVRAS utiliza **Supabase** como plataforma de Backend-as-a-Service (BaaS), que proporciona:
- **PostgreSQL 15+** como base de datos relacional
- **Row Level Security (RLS)** para seguridad a nivel de fila
- **Auto-generated REST API** vía PostgREST
- **Authentication** integrada (JWT)
- **Storage** para archivos (imágenes, CV)

---

## 2. Modelo de Datos

### 2.1 Diagrama Entidad-Relación (ER)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         MODELO DE DATOS                             │
│                                                                      │
│  ┌──────────────────┐         ┌──────────────────┐                 │
│  │     projects     │         │      messages     │                 │
│  ├──────────────────┤         ├──────────────────┤                 │
│  │ id (PK, UUID)    │         │ id (PK, UUID)    │                 │
│  │ title            │         │ name             │                 │
│  │ description      │         │ email            │                 │
│  │ short_description│         │ subject          │                 │
│  │ technologies[]   │         │ message          │                 │
│  │ category         │         │ is_read          │                 │
│  │ repo_url         │         │ created_at       │                 │
│  │ demo_url         │         └──────────────────┘                 │
│  │ image_url        │                                               │
│  │ featured         │         ┌──────────────────┐                 │
│  │ published        │         │  site_config     │                 │
│  │ order            │         ├──────────────────┤                 │
│  │ created_at       │         │ id (PK, UUID)    │                 │
│  │ updated_at       │         │ key (UNIQUE)     │                 │
│  └──────────────────┘         │ value (JSONB)    │                 │
│                               │ updated_at       │                 │
│  ┌──────────────────┐         └──────────────────┘                 │
│  │    analytics     │                                               │
│  ├──────────────────┤         ┌──────────────────┐                 │
│  │ id (PK, UUID)    │         │   site_stats     │                 │
│  │ page             │         ├──────────────────┤                 │
│  │ ip_hash          │         │ id (PK, UUID)    │                 │
│  │ user_agent       │         │ total_visits     │                 │
│  │ referrer         │         │ unique_visitors  │                 │
│  │ country          │         │ last_updated     │                 │
│  │ created_at       │         └──────────────────┘                 │
│  └──────────────────┘                                               │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Relaciones

| Relación | Tipo | Descripción |
|:---------|:-----|:------------|
| projects → messages | 1:N | Un proyecto puede tener muchos mensajes relacionados |
| site_config | Singleton | Configuración global del sitio (key-value) |
| site_stats | Singleton | Estadísticas agregadas del sitio |

---

## 3. Schema de Base de Datos

### 3.1 Tabla: projects

```sql
-- Tabla de proyectos del portafolio
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Contenido
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  short_description VARCHAR(500) NOT NULL,
  
  -- Tecnologías y categorías
  technologies TEXT[] NOT NULL DEFAULT '{}',
  category VARCHAR(50) NOT NULL 
    CHECK (category IN ('web', 'mobile', 'backend', 'fullstack')),
  
  -- URLs externas
  repo_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  
  -- Control
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_projects_published ON projects(published);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_order ON projects("order");

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 3.2 Tabla: messages

```sql
-- Tabla de mensajes de contacto
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Contenido del mensaje
  name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  
  -- Control
  is_read BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_messages_is_read ON messages(is_read);
```

### 3.3 Tabla: site_config

```sql
-- Tabla de configuración del sitio (key-value)
CREATE TABLE site_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Key-value store
  key VARCHAR(100) NOT NULL UNIQUE,
  value JSONB NOT NULL,
  
  -- Timestamps
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Datos iniciales
INSERT INTO site_config (key, value) VALUES
  ('hero', '{
    "name": "Victor Rafael Arévalo Sierra",
    "title": "Full Stack Developer",
    "tagline": "Construyo aplicaciones web robustas y escalables",
    "technologies": ["Java", "C#", "React", "Spring Boot", "ASP.NET"]
  }'),
  ('social', '{
    "github": "https://github.com/Vic2910",
    "linkedin": "",
    "email": "victorarevalosierra@gmail.com"
  }'),
  ('seo', '{
    "title": "Victor Arévalo Sierra | Full Stack Developer",
    "description": "Portafolio profesional de Victor Arévalo Sierra, desarrollador Full Stack especializado en Java, C# y frameworks modernos.",
    "keywords": ["desarrollador", "full stack", "java", "react", "spring boot"]
  }');
```

### 3.4 Tabla: analytics

```sql
-- Tabla de analytics de visitas
CREATE TABLE analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Datos de la visita
  page VARCHAR(500) NOT NULL,
  ip_hash VARCHAR(64) NOT NULL,  -- Hash de IP (no almacenamos IP real)
  user_agent TEXT,
  referrer TEXT,
  country VARCHAR(2),  -- Código ISO del país
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para consultas de analytics
CREATE INDEX idx_analytics_created_at ON analytics(created_at DESC);
CREATE INDEX idx_analytics_page ON analytics(page);
CREATE INDEX idx_analytics_ip_hash ON analytics(ip_hash);

-- Partición por mes para optimizar consultas (opcional, para escalado)
-- CREATE TABLE analytics_2026_01 PARTITION OF analytics
--   FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
```

### 3.5 Tabla: site_stats

```sql
-- Tabla de estadísticas agregadas (singleton)
CREATE TABLE site_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Métricas
  total_visits INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  
  -- Timestamps
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar registro único
INSERT INTO site_stats (total_visits, unique_visitors) VALUES (0, 0);

-- Función para incrementar visitas
CREATE OR REPLACE FUNCTION increment_visits()
RETURNS void AS $$
BEGIN
  UPDATE site_stats 
  SET 
    total_visits = total_visits + 1,
    last_updated = NOW()
  WHERE id = (SELECT id FROM site_stats LIMIT 1);
END;
$$ LANGUAGE plpgsql;
```

---

## 4. Políticas Row Level Security (RLS)

### 4.1 Política para projects (Lectura Pública)

```sql
-- Permitir lectura de proyectos publicados a todos
CREATE POLICY "Public read access for published projects"
  ON projects
  FOR SELECT
  USING (published = true);

-- Permitir todas las operaciones al usuario autenticado (admin)
CREATE POLICY "Admin full access to projects"
  ON projects
  FOR ALL
  USING (auth.role() = 'authenticated');
```

### 4.2 Política para messages

```sql
-- Solo el admin puede leer mensajes
CREATE POLICY "Admin can read messages"
  ON messages
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Cualquiera puede insertar mensajes (formulario de contacto)
CREATE POLICY "Anyone can insert messages"
  ON messages
  FOR INSERT
  WITH CHECK (true);

-- Solo el admin puede eliminar mensajes
CREATE POLICY "Admin can delete messages"
  ON messages
  FOR DELETE
  USING (auth.role() = 'authenticated');
```

### 4.3 Política para site_config

```sql
-- Lectura pública de configuración
CREATE POLICY "Public read access for site config"
  ON site_config
  FOR SELECT
  USING (true);

-- Solo el admin puede actualizar configuración
CREATE POLICY "Admin can update config"
  ON site_config
  FOR UPDATE
  USING (auth.role() = 'authenticated');
```

### 4.4 Política para analytics

```sql
-- Solo el admin puede leer analytics
CREATE POLICY "Admin can read analytics"
  ON analytics
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Cualquiera puede insertar registros de analytics
CREATE POLICY "Anyone can insert analytics"
  ON analytics
  FOR INSERT
  WITH CHECK (true);
```

### 4.5 Habilitar RLS

```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;
```

---

## 5. Tipos TypeScript

### 5.1 Tipos del Modelo de Datos

```typescript
// src/types/project.ts
export interface Project {
  id: string
  title: string
  description: string
  short_description: string
  technologies: string[]
  category: 'web' | 'mobile' | 'backend' | 'fullstack'
  repo_url: string | null
  demo_url: string | null
  image_url: string | null
  featured: boolean
  published: boolean
  order: number
  created_at: string
  updated_at: string
}

export type ProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>
```

```typescript
// src/types/message.ts
export interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

export type MessageInput = Omit<Message, 'id' | 'is_read' | 'created_at'>
```

```typescript
// src/types/config.ts
export interface SiteConfig {
  id: string
  key: string
  value: HeroConfig | SocialConfig | SeoConfig
  updated_at: string
}

export interface HeroConfig {
  name: string
  title: string
  tagline: string
  technologies: string[]
}

export interface SocialConfig {
  github: string | null
  linkedin: string | null
  email: string
}

export interface SeoConfig {
  title: string
  description: string
  keywords: string[]
}
```

```typescript
// src/types/analytics.ts
export interface AnalyticsEvent {
  id: string
  page: string
  ip_hash: string
  user_agent: string | null
  referrer: string | null
  country: string | null
  created_at: string
}

export interface SiteStats {
  id: string
  total_visits: number
  unique_visitors: number
  last_updated: string
}
```

---

## 6. Servicios de Acceso a Datos

### 6.1 Servicio de Proyectos

```typescript
// src/services/supabase/projects.ts
import { supabase } from './client'
import { Project, ProjectInput } from '@types/project'

export const projectsService = {
  // Obtener proyectos públicos
  async getPublished(featured?: boolean): Promise<Project[]> {
    let query = supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('order', { ascending: true })

    if (featured) {
      query = query.eq('featured', true)
    }

    const { data, error } = await query

    if (error) throw error
    return data || []
  },

  // Obtener proyecto por ID
  async getById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Admin: Obtener todos los proyectos
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Admin: Crear proyecto
  async create(project: ProjectInput): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Admin: Actualizar proyecto
  async update(id: string, project: Partial<ProjectInput>): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update(project)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Admin: Eliminar proyecto
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}
```

### 6.2 Servicio de Mensajes

```typescript
// src/services/supabase/messages.ts
import { supabase } from './client'
import { Message, MessageInput } from '@types/message'

export const messagesService = {
  // Enviar mensaje (público)
  async send(message: MessageInput): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .insert(message)

    if (error) throw error
  },

  // Admin: Obtener todos los mensajes
  async getAll(): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Admin: Marcar como leído
  async markAsRead(id: string): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('id', id)

    if (error) throw error
  },

  // Admin: Eliminar mensaje
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}
```

### 6.3 Servicio de Configuración

```typescript
// src/services/supabase/config.ts
import { supabase } from './client'
import { SiteConfig, HeroConfig, SocialConfig, SeoConfig } from '@types/config'

export const configService = {
  // Obtener configuración por key
  async get<T>(key: string): Promise<T | null> {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', key)
      .single()

    if (error) throw error
    return data?.value as T || null
  },

  // Obtener hero config
  async getHero(): Promise<HeroConfig | null> {
    return this.get<HeroConfig>('hero')
  },

  // Obtener social config
  async getSocial(): Promise<SocialConfig | null> {
    return this.get<SocialConfig>('social')
  },

  // Obtener SEO config
  async getSeo(): Promise<SeoConfig | null> {
    return this.get<SeoConfig>('seo')
  },

  // Admin: Actualizar configuración
  async update<T>(key: string, value: T): Promise<void> {
    const { error } = await supabase
      .from('site_config')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('key', key)

    if (error) throw error
  },
}
```

---

## 7. Almacenamiento (Storage)

### 7.1 Buckets de Supabase Storage

| Bucket | Propósito | Acceso |
|:-------|:----------|:-------|
| `project-images` | Imágenes de proyectos | Público (lectura), Admin (escritura) |
| `cv-files` | Archivos CV para descarga | Público (lectura), Admin (escritura) |
| `avatars` | Avatar del admin | Público (lectura), Admin (escritura) |

### 7.2 Políticas de Storage

```sql
-- Bucket: project-images
-- Lectura pública
CREATE POLICY "Public read access"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'project-images');

-- Solo admin puede subir
CREATE POLICY "Admin upload access"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'project-images'
    AND auth.role() = 'authenticated'
  );

-- Solo admin puede eliminar
CREATE POLICY "Admin delete access"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'project-images'
    AND auth.role() = 'authenticated'
  );
```

### 7.3 Estructura de Archivos en Storage

```
storage/
├── project-images/
│   ├── {project-id}/
│   │   ├── main.webp          # Imagen principal
│   │   ├── screenshot-1.webp  # Screenshots
│   │   └── screenshot-2.webp
│
├── cv-files/
│   ├── CV-Victor-Arevalo-2026.pdf
│   └── CV-Victor-Arevalo-2026-EN.pdf
│
└── avatars/
    └── profile.webp
```

---

## 8. Migraciones

### 8.1 Estrategia de Migraciones

Para Supabase, se recomienda usar las migraciones SQL incluidas:

```
supabase/
├── migrations/
│   ├── 20260906000001_create_projects.sql
│   ├── 20260906000002_create_messages.sql
│   ├── 20260906000003_create_site_config.sql
│   ├── 20260906000004_create_analytics.sql
│   ├── 20260906000005_create_site_stats.sql
│   ├── 20260906000006_enable_rls.sql
│   └── 20260906000007_create_policies.sql
└── seed.sql
```

### 8.2 Ejemplo de Migración

```sql
-- supabase/migrations/20260906000001_create_projects.sql
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  short_description VARCHAR(500) NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  category VARCHAR(50) NOT NULL 
    CHECK (category IN ('web', 'mobile', 'backend', 'fullstack')),
  repo_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_published ON projects(published);
CREATE INDEX idx_projects_featured ON projects(featured);
```

---

## 9. Backup y Recuperación

### 9.1 Estrategia de Backup

| Tipo | Frecuencia | Retención | Método |
|:-----|:-----------|:----------|:-------|
| **Automático** | Diario | 7 días | Supabase (incluido) |
| **Manual** | Semanal | 30 días | pg_dump |
| **Full Backup** | Mensual | 1 año | Supabase Dashboard |

### 9.2 Procedimiento de Recuperación

1. **Pérdida de datos menor:** Restaurar desde backup automático
2. **Pérdida de datos mayor:** Restaurar desde backup manual
3. **Desastre completo:** Recrear proyecto + restaurar último backup

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*
