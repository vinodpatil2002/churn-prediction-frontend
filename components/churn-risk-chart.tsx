"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"

export function ChurnRiskChart({ data }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Churn Risk Distribution</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
