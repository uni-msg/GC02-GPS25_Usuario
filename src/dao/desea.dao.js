/**
 * @file desea.dao.js
 * @description Acceso a datos (DAO) para gestionar la tabla usuario_desea_elemento,
 * que representa la lista de deseos de los usuarios.
 */
import prisma from '../config/database.js';

export const DeseaDAO = {
  /**
   * Obtiene todos los elementos que un usuario ha marcado como deseados.
   *
   * @async
   * @function findAllByUsuario
   * @param {number} idusuario - ID del usuario.
   * @returns {Promise<Array<Object>>} Lista de registros usuario_desea_elemento.
   */
  async findAllByUsuario(idusuario) {
    return prisma.usuario_desea_elemento.findMany({
      where: { idusuario },
    });
  },

  /**
   * Busca si un usuario ya ha marcado un elemento específico como deseado.
   *
   * @async
   * @function findOne
   * @param {number} idusuario - ID del usuario.
   * @param {number} idelemento - ID del elemento.
   * @returns {Promise<Object|null>} El registro encontrado o null si no existe.
   */
  async findOne(idusuario, idelemento) {
    return prisma.usuario_desea_elemento.findUnique({
      where: { idusuario_idelemento: { idusuario, idelemento } },
    });
  },

  /**
   * Elimina un registro de la lista de deseados.
   *
   * @async
   * @function delete
   * @param {number} idusuario - ID del usuario.
   * @param {number} idelemento - ID del elemento.
   * @returns {Promise<Object>} El registro eliminado.
   */ 
  async delete(idusuario, idelemento) {
      return await prisma.usuario_desea_elemento.delete({
        where: { idusuario_idelemento: { idusuario, idelemento } },
      });
  },

  /**
   * Crea un nuevo registro en la lista de deseados.
   *
   * @async
   * @function create
   * @param {Object} data - Datos del registro (UsuarioDeseaElementoDTO).
   * @param {number} data.idusuario - ID del usuario.
   * @param {number} data.idelemento - ID del elemento.
   * @returns {Promise<Object>} El registro creado.
   */
  async create(data) {
      return await prisma.usuario_desea_elemento.create({
        data,
      });
  },
};