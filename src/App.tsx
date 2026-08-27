import { useState, useEffect, useRef } from 'react'
import './App.css'

type Mood = 'Curious' | 'Zap' | 'Sweat' | 'Ping' | 'Soft' | 'Sad'

const MOODS: Mood[] = ['Curious', 'Zap', 'Sweat', 'Ping', 'Soft', 'Sad']

const MOOD_IMAGES: Record<Mood, string> = {
  Curious: '/star/01-curious.png',
  Zap: '/star/02-zap.png',
  Sweat: '/star/03-sweat.png',
  Ping: '/star/04-ping.png',
  Soft: '/star/05-soft.png',
  Sad: '/star/06-sad.png',
}

const MOOD_CLASSES: Record<Mood, string> = {
  Curious: 'idle-curious',
  Zap: 'idle-zap',
  Sweat: 'idle-sweat',
  Ping: 'idle-ping',
  Soft: 'idle-soft',
  Sad: 'idle-sad',
}

function App() {
  const [mood, setMood] = useState<Mood>('Curious')
  const [isAuto, setIsAuto] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const autoRef = useRef<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--speed', String(speed))
  }, [speed])

  useEffect(() => {
    Object.values(MOOD_IMAGES).forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    if (!isAuto) {
      if (autoRef.current) {
        clearInterval(autoRef.current)
        autoRef.current = null
      }
      return
    }

    const intervalMs = 2400 / speed
    autoRef.current = window.setInterval(() => {
      setMood((current) => MOODS[(MOODS.indexOf(current) + 1) % MOODS.length])
    }, intervalMs)

    return () => {
      if (autoRef.current) {
        clearInterval(autoRef.current)
        autoRef.current = null
      }
    }
  }, [isAuto, speed])

  const handleMoodClick = (newMood: Mood) => {
    if (isAuto) setIsAuto(false)
    setMood(newMood)
  }

  const starClasses = [
    'star',
    !prefersReducedMotion ? MOOD_CLASSES[mood] : '',
  ].filter(Boolean).join(' ')

  return (
    <div className="stage">
      <div className="star-container">
        <div className={starClasses}>
          {MOODS.map((m) => (
            <img
              key={m}
              src={MOOD_IMAGES[m]}
              alt=""
              className={m === mood ? 'on' : ''}
              draggable={false}
            />
          ))}
        </div>
        <p className="caption">{mood}</p>
      </div>

      <div className="controls">
        <div className="mood-buttons">
          {MOODS.map((m) => (
            <button
              key={m}
              className={`mood-btn ${mood === m ? 'active' : ''}`}
              onClick={() => handleMoodClick(m)}
              type="button"
            >
              {m}
            </button>
          ))}
        </div>

        <div className="auto-speed">
          <button
            className={`auto-btn ${isAuto ? 'active' : ''}`}
            onClick={() => setIsAuto(!isAuto)}
            type="button"
          >
            Auto
          </button>

          <div className="speed-control">
            <label htmlFor="speed">Speed</label>
            <input
              id="speed"
              type="range"
              min="0.6"
              max="1.6"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
            />
            <span className="speed-value">{speed.toFixed(1)}x</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
