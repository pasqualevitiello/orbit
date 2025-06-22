import { redirect } from "next/navigation"
import { componentRegistry } from "@/lib/components-registry"

interface PageProps {
  params: Promise<{
    component: string
  }>
}

export async function generateStaticParams() {
  return Object.keys(componentRegistry).map((componentName) => ({
    component: componentName,
  }))
}

export default async function ComponentDefaultPage({ params }: PageProps) {
  const { component } = await params

  if (!componentRegistry[component]) {
    redirect("/")
  }

  // Redirect to the first variant
  const firstVariant = Object.keys(componentRegistry[component].variants)[0]
  redirect(`/components/${component}/${firstVariant}`)
}
