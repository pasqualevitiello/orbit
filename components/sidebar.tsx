"use client"

import { ChevronDown, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ComponentRegistry } from "@/lib/components-registry"

interface SidebarProps {
  components: ComponentRegistry
  selectedComponent: string
  selectedVariant: string
  currentPath: string
}

export function Sidebar({
  components,
  selectedComponent,
  selectedVariant,
  currentPath,
}: SidebarProps) {
  const [openComponents, setOpenComponents] = useState<Set<string>>(new Set([selectedComponent]))

  // Update open components when selectedComponent changes
  useEffect(() => {
    setOpenComponents((prev) => new Set([...prev, selectedComponent]))
  }, [selectedComponent])

  const handleComponentToggle = (componentName: string, isOpen: boolean) => {
    const newOpen = new Set(openComponents)

    if (isOpen) {
      newOpen.add(componentName)
    } else {
      newOpen.delete(componentName)
    }

    setOpenComponents(newOpen)
  }

  return (
    <div className="p-4 overflow-y-auto">
      <div className="mb-6">
        <Link href="/" className="block">
          <h1 className="text-xl font-bold">Component Library</h1>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">Browse and test your components</p>
      </div>

      <nav className="space-y-1">
        {Object.entries(components).map(([componentName, componentData]) => {
          const isOpen = openComponents.has(componentName)
          const isSelected = selectedComponent === componentName
          const firstVariant = Object.keys(componentData.variants)[0]

          return (
            <Collapsible
              key={componentName}
              open={isOpen}
              onOpenChange={(open) => handleComponentToggle(componentName, open)}
            >
              <CollapsibleTrigger asChild>
                <Link
                  href={`/components/${componentName}/${firstVariant}`}
                  data-selected={isSelected}
                  className="w-full flex items-center justify-between px-3 py-2 text-left rounded-md transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground">
                  <span className="font-medium">{componentName}</span>
                  <div className="p-1">
                    {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </Link>
              </CollapsibleTrigger>

              <CollapsibleContent className="ml-4 mt-1 space-y-1">
                {Object.keys(componentData.variants).map((variantName) => {
                  const href = `/components/${componentName}/${variantName}`
                  const isActive = currentPath === href

                  return (
                    <Link
                      key={variantName}
                      href={href}
                      data-selected={isActive}
                      className="block w-full text-left px-3 py-1 text-sm rounded transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                    >
                      {variantName}
                    </Link>
                  )
                })}
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </nav>
    </div>
  )
}
