"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface UploadCardProps {
  onFileUpload: (file: File) => void
  isLoading: boolean
}

export function UploadCard({ onFileUpload, isLoading }: UploadCardProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile && selectedFile.name.endsWith(".csv")) {
      setFile(selectedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileChange(droppedFile)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = () => {
    if (file) {
      onFileUpload(file)
    }
  }

  return (
    <Card className="p-8 shadow-lg border-border/50">
      <div className="space-y-6">
        <div
          className={cn(
            "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all",
            isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50",
            file && "border-primary/50 bg-primary/5",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          />

          <div className="flex flex-col items-center gap-4">
            {file ? (
              <>
                <div className="p-3 rounded-full bg-primary/10">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFile(null)
                  }}
                  className="text-xs"
                >
                  Remove file
                </Button>
              </>
            ) : (
              <>
                <div className="p-3 rounded-full bg-muted">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Drop your CSV file here, or click to browse</p>
                  <p className="text-xs text-muted-foreground">Only .csv files are accepted</p>
                </div>
              </>
            )}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!file || isLoading}
          className="w-full h-11 rounded-xl font-medium"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Predict Churn"
          )}
        </Button>
      </div>
    </Card>
  )
}
