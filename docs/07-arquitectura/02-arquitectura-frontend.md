# ARQ-02: Arquitectura Frontend

> **Propósito:** Definir la arquitectura de la capa de presentación, incluyendo estructura de componentes, routing, gestión de estado, estilos y optimización de rendimiento.

---

## 1. Visión General del Frontend

El frontend de PortafolioVRAS es una aplicación **Single Page Application (SPA)** construida con React y Vite, que se enfoca en:
- Experiencia de usuario fluida y rápida
- Accesibilidad WCAG 2.2 AA
- Diseño responsive mobile-first
- Rendimiento óptimo (Core Web Vitals)

---

## 2. Estructura del Proyecto

### 2.1 Árbol de Directorios

```
src/
├── components/                    # Componentes reutilizables
│   ├── ui/                        # Componentes base de UI
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   └── index.ts
│   ├── layout/                    # Componentes de layout
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   ├── MobileMenu.tsx
│   │   └── Layout.tsx
│   └── sections/                  # Secciones de página
│       ├── Hero.tsx
│       ├── Projects.tsx
│       ├── ProjectCard.tsx
│       ├── Skills.tsx
│       ├── About.tsx
│       ├── Contact.tsx
│       └── index.ts
├── pages/                         # Páginas/rutas
│   ├── Home.tsx
│   ├── Projects.tsx
│   ├── ProjectDetail.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── admin/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ProjectsManager.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── Messages.tsx
│   │   └── Settings.tsx
│   └── NotFound.tsx
├── hooks/                         # Custom hooks
│   ├── useSupabase.ts
│   ├── useProjects.ts
│   ├── useContact.ts
│   ├── useAuth.ts
│   ├── useIntersectionObserver.ts
│   └── index.ts
├── services/                      # Servicios de comunicación
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── projects.ts
│   │   ├── messages.ts
│   │   ├── analytics.ts
│   │   └── auth.ts
│   └── api/
│       ├── contact.ts
│       └── health.ts
├── utils/                         # Utilidades
│   ├── formatters.ts
│   ├── validators.ts
│   ├── constants.ts
│   ├── helpers.ts
│   └── index.ts
├── styles/                        # Estilos
│   ├── globals.css
│   ├── tailwind.css
│   └── animations.css
├── types/                         # TypeScript types
│   ├── project.ts
│   ├── message.ts
│   ├── user.ts
│   ├── api.ts
│   └── index.ts
├── data/                          # Contenido estático (fallback)
│   ├── projects.json
│   ├── skills.json
│   └── personal-info.json
├── assets/                        # Assets estáticos
│   ├── images/
│   ├── icons/
│   └── fonts/
├── App.tsx                        # Componente raíz
├── main.tsx                       # Entry point
├── vite-env.d.ts                  # Vite types
└── index.html                     # HTML entry
```

---

## 3. Configuración de Herramientas

### 3.1 Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
})
```

### 3.2 TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@pages/*": ["./src/pages/*"],
      "@services/*": ["./src/services/*"],
      "@utils/*": ["./src/utils/*"],
      "@types/*": ["./src/types/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@assets/*": ["./src/assets/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 3.3 Tailwind Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
```

---

## 4. Componentes Principales

### 4.1 Árbol de Componentes

```
<App>
├── <Layout>
│   ├── <Header>
│   │   ├── <Logo />
│   │   ├── <Navigation>
│   │   │   ├── <NavLink to="/">Inicio</NavLink>
│   │   │   ├── <NavLink to="/projects">Proyectos</NavLink>
│   │   │   ├── <NavLink to="/about">Sobre Mí</NavLink>
│   │   │   └── <NavLink to="/contact">Contacto</NavLink>
│   │   └── <MobileMenu />
│   │
│   ├── <Outlet />  ← React Router
│   │   ├── <Home>
│   │   │   ├── <Hero />
│   │   │   ├── <Projects featured={true} />
│   │   │   ├── <Skills />
│   │   │   └── <Contact />
│   │   │
│   │   ├── <Projects>
│   │   │   └── <ProjectList />
│   │   │
│   │   ├── <ProjectDetail>
│   │   │   ├── <ProjectHeader />
│   │   │   ├── <ProjectContent />
│   │   │   └── <ProjectGallery />
│   │   │
│   │   ├── <About>
│   │   │   ├── <Bio />
│   │   │   ├── <Experience />
│   │   │   └── <SkillsDetailed />
│   │   │
│   │   └── <Contact>
│   │       └── <ContactForm />
│   │
│   └── <Footer>
│       ├── <SocialLinks />
│       └── <Copyright />
│
└── <AdminLayout>  ← Protegido
    ├── <Sidebar />
    ├── <AdminHeader />
    └── <Outlet />
        ├── <Dashboard />
        ├── <ProjectsManager />
        ├── <ProjectForm />
        ├── <Messages />
        └── <Settings />
```

