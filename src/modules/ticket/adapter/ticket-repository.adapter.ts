import { Ticket } from '@prisma/client';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';

interface ITicketRepositoryAdapter {
  create: (data: CreateTicketDto) => Promise<Ticket>;
  update: (data: UpdateTicketDto) => Promise<Ticket>;
  getOneById: (ticket_id: string) => Promise<Ticket>;
  getTicketByEventId: (event_id: string) => Promise<Ticket>;
}

export { ITicketRepositoryAdapter };
