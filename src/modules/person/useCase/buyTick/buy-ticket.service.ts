import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IPersonRepositoryAdapter } from '../../adapter/i-person-repository.adapter';
import { PersonRepository } from '../../infra/prisma/repository/person-repository';
import { Person } from '@prisma/client';
import { ThowErrorWhenNotExistis } from '../../../../shared/error';
import { BuyTicketDto } from '../../dto/buy-ticket.dto';
import { TicketRepository } from '../../../ticket/infra/prisma/repository/ticket-repository';
import { ITicketRepositoryAdapter } from 'src/modules/ticket/adapter/ticket-repository.adapter';

type Request = {
  data: BuyTicketDto;
};

@Injectable()
class BuyTicketService {
  constructor(
    @Inject(PersonRepository)
    private readonly personRepository: IPersonRepositoryAdapter,
    @Inject(TicketRepository)
    private readonly ticketRepository: ITicketRepositoryAdapter,
  ) {}

  async execute({ data }: Request): Promise<Person> {
    const { ticket_id } = data;
    const getTicket = await this.ticketRepository.getOneById(ticket_id);
    ThowErrorWhenNotExistis({
      message: 'Ticket Not exists',
      statusCode: HttpStatus.NOT_FOUND,
      entity: getTicket,
    });

    if (getTicket.quantity < data.quantity) {
      throw new BadRequestException(
        'Ticket not have enough quantity please wait  for new batch',
      );
    }
    getTicket.quantity = getTicket.quantity - data.quantity;

    return this.personRepository.buyTicket(getTicket, data.person_id);
  }
}

export { BuyTicketService };
