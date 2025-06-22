"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ControlPanel } from "@/components/control-panel"
import { CodeViewer } from "@/components/code-viewer"
import { ComponentData } from "@/lib/components-registry"

interface ComponentViewerProps {
  componentName: string
  variantName: string
  componentData: ComponentData
}

export function ComponentViewer({ componentName, variantName, componentData }: ComponentViewerProps) {
  const variant = componentData?.variants[variantName]
  const Component = componentData?.component
  
  // Initialize props directly from variant to avoid transition
  const [props, setProps] = useState<Record<string, any>>(variant?.props || {})
  const [showCode, setShowCode] = useState(false)

  if (!componentData || !variant || !Component) {
    return (
      <div className="main-content flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Component not found</p>
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Component frame */}
      <div className="p-5 flex-1 overflow-y-auto">
        <Component {...props} />
      </div>
      {/* Inspector */}
      <aside className="sticky bottom-0 inset-x-0 h-[20%] min-h-36 overflow-y-auto border-t">
        <div className="p-5">
        <ControlPanel controls={componentData.controls || {}} values={props} onChange={setProps} />
        </div>
      </aside>
    </>
  )
}
