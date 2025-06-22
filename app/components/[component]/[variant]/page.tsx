import { notFound } from "next/navigation"
import { ComponentLibrary } from "@/components/component-library"
import { componentRegistry } from "@/lib/components-registry"

interface PageProps {
  params: Promise<{
    component: string
    variant: string
  }>
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

export async function generateMetadata({ params }: PageProps) {
  const { component, variant } = await params

  if (!componentRegistry[component] || !componentRegistry[component].variants[variant]) {
    return {
      title: "Component Not Found",
    }
  }

  return {
    title: `${component} - ${variant} | Component Library`,
    description: `${variant} variant of the ${component} component`,
  }
}

export default async function ComponentPage({ params }: PageProps) {
  const { component, variant } = await params

  // Check if component and variant exist
  if (!componentRegistry[component] || !componentRegistry[component].variants[variant]) {
    notFound()
  }

  return <ComponentLibrary initialComponent={component} initialVariant={variant} />
}
