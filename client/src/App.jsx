import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import config from './config'
import Landing from './routes/Landing'
import Register from './routes/Register'
import Login from './routes/Login'
import About from './routes/About'
import Classify from './routes/Classify'
import Navbar from './components/Navbar'
import { meApi, getToken } from './auth/auth'
import { motion, AnimatePresence } from 'framer-motion'

function PrivateRoute({ children }) {
  // simple guard: check token and server verify on mount
  const [ok, setOk] = useState(null)

  useEffect(() => {
    let mounted = true
    async function check() {
      const token = localStorage.getItem('token')
      if (!token) {
        if (mounted) setOk(false)
        return
      }
      try {
        await meApi()
        if (mounted) setOk(true)
      } catch (e) {
        if (mounted) setOk(false)
      }
    }
    check()
    return () => { mounted = false }
  }, [])

  if (ok === null) {
    return <div className="min-h-[60vh] flex items-center justify-center">Checking auth...</div>
  }
  if (!ok) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  const location = useLocation()
  // Show Navbar only on about/classify routes
  const showNav = config.NAV_MAIN_PAGES.includes(location.pathname)

  return (
    <div className="min-h-screen protein-dot-bg relative">
      {showNav && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.45 }}>
          <Routes location={location} key={location.pathname}>
            <Route path={config.ROUTES[0].path} element={<Landing />} />
            <Route path={config.ROUTES[1].path} element={<Register />} />
            <Route path={config.ROUTES[2].path} element={<Login />} />
            <Route path={config.ROUTES[3].path} element={
              <PrivateRoute><About /></PrivateRoute>
            } />
            <Route path={config.ROUTES[4].path} element={
              <PrivateRoute><Classify /></PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
