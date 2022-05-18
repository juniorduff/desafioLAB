import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetStaticsEventService } from './get-statics-event.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guard/local-auth.guard';

@Controller('event')
class GetStaticsEventController {
  constructor(
    private readonly getStaticsEventService: GetStaticsEventService,
  ) {}

  @ApiTags('Event')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('statics/:event_id')
  async handle(@Param('event_id') event_id: string): Promise<any> {
    return this.getStaticsEventService.execute(event_id);
  }
}

export { GetStaticsEventController };
