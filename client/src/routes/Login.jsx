import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { loginApi, setToken } from '../auth/auth'
import config from '../config'
import AnimatedBG from '../components/AnimatedBG'

export default function Login() {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await loginApi({ email, password: pw })
      setToken(data.token)
      nav(config.ROUTES[4].path)
    } catch (err) {
      alert(err?.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
      <AnimatedBG bgUrl={config.PAGE_BACKGROUNDS['/login']} />
      <div className="card p-8 rounded-3xl w-full max-w-md content-on-bg">
        <h2 className="text-2xl font-semibold">Welcome back</h2>
        <p className="text-sm text-gray-300 mt-1">Login to classify protein images</p>

        <form onSubmit={handleLogin} className="mt-6 grid gap-4">
          <input value={email} onChange={e => setEmail(e.target.value)} className="p-3 rounded-md bg-transparent border border-white/6" placeholder="Email" />
          <input value={pw} onChange={e => setPw(e.target.value)} className="p-3 rounded-md bg-transparent border border-white/6" type="password" placeholder="Password" />
          <button disabled={loading} className="mt-4 py-3 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]">{loading ? 'Logging...' : 'Login'}</button>
        </form>
      </div>
    </motion.div>
  )
}
