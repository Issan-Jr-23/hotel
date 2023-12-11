import { Router } from "express";
import { deleteRegistro, obtenerInventario, registrarData } from "../controllers/inventario.ranch.controllers.js";


const router = Router();

router.get("/inventario", obtenerInventario)
router.post("/registrar-data", registrarData)
router.delete("/delete-registro/:id", deleteRegistro)

export default router;