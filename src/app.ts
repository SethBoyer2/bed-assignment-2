import express, { Express } from "express";
import { HealthCheckResponse } from "./api/v1/models/models";
import { ticketRouter } from "./api/v1/routes/ticketRoutes";
import morgan from "node_modules/@types/morgan";

// Initialize Express application
const app: Express = express();

app.use(express.json())

app.use(morgan("combined"))

app.use("/api/v1", ticketRouter)


app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});

export default app;