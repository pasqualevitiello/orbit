"use client"

import { ChevronDown, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ComponentRegistry } from "@/lib/components-registry"

interface SidebarProps {
  components: ComponentRegistry
  currentPath: string
}

export function Sidebar({
  components,
  currentPath,
}: SidebarProps) {
  const router = useRouter()
  
  // Extract component and variant from current path
  const pathParts = currentPath.split('/')
  const selectedComponent = pathParts[2] || ''
  const selectedVariant = pathParts[3] || ''

  const [openComponents, setOpenComponents] = useState<Set<string>>(new Set([selectedComponent]))

  // Update open components when selectedComponent changes
  useEffect(() => {
    if (selectedComponent) {
      setOpenComponents((prev) => new Set([...prev, selectedComponent]))
    }
  }, [selectedComponent])

  const handleComponentToggle = (componentName: string, isOpen: boolean) => {
    const newOpen = new Set(openComponents)

    if (isOpen) {
      // If opening, add to open set
      newOpen.add(componentName)
    } else {
      // If closing, remove from open set
      newOpen.delete(componentName)
    }

    setOpenComponents(newOpen)
  }

  const handleComponentClick = (componentName: string, isOpen: boolean, firstVariant: string) => {
    if (isOpen) {
      // If already open, collapse it
      handleComponentToggle(componentName, false)
    } else {
      // If collapsed, navigate to first variant
      router.push(`/components/${componentName}/${firstVariant}`)
    }
  }

  return (
    <div className="sidebar bg-gray-50 p-4 overflow-y-auto">
      <div className="mb-6">
        <Link href="/" className="block">
          <h1 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">Component Library</h1>
        </Link>
        <p className="text-sm text-gray-600 mt-1">Browse and test your components</p>
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
                <button
                  onClick={() => handleComponentClick(componentName, isOpen, firstVariant)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-md transition-colors ${
                    isSelected ? "bg-blue-100 text-blue-900" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="font-medium">{componentName}</span>
                  <div className="p-1">
                    {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent className="ml-4 mt-1 space-y-1">
                {Object.keys(componentData.variants).map((variantName) => {
                  const href = `/components/${componentName}/${variantName}`
                  const isActive = currentPath === href

                  return (
                    <Link
                      key={variantName}
                      href={href}
                      className={`block w-full text-left px-3 py-1 text-sm rounded transition-colors ${
                        isActive ? "bg-blue-50 text-blue-800" : "text-gray-600 hover:bg-gray-50"
                      }`}
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
