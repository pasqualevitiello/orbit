import { componentRegistry } from "@/lib/components-registry";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-svh flex">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Component Library</h1>
        <p className="text-center mb-8 text-lg">Welcome to your component library built with Next.js</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {Object.entries(componentRegistry).map(([componentName, componentData]) => {
            const firstVariant = Object.keys(componentData.variants)[0]
            return (
              <Link
                key={componentName}
                href={`/components/${componentName}/${firstVariant}`}
                className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{componentName}</h2>
                <p className="text-gray-600 text-sm">{Object.keys(componentData.variants).length} variants available</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}
