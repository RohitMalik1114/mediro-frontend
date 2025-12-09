import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function Hero({ onStart }: { onStart?: () => void }) {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-0 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-mediro/30 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-teal-500/40 rounded-full animate-ping" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-mediro/25 rounded-full animate-ping" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-teal-400/30 rounded-full animate-ping" style={{animationDuration: '6s', animationDelay: '0.5s'}}></div>
      </div>

      <div className={`space-y-6 sm:space-y-8 transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Main Heading */}
        <div className="relative">
          <div className={`inline-block mb-3 sm:mb-4 transform transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="relative px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-mediro/10 via-teal-500/10 to-mediro/10 border border-mediro/20 rounded-full text-xs sm:text-sm font-medium text-mediro backdrop-blur-sm shadow-lg hover:shadow-mediro/20 hover:scale-105 transition-all duration-300 cursor-default animate-pulse">
              ✨ AI-Powered Healthcare
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-mediro/5 to-teal-500/5 blur-xl"></span>
            </span>
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight bg-gradient-to-r from-slate-900 via-mediro to-slate-700 dark:from-white dark:via-teal-300 dark:to-slate-300 bg-clip-text text-transparent transform transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} hover:scale-[1.02] transition-transform`}>
            {t('hero.title')}
          </h1>
          <p className={`mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl transform transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {t('hero.subtitle')}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 transform transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button 
            onClick={onStart} 
            className="group relative flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-mediro via-teal-600 to-mediro bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-mediro/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
            style={{backgroundSize: '200% auto'}}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-sm sm:text-base">{t('hero.start')}</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-mediro/0 via-white/10 to-mediro/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
          <a 
            href="#how" 
            className="group flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-3 sm:py-4 text-slate-700 dark:text-slate-300 font-medium hover:text-mediro dark:hover:text-mediro transition-all duration-300 w-full sm:w-auto rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50 backdrop-blur-sm"
          >
            <span className="text-sm sm:text-base">{t('hero.learn')}</span>
            <svg className="w-4 h-4 transform group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Feature Tags */}
        <div className={`flex flex-wrap gap-2 sm:gap-3 transform transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { icon: '📸', text: 'Image Analysis', delay: '600' },
            { icon: '🎤', text: 'Voice Consultation', delay: '700' },
            { icon: '🔍', text: 'Symptom Checker', delay: '800' }
          ].map((feature, idx) => (
            <span 
              key={idx}
              className={`group relative px-3 sm:px-4 py-1.5 sm:py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:shadow-mediro/10 hover:border-mediro/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-default ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{transitionDelay: `${feature.delay}ms`}}
            >
              <span className="inline-block mr-1.5 sm:mr-2 text-base sm:text-lg group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">{feature.icon}</span>
              <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-mediro dark:group-hover:text-mediro transition-colors">{feature.text}</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-mediro/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </span>
          ))}
        </div>
      </div>

      {/* Visual Card */}
      <div className={`flex justify-center lg:justify-end px-4 sm:px-0 transform transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
        <div className="relative w-full max-w-md group">
          {/* Animated Decorative elements */}
          <div className="absolute -top-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 bg-mediro/20 rounded-full blur-2xl animate-pulse group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-teal-500/20 rounded-full blur-2xl animate-pulse group-hover:scale-150 transition-transform duration-700" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-mediro/5 to-teal-500/5 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
          
          {/* Main Card with 3D effect */}
          <div className="relative bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl hover:shadow-mediro/20 backdrop-blur-xl">
            {/* Animated Gradient overlay */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-mediro via-teal-500 to-mediro bg-size-200 animate-gradient"></div>
            
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-teal-500/5 pointer-events-none"></div>
            
            <div className="relative text-center space-y-4 sm:space-y-6">
              {/* Animated Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-mediro via-teal-600 to-mediro bg-size-200 animate-gradient rounded-2xl shadow-lg transform hover:scale-110 hover:rotate-6 transition-all duration-500 cursor-pointer relative overflow-hidden group/icon">
                <span className="text-3xl sm:text-4xl relative z-10 animate-bounce" style={{animationDuration: '2s'}}>🩺</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover/icon:translate-x-full transition-transform duration-1000"></div>
              </div>
              
              {/* Text with hover effect */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 via-mediro to-slate-900 dark:from-white dark:via-teal-300 dark:to-white bg-clip-text text-transparent mb-1 sm:mb-2">Mediro</h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">AI Medical Assistant</p>
              </div>

              {/* Stats Grid with animation */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
                {[
                  { value: '24/7', label: 'Available', delay: '100' },
                  { value: '6', label: 'Languages', delay: '200' }
                ].map((stat, idx) => (
                  <div 
                    key={idx}
                    className="text-center transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-default group/stat"
                    style={{transitionDelay: `${stat.delay}ms`}}
                  >
                    <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-mediro to-teal-600 bg-clip-text text-transparent group-hover/stat:scale-125 transition-transform">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1 group-hover/stat:text-mediro transition-colors">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Trust Badge with pulse animation */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-green-900/20 rounded-full border border-green-200 dark:border-green-800 shadow-sm hover:shadow-md hover:shadow-green-500/20 transition-all duration-300 transform hover:scale-105 cursor-default backdrop-blur-sm">
                <span className="text-green-600 dark:text-green-400 animate-pulse">✓</span>
                <span className="text-xs font-medium text-green-700 dark:text-green-300">AI-Verified Information</span>
              </div>
            </div>
            
            {/* Floating particles inside card */}
            <div className="absolute top-10 right-10 w-1 h-1 bg-mediro/30 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
            <div className="absolute bottom-20 left-10 w-1 h-1 bg-teal-500/30 rounded-full animate-ping" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
