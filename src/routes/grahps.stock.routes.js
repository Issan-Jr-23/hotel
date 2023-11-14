import { Router } from "express";
import { obtenerProductosMasVendidos } from "../controllers/grahps.stock.controllers.js";

const router = Router();

router.get('/productos/mas-vendidos', obtenerProductosMasVendidos);



export default router;