import { CreateTicketService } from './create-ticket.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TicketRepository } from '../../infra/prisma/repository/ticket-repository';
import { Person } from '@prisma/client';
import { ConflictException } from '@nestjs/common';

const mockPersonRepository = {
  create: jest.fn(),
  getByName: jest.fn(),
};
describe('Create service', () => {
  let createPersonService: CreateTicketService;
  let personRepository: TicketRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTicketService,
        {
          provide: TicketRepository,
          useValue: mockPersonRepository,
        },
      ],
    }).compile();
    createPersonService = module.get<CreateTicketService>(CreateTicketService);
    personRepository = module.get<TicketRepository>(TicketRepository);
  });

  it('should create a person', async () => {
    const person: Person = {
      id: '1',
      name: 'test',
      cpf: '123456789',
      createdAt: new Date(),
      email: '@gmail.com',
      updatedAt: null,
      password: '123456',
    };

    mockPersonRepository.create.mockReturnValue(person);
    const personCreated = await createPersonService.execute({ data: person });
    expect(personCreated).toEqual(person);
  });

  it('should be throw a exception when name already exists', async () => {
    const person: Person = {
      id: '1',
      name: 'test',
      cpf: '123456789',
      createdAt: new Date(),
      email: '@gmail.com',
      updatedAt: null,
      password: '123456',
    };
    mockPersonRepository.getByName.mockReturnValue(person);
    await createPersonService.execute({ data: person }).catch((erro) => {
      expect(erro).toBeInstanceOf(ConflictException);
      expect(erro.message).toBe('Person already exists');
    });
  });
});
