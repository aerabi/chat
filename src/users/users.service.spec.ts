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
