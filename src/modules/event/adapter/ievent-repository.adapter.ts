import { Event } from '@prisma/client';
import { CreateEventDto } from '../dto/create-event.dto';

interface IEventRepositoryAdapter {
  create(data: CreateEventDto): Promise<Event>;

  getOne(event_id: string): Promise<Event>;

  getAll(): Promise<Event[]>;

  delete(event_id: string): Promise<void>;

  update(data: CreateEventDto, event_id: string): Promise<Event>;

  getStatics(event_id: string): Promise<Event[]>;
}

export { IEventRepositoryAdapter };
