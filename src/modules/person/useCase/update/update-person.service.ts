import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IPersonRepositoryAdapter } from '../../adapter/i-person-repository.adapter';
import { PersonRepository } from '../../infra/prisma/repository/person-repository';
import { Person } from '@prisma/client';
import { ThowErrorWhenNotExistis } from '../../../../shared/error';
import { UpdatePersonDto } from '../../dto/update-person.dto';

type Request = {
  data: UpdatePersonDto;
};

@Injectable()
class UpdatePersonService {
  constructor(
    @Inject(PersonRepository)
    private readonly personRepository: IPersonRepositoryAdapter,
  ) {}

  async execute({ data }: Request): Promise<Person> {
    const personAlreadyExists = await this.personRepository.getOne(data.id);
    ThowErrorWhenNotExistis({
      message: 'Person Not Found',
      statusCode: HttpStatus.NOT_FOUND,
      entity: personAlreadyExists,
    });
    return this.personRepository.update(personAlreadyExists);
  }
}

export { UpdatePersonService };
