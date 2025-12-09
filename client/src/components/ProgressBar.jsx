import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ProgressBar({ progress = 0 }) {
  // displayProgress animates numbers smoothly
  const [display, setDisplay] = useState(progress)

  useEffect(() => {
    let raf = null
    const start = display
    const diff = progress - start
    const startTime = performance.now()
    function step(t) {
      const elapsed = t - startTime
      const duration = 360
      const pct = Math.min(1, elapsed / duration)
      const cur = start + diff * pct
      setDisplay(Math.round(cur))
      if (pct < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => raf && cancelAnimationFrame(raf)
  }, [progress])

  return (
    <div className="w-full max-w-xl mx-auto mt-4">
      <div className="bg-white/6 rounded-full h-4 overflow-hidden">
        <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.25 }} style={{ width: `${progress}%` }} className="h-4 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]" />
      </div>

      <div className="flex items-center justify-between mt-2 text-gray-300">
        <div className="text-sm">Processing</div>
        <div className="flex items-center gap-2">
          <div className="text-sm progress-num">{display}%</div>
        </div>
      </div>
    </div>
  )
}
