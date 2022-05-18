import { Module } from '@nestjs/common';
import { CreatePersonController } from './useCase/create/create-person.controller';
import { CreatePersonService } from './useCase/create/create-person.service';
import { PersonRepository } from './infra/prisma/repository/person-repository';
import { PrismaClient } from '@prisma/client';
import { BuyTicketService } from './useCase/buyTick/buy-ticket.service';
import { BuyTicketController } from './useCase/buyTick/buy-ticket.controller';
import { TicketRepository } from '../ticket/infra/prisma/repository/ticket-repository';
import { UpdatePersonService } from './useCase/update/update-person.service';
import { UpdatePersonController } from './useCase/update/update-person.controller';
import { DeletePersonController } from './useCase/delete/delete-person.controller';
import { DeletePersonService } from './useCase/delete/delete-person.service';

@Module({
  controllers: [
    CreatePersonController,
    UpdatePersonController,
    BuyTicketController,
    DeletePersonController,
  ],
  providers: [
    CreatePersonService,
    UpdatePersonService,
    DeletePersonService,
    PersonRepository,
    BuyTicketService,
    TicketRepository,
    PrismaClient,
  ],
})
export class PersonModule {}
