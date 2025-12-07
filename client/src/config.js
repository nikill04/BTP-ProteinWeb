// client/src/config.js
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

const BRAND = {
  name: 'ProteinPredict',
  logoText: 'ProteinPredict',
  logoEmoji: '🧬'
}

const ROUTES = [
  { name: 'Home', path: '/' },
  { name: 'Register', path: '/register' },
  { name: 'Login', path: '/login' },
  { name: 'About', path: '/about' },
  { name: 'Classify', path: '/classify' }
]

// which routes appear in the right side navbar (only two)
const NAV_MAIN_PAGES = ['/about', '/classify']

const DISEASES = ['covid', 'aids', 'ebola', 'dengue']

export default { API_BASE, BRAND, ROUTES, NAV_MAIN_PAGES, DISEASES }
