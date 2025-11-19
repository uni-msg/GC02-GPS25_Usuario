/**
 * Data Transfer Object para representar un Elemento.
 * Este DTO sirve para transportar datos sin exponer la entidad interna de la base de datos.
 */
export class ElementoDTO {
  constructor({
    id,
    nombre,
    fechacrea,
    descripcion,
    urlFoto,
    numventas,
    valoracion,
    precio,
    esnovedad,
    esalbum,
    genero,
    subgenero,
    artista
  }) {
    /** @type {number} */
    this.id = id;

    /** @type {string} */
    this.nombre = nombre;

    /** @type {string | null} Fecha en ISO (se convierte desde LocalDateTime) */
    this.fechacrea = fechacrea ?? null;

    /** @type {string | null} */
    this.descripcion = descripcion ?? null;

    /** @type {string | null} */
    this.urlFoto = urlFoto ?? null;

    /** @type {number | null} */
    this.numventas = numventas ?? null;

    /** @type {number | null} */
    this.valoracion = valoracion ?? null;

    /** @type {number | null} Precio en float */
    this.precio = precio ?? null;

    /** @type {boolean | null} */
    this.esnovedad = esnovedad ?? null;

    /** @type {boolean | null} */
    this.esalbum = esalbum ?? null;

    /** @type {number | null} */
    this.genero = genero ?? null;

    /** @type {number | null} */
    this.subgenero = subgenero ?? null;

    /** @type {number | null} */
    this.artista = artista ?? null;
  }
}
