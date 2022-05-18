import { ICollegeAdapter } from '../../adapter/institution.repository.adapter';
import { CreateInstitutionDto } from '../../dto/create-institution.dto';
import { Institution, PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
class InstitutionRepository implements ICollegeAdapter {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateInstitutionDto): Promise<any> {
    return this.prisma.institution.create({
      data: { name: data.name, institution_type: data.institution_type },
    });
  }

  async getOne(institution_id: string): Promise<Institution> {
    return this.prisma.institution.findUnique({
      where: { id: institution_id },
    });
  }
}

export { InstitutionRepository };
