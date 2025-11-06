//Orquesta lo logica del negocio (validar, transformas, DAO)
import { UsuarioDAO } from '../dao/usuario.dao.js';
import { UsuarioDTO } from '../dto/usuario.dto.js';
import prisma from '../config/database.js';
import { firebaseAdmin } from "../config/firebase.js";

export const UsuarioService = {
  async listarUsuarios() {
    const usuarios = await UsuarioDAO.findAll();
    return usuarios.map(u => new UsuarioDTO(u));
  },
  async createUsuario(data) {
    const result = await prisma.$transaction(async (tx) => {
      let firebaseUser = null;

      try {
        const usuario = await UsuarioDAO.create(data,tx);
        console.log(usuario)
        firebaseUser = await firebaseAdmin.auth().createUser({
          uid: String(usuario.id),
          email: usuario.correo,
          password: data.contrasenia,
          displayName: usuario.nombreusuario,
          photoURL: usuario.rutafoto
            ? `${process.env.BUCKUP_USER.replace(/\/$/, "")}/${usuario.rutafoto.replace(/^\//, "")}`
            : null, // Si no hay foto, guarda null
          emailVerified: false,
          disabled: false,
        });

        return new UsuarioDTO(usuario);
      } catch (error) {
        console.error("Error en creación de usuario:", error);

        if (firebaseUser) {
          try {
            await firebaseAdmin.auth().deleteUser(firebaseUser.uid);
            console.log("Usuario eliminado de Firebase por rollback");
          } catch (cleanupError) {
            console.error("Error al limpiar usuario en Firebase:", cleanupError);
          }
        }

        throw new Error("Error al crear usuario en Firebase o Base de Datos");
      }
    });

    return result;
  },
  async obtenerUsuario(id) {
    const usuario = await UsuarioDAO.findById(id);
    if (!usuario) return null;
    return new UsuarioDTO(usuario);
  },
  async logout(uid) {
    try {
      await firebaseAdmin.auth().revokeRefreshTokens(uid);
    } catch (error) {
      throw new Error("Error al eliminar el token");
    }
    return true;
  }
};