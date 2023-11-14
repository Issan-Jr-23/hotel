import { Router } from "express";
import { getReservas, obtenerReservaciones } from "../controllers/grahps.hotel.controllers.js";

const router = Router();

router.get('/grahps-reservas', getReservas); 
router.get('/cantidad-reservaciones', obtenerReservaciones);

export default router;