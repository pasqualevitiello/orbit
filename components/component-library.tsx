"use client"

import { useRouter, usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { ComponentViewer } from "@/components/component-viewer"
import { componentRegistry, ComponentRegistry } from "@/lib/components-registry"

interface ComponentLibraryProps {
  initialComponent: string
  initialVariant: string
}

export function ComponentLibrary({ initialComponent, initialVariant }: ComponentLibraryProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleComponentSelect = (component: string) => {
    const componentData = componentRegistry[component as keyof ComponentRegistry]
    if (componentData) {
      const firstVariant = Object.keys(componentData.variants)[0]
      router.push(`/components/${component}/${firstVariant}`)
    }
  }

  const handleVariantSelect = (component: string, variant: string) => {
    router.push(`/components/${component}/${variant}`)
  }

  const componentData = componentRegistry[initialComponent as keyof ComponentRegistry]

  return (
    <div className="h-svh flex">
    {/* Main content */}
    <main className="h-full flex-1 order-1 flex flex-col">
    <ComponentViewer
        componentName={initialComponent}
        variantName={initialVariant}
        componentData={componentData}
      />     
    </main>
    {/* Sidebar */}
    <div className="h-full w-80 overflow-y-auto border-r">
      <div className="p-5">
      <Sidebar
        components={componentRegistry}
        selectedComponent={initialComponent}
        selectedVariant={initialVariant}
        onComponentSelect={handleComponentSelect}
        onVariantSelect={handleVariantSelect}
        currentPath={pathname}
      />
      </div>
    </div>
  </div>    
  )
}
