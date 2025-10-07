"use client"

import { type ReactNode, useEffect, useRef } from "react"

export function SmoothScroll({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let currentScroll = 0
    let targetScroll = 0
    const ease = 0.075

    const smoothScrolling = () => {
      targetScroll = window.scrollY
      currentScroll += (targetScroll - currentScroll) * ease

      if (scrollRef.current) {
        scrollRef.current.style.transform = `translate3d(0, ${-currentScroll}px, 0)`
      }

      requestAnimationFrame(smoothScrolling)
    }

    smoothScrolling()
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full">
      <div ref={scrollRef}>{children}</div>
    </div>
  )
}
