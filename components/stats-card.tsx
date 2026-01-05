import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function StatsCard({ icon: Icon, title, description }: StatsCardProps) {
  return (
    <Card className="p-6 shadow-sm border-border/50 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </Card>
  )
}
