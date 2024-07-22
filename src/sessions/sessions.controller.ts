import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(@Body('userIds') userIds: number[]) {
    return this.sessionsService.create(userIds);
  }

  @Post(':sessionId/messages')
  addMessage(
    @Body('text') text: string,
    @Body('userId') userId: number,
    @Param('sessionId') sessionId: number,
  ) {
    const sessionIdNumber = Number(sessionId);
    return this.sessionsService.addMessage(sessionIdNumber, {
      id: 0,
      text,
      userId,
    });
  }

  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get(':sessionId/messages')
  findMessages(@Param('sessionId') sessionId: number) {
    const sessionIdNumber = Number(sessionId);
    return this.sessionsService.findMessages(sessionIdNumber);
  }
}
