import { Router } from "express";
import { comprasUsers, obtenerTotal, obtenerTotalesNiniosYAdultosEnCabaniaDashboard, obtenerTotalesNiniosYAdultosEnHabitaciones, obtenerTotalesNiniosYAdultosEnPasadia, productosMasComprados, productosMasCompradosPass, totalProductosCortesiasCabaniaHistorialDashboard, totalPructosCortesiasDashboard, totalPructosVendidosCabaniaDashboard, totalProductosVendidosDashboard, totalProductosVendidosHistorialCabaniaDashboard, totalPructosVendidosHistorialDashboard, totalgeneradoDashboard, totalgeneradoCabaniaDashboard, totalgeneradoHabitaciones, usuariosQueMasCompraron, totalProductosCortesiasHabitacionesHistorialDashboard, totalProductosVendidosHistorialHabitacionesDashboard, totalPructosVendidosHabitacionesDashboard, obtainVentasPasadia, obtainVentasPasadiaProducts, obtainClients, obtainUsers, obtainClientsCabanias, obtainUsersCabanias, obtainVentasCabania, obtainVentasCabaniaProducts, productosMasCompradosCab } from "../controllers/graficas.controller.js";
import { totalGeneradoBar, totalGeneradoCabaniaBard, totalGeneradoHabitacionesBard } from "../controllers/transferencia.controllers.js";

const router = Router();



router.get('/mayor-compra',usuariosQueMasCompraron);
router.get('/obtener-historial-usuarios', obtenerTotal);
router.get('/productos-mas-comprados', productosMasComprados);
router.get('/productos-mas-comprados-pass', productosMasCompradosPass);
router.get('/productos-mas-comprados-cab', productosMasCompradosCab);
router.get("/total-generado-ventas-brad", totalGeneradoBar)
router.get("/total-generado-ventas-cabania-brad", totalGeneradoCabaniaBard)
router.get("/total-generado-ventas-habitaciones-brad", totalGeneradoHabitacionesBard)
router.get("/grafic-usuarios-mas-compras", comprasUsers)





//dashboard pasadia
// router.get("/pasadia-productos-vendidos-dashboard", totalProductosVendidosDashboard)
// router.get('/productos-vendidos-pasadia-dashboard',totalPructosVendidosHistorialDashboard);
// router.get('/productos-cortesias-pasadia-dashboard',totalPructosCortesiasDashboard)
// router.get('/obtener-cantidad-usuarios',obtenerTotalesNiniosYAdultosEnPasadia);
// router.get('/total-generado-pasadia',totalgeneradoDashboard);



//dashboar cabaña
router.get("/cabania-productos-vendidos-dashboard", totalPructosVendidosCabaniaDashboard) //CHECK
router.get('/productos-vendidos-cabania-dashboard',totalProductosVendidosHistorialCabaniaDashboard);
router.get('/productos-cortesias-cabania-dashboard',totalProductosCortesiasCabaniaHistorialDashboard);
router.get('/obtener-cantidad-usuarios-cabania-dashboard',obtenerTotalesNiniosYAdultosEnCabaniaDashboard);
router.get('/cabania-total-generado',totalgeneradoCabaniaDashboard);



//dashboard habitaciones
router.get("/habitaciones-productos-vendidos-dashboard", totalPructosVendidosHabitacionesDashboard)
router.get('/productos-vendidos-habitaciones-dashboard',totalProductosVendidosHistorialHabitacionesDashboard);
router.get('/productos-cortesias-habitaciones-dashboard',totalProductosCortesiasHabitacionesHistorialDashboard);
router.get('/obtener-cantidad-usuarios-habitaciones-dashboard',obtenerTotalesNiniosYAdultosEnHabitaciones);
router.get('/habitaciones-total-generado',totalgeneradoHabitaciones);


//controlador distinto
//pasadia
router.get("/obtain-pasadia-ventas", obtainVentasPasadia )
router.get("/obtain-pasadia-products", obtainVentasPasadiaProducts)
//cabania

router.get("/obtain-cabania-ventas", obtainVentasCabania )
router.get("/obtain-cabania-products", obtainVentasCabaniaProducts)

//Fin controlador distinto




//pasadia
router.get("/obtain-clientes", obtainClients)
router.get("/obtain-clientes-historial", obtainUsers)
//cabañas
router.get("/obtain-clientes-cabanias", obtainClientsCabanias)
router.get("/obtain-clientes-historial-cabanias", obtainUsersCabanias)




export default router;