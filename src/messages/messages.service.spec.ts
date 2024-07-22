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
