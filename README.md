# Component Library

A Storybook-like component library built with Next.js, featuring interactive component viewing and testing capabilities.

## Features

- **Interactive Component Viewer**: View and test components with live controls
- **Variant Support**: Multiple variants for each component
- **Real-time Controls**: Adjust component props in real-time
- **Type-safe**: Full TypeScript support with proper type definitions
- **Static Generation**: Pre-rendered pages for optimal performance
- **Responsive Design**: Works on desktop and mobile devices

## Recent Fixes

### Hydration Error Fix
- Fixed incorrect `Link` import from `lucide-react` → `next/link`
- Added proper TypeScript types to prevent indexing errors
- Resolved component registry type safety issues

### Component Transition Issue Fix
- Removed `useEffect` dependency that caused initial render with default props
- Components now render with correct variant props immediately
- No more visual transitions from default to variant styles

### Type Safety Improvements
- Added comprehensive TypeScript interfaces for component registry
- Proper typing for component controls and variants
- Type-safe component indexing and prop handling

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
orbit/
├── app/                          # Next.js app directory
│   ├── components/               # Dynamic component pages
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── ui/                      # Base UI components
│   ├── component-library.tsx    # Main library component
│   ├── component-viewer.tsx     # Component viewer
│   ├── control-panel.tsx        # Interactive controls
│   └── sidebar.tsx              # Navigation sidebar
└── lib/
    ├── components-registry.ts   # Component definitions
    └── utils.ts                 # Utility functions
```

## Adding New Components

1. Create your component in `components/ui/`
2. Add it to the `componentRegistry` in `lib/components-registry.ts`
3. Define variants and controls
4. The component will automatically appear in the library

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **class-variance-authority** - Component variant management
