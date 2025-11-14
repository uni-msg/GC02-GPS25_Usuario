// Recoge la configuracion de la conexion a la base de datos
import prisma from '../config/database.js';

//Encapsula el acceso a los datos del Usuario
export const UsuarioDAO = {
  async findAll() {
    return prisma.usuario.findMany({ include: {artista: true}} );
  },

  async findById(id) {
    return prisma.usuario.findUnique({ where: { id }, include: {artista: true} });
  },

  async create(data,tx = prisma) {
    return tx.usuario.create({ data });
  },

  async update(data, tx = prisma) {
    const { id, ...updateData } = data; //asi quitamos para que no sobreescriba el id
    return tx.usuario.update({
      where: { id },
      data: updateData,
    });
  },

  async delete(id, tx = prisma) {
    return tx.usuario.delete({ where: { id: Number(id) }, });
  }
};
