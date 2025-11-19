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

    // Si el usuario no tiene nada en la cesta → devolver DTO vacío.
    if (!elementos || elementos.length === 0) {
      return new CestaDTO({ items: [] });
    }

    const items = await Promise.all(
      elementos.map(async (elem) => {
        const url = `${process.env.API_CONTENIDO}/elementos/${elem.idelemento}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error al obtener elemento ${elem.idelemento}`);
        }

        const data = await response.json();

        return new CestaItemDTO({
          idelemento: data.idelemento,
          nombre: data.nombre,
          precio: parseFloat(data.precio.toFixed(2)),
          rutaimagen: data.urlFoto ?? null,
          tipo: data.esalbum ? 2 : 1, // 1 = canción, 2 = álbum (como usas tú)
        });
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