### 4.2 Ejemplo de Componente

```typescript
// src/components/sections/Hero.tsx
import { FC } from 'react'
import { motion } from 'framer-motion'

interface HeroProps {
  name: string
  title: string
  tagline: string
  technologies: string[]
}

export const Hero: FC<HeroProps> = ({
  name,
  title,
  tagline,
  technologies,
}) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {name}
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-400 mb-6">
            {title}
          </p>
          
          <p className="text-lg text-dark-300 mb-8 max-w-2xl mx-auto">
            {tagline}
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-dark-700 text-dark-200 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/projects"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg
                         hover:bg-primary-700 transition-colors font-medium"
            >
              Ver Proyectos
            </a>
            <a
              href="/contact"
              className="px-8 py-3 border border-primary-600 text-primary-400
                         rounded-lg hover:bg-primary-600/10 transition-colors font-medium"
            >
              Contactar
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## 5. Routing

### 5.1 Configuración de Rutas

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { AdminLayout } from './components/layout/AdminLayout'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

// Pages
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { ProjectDetail } from './pages/ProjectDetail'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'

// Admin Pages
import { Login } from './pages/admin/Login'
import { Dashboard } from './pages/admin/Dashboard'
import { ProjectsManager } from './pages/admin/ProjectsManager'
import { ProjectForm } from './pages/admin/ProjectForm'
import { Messages } from './pages/admin/Messages'
import { Settings } from './pages/admin/Settings'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/:id/edit" element={<ProjectForm />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### 5.2 Tabla de Rutas

| Ruta | Componente | Descripción | Acceso |
|:-----|:-----------|:------------|:-------|
| `/` | Home | Página principal con Hero, proyectos destacados | Público |
| `/projects` | Projects | Lista completa de proyectos | Público |
| `/projects/:id` | ProjectDetail | Detalle de un proyecto | Público |
| `/about` | About | Biografía y habilidades | Público |
| `/contact` | Contact | Formulario de contacto | Público |
| `/admin/login` | Login | Inicio de sesión admin | Público |
| `/admin` | Dashboard | Panel de control | Protegido |
| `/admin/projects` | ProjectsManager | CRUD de proyectos | Protegido |
| `/admin/projects/new` | ProjectForm | Crear proyecto | Protegido |
| `/admin/projects/:id/edit` | ProjectForm | Editar proyecto | Protegido |
| `/admin/messages` | Messages | Ver mensajes | Protegido |
| `/admin/settings` | Settings | Configuración | Protegido |

---

## 6. Gestión de Estado

### 6.1 Estrategia de Estado

| Tipo | Solución | Ejemplo |
|:-----|:---------|:--------|
| **Estado global de UI** | React Context | Theme, sidebar open/closed |
| **Datos del servidor** | Supabase Realtime + Cache | Proyectos, mensajes |
| **Estado de formulario** | Local state (useState) | Form inputs |
| **Estado de autenticación** | Supabase Auth + Context | User session |
| **Estado de routing** | React Router | Current route, params |

### 6.2 Context de Autenticación

```typescript
// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState, FC, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@services/supabase/client'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

---

## 7. Custom Hooks

### 7.1 Hook de Proyectos

```typescript
// src/hooks/useProjects.ts
import { useState, useEffect } from 'react'
import { Project } from '@types/project'
import { supabase } from '@services/supabase/client'

interface UseProjectsOptions {
  featured?: boolean
  limit?: number
}

export function useProjects(options: UseProjectsOptions = {}) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [options.featured, options.limit])

  async function fetchProjects() {
    try {
      setLoading(true)
      
      let query = supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (options.featured) {
        query = query.eq('featured', true)
      }

      if (options.limit) {
        query = query.limit(options.limit)
      }

      const { data, error: supabaseError } = await query

      if (supabaseError) {
        throw supabaseError
      }

      setProjects(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching projects')
    } finally {
      setLoading(false)
    }
  }

  return { projects, loading, error, refetch: fetchProjects }
}
```

### 7.2 Hook de Formulario de Contacto

```typescript
// src/hooks/useContact.ts
import { useState } from 'react'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  honeypot?: string  // Campo oculto anti-spam
}

interface UseContactReturn {
  submit: (data: ContactFormData) => Promise<void>
  loading: boolean
  error: string | null
  success: boolean
}

export function useContact(): UseContactReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submit = async (data: ContactFormData) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      // Verificar honeypot
      if (data.honeypot) {
        // Bot detectado, silently fail
        setSuccess(true)
        return
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.message || 'Error sending message')
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error sending message')
    } finally {
      setLoading(false)
    }
  }

  return { submit, loading, error, success }
}
```

