import React, { useState } from 'react'
import { Mail, ArrowRight, ShieldCheck, Brain, HeartPulse } from 'lucide-react'

const API_BASE = 'http://localhost:5000'

export default function LoginModal({
  open,
  onClose,
  onLoginSuccess
}: {
  open: boolean
  onClose: () => void
  onLoginSuccess: () => void
}) {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  /* ================= SEND OTP ================= */
  const sendOtp = async () => {
    if (!email || loading) return
    try {
      setLoading(true)
      setError(null)

      const res = await fetch(`${API_BASE}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to send OTP')

      setOtpSent(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async () => {
    if (otp.length !== 6 || loading) return
    try {
      setLoading(true)
      setError(null)

      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Invalid OTP')

      localStorage.setItem('mediro-token', data.token)
      localStorage.setItem(
        'mediro-user',
        JSON.stringify({ email, loggedInAt: Date.now() })
      )

      onLoginSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* LEFT BRAND PANEL */}
      <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-teal-600 via-mediro to-cyan-500 text-white p-12">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_white,_transparent_60%)]" />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Mediro</h1>
            <p className="mt-4 text-lg opacity-90 max-w-md">
              Your intelligent medical assistant — built to guide, support,
              and empower better health decisions.
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5" />
              Medical-grade privacy & security
            </div>
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5" />
              AI trained for responsible guidance
            </div>
            <div className="flex items-center gap-3">
              <HeartPulse className="w-5 h-5" />
              Human-first healthcare experience
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-6">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Welcome back 👋
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Continue to your Mediro account
          </p>

          {/* GOOGLE */}
          <button
            onClick={() => (window.location.href = `${API_BASE}/auth/google`)}
            className="mt-6 w-full py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* EMAIL */}
          {!otpSent && (
            <>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendOtp()}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-mediro outline-none"
                />
              </div>

              <button
                onClick={sendOtp}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-mediro text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Continue <ArrowRight size={18} />
              </button>
            </>
          )}

          {/* OTP */}
          {otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={e =>
                  setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
                }
                onKeyDown={e => e.key === 'Enter' && verifyOtp()}
                className="w-full text-center tracking-[0.3em] py-3 rounded-xl border dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-mediro outline-none"
              />

              <button
                onClick={verifyOtp}
                className="mt-4 w-full bg-mediro text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Verify & Enter
              </button>
            </>
          )}

          {error && (
            <p className="text-sm text-red-500 mt-4 text-center">{error}</p>
          )}

          <p className="mt-6 text-xs text-center text-slate-400">
            By continuing, you agree to our privacy-focused medical usage policy.
          </p>
        </div>
      </div>
    </div>
  )
}
