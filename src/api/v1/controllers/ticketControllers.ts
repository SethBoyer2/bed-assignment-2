import { Request, Response } from "express";
import { Ticket } from "../models/models";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import {
  createTicketService,
  updateTicketService,
  getAllTicketService,
  getTicketByIdService,
  deleteTicketService
} from "../services/ticketServices";

export const getAllTickets = (req: Request, res: Response): void => {
  try {
    const tickets = getAllTicketService();
    res.status(HTTP_STATUS.OK).json({
      message: "List of tickets retrieved",
      data: tickets,
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve tickets",
    });
  }
};

export const deleteTicket = (req: Request, res: Response): void => {
    const result = deleteTicketService(Number(req.params.id));

    if (result) {
        res.status(HTTP_STATUS.NO_CONTENT).json({ message: "Ticket deleted successfully"});
    } else {
        res.status(HTTP_STATUS.NOT_FOUND).send();
    }

};

export const getTicketById = (req: Request, res: Response): void => {

    const ticket: Ticket | undefined = getTicketByIdService(Number(req.params.id));

    if (ticket) {
        res.status(HTTP_STATUS.OK).json({ message: "ticket found", data: ticket });
    } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "ticket not found" });
    }
};

// Function used to create a ticket object from the req body
export const createTicket = (req: Request, res: Response): void => {
  // Create new ticket object
  console.log("BODY:", req.body);
  console.log("TITLE VALUE:", req.body?.title);
  console.log("TITLE TYPE:", typeof req.body?.title);
  try {
    if (!req.body.title || typeof req.body.title !== "string") {
      throw new Error("Missing required field: Title");
    }
    if (!req.body.description || typeof req.body.description !== "string") {
      throw new Error("Missing required field: description");
    }
    if (!req.body.priority || typeof req.body.priority !== "string") {
      throw new Error("Missing required field: priority");
    }

    const ticket: Ticket = req.body;
    const createdTicket = createTicketService(ticket);

    res.status(HTTP_STATUS.CREATED).json({
      message: "Ticket created successfully.",
      data: createdTicket,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//Function to update ticket, grabbing the ticket to be updated from the query param
export const updateTicket = (req: Request, res: Response): void => {
  const updatedTicket: Ticket = req.body;
  const result: Ticket | undefined = updateTicketService(
    Number(req.params.id),
    updatedTicket,
  );

  if (result) {
    res
      .status(HTTP_STATUS.OK)
      .json({ message: "Ticket Updated.", data: result });
  } else {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "ticket not found" });
  }
};
