// client/src/config.js
// Centralized client config. Edit PAGE_BACKGROUNDS to change per-page background images.
// PAGE_BG_SPEED sets the pan/zoom animation duration in seconds for each page (higher = slower).

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

// Per-page background images (put files in client/public/images/)
// Example values: '/images/landing.jpg' or full 'https://...'
const PAGE_BACKGROUNDS = {
  '/': '/images/landing.jpg',
  '/register': '/images/register.jpeg',
  '/login': '/images/login.jpeg',
  '/about': '/images/about.jpeg',
  '/classify': '/images/classify.jpeg'
}

// Per-page background animation speed (seconds duration for pan/zoom loop).
// Larger numbers = slower movement. Tune these per-page.
const PAGE_BG_SPEED = {
  '/': 40,         // landing — slow elegant motion
  '/register': 28, // register — medium
  '/login': 28,    // login — medium
  '/about': 36,    // about — slow
  '/classify': 30  // classify — medium-slow
}

// If you want no image on a page, set PAGE_BACKGROUNDS['/path'] = '' or null

export default { API_BASE, BRAND, ROUTES, NAV_MAIN_PAGES, DISEASES, PAGE_BACKGROUNDS, PAGE_BG_SPEED }
