import { ApiProperty } from '@nestjs/swagger';

export class BuyTicketDto {
  @ApiProperty()
  person_id: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  ticket_id: string;
}
