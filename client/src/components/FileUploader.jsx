import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function FileUploader({ onFileChange, allowed = 'image/*', helperText }) {
  const inputRef = useRef(null)
  const [fileObj, setFileObj] = useState(null)
  const [drag, setDrag] = useState(false)

  useEffect(() => {
    if (onFileChange) onFileChange(fileObj)
  }, [fileObj])

  const handlePick = e => {
    const f = e.target.files?.[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    setFileObj({ file: f, url })
  }

  const handleDrop = e => {
    e.preventDefault()
    setDrag(false)
    const f = e.dataTransfer.files?.[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    setFileObj({ file: f, url })
  }

  const remove = () => {
    if (fileObj) URL.revokeObjectURL(fileObj.url)
    setFileObj(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`card p-6 rounded-2xl dropzone ${drag ? 'border-white/30 bg-white/3' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
      >
        {!fileObj ? (
          <div className="flex flex-col items-center gap-4">
            <div className="text-lg font-medium">Upload a protein image</div>
            <div className="text-sm text-gray-300 max-w-md text-center">{helperText || 'Supported: PNG/JPG. You can also drag & drop.'}</div>

            <div className="mt-4 flex gap-3">
              <label className="px-6 py-3 rounded-lg btn-cta bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] cursor-pointer">
                Choose file
                <input ref={inputRef} type="file" accept={allowed} onChange={handlePick} className="hidden" />
              </label>

              <div className="px-6 py-3 rounded-lg border border-white/6 text-sm flex items-center gap-2">
                or drag & drop
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <div className="w-40 h-40 bg-black/10 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={fileObj.url} alt="preview" className="preview-img" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{fileObj.file.name}</div>
              <div className="text-sm text-gray-300">{(fileObj.file.size / 1024).toFixed(1)} KB</div>
              <div className="mt-4 flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }} onClick={remove} className="px-4 py-2 rounded-md bg-red-600/80">Remove</motion.button>
                <label className="px-4 py-2 rounded-md bg-white/6 cursor-pointer">
                  <input type="file" accept={allowed} onChange={handlePick} className="hidden" /> Replace
                </label>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
