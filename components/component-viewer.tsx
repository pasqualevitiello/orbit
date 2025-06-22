"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ControlPanel } from "@/components/control-panel"
import { CodeViewer } from "@/components/code-viewer"
import { ComponentData } from "@/lib/components-registry"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { useLocalStorage } from "@/lib/hooks/use-local-storage"

interface ComponentViewerProps {
  componentName: string
  variantName: string
  componentData: ComponentData
}

interface PanelSizes {
  mainPanel: number
  controlPanel: number
}

const DEFAULT_PANEL_SIZES: PanelSizes = {
  mainPanel: 80,
  controlPanel: 20
}

export function ComponentViewer({ componentName, variantName, componentData }: ComponentViewerProps) {
  const variant = componentData?.variants[variantName]
  const Component = componentData?.component
  
  // Initialize props directly from variant to avoid transition
  const [props, setProps] = useState<Record<string, any>>(variant?.props || {})
  const [showCode, setShowCode] = useState(false)

  // Store panel sizes in localStorage with default values
  const [panelSizes, setPanelSizes, isLoaded] = useLocalStorage<PanelSizes>("component-library-panel-sizes", DEFAULT_PANEL_SIZES)

  // Handle panel resize
  const handlePanelResize = (sizes: number[]) => {
    if (sizes.length >= 2) {
      setPanelSizes({
        mainPanel: sizes[0],
        controlPanel: sizes[1]
      })
    }
  }

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

  // Show loading state while localStorage is being loaded
  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading layout...</p>
        </div>
      </div>
    )
  }

  return (
    <ResizablePanelGroup 
      direction="vertical" 
      className="h-full"
      onLayout={handlePanelResize}
    >
      {/* Component frame - resizable main content */}
      <ResizablePanel 
        defaultSize={panelSizes.mainPanel} 
        minSize={30}
      >
        <div className="p-5 h-full overflow-y-auto">
          <Component {...props} />
        </div>
      </ResizablePanel>

      {/* Resizable handle */}
      <ResizableHandle withHandle />

      {/* Inspector - resizable control panel */}
      <ResizablePanel 
        defaultSize={panelSizes.controlPanel} 
        minSize={15} 
        maxSize={50}
      >
        <div className="h-full overflow-y-auto border-t">
          <div className="p-5">
            <ControlPanel 
              controls={componentData.controls || {}} 
              values={props} 
              onChange={setProps}
            />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
