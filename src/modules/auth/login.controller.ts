import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Person } from '@prisma/client';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

class LoginDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

@Controller('auth')
class LoginController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @ApiTags('Auth')
  @Post('login')
  async login(@Body() data: LoginDto) {
    const user = await this.authService.validateUser(data.email, data.password);
    const payload = await this.authService.login(user as unknown as Person);
    console.log(this.jwtService.decode(payload.access_token));

    return payload;
  }
}

export { LoginController };
