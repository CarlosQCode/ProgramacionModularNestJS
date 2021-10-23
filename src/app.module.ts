import { Module } from '@nestjs/common';
// Viene de lectura del cuaderno, ya luego de ejecutar en la consola el comando npm i @nestjs/config
// creamos un archivo en raiz del proyecto llamando .env en cual va a contener todas nuestras variables
// de entorno.
// lueego de guardar enese archivo con los datos debemos configurar nuestro gitignore para que no se suba
// a el esos archivos por que dentro de ese archivo puede contener informacion sensible, para hacer eso abrimos
// el archivo .gitignore y en cualquiere linea colocamos *.env con esto le estamos diciendo que ignore todos
// los archivos que terminen en .env

// Ya teniendo es parte terminada, viene la importacion del  nuevo paquete el cual lo hacemos como esta en la liena
// de abajo sigue lectura en la linea 21
import { ConfigModule } from '@nestjs/config';

// Viene de lectura del cuaderno, para usar el archivo enviroments donde contiene las diferentes vaiablres la cuales
// contienen los nombres de los archivos de los ambientes debemos importarlo EJMPLO en la linea de abajo
import { enviroments } from './enviroments';

// Viene de lectura del archivo app.service linea 61
// Solo faltiria resolver la dependencia que hara relacion con el config para luego cargarlo en los imports ejemplo
import config from './config';
// y cargarlo el paquete en los imports linea 51

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

@Module({
  // ya teneiendo el paquete importando procedemos a importarlo dentro del modelo
  // es decir colocarlo en el array de los imports, pero ojo falta configurarlo para que
  // sepa que arhivo va a utilizar para cargar las variables de entorno para ellos le decimos
  // al ConfigModule lo siguiete .forRoot({envFilePath: '.env'}) con este le estamos diceindo al
  // ConfigModule que lea en las rutas un archivo llamado .env
  // y para que lo pueden utilizar los demas modulos le decimos isGlobal: true
  imports: [
    // La forma de injectarlo en los demas modulos es: mira el archivo user.serices
    ConfigModule.forRoot({
      //Esta es la forma en la que podemos leer solo un archivo de entorno con la confgiracion de variables de entorno
      //envFilePath: '.env',
      // Pero tambien podemos hacerla desde un archivo de configuracion de variables de entorno mediante ambientes
      // mediante un unico archivo esto quiere decir que explicitamente podemos decirle que archivo de configuracion
      // de variables tomar segun el ambiente para ello leer la linea 14, ya luego de tener importado el archivo
      // configuramos el path para que leea ese archivo y dinamicamente utilice el archivo de configuracion de ambiente
      // que se le paso en la consola EJEMPLO
      // Aqui estamos diciendole que leea del path un archivo llamado enviroments que viene de las importacion de arriba
      // que dentro lea un process.env.NODE_ENV en cual dinamicamnte elije el ambiente o si no define ninguno que lea el
      // archivo .env, ya para usarlo nos vamos al archivo appService. sigue lectura en ese archivo
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
