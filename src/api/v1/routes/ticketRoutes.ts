import express, { Router } from "express";
import { createTicket, updateTicket, getAllTickets, getTicketById, deleteTicket } from "../controllers/ticketControllers";

export const ticketRouter: Router = express.Router()

ticketRouter.get("/tickets/:id", getTicketById)
ticketRouter.delete("/tickets/:id", deleteTicket);
ticketRouter.put("/tickets/:id", updateTicket)
ticketRouter.get("/tickets", getAllTickets)
ticketRouter.post("/tickets", createTicket)
