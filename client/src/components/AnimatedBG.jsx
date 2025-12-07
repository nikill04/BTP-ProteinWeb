import React from 'react'
import { motion } from 'framer-motion'

export default function AnimatedBG() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* big rotating gradient blob */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ rotate: 360, scale: 1.02 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute -left-72 -top-72 w-[900px] h-[900px] bg-gradient-to-tr from-[#7c3aed]/20 to-[#06b6d4]/10 rounded-full blur-3xl blob">
      </motion.div>

      {/* second floating blob */}
      <motion.div
        initial={{ x: 0, y: 0 }}
        animate={{ x: 40, y: -40 }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#ef4444]/10 to-[#f59e0b]/06 rounded-3xl blur-3xl blob">
      </motion.div>

      {/* subtle tiled dots overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(124,58,237,0.06) 0 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(59,130,246,0.04) 0 1px, transparent 1px)', backgroundSize: '40px 40px, 60px 60px' }}>
      </div>
    </div>
  )
}
