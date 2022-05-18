import { Test, TestingModule } from '@nestjs/testing';
import { CreateInstitutionController } from './create-institution.controller';

describe('CreateCollegeController', () => {
  let controller: CreateInstitutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateInstitutionController],
    }).compile();

    controller = module.get<CreateInstitutionController>(
      CreateInstitutionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
