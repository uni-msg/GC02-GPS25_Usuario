//Orquesta lo logica del negocio (validar, transformas, DAO)
import { UsuarioDAO } from '../dao/usuario.dao.js';
import { UsuarioDTO } from '../dto/usuario.dto.js';

export const UsuarioService = {
  async listarUsuarios() {
    const usuarios = await UsuarioDAO.findAll();
    return usuarios.map(u => new UsuarioDTO(u));
  },
  async createUsuario(data) {
    const usuario = await UsuarioDAO.create(data);
    if (!usuario) return null;
    return new UsuarioDTO(usuario);
  },
  async obtenerUsuario(id) {
    const usuario = await UsuarioDAO.findById(id);
    if (!usuario) return null;
    return new UsuarioDTO(usuario);
  },
};