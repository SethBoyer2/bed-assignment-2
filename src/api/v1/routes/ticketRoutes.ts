import express, { Router } from "express";
import { createTicket, updateTicket, getAllTickets } from "../controllers/ticketControllers";

export const ticketRouter: Router = express.Router()

ticketRouter.get("/tickets", getAllTickets)
ticketRouter.post("/tickets", createTicket)
ticketRouter.put("/tickets/:id", updateTicket)