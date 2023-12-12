import { Router } from "express";
import {guardarPrecios, obtenerPrecios, updatePrice } from "../controllers/precios.ranch.controllers.js";
import {auth} from "../middlewares/auth.middleware.js";
const router = Router()

router.post("/crear-precio",auth,guardarPrecios);
router.get("/precios-ranch",auth, obtenerPrecios);
router.put("/precios-ranch/edit/:id",auth, updatePrice);

export default router;