# ARQ-07: Panel de Administración

> **Propósito:** Definir la arquitectura del panel de administración CRUD, incluyendo autenticación, gestión de proyectos, mensajes, configuración y métricas.

---

## 1. Visión General del Admin Panel

El panel de administración permite al desarrollador gestionar todo el contenido del portafolio de forma visual, sin necesidad de modificar código. Está protegido por autenticación JWT y solo accesible para el administrador.

### 1.1 Funcionalidades

| Módulo | Funcionalidades | Prioridad |
|:-------|:----------------|:----------|
| **Dashboard** | Métricas resumen, accesos rápidos | Alta |
| **Proyectos** | CRUD completo, orden, featured | Alta |
| **Mensajes** | Ver, marcar leído, eliminar | Alta |
| **Configuración** | Hero, social, SEO | Media |
| **Analytics** | Visitas, páginas populares | Media |
| **Archivos** | Subir imágenes, CV | Media |

---

## 2. Autenticación

### 2.1 Flujo de Login

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     Admin       │     │    React        │     │   Supabase      │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         │  1. Acceder a /admin  │                       │
         │──────────────────────>│                       │
         │                       │                       │
         │  2. Redirect a login  │                       │
         │<──────────────────────│                       │
         │                       │                       │
         │  3. Login form        │                       │
         │  (email + password)   │                       │
         │──────────────────────>│                       │
         │                       │                       │
         │                       │  4. signInWithPassword│
         │                       │──────────────────────>│
         │                       │                       │
         │                       │  5. JWT Token         │
         │                       │<──────────────────────│
         │                       │                       │
         │                       │  6. Store session     │
         │                       │                       │
         │  7. Admin Dashboard   │                       │
         │<──────────────────────│                       │
         │                       │                       │
```

### 2.2 Credenciales

```typescript
// Configuración inicial (cambiar después del primer login)
const ADMIN_EMAIL = "victorarevalosierra@gmail.com"
const ADMIN_PASSWORD = "temporal123" // Cambiar en primer login
```

### 2.3 Protección de Rutas

```typescript
// src/components/auth/ProtectedRoute.tsx
import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}
```

---

## 3. Estructura del Panel

### 3.1 Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  ADMIN HEADER                                                    │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Logo    Dashboard  Proyectos  Mensajes  Config    Logout   ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                                                             ││
│  │                    CONTENIDO PRINCIPAL                      ││
│  │                                                             ││
│  │  (Dashboard / ProjectsManager / Messages / Settings)        ││
│  │                                                             ││
│  │                                                             ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Rutas del Admin

| Ruta | Componente | Descripción |
|:-----|:-----------|:------------|
| `/admin` | Dashboard | Panel principal con métricas |
| `/admin/projects` | ProjectsManager | Lista de proyectos |
| `/admin/projects/new` | ProjectForm | Crear proyecto |
| `/admin/projects/:id/edit` | ProjectForm | Editar proyecto |
| `/admin/messages` | Messages | Mensajes de contacto |
| `/admin/settings` | Settings | Configuración del sitio |

---

## 4. Dashboard

### 4.1 Contenido del Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│                    DASHBOARD                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Proyectos   │  │  Mensajes    │  │   Visitas    │         │
│  │     6        │  │     12       │  │    1,234     │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Accesos Rápidos                                            ││
│  │  [+ Nuevo Proyecto]  [Ver Mensajes]  [Configuración]       ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Últimos Mensajes                                           ││
│  │  ┌─────────────────────────────────────────────────────┐   ││
│  │  │ Juan Pérez - juan@email.com - "Interesado en..."   │   ││
│  │  │ María López - maria@email.com - "Hola, me gustaría"│   ││
│  │  └─────────────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Código del Dashboard

```typescript
// src/pages/admin/Dashboard.tsx
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProjects } from '@hooks/useProjects'
import { messagesService } from '@services/supabase/messages'

interface Stats {
  projects: number
  messages: number
  unreadMessages: number
  totalVisits: number
}

