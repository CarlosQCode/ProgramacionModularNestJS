// para utilizar el modulo DatabaseModule en cual nos provee de un useValue llamado API_KEY
// como el modulo ya esta configurado de forma global y esta exportando el useValue API_KEY,
// solo debemos injectarlo, en este caso sera en este servicio lee linea 8
import { Injectable, Inject } from '@nestjs/common';

// esta parte viende del archivo config.ts y describe como podemos usar esa configuracion de tipado
// para ellos importamos el config desde el archivo config
import config from './config';
//nota: no utilizamos {} ya que ese archivo exporta por defecto y no utiliza los {},
// ya no utilizamos el ConfigService sino el ConfigType de ese mismo modulo
import { ConfigType } from '@nestjs/config';
// ya tenidendo todo esto solo faltaria injectarlo para luego hacer referencia a las distintas variables
// con el tipado seguro para ello lee la linea 34

// Ya para ver el ejercisio funcionando es decir ver los valores de las diferentes variables
// de entorno segun su entorno debemos primaro importar primero el servicio que viende del paquete config
// el cual encontramos en @nestjs/config EJEMPLO
//import { ConfigService } from '@nestjs/config'; //sigue lectura en la linea 22
@Injectable()
export class AppService {
  // Sabes que para injectar algo debemos utilizar el decorador Inject con lo cual debemos importarlo
  // desde @nest/common, luego debemos crear el constuctor el cual le pasaremos como parametros el decorador
  // @Inject con el paramtro que queremos injectar en nuestro caso sera API_KEY ejemplo
  constructor(
    // En la linea de abajo estamos utiliznado el provider de donde esta configurado el API_KEY, que ya
    // dependiendo de ambiente nos dara ya sea un avalor u o el otro sabiendo que estamos utiliznado dos tipos de
    // provider en que viene por defecto y el useValue en el use Value es que esta configurado el API_KEY en el cual
    // dependiendo al ambiente muestra ya sea un valor o el otro
    //@Inject('API_KEY') private apikey: string,

    // ya despues de tener el servicio importado debemos injectarlo con lo cual en el construtor de la clase lo llamamos EJEMPLO
    //private config: ConfigService, // ya con esto podemos leer las variables de entorno  desde el servicio sigue en linea(31)

    // aqui injectamos esa configuracion con el decorador Inject el cual le pasamos como parametro el config.KEY
    // y creamos una variablde privada llamada configService que es de tipo ConfigType especificando que es de tipo config
    // sigue lectura en la linea 50
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    // En la linea de abajo estamos mostrando un mensaje el cual contiene lo que tiene API_KEY desde el
    // modulo de DataBases sin necesidad de exportar ese modulo pero si pudiendo injectandolon
    // return `Hello World! esta es tu API-KEY: ${this.apikey}`;

    // ya para leer los datos que contienen las diferentes variables de entornos de los ambientes debemos
    // crear una variable constante la cual le pasamos lo que capture de la variable que contiene el confgiservice
    // con el parametro del nombre de la variable de entorno ejemplo
    //const apikey = this.config.get('API_KEY');
    //const dbName = this.config.get('DATABASE_NAME');

    // ya despues de haber injectado solo resta hacer refrencia en un metodo a las diferentes variables de entorno que
    // hemos configurado en los diferentes archivos de ambientes para ello creamos variables las cuales tendran como valor
    // dichas referencaias
    // Ejemplo
    const apikey = this.configService.apiKey;
    // aqui estamos llegando hasta el nombre de la variable la cual contiene la refrencia exacta de la variable de entorno
    // en los diferentes archivos de ambientes
    const dbName = this.configService.database.name;
    const port = this.configService.database.port;
    // En estas lineas de aariba estmos llegando hasata el grupo que contiene los nombres de las variables que hacen refeencia
    // hacia las variables de entornos que estan en los diferentes archivos de ambientes, solo faltaria configuar la carga en el app.module
    // para que pueda resolver estas dependencias para ellos vamos al archivo app.module

    // luedo de terner el dato guarado en la variable podemos exponerla ejemplo
    return `Hola esta es tu API KEY: ${apikey} y el nombre de tu base de datos es: ${dbName}`;
  }
}
