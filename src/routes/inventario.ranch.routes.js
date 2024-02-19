import { Router } from "express";
import { deleteRegistro, obtenerInventario, registrarData } from "../controllers/inventario.ranch.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/inventario",auth, obtenerInventario)
router.post("/registrar-data",auth, registrarData)
router.delete("/delete-registro/:id",auth, deleteRegistro)

export default router;