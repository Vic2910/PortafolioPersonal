import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { AdminLayout } from './components/admin/AdminLayout'
import { Dashboard } from './pages/admin/Dashboard'
import { ProjectsAdmin } from './pages/admin/ProjectsAdmin'
import { MessagesAdmin } from './pages/admin/MessagesAdmin'
import { Login } from './pages/admin/Login'

function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectsAdmin />} />
            <Route path="messages" element={<MessagesAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
