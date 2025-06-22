"use client"

import { useId, useRef, forwardRef } from "react"

import { Input } from "@/components/ui/input"
import { CircleXIcon } from "lucide-react"
import { Button } from "@/registry/ui/button"

interface SearchProps {
  value: string
  onChange: (value: string) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
}

const Component = forwardRef<HTMLInputElement, SearchProps>(
  ({ value, onChange, onKeyDown }, ref) => {
    const id = useId()

    const handleClearInput = () => {
      onChange("")
      if (typeof ref === 'object' && ref?.current) {
        ref.current.focus()
      }
    }

    return (
      <div className="relative">
        <Input
          ref={ref}
          id={id}
          className="pe-11"
          placeholder="Search components"
          type="text"
          aria-label="Search components"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
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
)

Component.displayName = "Search"

export default Component
