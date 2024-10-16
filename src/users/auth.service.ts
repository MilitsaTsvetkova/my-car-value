import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(email: string, password: string) {
    // check if email is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    // hash the users password
    //generate salt
    const salt = randomBytes(8).toString('hex');
    //hash the password and salt together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    //join hashed result and salt together
    const result = salt + '.' + hash.toString('hex');

    // create a new user and save it
    const user = await this.usersService.create(email, result);

    // return the user
    return user;
  }

  async signin(email: string, password: string) {
    // find user in db
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // compare passwords
    const [salt, hash] = user.password.split('.');
    const hashToCompare = (await scrypt(password, salt, 32)) as Buffer;
    if (hash !== hashToCompare.toString('hex')) {
      throw new BadRequestException('Bad password');
    }
    return user;
  }
}
