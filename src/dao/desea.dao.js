import prisma from '../config/database.js';

export const DeseaDAO = {
  /**
   *  Buscar todos los elementos en la lista de deseados del usuario
   * @param {number} idusuario - ID del usuario
   * @returns {Promise<Array>} Lista de elementos deseados
   */
  async findAllByUsuario(idusuario) {
    return prisma.usuario_desea_elemento.findMany({
      where: { idusuario },
    });
  },

  /**
   * Buscar si un usuario ya tiene un elemento en la lista de deseados
   * @param {number} idusuario
   * @param {number} idelemento
   */
  async findOne(idusuario, idelemento) {
    return prisma.usuario_desea_elemento.findUnique({
      where: { idusuario_idelemento: { idusuario, idelemento } },
    });
  },

  /**
   * Elimina un registro de la lista de deseados
   * @param {number} idusuario
   * @param {number} idelemento
   */  
  async delete(idusuario, idelemento) {
      return await prisma.usuario_desea_elemento.delete({
        where: { idusuario_idelemento: { idusuario, idelemento } },
      });
  },

  /**
   *  Crear un nuevo registro de la lista de deseados
   * @param {Object} data UsuarioDeseaElementoDTO
   */  
  async create(data) {
      return await prisma.usuario_desea_elemento.create({
        data,
      });
  },
};