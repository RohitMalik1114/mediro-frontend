import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import AboutShapes from './components/AboutShapes'
import Safety from './components/Safety'
import HealthNews from './components/HealthNews'
import Footer from './components/Footer'
import ChatModal from './components/ChatModal'
import ProfileSidebar from './components/ProfileSidebar'
import LoginModal from './components/LoginModal'
import { useTranslation } from 'react-i18next'
import AuthSuccess from './pages/AuthSuccess'

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const savedTheme = localStorage.getItem('mediro-theme')
    if (savedTheme === 'dark') document.documentElement.classList.add('dark')
    
    // Check if user is logged in
    const auth = localStorage.getItem('mediro-auth')
    if (auth) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setSidebarOpen(true)
    } else {
      setLoginOpen(true)
    }
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    setSidebarOpen(true)
  }

  // ✅ Handle Google OAuth success redirect
  if (window.location.pathname === '/auth/success') {
    return <AuthSuccess />
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#071119] dark:via-[#0a1520] dark:to-[#071119]">
      <Header 
        onStart={() => setChatOpen(true)} 
        onLogin={() => setLoginOpen(true)}
        onProfile={() => setSidebarOpen(true)}
        isLoggedIn={isLoggedIn}
      />
      
      <main className="flex-1 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-mediro/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Hero Section */}
        <section className="relative">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
            <Hero onStart={() => setChatOpen(true)} />
          </div>
          
          {/* Divider */}
          <div className="container mx-auto px-4 sm:px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative py-12 sm:py-16 lg:py-20">
          <HowItWorks />
          <div className="container mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <Features />
          </div>
          <div className="container mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
          </div>
        </section>

        {/* About Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-800/20">
          <div className="container mx-auto px-4 sm:px-6">
            <AboutShapes />
          </div>
        </section>

        {/* Safety Section */}
        <section className="relative py-12 sm:py-16 lg:py-20">
          <Safety />
          <div className="container mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
          </div>
        </section>

        {/* Health News Section */}
        <section className="relative py-12 sm:py-16 lg:py-20">
          <HealthNews />
        </section>

        {/* CTA Section */}
        <section className="relative py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-mediro to-teal-600 p-8 sm:p-12 text-center shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                  {t('cta.continue')}
                </h2>
                <button 
                  onClick={() => setChatOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-mediro font-semibold rounded-xl"
                >
                  {t('cta.visit_app')}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
      <ProfileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
    </div>
  )
}
