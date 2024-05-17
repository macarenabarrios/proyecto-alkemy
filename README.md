# Proyecto Alkemy - Librería

## Descripción

Este proyecto es una aplicación backend para la gestión de una librería, construida con Node.js, Express, MySQL y Sequelize como ORM. La aplicación permite a los usuarios gestionar préstamos de libros, realizar reseñas, recibir notificaciones por correo electrónico y en tiempo real, y chatear con otros usuarios conectados.

## Instalación

Clona el repositorio y ejecuta npm install para instalar las dependencias:

`$ git clone https://github.com/macarenabarrios/proyecto-alkemy.git`
`$ cd proyecto-alkemy`
`$ npm install`

## Configuración

Crea un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

`GMAIL_USER=tu_email@gmail.com`
`GMAIL_PASS=tu_contraseña`
`DB_HOST=localhost`
`DB_USER=root`
`DB_PASS=tu_contraseña`
`DB_NAME=nombre_de_tu_base_de_datos`
`JWT_SECRET=tu_secreto_jwt`

## Ejecución

Para iniciar el servidor en modo desarrollo, ejecuta:

`$ npm run dev`

El servidor se ejecutará en http://localhost:3000.

## Recomendación para pruebas

Dado que este proyecto de backend no incluye un frontend, es altamente recomendable utilizar herramientas como Postman o Insomnia para probar las rutas y la funcionalidad de la API. Estas herramientas permiten enviar solicitudes HTTP y verificar las respuestas, facilitando el desarrollo y la depuración.

#### Postman

Postman es una popular herramienta de desarrollo API que permite crear, probar y documentar solicitudes HTTP de manera fácil y visual.

##### Instalación
Puedes descargar Postman desde [aquí](https://www.postman.com/downloads/).

##### Uso

1. **Crear una nueva colección:**

Agrupa las rutas de la API en colecciones para mantenerlas organizadas.

2. **Crear una nueva solicitud:**

   - Selecciona el método HTTP (GET, POST, PUT, DELETE, etc.).

   - Ingresa la URL de la API.

   - Añade los encabezados necesarios (por ejemplo, Content-Type: application/json).

   - Añade el cuerpo de la solicitud si es necesario (en formato JSON).

3. **Enviar la solicitud:**

Haz clic en "Send" para enviar la solicitud y ver la respuesta del servidor.

4. **Guardar las solicitudes:**

Guarda las solicitudes en la colección para reutilizarlas fácilmente.

##### Ejemplo de Solicitud

Supongamos que quieres probar la creación de un usuario en la ruta /api/auth con un método POST. Aquí tienes un ejemplo de cómo hacerlo:

**Crear una nueva solicitud:**
Método: POST
URL: http://localhost:3000/api/auth/register
Cuerpo:
    {
	  "firstname": "John",

      "lastname": "Doe",

      "email": "johndoe@email.com",

      "password": "password123",

      "membershipNumber": "M131a9"
	 }

Luego, **enviar la solicitud** y verificar la respuesta.

## Modelos y relaciones

El proyecto contiene los siguientes modelos y sus relaciones:

- **User**: Representa a los usuarios de la aplicación.

- **Role**: Representa los roles que pueden tener los usuarios.

- **Author**: Representa a los autores de los libros.Book: Representa a los libros.

- **Category**: Representa las categorías de los libros.

- **BookCategory**: Tabla intermedia para la relación muchos a muchos entre Book y Category.

- **Publisher**: Representa a las editoriales de los libros.

- **Library**: Representa las bibliotecas de los usuarios.

- **Review**: Representa las reseñas de los libros.

- **Loan**: Representa los préstamos de los libros.

- **Event**: Representa los eventos de la biblioteca.

![Base de datos](/src/utils/img/Models.png)

## Clean architecture

El proyecto sigue el principio de Arquitectura Limpia, separando las responsabilidades en capas bien definidas: Controladores, Servicios, Repositorios y Modelos. Este enfoque mejora la mantenibilidad y escalabilidad del código.

#### Controladores

Los controladores gestionan las solicitudes HTTP entrantes y las respuestas. Son responsables de recibir las entradas del usuario, procesarlas (normalmente llamando a servicios), y devolver las respuestas adecuadas.

Las rutas están organizadas en la carpeta `routes` y siguen una arquitectura limpia dividiendo la lógica en controladores, servicios y repositorios.

#### Servicios

Los servicios encapsulan la lógica de negocio y coordinan las operaciones entre los controladores y los repositorios. Esta capa se asegura de que las reglas de negocio se apliquen correctamente.

#### Repositorios

Los repositorios gestionan las operaciones de acceso a datos. Son responsables de la comunicación con la base de datos a través de los modelos, encapsulando las consultas SQL o ORM.

#### Modelos

Los modelos representan la estructura de los datos y las relaciones en la base de datos. Utilizamos Sequelize para definir estos modelos y sus asociaciones.

#### Integración de las Capas

- **Controladores**: Reciben las solicitudes del cliente, las validan y llaman a los servicios necesarios.
- **Servicios**: Contienen la lógica de negocio y coordinan las acciones entre los controladores y los repositorios.
- **Repositorios**: Realizan las operaciones de acceso a datos, comunicándose con la base de datos a través de los modelos.
- **Modelos**: Definen la estructura de los datos y las relaciones entre las tablas de la base de datos.

Esta estructura permite una separación clara de responsabilidades, facilitando la prueba, el mantenimiento y la escalabilidad del proyecto. Al seguir la Arquitectura Limpia, nos aseguramos de que cada capa tenga una única responsabilidad, promoviendo un código más organizado y manejable.

## Funcionalidades

#### Notificaciones por Correo Electrónico

Se envían correos electrónicos cuando se crean nuevos libros y nuevos libros de nuevos autores utilizando `nodemailer`. Se utilizan las siguientes funciones para el envío de correos electrónicos y notificaciones:

- **sendEmail**: Envía correos electrónicos.

- **sendLoanNotification**: Notifica sobre nuevos préstamos.

- **sendNewNotification**: Notifica sobre nuevos libros y nuevos autores.

#### Notificaciones en Tiempo Real y Chat

Utiliza `socket.io` para permitir a los usuarios recibir notificaciones en tiempo real y chatear con otros usuarios conectados:

- **configureSocketIO**: Configura Socket.IO con el servidor.

- **notifyNewBookAvailable**: Notifica cuando un nuevo libro está disponible.

- **chat message**: Maneja los mensajes de chat en tiempo real.

*Este proyecto proporciona una base sólida para la gestión de una librería, integrando funcionalidades avanzadas como notificaciones en tiempo real y un sistema de préstamos y reseñas de libros.*