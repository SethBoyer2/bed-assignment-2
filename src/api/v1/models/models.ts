export interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

export interface Ticket {
    id: number,
    title: string,
    description: string,
    priority: string,
    status: string,
    createdate: string
}