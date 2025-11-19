/**
 * @file artista.service.js
 * @description Lógica de negocio relacionada con artistas.
 */
import { ArtistaDAO } from '../dao/artista.dao.js';
import { ArtistaDTO } from '../dto/artista.dto.js';

export const ArtistaService = {
  /**
   * Obtiene todos los artistas del sistema.
   * @returns {Promise<ArtistaDTO[]>}
   */
  async getArtistas() {
    const usuarios = await ArtistaDAO.findAll();

    if (!usuarios?.length) return [];

    return usuarios.map(user => new ArtistaDTO(user));
  },

  /**
   * Obtiene un artista por su ID.
   * @param {number} id
   * @returns {Promise<ArtistaDTO|null>}
   */
  async getArtistaById(id) {
    const usuario = await ArtistaDAO.findById(numId);
    if (!usuario) return null;

    return new ArtistaDTO(usuario);
  },
};
