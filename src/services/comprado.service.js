import { CompradoDAO } from '../dao/comprado.dao.js';
import prisma from '../config/database.js';
import { firebaseAdmin } from "../config/firebase.js";

export const CompradoService = {
  async getCompradosByIdUsuario(idusuario) {
    const elements = await CompradoDAO.findAllByUsuario(idusuario);
    return elements;
    //return usuarios.map(u => new ElementoDTO(u));
  },
  async createComprados(idusuario) {
    const result = await CompradoDAO.create(idusuario);
    if (!result) return false;
    return true;
  },
  async exitComprado(idusuario,idelemento) {
    const result = await CompradoDAO.findOne(idusuario,idelemento);
    console.log(result);
    if (!result) return false;
    return true;
  },
}