import React from 'react'
import { useTranslation } from 'react-i18next'

type AboutItem = { title: string; description: string; icon: string }

export default function AboutShapes() {
  const { t } = useTranslation()
  const items = t('about.items', { returnObjects: true }) as AboutItem[]

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t('about.title')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:border-mediro dark:hover:border-mediro shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="text-6xl mb-6 transform group-hover:scale-105 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
