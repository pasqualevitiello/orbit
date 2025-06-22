"use client"

interface CodeViewerProps {
  componentName: string
  props: Record<string, any>
  code?: string
}

export function CodeViewer({ componentName, props, code }: CodeViewerProps) {
  const generateCode = () => {
    if (code) return code

    const propsString = Object.entries(props)
      .filter(([_, value]) => value !== undefined && value !== "")
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${key}="${value}"`
        }
        if (typeof value === "boolean") {
          return value ? key : ""
        }
        return `${key}={${JSON.stringify(value)}}`
      })
      .filter(Boolean)
      .join(" ")

    return `<${componentName}${propsString ? " " + propsString : ""} />`
  }

  return (
    <div className="bg-black text-white p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium">Code</h4>
        <button
          onClick={() => navigator.clipboard.writeText(generateCode())}
          className="text-xs bg-primary hover:bg-primary/90 px-2 py-1 rounded"
        >
          Copy
        </button>
      </div>
      <pre className="text-sm overflow-x-auto">
        <code>{generateCode()}</code>
      </pre>
    </div>
  )
}
