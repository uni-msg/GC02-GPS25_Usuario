import prisma from '../config/database.js';

export const FavoritoDAO = {
  /**
   *  Buscar todos los elementos en la lista de favoritos del usuario
   * @param {number} idusuario - ID del usuario
   * @returns {Promise<Array>} Lista de elementos comprados
   */
  async findAllByUsuario(idusuario) {
    return prisma.usuario_favorito_elemento.findMany({
      where: { idusuario },
    });
  },

  /**
   * Buscar si un usuario ya tiene un elemento en la lista de favoritos
   * @param {number} idusuario
   * @param {number} idelemento
   * @param {List<number>} tipo
   */
  async findOne(idusuario, idelemento, tipo) {
    return prisma.usuario_favorito_elemento.findFirst({
      where: { idusuario, idelemento, tipo: {in:tipo} },
    });
  },

  /**
   * Elimina un registro de la lista de favoritos
   * @param {number} idusuario
   * @param {number} idelemento
   * @param {List<number>} tipo
   */  
  async delete(idusuario, idelemento,tipo) {
      return await prisma.usuario_favorito_elemento.deleteMany({
        where: { idusuario, idelemento, tipo: {in:tipo} },
      });
  },

  /**
   *  Crear un nuevo registro de la lista de favoritos
   * @param {Object} data UsuarioFavoritoElementoDTO
   */  
  async create(data) {
      return await prisma.usuario_favorito_elemento.create({
        data,
      });
  },
};