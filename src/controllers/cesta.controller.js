import { CestaService } from '../services/cesta.service.js';

export const CestaController = {
  async getCestaByUser(req, res) {
    try {
      const idusuario = parseInt(req.params.idusuario);
      const data = await CestaService.getCestaByUser(idusuario);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: `Error al obtener la cesta del usuario ${req.params.idusuario}` });
    }
  },

  async createItemCesta(req, res) {
    try {
      const data = await CestaService.createItemCesta(req.body);
      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: `Error al crear la relación ${req.body.idusuario} - ${req.body.idelemento}`,
        });
    }
  },

  async existItemCesta(req, res) {
    try {
      const idusuario = parseInt(req.params.idusuario);
      const idelemento = parseInt(req.params.idelemento);
      const data = await CestaService.existItemCesta(idusuario, idelemento);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: `Error al verificar si el elemento ${req.params.idelemento} está en la cesta`,
        });
    }
  },

  async deleteItemCesta(req, res) {
    try {
      const idusuario = parseInt(req.params.idusuario);
      const idelemento = parseInt(req.params.idelemento);
      const data = await CestaService.deleteItemCesta(idusuario, idelemento);
      res.status(204).json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: `Error al eliminar la relación ${req.params.idusuario} - ${req.params.idelemento}`,
        });
    }
  },
};
