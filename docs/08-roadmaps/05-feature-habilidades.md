# Feature: Habilidades

> **ID:** F-05 | **Prioridad:** Media | **Dependencias:** F-01 | **Historia:** HU-06

---

## 1. Objetivo

Implementar la sección de habilidades técnicas que muestra el stack tecnológico del desarrollador organizado por categorías (Frontend, Backend, Tools) con indicadores de nivel.

---

## 2. Dependencias

| Tipo | Servicio/Herramienta |
|:-----|:---------------------|
| **Feature anterior** | F-01: Setup Proyecto |
| **Componentes** | SkillCard, ProgressBar |

---

## 3. Prerrequisitos

- [ ] F-01 completado
- [ ] Definir habilidades y niveles
- [ ] Diseño de tarjetas de habilidades

---

## 4. Implementación

### Paso 1: Definir Datos de Habilidades

**Crear src/data/skills.ts:**
```typescript
import type { Skill } from '@/types'

export const skills: Skill[] = [
  // Frontend
  { id: '1', name: 'React', category: 'frontend', level: 'intermediate' },
  { id: '2', name: 'Angular', category: 'frontend', level: 'intermediate' },
  { id: '3', name: 'Next.js', category: 'frontend', level: 'beginner' },
  { id: '4', name: 'TypeScript', category: 'frontend', level: 'intermediate' },
  { id: '5', name: 'Tailwind CSS', category: 'frontend', level: 'intermediate' },
  { id: '6', name: 'HTML/CSS', category: 'frontend', level: 'advanced' },

  // Backend
  { id: '7', name: 'C# / ASP.NET', category: 'backend', level: 'intermediate' },
  { id: '8', name: 'Java / Spring Boot', category: 'backend', level: 'intermediate' },
  { id: '9', name: 'Node.js', category: 'backend', level: 'beginner' },
  { id: '10', name: 'PostgreSQL', category: 'backend', level: 'intermediate' },
  { id: '11', name: 'MySQL', category: 'backend', level: 'intermediate' },
  { id: '12', name: 'MongoDB', category: 'backend', level: 'beginner' },

  // Tools
  { id: '13', name: 'Git / GitHub', category: 'tools', level: 'intermediate' },
  { id: '14', name: 'Docker', category: 'tools', level: 'beginner' },
  { id: '15', name: 'VS Code', category: 'tools', level: 'advanced' },
  { id: '16', name: 'Postman', category: 'tools', level: 'intermediate' },
]
```

### Paso 2: Crear Componente SkillCard

**Crear src/components/common/SkillCard.tsx:**
```typescript
import type { Skill } from '@/types'

interface SkillCardProps {
  skill: Skill
}

const levelConfig = {
  beginner: { label: 'Básico', width: '33%', color: 'bg-yellow-500' },
  intermediate: { label: 'Intermedio', width: '66%', color: 'bg-blue-500' },
  advanced: { label: 'Avanzado', width: '100%', color: 'bg-green-500' },
}

export function SkillCard({ skill }: SkillCardProps) {
  const config = levelConfig[skill.level]

  return (
    <div className="bg-gray-800 p-4 rounded-xl hover:bg-gray-750 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-white">{skill.name}</span>
        <span className="text-sm text-gray-400">{config.label}</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${config.color} rounded-full transition-all duration-500`}
          style={{ width: config.width }}
        />
      </div>
    </div>
  )
}
```

### Paso 3: Crear Sección de Habilidades

**Crear src/components/sections/Skills.tsx:**
```typescript
import { useState } from 'react'
import { skills } from '@/data/skills'
import { SkillCard } from '@/components/common/SkillCard'

type Category = 'all' | 'frontend' | 'backend' | 'tools'

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'tools', label: 'Herramientas' },
]

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filteredSkills =
    activeCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === activeCategory)

  return (
    <section id="habilidades" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Habilidades Técnicas
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tecnologías y herramientas que domino para crear soluciones web completas.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeCategory === cat.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de habilidades */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>

        {/* Resumen */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap justify-center gap-8 text-gray-400">
            <div>
              <span className="text-3xl font-bold text-white">
                {skills.filter((s) => s.category === 'frontend').length}
              </span>
              <p className="text-sm">Frontend</p>
            </div>
            <div>
              <span className="text-3xl font-bold text-white">
                {skills.filter((s) => s.category === 'backend').length}
              </span>
              <p className="text-sm">Backend</p>
            </div>
            <div>
              <span className="text-3xl font-bold text-white">
                {skills.filter((s) => s.category === 'tools').length}
              </span>
              <p className="text-sm">Herramientas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Paso 4: Integrar en App.tsx

**Actualizar src/App.tsx:**
```typescript
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Hero />
      <Projects />
      <Skills />
    </div>
  )
}

export default App
```

### Paso 5: Commit

**Comando:**
```bash
git add .
git commit -m "feat: implement skills section with category filters"
git push origin main
```

---

## 5. Verificación

- [ ] Habilidades se muestran en cuadrícula
- [ ] Filtros por categoría funcionan
- [ ] Barras de progreso muestran nivel correcto
- [ ] Responsive en móvil y desktop
- [ ] Contadores de resumen son correctos

---

## 6. Troubleshooting

| Problema | Causa | Solución |
|:---------|:------|:---------|
| Habilidades no se muestran | Datos no importados | Verificar import de skills.ts |
| Filtros no funcionan | Estado no actualizado | Verificar useState |
| Barras no se ven | Estilos faltantes | Verificar clases de Tailwind |

---

## 7. Recursos

- [Tailwind CSS](https://tailwindcss.com/)
- [React State Management](https://react.dev/learn/state-a-component-memory)

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*