'use client'

import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string, filters?: SearchFilters) => void
  isLoading?: boolean
}

export interface SearchFilters {
  fromYear?: string
  toYear?: string
  keyword?: string
  title?: string
  author?: string
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({})
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query, filters)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative group z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-cyan opacity-20 blur-xl rounded-full transition-opacity duration-500 group-hover:opacity-30" />
        
        <div className="relative flex items-center bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-2xl shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-accent-primary/50 focus-within:border-accent-primary">
          <Search className="w-5 h-5 text-gray-400 ml-5 mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search millions of papers via OpenAlex..."
            className="w-full py-4 bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-500 focus:ring-0 text-lg"
            disabled={isLoading}
          />
          
          <div className="flex items-center pr-2 gap-2">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-xl transition-colors ${
                showFilters 
                  ? 'bg-accent-primary/10 text-accent-primary' 
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <Filter size={20} />
            </button>
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="px-6 py-2.5 bg-accent-primary hover:bg-accent-secondary text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? '...' : 'Analyze'}
            </button>
          </div>
        </div>
      </form>

      {/* Expanded Filters (Minimalist) */}
      {showFilters && (
        <div className="mt-4 p-6 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-2xl shadow-xl animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Year Range</label>
              <div className="flex gap-2">
                <input 
                  placeholder="From" 
                  className="w-full p-2 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-lg text-sm"
                  onChange={e => setFilters({...filters, fromYear: e.target.value})}
                />
                <input 
                  placeholder="To" 
                  className="w-full p-2 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-lg text-sm"
                  onChange={e => setFilters({...filters, toYear: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Author</label>
              <input 
                placeholder="Author name" 
                className="w-full p-2 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-lg text-sm"
                onChange={e => setFilters({...filters, author: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Keywords</label>
              <input 
                placeholder="Specific terms" 
                className="w-full p-2 bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-lg text-sm"
                onChange={e => setFilters({...filters, keyword: e.target.value})}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}