import { Router } from 'express';
import { verifyFirebaseToken } from "../middlewares/authJWTFirebase.js";
import { CompradoController } from '../controllers/comprado.controller.js';

const router = Router();

router.get('/:idUsuario', verifyFirebaseToken, CompradoController.getCompradosByIdUsuario);  //Endoint privados
router.post('/:idUsuario', verifyFirebaseToken, CompradoController.createComprados);  //Endoint privado
router.get('/:idUsuario/:idElemento', verifyFirebaseToken, CompradoController.exitComprado);  //Endoint privado

export default router;