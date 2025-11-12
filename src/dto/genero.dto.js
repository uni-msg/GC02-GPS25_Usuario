export class GeneroDTO {
  constructor({ id, nombre }) {
    this.id = id ;
    this.nombre = nombre ?? null;
  }
}