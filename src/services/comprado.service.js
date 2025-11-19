import { CompradoDAO } from '../dao/comprado.dao.js';
import { ElementoDTO } from '../dto/elemento.dto.js';
import { ErrorResponseDTO } from '../dto/errorResponse.dto.js';

export const CompradoService = {
  async getCompradosByIdUsuario(idusuario) {
    try {
      const relaciones = await CompradoDAO.findAllByUsuario(idusuario);    // Si no hay elementos, devolvemos array vacío
      if (!relaciones.length) return [];

      // Llamadas paralelas a la API externa
      const elementos = await Promise.all(
        relaciones.map(async (rel) => {
          const url = `${process.env.API_CONTENIDO}/elementos/${rel.idelemento}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Error al obtener elemento ${rel.idelemento}`);
          }

          const data = await response.json();
          return new ElementoDTO(data);
        })
      );

      return elementos;
    } catch (error) {
      throw new ErrorResponseDTO({
        code: 500,
        message: "Error interno al obtener la lista de elementos deseados.",
        path: `/desea/${idusuario}`
      });
    }
  },
  async createComprados(idusuario) {
    const result = await CompradoDAO.create(idusuario);
    if (!result) return false;
    return true;
  },
  async exitComprado(idusuario,idelemento) {
    const result = await CompradoDAO.findOne(idusuario,idelemento);
    if (!result) return false;
    return true;
  },
}