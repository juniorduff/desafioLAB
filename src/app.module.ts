import { Module } from '@nestjs/common';
import { PersonModule } from './modules/person/person.module';
import { AuthModule } from './modules/auth/auth.module';
import { InstitutionModule } from './modules/institution/institution.module';
import { EventModule } from './modules/event/event.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PersonModule,
    AuthModule,
    InstitutionModule,
    TicketModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
