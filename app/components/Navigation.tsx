'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/app/providers/ThemeProvider'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Moon, Sun, Menu, X } from 'lucide-react'

interface NavigationProps {
  onLogoClick?: () => void
}

export default function Navigation({ onLogoClick }: NavigationProps) {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onLogoClick) onLogoClick()
    setMobileMenuOpen(false)
    router.push('/')
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-dark-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-dark-700/50 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-all">
              <Image
                src={theme === 'light' ? '/lightmode.png' : '/darkmode.png'}
                alt="Syllogos Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              Syllogos
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { name: 'Search', href: '/search' },
              { name: 'Insights', href: '/insights' },
              { name: 'Bookmarks', href: '/bookmarks' },
              { name: 'About', href: '/about' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-accent-primary/10 text-accent-primary'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="w-px h-6 bg-gray-200 dark:bg-dark-700 mx-2" />

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-900 dark:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700 shadow-xl animate-slide-up">
          <div className="px-4 py-6 space-y-2">
             {[
              { name: 'Search Papers', href: '/search' },
              { name: 'Insights', href: '/insights' },
              { name: 'Bookmarks', href: '/bookmarks' },
              { name: 'About Us', href: '/about' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-800"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}