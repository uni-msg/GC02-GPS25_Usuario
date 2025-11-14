import { UsuarioDTO } from "./usuario.dto.js";
import { GeneroDTO } from "./genero.dto.js";

export class ArtistaDTO extends UsuarioDTO {
  constructor(data) {
    super({
      id: data.id,
      nombreusuario: data.nombreusuario,
      nombrereal: data.nombrereal,
      contrasenia: data.contrasenia,
      correo: data.correo,
      descripcion: data.descripcion,
      fecharegistro: data.fecharegistro,
      rutafoto: data.rutafoto,
      esartista: data.esartista,
    });

    if (!data.esartista) {
      this.esnovedad = null;
      this.oyentes = null;
      this.valoracion = null;
      this.genero = null;
      return;
    }

    // Datos que vienen del artista (ya mezclados en userart)
    const a = data.artista ?? data;

    this.esnovedad = a.esnovedad ?? true;
    this.oyentes = a.oyentes ?? 0;
    this.valoracion = Number(a.valoracion ?? 0);

    // Acepta genero: {id: X} O data.idgenero
    const idGenero = data.genero?.id ?? data.idgenero ?? null;
    this.genero = idGenero ? new GeneroDTO({ id: idGenero }) : null;
  }
}
