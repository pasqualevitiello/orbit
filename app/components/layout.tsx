"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { componentRegistry } from "@/lib/components-registry"

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="h-svh flex">
      {/* Main content */}
      <main className="h-full flex-1 order-1 flex flex-col">
        {children}
      </main>
      {/* Sidebar */}
      <div className="h-full w-80 overflow-y-auto border-r">
        <Sidebar
          components={componentRegistry}
          currentPath={pathname}
        />
      </div>
    </div>
  )
} 