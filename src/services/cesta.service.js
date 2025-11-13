import { CestaDAO } from '../dao/cesta.dao.js';
import { CestaDTO, CestaItemDTO } from '../dto/cesta.dto.js';
import { UsuarioCestaElementoDTO } from '../dto/relacion.dto.js';

export const CestaService = {
  /**
   * Obtiene la cesta completa de un usuario
   * @param {number} idusuario
   * @returns {Promise<CestaDTO>}
   */
  async getCestaByUser(idusuario) {
    const elementos = await CestaDAO.findAllByUsuario(idusuario);

    if (!elementos || elementos.length === 0) {
      return new CestaDTO({ items: [] });
    }

    // Por ahora solo devolvemos datos básicos, En el futuro, aquí se hará una llamada a la API externa
    const items = elementos.map(
      (e) =>
        new CestaItemDTO({ // cuando esté la API externa, se rellenará
          idelemento: e.idelemento,
          nombre: null, 
          precio: parseFloat((Math.random() * 20 + 1).toFixed(2)), //numero random por pruebas
          rutaimagen: null,
          tipo: null,
        })
    );

    return new CestaDTO({ items });
  },

  /**
   * Comprueba si un elemento ya está en la cesta del usuario
   * @param {number} idusuario
   * @param {number} idelemento
   * @returns {Promise<boolean>}
   */
  async existItemCesta(idusuario, idelemento) {
    const existe = await CestaDAO.findOne(idusuario, idelemento);
    return !!existe;
  },

  /**
   * Elimina un elemento de la cesta del usuario
   * @param {number} idusuario
   * @param {number} idelemento
   * @returns {Promise<UsuarioCestaElementoDTO|null>}
   */
  async deleteItemCesta(idusuario, idelemento) {
    const existe = await CestaDAO.findOne(idusuario, idelemento);
    if (!existe) return null;

    const eliminado = await CestaDAO.delete(idusuario, idelemento);
    return new UsuarioCestaElementoDTO(eliminado);
  },

  /**
   * Agrega un elemento a la cesta del usuario
   * @param {UsuarioCestaElementoDTO} data
   * @returns {Promise<UsuarioCestaElementoDTO>}
   */
  async createItemCesta(data) {
    const existe = await CestaDAO.findOne(data.idusuario, data.idelemento);
    if (existe) {
      throw new Error('El elemento ya está en la cesta del usuario.');
    }

    const creado = await CestaDAO.create(data);
    return new UsuarioCestaElementoDTO(creado);
  },
};
