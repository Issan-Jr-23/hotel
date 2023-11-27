import { Router } from "express";
import { obtenerMessage, registrarEdicion, registrarEliminacion } from "../controllers/accion.controller.js";
import { auth } from "../middlewares/auth.middleware.js";



const router = Router();

router.post("/registrar-eliminacion",auth, registrarEliminacion )
router.post("/registrar-edicion",auth, registrarEdicion )
router.get("/notificaciones",auth, obtenerMessage)

export default router;