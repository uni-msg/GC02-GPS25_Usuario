export class UsuarioDTO {
  constructor({
    id,
    nombreusuario,
    nombrereal,
    contrasenia,
    correo,
    descripcion,
    fecharegistro,
    rutafoto,
    esartista,
  }) {
    this.id = id ?? null;
    this.nombreusuario = nombreusuario;
    this.nombrereal = nombrereal;
    this.contrasenia = contrasenia ?? null; // si no pasa nada queda como null
    this.correo = correo;
    this.descripcion = descripcion ?? null;
    this.fecharegistro = fecharegistro ? new Date(fecharegistro) : null;
    this.rutafoto = rutafoto ?? null;
    this.esartista = esartista ?? false;
  }
}

export class UsuarioPublicDTO {
  constructor({
    id,
    nombreusuario,
    descripcion,
    rutafoto,
    esartista,
  }) {
    this.id = id ?? null;
    this.nombreusuario = nombreusuario;
    this.descripcion = descripcion ?? null;
    this.rutafoto = rutafoto ?? null;
    this.esartista = esartista ?? false;
  }
}
