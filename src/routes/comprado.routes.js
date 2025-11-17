import { Router } from 'express';
import { verifyFirebaseToken } from "../middlewares/authJWTFirebase.js";
import { CompradoController } from '../controllers/comprado.controller.js';

const router = Router();

router.get('/:idusuario', verifyFirebaseToken, CompradoController.getCompradosByIdUsuario);  //Endoint privados
router.post('/:idusuario', verifyFirebaseToken, CompradoController.createComprados);  //Endoint privado
router.get('/:idusuario/:idelemento', verifyFirebaseToken, CompradoController.exitComprado);  //Endoint privado

export default router;