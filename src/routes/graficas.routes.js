import { Router } from "express";
import { obtenerTotal, obtenerTotalesNiniosYAdultosEnHabitaciones, obtenerTotalesNiniosYAdultosEnPasadia, productosMasComprados, totalgenerado, totalgeneradoHabitaciones, usuariosQueMasCompraron } from "../controllers/graficas.controller.js";
import { totalGeneradoBar, totalgeneradoPas } from "../controllers/transferencia.controllers.js";

const router = Router();

router.get('/total-generado-pasadia',totalgenerado);
router.get('/cabania-obtener-cantidad-usuarios',obtenerTotalesNiniosYAdultosEnPasadia);
router.get('/cabania-total-generado',totalgeneradoPas);
router.get('/habitaciones-obtener-cantidad-usuarios',obtenerTotalesNiniosYAdultosEnHabitaciones);
router.get('/habitaciones-total-generado',totalgeneradoHabitaciones);
router.get('/mayor-compra',usuariosQueMasCompraron);
router.get('/obtener-historial-usuarios', obtenerTotal);
router.get('/productos-mas-comprados', productosMasComprados);
router.get("/total-generado-ventas-brad", totalGeneradoBar)

export default router;