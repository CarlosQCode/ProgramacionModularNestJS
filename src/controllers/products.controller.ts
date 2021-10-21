import {
  Controller,
  Get,
  Post,
  Param,
  //Query,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  //ParseIntPipe,
  //Res,
} from '@nestjs/common';

//import { Response } from 'express';

// importamos el pipe creado por nosotros, en la linea 12 comentamos el pipe que utilizamos
// por defecto desde nest
import { ParseIntPipe } from './../common/parse-int.pipe';
// importamos el DTO en cual no dara una validacion de que si se reciban los datos con estos tipos de datos
// solo tenemos que cambiar en los tipos de datos de payload en em metodo create por el DTO importado,
// Tambien podemos utilizar en el servicio para que se asegure que se utilizara esta estruturapara eso
// nos vamos a archivo products.service e importamos en DTO, lo mismo para el UpdateProductDto
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';

// Para hacer la injeccion del servicio primero debemos importar el servicio (lee la linea 22)
import { ProductsService } from './../services/products.service';

@Controller('products')
export class ProductsController {
  // segue de la linea 17 ---  despues de importar debemos definir en el constructor que
  // queremos utilizar ese servicio, para ello realizamos, el construtor en el cual definimos
  // una variable private por lo general se utiliza el mismo nombre del servicio pero con la
  // primera letra en minuscula y por ultimo le decimos a esa variable que va ser del tipo del
  // servicio, EJE
  constructor(private productsServices: ProductsService) {}
  //ya solo quedaria usarlos para ello lee la linea 52

  // Obteniendo los query params y utiliznado el limit y el offset dinamicamente
  //@Get('productss')
  //getProductss(@Query() params: any) {
  // funcion descontruccion de ems6
  //const { limit, offset } = params;
  //return `Products: Limit=> ${limit} Offset=> ${offset}`;
  //}

  // Obteniendo los query params y utiliznado el limit y el offset directamente
  @Get()
  // Se pueden enviar valores por defecto asignandole a la varible el valor
  // por defecto al darle valores por defecto TS no da error de tipado
  // @Query('limit') limit: number = 100, este da error de tipado por defecto
  // TS infiere el tipo de dato al asignarlo
  getProducts(/**@Query('limit') limit = 100, @Query('offset') offset = 0, @Query('brand') brand: string,*/) {
    //return {
    //  message: `Products: Limit=> ${limit} Offset=> ${offset} Brand: ${brand}`,
    //};
    // Pa utilizar los metodos del servicio solo debemos retornar ese metodo EJE
    return this.productsServices.findAll(); // sigue en la linea 85
  }

  // AL trabajar con rutas podemos tener un error de enrutador ya que podemos chocar
  // las rutas eso pasa por que en la misma ruta podemos estar esperando un params
  // pero en la otra estamos esperando es u ruta, para silucinar esto solo debemos
  // subor el metodo o el endPoint de la ruta fija antes de endPoint donde se recibe
  // un params
  @Get('filter')
  getProductFilter() {
    return {
      message: `Yo soy un filtro!`,
    };
  }

  // Capturando los parametros dinamicamente -- estamos capturando el objecto param y accediendo al atributo de objeto
  //@Get('products/:productId')
  //getProduct(@Param() params: any) {
  //  return `Product ${params.productId}`;
  //}

  // Capturando los parametros directamente -- estamos capturando el objecto param y accediendo al atributo de objeto

  // Tambien podemos cambiar el codigo http de la peticion con los decoradores @HttpStatus y @HttpCode
  // Para ello debemo importarlos desde nestjs/common y utilizarlos en el metodo que querramos en este caso
  // vamos a cambiar la respuesta http de este metodo que nos manda un 200
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  // podemos hacer uso de los pipes para ya sea convertir un valor que viene dela url
  // como parametro o mostrar un error sin necesidad de realizar una consulta a la bd
  // po ejemplo, le pasamos al decorador Param como segundo parametro el PIPE asi el tipo
  // de variable cambia a number
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    //return {
    //  message: `Product ${productId}`,
    ///};
    // codigo anterior return this.productsServices.findOne(+productId); //sigue en la linea 110
    // codigo actual con el uso de los pipe
    return this.productsServices.findOne(productId);
  }
  // De igual forma podemos personalizar los estados de cada respuesta de la forma Express
  // Para ello debes importar en nestJS/commaon Res(linea 12) y tambien el Response desde express(linea 15)
  // luego cambiamos a la forma express la respuesta del estado parad ello duplicaremos en metodo anterior
  // y realizaremos los cambios, 1- en los parametros de metedo colocamos como primer el decorador de Res
  // el cual declara un variable que viene de Response, 2 - llamamos a la varibale response que tiene como
  // metodos status() el cual recible como parametro el codigo http (200) y ;uego hace return (.send()) de
  // lo que se quiere en este caso json
  //@Get(':productId')
  //getProduct(@Res() response: Response, @Param('productId') productId: string) {
  //  response.status(200).send({
  //    message: `Product ${productId}`,
  //  });
  // }

  // Metodo http para enviar datos, usaremos el decorador @Post
  // para enviar datos utilizaremos el decorador @Body el cual
  // se encarga de tomar una porcion del cuerpo que se envia
  @Post()
  create(@Body() payload: CreateProductDto) {
    //return {
    //  message: 'Accion de crear',
    //  payload,
    //};
    return this.productsServices.create(payload); // Sigue en la linea 131
  }
  // Tambien podemos mandarle todos los datos uno por uno, en ese caso
  // debemos especificarle al decorador @Body que valores mostrar, pero
  // esto ya no es optimo EJEM
  //@Post()
  //create(@Body('price') price: number) {
  //  return {
  //    message: 'Accion de crear',
  //    price,
  //  };
  // }

  // Metodo para actualizar con el decorador @put
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    //return {
    //  message: 'Update product',
    //  id,
    //  payload,
    //};
    return this.productsServices.update(id, payload); // sigue en la linea 141
  }

  // Metodo para eliminar con el decorador @Delete
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    //return {
    //  message: 'Eliminar producto especifico',
    //  id,
    //};
    return this.productsServices.remove(id);
  }
}
