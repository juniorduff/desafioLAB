import { CreateInstitutionDto } from '../dto/create-institution.dto';
import { Institution } from '@prisma/client';

interface ICollegeAdapter {
  create(data: CreateInstitutionDto): Promise<Institution>;

  getOne(institution_id: string): Promise<Institution>;
}

export { ICollegeAdapter };
