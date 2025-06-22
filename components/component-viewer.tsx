"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
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
      <div className="flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Component not found</p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!isLoaded) return null

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
      <ResizableHandle />

      {/* Inspector - resizable control panel */}
      <ResizablePanel 
        defaultSize={panelSizes.controlPanel} 
        minSize={15} 
        maxSize={50}
      >
        <div className="h-full overflow-y-auto">
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
