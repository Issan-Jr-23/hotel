import { Router } from "express";
import { obtenerTotal, obtenerTotalesNiniosYAdultosEnHabitaciones, obtenerTotalesNiniosYAdultosEnPasadia, productosMasComprados, totalgenerado, totalgeneradoHabitaciones, usuariosQueMasCompraron } from "../controllers/graficas.controller.js";

const router = Router();

router.get('/cabania-obtener-cantidad-usuarios',obtenerTotalesNiniosYAdultosEnPasadia);
router.get('/cabania-total-generado',totalgenerado);
router.get('/habitaciones-obtener-cantidad-usuarios',obtenerTotalesNiniosYAdultosEnHabitaciones);
router.get('/habitaciones-total-generado',totalgeneradoHabitaciones);
router.get('/mayor-compra',usuariosQueMasCompraron);
router.get('/obtener-historial-usuarios', obtenerTotal);
router.get('/productos-mas-comprados', productosMasComprados);

export default router;