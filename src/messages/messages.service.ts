import { Injectable } from '@nestjs/common';
import { Message } from "./message.model";

@Injectable()
export class MessagesService {
  private messages: Message[] = [];

  create(text: string, userId: number): Message {
    const message: Message = {
      id: this.messages.length + 1,
      text,
      userId,
    };

    this.messages.push(message);

    return message;
  }

  findAll(): Message[] {
    return this.messages;
  }
}