---

## 8. Estilos y Diseño

### 8.1 Sistema de Diseño

| Elemento | Especificación |
|:---------|:---------------|
| **Grid** | 12 columnas, max-width: 1200px |
| **Breakpoints** | sm: 640px, md: 768px, lg: 1024px, xl: 1280px |
| **Espaciado** | 4px base (1, 2, 3, 4, 5, 6, 8, 10, 12, 16) |
| **Tipografía** | Inter (sans), JetBrains Mono (code) |
| **Colores** | Primary (blue), Dark (slate), Accent (green) |
| **Bordes** | Rounded-md (6px), Rounded-lg (8px) |
| **Sombras** | shadow-sm, shadow-md, shadow-lg |

### 8.2 Proporción de Colores (60-30-10)

```
┌─────────────────────────────────────────────────────────┐
│                    60% - FONDO                           │
│  Dark-900 (#0f172a) - Background principal              │
│  Dark-800 (#1e293b) - Background secundario             │
├─────────────────────────────────────────────────────────┤
│                    30% - CONTENIDO                       │
│  Dark-100 (#f1f5f9) - Texto principal                   │
│  Dark-300 (#cbd5e1) - Texto secundario                  │
│  Dark-500 (#64748b) - Texto muted                       │
├─────────────────────────────────────────────────────────┤
│                    10% - ACENTO                          │
│  Primary-500 (#3b82f6) - Botones, links, highlights     │
│  Primary-400 (#60a5fa) - Hover states                   │
│  Primary-600 (#2563eb) - Active states                  │
└─────────────────────────────────────────────────────────┘
```

### 8.3 CSS Global

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply bg-dark-900 text-dark-100 font-sans antialiased;
  }
  
  ::selection {
    @apply bg-primary-600/30 text-white;
  }
}

@layer components {
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  .section-padding {
    @apply py-16 md:py-24;
  }
  
  .card {
    @apply bg-dark-800 border border-dark-700 rounded-lg p-6 
           hover:border-primary-500/50 transition-colors;
  }
}

@layer utilities {
  .text-gradient {
    @apply bg-gradient-to-r from-primary-400 to-primary-600 
           bg-clip-text text-transparent;
  }
}
```

---

## 9. Optimización de Rendimiento

### 9.1 Estrategias de Optimización

| Estrategia | Implementación | Impacto |
|:-----------|:---------------|:--------|
| **Code Splitting** | React.lazy + Suspense | Reduce bundle inicial |
| **Lazy Loading** | Imágenes con loading="lazy" | Mejora LCP |
| **Tree Shaking** | Vite automatically | Reduce bundle size |
| **Compression** | Gzip/Brotli (Vercel) | Reduce tamaño transferido |
| **CDN** | Vercel Edge Network | Reduce latency |
| **Cache** | HTTP cache headers | Reduce requests |

### 9.2 Lazy Loading de Rutas

```typescript
// src/App.tsx
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500" />
    </div>
  )
}

export function App() {
  return (
    <Suspense fallback={<Loading />}>
      {/* Routes */}
    </Suspense>
  )
}
```

### 9.3 Métricas de Rendimiento

| Métrica | Objetivo | Herramienta |
|:--------|:---------|:------------|
| LCP | < 2.5s | Lighthouse |
| INP | < 200ms | Web Vitals |
| CLS | < 0.1 | Lighthouse |
| FCP | < 1.8s | PageSpeed Insights |
| TTFB | < 800ms | WebPageTest |
| Bundle Size | < 200KB (initial) | Vite Bundle Analyzer |

---

## 10. Accesibilidad

### 10.1 Requisitos WCAG 2.2 AA

| Criterio | Implementación |
|:---------|:---------------|
| **1.1.1 Text Alternatives** | Alt text en todas las imágenes |
| **1.3.1 Info & Relationships** | HTML semántico (h1-h6, nav, main, section) |
| **1.4.3 Contrast Minimum** | Ratio 4.5:1 para texto normal |
| **2.1.1 Keyboard** | Todos los elementos interactivos accesibles por teclado |
| **2.4.1 Skip Blocks** | Skip to main content link |
| **2.4.7 Focus Visible** | Focus rings visibles |
| **3.3.1 Error Identification** | Mensajes de error claros |
| **4.1.2 Name, Role, Value** | ARIA labels donde es necesario |

### 10.2 Componente Skip Link

```typescript
// src/components/ui/SkipLink.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
                 bg-primary-600 text-white px-4 py-2 rounded-lg z-50"
    >
      Saltar al contenido principal
    </a>
  )
}
```

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*
