import { DeseaService } from '../services/desea.service.js';

export const DeseaController = {
  async getDeseadosByUser(req, res) {
    try {
      const idusuario = parseInt(req.params.idusuario);
      const data = await DeseaService.getDeseadosByUser(idusuario);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: `Error al obtener los deseados del usuario ${req.params.idusuario}` });
    }
  },

  async existDeseado(req, res) {
    try {
      const idusuario = parseInt(req.params.idusuario);
      const idelemento = parseInt(req.params.idelemento);
      const data = await DeseaService.existDeseado(idusuario, idelemento);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: `Error al verificar si el elemento ${req.params.idelemento} está en los deseados `,
        });
    }
  },

  async deleteDeseado(req, res) {
    try {
      const idusuario = parseInt(req.params.idusuario);
      const idelemento = parseInt(req.params.idelemento);
      const data = await DeseaService.deleteDeseado(idusuario, idelemento);
      res.status(204).json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: `Error al eliminar la relación ${req.params.idusuario} - ${req.params.idelemento} de la lista de deseados`,
        });
    }
  },

  async createDeseado(req, res) {
    try {
      const data = await DeseaService.createDeseado(req.body);
      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: `Error al crear la relación ${req.body.idusuario} - ${req.body.idelemento} para deseados`,
        });
    }
  },

};
