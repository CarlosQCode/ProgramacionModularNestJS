import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDTo } from 'src/dtos/users.dtos';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Get()
  getUsers() {
    return this.usersServices.findAll();
  }

  @Get(':userId')
  @HttpCode(HttpStatus.ACCEPTED)
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersServices.findOne(userId);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersServices.create(payload);
  }

  @Put(':userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDTo,
  ) {
    return this.usersServices.update(userId, payload);
  }

  @Delete(':userId')
  delete(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersServices.remove(userId);
  }
}
