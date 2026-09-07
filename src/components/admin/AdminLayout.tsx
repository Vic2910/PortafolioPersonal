import { Navigate, Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function AdminLayout() {
  const { user, loading, signOut } = useAuth()
  const location = useLocation()

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

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/projects', label: 'Proyectos', icon: '📁' },
    { href: '/admin/messages', label: 'Mensajes', icon: '✉️' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <Link to="/" className="text-xl font-bold hover:text-blue-400 transition-colors">
            VR<span className="text-blue-500">AS</span>
          </Link>
          <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
        </div>
        
        <nav className="flex-1 px-4 py-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                location.pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="text-sm text-gray-400 mb-3 truncate">{user.email}</div>
          <button
            onClick={signOut}
            className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  )
}
