import { ContactForm } from '../common/ContactForm'

export function Contact() {
  return (
    <section id="contacto" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Contacto
            </h2>
            <p className="text-gray-400">
              ¿Tienes un proyecto en mente? ¡Hablemos!
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl">
            <ContactForm />
          </div>

          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>También puedes encontrarme en:</p>
            <div className="flex justify-center gap-6 mt-4">
              <a
                href="https://github.com/Vic2910"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:victorarevalosierra@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
