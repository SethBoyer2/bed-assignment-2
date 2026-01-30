import express, { Router } from "express";
import { createTicket, updateTicket } from "../controllers/ticketControllers";

export const ticketRouter: Router = express.Router()

ticketRouter.post("/tickets", createTicket)
ticketRouter.put("/tickets/:id", updateTicket)