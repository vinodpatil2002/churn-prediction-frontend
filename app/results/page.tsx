"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SummaryCard } from "@/components/summary-card";
import { ResultsTable } from "@/components/results-table";
import { Button } from "@/components/ui/button";
import {
    Users,
    AlertTriangle,
    TrendingUp,
    Upload,
    Download,
} from "lucide-react";
import {
    getStoredChurnResults,
    clearChurnResults,
    type ChurnPredictionResponse,
    ChurnResult,
} from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { ChurnRiskChart } from "@/components/churn-risk-chart";

function getRiskBuckets(results: ChurnResult[]) {
    return {
        low: results.filter((r) => r.churn_probability < 0.2).length,
        medium: results.filter(
            (r) => r.churn_probability >= 0.2 && r.churn_probability < 0.4
        ).length,
        high: results.filter(
            (r) => r.churn_probability >= 0.4 && r.churn_probability < 0.6
        ).length,
        critical: results.filter((r) => r.churn_probability >= 0.6).length,
    };
}

export default function ResultsPage() {
    const [data, setData] = useState<ChurnPredictionResponse | null>(null);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const storedResults = getStoredChurnResults();

        if (!storedResults) {
            router.push("/");
            return;
        }

        setData(storedResults);
    }, [router]);

    const handleNewUpload = () => {
        clearChurnResults();
        router.push("/");
    };

    const handleDownload = () => {
        if (!data) return;

        // Create CSV content
        const headers = [
            "Tenure",
            "Monthly Charges",
            "Contract",
            "Payment Method",
            "Churn Probability",
            "Churn Prediction",
        ];
        const rows = data.results.map((r) => [
            r.tenure,
            r.MonthlyCharges.toFixed(2),
            r.Contract,
            r.PaymentMethod,
            (r.churn_probability * 100).toFixed(2),
            r.churn_prediction === 1 ? "High Risk" : "Low Risk",
        ]);

        const csvContent = [headers, ...rows]
            .map((row) => row.join(","))
            .join("\n");

        // Create download link
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "churn_predictions.csv";
        a.click();
        window.URL.revokeObjectURL(url);

        toast({
            title: "Success",
            description: "Results downloaded successfully",
        });
    };

    if (!data) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-muted-foreground">Loading results...</p>
                </div>
            </div>
        );
    }

    const buckets = getRiskBuckets(data.results);

    const chartData = [
        { label: "Low (0–20%)", count: buckets.low },
        { label: "Medium (20–40%)", count: buckets.medium },
        { label: "High (40–60%)", count: buckets.high },
        { label: "Critical (60%+)", count: buckets.critical },
    ];

    const churnPercentage = (
        (data.churn_risk_count / data.total_customers) *
        100
    ).toFixed(1);

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                            Churn Prediction Results
                        </h1>
                        <p className="text-muted-foreground">
                            Analysis of customer churn risk based on your data
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={handleNewUpload}
                            className="gap-2 bg-transparent"
                        >
                            <Upload className="h-4 w-4" />
                            Upload New File
                        </Button>
                        <Button onClick={handleDownload} className="gap-2">
                            <Download className="h-4 w-4" />
                            Download Results
                        </Button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <SummaryCard
                        icon={Users}
                        label="Total Customers"
                        value={data.total_customers}
                    />
                    <SummaryCard
                        icon={AlertTriangle}
                        label="Customers at Risk"
                        value={data.churn_risk_count}
                        className="border-destructive/20"
                    />
                    <SummaryCard
                        icon={TrendingUp}
                        label="Churn Risk Percentage"
                        value={`${churnPercentage}%`}
                    />
                </div>
                {/* Charts */}
                <div className="mb-8">
                    <ChurnRiskChart data={chartData} />
                </div>

                {/* Results Table */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-foreground">
                            Customer Details
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {data.results.length} records
                        </p>
                    </div>
                    <ResultsTable results={data.results} />
                </div>
            </div>
        </div>
    );
}
