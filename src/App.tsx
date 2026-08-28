import { useState, useEffect, useRef } from "react"
import "./App.css"

type Mood = "Curious" | "Zap" | "Sweat" | "Ping" | "Soft" | "Sad"

const MOODS: Mood[] = ["Curious", "Zap", "Sweat", "Ping", "Soft", "Sad"]

const MOOD_IMAGES: Record<Mood, string> = {
  Curious: "/star/01-curious.png",
  Zap: "/star/02-zap.png",
  Sweat: "/star/03-sweat.png",
  Ping: "/star/04-ping.png",
  Soft: "/star/05-soft.png",
  Sad: "/star/06-sad.png",
}

const JUMP_FRAMES = [
  "/star/jump/01.webp",
  "/star/jump/02.webp",
  "/star/jump/03.webp",
  "/star/jump/04.webp",
  "/star/jump/05.webp",
  "/star/jump/06.webp",
  "/star/jump/07.webp",
  "/star/jump/08.webp",
]

const JUMP_STEPS = [
  { ms: 70, y: 0 },
  { ms: 70, y: 0 },
  { ms: 80, y: 4 },
  { ms: 70, y: -48 },
  { ms: 90, y: -108 },
  { ms: 70, y: -48 },
  { ms: 80, y: 6 },
  { ms: 90, y: 0 },
]

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function App() {
  const [mood, setMood] = useState<Mood>("Curious")
  const [isAuto, setIsAuto] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [pop, setPop] = useState(false)
  const [jumping, setJumping] = useState(false)
  const [jumpFrame, setJumpFrame] = useState(0)
  const [jumpY, setJumpY] = useState(0)
  const autoRef = useRef<number | null>(null)
  const firstMood = useRef(true)
  const skipPop = useRef(false)
  const speedRef = useRef(speed)
  speedRef.current = speed

  useEffect(() => {
    document.documentElement.style.setProperty("--speed", String(speed))
  }, [speed])

  useEffect(() => {
    Object.values(MOOD_IMAGES).forEach((src) => {
      const img = new Image()
      img.src = src
    })
    const pupils = new Image()
    pupils.src = "/star/01-curious-pupils.png"
    JUMP_FRAMES.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    if (firstMood.current) {
      firstMood.current = false
      return
    }
    if (skipPop.current) {
      skipPop.current = false
      return
    }
    setPop(true)
    const t = window.setTimeout(() => setPop(false), 720)
    return () => window.clearTimeout(t)
  }, [mood])

  useEffect(() => {
    if (!isAuto) {
      if (autoRef.current) {
        clearInterval(autoRef.current)
        autoRef.current = null
      }
      return
    }

    const intervalMs = 2800 / speed
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

  useEffect(() => {
    if (!jumping) return

    let cancelled = false
    let timer = 0
    let i = 0

    const play = () => {
      if (cancelled) return
      setJumpFrame(i)
      setJumpY(JUMP_STEPS[i].y)
      const wait = JUMP_STEPS[i].ms / speedRef.current
      timer = window.setTimeout(() => {
        if (i >= JUMP_STEPS.length - 1) {
          setJumping(false)
          setJumpFrame(0)
          setJumpY(0)
          setMood("Curious")
        } else {
          i += 1
          play()
        }
      }, wait)
    }

    play()
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [jumping])

  const handleMoodClick = (newMood: Mood) => {
    if (jumping) return
    if (isAuto) setIsAuto(false)
    setMood(newMood)
  }

  const handleJump = () => {
    if (jumping) return
    if (isAuto) setIsAuto(false)
    skipPop.current = true
    setMood("Curious")
    if (prefersReducedMotion()) {
      setJumping(false)
      setJumpFrame(0)
      setJumpY(0)
      return
    }
    setJumpFrame(0)
    setJumpY(0)
    setJumping(true)
  }

  const starClass =
    "star" +
    (jumping ? " jumping" : "") +
    (pop && !jumping ? " pop" : "")

  return (
    <div className="stage" data-mood={mood.toLowerCase()}>
      <div className="star-container">
        <div className={starClass} data-mood={mood.toLowerCase()}>
          {MOODS.map((m) => (
            <img
              key={m}
              src={MOOD_IMAGES[m]}
              alt=""
              className={"face face-" + m.toLowerCase() + (m === mood && !jumping ? " on" : "")}
              draggable={false}
            />
          ))}
          <img
            className={"pupils" + (mood === "Curious" && !jumping ? " on" : "")}
            src="/star/01-curious-pupils.png"
            alt=""
            draggable={false}
          />
          <img
            className={"jumper" + (jumping ? " on" : "")}
            src={JUMP_FRAMES[jumpFrame]}
            alt=""
            draggable={false}
            style={{ transform: "translateX(-50%) translateY(" + jumpY + "px)" }}
          />
          <div className="fx" aria-hidden>
            <span className="bit" />
            <span className="bit" />
            <span className="bit" />
            <span className="bit" />
            <span className="bit" />
            <span className="bit" />
          </div>
        </div>
        <p className="caption">{jumping ? "Jump" : mood}</p>
      </div>

      <div className="controls">
        <div className="mood-buttons">
          {MOODS.map((m) => (
            <button
              key={m}
              className={"mood-btn" + (mood === m && !jumping ? " active" : "")}
              onClick={() => handleMoodClick(m)}
              type="button"
              disabled={jumping}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="auto-speed">
          <button
            className={"auto-btn" + (isAuto ? " active" : "")}
            onClick={() => setIsAuto(!isAuto)}
            type="button"
            disabled={jumping}
          >
            Auto
          </button>

          <button
            className={"jump-btn" + (jumping ? " active" : "")}
            onClick={handleJump}
            type="button"
            disabled={jumping}
          >
            Jump
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
