import { Person, Ticket } from '@prisma/client';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';

interface IPersonRepositoryAdapter {
  create: (data: CreatePersonDto) => Promise<Person>;
  update: (data: UpdatePersonDto) => Promise<Person>;
  getOne: (person_id: string) => Promise<Person>;
  getByName: (name: string) => Promise<Person>;
  getByEmail: (email: string) => Promise<Person>;
  getAll: () => Promise<Person[]>;

  delete: (person: UpdatePersonDto) => Promise<Person>;
  buyTicket: (ticket: Ticket, person_id: string) => Promise<any>;
}

export { IPersonRepositoryAdapter };
