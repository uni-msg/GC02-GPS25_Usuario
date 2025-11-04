export class UsuarioDTO {
  constructor({ id, nombreusuario, nombrereal, correo, descripcion, rutafoto, esartista }) {
    this.id = id;
    this.nombreusuario = nombreusuario;
    this.nombrereal = nombrereal;
    this.correo = correo;
    this.descripcion = descripcion;
    this.rutafoto = rutafoto;
    this.esartista = esartista;
  }
}
