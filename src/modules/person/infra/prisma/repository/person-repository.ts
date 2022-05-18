import { IPersonRepositoryAdapter } from '../../../adapter/i-person-repository.adapter';
import { Person, PrismaClient, Ticket } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from '../../../dto/create-person.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePersonDto } from '../../../dto/update-person.dto';

@Injectable()
class PersonRepository implements IPersonRepositoryAdapter {
  constructor(private prisma: PrismaClient) {}

  delete(person: UpdatePersonDto): Promise<Person> {
    return this.prisma.person.delete({ where: { id: person.id } });
  }

  async update(person: UpdatePersonDto): Promise<Person> {
    const { id } = person;
    return this.prisma.person.update({
      where: { id },
      data: { name: person.name },
    });
  }

  async create(data: CreatePersonDto): Promise<Person> {
    return this.prisma.person.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, 10),
      },
    });
  }

  getAll(): Promise<Person[]> {
    return this.prisma.person.findMany();
  }

  getOne(person_id: string): Promise<Person> {
    return this.prisma.person.findFirst({ where: { id: person_id } });
  }

  getByName(name: string): Promise<Person> {
    return this.prisma.person.findFirst({ where: { name } });
  }

  getByEmail(email: string): Promise<Person> {
    return this.prisma.person.findFirst({ where: { email } });
  }

  async buyTicket(ticket: Ticket, person_id: string): Promise<any> {
    const { id } = ticket;

    await this.prisma.ticket.update({
      where: { id },
      data: {
        quantity: ticket.quantity,
      },
    });
    return this.prisma.person_ticket.create({
      data: {
        person_id: person_id,
        ticket_id: id,
      },
    });
  }
}

export { PersonRepository };
