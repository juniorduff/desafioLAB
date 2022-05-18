import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IPersonRepositoryAdapter } from '../../adapter/i-person-repository.adapter';
import { PersonRepository } from '../../infra/prisma/repository/person-repository';
import { ThowErrorWhenNotExistis } from '../../../../shared/error';
import { Person } from '@prisma/client';

type Request = {
  person_id: string;
};

@Injectable()
class DeletePersonService {
  constructor(
    @Inject(PersonRepository)
    private readonly personRepository: IPersonRepositoryAdapter,
  ) {}

  async execute({ person_id }: Request): Promise<Person> {
    const personAlreadyExists = await this.personRepository.getOne(person_id);
    ThowErrorWhenNotExistis({
      message: 'Person Not Found',
      statusCode: HttpStatus.NOT_FOUND,
      entity: personAlreadyExists,
    });
    return this.personRepository.delete(personAlreadyExists);
  }
}

export { DeletePersonService };
