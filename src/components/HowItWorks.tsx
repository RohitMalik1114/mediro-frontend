import { useTranslation } from 'react-i18next'

export default function HowItWorks() {
  const { t } = useTranslation()
  const steps = t('howItWorks.steps', { returnObjects: true }) as Array<{ number: string; title: string; description: string; icon: string }>

  return (
    <section id="how" className="py-16 bg-slate-50 dark:bg-[#071119]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:border-mediro dark:hover:border-mediro shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="text-6xl mb-6 transform group-hover:scale-105 transition-transform duration-300">
                {step.icon}
              </div>
              
              <div className="text-mediro font-semibold text-sm mb-2">
                STEP {step.number}
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-primary">
            {t('hero.start')} →
          </button>
        </div>
      </div>
    </section>
  )
}
