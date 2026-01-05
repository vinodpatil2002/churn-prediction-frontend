import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface SummaryCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  trend?: string
  className?: string
}

export function SummaryCard({ icon: Icon, label, value, trend, className }: SummaryCardProps) {
  return (
    <Card className={`p-6 shadow-sm border-border/50 ${className || ""}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
        </div>
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </Card>
  )
}
