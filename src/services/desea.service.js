import { DeseaDAO } from '../dao/desea.dao.js';
import { UsuarioDeseaElementoDTO } from '../dto/relacion.dto.js';

export const DeseaService = {
  /**
   * Obtiene la lista de deseados de un usuario
   * @param {number} idusuario
   * @returns {Promise<List<ElementDTO>>}
   */
  async getDeseadosByUser(idusuario) {
    const elementos = await DeseaDAO.findAllByUsuario(idusuario);
    return elementos; //DEBERIA MAPEARLO CON LOS RESULTAOD DE LA API DE ELEMNENTOS
  },

  /**
   * Comprueba si un elemento ya está en la lista de deseados del usuario
   * @param {number} idusuario
   * @param {number} idelemento
   * @returns {Promise<boolean>}
   */
  async existDeseado(idusuario, idelemento) {
    const existe = await DeseaDAO.findOne(idusuario, idelemento);
    return !!existe;
  },

  /**
   * Elimina un elemento de la lista de deseados del usuario
   * @param {number} idusuario
   * @param {number} idelemento
   * @returns {Promise<UsuarioDeseaElementoDTO|null>}
   */
  async deleteDeseado(idusuario, idelemento) {
    const existe = await DeseaDAO.findOne(idusuario, idelemento);
    if (!existe) return null;

    const eliminado = await DeseaDAO.delete(idusuario, idelemento);
    return new UsuarioDeseaElementoDTO(eliminado);
  },

  /**
   * Agrega un elemento a la lista de deseados del usuario
   * @param {UsuarioCestaElementoDTO} data
   * @returns {Promise<UsuarioDeseaElementoDTO>}
   */
  async createDeseado(data) {
    const existe = await DeseaDAO.findOne(data.idusuario, data.idelemento);
    if (existe) {
      throw new Error('El elemento ya está en la lista del usuario.');
    }

    const creado = await DeseaDAO.create(data);
    return new UsuarioDeseaElementoDTO(creado);
  },
};
