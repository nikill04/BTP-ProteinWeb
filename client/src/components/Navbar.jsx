// client/src/components/Navbar.jsx
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import config from '../config'
import { clearToken } from '../auth/auth'
import { motion } from 'framer-motion'

export default function Navbar() {
  const loc = useLocation()
  const nav = useNavigate()

  const mainPages = config.ROUTES.filter(r =>
    config.NAV_MAIN_PAGES.includes(r.path)
  )

  function handleLogout() {
    clearToken()
    nav('/')
  }

  return (
    <motion.nav
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-0 right-0 px-6 md:px-12 z-50"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between nav-glass p-3 rounded-xl shadow-sm">
        
        {/* BRAND */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl card flex items-center justify-center text-lg">
            {config.BRAND.logoEmoji}
          </div>
          <div className="font-semibold text-lg">{config.BRAND.logoText}</div>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-4">
          {mainPages.map(p => {
            const isActive = loc.pathname === p.path
            return (
              <motion.div
                key={p.path}
                whileHover={{ y: -4 }}
                className="relative"
              >
                <Link
                  to={p.path}
                  className={`
                    py-2 px-4 rounded-md transition font-medium
                    ${isActive
                      ? "text-white font-semibold bg-gradient-to-r from-[#7c3aed]/20 to-[#06b6d4]/20 backdrop-blur-lg shadow-md scale-[1.06]"
                      : "text-gray-200 hover:bg-white/6"}
                  `}
                >
                  {p.name}
                </Link>

                {/* Glow behind active */}
                {isActive && (
                  <motion.div
                    layoutId="navGlow"
                    className="absolute inset-0 rounded-md -z-10"
                    style={{
                      background:
                        "radial-gradient(160px at 50% 50%, rgba(124,58,237,0.22), rgba(6,182,212,0.12), transparent)"
                    }}
                    transition={{ duration: 0.35 }}
                  />
                )}
              </motion.div>
            )
          })}

          {/* LOGOUT BUTTON */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -3 }}
            onClick={handleLogout}
            className="ml-2 py-2 px-4 rounded-md bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] shadow-lg"
          >
            Logout
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
