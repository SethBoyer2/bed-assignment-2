import { Ticket } from "../models/models";

const tickets: Ticket[] = [
    {id: 1, title: "Update footer copyright year", description: "Footer still shows 2024", priority: "low", status: "open", createdAt: '2026-01-29T10:00:00.000Z', urgency: 0, urgencylevel: "default"},
    {id: 2, title: "Profile picture upload show", description:"upload takes 30+ seconds", priority: "medium", status: "open", createdAt: '2026-01-30T10:00:00.000Z', urgency: 0, urgencylevel: "default"},
    {id: 3, title: "Dashboard loading slowly", description: "Dashboard takes 10+ seconds to load", priority: "medium", status: "open", createdAt: '2026-01-26T10:00:00.000Z', urgency: 0, urgencylevel: "default"},
    {id: 4, title: "Password reset email delayed", description: "Reset emails taking over 30 minutes", priority: "high", status: "open", createdAt: '2026-01-27T10:00:00.000Z', urgency: 0, urgencylevel: "default"},
    {id: 5, title: "Export to PDF not working", description: "PDF export fails silently", priority: "high", status: "open", createdAt: '2026-01-023T10:00:00.000Z', urgency: 0, urgencylevel: "default"},
    {id: 6, title: "Login page not loading", description: "Users report blanks screen on login", priority: "critical", status: "open", createdAt: '2026-01-26T10:00:00.000Z', urgency: 0, urgencylevel: "default"},
    {id: 7, title: "Dark mode toggle broken", description: "dark mode doesn't persist after refresh", priority: "medium", status: "resolved", createdAt: '2026-01-22T10:00:00.000Z', urgency: 0, urgencylevel: "default"},
    {id: 8, title: "Dark mode toggle broken", description: "dark mode doesn't persist after refresh", priority: "medium", status: "resolved", createdAt: '2026-01-17T10:00:00.000Z', urgency: 0, urgencylevel: "default"},
    {id: 9, title: "Dark mode toggle broken", description: "dark mode doesn't persist after refresh", priority: "medium", status: "resolved", createdAt: '2026-01-20T10:00:00.000Z', urgency: 0, urgencylevel: "default"}
]


export const getAllTicketService = (): Ticket[] => {
    return tickets

}

export const createTicketService = (ticket: Ticket): Ticket => {
    tickets.push(ticket)
    return ticket
}

export const getTicketByIdService = (id: number): Ticket | undefined => {
    return tickets.find(ticket => ticket.id === id);
};

export const deleteTicketService = (id: number): boolean => {
  const index = tickets.findIndex(t => t.id === id);

  if (index === -1) return false;

  tickets.splice(index, 1);
  return true;
};

export const updateTicketService = (id: number, updatedTicket: Ticket): Ticket | undefined => {
    const index = tickets.findIndex(t => t.id === id)

    if (index === -1) return undefined

    tickets [index] = {
        ...tickets[index],
        ...updatedTicket,
    }

    return tickets[index]
}

export const urgencyScoreService = (id: number, urgency: number): Ticket | undefined => {
    const index = tickets.findIndex(ticket => ticket.id === id)

    if (index === -1) return undefined

    tickets [index].urgency = urgency

    return tickets[index]
}