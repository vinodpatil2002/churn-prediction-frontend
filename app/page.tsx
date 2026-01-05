"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { UploadCard } from "@/components/upload-card"
import { StatsCard } from "@/components/stats-card"
import { Zap, BarChart3, Search } from "lucide-react"
import { predictChurn, storeChurnResults } from "@/services/api"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleFileUpload = async (file: File) => {
    setIsLoading(true)

    try {
      const data = await predictChurn(file)

      // Store results for the results page
      storeChurnResults(data)

      toast({
        title: "Success",
        description: `Processed ${data.total_customers} customers successfully`,
      })

      // Navigate to results page
      router.push("/results")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process the file. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 lg:py-20 max-w-5xl">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground text-balance tracking-tight">
            Customer Churn Intelligence
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Upload customer data and identify churn risk using machine learning
          </p>
        </div>

        {/* Upload Card */}
        <div className="mb-16">
          <UploadCard onFileUpload={handleFileUpload} isLoading={isLoading} />
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            icon={Zap}
            title="Fast ML Inference"
            description="Get instant churn predictions powered by optimized machine learning models"
          />
          <StatsCard
            icon={BarChart3}
            title="Batch Customer Scoring"
            description="Process thousands of customer records in a single upload with detailed analytics"
          />
          <StatsCard
            icon={Search}
            title="Explainable Predictions"
            description="Understand the key factors driving churn risk for each customer segment"
          />
        </div>
      </div>
    </div>
  )
}
