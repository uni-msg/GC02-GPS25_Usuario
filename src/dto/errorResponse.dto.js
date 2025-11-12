//schema de las repuestas de error
export class ErrorResponseDTO { 
  constructor({ code, message, path }) {
    this.code = code; // numero de error
    this.message = message; // mensaje del error
    this.path = path ?? null; //ruta que fallo
  }
}