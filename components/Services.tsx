'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  { id: 1, title: "AI-Powered News Analysis", description: "Get insights from our advanced AI algorithms.", icon: "🤖" },
  { id: 2, title: "Real-time Updates", description: "Stay informed with up-to-the-minute news coverage.", icon: "⚡" },
  { id: 3, title: "Personalized News Feed", description: "Receive news tailored to your interests.", icon: "📱" },
  { id: 4, title: "Multi-lingual Support", description: "Access news in multiple African languages.", icon: "🌍" },
  { id: 5, title: "Interactive Data Visualizations", description: "Understand complex issues through intuitive graphics.", icon: "📊" },
]

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="relative h-64">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{services[currentIndex].icon}</div>
                <h3 className="text-2xl font-bold mb-2">{services[currentIndex].title}</h3>
                <p className="text-gray-600">{services[currentIndex].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-8">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              className={`w-3 h-3 rounded-full mx-1 ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}