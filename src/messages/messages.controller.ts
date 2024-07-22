import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body('text') text: string, @Body('userId') userId: number) {
    return this.messagesService.create(text, userId);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }
}
