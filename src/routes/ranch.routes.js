import { Router } from "express";
import { getData, registrarProduccion } from "../controllers/ranch.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/registrar-produccion",auth,  registrarProduccion)
router.get("/produccion",auth,  getData)

export default router;