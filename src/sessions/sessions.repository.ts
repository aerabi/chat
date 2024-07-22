import { Session } from './session.model';
import { Message } from '../messages/message.model';

export interface ISessionsRepository {
  create(userIds: number[]): Session;
  addMessage(sessionId: number, message: Message): void;
  findAll(): Session[];
  findMessages(sessionId: number): Message[];
}

export const ISessionsRepository = Symbol('ISessionsRepository');
