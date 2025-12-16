import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  const [method, setMethod] = useState<'email' | 'phone'>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  /* ================= SEND OTP ================= */
  const sendOtp = async () => {
    try {
      setLoading(true)
      setError(null)

      const payload =
        method === 'email'
          ? { email }
          : { phone }

      const res = await fetch(`${API_BASE}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const text = await res.text()
      let data: any

      try {
        data = JSON.parse(text)
      } catch {
        throw new Error('Backend error while sending OTP')
      }

      if (!res.ok) {
        throw new Error(data.message || 'Failed to send OTP')
      }

      setOtpSent(true)
      alert('OTP sent successfully')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async () => {
    try {
      setLoading(true)
      setError(null)

      const payload =
        method === 'email'
          ? { email, otp }
          : { phone, otp }

      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const text = await res.text()
      let data: any

      try {
        data = JSON.parse(text)
      } catch {
        throw new Error('Backend returned invalid response')
      }

      if (!res.ok) {
        throw new Error(data.message || 'Invalid OTP')
      }

      if (!data.token) {
        throw new Error('JWT token not received from backend')
      }

      /* ✅ SAVE TOKEN */
      localStorage.setItem('mediro-token', data.token)

      /* Optional user info */
      localStorage.setItem(
        'mediro-user',
        JSON.stringify({
          method,
          email: email || null,
          phone: phone || null,
          loggedInAt: Date.now()
        })
      )

      console.log('✅ JWT TOKEN SAVED:', data.token)

      alert('Login successful')
      onLoginSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-mediro to-teal-600 p-6 text-white">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-sm text-white/80">Secure OTP based login</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Method Switch */}
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setMethod('email')}
              className={`flex-1 py-2 rounded-md ${
                method === 'email'
                  ? 'bg-white dark:bg-slate-700 text-mediro'
                  : 'text-slate-500'
              }`}
            >
              📧 Email
            </button>
            <button
              onClick={() => setMethod('phone')}
              className={`flex-1 py-2 rounded-md ${
                method === 'phone'
                  ? 'bg-white dark:bg-slate-700 text-mediro'
                  : 'text-slate-500'
              }`}
            >
              📱 Phone
            </button>
          </div>

          {/* Email / Phone Input */}
          {!otpSent && (
            <>
              {method === 'email' ? (
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              ) : (
                <input
                  type="tel"
                  placeholder="Enter your phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              )}

              <button
                onClick={sendOtp}
                disabled={loading || (method === 'email' ? !email : !phone)}
                className="w-full bg-mediro text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </>
          )}

          {/* OTP Input */}
          {otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-3 border rounded-lg text-center tracking-widest"
              />

              <button
                onClick={verifyOtp}
                disabled={loading || otp.length !== 6}
                className="w-full bg-mediro text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </>
          )}

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  )
}
