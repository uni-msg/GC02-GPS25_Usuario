//establece la routa empleada por los endpoint de usuario
import { Router } from 'express';
import { verifyFirebaseToken } from "../middlewares/authJWTFirebase.js";
import { CestaController } from '../controllers/cesta.controller.js';

const router = Router();

/* ZONA DE PRUEBAS */
router.get('/:idusuario', verifyFirebaseToken, CestaController.getCestaByUser);  //Endoint privado
router.post('/', verifyFirebaseToken, CestaController.createItemCesta);  //Endoint privado
router.get('/:idusuario/:idelemento', verifyFirebaseToken, CestaController.existItemCesta);  //Endoint privado
router.delete('/:idusuario/:idelemento', verifyFirebaseToken, CestaController.deleteItemCesta);  //Endoint privado

export default router;