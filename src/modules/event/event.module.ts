import { Module } from '@nestjs/common';
import { CreateEventService } from './useCase/create/create-event.service';
import { CreateEventController } from './useCase/create/create-event.controller';
import { PrismaClient } from '@prisma/client';
import { EventRepository } from './infra/Prisma/event.repository';
import { InstitutionRepository } from '../institution/infra/prisma/institution.repository';
import { FindOneEventService } from './useCase/find-one/find-one-event.service';
import { FindOneEventController } from './useCase/find-one/find-one-event.controller';
import { GetAllEventsService } from './useCase/get-all/get-all-events.service';
import { GetAllEventsController } from './useCase/get-all/get-all-events.controller';
import { GetStaticsEventController } from './useCase/statics-ticket/get-statics-event.controller';
import { GetStaticsEventService } from './useCase/statics-ticket/get-statics-event.service';

@Module({
  controllers: [
    CreateEventController,
    FindOneEventController,
    GetAllEventsController,
    GetStaticsEventController,
  ],
  providers: [
    CreateEventService,
    FindOneEventService,
    GetAllEventsService,
    EventRepository,
    InstitutionRepository,
    GetStaticsEventService,
    PrismaClient,
  ],
})
export class EventModule {}
