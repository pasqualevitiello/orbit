"use client"

import { useId, useEffect, useRef } from "react"

import { Input } from "@/components/ui/input"

export default function Component() {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    // Add event listener
    document.addEventListener('keydown', handleKeyDown)

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        id={id}
        className="pe-11"
        placeholder="Search components"
        type="text"
        aria-label="Search components"
      />
      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2">
        <kbd className="text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[10px] font-medium">
          ⌘K
        </kbd>
      </div>
    </div>
  )
}
