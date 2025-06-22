"use client"

import { ChevronsUpDownIcon, ChevronsDownUpIcon } from "lucide-react"
import { useState, useEffect } from "react"
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
    <div className="p-5 font-sans">
      <div className="mb-6">
        <Link href="/" className="block">
          <h1 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">Orbit</h1>
        </Link>
        <p className="text-sm text-gray-600 mt-1">Browse and test your components</p>
      </div>

      <div className="mb-6">
        <Search />
      </div>

      <nav>
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
              <div className="-mx-5">
                <CollapsibleTrigger asChild>
                  <Button
                    data-selected={isSelected}
                    data-open={isOpen}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleComponentClick(componentName, isOpen, firstVariant)}
                    className="w-full text-[15px] md:text-[13px] justify-between group rounded-none has-[>svg]:px-5 h-8 md:h-7 data-[selected=true]:bg-muted"
                  >
                    <span className="font-medium truncate">{componentName}</span>
                    {isOpen ? <ChevronsDownUpIcon className="size-3.5 text-muted-foreground" aria-hidden="true" /> : <ChevronsUpDownIcon className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />}
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden ease-in-out duration-150">
                <div className="flex flex-col gap-1 border-l my-1">
                  {Object.keys(componentData.variants).map((variantName) => {
                    const href = `/components/${componentName}/${variantName}`
                    const isActive = currentPath === href

                    return (
                      <Link
                        key={variantName}
                        href={href}
                        aria-current={isActive ? "page" : undefined}
                        className="inline-flex border-l border-transparent text-[15px] md:text-[13px] text-muted-foreground hover:border-foreground/25 aria-[current]:border-gray-950 aria-[current]:font-medium aria-[current]:text-foreground pl-3.5 -ml-px"
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
