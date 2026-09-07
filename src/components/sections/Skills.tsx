import { useState } from 'react'
import { skills } from '../../data/skills'
import { SkillCard } from '../common/SkillCard'

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
    <section id="habilidades" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Habilidades Técnicas
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tecnologías y herramientas que domino para crear soluciones web completas.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeCategory === cat.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>

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
