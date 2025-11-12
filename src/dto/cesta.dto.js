//item de la cesta
export class CestaItemDTO {
  constructor({ idelemento, nombre, precio, rutaimagen, tipo }) {
    this.idelemento = idelemento;
    this.nombre = nombre;
    this.precio = precio;
    this.rutaimagen = rutaimagen;
    this.tipo = tipo;
  }
}

//cesta completa con el valor total
export class CestaDTO {
  constructor({ items = []}) {
    this.items = items.map(i => new CestaItemDTO(i));
    this.total = parseFloat(this.items.reduce((acc, item) => acc + (item.precio || 0), 0).toFixed(2));
  }
}
