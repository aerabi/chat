# Chat
A chat application using NestJS

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Project creation

To create the project, I used NestJS to create the backend. To use the CLI, 
first you need to install it:

```bash
$ npm i -g @nestjs/cli
```

Then, to create the project, run:

```bash
$ nest new --directory . chat
```

Let's run the application to see if everything is working:

```bash
$ bon ryb start
```

Then, do a request to `http://localhost:3000` and you should see the message `Hello World!`:

```bash
$ curl http://localhost:3000
```

Let's leave this hello module for now, we'll use it later for the health check.

### Create a users module

Now, let's create a module for users. We'll use it to create and list users.

```bash
$ nest generate module users
```

Then, let's create a controller and a service for the users:

```bash
$ nest generate controller users
$ nest generate service users
```

Now we need a model for the users. Let's create a file `user.model.ts` in the `users` folder:

```typescript
export interface User {
  id: number;
  name: string;
}
```

Now, let's create functions to create and list users in the `users.service.ts` file:

```typescript
import { Injectable } from '@nestjs/common';

import { User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(name: string): User {
    const user: User = {
      id: this.users.length + 1,
      name,
    };

    this.users.push(user);

    return user;
  }

  findAll(): User[] {
    return this.users;
  }
}
```

We'll push the user storage to a repository later, for now, we'll keep it in memory.
We also need to write some tests for the service. There is a file `users.service.spec.ts` in the `users` folder. Let's write some tests for the `create` and `findAll` functions:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // here are the new test cases
  it('should create a user', () => {
    const user = service.create('John Doe');

    expect(user.id).toBe(1);
    expect(user.name).toBe('John Doe');
  });
  
  it('should return all users', () => {
    service.create('John Doe');
    service.create('Jane Doe');

    const users = service.findAll();

    expect(users.length).toBe(2);
    expect(users[0].name).toBe('John Doe');
    expect(users[1].name).toBe('Jane Doe');
  });
});
```

Normally, I would create the tests first, but it's harder to write the process down in that order (coming back and forth between the tests and the implementation).

Now, let's implement the controller. We need to inject the service into the controller and create the routes to create and list users. Here is the `users.controller.ts` file:

```typescript
import { Controller, Get, Post, Body } from '@nestjs/common';

import { UsersService } from './users.service';

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
```

Voilà! We have a simple users module. Let's test it:

```bash
$ curl -X POST http://localhost:3000/users -H 'Content-Type: application/json' -d '{"name": "John Doe"}'
$ curl http://localhost:3000/users
```

To make the unit tests for the controller work, we need to provide an instance of the service.
For now we can provide the service's real instance, but later we'll need to mock it. Here is the `users.controller.spec.ts` file:

```typescript
const module: TestingModule = await Test.createTestingModule({
  controllers: [UsersController],
  providers: [UsersService],  // here is the service
}).compile();
```

### Create a messages module

It's getting more interesting now. Let's create a module for messages. We'll use it to create and list messages.

```bash
$ nest generate module messages
```

Then, let's create a controller and a service for the messages:

```bash
$ nest generate controller messages
$ nest generate service messages
```

Now we need a model for the messages. Let's create a file `message.model.ts` in the `messages` folder:

```typescript
export interface Message {
  id: number;
  text: string;
  userId: number;
}
```

Now, let's create functions to create and list messages in the `messages.service.ts` file:

```typescript
import { Injectable } from '@nestjs/common';

import { Message } from './message.model';

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
```

The tests:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesService],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // here are new test cases
  it('should create a message', () => {
    const message = service.create('Hello, world!', 1);

    expect(message.id).toBe(1);
    expect(message.text).toBe('Hello, world!');
    expect(message.userId).toBe(1);
  });

  it('should return all messages', () => {
    service.create('Hello, world!', 1);
    service.create('Hi, there!', 2);

    const messages = service.findAll();

    expect(messages.length).toBe(2);
    expect(messages[0].text).toBe('Hello, world!');
    expect(messages[1].text).toBe('Hi, there!');
  });
});
```

And the controller:

```typescript
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
```

Similarly, we need to add the service to the controller's provider list in the tests:

```typescript
const module: TestingModule = await Test.createTestingModule({
  controllers: [MessagesController],
  providers: [MessagesService],  // here is the service
}).compile();
```

