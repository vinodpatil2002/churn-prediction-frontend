/**
 * API Service for Customer Churn Prediction Platform
 *
 * This service will eventually connect to the ML backend at:
 * POST http://localhost:8000/predict/batch
 *
 * For now, it returns mock data for development purposes.
 */

export interface ChurnResult {
    tenure: number;
    MonthlyCharges: number;
    Contract: string;
    PaymentMethod: string;
    churn_probability: number;
    churn_prediction: number;
}

export interface ChurnPredictionResponse {
    total_customers: number;
    churn_risk_count: number;
    results: ChurnResult[];
}

/**
 * Mock data for development - simulating batch churn prediction results
 */
// const generateMockChurnData = (): ChurnPredictionResponse => {
//   const contracts = ["Month-to-Month", "One Year", "Two Year"]
//   const paymentMethods = ["Electronic Check", "Mailed Check", "Bank Transfer", "Credit Card"]

//   const results: ChurnResult[] = Array.from({ length: 50 }, (_, index) => {
//     const tenure = Math.floor(Math.random() * 72) + 1
//     const monthlyCharges = Number.parseFloat((Math.random() * 100 + 20).toFixed(2))
//     const churnProbability = Number.parseFloat((Math.random() * 100).toFixed(2))

//     return {
//       tenure,
//       MonthlyCharges: monthlyCharges,
//       Contract: contracts[Math.floor(Math.random() * contracts.length)],
//       PaymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
//       churn_probability: churnProbability,
//       churn_prediction: churnProbability > 50 ? 1 : 0,
//     }
//   })

//   // Sort by churn probability descending (highest risk first)
//   results.sort((a, b) => b.churn_probability - a.churn_probability)

//   const churnRiskCount = results.filter((r) => r.churn_prediction === 1).length

//   return {
//     total_customers: results.length,
//     churn_risk_count: churnRiskCount,
//     results,
//   }
// }

/**
 * Simulate batch churn prediction API call
 *
 * @param file - CSV file containing customer data
 * @returns Promise with churn prediction results
 */
export async function predictChurn(
    file: File
): Promise<ChurnPredictionResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8000/predict/batch", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to predict churn");
    }

    return response.json();
}

/**
 * Store churn prediction results in session storage for results page
 */
export function storeChurnResults(data: ChurnPredictionResponse): void {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("churnResults", JSON.stringify(data));
    }
}

/**
 * Retrieve stored churn prediction results
 */
export function getStoredChurnResults(): ChurnPredictionResponse | null {
    if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem("churnResults");
        return stored ? JSON.parse(stored) : null;
    }
    return null;
}

/**
 * Clear stored churn prediction results
 */
export function clearChurnResults(): void {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem("churnResults");
    }
}
