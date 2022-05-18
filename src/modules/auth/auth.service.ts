import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Person } from '@prisma/client';
import { IPersonRepositoryAdapter } from '../person/adapter/i-person-repository.adapter';
import { PersonRepository } from '../person/infra/prisma/repository/person-repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PersonRepository)
    private personRepository: IPersonRepositoryAdapter,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.personRepository.getByEmail(email);
    console.log(user);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: Person) {
    console.log(user, 'user');
    const payload = { username: user.name, id: user.id };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
