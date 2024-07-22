import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.usersService.create(name);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
