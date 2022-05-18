import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EventRepository } from '../../infra/Prisma/event.repository';
import { IEventRepositoryAdapter } from '../../adapter/ievent-repository.adapter';
import { ThowErrorWhenNotExistis } from '../../../../shared/error';

@Injectable()
class FindOneEventService {
  constructor(
    @Inject(EventRepository)
    private readonly eventRepository: IEventRepositoryAdapter,
  ) {}

  async execute(event_id: string) {
    const event = await this.eventRepository.getOne(event_id);
    ThowErrorWhenNotExistis({
      statusCode: HttpStatus.NOT_FOUND,
      entity: event,
      message: `Event with id ${event_id} not found`,
    });
    return event;
  }
}

export { FindOneEventService };
