import { Router } from "express";
import { agregarOActualizarUsuario } from "../controllers/transferencia.controllers.js";


const router = Router()


router.post("/create-historial", agregarOActualizarUsuario)


export default router;