//establece la routa empleada por los endpoint de usuario
import { Router } from 'express';
import { ArtistaController } from '../controllers/artista.controller.js';

const router = Router();

router.get('/', ArtistaController.getArtistas); //Endpoint publico
router.get('/:id', ArtistaController.getArtistaById);  //Endoint publico

export default router;