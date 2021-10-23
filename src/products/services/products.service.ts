import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '../entities/product.entity';
// luego de importar el arcchivo con la configuracion para utilizarlos debemos irnos al metodo
// create y en el payload o la variable que recibe los datos desde la url cambiarle el tipo de
// dato por el de la importacion (lee linea 45)
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  private counterID = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'lorem lorem',
      price: 10000,
      stock: 300,
      image: 'https://i.imgur.com/U4iGx1j.jpeg',
    },
  ];

  // metodo para buscar todos los productos que estan en memoria
  findAll() {
    return this.products;
  }

  // Metodo que busca solo un producto que esta en memoria
  findOne(id: number) {
    // esto tenias antes para encontrar un producto pero tenia un bug el cual retornaba un
    // estado 500 cuando no encontraba ese producto con ese id
    //return this.products.find((item) => item.id === id);
    // para manejar las verificaciones de los estados debemos hacer lo siguiente
    // primero guardamos en una variable el id del producto encontrado
    const product = this.products.find((item) => item.id === id);
    // validamos si el producto existe para retornar ya sea el error o el producto
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  // metodo para crear un producto, en este caso como estamos trabajando en memoria y el ID debe estar
  // dado por la BD, para solucionar eso creamos una variable contadora counterID la cual incrementamos
  create(data: CreateProductDto) {
    // incrementamos la variable counterID
    this.counterID = this.counterID + 1;
    // Creamos nuestro nuevo producto
    const newProduct = {
      // le asignamos a id el incremento de counterID
      id: this.counterID,
      // con los tres puntos (...) concatenamos otro arreglo en este caso payload que tiene los demas datos
      ...data,
    };
    // ya luego de crear el nuevo producto lo insertarmos en nuestro arreglo de porductos con el metodo
    // push en el cual le pasamos como parametro el nuevo producto
    this.products.push(newProduct);
    // por ultimo retornamos el nuevo producto
    return newProduct;
  }

  update(id: number, changes: UpdateProductDto) {
    // Reutilizamos codigo esto quiere decir que usamos el metodo findOne para encontrar ese producto
    // por su id el cual lo guardamos en la variable productFound
    const product = this.findOne(id);
    // Aqui encontramos el index o la posicion del producto en el arreglo con el metodo
    // findIndex y pasandole como recorrido una variable item la cual si es igual al id
    // guarda ese index en la varibale index
    const index = this.products.findIndex((item) => item.id === id);
    // aqui actualizamos en la posicion del arreglo los datos que vienen desde el usuario con
    // la variable payload, this.products[index] = payload; de esta forma estariamos reemplazando
    // el elemento completo es decir si el usuario envia solamente un atributo eso es lo que se
    // guardaria para arrglar esto debemos hacer un merge de la informacion obtenida con la que va
    // a reemplazar por ejemplo
    this.products[index] = {
      ...product,
      ...changes,
    };
    // terminamos el metodo retornando la entidad actualizada
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
