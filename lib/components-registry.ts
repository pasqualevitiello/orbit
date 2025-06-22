import { Button } from "@/components/ui/button"

export interface ComponentVariant {
  props: Record<string, any>
  description: string
}

export interface ComponentControl {
  type: "text" | "select" | "boolean" | "color" | "number"
  label: string
  placeholder?: string
  options?: string[]
  min?: number
  max?: number
  step?: number
}

export interface ComponentData {
  component: React.ComponentType<any>
  controls: Record<string, ComponentControl>
  variants: Record<string, ComponentVariant>
}

export interface ComponentRegistry {
  [key: string]: ComponentData
}

export const componentRegistry: ComponentRegistry = {
  Button: {
    component: Button,
    controls: {
      children: {
        type: "text",
        label: "Text",
        placeholder: "Button text",
      },
      variant: {
        type: "select",
        label: "Variant",
        options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      },
      size: {
        type: "select",
        label: "Size",
        options: ["default", "sm", "lg", "icon"],
      },
      disabled: {
        type: "boolean",
        label: "Disabled",
      },
    },
    variants: {
      Default: {
        props: { children: "Button" },
        description: "Default button style",
      },
      Primary: {
        props: { children: "Primary Button", variant: "default" },
        description: "Primary action button",
      },
      Secondary: {
        props: { children: "Secondary Button", variant: "secondary" },
        description: "Secondary action button",
      },
      Outline: {
        props: { children: "Outline Button", variant: "outline" },
        description: "Outlined button style",
      },
      Destructive: {
        props: { children: "Delete", variant: "destructive" },
        description: "Destructive action button",
      },
      Large: {
        props: { children: "Large Button", size: "lg" },
        description: "Large sized button",
      },
      Small: {
        props: { children: "Small Button", size: "sm" },
        description: "Small sized button",
      },
      Disabled: {
        props: { children: "Disabled Button", disabled: true },
        description: "Disabled button state",
      },
    },
  },
}
