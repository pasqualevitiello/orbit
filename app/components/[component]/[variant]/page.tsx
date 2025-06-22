import { notFound } from "next/navigation"
import { Metadata } from "next"
import { ComponentLibrary } from "@/components/component-library"
import { componentRegistry, ComponentRegistry } from "@/lib/components-registry"

interface PageProps {
  params: {
    component: string
    variant: string
  }
}

export async function generateStaticParams() {
  const paths: { component: string; variant: string }[] = []

  Object.entries(componentRegistry).forEach(([componentName, componentData]) => {
    Object.keys(componentData.variants).forEach((variantName) => {
      paths.push({
        component: componentName,
        variant: variantName,
      })
    })
  })

  return paths
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { component, variant } = params

  // Type-safe component lookup
  const componentData = componentRegistry[component as keyof ComponentRegistry]
  if (!componentData || !componentData.variants[variant]) {
    return {
      title: "Component Not Found | Component Library",
      description: "The requested component or variant could not be found.",
    }
  }

  const variantData = componentData.variants[variant]
  
  return {
    title: `${component} - ${variant} | Component Library`,
    description: variantData.description || `${variant} variant of the ${component} component`,
    openGraph: {
      title: `${component} - ${variant}`,
      description: variantData.description || `${variant} variant of the ${component} component`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${component} - ${variant}`,
      description: variantData.description || `${variant} variant of the ${component} component`,
    },
  }
}

export default function ComponentPage({ params }: PageProps) {
  const { component, variant } = params

  // Type-safe component lookup
  const componentData = componentRegistry[component as keyof ComponentRegistry]
  if (!componentData || !componentData.variants[variant]) {
    notFound()
  }

  return <ComponentLibrary initialComponent={component} initialVariant={variant} />
}
