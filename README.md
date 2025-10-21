# GC02-GPS25_Usuario
# 🚀 Microservicio Node.js con PostgreSQL

Este proyecto es un **microservicio backend** desarrollado con **Node.js**, conectado a una base de datos **PostgreSQL**, y diseñado para ser modular, escalable y fácil de desplegar.

---

## 📦 Características principales

- ⚡️ API con Node.js  
- 🐘 Conexión a PostgreSQL 
- 🔒 Gestión de variables de entorno con `.env`  
- 🧩 Estructura limpia para microservicios  
- 🧪 Configurado para pruebas y despliegue en Docker  

---

## 🧰 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/)
- (Opcional) [Docker](https://www.docker.com/) si deseas ejecutar el servicio en contenedores

---

## ⚙️ Configuración del entorno

El proyecto utiliza un archivo de configuración `.env` para manejar variables sensibles (como la URL de la base de datos, el puerto, etc).

> 🔐 **El archivo `.env` NO se incluye en el repositorio por seguridad.**

En su lugar, existe un archivo de ejemplo: **`.env.example`**, que sirve como plantilla.

### 📄 `.env.example`

```bash
# Puerto donde correrá el servidor
PORT=3000

# Cadena de conexión a PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase

# Entorno de ejecución
NODE_ENV=development

# Clave para firmar tokens JWT
JWT_SECRET=your_secret_key_here

