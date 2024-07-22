import { Injectable } from '@nestjs/common';

import { Session } from './session.model';
import { Message } from '../messages/message.model';
import { ISessionsRepository } from './sessions.repository';

@Injectable()
export class SessionsArrayRepository implements ISessionsRepository {
  private sessions: Session[] = [];

  create(userIds: number[]): Session {
    const session: Session = {
      id: this.sessions.length + 1,
      userIds,
      messages: [],
    };

    this.sessions.push(session);

    return session;
  }

  addMessage(sessionId: number, message: Message) {
    const session = this.sessions.find((s) => s.id === sessionId);

    if (!session) {
      throw new Error('Session not found');
    }

    session.messages.push(message);
  }

  findAll(): Session[] {
    return this.sessions;
  }

  findMessages(sessionId: number): Message[] {
    const session = this.sessions.find((s) => s.id === sessionId);

    if (!session) {
      throw new Error('Session not found');
    }

    return session.messages;
  }
}
