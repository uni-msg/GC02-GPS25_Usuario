import { CompradoDAO } from '../dao/comprado.dao.js';
import prisma from '../config/database.js';
import { firebaseAdmin } from "../config/firebase.js";

export const CompradoService = {
  async getCompradosByIdUsuario(idUsuario) {
    const elements = await CompradoDAO.findAllByUsuario(idUsuario);
    return elements;
    //return usuarios.map(u => new ElementoDTO(u));
  },
  async createComprados(idUsuario) {
    const result = await CompradoDAO.create(idUsuario);
    if (!result) return false;
    return true;
  },
  async exitComprado(idUsuario,idElemento) {
    const result = await CompradoDAO.findOne(idUsuario,idElemento);
    console.log(result);
    if (!result) return false;
    return true;
  },
}