import Link from "next/link"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Component Not Found",
  description: "The requested component or variant could not be found.",
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Component Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The component or variant you're looking for doesn't exist.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild>
            <Link
                href="/"
            >
                Back to Home
            </Link>
          </Button>
          
          <div className="text-sm text-muted-foreground">
            <p>Or check out our available components:</p>
            <Button asChild>
              <Link href="/components/Button/Default">
                Button Component
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 