import { UsuarioDTO } from "./usuario.dto.js";
import { GeneroDTO } from "./genero.dto.js";

export class ArtistaDTO extends UsuarioDTO {
  constructor({
    idusuario,
    nombreusuario,
    nombrereal,
    contrasenia,
    correo,
    descripcion,
    fecharegistro,
    rutafoto,
    esartista,
    esnovedad,
    oyentes,
    valoracion,
    genero
  }) {
    super({
      id: idusuario,
      nombreusuario,
      nombrereal,
      contrasenia,
      correo,
      descripcion,
      fecharegistro,
      rutafoto,
      esartista,
    });

    this.esnovedad = esnovedad ?? true;
    this.oyentes = oyentes ?? 0;
    this.valoracion = valoracion ?? 0.0;
    this.genero = genero ? new GeneroDTO(genero) : null;
  }
}
