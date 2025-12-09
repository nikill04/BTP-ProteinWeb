// client/src/components/AnimatedBG.jsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import config from '../config'

/**
 * AnimatedBG
 * props:
 *  - bgUrl: string path to image (e.g. '/images/landing.jpg')
 *  - routePath: (optional) the route path used to pick speed if you prefer
 *
 * Behavior:
 *  - preloads bgUrl, only shows image layer after loaded
 *  - uses CSS keyframes bg-pan-zoom from index.css
 *  - sets animationDuration inline based on config.PAGE_BG_SPEED[routePath] or passed speed
 *  - adds subtle mouse-based parallax to blobs
 */
export default function AnimatedBG({ bgUrl, routePath }) {
  const [loaded, setLoaded] = useState(false)
  const [err, setErr] = useState(null)
  const [resolvedUrl, setResolvedUrl] = useState(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  // resolve speed: if routePath given, consult config.PAGE_BG_SPEED, else default 32s
  const defaultSpeed = 32
  const routeSpeed = routePath && config.PAGE_BG_SPEED && config.PAGE_BG_SPEED[routePath]
  const speedSeconds = routeSpeed || defaultSpeed

  useEffect(() => {
    setLoaded(false)
    setErr(null)
    setResolvedUrl(null)

    if (!bgUrl) return

    try {
      const isAbs = /^\/|^https?:\/\//.test(bgUrl)
      const finalUrl = isAbs ? bgUrl : new URL(bgUrl, import.meta.env.BASE_URL).href
      setResolvedUrl(finalUrl)

      const img = new Image()
      img.onload = () => {
        setLoaded(true)
        // small debug
        // console.log('[AnimatedBG] loaded', finalUrl)
      }
      img.onerror = (e) => {
        setErr(`Failed to load: ${finalUrl}`)
        console.warn('[AnimatedBG] image load error', e)
      }
      img.src = finalUrl
    } catch (e) {
      setErr(String(e))
      console.warn('[AnimatedBG] error resolving bgUrl', e)
    }
  }, [bgUrl])

  // mouse parallax (subtle)
  useEffect(() => {
    function onMove(e) {
      setMouse({ x: (e.clientX / window.innerWidth) - 0.5, y: (e.clientY / window.innerHeight) - 0.5 })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // blob transform influenced by mouse position
  const blob1 = {
    x: -72 + mouse.x * 18,
    y: -72 + mouse.y * 18,
    rotate: mouse.x * 6
  }
  const blob2 = {
    x: 0 + mouse.x * -10,
    y: 0 + mouse.y * -8,
    rotate: mouse.y * 6
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* background image layer: only show once preloaded */}
      {resolvedUrl && loaded && !err && (
        <div className="page-bg" aria-hidden="true">
          <div
            className="page-bg-inner"
            style={{
              backgroundImage: `url("${resolvedUrl}")`,
              /* set the loop duration in seconds from config; CSS animation-name is bg-pan-zoom */
              animationDuration: `${speedSeconds}s`,
            }}
          />
          <div className="page-bg-overlay" />
          <div className="page-bg-vignette" />
          <div className="page-bg-dots" />
        </div>
      )}

      {err && (
        <div style={{ position: 'absolute', left: 12, top: 12, zIndex: 60 }}>
          <div style={{ padding: 8, borderRadius: 6, background: 'rgba(255,0,0,0.10)', color: 'white', fontSize: 12 }}>
            Background load error — check console. ({String(err).slice(0, 80)}...)
          </div>
        </div>
      )}

      {/* soft animated blobs with subtle parallax */}
      <motion.div
        animate={{ x: blob1.x, y: blob1.y, rotate: blob1.rotate }}
        transition={{ duration: speedSeconds / 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-72 -top-72 w-[900px] h-[900px] bg-gradient-to-tr from-[#7c3aed]/24 to-[#06b6d4]/12 rounded-full blur-3xl blob"
      />
      <motion.div
        animate={{ x: blob2.x, y: blob2.y, rotate: blob2.rotate }}
        transition={{ duration: speedSeconds / 1.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#ef4444]/10 to-[#f59e0b]/06 rounded-3xl blur-3xl blob"
      />
    </div>
  )
}
