//gestiona las peticiones HTTTP usando los servicio establecidos
import { UsuarioService } from '../services/usuario.service.js';

export const UsuarioController = {
  async getUsuarios(req, res) {
    try {
      const data = await UsuarioService.listarUsuarios();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  },
  async createUsuario(req, res) {
    try {
      //Por ahora prueba a devolver 1 pero debe verificar el token
      const newUser = req.body;
      const data = await UsuarioService.createUsuario(newUser);

      if (!data) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  },
  async getUsuarioById(req, res) {
    try {
      //Por ahora prueba a devolver 1 pero debe verificar el token
      const id = 1;
      const data = await UsuarioService.obtenerUsuario(id);

      if (!data) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  }
};