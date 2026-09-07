import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                   bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Saltar al contenido principal
      </a>

      <Header />

      <main id="main-content">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
