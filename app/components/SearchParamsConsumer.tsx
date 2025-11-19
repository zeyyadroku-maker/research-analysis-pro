'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Suspense } from 'react'

type ViewType = 'home' | 'search'

function SearchParamsConsumerContent({
  onViewChange,
}: {
  onViewChange: (view: ViewType) => void
}) {
  const searchParams = useSearchParams()
  const viewParam = searchParams.get('view') as ViewType | null

  // Update view when URL param changes
  useEffect(() => {
    if (viewParam) {
      onViewChange(viewParam)
    }
  }, [viewParam, onViewChange])

  return null // This component just handles side effects
}

export default function SearchParamsConsumer({
  onViewChange,
}: {
  onViewChange: (view: ViewType) => void
}) {
  return (
    <Suspense fallback={null}>
      <SearchParamsConsumerContent onViewChange={onViewChange} />
    </Suspense>
  )
}
