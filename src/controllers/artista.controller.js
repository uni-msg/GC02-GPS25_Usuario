//gestiona las peticiones HTTTP usando los servicio establecidos
import { ArtistaService } from '../services/artista.service.js';

export const ArtistaController = {
  async getArtistas(req, res) {
    try {
      const data = await ArtistaService.getArtistas();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  },

  async getArtistaById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const data = await ArtistaService.getArtistaById(id);

      if (!data) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  },
  
};