'use client'

import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Link from 'next/link'

// Enhanced animated counter with easing
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const duration = 2000
      
      if (progress < duration) {
        const nextCount = Math.min(target, Math.floor((progress / duration) * target))
        setCount(nextCount)
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [target])

  return <span>{count}{suffix}</span>
}

export default function Home() {
  return (
    <main className="flex-1">
      <Navigation onLogoClick={() => window.location.href = '/'} />

      {/* Hero Section */}
      <div className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-dark-950/50 dark:to-dark-950 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
            </span>
            New: OpenAlex Database Integration
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 animate-slide-up [animation-delay:100ms]">
            Research with <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-cyan">
              Radical Transparency
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed animate-slide-up [animation-delay:200ms]">
            The first AI analysis platform that admits uncertainty. We evaluate papers with adaptive frameworks, detecting bias and scoring credibility with verified evidence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up [animation-delay:300ms]">
            <Link
              href="/search"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Analyzing Free
            </Link>
            <Link
              href="/#how-it-works"
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-900 dark:text-white rounded-xl font-semibold transition-all duration-200"
            >
              View Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section (Glassmorphism) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Bias Types Detected", value: 8, color: "text-accent-cyan" },
            { label: "Adaptive Factors", value: 6, color: "text-accent-secondary" },
            { label: "Researcher Partners", value: 20, suffix: "+", color: "text-accent-tertiary" },
            { label: "Confidence Score", value: 100, suffix: "%", color: "text-accent-primary" },
          ].map((stat, idx) => (
            <div key={idx} className="glass dark:bg-dark-800/40 p-6 rounded-2xl text-center border border-white/20 dark:border-white/10 backdrop-blur-md shadow-sm hover:shadow-md transition-all">
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Researchers Trust Syllogos</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Built differently. We don&apos;t just summarize; we scrutinize.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Confidence Metrics",
              desc: "Every claim comes with a confidence percentage. We highlight what we know and flag what we're guessing.",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ),
              gradient: "from-blue-500/20 to-cyan-500/20"
            },
            {
              title: "Field-Adaptive",
              desc: "Physics papers aren't judged like History essays. Our framework automatically detects the field and adjusts criteria.",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              ),
              gradient: "from-purple-500/20 to-pink-500/20"
            },
            {
              title: "Bias Radar",
              desc: "We scan for 8 distinct types of bias, from funding conflicts to selection bias, providing evidence for each flag.",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              ),
              gradient: "from-orange-500/20 to-red-500/20"
            }
          ].map((feature, i) => (
            <div key={i} className="group relative bg-white dark:bg-dark-800 rounded-2xl p-8 border border-gray-100 dark:border-dark-700 hover:border-gray-200 dark:hover:border-dark-600 transition-all duration-300 hover:shadow-xl overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-dark-700 flex items-center justify-center mb-6 text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer (simplified) */}
      <footer className="border-t border-gray-200 dark:border-dark-800 bg-white dark:bg-dark-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            © 2025 Syllogos. All rights reserved.
          </div>
          <div className="flex gap-6">
             {['Privacy', 'Terms', 'Contact'].map(item => (
               <Link key={item} href={`/${item.toLowerCase()}`} className="text-gray-500 dark:text-gray-400 hover:text-accent-primary transition-colors text-sm">
                 {item}
               </Link>
             ))}
          </div>
        </div>
      </footer>
    </main>
  )
}