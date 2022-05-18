import { BuyTicketService } from './buy-ticket.service';
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
import { BuyTicketDto } from '../../dto/buy-ticket.dto';
import { JwtAuthGuard } from '../../../auth/guard/local-auth.guard';

@ApiTags('Person')
@Controller('/buy-ticket')
class BuyTicketController {
  constructor(private readonly createPersonService: BuyTicketService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/buy')
  async handle(
    @Body() data: BuyTicketDto,
    @Res() res: Response,
  ): Promise<Response> {
    await this.createPersonService.execute({
      data,
    });
    return res.status(HttpStatus.CREATED).json({ message: 'Person created' });
  }
}

export { BuyTicketController };
