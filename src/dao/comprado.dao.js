import prisma from '../config/database.js';

export const CompradoDAO = {
  /**
   *  Crear un nuevo registro de compra (usuario tiene elemento)
   * @param {Object} data { idusuario, idelemento, fecha? }
   */  
  async create(idusuario, tx = prisma) {
    return tx.$transaction(async (trx) => {
      // Buscar todos los elementos en la cesta del usuario
      const elementosEnCesta = await trx.usuario_cesta_elemento.findMany({
        where: { idusuario },
        select: { idelemento: true },
      });

      if (elementosEnCesta.length === 0) {
        throw new Error("La cesta está vacía, no se puede completar la compra");
      }

      // Crear los registros en usuario_tiene_elemento
      const nuevosComprados = elementosEnCesta.map((e) => ({
        idusuario,
        idelemento: e.idelemento,
        fecha: new Date(),
      }));

      await trx.usuario_tiene_elemento.createMany({
        data: nuevosComprados,
        skipDuplicates: true, // evita error si ya existía
      });

      // Eliminar los elementos de la cesta
      await trx.usuario_cesta_elemento.deleteMany({
        where: { idusuario },
      });

      return true;
    });
  },

  /**
   *  Buscar todos los elementos comprados por un usuario
   * @param {number} idusuario - ID del usuario
   * @returns {Promise<Array>} Lista de elementos comprados
   */
  async findAllByUsuario(idusuario) {
    return prisma.usuario_tiene_elemento.findMany({
      where: { idusuario },
      include: {
        usuario: {
          select: { id: true, nombreusuario: true, correo: true },
        },
      },
      orderBy: { fecha: 'desc' },
    });
  },

  /**
   *  Buscar si un usuario ya tiene un elemento concreto
   * @param {number} idusuario
   * @param {number} idelemento
   */
  async findOne(idusuario, idelemento) {
    return prisma.usuario_tiene_elemento.findUnique({
      where: { idusuario_idelemento: { idusuario, idelemento } },
    });
  },

  /**
   *  Obtener todos los registros (solo para admin o debugging)
   */
  async findAll() {
    return prisma.usuario_tiene_elemento.findMany({
      include: {
        usuario: { select: { id: true, nombreusuario: true } },
      },
      orderBy: [{ idusuario: 'asc' }, { fecha: 'desc' }],
    });
  },
};
