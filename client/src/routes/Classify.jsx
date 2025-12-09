// // client/src/routes/Classify.jsx
// import React, { useState, useCallback } from 'react'
// import { motion } from 'framer-motion'
// import FileUploader from '../components/FileUploader'
// import ProgressBar from '../components/ProgressBar'
// import { uploadApi, classifyApi } from '../auth/auth'
// import AnimatedBG from '../components/AnimatedBG'
// import config from '../config'

// export default function Classify() {
//   const [file, setFile] = useState(null)
//   const [progress, setProgress] = useState(0)
//   const [working, setWorking] = useState(false)
//   const [result, setResult] = useState(null)
//   const [uploaded, setUploaded] = useState(null)
//   const [matched, setMatched] = useState(null)

//   const onFileChange = useCallback((f) => {
//     setFile(f)
//     setProgress(0)
//     setResult(null)
//     setUploaded(null)
//     setMatched(null)
//   }, [])

//   async function startProcessing() {
//     if (!file) return alert('Upload an image first')

//     setWorking(true)
//     setProgress(0)
//     setResult(null)

//     try {
//       const form = new FormData()
//       form.append('image', file.file)
//       const up = await uploadApi(form)
//       setUploaded(up.file)

//       const body = { savedName: up.file.savedName || up.file.originalName }
//       const res = await classifyApi(body)
//       const timeMs = res.timeMs || 2000
//       const probs = res.probs || {}
//       setMatched(res.matched || null)

//       const start = Date.now()
//       const end = start + timeMs

//       await new Promise(resolve => {
//         const tick = setInterval(() => {
//           const now = Date.now()
//           const pct = Math.min(100, Math.round(((now - start) / (end - start)) * 100))
//           setProgress(pct)
//           if (now >= end) {
//             clearInterval(tick)
//             setProgress(100)
//             setTimeout(resolve, 300)
//           }
//         }, 80)
//       })

//       setResult(probs)

//     } catch (err) {
//       alert(err?.response?.data?.error || 'Processing failed')
//     } finally {
//       setWorking(false)
//     }
//   }

//   return (
//     <div className="min-h-[calc(100vh-80px)] p-10 relative">
//       <AnimatedBG bgUrl={config.PAGE_BACKGROUNDS['/classify']} routePath="/classify" />
      
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-4xl mx-auto content-on-bg"
//       >
//         <h1 className="text-3xl font-bold">Classify Protein Image</h1>
//         <p className="text-gray-300 mt-2">
//           Upload a protein image to run classification.
//         </p>

//         <div className="mt-6">
//           <FileUploader onFileChange={onFileChange} helperText="Upload PNG/JPG protein images. You can Drap and Drop." />

//           {/* CENTERED classify button */}
//           <div className="mt-8 flex items-center justify-center">
//             <motion.button
//               onClick={startProcessing}
//               whileHover={{ y: -3 }}
//               whileTap={{ scale: 0.98 }}
//               disabled={!file || working}
//               className={`
//                 px-8 py-3 rounded-lg text-lg  
//                 ${!file 
//                   ? "bg-white/5 cursor-not-allowed" 
//                   : "bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] btn-cta"}
//               `}
//             >
//               Classify the Protein
//             </motion.button>
//           </div>

//           {/* Progress */}
//           <div className="mt-6">
//             <ProgressBar progress={progress} />

//             {matched && (
//               <div className="mt-3 text-sm text-gray-300">
//                 Matched rule: <strong className="capitalize">{matched}</strong>
//               </div>
//             )}

//             {uploaded && (
//               <div className="mt-1 text-sm text-gray-300">
//                 Saved as: {uploaded.savedName}
//               </div>
//             )}

//             {/* result */}
//             {result && (
//               <motion.div
//                 initial={{ opacity: 0, y: 6 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="mt-6 card p-6 rounded-2xl"
//               >
//                 <h3 className="font-semibold mb-3">Predicted Probabilities</h3>

//                 <div className="grid gap-3">
//                   {Object.entries(result).map(([k, v]) => (
//                     <div key={k} className="flex items-center gap-4">
//                       <div className="w-28 capitalize font-medium">{k}</div>
//                       <div className="flex-1 bg-white/6 rounded-full h-4 overflow-hidden">
//                         <div
//                           style={{ width: `${(v * 100).toFixed(2)}%` }}
//                           className="h-4 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] transition-all"
//                         ></div>
//                       </div>
//                       <div className="w-16 text-right">{(v * 100).toFixed(2)}%</div>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }


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
  const [matched, setMatched] = useState(null)

  const onFileChange = useCallback((f) => {
    setFile(f)
    setProgress(0)
    setResult(null)
    setUploaded(null)
    setMatched(null)
  }, [])

  async function startProcessing() {
    if (!file) return alert('Upload an image first')

    setWorking(true)
    setProgress(0)
    setResult(null)

    try {
      const form = new FormData()
      form.append('image', file.file)
      const up = await uploadApi(form)
      setUploaded(up.file)

      const body = { savedName: up.file.savedName || up.file.originalName }
      const res = await classifyApi(body)
      const timeMs = res.timeMs || 2000
      const probs = res.probs || {}
      setMatched(res.matched || null)

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

      setResult(probs)

    } catch (err) {
      alert(err?.response?.data?.error || 'Processing failed')
    } finally {
      setWorking(false)
    }
  }

  return (
    // Add padding-top so content starts below the navbar
    <div className="min-h-[calc(100vh-80px)] p-10 pt-24 md:pt-28 relative">
      <AnimatedBG bgUrl={config.PAGE_BACKGROUNDS['/classify']} routePath="/classify" />
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto content-on-bg">
        {/* small top margin so title doesn't touch nav */}
        <h1 className="text-3xl font-bold mt-2 md:mt-4">Classify Protein Image</h1>
        <p className="text-gray-300 mt-2">Upload a protein image to run classification.</p>

        <div className="mt-6">
          <FileUploader onFileChange={onFileChange} helperText={''} />

          {/* CENTERED classify button */}
          <div className="mt-8 flex items-center justify-center">
            <motion.button onClick={startProcessing} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} disabled={!file || working} className={`px-8 py-3 rounded-lg text-lg ${!file ? "bg-white/5 cursor-not-allowed" : "bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] btn-cta"}`}>
              Classify the Protein
            </motion.button>
          </div>

          <div className="mt-6">
            <ProgressBar progress={progress} />
            {matched && <div className="mt-3 text-sm text-gray-300">Matched rule: <strong className="capitalize">{matched}</strong></div>}
            {uploaded && <div className="mt-1 text-sm text-gray-300">Saved as: {uploaded.savedName}</div>}

            {result && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-6 card p-6 rounded-2xl">
                <h3 className="font-semibold mb-3">Predicted Probabilities</h3>
                <div className="grid gap-3">
                  {Object.entries(result).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-4">
                      <div className="w-28 capitalize font-medium">{k}</div>
                      <div className="flex-1 bg-white/6 rounded-full h-4 overflow-hidden">
                        <div style={{ width: `${(v * 100).toFixed(2)}%` }} className="h-4 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] transition-all"></div>
                      </div>
                      <div className="w-16 text-right">{(v * 100).toFixed(2)}%</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
