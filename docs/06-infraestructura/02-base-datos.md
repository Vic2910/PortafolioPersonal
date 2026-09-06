# Base de Datos

> **Propósito:** Documentar la configuración de la base de datos, esquemas, tablas y políticas de seguridad.

---

## 1. Proveedor

| Campo | Valor |
|:------|:------|
| **Proveedor** | Supabase |
| **Motor** | PostgreSQL 15 |
| **Plan** | Free Tier |
| **Región** | US East (Virginia) |
| **URL Dashboard** | https://supabase.com/dashboard |

---

## 2. Esquema de Base de Datos

### 2.1 Diagrama ER

```
┌─────────────────────────────────────────────────────────────┐
│                    ESQUEMA PORTAFOLIO                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐       ┌──────────────┐                   │
│  │   projects   │       │   messages   │                   │
│  │──────────────│       │──────────────│                   │
│  │ id (PK)      │       │ id (PK)      │                   │
│  │ name         │       │ name         │                   │
│  │ slug         │       │ email        │                   │
│  │ description  │       │ subject      │                   │
│  │ short_desc   │       │ message      │                   │
│  │ technologies │       │ created_at   │                   │
│  │ image_url    │       │ read         │                   │
│  │ repo_url     │       └──────────────┘                   │
│  │ demo_url     │                                          │
│  │ featured     │       ┌──────────────┐                   │
│  │ order        │       │ admin_users  │                   │
│  │ created_at   │       │──────────────│                   │
│  │ updated_at   │       │ id (PK)      │                   │
│  └──────────────┘       │ email        │                   │
│                         │ role         │                   │
│                         │ created_at   │                   │
│                         └──────────────┘                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Tablas

### 3.1 Tabla: `projects`

Almacena los proyectos del portafolio.

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_desc VARCHAR(500),
  technologies JSONB DEFAULT '[]',
  image_url TEXT,
  repo_url TEXT,
  demo_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

| Campo | Tipo | Descripción |
|:------|:-----|:------------|
| `id` | UUID | Identificador único |
| `name` | VARCHAR(255) | Nombre del proyecto |
| `slug` | VARCHAR(255) | URL amigable (único) |
| `description` | TEXT | Descripción completa |
| `short_desc` | VARCHAR(500) | Descripción corta |
| `technologies` | JSONB | Array de tecnologías |
| `image_url` | TEXT | URL de imagen |
| `repo_url` | TEXT | URL del repositorio |
| `demo_url` | TEXT | URL de demo |
| `featured` | BOOLEAN | Si es destacado |
| `order_index` | INTEGER | Orden de visualización |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Última actualización |

### 3.2 Tabla: `messages`

Almacena mensajes del formulario de contacto.

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT false
);
```

| Campo | Tipo | Descripción |
|:------|:-----|:------------|
| `id` | UUID | Identificador único |
| `name` | VARCHAR(255) | Nombre del remitente |
| `email` | VARCHAR(255) | Email del remitente |
| `subject` | VARCHAR(500) | Asunto del mensaje |
| `message` | TEXT | Contenido del mensaje |
| `created_at` | TIMESTAMP | Fecha de envío |
| `read` | BOOLEAN | Si fue leído |

### 3.3 Tabla: `admin_users`

Almacena usuarios administradores.

```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

| Campo | Tipo | Descripción |
|:------|:-----|:------------|
| `id` | UUID | Referencia a auth.users |
| `email` | VARCHAR(255) | Email del admin |
| `role` | VARCHAR(50) | Rol (admin/editor) |
| `created_at` | TIMESTAMP | Fecha de creación |

---

## 4. Índices

```sql
-- Projects
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_order ON projects(order_index);

-- Messages
CREATE INDEX idx_messages_created ON messages(created_at DESC);
CREATE INDEX idx_messages_read ON messages(read);
```

---

## 5. Row Level Security (RLS)

### 5.1 Política para `projects`

```sql
-- Lectura pública
CREATE POLICY "projects_select_public" ON projects
  FOR SELECT USING (true);

-- Escritura solo admin
CREATE POLICY "projects_insert_admin" ON projects
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "projects_update_admin" ON projects
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "projects_delete_admin" ON projects
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
    )
  );
```

### 5.2 Política para `messages`

```sql
-- Lectura solo admin
CREATE POLICY "messages_select_admin" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
    )
  );

-- Inserción pública (formulario de contacto)
CREATE POLICY "messages_insert_public" ON messages
  FOR INSERT WITH CHECK (true);

-- Update solo admin
CREATE POLICY "messages_update_admin" ON messages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
    )
  );
```

### 5.3 Política para `admin_users`

```sql
-- Lectura solo admin
CREATE POLICY "admin_users_select_admin" ON admin_users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
    )
  );

-- Solo super admin puede insertar
CREATE POLICY "admin_users_insert_superadmin" ON admin_users
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND role = 'superadmin'
    )
  );
```

---

## 6. Functions y Triggers

### 6.1 Función: Actualizar `updated_at`

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para projects
CREATE TRIGGER trigger_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

### 6.2 Función: Crear slug automáticamente

```sql
CREATE OR REPLACE FUNCTION generate_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := LOWER(REPLACE(NEW.name, ' ', '-'));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para projects
CREATE TRIGGER trigger_projects_slug
  BEFORE INSERT OR UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION generate_slug();
```

---

## 7. Datos Iniciales (Seed)

```sql
-- Insertar usuario admin
INSERT INTO admin_users (id, email, role)
VALUES (
  'uuid-del-usuario-auth',
  'victorarevalosierra@gmail.com',
  'superadmin'
);

-- Insertar proyectos de ejemplo
INSERT INTO projects (name, description, technologies, featured)
VALUES
  ('Nexo-Ferretero', 'Dashboard de ventas para e-commerce', '["ASP.NET", "Razor", "SQL Server"]', true),
  ('E-commerce Spring', 'Plataforma de comercio electrónico', '["Spring Boot", "Angular", "MySQL"]', true),
  ('API Documentada', 'API REST con documentación Swagger', '["Next.js"]', false);
```

---

## 8. Mantenimiento

### 8.1 Tareas de Mantenimiento

| Tarea | Frecuencia | Responsable |
|:------|:-----------|:------------|
| **Verificar backups** | Semanal | Automático |
| **Revisar tamaño** | Mensual | Manual |
| **Limpiar mensajes viejos** | Mensual | Manual |
| **Actualizar índices** | Trimestral | Automático |

### 8.2 Monitoreo

| Métrica | Umbral de Alerta |
|:--------|:-----------------|
| **Tamaño de BD** | > 400 MB (80% del límite) |
| **Conexiones activas** | > 50 |
| **Queries lentas** | > 1s |
| **Errores de conexión** | > 10/hora |

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*