export const Dashboard: FC = () => {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    messages: 0,
    unreadMessages: 0,
    totalVisits: 0,
  })
  const [recentMessages, setRecentMessages] = useState([])

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    // Cargar estadísticas
    const projects = await projectsService.getAll()
    const messages = await messagesService.getAll()
    
    setStats({
      projects: projects.length,
      messages: messages.length,
      unreadMessages: messages.filter(m => !m.is_read).length,
      totalVisits: 0, // Obtener de analytics
    })
    
    setRecentMessages(messages.slice(0, 5))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Proyectos"
          value={stats.projects}
          icon="📁"
          link="/admin/projects"
        />
        <StatCard
          title="Mensajes"
          value={stats.messages}
          icon="✉️"
          link="/admin/messages"
          badge={stats.unreadMessages > 0 ? stats.unreadMessages : undefined}
        />
        <StatCard
          title="Visitas"
          value={stats.totalVisits}
          icon="👁️"
        />
      </div>
      
      {/* Accesos rápidos */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Accesos Rápidos</h2>
        <div className="flex gap-4">
          <Link
            to="/admin/projects/new"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg
                       hover:bg-primary-700 transition-colors"
          >
            + Nuevo Proyecto
          </Link>
          <Link
            to="/admin/messages"
            className="px-4 py-2 bg-dark-700 text-dark-200 rounded-lg
                       hover:bg-dark-600 transition-colors"
          >
            Ver Mensajes
          </Link>
          <Link
            to="/admin/settings"
            className="px-4 py-2 bg-dark-700 text-dark-200 rounded-lg
                       hover:bg-dark-600 transition-colors"
          >
            Configuración
          </Link>
        </div>
      </div>
      
      {/* Últimos mensajes */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Últimos Mensajes</h2>
        <div className="bg-dark-800 rounded-lg p-4">
          {recentMessages.map((msg) => (
            <MessageRow key={msg.id} message={msg} />
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

## 5. Gestión de Proyectos (CRUD)

### 5.1 Lista de Proyectos

```typescript
// src/pages/admin/ProjectsManager.tsx
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Project } from '@types/project'
import { projectsService } from '@services/supabase/projects'

export const ProjectsManager: FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    const data = await projectsService.getAll()
    setProjects(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      await projectsService.delete(id)
      await loadProjects()
    }
  }

  async function handleTogglePublished(id: string, published: boolean) {
    await projectsService.update(id, { published: !published })
    await loadProjects()
  }

  async function handleToggleFeatured(id: string, featured: boolean) {
    await projectsService.update(id, { featured: !featured })
    await loadProjects()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Proyectos</h1>
        <Link
          to="/admin/projects/new"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg
                     hover:bg-primary-700 transition-colors"
        >
          + Nuevo Proyecto
        </Link>
      </div>

      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="bg-dark-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-700">
              <tr>
                <th className="px-4 py-3 text-left">Título</th>
                <th className="px-4 py-3 text-left">Categoría</th>
                <th className="px-4 py-3 text-left">Estado</th>
                <th className="px-4 py-3 text-left">Featured</th>
                <th className="px-4 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t border-dark-700">
                  <td className="px-4 py-3">{project.title}</td>
                  <td className="px-4 py-3">{project.category}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleTogglePublished(project.id, project.published)}
                      className={`px-2 py-1 rounded ${
                        project.published 
                          ? 'bg-green-600/20 text-green-400' 
                          : 'bg-red-600/20 text-red-400'
                      }`}
                    >
                      {project.published ? 'Publicado' : 'Borrador'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleFeatured(project.id, project.featured)}
                      className={`px-2 py-1 rounded ${
                        project.featured 
                          ? 'bg-yellow-600/20 text-yellow-400' 
                          : 'bg-dark-600 text-dark-400'
                      }`}
                    >
                      {project.featured ? '⭐ Featured' : 'Normal'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/projects/${project.id}/edit`}
                        className="px-3 py-1 bg-primary-600/20 text-primary-400 
                                   rounded hover:bg-primary-600/30"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-3 py-1 bg-red-600/20 text-red-400 
                                   rounded hover:bg-red-600/30"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
```

### 5.2 Formulario de Proyecto

```typescript
// src/pages/admin/ProjectForm.tsx
import { FC, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ProjectInput } from '@types/project'
import { projectsService } from '@services/supabase/projects'

const projectSchema = z.object({
  title: z.string().min(1, 'Título requerido'),
  description: z.string().min(10, 'Descripción debe tener al menos 10 caracteres'),
  short_description: z.string().min(10, 'Descripción corta requerida'),
  technologies: z.string().min(1, 'Tecnologías requeridas'),
  category: z.enum(['web', 'mobile', 'backend', 'fullstack']),
  repo_url: z.string().url().optional().or(z.literal('')),
  demo_url: z.string().url().optional().or(z.literal('')),
  image_url: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
})

type ProjectFormData = z.infer<typeof projectSchema>

export const ProjectForm: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  })

  useEffect(() => {
    if (isEditing) {
      loadProject()
    }
  }, [id])

  async function loadProject() {
    const project = await projectsService.getById(id!)
    if (project) {
      reset({
        ...project,
        technologies: project.technologies.join(', '),
      })
    }
  }

  async function onSubmit(data: ProjectFormData) {
    const projectData: ProjectInput = {
      ...data,
      technologies: data.technologies.split(',').map(t => t.trim()),
      repo_url: data.repo_url || null,
      demo_url: data.demo_url || null,
      image_url: data.image_url || null,
    }

    if (isEditing) {
      await projectsService.update(id!, projectData)
    } else {
      await projectsService.create(projectData)
    }

    navigate('/admin/projects')
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Título *</label>
          <input
            {...register('title')}
            className="w-full px-4 py-2 bg-dark-700 rounded-lg focus:ring-2 
                       focus:ring-primary-500 outline-none"
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Descripción *</label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-4 py-2 bg-dark-700 rounded-lg focus:ring-2 
                       focus:ring-primary-500 outline-none"
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Descripción Corta *
          </label>
          <textarea
            {...register('short_description')}
            rows={2}
            className="w-full px-4 py-2 bg-dark-700 rounded-lg focus:ring-2 
                       focus:ring-primary-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Tecnologías (separadas por coma) *
          </label>
          <input
            {...register('technologies')}
            placeholder="React, TypeScript, Tailwind CSS"
            className="w-full px-4 py-2 bg-dark-700 rounded-lg focus:ring-2 
                       focus:ring-primary-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Categoría *</label>
          <select
            {...register('category')}
            className="w-full px-4 py-2 bg-dark-700 rounded-lg focus:ring-2 
                       focus:ring-primary-500 outline-none"
          >
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Full Stack</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            URL del Repositorio
          </label>
          <input
            {...register('repo_url')}
            placeholder="https://github.com/..."
            className="w-full px-4 py-2 bg-dark-700 rounded-lg focus:ring-2 
                       focus:ring-primary-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">URL de Demo</label>
          <input
            {...register('demo_url')}
            placeholder="https://..."
            className="w-full px-4 py-2 bg-dark-700 rounded-lg focus:ring-2 
                       focus:ring-primary-500 outline-none"
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('featured')}
              className="w-4 h-4 rounded bg-dark-700"
            />
            <span>Featured</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('published')}
              className="w-4 h-4 rounded bg-dark-700"
            />
            <span>Publicado</span>
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg
                       hover:bg-primary-700 transition-colors"
          >
            {isEditing ? 'Guardar Cambios' : 'Crear Proyecto'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-6 py-2 bg-dark-700 text-dark-200 rounded-lg
                       hover:bg-dark-600 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
```

---

## 6. Gestión de Mensajes

### 6.1 Lista de Mensajes

```typescript
// src/pages/admin/Messages.tsx
import { FC, useEffect, useState } from 'react'
import { Message } from '@types/message'
import { messagesService } from '@services/supabase/messages'

export const Messages: FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    loadMessages()
  }, [])

  async function loadMessages() {
    const data = await messagesService.getAll()
    setMessages(data)
    setLoading(false)
  }

  async function handleMarkAsRead(id: string) {
    await messagesService.markAsRead(id)
    await loadMessages()
  }

  async function handleDelete(id: string) {
    if (confirm('¿Eliminar este mensaje?')) {
      await messagesService.delete(id)
      await loadMessages()
      setSelectedMessage(null)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mensajes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de mensajes */}
        <div className="lg:col-span-1 bg-dark-800 rounded-lg p-4">
          {loading ? (
            <div>Cargando...</div>
          ) : (
            <div className="space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg)
                    if (!msg.is_read) handleMarkAsRead(msg.id)
                  }}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedMessage?.id === msg.id
                      ? 'bg-primary-600/20 border border-primary-500'
                      : 'bg-dark-700 hover:bg-dark-600'
                  } ${!msg.is_read ? 'border-l-4 border-primary-500' : ''}`}
                >
                  <div className="font-medium">{msg.name}</div>
                  <div className="text-sm text-dark-400">{msg.email}</div>
                  <div className="text-sm text-dark-300 truncate">{msg.subject}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detalle del mensaje */}
        <div className="lg:col-span-2 bg-dark-800 rounded-lg p-6">
          {selectedMessage ? (
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{selectedMessage.subject}</h2>
                  <p className="text-dark-400">
                    De: {selectedMessage.name} ({selectedMessage.email})
                  </p>
                  <p className="text-dark-500 text-sm">
                    {new Date(selectedMessage.created_at).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="px-3 py-1 bg-red-600/20 text-red-400 
                             rounded hover:bg-red-600/30"
                >
                  Eliminar
                </button>
              </div>
              <div className="bg-dark-700 rounded-lg p-4 whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
              <div className="mt-4 flex gap-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg
                             hover:bg-primary-700 transition-colors"
                >
                  Responder por Email
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center text-dark-400 py-12">
              Selecciona un mensaje para verlo
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

---

## 7. Configuración del Sitio

### 7.1 Formulario de Configuración

```typescript
// src/pages/admin/Settings.tsx
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { configService } from '@services/supabase/config'
import { HeroConfig, SocialConfig, SeoConfig } from '@types/config'

