'use client'

import { useEffect, useRef, useState } from 'react'

function TimelineItem({ item, index, totalItems }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Délai décalé pour effet stagger
          setTimeout(() => {
            setIsVisible(true)
          }, index * 150)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className={`relative flex gap-6 items-start transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-50'
      }`}
      style={{
        transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
        transitionDelay: `${index * 50}ms`
      }}
    >
      {/* Point de la timeline */}
      <div
        className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${
          isVisible
            ? item.current
              ? 'bg-cyber-blue border-cyber-blue shadow-[0_0_15px_rgba(0,212,255,0.5)]'
              : 'bg-cyber-dark border-cyber-blue/50'
            : 'bg-cyber-dark border-gray-600'
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full transition-all duration-700 ${
            isVisible
              ? item.current
                ? 'bg-white'
                : 'bg-cyber-blue/50'
              : 'bg-gray-600'
          }`}
        />
      </div>

      <div className="flex-1 pb-8">
        <div className="flex items-center gap-3 mb-1">
          {/* Date */}
          <span
            className={`font-mono text-sm transition-all duration-700 ${
              isVisible ? 'text-cyber-blue' : 'text-gray-600'
            }`}
          >
            {item.year}
          </span>

          {/* Badge "En cours" */}
          {item.current && (
            <span
              className={`px-2 py-0.5 text-xs rounded-full font-medium transition-all duration-700 ${
                isVisible
                  ? 'bg-cyber-blue/10 text-cyber-blue'
                  : 'bg-gray-800 text-gray-600'
              }`}
            >
              En cours
            </span>
          )}
        </div>

        {/* Titre */}
        <h3
          className={`font-semibold mb-1 transition-all duration-700 ${
            isVisible ? 'text-white' : 'text-gray-500'
          }`}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p
          className={`text-sm transition-all duration-700 ${
            isVisible ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {item.desc}
        </p>
      </div>
    </div>
  )
}

export default function AnimatedTimeline({ items }) {
  const lineRef = useRef(null)
  const [fillPercent, setFillPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!lineRef.current) return

      const rect = lineRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculer le pourcentage de remplissage basé sur le scroll
      if (rect.top > windowHeight) {
        setFillPercent(0)
      } else if (rect.bottom < 0) {
        setFillPercent(100)
      } else {
        const visibleTop = Math.max(0, windowHeight - rect.top)
        const totalHeight = rect.height + windowHeight
        const percent = Math.min(100, (visibleTop / totalHeight) * 150)
        setFillPercent(percent)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={lineRef} className="relative space-y-6">
      {/* Ligne de timeline avec effet de remplissage */}
      <div
        className="absolute left-4 top-0 bottom-0 w-0.5 transition-all duration-300"
        style={{
          background: `linear-gradient(to bottom, #00d4ff ${fillPercent}%, #374151 ${fillPercent}%)`,
        }}
      />

      {/* Items */}
      {items.map((item, i) => (
        <TimelineItem
          key={i}
          item={item}
          index={i}
          totalItems={items.length}
        />
      ))}
    </div>
  )
}
