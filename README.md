# Gestión de Productos con Express.js, TypeScript y MongoDB

Este proyecto es una API RESTful desarrollada con Express.js y TypeScript que permite gestionar productos (CRUD) y realizar búsquedas por categoría. Incluye un sistema de autenticación basado en JWT y protección contra ataques CSRF. Además, se implementaron medidas de seguridad como el cifrado de contraseñas con Bcryptjs, validación de entradas con Express Validator, y limitación de solicitudes con Rate Limiting. La API está diseñada para ser escalable, segura y fácil de mantener.


## Instalación

1. Clona el repositorio:

2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/productdb
   JWT_SECRET=mysecretkey
   PORT=3000
   ```
4. Inicia el servidor:
   ```bash
   - npm run build
   - npm start

   - o en desarrollo:

   - npm run dev
   ```
   El servidor estará disponible en [http://localhost:3000](http://localhost:3000).

## Estructura del Proyecto

```
src/
│
├── config/
│   └── db.ts            # Configuración de la conexión a MongoDB
├── controllers/
│   ├── authController.ts # Controladores para autenticación
│   └── productController.ts # Controladores para productos
├── middlewares/
│   ├── authMiddleware.ts # Middleware de autenticación
│   └── roleMiddleware.ts # Middleware de autorización por roles
├── models/
│   ├── Product.ts       # Modelo de Producto
│   └── User.ts          # Modelo de Usuario
├── routes/
│   ├── authRoutes.ts    # Rutas de autenticación
│   └── productRoutes.ts # Rutas de productos
├── app.ts               # Configuración de la aplicación
└── server.ts            # Punto de entrada del servidor
```

## API Endpoints

### Protected Routes (POST, PUT, DELETE)
  Add Header-token:

  Authorization: `<your_login_token>`
  X-CSRF-Token: `<your_csrf_token>`

#### `GET /api/csrf-token` - Obtiene el token CSRF.

### Autenticación

#### `POST /api/auth/register` - Registra un nuevo usuario.

**Body:**

```json
{
  "username": "",
  "email": "",
  "password": "",
  "roles": [""]  //user  || admin
}
```

#### `POST /api/auth/login` - Inicia sesión y devuelve un token JWT (Authorization).

**Body:**

```json
{
  "email": "",
  "password": ""
}
```

### Rutas de Productos

#### `GET /api/products` - Obtiene todos los productos.

#### `GET /api/products/:id` - Obtiene un producto por ID.

#### `POST /api/products` - Crea un nuevo producto (requiere autenticación y rol de administrador).

**Body:**

```json
{
  "name": "",
  "price": ,
  "category": ""
}
```

#### `PUT /api/products/:id` - Actualiza un producto (requiere autenticación y rol de administrador).

#### `DELETE /api/products/:id` - Elimina un producto (requiere autenticación y rol de administrador).

### Tecnologías Utilizadas

- **Express.js**: Framework para construir la API.
- **TypeScript**: Lenguaje de programación.
- **MongoDB**: Base de datos NoSQL.
- **JWT**: Autenticación basada en tokens.
- **CSRF**: Protección contra ataques CSRF.
- **Helmet**: Cabeceras de seguridad HTTP.
- **Bcryptjs**: Cifrado de contraseñas.
- **Express Validator**: Validación y sanitización de entradas del usuario.
- **Rate Limiting**: Limita el número de solicitudes por IP para prevenir ataques de fuerza bruta.
- **CORS (Cross-Origin Resource Sharing)**: Permite solicitudes solo desde dominios específicos.

## Licencia

Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo LICENSE.

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún error o tienes alguna sugerencia, abre un issue o envía un pull request.


