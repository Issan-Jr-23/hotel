import { Router } from "express";
import { getData, registrarProduccion } from "../controllers/ranch.controllers.js";

const router = Router();

router.post("/registrar-produccion", registrarProduccion)
router.get("/produccion", getData)

export default router;