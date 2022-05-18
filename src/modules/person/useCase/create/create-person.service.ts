import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IPersonRepositoryAdapter } from '../../adapter/i-person-repository.adapter';
import { CreatePersonDto } from '../../dto/create-person.dto';
import { PersonRepository } from '../../infra/prisma/repository/person-repository';
import { Person } from '@prisma/client';
import { ThowErrorWhenAlreadyExistis } from '../../../../shared/error';

type Request = {
  data: CreatePersonDto;
};

@Injectable()
class CreatePersonService {
  constructor(
    @Inject(PersonRepository)
    private readonly personRepository: IPersonRepositoryAdapter,
  ) {}

  async execute({ data }: Request): Promise<Person> {
    const personAlreadyExists = await this.personRepository.getByName(
      data.name,
    );
    console.log(personAlreadyExists);
    ThowErrorWhenAlreadyExistis({
      message: 'Person already exists',
      statusCode: HttpStatus.CONFLICT,
      entity: personAlreadyExists,
    });
    return this.personRepository.create(data);
  }
}

export { CreatePersonService };
