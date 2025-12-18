import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthSuccess() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')

    if (token) {
      localStorage.setItem('mediro-token', token)

      localStorage.setItem(
        'mediro-user',
        JSON.stringify({
          method: 'google',
          loggedInAt: Date.now()
        })
      )

      navigate('/chat')
    } else {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-lg font-semibold">
        Signing you in securely...
      </p>
    </div>
  )
}
