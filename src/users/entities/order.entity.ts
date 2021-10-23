import { User } from './user.entity';

// Para poder comunicar dos modulos necesitamos importalos por ejemplo
import { Product } from '../../products/entities/product.entity';
// por que lo importamos, por que vamos a relacionar los productos que tiene
// el usuario

// Como podemos utilizar esta entidad, lee la linea (31) del archivo users.controllers
export class Order {
  date: Date;
  user: User;
  proucts: Product[];
}
