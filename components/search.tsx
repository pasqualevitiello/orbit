"use client"

import { useId, useRef } from "react"

import { Input } from "@/components/ui/input"
import { CircleXIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"

interface SearchProps {
  value: string
  onChange: (value: string) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
}

export default function Component({ value, onChange, onKeyDown }: SearchProps) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault()
      inputRef.current?.focus()
      return
    }

    // Forward other key events to parent
    onKeyDown?.(event)
  }

  const handleClearInput = () => {
    onChange("")
    inputRef.current?.focus()
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        id={id}
        className="pe-11"
        placeholder="Search components"
        type="text"
        aria-label="Search components"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {value.length > 0 ? (
        <Button
          variant="ghost"
          size="icon"
          className="absolute inset-y-0.5 end-0.5 size-7 hover:bg-transparent text-muted-foreground/70 hover:text-foreground"
          aria-label="Clear input"
          onClick={handleClearInput}
        >
          <CircleXIcon className="size-3.5" aria-hidden="true" />
        </Button>
      ) : (
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2">
          <kbd className="text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[10px] font-medium">
            ⌘K
          </kbd>
        </div>        
      )}
    </div>
  )
}
