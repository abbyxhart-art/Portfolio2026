import { useState, useEffect, useRef } from 'react'

const DURATION = 950 // ms for full expand

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function ScrambleLine({ text, startAt = 0 }: { text: string; startAt?: number }) {
  const center = Math.floor(text.length / 2)
  const leftPart = text.slice(0, center)
  const midChar = text[center]
  const rightPart = text.slice(center + 1)
  const maxSteps = Math.max(leftPart.length, rightPart.length)

  const [step, setStep] = useState(-1)
  const rafRef = useRef<number>()
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStep(0)
      const animate = (ts: number) => {
        if (!startTimeRef.current) startTimeRef.current = ts
        const elapsed = ts - startTimeRef.current
        const progress = Math.min(elapsed / DURATION, 1)
        const eased = easeOut(progress)
        setStep(Math.round(eased * maxSteps))
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate)
        } else {
          setStep(maxSteps)
        }
      }
      rafRef.current = requestAnimationFrame(animate)
    }, startAt)

    return () => {
      clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [text, startAt])

  if (step < 0) return <span style={{ opacity: 0 }}>{text}</span>

  const visibleLeft = leftPart.slice(Math.max(0, leftPart.length - step))
  const visibleRight = rightPart.slice(0, step)
  const done = step >= maxSteps

  function edgeStyle(_revealedAtStep: number) {
    return undefined
  }

  return (
    <span>
      {visibleLeft.split('').map((char, i) => {
        const revealedAtStep = visibleLeft.length - i
        return (
          <span key={`l${i}`} style={edgeStyle(revealedAtStep)}>
            {char}
          </span>
        )
      })}
      <span style={edgeStyle(0)}>{midChar}</span>
      {visibleRight.split('').map((char, i) => {
        const revealedAtStep = i + 1
        return (
          <span key={`r${i}`} style={edgeStyle(revealedAtStep)}>
            {char}
          </span>
        )
      })}
    </span>
  )
}

export default function App() {
  const [showMeta, setShowMeta] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowMeta(true), 120 + DURATION + 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        backgroundColor: '#161617',
        fontFamily: "'Inter Tight', sans-serif",
      }}
    >
      <p
        className="absolute -translate-x-1/2 text-center leading-none"
        style={{
          left: 'calc(50% - 8px)',
          top: '111px',
          color: '#faf9ff',
          fontSize: '16px',
          letterSpacing: '0.01em',
          opacity: showMeta ? 1 : 0,
          transition: 'opacity 600ms ease',
        }}
      >
        Abby Hart
      </p>

      <div
        className="absolute -translate-x-1/2 text-center"
        style={{
          left: 'calc(50% - 8px)',
          top: '159px',
          color: '#faf9ff',
          fontSize: '42px',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        <p className="mb-[8px] whitespace-nowrap">
          <ScrambleLine text="a product designer who engineers," startAt={120} />
        </p>
        <p className="whitespace-nowrap">
          <ScrambleLine text="with a focus on systems and execution" startAt={120} />
        </p>
      </div>

      <p
        className="absolute -translate-x-1/2 leading-none text-center"
        style={{
          left: 'calc(50% - 8px)',
          top: '281px',
          color: '#faf9ff',
          fontSize: '16px',
          opacity: showMeta ? 1 : 0,
          transition: 'opacity 600ms ease',
        }}
      >
        brand activation interface with Figma Edu
      </p>
    </div>
  )
}
