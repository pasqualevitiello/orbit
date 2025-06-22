"use client"

import { ChevronsUpDownIcon, ChevronsDownUpIcon } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ComponentRegistry } from "@/lib/components-registry"
import Search from "@/components/search"

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
  const [searchQuery, setSearchQuery] = useState("")
  const [focusedIndex, setFocusedIndex] = useState(-1)

  // Update open components when selectedComponent changes
  useEffect(() => {
    if (selectedComponent) {
      setOpenComponents((prev) => new Set([...prev, selectedComponent]))
    }
  }, [selectedComponent])

  // Reset focus when search query changes
  useEffect(() => {
    if (searchQuery) {
      setFocusedIndex(0)
    } else {
      setFocusedIndex(-1)
    }
  }, [searchQuery])

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

  // Handle keyboard navigation
  const handleSearchKeyDown = (event: React.KeyboardEvent) => {
    if (!searchQuery) return

    const totalElements = filteredComponents.length
    if (totalElements === 0) return

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setFocusedIndex((prev) => (prev + 1) % totalElements)
        break
      case 'ArrowUp':
        event.preventDefault()
        setFocusedIndex((prev) => (prev - 1 + totalElements) % totalElements)
        break
      case 'Enter':
        event.preventDefault()
        if (focusedIndex >= 0 && focusedIndex < totalElements) {
          const [componentName, componentData] = filteredComponents[focusedIndex]
          const firstVariant = Object.keys(componentData.variants)[0]
          router.push(`/components/${componentName}/${firstVariant}`)
        }
        break
      case 'Escape':
        setSearchQuery("")
        setFocusedIndex(-1)
        break
    }
  }

  // Filter components based on search query
  const filteredComponents = Object.entries(components)
    .filter(([componentName, componentData]) => {
      const query = searchQuery.toLowerCase()
      
      // Only check if component name matches
      return componentName.toLowerCase().includes(query)
    })
    .sort(([a], [b]) => a.localeCompare(b))

  return (
    <div className="py-5 font-sans space-y-5">
      <div className="px-5">
        <Link href="/" className="block">
          <h1 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">Orbit</h1>
        </Link>
        <p className="text-sm text-gray-600 mt-1">Browse and test your components</p>
      </div>

      <div className="px-5">
        <Search value={searchQuery} onChange={setSearchQuery} onKeyDown={handleSearchKeyDown} />
      </div>

      <nav>
        {filteredComponents.map(([componentName, componentData], index) => {
          const isOpen = openComponents.has(componentName)
          const isSelected = selectedComponent === componentName
          const firstVariant = Object.keys(componentData.variants)[0]
          const isFocused = searchQuery && focusedIndex === index

          return (
            <Collapsible
              key={componentName}
              open={isOpen}
              onOpenChange={(open) => handleComponentToggle(componentName, open)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  data-selected={isSelected}
                  data-open={isOpen}
                  data-focused={isFocused}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleComponentClick(componentName, isOpen, firstVariant)}
                  className="w-full text-[15px] md:text-[13px] justify-between group rounded-none has-[>svg]:px-5 h-8 md:h-7 not-focus-visible:not-data-[focused=true]:data-[selected=true]:bg-muted focus-visible:ring-0 focus-visible:bg-black/8 data-[focused=true]:bg-black/8"
                >
                  <span className="font-medium truncate">{componentName}</span>
                  {isOpen ? <ChevronsDownUpIcon className="size-3.5 text-muted-foreground" aria-hidden="true" /> : <ChevronsUpDownIcon className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />}
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden ease-in-out duration-150">
                <div className="flex flex-col gap-1 relative my-1 before:absolute before:inset-y-0 before:start-5 before:border-l before:border-border">
                  {Object.keys(componentData.variants).map((variantName) => {
                    const href = `/components/${componentName}/${variantName}`
                    const isActive = currentPath === href

                    return (
                      <Link
                        key={variantName}
                        href={href}
                        aria-current={isActive ? "page" : undefined}
                        className="inline-flex relative before:absolute before:inset-y-0 before:start-5 before:border-l before:border-transparent hover:before:border-primary/25 text-[15px] md:text-[13px] text-muted-foreground aria-[current]:before:border-primary aria-[current]:font-medium aria-[current]:text-foreground ps-8.5 pe-5 focus-visible:outline-none focus-visible:border-foreground/25 focus-visible:bg-muted"
                      >
                        {variantName}
                      </Link>
                    )
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </nav>
    </div>
  )
}
