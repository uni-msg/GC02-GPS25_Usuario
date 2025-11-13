//establece la routa empleada por los endpoint de usuario
import { Router } from 'express';
import { verifyFirebaseToken } from "../middlewares/authJWTFirebase.js";
import { DeseaController } from '../controllers/desea.controller.js';

const router = Router();

/* ZONA DE PRUEBAS */
router.get('/:idusuario', verifyFirebaseToken, DeseaController.getDeseadosByUser);  //Endoint privado
router.get('/:idusuario/:idelemento', verifyFirebaseToken, DeseaController.existDeseado);  //Endoint privado
router.delete('/:idusuario/:idelemento', verifyFirebaseToken, DeseaController.deleteDeseado);  //Endoint privado
router.post('/', verifyFirebaseToken, DeseaController.createDeseado);  //Endoint privado

export default router;