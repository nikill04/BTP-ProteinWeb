import React from 'react'
import { Link } from 'react-router-dom'
import AnimatedBG from '../components/AnimatedBG'
import { motion } from 'framer-motion'
import config from '../config'

export default function Landing() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center">
      <AnimatedBG bgUrl={config.PAGE_BACKGROUNDS['/']} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl text-center p-10 content-on-bg">
        <motion.h1 initial={{ scale: 0.98 }} animate={{ scale: 1 }} className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Protein Prediction
        </motion.h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Predict likely related disease from 3D protein images — demo for BTP.
        </p>

        <div className="mt-10 flex items-center justify-center gap-6">
          <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
            <Link to={config.ROUTES[1].path} className="px-8 py-3 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] shadow-lg btn-cta">Register</Link>
          </motion.div>

          <motion.div whileHover={{ y: -4 }}>
            <Link to={config.ROUTES[2].path} className="px-8 py-3 rounded-full border border-white/8">Login</Link>
          </motion.div>
        </div>

        <div className="mt-12 text-sm text-gray-400">Designed for BTP & protein classification demo</div>
      </motion.div>
    </div>
  )
}
