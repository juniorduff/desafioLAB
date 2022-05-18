import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateInstitutionService } from './create-institution.service';
import { CreateInstitutionDto } from '../../dto/create-institution.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guard/local-auth.guard';

@Controller('Instituition')
export class CreateInstitutionController {
  constructor(
    private readonly createCollegeService: CreateInstitutionService,
  ) {}

  @ApiTags('Instituition')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  handle(@Body() data: CreateInstitutionDto) {
    return this.createCollegeService.execute(data);
  }
}
