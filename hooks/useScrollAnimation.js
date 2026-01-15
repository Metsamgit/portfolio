'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once visible, stop observing (animation plays once)
          if (ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options.threshold, options.rootMargin])

  return { ref, isVisible }
}

// Pre-built animation classes
export const animations = {
  fadeIn: 'opacity-0 translate-y-4',
  fadeInVisible: 'opacity-100 translate-y-0',
  slideLeft: 'opacity-0 -translate-x-8',
  slideLeftVisible: 'opacity-100 translate-x-0',
  slideRight: 'opacity-0 translate-x-8',
  slideRightVisible: 'opacity-100 translate-x-0',
  scale: 'opacity-0 scale-95',
  scaleVisible: 'opacity-100 scale-100',
}
