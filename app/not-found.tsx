import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Component Not Found",
  description: "The requested component or variant could not be found.",
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Component Not Found</h2>
          <p className="text-gray-600 mb-8">
            The component or variant you're looking for doesn't exist.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Or check out our available components:</p>
            <Link href="/components/Button/Default" className="text-blue-600 hover:underline">
              Button Component
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 