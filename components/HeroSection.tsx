'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const newsItems = [
  { title: "Breaking: Major Economic Summit in Nairobi", content: "Leaders from across Africa gather to discuss continental trade policies.", icon: "📊" },
  { title: "Tech Innovation: Lagos Startup Revolutionizes Healthcare", content: "New AI-powered diagnostic tool shows promising results in rural areas.", icon: "🤖" },
  { title: "Cultural Celebration: Festival of Arts Kicks Off in Cairo", content: "Thousands flock to experience the rich tapestry of African creativity.", icon: "🎨" },
]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-white text-center max-w-4xl px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-6xl mb-4 block">{newsItems[currentIndex].icon}</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {newsItems[currentIndex].title}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {newsItems[currentIndex].content}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg className="w-12 h-12 text-white animate-bounce" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  )
}