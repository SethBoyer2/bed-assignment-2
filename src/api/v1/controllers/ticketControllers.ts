import { Request, Response } from "express";
import { Ticket } from "../models/models";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import {
  createTicketService,
  updateTicketService,
  getAllTicketService,
  getTicketByIdService,
  deleteTicketService,
  urgencyScoreService,
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
    res
      .status(HTTP_STATUS.NO_CONTENT)
      .json({ message: "Ticket deleted successfully" });
  } else {
    res.status(HTTP_STATUS.NOT_FOUND).send();
  }
};

export const getTicketById = (req: Request, res: Response): void => {
  const ticket: Ticket | undefined = getTicketByIdService(
    Number(req.params.id),
  );

  if (ticket) {
    res.status(HTTP_STATUS.OK).json({ message: "ticket found", data: ticket });
  } else {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "ticket not found" });
  }
};

// Function used to create a ticket object from the req body
export const createTicket = (req: Request, res: Response): void => {
  // Create new ticket object
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

export const urgencyScoreCalculation = (req: Request, res: Response): void => {
  const id = Number(req.params.id);

  const ticket = getTicketByIdService(id);

  if (!ticket) {
    res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: "Ticket invalid or not found" });
    return;
  }

  //  map rather than elif chain or long switchcase for deciding baseScore values based on priority
  let priorityMap = new Map<string, number>([
    ["low", 10],
    ["medium", 20],
    ["high", 30],
    ["critical", 50],
  ]);

  // grab baseScore from the map, using the ticket priority string as the key
  let baseScore = priorityMap.get(ticket.priority);

  if (!baseScore) {
    res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Invalid field: priority" });
    return;
  }

  // Convert createdAt to milliseconds (Number) so it can be used in difference calculation
  const createdAtAsNumber = new Date(ticket.createdAt).getTime();
  // variable containing the milliseconds in a day
  const milliPerDay = 1000 * 60 * 60 * 24;
  // Calculate difference between the current date and createdAt date, in days for ticket age
  const ticketAge = Math.floor((Date.now() - createdAtAsNumber) / milliPerDay);

  const urgency = baseScore + ticketAge * 5;
  ticket.urgency = urgency;

  if (urgency  >25) {
  ticket.urgencylevel = "medium";
} else if (urgency >50) {
  ticket.urgencylevel = "high";
} else if (urgency >= 80) {
  ticket.urgencylevel = "critical";
} else  {
  ticket.urgencylevel = "low";
}

  const result = urgencyScoreService(id, urgency);

  if (!result) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
  }

  res.status(HTTP_STATUS.OK).json({
    message: "urgency calculated",
    date: result,
  });
};

// TypeError: Cannot read properties of undefined (reading 'priority')
//     at urgencyScoreCalculation (C:\Users\sethb\Desktop\rrc-polytech\term3\BED\ongoing\boyer_seth-bed-assignment-2\src\api\v1\controllers\ticketControllers.ts:106:44)
//     at Layer.handleRequest (C:\Users\sethb\Desktop\rrc-polytech\term3\BED\ongoing\boyer_seth-bed-assignment-2\node_modules\router\lib\layer.js:152:17)
//     at next (C:\Users\sethb\Desktop\rrc-polytech\term3\BED\ongoing\boyer_seth-bed-assignment-2\node_modules\router\lib\route.js:157:13)
//     at Route.dispatch (C:\Users\sethb\Desktop\rrc-polytech\term3\BED\ongoing\boyer_seth-bed-assignment-2\node_modules\router\lib\route.js:117:3)
//     at handle (C:\Users\sethb\Desktop\rrc-polytech\term3\BED\ongoing\boyer_seth-bed-assignment-2\node_modules\router\index.js:435:11)
//     at Layer.handleRequest (C:\Users\sethb\Desktop\rrc-polytech\term3\BED\ongoing\boyer_seth-bed-assignment-2\node_modules\router\lib\layer.js:152:17)
//     at C:\Users\sethb\Desktop\rrc-polytech\term3\BED\ongoing\boyer_seth-bed-assignment-2\node_modules\router\index.js:295:15
//     at param (C:\Users\sethb\Desktop\rrc-polytech\term3\BED\ongoing\boyer_seth-bed-assignment-2\node_modules\router\index.js:600:14)
//     at param (C:\Users\sethb\Desktop\rrc-polytech\term3\BED\ongoing\boyer_seth-bed-assignment-2\node_modules\router\index.js:610:14)
//     at processParams (C:\Users\sethb\Desktop\rrc-polytech\term3\BED\ongoing\boyer_seth-bed-assignment-2\node_modules\router\index.js:664:3)
