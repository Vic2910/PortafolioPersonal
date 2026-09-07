interface FilterTabsProps {
  categories: string[]
  activeCategory: string
  onChange: (category: string) => void
}

export function FilterTabs({ categories, activeCategory, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      <button
        onClick={() => onChange('all')}
        className={`px-4 py-2 rounded-lg transition-colors ${
          activeCategory === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
        }`}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
