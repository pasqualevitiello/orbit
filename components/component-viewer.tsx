"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ControlPanel } from "@/components/control-panel"
import { CodeViewer } from "@/components/code-viewer"
import { componentRegistry, ComponentRegistry } from "@/lib/components-registry"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { useLocalStorage } from "@/lib/hooks/use-local-storage"
import { cn } from "@/lib/utils"

interface ComponentViewerProps {
  componentName: string
  variantName: string
}

interface PanelSizes {
  mainPanel: number
  controlPanel: number
}

const DEFAULT_PANEL_SIZES: PanelSizes = {
  mainPanel: 80,
  controlPanel: 20
}

export function ComponentViewer({ componentName, variantName }: ComponentViewerProps) {
  // Look up component data from registry
  const componentData = componentRegistry[componentName as keyof ComponentRegistry]
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
        <div className={cn(`relative p-5 h-full overflow-y-auto ${componentData.viewerClassnames}`)}>
          {/* <svg fill="none" className="text-foreground/5 absolute inset-0 size-full">
            <defs>
              <pattern x="0" y="0" id="diagonal-lines" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" stroke="currentColor" />
              </pattern>
            </defs>
              <rect fill="url(#diagonal-lines)" width="100%" height="100%" stroke="none" />
          </svg> */}
          <svg fill="none" className="text-foreground/10 absolute inset-0 size-full">
            <defs>
              <pattern x="0" y="0" id="texture" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M1 3h1v1H1V3zm2-2h1v1H3V1z" fill="currentColor" />
              </pattern>
            </defs>
              <rect fill="url(#texture)" width="100%" height="100%" stroke="none" />
          </svg>          
          {/* <svg fill="none" className="text-foreground/8 absolute inset-0 size-full">
            <defs>
              <pattern x="0" y="0" id="tiny-checkers" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M0 0h4v4H0V0zm4 4h4v4H4V4z" fill="currentColor" />
              </pattern>
            </defs>
              <rect fill="url(#tiny-checkers)" width="100%" height="100%" stroke="none" />
          </svg>           */}
          <div className="relative z-10">
            <Component {...props} />
          </div>
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
        <div className="h-full overflow-y-auto font-sans">
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
