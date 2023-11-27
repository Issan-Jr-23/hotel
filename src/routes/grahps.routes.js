import { Router } from "express";
import { getReservas, obtenerReservaciones } from "../controllers/grahps.hotel.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";


const router = Router();

router.get('/grahps-reservas',auth, getReservas); 
router.get('/cantidad-reservaciones',auth, obtenerReservaciones);

export default router;