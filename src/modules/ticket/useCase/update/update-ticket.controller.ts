import { UpdateTicketService } from './update-ticket.service';
import {
  Body,
  Controller,
  HttpStatus,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateTicketDto } from '../../dto/update-ticket.dto';
import { JwtAuthGuard } from '../../../auth/guard/local-auth.guard';

@ApiTags('Ticket')
@Controller('/ticket')
class UpdateTicketController {
  constructor(private readonly updateTicketService: UpdateTicketService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':ticket_id')
  async handle(
    @Body() data: UpdateTicketDto,
    @Res() res: Response,
  ): Promise<Response> {
    const ticket = await this.updateTicketService.execute({ data });
    return res.status(HttpStatus.CREATED).json(ticket);
  }
}

export { UpdateTicketController };
