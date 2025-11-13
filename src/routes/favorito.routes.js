//establece la routa empleada por los endpoint de usuario
import { Router } from 'express';
import { verifyFirebaseToken } from "../middlewares/authJWTFirebase.js";
import { FavoritoController } from '../controllers/favorito.controller.js';

const router = Router();

/* ZONA DE PRUEBAS */
router.get('/:idusuario', verifyFirebaseToken, FavoritoController.getFavoritosByUser);  //Endoint privado
router.get('/:idusuario/:idelemento/artista', verifyFirebaseToken, FavoritoController.existArt);  //Endoint privado
router.delete('/:idusuario/:idelemento/artista', verifyFirebaseToken, FavoritoController.deleteArt);  //Endoint privado
router.get('/:idusuario/:idelemento/contenido', verifyFirebaseToken, FavoritoController.existCont);  //Endoint privado
router.delete('/:idusuario/:idelemento/contenido', verifyFirebaseToken, FavoritoController.deleteCont);  //Endoint privado
router.post('/', verifyFirebaseToken, FavoritoController.createFavorito);  //Endoint privado

export default router;