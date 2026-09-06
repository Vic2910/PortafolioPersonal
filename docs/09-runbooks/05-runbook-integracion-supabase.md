# Runbook: Integración con Supabase

> **ID:** RB-05 | **Audiencia:** Desarrolladores | **Frecuencia:** Según necesidad

---

## 1. Propósito

Configurar y usar Supabase para base de datos, autenticación y storage.

---

## 2. Procedimiento

### Configurar Supabase

**1. Crear cuenta en supabase.com**

**2. Crear nuevo proyecto:**
- Nombre: `portafolio-vras`
- Region: US East
- Password: (guardar seguro)

**3. Obtener credenciales:**
```
Settings → API → Project URL
Settings → API → anon public key
Settings → API → service_role key
```

**4. Configurar variables de entorno:**
```bash
# .env.local
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

### Crear Tablas

**En SQL Editor de Supabase:**

```sql
-- Tabla de proyectos
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de mensajes
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT false
);

-- Habilitar RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Políticas públicas
CREATE POLICY "projects_select_public" ON projects FOR SELECT USING (true);
CREATE POLICY "messages_insert_public" ON messages FOR INSERT WITH CHECK (true);
```

### Usar en Código

**Configurar cliente:**
```typescript
// src/config/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

**Consultar datos:**
```typescript
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .order('order_index')
```

**Insertar datos:**
```typescript
const { error } = await supabase
  .from('messages')
  .insert([{ name, email, subject, message }])
```

---

## 3. Verificación

- [ ] Proyecto creado en Supabase
- [ ] Credenciales configuradas
- [ ] Tablas creadas
- [ ] Políticas RLS configuradas
- [ ] Consultas funcionan

---

## 4. Troubleshooting

### Problema: "Row Level Security" error

**Solución:** Verificar políticas RLS en Supabase Dashboard

### Problema: CORS error

**Solución:** Verificar URL del proyecto en Supabase Settings → API

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*