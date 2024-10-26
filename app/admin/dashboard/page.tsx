// app/admin/dashboard/page.tsx
'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('posts')
  const [posts, setPosts] = useState([
    { id: 1, title: 'New Economic Policy in Nigeria', status: 'published' },
    { id: 2, title: 'Tech Innovation in Kenya', status: 'draft' },
  ])
  const [newPost, setNewPost] = useState({ title: '', content: '', type: 'blog' })

  if (!user || user.publicMetadata.role !== 'admin') {
    return <div>Access Denied</div>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the new post to your backend API
    console.log('New post:', newPost)
    setPosts([...posts, { id: posts.length + 1, title: newPost.title, status: 'draft' }])
    setNewPost({ title: '', content: '', type: 'blog' })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`${
                    activeTab === 'posts'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Posts
                </button>
                <button
                  onClick={() => setActiveTab('new')}
                  className={`${
                    activeTab === 'new'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ml-8`}
                >
                  New Post
                </button>
              </nav>
            </div>
            <div className="mt-6">
              {activeTab === 'posts' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Posts</h2>
                  <ul className="divide-y divide-gray-200">
                    {posts.map((post) => (
                      <li key={post.id} className="py-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{post.title}</p>
                          <p className="text-sm text-gray-500">{post.status}</p>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Edit
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
              {activeTab === 'new' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-lg font-medium text-gray-900 mb-4">New Post</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                      </label>
                      <textarea
                        id="content"
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        rows={4}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Type
                      </label>
                      <select
                        id="type"
                        value={newPost.type}
                        onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="blog">Blog</option>
                        <option value="news">News</option>
                      </select>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Create Post
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}