import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const MediroLogo = () => (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-all duration-500 hover:rotate-12 hover:scale-110">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#1a9b8e', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0f7f76', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <circle cx="20" cy="20" r="19" stroke="url(#logoGradient)" strokeWidth="1.5" fill="none" opacity="0.3" filter="url(#glow)"/>
    <path d="M 12 18 Q 10 18 10 20 Q 10 22 12 22" stroke="url(#logoGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#glow)"/>
    <path d="M 28 18 Q 30 18 30 20 Q 30 22 28 22" stroke="url(#logoGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#glow)"/>
    <path d="M 12 20 L 28 20" stroke="url(#logoGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#glow)"/>
    <path d="M 12 20 Q 12 12 20 10 Q 28 12 28 20" stroke="url(#logoGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#glow)"/>
    <circle cx="15" cy="25" r="1.5" fill="url(#logoGradient)" className="animate-pulse" style={{animationDuration: '2s'}}/>
    <circle cx="20" cy="28" r="1.5" fill="url(#logoGradient)" className="animate-pulse" style={{animationDuration: '2.5s', animationDelay: '0.3s'}}/>
    <circle cx="25" cy="25" r="1.5" fill="url(#logoGradient)" className="animate-pulse" style={{animationDuration: '2s', animationDelay: '0.6s'}}/>
    <line x1="15" y1="25" x2="20" y2="28" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.6"/>
    <line x1="20" y1="28" x2="25" y2="25" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.6"/>
    <path d="M 18 14 L 19 12 L 20 15 L 21 11 L 22 14" stroke="url(#logoGradient)" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" className="animate-pulse"/>
  </svg>
)

export default function Header({ onStart, onLogin, onProfile, isLoggedIn }: { onStart?: () => void, onLogin?: () => void, onProfile?: () => void, isLoggedIn?: boolean }) {
  const { t, i18n } = useTranslation()
  const [openLang, setOpenLang] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    
    const onDoc = (e: MouseEvent) => {
      if (!dropdownRef.current) return
      if (!dropdownRef.current.contains(e.target as Node)) setOpenLang(false)
    }
    document.addEventListener('click', onDoc)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', onDoc)
    }
  }, [])

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('mediro-lang', lng)
    setOpenLang(false)
  }
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('mediro-theme', isDark ? 'dark' : 'light')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'backdrop-blur-xl bg-white/70 dark:bg-[#071119]/70 shadow-lg shadow-mediro/5' 
        : 'backdrop-blur-md bg-white/80 dark:bg-[#071119]/80 shadow-sm'
    } border-b border-slate-200/50 dark:border-slate-700/50`}>
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-mediro to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-3 sm:px-6 py-2 sm:py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Home Button with modern effect */}
          <button
            onClick={scrollToTop}
            className="group relative flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-mediro dark:hover:text-mediro rounded-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-mediro dark:hover:border-mediro overflow-hidden hover:shadow-lg hover:shadow-mediro/20 transform hover:scale-105"
            title="Go to top"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-mediro/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="text-base sm:text-lg relative z-10 group-hover:scale-110 transition-transform">🏠</span>
            <span className="hidden sm:inline relative z-10">{t('nav.home')}</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer hover:scale-105 transition-transform duration-300" onClick={scrollToTop}>
            <div className="relative">
              <MediroLogo />
              <div className="absolute inset-0 bg-mediro/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="hidden md:block">
              <div className="text-mediro font-bold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-mediro to-teal-600 bg-clip-text text-transparent">Mediro</div>
              <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 -mt-0.5">Health Assistant</div>
            </div>
          </div>

          {/* Navigation with modern hover effects */}
          <nav className="hidden lg:flex gap-1 ml-8">
            {['about', 'features', 'safety', 'contact'].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                className="group relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-mediro dark:hover:text-mediro rounded-xl transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-mediro/5 via-teal-500/5 to-mediro/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>
                <span className="relative z-10">{t(`nav.${item}`)}</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-mediro to-teal-600 group-hover:w-4/5 transition-all duration-300"></span>
              </a>
            ))}
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Language Selector with premium styling */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpenLang(v => !v)}
              className="group relative flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-mediro dark:hover:text-mediro rounded-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-mediro dark:hover:border-mediro overflow-hidden shadow-sm hover:shadow-lg hover:shadow-mediro/20 transform hover:scale-105"
              aria-haspopup="true"
              aria-expanded={openLang}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-mediro/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="text-base sm:text-lg relative z-10 transform group-hover:scale-110 transition-transform">🌐</span>
              <span className="hidden lg:inline relative z-10">{t('nav.language')}</span>
              <svg className={`w-4 h-4 relative z-10 transition-transform duration-300 ${openLang ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openLang && (
              <div className="absolute right-0 mt-2 w-56 glass backdrop-blur-xl bg-white/90 dark:bg-[#0b1316]/90 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeInUp">
                <div className="py-1">
                  <button className="group/item w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gradient-to-r hover:from-mediro/10 hover:to-teal-500/10 dark:hover:from-mediro/20 dark:hover:to-teal-500/20 hover:text-mediro transition-all duration-300 flex items-center gap-3" onClick={() => changeLang('en')}>
                    <span className="text-xl transform group-hover/item:scale-125 transition-transform">🇬🇧</span>
                    <span className="transform group-hover/item:translate-x-1 transition-transform">English</span>
                  </button>
                  <button className="group/item w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gradient-to-r hover:from-mediro/10 hover:to-teal-500/10 dark:hover:from-mediro/20 dark:hover:to-teal-500/20 hover:text-mediro transition-all duration-300 flex items-center gap-3" onClick={() => changeLang('hi')}>
                    <span className="text-xl transform group-hover/item:scale-125 transition-transform">🇮🇳</span>
                    <span className="transform group-hover/item:translate-x-1 transition-transform">हिंदी</span>
                  </button>
                  <button className="group/item w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gradient-to-r hover:from-mediro/10 hover:to-teal-500/10 dark:hover:from-mediro/20 dark:hover:to-teal-500/20 hover:text-mediro transition-all duration-300 flex items-center gap-3" onClick={() => changeLang('es')}>
                    <span className="text-xl transform group-hover/item:scale-125 transition-transform">🇪🇸</span>
                    <span className="transform group-hover/item:translate-x-1 transition-transform">Español</span>
                  </button>
                  <button className="group/item w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gradient-to-r hover:from-mediro/10 hover:to-teal-500/10 dark:hover:from-mediro/20 dark:hover:to-teal-500/20 hover:text-mediro transition-all duration-300 flex items-center gap-3" onClick={() => changeLang('fr')}>
                    <span className="text-xl transform group-hover/item:scale-125 transition-transform">🇫🇷</span>
                    <span className="transform group-hover/item:translate-x-1 transition-transform">Français</span>
                  </button>
                  <button className="group/item w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gradient-to-r hover:from-mediro/10 hover:to-teal-500/10 dark:hover:from-mediro/20 dark:hover:to-teal-500/20 hover:text-mediro transition-all duration-300 flex items-center gap-3" onClick={() => changeLang('de')}>
                    <span className="text-xl transform group-hover/item:scale-125 transition-transform">🇩🇪</span>
                    <span className="transform group-hover/item:translate-x-1 transition-transform">Deutsch</span>
                  </button>
                  <button className="group/item w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gradient-to-r hover:from-mediro/10 hover:to-teal-500/10 dark:hover:from-mediro/20 dark:hover:to-teal-500/20 hover:text-mediro transition-all duration-300 flex items-center gap-3" onClick={() => changeLang('zh')}>
                    <span className="text-xl transform group-hover/item:scale-125 transition-transform">🇨🇳</span>
                    <span className="transform group-hover/item:translate-x-1 transition-transform">中文</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle with smooth animation */}
          <button 
            onClick={toggleTheme} 
            className="group relative p-1.5 sm:p-2 text-base sm:text-lg rounded-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-mediro dark:hover:border-mediro overflow-hidden shadow-sm hover:shadow-lg hover:shadow-mediro/20 transform hover:scale-105 hover:rotate-12"
            title="Toggle theme"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-mediro/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 transform group-hover:scale-110 transition-transform">🌗</span>
          </button>

          {/* Login Button with premium styling */}
          <button 
            onClick={onLogin} 
            className="group relative flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-mediro to-teal-600 rounded-xl shadow-lg shadow-mediro/30 hover:shadow-xl hover:shadow-mediro/40 transition-all duration-300 overflow-hidden transform hover:scale-105 hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-mediro opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="text-base sm:text-lg relative z-10 transform group-hover:scale-110 transition-transform">🔐</span>
            <span className="hidden md:inline relative z-10">{t('nav.login')}</span>
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"></div>
          </button>

          {/* Profile Button with premium styling */}
          {isLoggedIn && (
            <button 
              onClick={onProfile} 
              className="group relative flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-mediro to-teal-600 rounded-xl shadow-lg shadow-mediro/30 hover:shadow-xl hover:shadow-mediro/40 transition-all duration-300 overflow-hidden transform hover:scale-105 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-mediro opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="text-base sm:text-lg relative z-10 transform group-hover:scale-110 transition-transform">👤</span>
              <span className="hidden md:inline relative z-10">{t('nav.profile')}</span>
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"></div>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
