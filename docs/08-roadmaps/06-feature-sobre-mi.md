# Feature: Sobre Mí

> **ID:** F-06 | **Prioridad:** Media | **Dependencias:** F-01 | **Historia:** HU-07

---

## 1. Objetivo

Implementar la sección "Sobre Mí" que presenta la biografía profesional, experiencia, formación y objetivos del desarrollador.

---

## 2. Dependencias

| Tipo | Servicio/Herramienta |
|:-----|:---------------------|
| **Feature anterior** | F-01: Setup Proyecto |
| **Componentes** | Timeline, Stats |

---

## 3. Prerrequisitos

- [ ] F-01 completado
- [ ] Contenido biográfico definido
- [ ] Diseño de sección

---

## 4. Implementación

### Paso 1: Definir Contenido

**Crear src/data/about.ts:**
```typescript
export const aboutData = {
  title: "Sobre Mí",
  bio: "Soy Victor Rafael Arévalo Sierra, desarrollador Full Stack de Santa Ana, El Salvador. Me apasiona crear soluciones web completas que resuelvan problemas reales. Aunque soy junior en experiencia profesional, cuento con sólidos proyectos académicos que demuestran mis habilidades técnicas.",
  
  highlights: [
    "Especializado en stack Java/C#",
    "Enfocado en arquitectura de software",
    "Aprendiz continuo de nuevas tecnologías",
    "Buscando mi primera oportunidad profesional"
  ],

  stats: [
    { label: "Proyectos Completados", value: "6" },
    { label: "Tecnologías", value: "12+" },
    { label: "Años Estudiando", value: "3+" },
  ],

  education: [
    {
      title: "Ingeniería en Sistemas Computacionales",
      institution: "Universidad",
      period: "2021 - Presente",
      description: "Formación en desarrollo de software, arquitectura y bases de datos."
    }
  ],

  interests: [
    "Arquitectura de Software",
    "Bases de Datos",
    "UI/UX Design",
    " APIs REST",
    "Tecnologías Emergentes"
  ]
}
```

### Paso 2: Crear Componente About

**Crear src/components/sections/About.tsx:**
```typescript
import { aboutData } from '@/data/about'

export function About() {
  return (
    <section id="sobre-mi" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {aboutData.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Biografía */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              {aboutData.bio}
            </p>

            {/* Highlights */}
            <ul className="space-y-3">
              {aboutData.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-3 text-gray-300">
                  <span className="text-blue-400">→</span>
                  {highlight}
                </li>
              ))}
            </ul>

            {/* Intereses */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Intereses</h3>
              <div className="flex flex-wrap gap-2">
                {aboutData.interests.map((interest) => (
                  <span
                    key={interest}
                    className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Stats */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-4">Números Clave</h3>
              <div className="space-y-4">
                {aboutData.stats.map((stat) => (
                  <div key={stat.label} className="flex justify-between">
                    <span className="text-gray-400">{stat.label}</span>
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Formación */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-4">Formación</h3>
              {aboutData.education.map((edu) => (
                <div key={edu.title} className="space-y-2">
                  <h4 className="font-medium text-white">{edu.title}</h4>
                  <p className="text-gray-400 text-sm">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">{edu.period}</p>
                  <p className="text-gray-300 text-sm">{edu.description}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
```

### Paso 3: Integrar en App.tsx

**Actualizar src/App.tsx:**
```typescript
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { About } from './components/sections/About'

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Hero />
      <Projects />
      <Skills />
      <About />
    </div>
  )
}

export default App
```

### Paso 4: Commit

**Comando:**
```bash
git add .
git commit -m "feat: implement about section with bio and education"
git push origin main
```

---

## 5. Verificación

- [ ] Biografía se muestra correctamente
- [ ] Highlights son visibles
- [ ] Stats muestran números correctos
- [ ] Formación se muestra
- [ ] Responsive en móvil y desktop

---

## 6. Troubleshooting

| Problema | Causa | Solución |
|:---------|:------|:---------|
| Contenido no se ve | Datos no importados | Verificar import about.ts |
| Layout roto | Clases faltantes | Verificar grid de Tailwind |

---

## 7. Recursos

- [Tailwind CSS](https://tailwindcss.com/)
- [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*