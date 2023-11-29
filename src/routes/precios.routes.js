import { Router } from "express";
import { guardarPrecioPasadia, obtenerPrecios, updatePrice } from "../controllers/precios.controllers.js";
import {auth} from "../middlewares/auth.middleware.js";
const router = Router()

router.post("/precio-pasadia",auth,guardarPrecioPasadia);
router.get("/table-precios",auth, obtenerPrecios);
router.put("/precios/edit/:id",auth, updatePrice);

export default router;