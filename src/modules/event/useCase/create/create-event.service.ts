import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EventRepository } from '../../infra/Prisma/event.repository';
import { IEventRepositoryAdapter } from '../../adapter/ievent-repository.adapter';
import { Event } from '@prisma/client';
import { CreateEventDto } from '../../dto/create-event.dto';
import { ICollegeAdapter } from '../../../institution/adapter/institution.repository.adapter';
import { InstitutionRepository } from 'src/modules/institution/infra/prisma/institution.repository';
import { ThowErrorWhenNotExistis } from '../../../../shared/error';

@Injectable()
class CreateEventService {
  constructor(
    @Inject(EventRepository) private eventRepository: IEventRepositoryAdapter,
    @Inject(InstitutionRepository)
    private institutionRepository: ICollegeAdapter,
  ) {}

  async execute(data: CreateEventDto): Promise<Event> {
    const { institution_id, title } = data;
    console.log(institution_id, title);
    const institution = await this.institutionRepository.getOne(
      data.institution_id,
    );
    console.log(institution);
    ThowErrorWhenNotExistis({
      entity: institution,
      message: 'Institution not found',
      statusCode: HttpStatus.NOT_FOUND,
    });
    return this.eventRepository.create(data);
  }
}

export { CreateEventService };
