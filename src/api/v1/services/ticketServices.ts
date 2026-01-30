import { Ticket } from "../models/models";

const tickets: Ticket[] = []

export const createTicketService = (ticket: Ticket): Ticket => {
    tickets.push(ticket)
    return ticket
}

export const updateTicketService = (id: number, updatedTicket: Ticket): Ticket | undefined => {
    const index = tickets.findIndex(t => t.id === id)

    if (index === -1) return undefined

    tickets [index] = {
        ...tickets[index],
        ...updatedTicket,
    }

    return tickets[index]
}