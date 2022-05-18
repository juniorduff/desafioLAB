import { CreateTicketService } from './create-ticket.service';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTicketDto } from '../../dto/create-ticket.dto';
import { JwtAuthGuard } from '../../../auth/guard/local-auth.guard';

@ApiTags('Ticket')
@Controller('/ticket')
class CreateTicketController {
  constructor(private readonly createTicketService: CreateTicketService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async handle(
    @Body() data: CreateTicketDto,
    @Res() res: Response,
  ): Promise<Response> {
    const ticket = await this.createTicketService.execute({ data });

    return res.status(HttpStatus.CREATED).json(ticket);
  }
}

export { CreateTicketController };
