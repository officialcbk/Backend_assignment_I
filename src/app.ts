// import the express application and type definition
import express, { Express } from "express";
import { calculatePortfolioPerformance } from "./portfolio/portfolioPerformance";
import { findLargestHolding } from "./portfolio/portfolioPerformance";
import { calculateAssetAllocation } from "./portfolio/portfolioPerformance";

// initialize the express application
const app: Express = express();

// Interface for health check response
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

// respond to GET request at endpoint "/" with message
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

/**
 * Health check endpoint that returns server status information
 * @returns JSON response with server health metrics
 */
app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});

/**
 * Portfolio performance endpoint
 */
app.get("/api/v1/portfolio/performance", (req, res) => {
  try {
    const result = calculatePortfolioPerformance(10000, 12000); 
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error calculating performance" });
  }
});

/**
 * Largest holding endpoint
 */
app.get("/api/v1/portfolio/largest-holding", (req, res) => {
  try {
    const assets = [
      { name: "APPLE", value: 5000 },
      { name: "GOOGLE", value: 7000 },
    ];
    const result = findLargestHolding(assets);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching largest holding" });
  }
});

/**
 * Asset allocation endpoint
 */
app.get("/api/v1/portfolio/allocation", (req, res) => {
  try {
    const assets = [
      { name: "APPLE", value: 5000 },
      { name: "GOOGLE", value: 7000 },
    ];
    const result = calculateAssetAllocation(assets);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error calculating allocation" });
  }
});


// export app and server for testing
export default app;