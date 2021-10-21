import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDTo } from 'src/dtos/users.dtos';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  private countID = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'carlos',
      lastName: 'Rodriguez',
      userName: 'ucrox',
      password: 'carlos10',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotAcceptableException(`User #${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    this.countID = this.countID + 1;
    const newUser = {
      id: this.countID,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDTo) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users[index] = {
        ...user,
        ...payload,
      };
      return this.users[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
}
