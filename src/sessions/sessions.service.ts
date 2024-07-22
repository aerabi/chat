import { Inject, Injectable } from '@nestjs/common';
import { Message } from '../messages/message.model';
import { Session } from './session.model';
import { ISessionsRepository } from './sessions.repository';

@Injectable()
export class SessionsService {
  constructor(@Inject(ISessionsRepository) private readonly sessionsRepository: ISessionsRepository) {}

  create(userIds: number[]): Session {
    return this.sessionsRepository.create(userIds);
  }

  addMessage(sessionId: number, message: Message) {
    this.sessionsRepository.addMessage(sessionId, message);
  }

  findAll(): Session[] {
    return this.sessionsRepository.findAll();
  }

  findMessages(sessionId: number): Message[] {
    return this.sessionsRepository.findMessages(sessionId);
  }
}
