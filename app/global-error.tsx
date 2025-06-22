'use client'

import { Metadata } from "next"
import { Button } from "@/components/ui/button"

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
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-red-300 mb-4">500</h1>
              <h2 className="text-2xl font-semibold mb-2">Something went wrong!</h2>
              <p className="text-muted-foreground mb-8">
                An unexpected error occurred while loading the component library.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button
                onClick={reset}
              >
                Try again
              </Button>
              
              <div className="text-sm text-muted-foreground">
                <p>If the problem persists, please check your connection and try again.</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
} 