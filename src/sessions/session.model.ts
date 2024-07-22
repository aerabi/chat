import { Message } from '../messages/message.model';

export interface Session {
  id: number;
  userIds: number[];
  messages: Message[];
}
