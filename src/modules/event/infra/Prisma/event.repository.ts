import { IEventRepositoryAdapter } from '../../adapter/ievent-repository.adapter';
import { Event, Prisma, PrismaClient } from '@prisma/client';
import { CreateEventDto } from '../../dto/create-event.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
class EventRepository implements IEventRepositoryAdapter {
  constructor(private readonly prisma: PrismaClient) {}

  async getStatics(event_id: string): Promise<Event[]> {
    return this.prisma.$queryRaw<Event[]>(Prisma.sql`
        SELECT e.title as event_title,
               e.id    as event_id,
               T.id    as ticket_id,
               P.name  as pessoa_name,
               P.cpf   as cpf,
               P.email as email
        from "Event" e
                 join "Ticket" T
                      on e.id = T.event_id
                 left join
             "Person_ticket" Pt
             on Pt.ticket_id = T.id
                 join
             "Person" P
             on P.id = Pt.person_id
        where e.id = ${event_id}
    `);
  }

  async create(data: CreateEventDto): Promise<Event> {
    return this.prisma.event.create({
      data: {
        title: data.title,
        Institution: {
          create: [
            {
              Institution: {
                connect: {
                  id: data.institution_id,
                },
              },
            },
          ],
        },
      },
    });
  }

  delete(event_id: string): Promise<any> {
    return this.prisma.event.delete({
      where: {
        id: event_id,
      },
    });
  }

  async getAll(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  async getOne(event_id: string): Promise<Event> {
    console.log(event_id);
    return this.prisma.event.findUnique({
      where: {
        id: event_id,
      },
    });
  }

  update(data: CreateEventDto, event_id: string): Promise<Event> {
    return Promise.resolve(undefined);
  }
}

export { EventRepository };
