//establece la routa empleada por los endpoint de usuario
import { Router } from 'express';
import { verifyFirebaseToken } from "../middlewares/authJWTFirebase.js";
import { UsuarioController } from '../controllers/usuario.controller.js';

const router = Router();

router.get('/login', verifyFirebaseToken, UsuarioController.getLogin);  //Endoint privado
router.get('/logout', verifyFirebaseToken, UsuarioController.getLogout);  //Endoint privado
router.delete('/:id', verifyFirebaseToken, UsuarioController.deleteUsuario);  //Endoint privado
router.get('/:id', UsuarioController.getUsuarioPubliById); //Endpoint publico pruebas
router.get('/', UsuarioController.getUsuariosPubli); //Endpoint publico pruebas
router.post('/', UsuarioController.createUsuario);
router.put('/', verifyFirebaseToken, UsuarioController.updateUsuario);  //Endoint privado

export default router;