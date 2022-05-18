import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  id?: string;
  @ApiProperty()
  eventId: string;
  @ApiProperty()
  value: number;
  @ApiProperty()
  quantity: number;
}
