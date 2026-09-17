import { Suspense } from 'react'
import { QuoteForm } from './QuoteForm'
import { QuoteFormPreset } from './QuoteFormPreset'

// QuoteFormPreset reads searchParams, so it must be in a Suspense boundary
export function QuoteFormWrapper() {
  return (
    <Suspense fallback={<QuoteForm />}>
      <QuoteFormPreset />
    </Suspense>
  )
}
