import { Test, TestingModule } from '@nestjs/testing';
import { CreateInstitutionService } from './create-institution.service';

describe('CreateCollegeService', () => {
  let service: CreateInstitutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateInstitutionService],
    }).compile();

    service = module.get<CreateInstitutionService>(CreateInstitutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
