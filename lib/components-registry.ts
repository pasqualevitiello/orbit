import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Card } from "@/registry/ui/card"
import { Badge } from "@/registry/ui/badge"
import { Select } from "@/registry/ui/select"
import { Textarea } from "@/registry/ui/textarea"
import { Checkbox } from "@/registry/ui/checkbox"
import { Switch } from "@/registry/ui/switch"
import { Alert } from "@/registry/ui/alert"
import { Avatar } from "@/registry/ui/avatar"
import { Progress } from "@/registry/ui/progress"

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
      Invalid: {
        props: { placeholder: "Enter text...", "aria-invalid": "true" },
        description: "Input with aria-invalid for accessibility",
      },
    },
  },
  Card: {
    component: Card,
    viewerClassnames: "max-w-sm mx-auto flex items-center justify-center",
    controls: {
      children: {
        type: "text",
        label: "Content",
        placeholder: "Card content",
      },
      className: {
        type: "text",
        label: "Custom Classes",
        placeholder: "Additional CSS classes",
      },
    },
    variants: {
      Default: {
        props: { children: "Card Content" },
        description: "Basic card with content",
      },
      WithPadding: {
        props: { children: "Card with padding", className: "p-6" },
        description: "Card with internal padding",
      },
      Compact: {
        props: { children: "Compact card", className: "p-3" },
        description: "Card with minimal padding",
      },
      Elevated: {
        props: { children: "Elevated card", className: "p-6 shadow-lg" },
        description: "Card with enhanced shadow",
      },
    },
  },
  Badge: {
    component: Badge,
    viewerClassnames: "flex items-center justify-center gap-4",
    controls: {
      children: {
        type: "text",
        label: "Text",
        placeholder: "Badge text",
      },
      variant: {
        type: "select",
        label: "Variant",
        options: ["default", "secondary", "destructive", "outline"],
      },
    },
    variants: {
      Default: {
        props: { children: "Badge" },
        description: "Default badge style",
      },
      Secondary: {
        props: { children: "Secondary", variant: "secondary" },
        description: "Secondary badge variant",
      },
      Destructive: {
        props: { children: "Destructive", variant: "destructive" },
        description: "Destructive badge variant",
      },
      Outline: {
        props: { children: "Outline", variant: "outline" },
        description: "Outline badge variant",
      },
      Status: {
        props: { children: "Active", variant: "default" },
        description: "Status indicator badge",
      },
    },
  },
  Select: {
    component: Select,
    viewerClassnames: "max-w-xs mx-auto flex items-center justify-center",
    controls: {
      children: {
        type: "text",
        label: "Options",
        placeholder: "Option 1,Option 2,Option 3",
      },
      disabled: {
        type: "boolean",
        label: "Disabled",
      },
      className: {
        type: "text",
        label: "Custom Classes",
        placeholder: "Additional CSS classes",
      },
    },
    variants: {
      Default: {
        props: { children: "<option>Select an option</option><option>Option 1</option><option>Option 2</option><option>Option 3</option>" },
        description: "Basic select dropdown",
      },
      WithPlaceholder: {
        props: { children: "<option value=''>Choose...</option><option value='1'>First Option</option><option value='2'>Second Option</option><option value='3'>Third Option</option>" },
        description: "Select with placeholder option",
      },
      Disabled: {
        props: { children: "<option>Disabled Select</option>", disabled: true },
        description: "Disabled select dropdown",
      },
    },
  },
  Textarea: {
    component: Textarea,
    viewerClassnames: "max-w-md mx-auto flex items-center justify-center",
    controls: {
      placeholder: {
        type: "text",
        label: "Placeholder",
        placeholder: "Enter placeholder text",
      },
      rows: {
        type: "number",
        label: "Rows",
        min: 1,
        max: 10,
        step: 1,
      },
      disabled: {
        type: "boolean",
        label: "Disabled",
      },
    },
    variants: {
      Default: {
        props: { placeholder: "Enter your message..." },
        description: "Basic textarea",
      },
      Large: {
        props: { placeholder: "Enter a longer message...", rows: 5 },
        description: "Large textarea with more rows",
      },
      Small: {
        props: { placeholder: "Short message", rows: 2 },
        description: "Small textarea with fewer rows",
      },
      Disabled: {
        props: { placeholder: "Disabled textarea", disabled: true },
        description: "Disabled textarea",
      },
    },
  },
  Checkbox: {
    component: Checkbox,
    viewerClassnames: "flex items-center justify-center gap-4",
    controls: {
      children: {
        type: "text",
        label: "Label",
        placeholder: "Checkbox label",
      },
      checked: {
        type: "boolean",
        label: "Checked",
      },
      disabled: {
        type: "boolean",
        label: "Disabled",
      },
    },
    variants: {
      Default: {
        props: { children: "Accept terms and conditions" },
        description: "Basic checkbox with label",
      },
      Checked: {
        props: { children: "Remember me", checked: true },
        description: "Pre-checked checkbox",
      },
      Disabled: {
        props: { children: "Disabled option", disabled: true },
        description: "Disabled checkbox",
      },
      NoLabel: {
        props: {},
        description: "Checkbox without label",
      },
    },
  },
  Switch: {
    component: Switch,
    viewerClassnames: "flex items-center justify-center gap-4",
    controls: {
      children: {
        type: "text",
        label: "Label",
        placeholder: "Switch label",
      },
      checked: {
        type: "boolean",
        label: "Checked",
      },
      disabled: {
        type: "boolean",
        label: "Disabled",
      },
    },
    variants: {
      Default: {
        props: { children: "Enable notifications" },
        description: "Basic switch with label",
      },
      On: {
        props: { children: "Dark mode", checked: true },
        description: "Switch in ON state",
      },
      Disabled: {
        props: { children: "Premium feature", disabled: true },
        description: "Disabled switch",
      },
      NoLabel: {
        props: {},
        description: "Switch without label",
      },
    },
  },
  Alert: {
    component: Alert,
    viewerClassnames: "max-w-md mx-auto flex items-center justify-center",
    controls: {
      children: {
        type: "text",
        label: "Message",
        placeholder: "Alert message",
      },
      variant: {
        type: "select",
        label: "Variant",
        options: ["default", "destructive", "success", "warning", "info"],
      },
    },
    variants: {
      Default: {
        props: { children: "This is a default alert message." },
        description: "Default alert style",
      },
      Success: {
        props: { children: "Your changes have been saved successfully!", variant: "success" },
        description: "Success alert message",
      },
      Warning: {
        props: { children: "Please review your information before proceeding.", variant: "warning" },
        description: "Warning alert message",
      },
      Error: {
        props: { children: "Something went wrong. Please try again.", variant: "destructive" },
        description: "Error alert message",
      },
      Info: {
        props: { children: "Here's some helpful information for you.", variant: "info" },
        description: "Info alert message",
      },
    },
  },
  Avatar: {
    component: Avatar,
    viewerClassnames: "flex items-center justify-center gap-4",
    controls: {
      src: {
        type: "text",
        label: "Image URL",
        placeholder: "https://example.com/avatar.jpg",
      },
      alt: {
        type: "text",
        label: "Alt Text",
        placeholder: "User avatar",
      },
      size: {
        type: "select",
        label: "Size",
        options: ["sm", "default", "lg", "xl"],
      },
    },
    variants: {
      Default: {
        props: { alt: "User" },
        description: "Default avatar with initials",
      },
      WithImage: {
        props: { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", alt: "John Doe" },
        description: "Avatar with profile image",
      },
      Large: {
        props: { alt: "User", size: "lg" },
        description: "Large avatar size",
      },
      Small: {
        props: { alt: "User", size: "sm" },
        description: "Small avatar size",
      },
    },
  },
  Progress: {
    component: Progress,
    viewerClassnames: "max-w-md mx-auto flex items-center justify-center",
    controls: {
      value: {
        type: "number",
        label: "Value",
        min: 0,
        max: 100,
        step: 1,
      },
      max: {
        type: "number",
        label: "Max Value",
        min: 1,
        max: 1000,
        step: 1,
      },
    },
    variants: {
      Default: {
        props: { value: 50 },
        description: "Default progress bar at 50%",
      },
      Complete: {
        props: { value: 100 },
        description: "Complete progress bar",
      },
      Empty: {
        props: { value: 0 },
        description: "Empty progress bar",
      },
      Quarter: {
        props: { value: 25 },
        description: "Progress bar at 25%",
      },
      ThreeQuarters: {
        props: { value: 75 },
        description: "Progress bar at 75%",
      },
    },
  },
}
