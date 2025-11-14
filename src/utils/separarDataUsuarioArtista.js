export function separarDataUsuarioArtista(data, esArtistaActual = false) {
  // usuario
  const usuarioFields = [
    "nombreusuario",
    "nombrereal",
    "contrasenia",
    "correo",
    "descripcion",
    "fecharegistro",
    "rutafoto",
    "esartista"
  ];

  // artista
  const artistaFields = [
    "esnovedad",
    "oyentes",
    "valoracion",
    "idgenero",   
  ];

  const usuarioData = {};
  const artistaData = {};

  for (const key in data) {
    if (usuarioFields.includes(key)) {
      usuarioData[key] = data[key];
    } 
    else if (artistaFields.includes(key)) {
      artistaData[key] = data[key];
    }
  }

  // Si viene un objeto genero, lo transformamos a idgenero
  if (data.genero?.id) {
    artistaData.idgenero = data.genero.id;
  }

  // Si no es artista, no hay artistaData
  if (!esArtistaActual) {
    return [usuarioData, null];
  }

  return [usuarioData, artistaData];
}
