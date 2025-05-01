export * from './authApi'
export * from './usersApi'
export * from './serverApi'
export * from './store'

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'