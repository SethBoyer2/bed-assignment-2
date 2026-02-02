import express, { Express } from "express";
import { HealthCheckResponse } from "./api/v1/models/models";
import { ticketRouter } from "./api/v1/routes/ticketRoutes";
import morgan from "morgan";


// Initialize Express application
const app: Express = express();

app.use(morgan("combined"))

app.use(express.json())
app.use("/api/v1/", ticketRouter)

app.put("/api/v1/tickets/:id/urgency", (req, res) => {
  console.log("BODY:", req.body); // see exactly what Express received
  res.sendStatus(200);
});


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