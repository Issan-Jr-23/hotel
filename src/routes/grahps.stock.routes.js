import { Router } from "express";
import { obtenerProductosMasVendidos } from "../controllers/grahps.stock.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
const router = Router();

router.get('/productos/mas-vendidos',auth, obtenerProductosMasVendidos);



export default router;