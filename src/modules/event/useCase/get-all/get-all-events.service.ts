import { Inject, Injectable } from '@nestjs/common';
import { EventRepository } from '../../infra/Prisma/event.repository';
import { IEventRepositoryAdapter } from '../../adapter/ievent-repository.adapter';

@Injectable()
class GetAllEventsService {
  constructor(
    @Inject(EventRepository)
    private readonly eventRepository: IEventRepositoryAdapter,
  ) {}

  async execute() {
    console.log('FindAllEventService');
    return this.eventRepository.getAll();
  }
}

export { GetAllEventsService };
