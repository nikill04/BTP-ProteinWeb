import React from 'react'

export default function ProgressBar({ progress = 0 }) {
  return (
    <div className="w-full max-w-xl mx-auto mt-4">
      <div className="bg-white/6 rounded-full h-4 overflow-hidden">
        <div style={{ width: `${progress}%` }} className="h-4 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] transition-all"></div>
      </div>
      <div className="text-sm mt-2 text-gray-300">Processing: {progress}%</div>
    </div>
  )
}
