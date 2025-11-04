//Levanta el servidor para el puerto erranque en el puerto pedido o el 3000
// Recibe las configuraciones preparadas en app.js
import app from './app.js';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
