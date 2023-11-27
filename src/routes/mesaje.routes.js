import { Router } from "express";
import { registrarEdicion, registrarEliminacion } from "../controllers/accion.controller.js";
import { auth } from "../middlewares/auth.middleware.js";



const router = Router();

router.post("/registrar-eliminacion",auth, registrarEliminacion )
router.post("/registrar-edicion",auth, registrarEdicion )

export default router;