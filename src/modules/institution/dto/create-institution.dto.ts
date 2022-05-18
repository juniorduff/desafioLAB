import { ApiProperty } from '@nestjs/swagger';
import { InstitutionType } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateInstitutionDto {
  @ApiProperty()
  @IsString()
  name: string;
  @IsEnum(InstitutionType)
  @ApiProperty({ enum: InstitutionType, default: InstitutionType.UNIVERSITY })
  institution_type: InstitutionType;
}
