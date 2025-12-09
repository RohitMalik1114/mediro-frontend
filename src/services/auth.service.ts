import apiClient from './api.service'
import { API_ENDPOINTS } from '../config/api.config'

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
}

export interface LoginData {
  email: string
  password: string
}

export interface User {
  _id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  dateOfBirth?: string
  gender?: string
  role: string
  isActive: boolean
  createdAt: string
}

export interface AuthResponse {
  success: boolean
  data: {
    user: User
    accessToken: string
    refreshToken: string
  }
  message: string
}

class AuthService {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, data)
    const { accessToken, refreshToken } = response.data.data
    
    // Store tokens
    localStorage.setItem('mediro-access-token', accessToken)
    localStorage.setItem('mediro-refresh-token', refreshToken)
    localStorage.setItem('mediro-auth', JSON.stringify({
      loggedIn: true,
      user: response.data.data.user,
      timestamp: Date.now()
    }))
    
    return response.data
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, data)
    const { accessToken, refreshToken } = response.data.data
    
    // Store tokens
    localStorage.setItem('mediro-access-token', accessToken)
    localStorage.setItem('mediro-refresh-token', refreshToken)
    localStorage.setItem('mediro-auth', JSON.stringify({
      loggedIn: true,
      user: response.data.data.user,
      timestamp: Date.now()
    }))
    
    return response.data
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.LOGOUT)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear local storage
      localStorage.removeItem('mediro-access-token')
      localStorage.removeItem('mediro-refresh-token')
      localStorage.removeItem('mediro-auth')
    }
  }

  async getProfile(): Promise<User> {
    const response = await apiClient.get(API_ENDPOINTS.PROFILE)
    return response.data.data
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.put(API_ENDPOINTS.CHANGE_PASSWORD, {
      currentPassword,
      newPassword
    })
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('mediro-access-token')
    return !!token
  }

  getUser(): User | null {
    const auth = localStorage.getItem('mediro-auth')
    if (auth) {
      const parsed = JSON.parse(auth)
      return parsed.user || null
    }
    return null
  }
}

export default new AuthService()
