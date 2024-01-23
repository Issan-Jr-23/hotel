import { Router } from "express";
import { comprasUsers, obtenerTotal, obtenerTotalesNiniosYAdultosEnHabitaciones, obtenerTotalesNiniosYAdultosEnPasadia, productosMasComprados, productosMasCompradosPass, totalPructosCortesiasDashboard, totalPructosVendidosDashboard, totalPructosVendidosHistorialDashboard, totalgenerado, totalgeneradoHabitaciones, usuariosQueMasCompraron } from "../controllers/graficas.controller.js";
import { totalGeneradoBar, totalGeneradoCabaniaBard, totalGeneradoHabitacionesBard, totalgeneradoPas } from "../controllers/transferencia.controllers.js";

const router = Router();

router.get('/total-generado-pasadia',totalgenerado);
router.get('/cabania-obtener-cantidad-usuarios',obtenerTotalesNiniosYAdultosEnPasadia);
router.get('/cabania-total-generado',totalgeneradoPas);
router.get('/habitaciones-obtener-cantidad-usuarios',obtenerTotalesNiniosYAdultosEnHabitaciones);
router.get('/habitaciones-total-generado',totalgeneradoHabitaciones);
router.get('/mayor-compra',usuariosQueMasCompraron);
router.get('/obtener-historial-usuarios', obtenerTotal);
router.get('/productos-mas-comprados', productosMasComprados);
router.get('/productos-mas-comprados-pass', productosMasCompradosPass);
router.get("/total-generado-ventas-brad", totalGeneradoBar)
router.get("/total-generado-ventas-cabania-brad", totalGeneradoCabaniaBard)
router.get("/total-generado-ventas-habitaciones-brad", totalGeneradoHabitacionesBard)
router.get("/grafic-usuarios-mas-compras", comprasUsers)


//dashboard
router.get("/pasadia-productos-vendidos-dashboard", totalPructosVendidosDashboard)
router.get('/productos-vendidos-pasadia-dashboard',totalPructosVendidosHistorialDashboard);
router.get('/productos-cortesias-pasadia-dashboard',totalPructosCortesiasDashboard);

export default router;