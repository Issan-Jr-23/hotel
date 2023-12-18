import { Router } from "express";
import { agregarOActualizarUsuario, obtenerHistorial, obtenerHistorialDeUsuario } from "../controllers/transferencia.controllers.js";


const router = Router()


router.post("/create-historial", agregarOActualizarUsuario)
router.get("/obtener-historial",obtenerHistorial )
router.get("/obtener-historial/:id",obtenerHistorialDeUsuario )


export default router;