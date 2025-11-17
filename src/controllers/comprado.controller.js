import { CompradoService } from '../services/comprado.service.js';

export const CompradoController = {
  async getCompradosByIdUsuario(req, res) {
    try {
      const data = await CompradoService.getCompradosByIdUsuario(parseInt(req.params.idusuario));
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  },
  async createComprados(req, res) {
    try {
      const data = await CompradoService.createComprados(parseInt(req.params.idusuario));
      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  },
  async exitComprado(req, res) {
    try {
      const data = await CompradoService.exitComprado(parseInt(req.params.idusuario),parseInt(req.params.idelemento));
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  },
};