'use client'

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Something went wrong!",
  description: "An unexpected error occurred.",
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-red-300 mb-4">500</h1>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Something went wrong!</h2>
              <p className="text-gray-600 mb-8">
                An unexpected error occurred while loading the component library.
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={reset}
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try again
              </button>
              
              <div className="text-sm text-gray-500">
                <p>If the problem persists, please check your connection and try again.</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
} 