"use client";

import { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ChurnResult } from "@/services/api";

interface ResultsTableProps {
    results: ChurnResult[];
}

type SortField = "tenure" | "MonthlyCharges" | "churn_probability";
type SortDirection = "asc" | "desc";

export function ResultsTable({ results }: ResultsTableProps) {
    const [sortField, setSortField] = useState<SortField>("churn_probability");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

    const sortedResults = useMemo(() => {
        return [...results].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (sortDirection === "asc") {
                return aValue > bValue ? 1 : -1;
            }
            return aValue < bValue ? 1 : -1;
        });
    }, [results, sortField, sortDirection]);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    return (
        <Card className="shadow-sm border-border/50">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="sticky top-0 bg-card z-10">
                        <TableRow className="hover:bg-transparent border-b border-border">
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2 lg:px-3 text-xs font-semibold"
                                    onClick={() => handleSort("tenure")}
                                >
                                    Tenure
                                    <ArrowUpDown className="ml-2 h-3 w-3" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2 lg:px-3 text-xs font-semibold"
                                    onClick={() => handleSort("MonthlyCharges")}
                                >
                                    Monthly Charges
                                    <ArrowUpDown className="ml-2 h-3 w-3" />
                                </Button>
                            </TableHead>
                            <TableHead className="text-xs font-semibold">
                                Contract
                            </TableHead>
                            <TableHead className="text-xs font-semibold">
                                Payment Method
                            </TableHead>
                            <TableHead>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2 lg:px-3 text-xs font-semibold"
                                    onClick={() =>
                                        handleSort("churn_probability")
                                    }
                                >
                                    Churn Probability
                                    <ArrowUpDown className="ml-2 h-3 w-3" />
                                </Button>
                            </TableHead>
                            <TableHead className="text-xs font-semibold">
                                Risk Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedResults.map((result, index) => (
                            <TableRow
                                key={index}
                                className={`hover:bg-muted/50 transition-colors ${
                                    result.churn_prediction === 1
                                        ? "bg-destructive/5"
                                        : ""
                                }`}
                            >
                                <TableCell className="font-medium">
                                    {result.tenure} months
                                </TableCell>
                                <TableCell>
                                    ${result.MonthlyCharges.toFixed(2)}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {result.Contract}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {result.PaymentMethod}
                                </TableCell>
                                <TableCell className="font-semibold">
                                    {(result.churn_probability * 100).toFixed(
                                        1
                                    )}
                                    %
                                </TableCell>
                                <TableCell>
                                    {result.churn_prediction === 1 ? (
                                        <Badge
                                            variant="destructive"
                                            className="font-medium"
                                        >
                                            High Risk
                                        </Badge>
                                    ) : (
                                        <Badge
                                            variant="secondary"
                                            className="font-medium"
                                        >
                                            Low Risk
                                        </Badge>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}
