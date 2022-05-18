import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  id?: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  password: string;
  updatedAt: Date;
}
