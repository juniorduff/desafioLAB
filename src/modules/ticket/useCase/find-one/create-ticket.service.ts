import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ITicketRepositoryAdapter } from '../../adapter/ticket-repository.adapter';
import { TicketRepository } from '../../infra/prisma/repository/ticket-repository';
import { Ticket } from '@prisma/client';
import { CreateTicketDto } from '../../dto/create-ticket.dto';
import { EventRepository } from '../../../event/infra/Prisma/event.repository';
import { IEventRepositoryAdapter } from '../../../event/adapter/ievent-repository.adapter';
import { ThowErrorWhenNotExistis } from '../../../../shared/error';

type Request = {
  data: CreateTicketDto;
};

@Injectable()
class CreateTicketService {
  constructor(
    @Inject(EventRepository) private eventRepository: IEventRepositoryAdapter,
    @Inject(TicketRepository)
    private readonly personRepository: ITicketRepositoryAdapter,
  ) {}

  async execute({ data }: Request): Promise<Ticket> {
    const event = await this.eventRepository.getOne(data.eventId);
    ThowErrorWhenNotExistis({
      statusCode: HttpStatus.NOT_FOUND,
      entity: event,
      message: 'Event not found',
    });
    return this.personRepository.create(data);
  }
}

export { CreateTicketService };
