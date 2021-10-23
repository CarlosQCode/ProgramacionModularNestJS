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
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dtos';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Get('say')
  say(): string {
    return this.usersServices.helloFromUserWithModule();
  }

  @Get()
  getUsers() {
    return this.usersServices.findAll();
  }

  @Get(':userId')
  @HttpCode(HttpStatus.ACCEPTED)
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersServices.findOne(userId);
  }

  // Para usar la entidad de Oders la podemos consumir desde un EndPoint el cual por medio de un id de usuario traiga todos
  // los productos que estan realcionados con ese usuario, pero antes se debe crear un metodo en servicos para resolver las
  // ordenes de compras para ellos nos vamos al archivo users.services y creamos ese metedo lee la linea (59) de users.services
  @Get(':userId/orders')
  getOders(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersServices.getOrderByUser(userId);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersServices.create(payload);
  }

  @Put(':userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersServices.update(userId, payload);
  }

  @Delete(':userId')
  delete(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersServices.remove(userId);
  }
}
