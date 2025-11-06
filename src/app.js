//Empleamos espress para la llamadas REST
import express from 'express';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuario.routes.js';
import compradoRoutes from './routes/comprado.routes.js';

dotenv.config(); // Cargamos las variables

const app = express();
console.log('DB URL:', process.env.DATABASE_URL);

app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/usuarios/tiene', compradoRoutes);

export default app;