import { CreatePersonService } from './create-person.service';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreatePersonDto } from '../../dto/create-person.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guard/local-auth.guard';

@ApiTags('Person')
@Controller('/person')
class CreatePersonController {
  constructor(private readonly createPersonService: CreatePersonService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async handle(
    @Body() data: CreatePersonDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { password, ...person } = await this.createPersonService.execute({
      data,
    });
    return res.status(HttpStatus.CREATED).json({ person });
  }
}

export { CreatePersonController };
