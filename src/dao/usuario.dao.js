// Recoge la configuracion de la conexion a la base de datos
import prisma from '../config/database.js';

//Encapsula el acceso a los datos del Usuario
export const UsuarioDAO = {
  async findAll() {
    return prisma.usuario.findMany();
  },

  async findById(id) {
    return prisma.usuario.findUnique({ where: { id } });
  },

  async create(data,tx = prisma) {
    return tx.usuario.create({ data });
  },
};
