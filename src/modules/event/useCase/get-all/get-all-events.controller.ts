import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetAllEventsService } from './get-all-events.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guard/local-auth.guard';

@Controller()
class GetAllEventsController {
  constructor(private readonly findAllEventService: GetAllEventsService) {}

  @ApiTags('Event')
  @Get('events/get-all')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  handle() {
    console.log('find all event');
    return this.findAllEventService.execute();
  }
}

export { GetAllEventsController };
