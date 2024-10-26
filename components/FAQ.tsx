"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'

const faqs = [
  {
    question: "How often is the news updated?",
    answer: "Our news is updated in real-time, 24/7, to bring you the latest information as it happens."
  },
  {
    question: "Do you cover news from all African countries?",
    answer: "Yes, we strive to provide comprehensive coverage from all 54 African countries, as well as global news relevant to Africa."
  },
  {
    question: "How does your AI technology enhance news reporting?",
    answer: "Our AI analyzes vast amounts of data to identify trends, fact-check information, and provide deeper insights into news stories."
  },
  {
    question: "Can I contribute news or opinion pieces?",
    answer: "We welcome contributions from journalists and thought leaders. Please visit our 'Join Us' page for more information."
  },
]

export default function FAQ() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-6 bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-4 border-b">
                <div className="flex items-center">
                  <Image src="/logo.png" alt="The African Wave" width={40} height={40} className="rounded-full mr-3" />
                  <div>
                    <h3 className="font-bold">The African Wave</h3>
                    <p className="text-gray-500">@AfricanWave</p>
                  </div>
                </div>
                <p className="mt-2">{faq.question}</p>
              </div>
              <div className="p-4 bg-gray-50">
                <div className="flex items-center">
                  <Image src="/ai-avatar.png" alt="AI Assistant" width={40} height={40} className="rounded-full mr-3" />
                  <div>
                    <h3 className="font-bold">AI Assistant</h3>
                    <p className="text-gray-500">@AIHelper</p>
                  </div>
                </div>
                <p className="mt-2">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}