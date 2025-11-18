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
      const data = await UsuarioService.createUsuario(req.body);
      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  },

  async getUsuarioById(req, res) {
    try {
      //Por ahora prueba a devolver 1 pero debe verificar el token
      const id = parseInt(req.param.id);
      const data = await UsuarioService.obtenerUsuario(id);

      if (!data) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  },

  async getLogin(req, res) {
    try {
      const data = await UsuarioService.obtenerUsuario(parseInt(req.user.uid));

      if (!data) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  },

  async getLogout(req, res) {
    try {
      const data = await UsuarioService.logout(req.user.uid);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener eliminar el token' });
    }
  },

  async updateUsuario(req, res) {
    try {
      //Por ahora prueba a devolver 1 pero debe verificar el token
      const data = await UsuarioService.updateUsuario(req.body);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  },

  async deleteUsuario(req, res) {
    try {
      const data = await UsuarioService.deleteUsuario(req.user.uid);
      res.status(204).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  },

  async getUsuariosPubli(req, res) {
    try {
      const data = await UsuarioService.listarUsuariosPubli();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  },
  
  async getUsuarioPubliById(req, res) {
    try {
      const data = await UsuarioService.obtenerUsuarioPubli(parseInt(req.params.id));
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  },
  
};