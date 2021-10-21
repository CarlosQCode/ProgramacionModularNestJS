// hemos validado tipos de datos en modo desarrollo pero ahora vamos mas alla
// vamos a realizar validaciones en modo desarrollo y produccion, para ello necesitamos
// instalar dos dependencias class-validator y class-transformer con ellas vamos a usar
// decoradores los cuales nos proveen validaciones como si es un number, que sea un string,
// que sea un numero positivo y muchas mas, para utilizarlas debemos instalarlas desde la consola
// con el comando npm i class-validator class-transformer
// luego de terminar la instalacion procedemos a utilizarlas mediante la importacion EJE
import {
  IsNumber,
  IsString,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
// cuando tengamos la validaciones para que puedan ser activadas debemos importarlas en el
// archivo principal (main.ts) (lee el archivo main.ts)
import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

// El paso siguiente es validar UpdateProductDto para ellos debemos instalar una dependencia
// mas con el comando npm i @nestjs/mapped-types, con la cual vamos a extender el uso de los
// decoradores anteriores para esta clase, luego de terminar de instalarla la importamos (linea 17),
// un PartialType, que hace esto coje nuestra entidad base pero le coloca opcional a cada una de los
// datos automaticamente

// para utilizar debemos decirle a la clase que extendienda de PartialType y que va a recibir
// como parametro el DTO base en este caso CreateProductDto
export class UpdateProductDto extends PartialType(CreateProductDto) {
  // antes de los dos punto colocamos un signo de interrogacion para decirle a nest
  // que esas variables pueden ser opcionales.
  //readonly name?: string;
  //readonly description?: string;
  //readonly price?: number;
  //readonly stock?: number;
  //readonly image?: string;
  // Lo aterior es para realizarlo en desarrollo validaciones en desarrollo
}
