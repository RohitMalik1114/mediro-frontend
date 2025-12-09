import { useTranslation } from 'react-i18next'

type Feature = { title: string; description: string; icon: string }

export default function Features() {
  const { t } = useTranslation()
  const items = t('features.items', { returnObjects: true }) as Feature[]

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {t('features.title')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:border-mediro dark:hover:border-mediro shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="text-6xl mb-6 transform group-hover:scale-105 transition-transform duration-300">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a 
            href="#contact" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-mediro to-teal-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>Explore All Features</span>
            <span className="text-xl">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
