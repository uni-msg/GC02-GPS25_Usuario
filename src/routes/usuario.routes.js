//establece la routa empleada por los endpoint de usuario
import { Router } from 'express';
import { verifyFirebaseToken } from "../middlewares/authJWTFirebase.js";
import { UsuarioController } from '../controllers/usuario.controller.js';

const router = Router();

router.get('/login', verifyFirebaseToken, UsuarioController.getLogin);  //Endoint privado
router.get('/', UsuarioController.getUsuarios); //Endpoint publico
router.post('/', UsuarioController.createUsuario);
router.get('/logout', verifyFirebaseToken, UsuarioController.getLogout);  //Endoint privado

export default router;