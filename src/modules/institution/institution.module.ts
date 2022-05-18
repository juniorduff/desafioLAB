import { Module } from '@nestjs/common';
import { CreateInstitutionController } from './useCase/create-institution/create-institution.controller';
import { CreateInstitutionService } from './useCase/create-institution/create-institution.service';
import { PrismaClient } from '@prisma/client';
import { InstitutionRepository } from './infra/prisma/institution.repository';

@Module({
  controllers: [CreateInstitutionController],
  providers: [CreateInstitutionService, InstitutionRepository, PrismaClient],
})
export class InstitutionModule {}
