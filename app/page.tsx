'use client'

import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'

// Counter animation component
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = target / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [target])

  return <span>{count}{suffix}</span>
}

export default function Home() {

  return (
    <main className="min-h-screen bg-white dark:bg-dark-900 transition-colors">
      {/* Navigation */}
      <Navigation onLogoClick={() => window.location.href = '/'} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            The AI That Shows Its Work
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto mb-3">
            Confidence scores for every claim. Evidence for every assessment. Transparency over hype.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-4">
            Evaluate research credibility with AI built to complement expert judgment, not replace it.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            Designed collaboratively with 20+ researchers who demanded more than black-box AI.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="mb-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Stat 1: Bias Types */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-dark-800 dark:to-dark-900 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent-blue/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-accent-blue to-blue-600 bg-clip-text text-transparent mb-3">
                  <AnimatedCounter target={8} />
                </div>
                <div className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white mb-1">Bias Types</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Systematically Detected</div>
              </div>
            </div>

            {/* Stat 2: Credibility Factors */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-dark-800 dark:to-dark-900 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                  <AnimatedCounter target={6} />
                </div>
                <div className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white mb-1">Credibility Factors</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Transparently Weighted</div>
              </div>
            </div>

            {/* Stat 3: Researchers */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-dark-800 dark:to-dark-900 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
                  <AnimatedCounter target={20} suffix="+" />
                </div>
                <div className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white mb-1">Researchers</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Collaborative Design</div>
              </div>
            </div>

            {/* Stat 4: Confidence Scores */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-dark-800 dark:to-dark-900 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
                  <AnimatedCounter target={100} suffix="%" />
                </div>
                <div className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white mb-1">Confidence Scores</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Every Assessment</div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How It Works
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Upload or Search
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Upload a PDF or search by title, author, or DOI.
                  </p>
                  <span className="text-xs font-medium text-accent-blue">~30 seconds</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    AI Evaluates
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    AI assesses credibility, bias, and methodology—adapting to your paper&apos;s field automatically.
                  </p>
                  <span className="text-xs font-medium text-purple-600">~60 seconds</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Review Results
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    View confidence scores, evidence-backed reasoning, and clear limitations for every assessment.
                  </p>
                  <span className="text-xs font-medium text-emerald-600">~5 minutes to review</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1: Confidence Scores */}
            <div className="p-6 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent-blue/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Confidence Scores</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">See exactly how certain the AI is about each assessment.</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Every evaluation includes a confidence percentage (High/Medium/Low/Uncertain). We show you what we know, what we think, and what we can&apos;t reliably assess—no false confidence.</p>
            </div>

            {/* Feature 2: Shows Its Work */}
            <div className="p-6 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-purple-600/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Shows Its Work</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Understand the reasoning and evidence behind every score.</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">No black-box verdicts. Each credibility score, bias flag, and assessment includes specific evidence from the paper, clear reasoning, and references to methodology. You see exactly why we reached each conclusion.</p>
            </div>

            {/* Feature 3: Adaptive Framework */}
            <div className="p-6 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-emerald-600/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Adaptive Framework</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Evaluation criteria automatically adjust to your academic discipline.</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">A medical study needs different scrutiny than a humanities essay. Our AI detects your paper&apos;s field and adapts its evaluation weights—emphasizing statistical validity for empirical work, or source quality for reviews.</p>
            </div>

            {/* Feature 4: Citation Verification */}
            <div className="p-6 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Citation Verification</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Confirms references exist and aren&apos;t AI hallucinations.</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">We verify that cited works are real publications, not fabricated references. This catches AI-generated papers that cite non-existent sources, a growing problem in academic integrity that traditional peer review often misses.</p>
            </div>

            {/* Feature 5: Bias Analysis */}
            <div className="p-6 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-orange-600/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bias Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Identifies eight types of bias with evidence-backed severity ratings.</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Detects selection bias, confirmation bias, funding conflicts, demographic gaps, and more. Each flagged bias includes severity (Low/Medium/High), specific evidence from the text, and our confidence level in that detection.</p>
            </div>

            {/* Feature 6: Export Analysis */}
            <div className="p-6 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-pink-600/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Export Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Save and share comprehensive evaluations with colleagues.</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Download full analysis reports including all credibility scores, bias assessments, methodology evaluation, and evidence. Perfect for research teams, grant reviewers, or building your own paper database with quality metrics.</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What Researchers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1: Transparency/Trust */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-dark-800 dark:to-dark-900 border border-gray-200 dark:border-dark-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <svg className="w-8 h-8 text-accent-blue/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-700 dark:text-gray-300 text-base mb-6 leading-relaxed">
                &quot;The confidence percentages changed everything. I can finally see where the AI is guessing versus where it&apos;s certain about the evidence.&quot;
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-900 dark:text-white">Postdoctoral Researcher</div>
                <div className="text-gray-500 dark:text-gray-400">Neuroscience, Medical Research Institute</div>
              </div>
            </div>

            {/* Testimonial 2: Field-Specific */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-dark-800 dark:to-dark-900 border border-gray-200 dark:border-dark-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <svg className="w-8 h-8 text-purple-600/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-700 dark:text-gray-300 text-base mb-6 leading-relaxed">
                &quot;It actually understands qualitative research. Most tools try to score everything like a lab experiment, but this one gets ethnographic methods.&quot;
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-900 dark:text-white">Associate Professor</div>
                <div className="text-gray-500 dark:text-gray-400">Anthropology, Liberal Arts College</div>
              </div>
            </div>

            {/* Testimonial 3: Time-Saving */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-dark-800 dark:to-dark-900 border border-gray-200 dark:border-dark-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <svg className="w-8 h-8 text-emerald-600/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-700 dark:text-gray-300 text-base mb-6 leading-relaxed">
                &quot;I used to spend hours screening papers before diving deep. Now I can filter out weak methodology in minutes and focus on promising studies.&quot;
              </p>
              <div className="text-sm">
                <div className="font-semibold text-gray-900 dark:text-white">Research Associate</div>
                <div className="text-gray-500 dark:text-gray-400">Environmental Science, Government Lab</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
