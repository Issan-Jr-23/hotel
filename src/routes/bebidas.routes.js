import {Router} from "express";
import {crearBebida } from '../controllers/bebidas.controllers.js'

const router = Router();

router.post("/bebidas", crearBebida)

export default router;
