'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  animation = 'fadeIn' // fadeIn, slideLeft, slideRight, scale
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  const baseStyles = {
    fadeIn: 'opacity-0 translate-y-6',
    slideLeft: 'opacity-0 -translate-x-8',
    slideRight: 'opacity-0 translate-x-8',
    scale: 'opacity-0 scale-95',
  }

  const visibleStyles = {
    fadeIn: 'opacity-100 translate-y-0',
    slideLeft: 'opacity-100 translate-x-0',
    slideRight: 'opacity-100 translate-x-0',
    scale: 'opacity-100 scale-100',
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? visibleStyles[animation] : baseStyles[animation]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
