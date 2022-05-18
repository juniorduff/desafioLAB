import { PrismaClient, Ticket } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { ITicketRepositoryAdapter } from '../../../adapter/ticket-repository.adapter';
import { CreateTicketDto } from '../../../dto/create-ticket.dto';
import { UpdateTicketDto } from '../../../dto/update-ticket.dto';

@Injectable()
class TicketRepository implements ITicketRepositoryAdapter {
  constructor(private prisma: PrismaClient) {}

  getTicketByEventId(event_id: string): Promise<Ticket> {
    return this.prisma.ticket.findFirst({
      where: {
        event_id,
      },
    });
  }

  async create(data: CreateTicketDto): Promise<Ticket> {
    return this.prisma.ticket.create({
      data: {
        event_id: data.eventId,
        value: data.value,
        quantity: data.quantity,
      },
    });
  }

  getOneById(ticket_id: string): Promise<Ticket> {
    return this.prisma.ticket.findFirst({
      where: {
        id: ticket_id,
      },
    });
  }

  update(data: UpdateTicketDto): Promise<Ticket> {
    return this.prisma.ticket.update({
      where: { id: data.id },
      data: { value: data.value, quantity: data.quantity },
    });
  }
}

export { TicketRepository };
