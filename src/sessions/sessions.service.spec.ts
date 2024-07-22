import { Test, TestingModule } from '@nestjs/testing';
import { SessionsService } from './sessions.service';
import { SessionsArrayRepository } from './sessions.repository.array';
import { ISessionsRepository } from './sessions.repository';

describe('SessionsService', () => {
  let service: SessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsService,
        {
          provide: ISessionsRepository,
          useClass: SessionsArrayRepository,
        },
      ],
    }).compile();

    service = module.get<SessionsService>(SessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a session', () => {
    const session = service.create([1, 2]);

    expect(session.id).toBe(1);
    expect(session.userIds).toEqual([1, 2]);
    expect(session.messages).toEqual([]);
  });

  it('should add a message to a session', () => {
    const session = service.create([1, 2]);
    const message = { id: 1, text: 'Hello, world!', userId: 1 };

    service.addMessage(session.id, message);

    expect(session.messages.length).toBe(1);
    expect(session.messages[0].text).toBe('Hello, world!');
  });

  it('should return all sessions', () => {
    service.create([1, 2]);
    service.create([2, 3]);

    const sessions = service.findAll();

    expect(sessions.length).toBe(2);
    expect(sessions[0].userIds).toEqual([1, 2]);
    expect(sessions[1].userIds).toEqual([2, 3]);
  });

  it('should return all messages in a session', () => {
    const session = service.create([1, 2]);
    service.addMessage(session.id, { id: 1, text: 'Hello, world!', userId: 1 });
    service.addMessage(session.id, { id: 2, text: 'Hi, there!', userId: 2 });

    const messages = service.findMessages(session.id);

    expect(messages.length).toBe(2);
    expect(messages[0].text).toBe('Hello, world!');
    expect(messages[1].text).toBe('Hi, there!');
  });
});
