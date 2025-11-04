//establece la routa empleada por los endpoint de usuario
import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller.js';

const router = Router();

router.get('/', UsuarioController.getUsuarios);
router.post('/', UsuarioController.createUsuario);
router.get('/login', UsuarioController.getUsuarioById); 

export default router;