import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    // Aqui convertimos el valor que viene de la url a number en base 10
    const val = parseInt(value, 10);
    // pero que pasaria si se envia un string que no pueda ser parsiado como por ejemplo
    // 'nicolas' o 'monteria', daria un error, para verificar eso podemos hacer lo siguiente
    if (isNaN(val)) {
      throw new BadRequestException(`${value} is not an number`);
    }
    return val;
    // Como se puede utilizar el pipe creado por nosotros? seria irnos al controlador y en vez
    // de utilizar el pipe que nos provee nest importamos el de nosotros (vete al controlador linea 18)
  }
}
