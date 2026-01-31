import { Request, Response } from "express"
import { Ticket } from "../models/models"
import { HTTP_STATUS } from "../../../constants/httpConstants"
import { createTicketService, updateTicketService, getAllTicketService } from "../services/ticketServices"


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

const createTicketValidation = (body: any): Ticket => {
    if (!body.title || body.title !== typeof String) {
        throw new Error("Missing required field: Title")
    }

    if (!body.description || body.description !== typeof String) {
        throw new Error("Missing required field: Description")
    }

    if(!body.priority || body.priority !== typeof String) {
        throw new Error("Missing required field: priority")
    }

    return ({
        id: body.id,
        title: body.title,
        description: body.description,
        priority: body.priority,
        status: body.status,
        createdAt: body.createdAt
    })
}

// Function used to create a ticket object from the req body
export const createTicket = (req: Request, res: Response): void =>  {
    // Create new ticket object
    console.log(req.body)
    try {
        const ticket: Ticket = createTicketValidation(req.body)
        const createdTicket = createTicketService(ticket)
        res.status(HTTP_STATUS.CREATED).json({
            message: "Ticket created successfully.",
            data: createdTicket
        })
    } catch (error) {
        res.status(400).json({
            error: (error as Error).message
        })
    }
}

//Function to update ticket, grabbing the ticket to be updated from the query param
export const updateTicket = (req: Request, res: Response): void => {
    const updatedTicket: Ticket = req.body
    const result: Ticket | undefined = updateTicketService(Number(req.params.id), updatedTicket)

    if(result) {
        res.status(HTTP_STATUS.OK).json({ message: "Ticket Updated.", data: result})
    } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "ticket not found"})
    }
}