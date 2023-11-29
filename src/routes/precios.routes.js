import { Router } from "express";
import { guardarPrecioPasadia } from "../controllers/precios.controllers.js";

const router = Router()

router.post("/precio-pasadia",guardarPrecioPasadia)

export default router;