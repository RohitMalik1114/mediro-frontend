import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function LoginModal({ open, onClose, onLoginSuccess }: { open: boolean, onClose: () => void, onLoginSuccess: () => void }) {
  const { t } = useTranslation()
  const [method, setMethod] = useState<'phone' | 'email'>('email')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sendOTP = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true)
      setIsLoading(false)
      alert(t('login.otpSent'))
    }, 1000)
  }

  const verifyOTP = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      if (otp === '123456' || otp.length === 6) {
        localStorage.setItem('mediro-auth', JSON.stringify({ 
          method, 
          identifier: method === 'phone' ? phone : email,
          loggedIn: true,
          timestamp: Date.now()
        }))
        alert(t('login.success'))
        onLoginSuccess()
        onClose()
      } else {
        alert(t('login.invalidOTP'))
      }
    }, 1000)
  }

  const loginWithGoogle = () => {
    // Simulate Google OAuth
    localStorage.setItem('mediro-auth', JSON.stringify({ 
      method: 'google', 
      identifier: 'user@gmail.com',
      loggedIn: true,
      timestamp: Date.now()
    }))
    alert(t('login.success'))
    onLoginSuccess()
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md overflow-hidden max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-mediro to-teal-600 p-4 sm:p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">{t('login.title')}</h2>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5 sm:mt-1">{t('login.subtitle')}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Google Login */}
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-slate-700 dark:text-slate-300">{t('login.continueWithGoogle')}</span>
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                {t('login.or')}
              </span>
            </div>
          </div>

          {/* Method Selection */}
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setMethod('email')}
              className={`flex-1 py-2 rounded-md font-medium transition ${
                method === 'email' 
                  ? 'bg-white dark:bg-slate-700 text-mediro shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              📧 {t('login.email')}
            </button>
            <button
              onClick={() => setMethod('phone')}
              className={`flex-1 py-2 rounded-md font-medium transition ${
                method === 'phone' 
                  ? 'bg-white dark:bg-slate-700 text-mediro shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              📱 {t('login.phone')}
            </button>
          </div>

          {/* Input Fields */}
          {!otpSent ? (
            <div className="space-y-4">
              {method === 'email' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {t('login.emailLabel')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('login.emailPlaceholder')}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-mediro focus:border-transparent transition"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {t('login.phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('login.phonePlaceholder')}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-mediro focus:border-transparent transition"
                  />
                </div>
              )}
              <button
                onClick={sendOTP}
                disabled={isLoading || (method === 'email' ? !email : !phone)}
                className="w-full bg-gradient-to-r from-mediro to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-mediro/90 hover:to-teal-600/90 transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t('login.sending') : t('login.sendOTP')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('login.otpLabel')}
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder={t('login.otpPlaceholder')}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-mediro focus:border-transparent transition text-center text-2xl tracking-widest"
                  maxLength={6}
                />
              </div>
              <button
                onClick={verifyOTP}
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-mediro to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-mediro/90 hover:to-teal-600/90 transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t('login.verifying') : t('login.verify')}
              </button>
              <button
                onClick={() => setOtpSent(false)}
                className="w-full text-sm text-mediro hover:underline"
              >
                {t('login.backToInput')}
              </button>
            </div>
          )}

          {/* Info Notice */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <span className="text-xl">ℹ️</span>
              <p className="text-xs text-blue-800 dark:text-blue-200">
                {t('login.securityNote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
