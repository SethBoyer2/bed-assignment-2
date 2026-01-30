import { Request, Response } from "express"
import { Ticket } from "../models/models"
import { HTTP_STATUS } from "src/constants/httpConstants"
import { createTicketService, updateTicketService } from "../services/ticketServices"


export const createTicket = (req: Request, res: Response): void =>  {
    // Create new ticket object
    const ticket: Ticket = req.body
    const createdTicket = createTicketService(ticket)

    res.status(HTTP_STATUS.CREATED).json({
        message: "Ticket Created Successfully.",
        data: createdTicket
    })
}

export const updateTicket = (req: Request, res: Response): void => {
    const updatedTicket: Ticket = req.body
    const result: Ticket | undefined = updateTicketService(Number(req.params.id), updatedTicket)

    if(result) {
        res.status(HTTP_STATUS.OK).json({ message: "Ticket Updated.", data: result})
    } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "ticket not found"})
    }
}