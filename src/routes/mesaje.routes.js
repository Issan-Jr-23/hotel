import { Router } from "express";
import { registrarEdicion, registrarEliminacion } from "../controllers/accion.controller.js";




const router = Router();

router.post("/registrar-eliminacion",registrarEliminacion )
router.post("/registrar-edicion",registrarEdicion )

export default router;