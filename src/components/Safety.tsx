import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function Safety() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="safety" className="relative container mx-auto px-6 py-16 lg:py-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl animate-float pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-400/5 rounded-full blur-3xl animate-float pointer-events-none" style={{animationDelay: '2s'}}></div>
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 rounded-full text-sm font-medium text-red-700 dark:text-red-400">
            🛡️ {t('safety.badge')}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          {t('safety.title')}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          {t('safety.subtitle')}
        </p>
      </div>

      {/* Important Notice */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-300 dark:border-amber-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="text-4xl flex-shrink-0">⚠️</div>
            <div>
              <h3 className="text-xl font-bold text-amber-900 dark:text-amber-200 mb-2">
                {t('safety.importantTitle')}
              </h3>
              <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                {t('safety.importantText')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Guidelines Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        {/* When to Use */}
        <div className="group bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-6xl transform group-hover:scale-105 transition-transform duration-300">
              ✅
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('safety.whenToUseTitle')}
            </h3>
          </div>
          <ul className="space-y-3">
            {(t('safety.whenToUse', { returnObjects: true }) as string[]).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* When NOT to Use */}
        <div className="group bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-500 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-6xl transform group-hover:scale-105 transition-transform duration-300">
              🚫
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('safety.whenNotToUseTitle')}
            </h3>
          </div>
          <ul className="space-y-3">
            {(t('safety.whenNotToUse', { returnObjects: true }) as string[]).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Emergency Contact Card */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="text-6xl">🚨</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{t('safety.emergencyTitle')}</h3>
                <p className="text-white/90">{t('safety.emergencyText')}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{t('safety.emergencyNumbers')}</div>
              <p className="text-sm text-white/80">{t('safety.emergencyNote')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Data Security */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-slate-50 via-orange-50/20 to-blue-50 dark:from-slate-800 dark:via-orange-900/10 dark:to-blue-900/20 rounded-2xl p-8 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-3xl shadow-lg">
              🔐
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('safety.privacyTitle')}
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {(t('safety.privacyPoints', { returnObjects: true }) as Array<{title: string, description: string}>).map((point, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl mb-3">{['🔒', '🛡️', '✅'][idx]}</div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{point.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 text-center leading-relaxed">
            <span className="font-semibold text-slate-900 dark:text-white">{t('safety.disclaimerTitle')}: </span>
            {t('safety.disclaimerText')}
          </p>
        </div>
      </div>
    </section>
  )
}
