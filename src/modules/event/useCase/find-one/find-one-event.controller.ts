import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FindOneEventService } from './find-one-event.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guard/local-auth.guard';

@Controller('event')
class FindOneEventController {
  constructor(private readonly findOneEventService: FindOneEventService) {}

  @ApiTags('Event')
  @Get(':event_id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  handle(@Param('event_id') event_id: string) {
    return this.findOneEventService.execute(event_id);
  }
}

export { FindOneEventController };
