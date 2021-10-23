// Viene de lectura del cuarderno - TIPADO SEGURO EN LA CONFIGURACION DE VARIABLES DE ENTORNO EN AMBIENTES -
// lo primero es crear el este archivo llamado config.ts en cualquier parte o carpeta del projecto
// lo recomendable es que sea en una carpeta llamada config o como quiera llamarla, por cuestiones didacticas
// la creamos dentro de la carpeta src.

// ya teniendo el archivo creado procedemos a realizar la importacion de una libreria llamda registerAs
// del paquete @nestjs/config como vemos en la linea de abajo
import { registerAs } from '@nestjs/config';

// Despues de tener nuestra importacion de la libreria registerAs procedemos a crear nuestras configuraciones
// para ello exportamos por defecto un metodo llamado registerAs al cual le pasamos como parametros el nombre
// que le querramos poner en este caso es config y como segundo parametro una arrow function que retorna un objeto creado.

// podemos crear un grupo de configuraciones llamado database que tiene la referencia hacia los nombres de las variables
// de entorno que estan en los diferentes archivos y por ultimo podemos tambien crear la referencias unicas para este caso
// seria la variable que tiene la referencia hacia la API_KEY
export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    apiKey: process.env.API_KEY,
  };
});
// Ya contodo esto configurado es decir ya configuramos el tipado que nos servira para hacer la referencia segura hacia
// las variables de entorno que vamos a utilizar en los diferentes ambientes desde otros archivos o servicios para ver como
// ve al archivo app.service.ts
