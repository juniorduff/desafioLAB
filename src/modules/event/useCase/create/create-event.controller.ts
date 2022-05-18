import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateEventService } from './create-event.service';
import { CreateEventDto } from '../../dto/create-event.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guard/local-auth.guard';

@Controller('event')
class CreateEventController {
  constructor(private readonly createEventService: CreateEventService) {}

  @ApiTags('Event')
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  handle(@Body() data: CreateEventDto): any {
    console.log(data);
    return this.createEventService.execute(data);
  }
}

export { CreateEventController };
