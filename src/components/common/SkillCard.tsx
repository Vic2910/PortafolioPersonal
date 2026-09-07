import type { Skill } from '../../types'

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
