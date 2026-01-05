# churn-prediction-frontend

## Overview
This repository contains the frontend dashboard for a customer churn prediction system.
It allows users to upload customer data, visualize churn risk, and analyze predictions
returned by a backend machine learning API.

The application focuses on presenting model outputs in a clear and actionable way for
non-technical users.

---

## Features
- CSV file upload for batch customer analysis
- Summary metrics for churn risk distribution
- Tabular view of customer-level predictions
- Interactive charts to visualize churn risk buckets
- Downloadable prediction results

---

## User Flow
1. User uploads a CSV file containing customer data
2. Frontend sends the file to the backend prediction API
3. Churn probabilities and risk labels are returned
4. Results are displayed using tables and charts
5. User can download predictions for further analysis

---

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Fetch API for backend communication

---

## Running Locally

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The application will be available at:
```bash
http://localhost:3000
```

---
## Notes

 - This frontend consumes a FastAPI-based backend hosted separately
 - Backend API endpoints are configurable in the service layer
 - Backend API endpoints are configurable in the service layer


---
