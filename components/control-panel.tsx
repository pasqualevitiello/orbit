"use client"

import { ComponentControl } from "@/lib/components-registry"

interface ControlPanelProps {
  controls: Record<string, ComponentControl>
  values: Record<string, any>
  onChange: (values: Record<string, any>) => void
}

export function ControlPanel({ controls, values, onChange }: ControlPanelProps) {
  const updateValue = (key: string, value: any) => {
    onChange({ ...values, [key]: value })
  }

  if (Object.keys(controls).length === 0) {
    return (
      <div className="controls-panel p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Controls</h3>
        <p className="text-sm text-gray-500">No controls available</p>
      </div>
    )
  }

  return (
    <div className="controls-panel p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Controls</h3>
      <div className="space-y-4">
        {Object.entries(controls).map(([key, control]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{control.label || key}</label>

            {control.type === "text" && (
              <input
                type="text"
                value={values[key] || ""}
                onChange={(e) => updateValue(key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder={control.placeholder}
              />
            )}

            {control.type === "boolean" && (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={values[key] || false}
                  onChange={(e) => updateValue(key, e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">{control.label || key}</span>
              </label>
            )}

            {control.type === "select" && (
              <select
                value={values[key] || ""}
                onChange={(e) => updateValue(key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {control.options?.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {control.type === "color" && (
              <input
                type="color"
                value={values[key] || "#000000"}
                onChange={(e) => updateValue(key, e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            )}

            {control.type === "number" && (
              <input
                type="number"
                value={values[key] || 0}
                onChange={(e) => updateValue(key, Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                min={control.min}
                max={control.max}
                step={control.step}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
