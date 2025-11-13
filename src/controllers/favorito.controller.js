import { FavoritoService } from '../services/favorito.service.js';

export const FavoritoController = {
  async getFavoritosByUser(req, res) {
    try {
      const idusuario = parseInt(req.params.idusuario);
      const data = await FavoritoService.getFavoritosByUser(idusuario);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: `Error al obtener los elementos favoritos del usuario ${req.params.idusuario}` });
    }
  },

  async existArt(req, res) {
    try {
      const idusuario = parseInt(req.params.idusuario);
      const idelemento = parseInt(req.params.idelemento);
      const data = await FavoritoService.existArt(idusuario, idelemento);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: `Error al verificar si el artista ${req.params.idelemento} está en los faritos`,
        });
    }
  },

  async deleteArt(req, res) {
    try {
      const idusuario = parseInt(req.params.idusuario);
      const idelemento = parseInt(req.params.idelemento);
      const data = await FavoritoService.deleteArt(idusuario, idelemento);
      res.status(204).json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: `Error al eliminar al artista favorito de la relacion ${req.params.idusuario} - ${req.params.idelemento} `,
        });
    }
  },

  async existCont(req, res) {
    try {
      const idusuario = parseInt(req.params.idusuario);
      const idelemento = parseInt(req.params.idelemento);
      const data = await FavoritoService.existCont(idusuario, idelemento);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: `Error al verificar si el contenido ${req.params.idelemento} está en los faritos`,
        });
    }
  },

  async deleteCont(req, res) {
    try {
      const idusuario = parseInt(req.params.idusuario);
      const idelemento = parseInt(req.params.idelemento);
      const data = await FavoritoService.deleteCont(idusuario, idelemento);
      res.status(204).json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          error: `Error al eliminar al elemento favorito de la relacion ${req.params.idusuario} - ${req.params.idelemento} `,
        });
    }
  },

  async createFavorito(req, res) {
    try {
      const data = await FavoritoService.createFavorito(req.body);
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
};
