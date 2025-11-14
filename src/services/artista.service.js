//Orquesta lo logica del negocio (validar, transformas, DAO)
import { ArtistaDAO } from '../dao/artista.dao.js';
import { ArtistaDTO } from '../dto/artista.dto.js';

export const ArtistaService = {
  async getArtistas() {
    const usuarios = await ArtistaDAO.findAll();
    return usuarios.map(u => new ArtistaDTO(u));
  },

  async getArtistaById(id) {
    const usuario = await ArtistaDAO.findById(id);
    if (!usuario) return null;
    return new ArtistaDTO(usuario);
  },

};