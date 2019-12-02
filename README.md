# Tyba_Prueba_Tecnica_Sebastian_Alarcon

# Tecnologias utilizadas:

Node.js,
MongoDB (corriendo en el puerto 27017).

# Como ejecutar

Clonar el repositorio y correr el comando npm install para instalar las dependencias, crear BD en mongoDB llamada users (si se utiliza compass simplemente conectarse al puerto 27017 y dar click en crear BD si se corre por consola utilizar el comando "use users") y correr los endpoint defindos en la carpeta Routes.

# Respuesta de los endpoint

Los endpoint pueden devolver estado 200 si la operación es realizada con éxito, 400 si hay problema de cliente, 403 si no tiene token de acceso valido y 404 en caso de no encontrar información.

# endpoints

Las url para ejecutar los endpoint son:

# Log in

POST http://localhost:3000/user con cuerpo: {
	"userName": "",
	"password": ""
}
