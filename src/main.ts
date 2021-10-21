import { NestFactory } from '@nestjs/core';
// aqui estamos activando las validaciones que hemos realizado en el DTO,
// eso quiere decir que vamos a importar un pipe desde @nest/common llamado
// ValidationPipe
import { ValidationPipe } from '@nestjs/common';
// ya teniendo ValidationPipe importado para activar las validaciones de forma global debemos
// hacer lo sigueinte (lee linea 12)
import { AppModule } from './app.module';

// vamos a validar que en la data no nos envien datos malisiosos, eso quiere decir que todos los
// datos que nos envian mendian la creacion los toman, pero podemos validar eso con el ValidationPipe
// para ello le enviamos algunas opciones en el EJemplo linea(17 parametros del ValidatioPipe)
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Para activar la validaciones en toda nuestra aplicacion simplemente es decirle antes
  // de la linea que escucha el puerto
  app.useGlobalPipes(
    new ValidationPipe({
      // que signofoca colocar el validationpipes en whitelist: true, eso quiere decir
      // que va a omitir todos aquellos datos que no esten declarados en el DTO
      whitelist: true,
      // al colocar esto va a dar un aviso, podemos ya sea utilizarel primero solamente
      // o este o las dos
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
