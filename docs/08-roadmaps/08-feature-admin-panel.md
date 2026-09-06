# Feature: Admin Panel

> **ID:** F-08 | **Prioridad:** Media | **Dependencias:** F-01, F-09 | **Historia:** HU-Admin

---

## 1. Objetivo

Implementar un panel de administración protegido que permita gestionar proyectos, mensajes y contenido del portafolio.

---

## 2. Dependencias

| Tipo | Servicio/Herramienta |
|:-----|:---------------------|
| **Feature anterior** | F-09: Auth Admin |
| **Base de datos** | Supabase |
| **Rutas** | React Router protegidas |

---

## 3. Prerrequisitos

- [ ] F-09 completado (autenticación)
- [ ] Tablas de Supabase configuradas
- [ ] RLS policies para admin

---

## 4. Implementación

### Paso 1: Crear Layout del Admin

**Crear src/components/admin/AdminLayout.tsx:**
```typescript
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function AdminLayout() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="px-4">
          <a href="/admin" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            Dashboard
          </a>
          <a href="/admin/projects" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            Proyectos
          </a>
          <a href="/admin/messages" className="block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            Mensajes
          </a>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  )
}
```

### Paso 2: Crear Página del Dashboard

**Crear src/pages/admin/Dashboard.tsx:**
```typescript
import { useEffect, useState } from 'react'
import { supabase } from '@/config/supabase'

export function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    unreadMessages: 0,
  })

  useEffect(() => {
    async function fetchStats() {
      const [projects, messages, unread] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('messages').select('id', { count: 'exact', head: true }),
        supabase.from('messages').select('id', { count: 'exact', head: true }).eq('read', false),
      ])

      setStats({
        projects: projects.count || 0,
        messages: messages.count || 0,
        unreadMessages: unread.count || 0,
      })
    }
    fetchStats()
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-gray-400 text-sm">Proyectos</h3>
          <p className="text-3xl font-bold">{stats.projects}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-gray-400 text-sm">Mensajes Totales</h3>
          <p className="text-3xl font-bold">{stats.messages}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-gray-400 text-sm">Mensajes No Leídos</h3>
          <p className="text-3xl font-bold text-yellow-400">{stats.unreadMessages}</p>
        </div>
      </div>
    </div>
  )
}
```

### Paso 3: Crear CRUD de Proyectos

**Crear src/pages/admin/ProjectsAdmin.tsx:**
```typescript
import { useEffect, useState } from 'react'
import { supabase } from '@/config/supabase'
import type { Project } from '@/types'

export function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('order_index')
    setProjects(data || [])
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este proyecto?')) return
    await supabase.from('projects').delete().eq('id', id)
    fetchProjects()
  }

  if (loading) return <div>Cargando...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Proyectos</h2>
        <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
          + Nuevo Proyecto
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Nombre</th>
              <th className="px-6 py-3 text-left">Tecnologías</th>
              <th className="px-6 py-3 text-left">Destacado</th>
              <th className="px-6 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-gray-700">
                <td className="px-6 py-4">{project.name}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="bg-gray-700 text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {project.featured ? '⭐' : '-'}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-400 hover:text-blue-300 mr-3">Editar</button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

### Paso 4: Configurar Rutas

**Actualizar src/App.tsx:**
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AdminLayout } from './components/admin/AdminLayout'
import { Dashboard } from './pages/admin/Dashboard'
import { ProjectsAdmin } from './pages/admin/ProjectsAdmin'
import { Login } from './pages/admin/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<div>Home</div>} />
        
        {/* Rutas admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ProjectsAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

### Paso 5: Commit

**Comando:**
```bash
git add .
git commit -m "feat: implement admin panel with protected routes"
git push origin main
```

---

## 5. Verificación

- [ ] Login funciona correctamente
- [ ] Dashboard muestra estadísticas
- [ ] Lista de proyectos se carga
- [ ] Eliminar proyecto funciona
- [ ] Rutas protegidas redirigen a login
- [ ] Responsive en desktop

---

## 6. Troubleshooting

| Problema | Causa | Solución |
|:---------|:------|:---------|
| Login no funciona | Auth no configurado | Verificar F-09 |
| Datos no cargan | RLS bloquea | Verificar políticas admin |
| Ruta no existe | Router mal configurado | Verificar rutas |

---

## 7. Recursos

- [React Router Nested Routes](https://reactrouter.com/en/main/start/concepts#layout-routes)
- [Supabase Auth](https://supabase.com/docs/guides/auth)

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*