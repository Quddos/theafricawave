'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'

const previousNews = [
    { id: 1, title: "Africa's Economic Outlook 2024", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", transcript: "..." },
    { id: 2, title: "Climate Change Impact on African Agriculture", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", transcript: "..." },
    { id: 3, title: "The Rise of African Tech Startups", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", transcript: "..." },
]

export default function PreviousNews() {
    const [selectedNews, setSelectedNews] = useState(previousNews[0])
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [showText, setShowText] = useState(false)
    const [generatedText, setGeneratedText] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        if (newComment.trim()) {
            setComments([...comments, { id: uuidv4(), text: newComment }])
            setNewComment('')
        }
    }

    const handleGenerateText = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/generate-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoTranscript: selectedNews.transcript }),
            })
            const data = await response.json()
            setGeneratedText(data.generatedText)
            setShowText(true)
        } catch (error) {
            console.error('Error generating text:', error)
        }
        setIsLoading(false)
    }

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4 max-h-max">
                <h2 className="text-3xl font-bold text-center mb-8">Updated News</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {showText ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white p-4 rounded shadow"
                            >
                                <h3 className="text-2xl font-bold mb-4">{selectedNews.title}</h3>
                                <p>{generatedText}</p>
                                <button
                                    onClick={() => setShowText(false)}
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Watch Video
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="w-full">
                                    <iframe
                                        src={selectedNews.videoUrl}
                                        title={selectedNews.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-[400px]"
                                    ></iframe>
                                </div>

                                {/* <div className="aspect-w-16 aspect-h-7">
                                    <iframe
                                        src={selectedNews.videoUrl}
                                        title={selectedNews.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div> */}
                                <h3 className="text-2xl font-bold mt-4 mb-2">{selectedNews.title}</h3>
                                <button
                                    onClick={handleGenerateText}
                                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Generating...' : 'Read as Text'}
                                </button>
                            </motion.div>
                        )}

                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            onSubmit={handleCommentSubmit}
                            className="mt-4"
                        >
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Add a comment..."
                            />
                            <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                                Post Comment
                            </button>
                        </motion.form>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4"
                        >
                            <h4 className="text-xl font-bold mb-2">Comments</h4>
                            {comments.map((comment) => (
                                <motion.div
                                    key={comment.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white p-2 rounded mb-2"
                                >
                                    {comment.text}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">More Videos</h3>
                        {previousNews.map((news) => (
                            <motion.div
                                key={news.id}
                                whileHover={{ scale: 1.05 }}
                                className={`cursor-pointer p-2 rounded mb-2 ${selectedNews.id === news.id ? 'bg-blue-100' : 'bg-white'}`}
                                onClick={() => setSelectedNews(news)}
                            >
                                {news.title}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}