import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ITicketRepositoryAdapter } from '../../adapter/ticket-repository.adapter';
import { TicketRepository } from '../../infra/prisma/repository/ticket-repository';
import { Ticket } from '@prisma/client';
import { EventRepository } from '../../../event/infra/Prisma/event.repository';
import { IEventRepositoryAdapter } from '../../../event/adapter/ievent-repository.adapter';
import { ThowErrorWhenNotExistis } from '../../../../shared/error';
import { UpdateTicketDto } from '../../dto/update-ticket.dto';

type Request = {
  data: UpdateTicketDto;
};

@Injectable()
class UpdateTicketService {
  constructor(
    @Inject(EventRepository) private eventRepository: IEventRepositoryAdapter,
    @Inject(TicketRepository)
    private readonly ticketRepository: ITicketRepositoryAdapter,
  ) {}

  async execute({ data }: Request): Promise<Ticket> {
    const event = await this.eventRepository.getOne(data.id);
    ThowErrorWhenNotExistis({
      statusCode: HttpStatus.NOT_FOUND,
      entity: event,
      message: 'Event not found',
    });
    return this.ticketRepository.update(data);
  }
}

export { UpdateTicketService };
