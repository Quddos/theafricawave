'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Latest News', href: '/#', hasMegaMenu: true },
  { name: 'Opportunity', href: '/#' },
  { name: 'Sponsor us', href: '/#' },
  { name: 'Join Us', href: '/#' },
]

const africaCountries = [
  { name: 'Ghana', flag: 'https://flagcdn.com/w40/gh.png' },
  { name: 'South-Africa', flag: 'https://flagcdn.com/w40/za.png' },
  { name: 'Kenya', flag: 'https://flagcdn.com/w40/ke.png' },
  { name: 'Egypt', flag: 'https://flagcdn.com/w40/eg.png' },
  
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNewsMenuOpen, setIsNewsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isSignedIn, user } = useUser()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/images/africawave.jpg" alt="The African Wave" width={50} height={50} className={`mr-2 ${scrolled ? 'text-gray-800' : 'text-white'}`} />
          <motion.span 
            className={`text-xl font-bold ${scrolled ? 'text-gray-800' : 'text-white'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            The African Wave
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={item.href} className={`text-lg font-medium ${scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'} transition-colors duration-200`}>
                  {item.name}
                </Link>
              </motion.div>
              {item.hasMegaMenu && (
                <div className="absolute left-0 mt-2 w-screen max-w-md bg-white shadow-lg rounded-md overflow-hidden z-50 hidden group-hover:block">
                  <div className="grid grid-cols-3 gap-4 p-4">
                    {africaCountries.map((country) => (
                      <Link key={country.name} href={`/news/${country.name.toLowerCase()}`} className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors duration-200">
                        <Image src={country.flag} alt={country.name} width={24} height={16} className="mr-2" />
                        <span>{country.name}</span>
                      </Link>
                    ))}
                    <Link href="/news" className="col-span-3 text-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-200">
                      More News
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
          <UserButton afterSignOutUrl="/"/>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-gray-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>

        <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal">
                  <button className="px-3 py-2 rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-600">
                    Login
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200">
                    {item.name}
                  </Link>
                  {item.hasMegaMenu && (
                    <button
                      className="ml-4 text-sm text-gray-500"
                      onClick={() => setIsNewsMenuOpen(!isNewsMenuOpen)}
                    >
                      {isNewsMenuOpen ? '▲' : '▼'}
                    </button>
                  )}
                  {item.hasMegaMenu && isNewsMenuOpen && (
                    <motion.div 
                      className="pl-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {africaCountries.map((country) => (
                        <Link key={country.name} href={`/news/${country.name.toLowerCase()}`} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200">
                          <Image src={country.flag} alt={country.name} width={24} height={16} className="inline-block mr-2" />
                          {country.name}
                        </Link>
                      ))}
                      <Link href="/news" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200">
                        More News
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}
              <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal">
                  <button className="px-3 py-2 rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-600">
                    Login
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
              <UserButton afterSignOutUrl="/"/>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </header>
  )
}