# Proyecto API de Red Social

Este proyecto es una API RESTful para una red social, construida con Node.js y Express, que permite la gestión de usuarios, publicaciones, comentarios y sus favoritos. Utiliza Prisma como ORM para la interacción con la base de datos.

## Índice

- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura de la API](#estructura-de-la-api)
- [Controladores](#controladores)
- [Rutas](#rutas)
- [Middleware](#middleware)
- [Validaciones](#validaciones)
- [Autenticación y Autorización](#autenticación-y-autorización)
- [Configuración del Proyecto](#configuración-del-proyecto)

## Tecnologías Utilizadas

- Node.js
- Express
- Prisma
- PostgreSQL
- Bcrypt
- Jsonwebtoken
- Joi
- PNPM (gestión de paquetes)

## Estructura de la API

La API cuenta con los siguientes recursos:

- **Usuarios**: Registro, inicio de sesión, gestión de perfiles y roles.
- **Publicaciones**: Creación, obtención, actualización y eliminación de publicaciones.
- **Comentarios**: Gestión de comentarios en publicaciones.
- **Favoritos**: Gestión de publicaciones y comentarios favoritos.

## Controladores

Los controladores manejan la lógica de negocio de cada recurso:

- **usersController**: Controla la creación, obtención, actualización y eliminación de usuarios.
- **postsController**: Controla la creación, obtención, actualización y eliminación de publicaciones.
- **commentsController**: Controla la creación, obtención, actualización y eliminación de comentarios.
- **postFavController**: Controla la gestión de publicaciones favoritas.
- **commentFavController**: Controla la gestión de comentarios favoritos.

## Rutas

Las rutas definen los endpoints de la API:

- **Usuarios**:
  - `POST /api/register`: Registra un nuevo usuario.
  - `POST /api/login`: Inicia sesión.
  - `GET /api/profile/:id`: Obtiene el perfil de un usuario.
  - `GET /api/users`: Obtiene todos los usuarios.
  - `PATCH /api/users/:id`: Actualiza un usuario.
  - `DELETE /api/users/:id`: Elimina un usuario.

- **Publicaciones**:
  - `GET /api/posts`: Obtiene todas las publicaciones.
  - `POST /api/posts`: Crea una nueva publicación.
  - `GET /api/posts/:id`: Obtiene una publicación por ID.
  - `PATCH /api/posts/:id`: Actualiza una publicación.
  - `DELETE /api/posts/:id`: Elimina una publicación.

- **Comentarios**:
  - `GET /api/comments`: Obtiene todos los comentarios.
  - `POST /api/comments`: Crea un nuevo comentario.
  - `GET /api/comments/:id`: Obtiene un comentario por ID.
  - `PATCH /api/comments/:id`: Actualiza un comentario.
  - `DELETE /api/comments/:id`: Elimina un comentario.

- **Favoritos de Publicaciones**:
  - `POST /api/post-fav`: Marca una publicación como favorita.
  - `DELETE /api/post-fav`: Desmarca una publicación como favorita.
  - `GET /api/user/:userId/post-favs`: Obtiene las publicaciones favoritas de un usuario.
  - `GET /api/post/:postId/users`: Obtiene los usuarios que marcaron una publicación como favorita.

- **Favoritos de Comentarios**:
  - `POST /api/comment-fav`: Marca un comentario como favorito.
  - `DELETE /api/comment-fav`: Desmarca un comentario como favorito.
  - `GET /api/user/:userId/comment-favs`: Obtiene los comentarios favoritos de un usuario.
  - `GET /api/comment/:commentId/users`: Obtiene los usuarios que marcaron un comentario como favorito.

## Middleware

- **isAdmin**: Middleware que verifica si el usuario tiene el rol de administrador.
- **schemaValidator**: Middleware que valida los esquemas de los requests.

## Validaciones

Se utiliza Joi para validar los datos de entrada en las rutas, asegurando que cumplen con los requisitos establecidos.

## Autenticación y Autorización

Se utiliza JWT (Json Web Tokens) para la autenticación de los usuarios. Los tokens se generan en el inicio de sesión y se requieren para acceder a rutas protegidas.

## Configuración del Proyecto

1. Clona el repositorio.
2. Instala las dependencias utilizando PNPM:
   ```bash
   pnpm install
3. Configura el archivo .env con las variables de entorno necesarias:
  SECRET_KEY=tu_clave_secreta
  REFRESH_SECRET_KEY=tu_clave_secreta_para_refresh
  SERVER_PORT=3001
  DATABASE_URL=tu_url_de_base_de_datos
5. pnpm start
Ahora puedes hacer peticiones a la API en http://localhost:3001/api.
