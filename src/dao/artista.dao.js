import prisma from '../config/database.js';

export const ArtistaDAO = {
  async findAll() {
    return prisma.usuario.findMany({
        where: { esartista: true } ,
      include: { artista: true }, // opcional, si quieres los datos del usuario
    });
  },

  async findById(id) {
    return prisma.usuario.findUnique({
        where: { id, esartista: true } ,
      include: { artista: true }, // opcional, si quieres los datos del usuario
    });
  },

  async create(data,tx = prisma) {
    const { genero, ...rest } = data;
    return tx.artista.create({
        data: {
        ...rest,
        idgenero: genero?.idgenero ?? data.idgenero ?? null
        }
    });
  },

  async update(data, tx = prisma) {
    let { idusuario, genero, ...updateData } = data; //asi quitamos para que no sobreescriba el id
    if (genero?.id) 
        updateData.idgenero = genero.id;
    // Si viene idgenero plano
    else if (data.idgenero) 
        updateData.idgenero = data.idgenero;
    
    return tx.artista.update({
      where: { idusuario },
      data: {
        ...updateData
        }
    });
  },

  async delete(idusuario, tx = prisma) {
    return tx.artista.delete({ where: { idusuario: Number(idusuario) }, });
  }
};
