import { Module } from '@nestjs/common';
import { TicketRepository } from './infra/prisma/repository/ticket-repository';
import { CreatePersonService } from '../person/useCase/create/create-person.service';
import { PrismaClient } from '@prisma/client';
import { CreateTicketController } from './useCase/create/create-ticket.controller';
import { PersonRepository } from '../person/infra/prisma/repository/person-repository';
import { CreateTicketService } from './useCase/create/create-ticket.service';
import { EventRepository } from '../event/infra/Prisma/event.repository';
import { UpdateTicketController } from './useCase/update/update-ticket.controller';
import { UpdateTicketService } from './useCase/update/update-ticket.service';

@Module({
  controllers: [CreateTicketController, UpdateTicketController],
  providers: [
    TicketRepository,
    CreatePersonService,
    PersonRepository,
    UpdateTicketService,
    CreateTicketService,
    EventRepository,
    PrismaClient,
  ],
})
export class TicketModule {}
