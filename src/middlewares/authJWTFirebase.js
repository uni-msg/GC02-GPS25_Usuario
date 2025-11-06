import { firebaseAdmin } from "../config/firebase.js";

export const verifyFirebaseToken = async (req,res,next) => {
  try {
    //Devuelve la autentificacion del header, se busca el Bearer
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {//Si no esta ya lo tiene prohibido
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];//Tomamos solo el token (Quitamos el Bearer )
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token); //Verifica el token y lo decodifica
    //console.log(decodedToken);
    (req).user = decodedToken; // guarda los datos del usuario en req.user

    next(); // MUY IMPORTANTE: DEJA A QUE LLEGUE EL ENDPOINT
  } catch (error) { //Cualquier error sera PROHIBIDO
    console.error("Error al verificar token:", error);
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};
