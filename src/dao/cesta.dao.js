import prisma from '../config/database.js';

export const CestaDAO = {
  /**
   *  Buscar todos los elementos en la cesta del usuario
   * @param {number} idusuario - ID del usuario
   * @returns {Promise<Array>} Lista de elementos comprados
   */
  async findAllByUsuario(idusuario) {
    return prisma.usuario_cesta_elemento.findMany({
      where: { idusuario },
    });
  },

  /**
   * Buscar si un usuario ya tiene un elemento en la cesta
   * @param {number} idusuario
   * @param {number} idelemento
   */
  async findOne(idusuario, idelemento) {
    return prisma.usuario_cesta_elemento.findUnique({
      where: { idusuario_idelemento: { idusuario, idelemento } },
    });
  },

  /**
   * Elimina un nuevo registro de cesta (usuario cesta elemento)
   * @param {Object} data UsuarioCestaElementoDTO
   */  
  async delete(idusuario, idelemento) {
      return await prisma.usuario_cesta_elemento.delete({
        where: { idusuario_idelemento: { idusuario, idelemento } },
      });
  },

  /**
   *  Crear un nuevo registro de cesta (usuario cesta elemento)
   * @param {Object} data UsuarioCestaElementoDTO
   */  
  async create(data) {
      return await prisma.usuario_cesta_elemento.create({
        data,
      });
  },
};