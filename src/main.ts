import { NestFactory } from '@nestjs/core';
// aqui estamos activando las validaciones que hemos realizado en el DTO,
// eso quiere decir que vamos a importar un pipe desde @nest/common llamado
// ValidationPipe
import { ValidationPipe } from '@nestjs/common';
// ya teniendo ValidationPipe importado para activar las validaciones de forma global debemos
// hacer lo sigueinte (lee linea 12)
import { AppModule } from './app.module';

// Esta viene de lectura del cuaderno el tema - Documentacion del prpyecto integracion de swagger y partialtype con open api
// Luego de instalar los paquetes debemos importarlos a arhivo
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// para luego reaizar las configuraciones que os dicen en la documentacion de nestjs. sigue en la linea 33

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

  // Lineas para la configuracion de la documentacion de la API con OPEN API
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('PLATZI STORE')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Habilitamos las cors para que al momento de hacer deploy en heroku podamos consumir este proyecto desde cualquier parte
  // para eso le decimos a app que habilite la cors(), averiguar como podemos pasarle configuraciones para que solo
  // podamos consumir desde front-end especificos
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
