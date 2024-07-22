import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { SessionsArrayRepository } from './sessions.repository.array';
import { ISessionsRepository } from './sessions.repository';

@Module({
  controllers: [SessionsController],
  providers: [
    SessionsService,
    {
      provide: ISessionsRepository,
      useClass: SessionsArrayRepository,
    },
  ],
})
export class SessionsModule {}
