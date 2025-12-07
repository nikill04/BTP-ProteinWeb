import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { registerApi, setToken } from '../auth/auth'
import config from '../config'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await registerApi({ name, email, password: pw })
      setToken(data.token)
      nav(config.ROUTES[4].path)
    } catch (err) {
      alert(err?.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
      <div className="card p-8 rounded-3xl w-full max-w-lg">
        <h2 className="text-2xl font-semibold">Create an account</h2>
        <p className="text-sm text-gray-300 mt-1">Register to use the protein classification demo and manage datasets.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input value={name} onChange={e => setName(e.target.value)} className="p-3 rounded-md bg-transparent border border-white/6" placeholder="Full name" />
          <input value={email} onChange={e => setEmail(e.target.value)} className="p-3 rounded-md bg-transparent border border-white/6" placeholder="Email" />
          <input value={pw} onChange={e => setPw(e.target.value)} className="p-3 rounded-md bg-transparent border border-white/6" type="password" placeholder="Password" />
          <button disabled={loading} className="mt-4 py-3 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]">{loading ? 'Signing...' : 'Sign up'}</button>
        </form>
      </div>
    </motion.div>
  )
}
