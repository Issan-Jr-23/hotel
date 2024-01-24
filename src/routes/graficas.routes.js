import { Router } from "express";
import { comprasUsers, obtenerTotal, obtenerTotalesNiniosYAdultosEnCabaniaDashboard, obtenerTotalesNiniosYAdultosEnHabitaciones, obtenerTotalesNiniosYAdultosEnPasadia, productosMasComprados, productosMasCompradosPass, totalProductosCortesiasCabaniaHistorialDashboard, totalPructosCortesiasDashboard, totalPructosVendidosCabaniaDashboard, totalProductosVendidosDashboard, totalProductosVendidosHistorialCabaniaDashboard, totalPructosVendidosHistorialDashboard, totalgeneradoDashboard, totalgeneradoCabaniaDashboard, totalgeneradoHabitaciones, usuariosQueMasCompraron } from "../controllers/graficas.controller.js";
import { totalGeneradoBar, totalGeneradoCabaniaBard, totalGeneradoHabitacionesBard } from "../controllers/transferencia.controllers.js";

const router = Router();



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


//dashboard pasadia
router.get("/pasadia-productos-vendidos-dashboard", totalProductosVendidosDashboard)
router.get('/productos-vendidos-pasadia-dashboard',totalPructosVendidosHistorialDashboard);
router.get('/productos-cortesias-pasadia-dashboard',totalPructosCortesiasDashboard);
router.get('/obtener-cantidad-usuarios',obtenerTotalesNiniosYAdultosEnPasadia);
router.get('/total-generado-pasadia',totalgeneradoDashboard);

//dashboar cabaña
router.get("/cabania-productos-vendidos-dashboard", totalPructosVendidosCabaniaDashboard)
router.get('/productos-vendidos-cabania-dashboard',totalProductosVendidosHistorialCabaniaDashboard);
router.get('/productos-cortesias-cabania-dashboard',totalProductosCortesiasCabaniaHistorialDashboard);
router.get('/obtener-cantidad-usuarios-cabania-dashboard',obtenerTotalesNiniosYAdultosEnCabaniaDashboard);
router.get('/cabania-total-generado',totalgeneradoCabaniaDashboard);

export default router;