import { DeletePersonService } from './delete-person.service';
import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guard/local-auth.guard';

@ApiTags('Person')
@Controller('/person')
class DeletePersonController {
  constructor(private readonly createPersonService: DeletePersonService) {}

  @ApiParam({
    name: 'person_id',
    description: 'Person ID',
  })
  @Delete(':person_id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async handle(
    @Param() person_id: string,
    @Res() res: Response,
  ): Promise<Response> {
    await this.createPersonService.execute({
      person_id,
    });
    return res
      .status(HttpStatus.OK)
      .json({ message: 'user deleted successfully' });
  }
}

export { DeletePersonController };
