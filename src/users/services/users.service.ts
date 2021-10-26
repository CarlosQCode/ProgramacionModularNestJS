import { Inject, Injectable, NotFoundException } from '@nestjs/common';
// Para injectarlo el archivo de configuracion de .env debemos importar el servicio de configuracion
// es decir el paquete que nos provee @nest/config, para ello le decimos linea de abajo
import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';

import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    // viene de lectura linea 2, esta es la forma de injectar desde un acrvhivo de configuracion
    // es decir injectando en una variable llamada igual al paquete pero la primera letra en minuscula
    // configService el tipo de dato en este caso viene del paquete ConfigService
    private configService: ConfigService, // \ Esta es la primera forma de injectar desde otro modulo // @Inject('API_KEY') private apikey: string,
  ) {}

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '12345',
      role: 'admin',
    },
  ];

  helloFromUserWithModule(): string {
    // Pero para usar las variables que tenemos en el archivo de configuracion injectados desde el ConfigModule
    // debemos declarar variables la cuales las vamos a llenar con el valor que contiene esa dato en el archivo
    // por ejemplo si queremos del archovo .env el dato que tiene la variable de entorno API_KEY debemos hacer lo
    // siguiente
    // Declarar una variable constante donde se va a guardar el dato, luego igualarlo a la captura del del valor del
    // variable en el archivo pasando por el paquete ConfingService y utiliznado el metodo get EJEMPLO
    const apikey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABAE_NAME');
    // al igual podemos hacerlo con la demas variables que contiene el archivo .env
    return `Hello from users used module global! esta es tu API-KEY: ${apikey}, y tu base de satos se llama: ${dbName}`;
    // Esta es la forma en la cual podiamos utilizar la injeccion y mostrar dicha valor
    //return `Hello from users used module global! esta es tu API-KEY: ${this.apikey}`;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, changes: UpdateUserDto) {
    const user = this.findOne(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }

  getOrderByUser(id: number): Order {
    // obtenemos al usuario
    const user = this.findOne(id);
    // Segudi vamos a enviar esa orden con un return
    return {
      date: new Date(),
      user,
      proucts: this.productsService.findAll(),
    };
  }
}