export const Settings: FC = () => {
  const [activeTab, setActiveTab] = useState<'hero' | 'social' | 'seo'>('hero')
  const [loading, setLoading] = useState(true)

  // Hero form
  const heroForm = useForm<HeroConfig>()
  // Social form
  const socialForm = useForm<SocialConfig>()
  // SEO form
  const seoForm = useForm<SeoConfig>()

  useEffect(() => {
    loadConfig()
  }, [])

  async function loadConfig() {
    const hero = await configService.getHero()
    const social = await configService.getSocial()
    const seo = await configService.getSeo()

    if (hero) heroForm.reset(hero)
    if (social) socialForm.reset(social)
    if (seo) seoForm.reset(seo)

    setLoading(false)
  }

  async function saveHero(data: HeroConfig) {
    await configService.update('hero', data)
    alert('Configuración hero guardada')
  }

  async function saveSocial(data: SocialConfig) {
    await configService.update('social', data)
    alert('Configuración social guardada')
  }

  async function saveSeo(data: SeoConfig) {
    await configService.update('seo', data)
    alert('Configuración SEO guardada')
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Configuración del Sitio</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('hero')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'hero' ? 'bg-primary-600 text-white' : 'bg-dark-700'
          }`}
        >
          Hero Section
        </button>
        <button
          onClick={() => setActiveTab('social')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'social' ? 'bg-primary-600 text-white' : 'bg-dark-700'
          }`}
        >
          Redes Sociales
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'seo' ? 'bg-primary-600 text-white' : 'bg-dark-700'
          }`}
        >
          SEO
        </button>
      </div>

      {/* Hero Config */}
      {activeTab === 'hero' && (
        <form onSubmit={heroForm.handleSubmit(saveHero)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input
              {...heroForm.register('name')}
              className="w-full px-4 py-2 bg-dark-700 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Título</label>
            <input
              {...heroForm.register('title')}
              className="w-full px-4 py-2 bg-dark-700 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tagline</label>
            <textarea
              {...heroForm.register('tagline')}
              rows={2}
              className="w-full px-4 py-2 bg-dark-700 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg
                       hover:bg-primary-700 transition-colors"
          >
            Guardar
          </button>
        </form>
      )}

      {/* Social Config */}
      {activeTab === 'social' && (
        <form onSubmit={socialForm.handleSubmit(saveSocial)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">GitHub URL</label>
            <input
              {...socialForm.register('github')}
              className="w-full px-4 py-2 bg-dark-700 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
            <input
              {...socialForm.register('linkedin')}
              className="w-full px-4 py-2 bg-dark-700 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              {...socialForm.register('email')}
              className="w-full px-4 py-2 bg-dark-700 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg
                       hover:bg-primary-700 transition-colors"
          >
            Guardar
          </button>
        </form>
      )}

      {/* SEO Config */}
      {activeTab === 'seo' && (
        <form onSubmit={seoForm.handleSubmit(saveSeo)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Título SEO</label>
            <input
              {...seoForm.register('title')}
              className="w-full px-4 py-2 bg-dark-700 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Descripción SEO</label>
            <textarea
              {...seoForm.register('description')}
              rows={3}
              className="w-full px-4 py-2 bg-dark-700 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg
                       hover:bg-primary-700 transition-colors"
          >
            Guardar
          </button>
        </form>
      )}
    </div>
  )
}
```

