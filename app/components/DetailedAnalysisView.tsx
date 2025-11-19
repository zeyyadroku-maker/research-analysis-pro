'use client'

import { AnalysisResult } from '@/app/types'
import { useState, useEffect } from 'react'
import { saveBookmark, removeBookmark, isBookmarked } from '@/app/lib/bookmarks'
import DocumentTypeIndicator from './DocumentTypeIndicator'
import FrameworkAssessmentView from './FrameworkAssessmentView'
import AIDisclaimerBanner from './AIDisclaimerBanner'
import { getFrameworkGuidelines } from '@/app/lib/adaptiveFramework'
import { FolderDown, X, Bookmark, CheckCircle } from 'lucide-react'

interface DetailedAnalysisViewProps {
  analysis: AnalysisResult
  onClose: () => void
}

export default function DetailedAnalysisView({ analysis, onClose }: DetailedAnalysisViewProps) {
  const [isBookmarkedState, setIsBookmarkedState] = useState(false)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    setIsBookmarkedState(isBookmarked(analysis.paper.id))
    return () => window.removeEventListener('keydown', handleEsc)
  }, [analysis.paper.id, onClose])

  const handleBookmark = () => {
    if (isBookmarkedState) {
      removeBookmark(analysis.paper.id)
      setIsBookmarkedState(false)
    } else {
      saveBookmark(analysis)
      setIsBookmarkedState(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-dark-950/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-dark-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slide-up ring-1 ring-white/10">
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 dark:border-dark-700 bg-white dark:bg-dark-900 z-10">
          <div className="flex-1 pr-8">
            <div className="flex gap-2 mb-3">
               <DocumentTypeIndicator
                documentTypeString={analysis.paper.documentType}
                field={analysis.paper.field}
                compact={true}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{analysis.paper.title}</h2>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{analysis.paper.year}</span>
              <span>•</span>
              <span>{analysis.paper.authors.slice(0, 3).join(', ')}</span>
              {analysis.paper.journal && (
                <>
                  <span>•</span>
                  <span className="italic">{analysis.paper.journal}</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={handleBookmark} className={`p-2 rounded-lg transition-colors ${isBookmarkedState ? 'bg-accent-primary text-white' : 'bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-300'}`}>
              <Bookmark size={20} className={isBookmarkedState ? 'fill-current' : ''} />
            </button>
            <button onClick={onClose} className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-dark-950">
          <AIDisclaimerBanner compact={true} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Scores & Bias */}
            <div className="space-y-6">
              {/* Main Score Card */}
              <div className="bg-white dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Credibility Score</h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-5xl font-bold text-accent-primary">{analysis.credibility.totalScore.toFixed(1)}</span>
                  <span className="text-gray-400 mb-2">/ {analysis.credibility.maxTotalScore}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2 mb-4">
                  <div className="bg-accent-primary h-2 rounded-full" style={{ width: `${(analysis.credibility.totalScore / analysis.credibility.maxTotalScore) * 100}%` }} />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Rating: <span className="text-accent-secondary">{analysis.credibility.rating}</span>
                </p>
              </div>

              {/* Framework Breakdown */}
              <FrameworkAssessmentView 
                framework={getFrameworkGuidelines(analysis.paper.documentType as any, analysis.paper.field as any)}
                collapsed={true}
              />

              {/* Bias Analysis */}
              <div className="bg-white dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Bias Detection</h3>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  analysis.bias.overallLevel === 'Low' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  analysis.bias.overallLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  Level: {analysis.bias.overallLevel}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{analysis.bias.justification}</p>
                <div className="space-y-2">
                  {analysis.bias.biases.map((bias, i) => (
                    <div key={i} className="p-3 bg-gray-50 dark:bg-dark-900 rounded border border-gray-100 dark:border-dark-700 text-xs">
                      <div className="flex justify-between font-medium mb-1">
                        <span>{bias.type}</span>
                        <span className="text-accent-tertiary">{bias.severity}</span>
                      </div>
                      <p className="text-gray-500">{bias.evidence}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Findings & Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Key Findings */}
              <div className="bg-white dark:bg-dark-800 p-8 rounded-xl border border-gray-200 dark:border-dark-700 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 bg-accent-cyan/10 rounded-lg text-accent-cyan">
                     <CheckCircle size={24} />
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white">Key Findings</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-accent-primary mb-2">Research Question</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{analysis.keyFindings.researchQuestion}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-dark-900 rounded-xl border border-gray-100 dark:border-dark-700">
                    <div>
                       <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Methodology</h4>
                       <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{analysis.keyFindings.methodology.studyDesign}</p>
                       <p className="text-xs text-gray-500 mt-1">Sample: {analysis.keyFindings.methodology.sampleSize}</p>
                    </div>
                    <div>
                       <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Conclusion</h4>
                       <p className="text-sm text-gray-700 dark:text-gray-300">{analysis.keyFindings.conclusions.primaryConclusion}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Primary Results</h4>
                    <ul className="space-y-3">
                      {analysis.keyFindings.findings.primaryFindings.map((finding, i) => (
                        <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-300">
                          <span className="text-accent-secondary font-bold text-lg leading-none mt-0.5">•</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Research Perspective */}
              <div className="bg-white dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Theoretical Framework</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                   <div>
                     <span className="block text-gray-400 text-xs mb-1">Paradigm</span>
                     <span className="font-medium text-gray-900 dark:text-white">{analysis.perspective.paradigm}</span>
                   </div>
                   <div>
                     <span className="block text-gray-400 text-xs mb-1">Epistemology</span>
                     <span className="font-medium text-gray-900 dark:text-white">{analysis.perspective.epistemologicalStance}</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}