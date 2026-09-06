# Feature: Auth Admin

> **ID:** F-09 | **Prioridad:** Alta | **Dependencias:** F-01 | **Historia:** HU-Admin

---

## 1. Objetivo

Implementar autenticación para el panel de administración usando Supabase Auth, con login por email/password y protección de rutas.

---

## 2. Dependencias

| Tipo | Servicio/Herramienta |
|:-----|:---------------------|
| **Feature anterior** | F-01: Setup Proyecto |
| **Servicio** | Supabase Auth |

---

## 3. Prerrequisitos

- [ ] F-01 completado
- [ ] Supabase configurado
- [ ] Tabla `admin_users` creada
- [ ] Usuario admin registrado en Supabase Auth

---

## 4. Implementación

### Paso 1: Crear Configuración de Supabase

**Crear src/config/supabase.ts:**
```typescript
import { createClient } from '@supabase/supabase-js'
import { config } from './environment'

export const supabase = createClient(config.supabaseUrl, config.supabaseKey)
```

**Instalar Supabase:**
```bash
npm install @supabase/supabase-js
```

### Paso 2: Crear Hook de Autenticación

**Crear src/hooks/useAuth.ts:**
```typescript
import { useState, useEffect, createContext, useContext } from 'react'
import { supabase } from '@/config/supabase'
import type { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Escuchar cambios de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
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
    if (error) return { error: error.message }
    return {}
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

### Paso 3: Crear Página de Login

**Crear src/pages/admin/Login.tsx:**
```typescript
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn(email, password)
    
    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

### Paso 4: Envolver App con AuthProvider

**Actualizar src/main.tsx:**
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './hooks/useAuth'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
```

### Paso 5: Commit

**Comando:**
```bash
git add .
git commit -m "feat: implement admin auth with Supabase"
git push origin main
```

---

## 5. Verificación

- [ ] Login muestra formulario
- [ ] Credenciales correctas permiten acceso
- [ ] Credenciales incorrectas muestran error
- [ ] Sesión persiste al recargar
- [ ] Logout funciona correctamente
- [ ] Rutas protegidas redirigen a login

---

## 6. Troubleshooting

| Problema | Causa | Solución |
|:---------|:------|:---------|
| Login no funciona | Usuario no existe | Crear en Supabase Dashboard |
| Sesión no persiste | Cookies bloqueadas | Verificar configuración |
| Error de CORS | URL mal configurada | Verificar URLs en Supabase |

---

## 7. Recursos

- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [React Context](https://react.dev/reference/react/createContext)

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*