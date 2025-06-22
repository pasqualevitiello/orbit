import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"

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
  viewerClassnames?: string
}

export interface ComponentRegistry {
  [key: string]: ComponentData
}

export const componentRegistry: ComponentRegistry = {
  Button: {
    component: Button,
    viewerClassnames: "flex items-center justify-center",
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
  Input: {
    component: Input,
    viewerClassnames: "max-w-xs mx-auto flex items-center justify-center",
    controls: {
      type: {
        type: "select",
        label: "Type",
        options: ["text", "email", "password", "number", "tel", "url", "search", "file"],
      },
      placeholder: {
        type: "text",
        label: "Placeholder",
        placeholder: "Enter placeholder text",
      },
      disabled: {
        type: "boolean",
        label: "Disabled",
      },
      value: {
        type: "text",
        label: "Value",
        placeholder: "Enter input value",
      },
    },
    variants: {
      Default: {
        props: { placeholder: "Enter text..." },
        description: "Default input field",
      },
      Email: {
        props: { type: "email", placeholder: "Enter your email" },
        description: "Email input field",
      },
      Password: {
        props: { type: "password", placeholder: "Enter your password" },
        description: "Password input field",
      },
      Search: {
        props: { type: "search", placeholder: "Search..." },
        description: "Search input field",
      },
      Number: {
        props: { type: "number", placeholder: "Enter a number" },
        description: "Number input field",
      },
      File: {
        props: { type: "file" },
        description: "File upload input",
      },
      Disabled: {
        props: { placeholder: "Disabled input", disabled: true },
        description: "Disabled input field",
      },
      WithDefaultValue: {
        props: { defaultValue: "Hello World", placeholder: "Enter text..." },
        description: "Input with pre-filled value",
      },
    },
  },
}
