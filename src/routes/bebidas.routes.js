import {Router} from "express";
import {crearBebida } from '../controllers/bebidas.controllers.js'
import {obtenerBebidas } from '../controllers/bebidas.controllers.js'
import {crearAlimentos } from '../controllers/alimentos.controllers.js'
import {obtenerAlimentos } from '../controllers/alimentos.controllers.js'
import {actualizarBebida } from '../controllers/bebidas.controllers.js'

const router = Router();

router.post("/bebidas", crearBebida)
router.get("/obtener-bebidas", obtenerBebidas)
router.post("/alimentos", crearAlimentos)
router.get("/obtener-alimentos", obtenerAlimentos)
router.post("/update-bebidas", actualizarBebida)

export default router;
