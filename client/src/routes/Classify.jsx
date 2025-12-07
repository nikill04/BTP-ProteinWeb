import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import FileUploader from '../components/FileUploader'
import ProgressBar from '../components/ProgressBar'
import { uploadApi, classifyApi } from '../auth/auth'
import AnimatedBG from '../components/AnimatedBG'
import config from '../config'

export default function Classify() {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [working, setWorking] = useState(false)
  const [result, setResult] = useState(null)
  const [uploaded, setUploaded] = useState(null)

  const onFileChange = useCallback((f) => {
    setFile(f)
    setProgress(0)
    setResult(null)
    setUploaded(null)
  }, [])

  async function startProcessing() {
    if (!file) return alert('Upload an image first')

    setWorking(true)
    setProgress(0)
    setResult(null)

    try {
      // 1) upload image to server (authenticated)
      const form = new FormData()
      form.append('image', file.file)
      const up = await uploadApi(form)
      setUploaded(up.file)

      // 2) ask server to classify based on saved file name
      const body = { savedName: up.file.savedName || up.file.originalName }
      const res = await classifyApi(body)
      const timeMs = res.timeMs || 2000
      const probs = res.probs || { covid: 0.25, aids: 0.25, ebola: 0.25, dengue: 0.25 }

      // animate progress locally for timeMs
      const start = Date.now()
      const end = start + timeMs
      await new Promise(resolve => {
        const tick = setInterval(() => {
          const now = Date.now()
          const pct = Math.min(100, Math.round(((now - start) / (end - start)) * 100))
          setProgress(pct)
          if (now >= end) {
            clearInterval(tick)
            setProgress(100)
            setTimeout(resolve, 300)
          }
        }, 80)
      })
      // set result
      setResult(probs)
    } catch (err) {
      alert(err?.response?.data?.error || 'Processing failed')
    } finally {
      setWorking(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] p-10 relative">
      <AnimatedBG bgUrl={config.PAGE_BACKGROUNDS['/classify']} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto content-on-bg">
        <h1 className="text-3xl font-bold">Classify Protein Image</h1>
        <p className="text-gray-300 mt-2">Upload a protein image to run the demo classification. Use descriptive filenames to control demo behavior.</p>

        <div className="mt-6">
          <FileUploader onFileChange={onFileChange} helperText={'Use filename keywords like covid, ebola, dengue, aids, fast, slow, mid or _probNN for demo.'} />

          <div className="mt-6 flex gap-3">
            <button onClick={startProcessing} disabled={!file || working} className={`px-6 py-3 rounded-lg ${!file ? 'bg-white/6' : 'bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]'}`}>Classify the protein</button>
            <button onClick={() => { setFile(null); setProgress(0); setResult(null); setUploaded(null) }} className="px-6 py-3 rounded-lg bg-white/6">Reset</button>
          </div>

          <div className="mt-6">
            <ProgressBar progress={progress} />
            {uploaded && (
              <div className="mt-4 text-sm text-gray-300">Uploaded: {uploaded.originalName} — saved as {uploaded.savedName}</div>
            )}

            {result && (
              <div className="mt-6 card p-6 rounded-2xl">
                <h3 className="font-semibold">Predicted probabilities</h3>
                <div className="mt-4 grid gap-3">
                  {Object.entries(result).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-4">
                      <div className="w-28 text-sm font-medium capitalize">{k}</div>
                      <div className="flex-1 bg-white/6 rounded-full h-4 overflow-hidden">
                        <div style={{ width: `${Math.round(v * 100)}%` }} className="h-4 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] transition-all"></div>
                      </div>
                      <div className="w-16 text-right">{Math.round(v * 100)}%</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
