import { aboutData } from '../../data/about'

export function About() {
  return (
    <section id="sobre-mi" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {aboutData.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              {aboutData.bio}
            </p>

            <ul className="space-y-3">
              {aboutData.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-3 text-gray-300">
                  <span className="text-blue-400">→</span>
                  {highlight}
                </li>
              ))}
            </ul>

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

          <aside className="space-y-6">
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
