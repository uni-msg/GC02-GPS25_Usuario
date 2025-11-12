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
        // Asegurar que no venga ID desde el cliente
        data.id = undefined;
        const usuario = await UsuarioDAO.create(data,tx);
        console.log(usuario)
        firebaseUser = await firebaseAdmin.auth().createUser({
          uid: String(usuario.id),
          email: usuario.correo,
          password: data.contrasenia,
          displayName: usuario.nombreusuario
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
  },

  async updateUsuario (data){
    const usuario = await UsuarioDAO.update(data);
    if (!usuario) return null;
    return new UsuarioDTO(usuario);
  },

  async deleteUsuario(id) {
    return await prisma.$transaction(async (tx) => {
      let deletedUsuario = null;

      try {
        deletedUsuario = await UsuarioDAO.delete(id, tx); //eliminando manteniendo la transaccionS

        if (!deletedUsuario) {
          throw new Error("Usuario no encontrado en la base de datos");
        }

        // Eliminamos de firebase si va todo bien
        try {
          await firebaseAdmin.auth().deleteUser(String(deletedUsuario.id));
          console.log(`Usuario Firebase con UID ${deletedUsuario.id} eliminado correctamente`);
        } catch (firebaseError) {
          console.error(" Error al eliminar usuario en Firebase:", firebaseError);
          throw new Error("Error al eliminar usuario en Firebase");
        }

        return new UsuarioDTO(deletedUsuario);
      } catch (error) {
        console.error(" Error en eliminación de usuario:", error);

        // Rollback si algo falla en Firebase después de eliminar en DB
        if (deletedUsuario) {
          try {
            // Reinsertar el usuario eliminado (rollback manual)
            await UsuarioDAO.create(deletedUsuario, tx); //debe mantener el mismo ID
            console.log("Rollback: usuario restaurado en la base de datos");
          } catch (rollbackError) {
            console.error("Error al restaurar usuario tras fallo:", rollbackError);
          }
        }

        throw new Error("Error al eliminar usuario en Firebase o Base de Datos");
      }
    });
  }

};