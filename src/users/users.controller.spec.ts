import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<UsersService>;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    usersService = {
      findOne: (id: number) =>
        Promise.resolve({
          id,
          email: 'asdf@asdf.com',
          password: 'mypass',
        } as User),
      find: (email: string) =>
        Promise.resolve([{ id: 1, email, password: 'asdf' } as User]),
      // remove: () => {},
      // update: () => {},
    };
    authService = {
      signin: (email: string, password: string) =>
        Promise.resolve({
          id: 1,
          email,
          password,
        } as User),

      // signup: () => {},
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: usersService },
        { provide: AuthService, useValue: authService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findUser', () => {
    it('should throw if user with given id is not found', async () => {
      usersService.findOne = () => Promise.resolve(null);
      await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
    });
    it('should return a user with given id', async () => {
      const user = await controller.findUser('1');
      expect(user).toBeDefined();
    });
  });
  describe('findAllUsers', () => {
    it('should return a list with users with a given email', async () => {
      const email = 'asdf@asdf.com';
      const users = await controller.findAllUsers(email);
      expect(users).toHaveLength(1);
      expect(users[0].email).toEqual(email);
    });
  });
  describe('signin', () => {
    it('should update session object and return a user', async () => {
      const session = { userId: -10 };
      const user = await controller.signin(
        { email: '', password: '' },
        session,
      );
      expect(user).toBeDefined();
      expect(user.id).toEqual(1);
      expect(session.userId).toEqual(user.id);
    });
  });
});
