// estate.routes.js

import { Router } from "express";

import { subirImagen, ganado, buscarRegistroGanado, addCalfToCow, obtainBv, obtainVbecerro, updateEstateRegister, updateEstateRegisterCow } from '../controllers/estate.controllers.js';




const router = Router();

router.post('/cargar/data', subirImagen);
router.post('/animals/:cowId/calf', addCalfToCow);

router.get('/data/ganado',ganado);
router.get('/obtain/register/vb/:id', obtainBv)
router.get('/obtain/register/becerro/vb/:id', obtainVbecerro)
router.get('/buscar/registro/ganado', buscarRegistroGanado);

router.put('/update/register/vb/:vacaId/:terneroId', updateEstateRegister);
router.put('/update/register/vb/:vacaId', updateEstateRegisterCow);

export default router;
