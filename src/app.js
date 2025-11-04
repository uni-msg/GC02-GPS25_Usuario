//Empleamos espress para la llamadas REST
import express from 'express';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuario.routes.js';

dotenv.config(); // 👈 carga las variables del .env

const app = express();
console.log('DB URL:', process.env.DATABASE_URL);

app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);

export default app;