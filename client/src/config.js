// client/src/config.js
// Centralized client config. Edit PAGE_BACKGROUNDS to change per-page background images.
// Use either local files under /public/images (recommended) or full external URLs.

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

// Per-page background images (default paths)
// Put your images in client/public/images/ folder OR use an external URL.
const PAGE_BACKGROUNDS = {
  // '/': '',
  // '/register': '',
  // '/login': '',
  // '/about': '',
  // '/classify': '',


  '/': '/images/landing.jpg',
  '/register': '/images/register.jpeg',
  '/login': '/images/login.jpeg',
  '/about': '/images/about.jpeg',
  '/classify': '/images/classify.jpeg'
}

export default { API_BASE, BRAND, ROUTES, NAV_MAIN_PAGES, DISEASES, PAGE_BACKGROUNDS }
