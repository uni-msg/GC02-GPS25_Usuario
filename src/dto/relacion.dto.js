//Para la relacion de los ususairos y elementos para las listas
export class RelacionBaseDTO {
  constructor({ idusuario, idelemento, fecha }) {
    this.idusuario = idusuario;
    this.idelemento = idelemento;
    this.fecha = fecha ? new Date(fecha) : null;
  }
}

// Favorito
export class UsuarioFavoritoElementoDTO extends RelacionBaseDTO {
  constructor({ idusuario, idelemento, tipo, fecha }) {
    super({ idusuario, idelemento, fecha });
    this.tipo = tipo ?? 0; // 0 = artista, 1 = canción, 2 = álbum
  }
}

// Tiene (comprado)
export class UsuarioTieneElementoDTO extends RelacionBaseDTO {}

// Desea
export class UsuarioDeseaElementoDTO extends RelacionBaseDTO {}

// Cesta
export class UsuarioCestaElementoDTO extends RelacionBaseDTO {}
