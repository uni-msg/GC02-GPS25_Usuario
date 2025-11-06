# GC02-GPS25_Usuario
🚀 **Microservicio Node.js con PostgreSQL y Firebase Admin**

Este proyecto es un **microservicio backend** desarrollado con **Node.js**, conectado a una base de datos **PostgreSQL**, e integrado con **Firebase Admin** para la autenticación.  
Está diseñado para ser **modular, escalable y fácil de desplegar** en entornos locales o en la nube.

---

## 📦 Características principales

- ⚡️ API REST construida con **Express**
- 🐘 Conexión con **PostgreSQL** mediante **Prisma ORM**
- 🔒 Autenticación con **Firebase Admin SDK**
- ⚙️ Gestión de variables de entorno con `.env`
- 🧩 Arquitectura limpia con **DAO**, **Servicios** y **Controladores**
- 🧪 Compatible con entornos **Docker**
- ✅ Transacciones y control de errores centralizado

---

## 🧰 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/)
- (Opcional) [Docker](https://www.docker.com/) si deseas ejecutar el servicio en contenedores

---

## ⚙️ Configuración del entorno

El proyecto utiliza un archivo `.env` para manejar variables sensibles (como la URL de la base de datos, el puerto y las credenciales de Firebase).

> 🔐 **El archivo `.env` no se incluye en el repositorio por seguridad.**

Puedes basarte en el archivo **`.env.example`** que sirve como plantilla.  
Estas son las variables necesarias:

```bash
# Puerto donde correrá el servidor
PORT=3000

# Cadena de conexión a PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase

# Entorno de ejecución
NODE_ENV=development

# Firebase Admin SDK
FIREBASE_PROJECT_ID=nombre-proyecto
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xyz@nombre-proyecto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIBV...etc...\n-----END PRIVATE KEY-----\n"

# URL base para fotos de usuario
BUCKUP_USER=https://example.com/perfiles/
```

## 🏗️ Instalación

Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone https://github.com/tuusuario/GC02-GPS25_Usuario.git
cd GC02-GPS25_Usuario
```

Instala las dependencias del proyecto con npm:

```bash
npm install
```

## 🧠 Base de datos

Asegúrate de que PostgreSQL esté corriendo y que tu .env tenga la URL correcta.
Luego genera el cliente Prisma:

```bash
npx prisma generate
```

Si quieres crear las tablas según tu esquema:

```bash
npx prisma migrate dev --name init
```

Puedes inspeccionar la base de datos con:

```bash
npx prisma studio
```

## 🚀 Ejecución del servidor

🔹 Modo desarrollo (con recarga automática)

```bash
npm run dev
```

Usa nodemon para reiniciar el servidor automáticamente al hacer cambios.

🔹 Modo producción

```bash
npm start
```

El servidor se ejecutará por defecto en:

http://localhost:3000

## 🧪 Pruebas rápidas

🔸 Obtener token de Firebase (modo script)

Puedes generar un token JWT válido con:

```bash
node script/getToken.js <correo> <contraseña>
```

Esto devuelve un token de Firebase que podrás usar para autenticar tus peticiones a los endpoints protegidos.

🔸 Probar endpoints

Ejemplo de petición autenticada con cURL:

```bash
curl -X POST http://localhost:3000/api/usuarios/tiene/18 \
  -H "Authorization: Bearer <TOKEN_AQUI>" \
  -H "Content-Type: application/json"
```

## 📁 Arquitectura del microservicio

```bash
src/
├── config/           # Configuración de Firebase, Prisma y entorno
├── controllers/      # Controladores HTTP
├── dao/              # Acceso a datos (Prisma)
├── dto/              # Encapsula los datos
├── middlewares/      # Middlewares como verificación de tokens
├── routes/           # Rutas del microservicio
├── services/         # Lógica de negocio y transacciones
└── server.js         # Punto de entrada de la aplicación
```
