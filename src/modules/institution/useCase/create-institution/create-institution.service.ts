import { Inject, Injectable } from '@nestjs/common';
import { InstitutionRepository } from '../../infra/prisma/institution.repository';
import { ICollegeAdapter } from '../../adapter/institution.repository.adapter';
import { CreateInstitutionDto } from '../../dto/create-institution.dto';

@Injectable()
export class CreateInstitutionService {
  constructor(
    @Inject(InstitutionRepository)
    private readonly collegeRepository: ICollegeAdapter,
  ) {}

  execute(data: CreateInstitutionDto) {
    return this.collegeRepository.create(data);
  }
}
