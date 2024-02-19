// estate.routes.js

import { Router } from "express";

import { subirImagen, ganado, buscarRegistroGanado, addCalfToCow, obtainBv, obtainVbecerro, updateEstateRegister, updateEstateRegisterCow } from '../controllers/estate.controllers.js';

import { auth } from "../middlewares/auth.middleware.js";



const router = Router();

router.post('/cargar/data',auth, subirImagen);
router.post('/animals/:cowId/calf',auth, addCalfToCow);

router.get('/data/ganado', auth, ganado);
router.get('/obtain/register/vb/:id',auth, obtainBv)
router.get('/obtain/register/becerro/vb/:id',auth, obtainVbecerro)
router.get('/buscar/registro/ganado',auth, buscarRegistroGanado);

router.put('/update/register/vb/:vacaId/:terneroId',auth, updateEstateRegister);
router.put('/update/register/vb/:vacaId',auth, updateEstateRegisterCow);

export default router;
