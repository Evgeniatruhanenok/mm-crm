import { Link } from "react-router"
import { ArrowRightIcon } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { screens } from "./registry"

const STORYBOOK_URL = "http://localhost:6006"

/** Navigation index at `/` — tiles are generated from the screens registry. */
export default function ScreensIndex() {
  return (
    <main className="mx-auto flex min-h-svh max-w-6xl flex-col gap-(--spacing-xxl) bg-background-default p-(--padding-xl) text-foreground-default">
      <header className="flex flex-col gap-(--spacing-sm)">
        <h1 className="ds-h2">M&A CRM — screens</h1>
        <p className="ds-p text-foreground-muted">Screens built from the design system, wired to a mock data layer — click through like a real product.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-(--spacing-lg)">
        {screens.map((s) => (
          <Link key={s.id} to={s.route} className="group rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            <Card className="h-full transition-shadow group-hover:shadow-md">
              <CardHeader>
                <CardTitle>{s.name}</CardTitle>
                <CardDescription>{s.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto justify-between">
                <code className="ds-meta text-foreground-muted">{s.route}</code>
                <ArrowRightIcon className="size-4 text-icon-muted transition-transform group-hover:translate-x-0.5" />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      <footer className="ds-caption flex flex-wrap gap-(--spacing-lg) border-t border-border-default pt-(--padding-sm) text-foreground-muted">
        <span>Design system:</span>
        {import.meta.env.DEV && <a className="underline underline-offset-4 hover:text-foreground-default" href={STORYBOOK_URL} target="_blank" rel="noreferrer">Storybook catalog</a>}
        <Link className="underline underline-offset-4 hover:text-foreground-default" to="/showcase">Showcase</Link>
      </footer>
    </main>
  )
}
