'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import YouTube from 'react-youtube'
import { FaComment } from 'react-icons/fa'

const videos = [ 
  { id: 'kVi6U3z_xRM', title: 'The Africa Wave - Ethiopia Solomon' },
  { id: '-TAI9vmJHtE', title: "Russia Not Our Ally: Ramaphosa's Coalition Partner DA reacts strongly " },
  { id: 'i7KjiIMXLTk', title: "The state of Ghana's Parliament " },
]

export default function PreviousNews() {
  const [activeVideo, setActiveVideo] = useState(videos[0])
  const [comments, setComments] = useState<{ [key: string]: string[] }>({})
  const [newComment, setNewComment] = useState('')
  const [showText, setShowText] = useState(false)
  const [aiGeneratedText, setAiGeneratedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)



  useEffect(() => {
    const generateAIContent = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/ai-text-generation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: `Summarize the key points of a video titled: ${activeVideo.title}` })
        })
        const data = await response.json()
        setAiGeneratedText(data.content)
      } catch (error) {
        console.error('Error generating AI content:', error)
        setAiGeneratedText('Failed to generate AI content. Please try again.')
      }
      setIsLoading(false)
    }
    generateAIContent()
  }, [activeVideo])

  // Update the useEffect hook in the PreviousNews component
useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/comments?videoId=${activeVideo.id}`)
      const data = await response.json()
      setComments(prev => ({ ...prev, [activeVideo.id]: data.comments }))
    }
    fetchComments()
  }, [activeVideo])
  
  // Update the handleCommentSubmit function
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId: activeVideo.id, comment: newComment })
      })
      const data = await response.json()
      setComments(prev => ({ ...prev, [activeVideo.id]: data.comments }))
      setNewComment('')
    }
  }


  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Previous News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {showText ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4">{activeVideo.title}</h3>
                {isLoading ? (
                  <p>Generating AI content...</p>
                ) : (
                  <p className="text-gray-700">{aiGeneratedText}</p>
                )}
                <button
                  onClick={() => setShowText(false)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Watch Video
                </button>
              </motion.div>
            ) : (
              <div>
                <YouTube
                  videoId={activeVideo.id}
                  opts={{
                    height: '390',
                    width: '100%',
                    playerVars: {
                      autoplay: 0,
                    },
                  }}
                />
                <h3 className="text-xl font-semibold mt-4">{activeVideo.title}</h3>
                <button
                  onClick={() => setShowText(true)}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Read as Text
                </button>
              </div>
            )}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Comments</h4>
              <ul className="space-y-2">
                {comments[activeVideo.id]?.map((comment, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-100 p-2 rounded"
                  >
                    {comment}
                  </motion.li>
                ))}
              </ul>
              <form onSubmit={handleCommentSubmit} className="mt-4">
                <div className="flex">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-grow border rounded-l px-2 py-1"
                  />
                  <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-r">
                    <FaComment />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">More Videos</h3>
            <ul className="space-y-4">
              {videos.map((video) => (
                <motion.li
                  key={video.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                  onClick={() => setActiveVideo(video)}
                >
                  <div className="bg-gray-200 p-2 rounded">
                    <h4 className="font-medium">{video.title}</h4>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}