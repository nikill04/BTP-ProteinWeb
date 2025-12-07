import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import config from '../config'
import { clearToken } from '../auth/auth'
import { motion } from 'framer-motion'

export default function Navbar() {
  const loc = useLocation()
  const nav = useNavigate()
  const mainPages = config.ROUTES.filter(r => config.NAV_MAIN_PAGES.includes(r.path))

  function handleLogout() {
    clearToken()
    nav('/') // landing
  }

  return (
    <motion.nav initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed top-4 left-0 right-0 px-6 md:px-12 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl card flex items-center justify-center text-lg">
            {config.BRAND.logoEmoji}
          </div>
          <div className="font-semibold text-lg">{config.BRAND.logoText}</div>
        </Link>

        <div className="flex items-center gap-4">
          {mainPages.map(p => (
            <Link key={p.path} to={p.path}
              className={`py-2 px-4 rounded-md ${loc.pathname === p.path ? 'bg-white/8' : 'hover:bg-white/6'} transition`}>
              {p.name}
            </Link>
          ))}

          <button onClick={handleLogout} className="ml-2 py-2 px-4 rounded-md bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] shadow-lg">
            Logout
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
