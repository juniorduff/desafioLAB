import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EventRepository } from '../../infra/Prisma/event.repository';
import { IEventRepositoryAdapter } from '../../adapter/ievent-repository.adapter';
import { Event } from '@prisma/client';
import { ICollegeAdapter } from '../../../institution/adapter/institution.repository.adapter';
import { InstitutionRepository } from 'src/modules/institution/infra/prisma/institution.repository';
import { ThowErrorWhenNotExistis } from '../../../../shared/error';

@Injectable()
class GetStaticsEventService {
  constructor(
    @Inject(EventRepository) private eventRepository: IEventRepositoryAdapter,
    @Inject(InstitutionRepository)
    private institutionRepository: ICollegeAdapter,
  ) {}

  async execute(event_id: string): Promise<Event[]> {
    const event = await this.eventRepository.getOne(event_id);
    ThowErrorWhenNotExistis({
      entity: event,
      message: 'Institution not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
    return this.eventRepository.getStatics(event.id);
  }
}

export { GetStaticsEventService };