---

## 8. Subida de Archivos

### 8.1 Componente de Upload

```typescript
// src/components/ui/FileUpload.tsx
import { FC, useState } from 'react'
import { supabase } from '@services/supabase/client'

interface FileUploadProps {
  bucket: string
  path: string
  onUpload: (url: string) => void
}

export const FileUpload: FC<FileUploadProps> = ({ bucket, path, onUpload }) => {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      setProgress(0)

      const fileName = `${path}/${Date.now()}-${file.name}`

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

      onUpload(publicUrl)
      setProgress(100)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Error al subir archivo')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        onChange={handleUpload}
        disabled={uploading}
        className="block w-full text-sm text-dark-300
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-lg file:border-0
                   file:text-sm file:font-semibold
                   file:bg-primary-600 file:text-white
                   hover:file:bg-primary-700"
      />
      {uploading && (
        <div className="mt-2">
          <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## 9. Diseño del Panel

### 9.1 Paleta de Colores

| Elemento | Color |
|:---------|:------|
| Background | Dark-900 (#0f172a) |
| Sidebar | Dark-800 (#1e293b) |
| Cards | Dark-700 (#334155) |
| Texto primario | Dark-100 (#f1f5f9) |
| Texto secundario | Dark-400 (#94a3b8) |
| Acento | Primary-500 (#3b82f6) |
| Éxito | Green-500 (#22c55e) |
| Error | Red-500 (#ef4444) |

### 9.2 Componentes UI

```typescript
// src/components/admin/StatCard.tsx
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface StatCardProps {
  title: string
  value: number
  icon: string
  link?: string
  badge?: number
}

export const StatCard: FC<StatCardProps> = ({ title, value, icon, link, badge }) => {
  const Content = (
    <div className="bg-dark-800 rounded-lg p-6 relative">
      {badge && (
        <span className="absolute top-2 right-2 px-2 py-1 bg-primary-600 
                         text-white text-xs rounded-full">
          {badge}
        </span>
      )}
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-dark-400">{title}</div>
    </div>
  )

  if (link) {
    return <Link to={link}>{Content}</Link>
  }

  return Content
}
```

---

## 10. Checklist del Admin Panel

### Funcionalidades
- [ ] Login funcional con Supabase Auth
- [ ] Dashboard con estadísticas
- [ ] CRUD de proyectos completo
- [ ] Gestión de mensajes
- [ ] Configuración del sitio
- [ ] Subida de archivos

### UX/UI
- [ ] Diseño responsive
- [ ] Navegación intuitiva
- [ ] Feedback visual en acciones
- [ ] Estados de carga
- [ ] Mensajes de error claros

### Seguridad
- [ ] Autenticación requerida
- [ ] RLS habilitado
- [ ] Rate limiting activo
- [ ] Input validation

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*
