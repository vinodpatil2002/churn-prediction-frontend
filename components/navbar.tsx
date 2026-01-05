import Link from "next/link"
import { Brain } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Churn Intelligence</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Upload
            </Link>
            <Link
              href="/results"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Results
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
