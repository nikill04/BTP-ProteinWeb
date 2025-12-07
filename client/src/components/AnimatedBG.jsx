// client/src/components/AnimatedBG.jsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * AnimatedBG
 * - bgUrl: a string like '/images/landing.jpg' OR a full URL 'https://...'
 * - Preloads the image and logs helpful debug messages if the file is missing.
 */
export default function AnimatedBG({ bgUrl }) {
  const [loaded, setLoaded] = useState(false)
  const [err, setErr] = useState(null)
  const [resolvedUrl, setResolvedUrl] = useState(null)

  useEffect(() => {
    setLoaded(false)
    setErr(null)
    setResolvedUrl(null)

    if (!bgUrl) {
      // nothing to load — keep blobs only
      return
    }

    // Resolve possible relative urls for Vite public folder
    try {
      // if bgUrl starts with '/' or 'http', use as-is, otherwise resolve relative to base.
      const isAbs = /^\/|^https?:\/\//.test(bgUrl)
      const finalUrl = isAbs ? bgUrl : new URL(bgUrl, import.meta.env.BASE_URL).href
      setResolvedUrl(finalUrl)

      // preload
      const img = new Image()
      img.onload = () => {
        setLoaded(true)
        console.log('[AnimatedBG] background image loaded:', finalUrl)
      }
      img.onerror = (e) => {
        setErr(`Failed to load background image: ${finalUrl}`)
        console.warn('[AnimatedBG] failed to load background image:', finalUrl, e)
      }
      img.src = finalUrl
    } catch (e) {
      setErr(String(e))
      console.warn('[AnimatedBG] error resolving bgUrl', bgUrl, e)
    }
  }, [bgUrl])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Only render the image layer when preloaded successfully */}
      {resolvedUrl && loaded && !err && (
        <div className="page-bg">
          <div
            className="page-bg-inner"
            style={{
              // ensure proper quoting for paths with spaces
              backgroundImage: `url("${resolvedUrl}")`,
            }}
          />
          <div className="page-bg-overlay" />
          <div className="page-bg-vignette" />
        </div>
      )}

      {/* If an image failed to load, log a visible overlay so you notice */}
      {err && (
        <div style={{ position: 'absolute', left: 12, top: 12, zIndex: 60 }}>
          <div style={{ padding: 8, borderRadius: 6, background: 'rgba(255,0,0,0.12)', color: 'white', fontSize: 12 }}>
            Background load error — check console. ({String(err).slice(0, 80)}...)
          </div>
        </div>
      )}

      {/* Animated soft blobs */}
      <motion.div
        initial={{ scale: 1, rotate: 0, x: -40, y: -60 }}
        animate={{ rotate: 360, x: -10, y: -20 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute -left-72 -top-72 w-[900px] h-[900px] bg-gradient-to-tr from-[#7c3aed]/20 to-[#06b6d4]/10 rounded-full blur-3xl blob"
      />
      <motion.div
        initial={{ x: 0, y: 0, rotate: 0 }}
        animate={{ x: 40, y: -40, rotate: 6 }}
        transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#ef4444]/10 to-[#f59e0b]/06 rounded-3xl blur-3xl blob"
      />
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 10% 20%, rgba(124,58,237,0.06) 0 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(59,130,246,0.04) 0 1px, transparent 1px)',
          backgroundSize: '40px 40px, 60px 60px',
        }}
      />
    </div>
  )
}
