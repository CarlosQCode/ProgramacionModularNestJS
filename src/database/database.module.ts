// Este modulo se va a utilizar de forma global para toda la aplicacion eso con el fin de
// no importarlo cada vez que lo necesitemos si no que podamos injectarlo, este modulo
// va a contener la conexion a la bd, por una caso didactivo solo se va a configurar
// para que consuma una API externa y un ejemplo de API_KEY donde vamos a demostrar
// la injeccion

// por otro lado para generar el modulo en la consola ejecutamos el comando
// nest g mo _nombre_del_modulo_

// ahora bien para configurar este modulo que sea global importamos de @nest/common el decorador
// global el cual al utilizarlo antes de decorador @Module nest sabe por implicito que el modulo
// se convierte en global

// Ya solo faltiria configurar los servicios que va a utilizar este modulo, que es en los providers,
// en nuestro caso utilizaresun array en los cuales tenemos una API_KEY de ejemplo y un consumo a una
// API externa
import { Module, Global } from '@nestjs/common';

// Creamos las dos variables la cuales seran nuestras API_KEY para el caso didactico
const API_KEY = '123456';
const API_KEY_PROD = 'PROD1234456';

// En la linea de abajo vemos la utilizacion del decorador @Global
@Global()
@Module({
  // Aqui configuramos los providers tanto en el caso se useClass y como userValue
  // en el caso useClass es la linea(30)
  // y en el caso useValue es la linea(37)
  providers: [
    {
      provide: 'API_KEY',
      // Ente caso le estamos configurando un uso con valor que quiere decir que podemos realizar un proceso
      // en el cual configuramos cual de las dos variables consumir, si estamos en desarrollo nos mostrara al correr
      // la aplicacion la variable API_KEY, pero si ejecutamos el ambiente de produccion nos mostrara API_KEY_PROD, para
      // ejeuctar el ambiente de desarrollo en node ejecutamos en la consola NODE_ENV='prod' nmp run start:dev
      // con este comando estamos ejecutando el ambiente de produccion osea el que esta configurado en esta linea de abajo
      // en desarrollo sigue leyendo la linea 40
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  // sin la linea de codigo de abajo solo podemos utilizar API_KEY si importamos DatabaseModule e injectamos en el modulo
  // que lo necesitemos, pero para poder hacer lo anterior que es utilizar la API_KEY sin la necesidad de importarlo
  // solo debemos de decirle a este modulo que querremos exportar o colocar visible para todos los moduloes del proyecto
  // la API_KEY
  exports: ['API_KEY'],
})
export class DatabaseModule {}
