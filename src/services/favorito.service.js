import { FavoritoDAO } from '../dao/favorito.dao.js';
import { UsuarioFavoritoElementoDTO } from '../dto/relacion.dto.js';

export const FavoritoService = {
  /**
   * Obtiene lso elementos favoritos del usuario
   * @param {number} idusuario
   * @returns {Promise<List<ElementoDTO>>}
   */
  async getFavoritosByUser(idusuario) {
    const elementos = await FavoritoDAO.findAllByUsuario(idusuario);
    return elementos;
    //return usuarios.map(u => new ElementoDTO(u));
  },

  /**
   * Comprueba si un artista ya está en la lista de favoritos del usuario
   * @param {number} idusuario
   * @param {number} idelemento
   * @returns {Promise<boolean>}
   */
  async existArt(idusuario, idelemento) {
    let tipo = [0]
    const existe = await FavoritoDAO.findOne(idusuario, idelemento, tipo);
    return !!existe;
  },

  /**
   * Elimina un artista de la lista de favoritos del usuario
   * @param {number} idusuario
   * @param {number} idelemento
   * @returns {Promise<UsuarioFavoritoElementoDTO|null>}
   */
  async deleteArt(idusuario, idelemento) {
    let tipo = [0]
    const existe = await FavoritoDAO.findOne(idusuario, idelemento, tipo);
    if (!existe) return null;

    const eliminado = await FavoritoDAO.delete(idusuario, idelemento, tipo);
    return new UsuarioFavoritoElementoDTO(eliminado);
  },

  /**
   * Comprueba si un album o cancion ya está en la lista de favoritos del usuario
   * @param {number} idusuario
   * @param {number} idelemento
   * @returns {Promise<boolean>}
   */
  async existCont(idusuario, idelemento) {
    let tipo = [1,2]
    const existe = await FavoritoDAO.findOne(idusuario, idelemento, tipo);
    return !!existe;
  },

  /**
   * Elimina un album o cancion de la lista de favoritos del usuario
   * @param {number} idusuario
   * @param {number} idelemento
   * @returns {Promise<UsuarioFavoritoElementoDTO|null>}
   */
  async deleteCont(idusuario, idelemento) {
    let tipo = [1,2]
    const existe = await FavoritoDAO.findOne(idusuario, idelemento, tipo);
    if (!existe) return null;

    const eliminado = await FavoritoDAO.delete(idusuario, idelemento, tipo);
    return new UsuarioFavoritoElementoDTO(eliminado);
  },

  /**
   * Agrega un elemento a la lista de favoritos del usuario
   * @param {UsuarioCestaElementoDTO} data
   * @returns {Promise<UsuarioFavoritoElementoDTO>}
   */
  async createFavorito(data) {
    let tipo = [data.tipo];

    // TODO si necesito que se verifique si existe el artista antes de hacerlo

    const existe = await FavoritoDAO.findOne(data.idusuario, data.idelemento, tipo);
    if (existe) {
      throw new Error('El elemento ya está en la cesta del usuario.');
    }

    const creado = await FavoritoDAO.create(data);
    return new UsuarioFavoritoElementoDTO(creado);
  },
};
