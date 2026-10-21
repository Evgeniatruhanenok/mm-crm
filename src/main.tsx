import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Link, RouterProvider } from 'react-router'
import { FileQuestionIcon } from 'lucide-react'
import './index.css'
import { Button } from './components/ui/button'
import { Toaster } from './components/ui/sonner'
import { TooltipProvider } from './components/ui/tooltip'
import { DataProvider } from './data'
import Showcase from './Showcase.tsx'
import ScreensIndex from './screens/ScreensIndex.tsx'
import { EmptyState } from './screens/_shared/EmptyState.tsx'
import { screens } from './screens/registry.ts'

function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background-default p-(--padding-xl)">
      <EmptyState icon={FileQuestionIcon} title="Page not found" description="This screen doesn’t exist in the prototype."
        action={<Button asChild><Link to="/">All screens</Link></Button>} />
    </main>
  )
}

const router = createBrowserRouter([
  { path: '/', element: <ScreensIndex /> },
  { path: '/showcase', element: <Showcase /> },
  ...screens.filter((s) => !s.alias).map(({ route, path, component: Screen }) => ({ path: path ?? route, element: <Screen /> })),
  { path: '*', element: <NotFound /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster theme="light" position="bottom-right" richColors={false} />
      </TooltipProvider>
    </DataProvider>
  </StrictMode>,
)
