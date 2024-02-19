import { Router } from "express";
import { comprasUsers, obtenerTotal, obtenerTotalesNiniosYAdultosEnCabaniaDashboard, obtenerTotalesNiniosYAdultosEnHabitaciones, obtenerTotalesNiniosYAdultosEnPasadia, productosMasComprados, productosMasCompradosPass, totalProductosCortesiasCabaniaHistorialDashboard, totalPructosCortesiasDashboard, totalPructosVendidosCabaniaDashboard, totalProductosVendidosDashboard, totalProductosVendidosHistorialCabaniaDashboard, totalPructosVendidosHistorialDashboard, totalgeneradoDashboard, totalgeneradoCabaniaDashboard, totalgeneradoHabitaciones, usuariosQueMasCompraron, totalProductosCortesiasHabitacionesHistorialDashboard, totalProductosVendidosHistorialHabitacionesDashboard, totalPructosVendidosHabitacionesDashboard, obtainVentasPasadia, obtainVentasPasadiaProducts, obtainClients, obtainUsers, obtainClientsCabanias, obtainUsersCabanias, obtainVentasCabania, obtainVentasCabaniaProducts, productosMasCompradosCab, obtainClientsAndUsers, obtainClientsAndUsersCabania, obtainClientsAndUsersHabitaciones, obtainVentasHabitaciones, obtainVentasHabitacionesProducts, productosMasCompradosHab } from "../controllers/graficas.controller.js";
import { totalGeneradoBar, totalGeneradoCabaniaBard, totalGeneradoHabitacionesBard } from "../controllers/transferencia.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();



router.get('/mayor-compra', auth, usuariosQueMasCompraron);
router.get('/obtener-historial-usuarios', auth, obtenerTotal);
router.get('/productos-mas-comprados', auth, productosMasComprados);
router.get('/productos-mas-comprados-pass',auth, productosMasCompradosPass);
router.get('/productos-mas-comprados-cab',auth, productosMasCompradosCab);
router.get('/productos-mas-comprados-hab',auth, productosMasCompradosHab);
router.get("/total-generado-ventas-brad",auth, totalGeneradoBar)
router.get("/total-generado-ventas-cabania-brad",auth, totalGeneradoCabaniaBard)
router.get("/total-generado-ventas-habitaciones-brad",auth, totalGeneradoHabitacionesBard)
router.get("/grafic-usuarios-mas-compras",auth, comprasUsers)





//dashboard pasadia
// router.get("/pasadia-productos-vendidos-dashboard", totalProductosVendidosDashboard)
// router.get('/productos-vendidos-pasadia-dashboard',totalPructosVendidosHistorialDashboard);
// router.get('/productos-cortesias-pasadia-dashboard',totalPructosCortesiasDashboard)
// router.get('/obtener-cantidad-usuarios',obtenerTotalesNiniosYAdultosEnPasadia);
// router.get('/total-generado-pasadia',totalgeneradoDashboard);



//dashboar cabaña
router.get("/cabania-productos-vendidos-dashboard",auth, totalPructosVendidosCabaniaDashboard) //CHECK
router.get('/productos-vendidos-cabania-dashboard',auth, totalProductosVendidosHistorialCabaniaDashboard);
router.get('/productos-cortesias-cabania-dashboard',auth, totalProductosCortesiasCabaniaHistorialDashboard);
router.get('/obtener-cantidad-usuarios-cabania-dashboard',auth, obtenerTotalesNiniosYAdultosEnCabaniaDashboard);
router.get('/cabania-total-generado',auth, totalgeneradoCabaniaDashboard);



//dashboard habitaciones
router.get("/habitaciones-productos-vendidos-dashboard",auth, totalPructosVendidosHabitacionesDashboard)
router.get('/productos-vendidos-habitaciones-dashboard',auth, totalProductosVendidosHistorialHabitacionesDashboard);
router.get('/productos-cortesias-habitaciones-dashboard',auth, totalProductosCortesiasHabitacionesHistorialDashboard);
router.get('/obtener-cantidad-usuarios-habitaciones-dashboard',auth, obtenerTotalesNiniosYAdultosEnHabitaciones);
router.get('/habitaciones-total-generado',auth, totalgeneradoHabitaciones);


//controlador distinto
//pasadia
router.get("/obtain-pasadia-ventas",auth, obtainVentasPasadia )
router.get("/obtain-pasadia-products",auth, obtainVentasPasadiaProducts)
//cabania

router.get("/obtain-cabania-ventas",auth, obtainVentasCabania )
router.get("/obtain-cabania-products",auth, obtainVentasCabaniaProducts)

//habitaciones

router.get("/obtain-habitaciones-ventas",auth, obtainVentasHabitaciones )
router.get("/obtain-habitaciones-products",auth, obtainVentasHabitacionesProducts)


//Fin controlador distinto




//pasadia
router.get("/obtain-clientes",auth, obtainClients)
router.get("/obtain-clientes-historial",auth, obtainUsers)
//cabañas
router.get("/obtain-clientes-cabanias",auth, obtainClientsCabanias)
router.get("/obtain-clientes-historial-cabanias",auth, obtainUsersCabanias)


router.get("/data",auth, obtainClientsAndUsers)
router.get("/data-cabania",auth, obtainClientsAndUsersCabania)
router.get("/data-habitaciones",auth, obtainClientsAndUsersHabitaciones)




export default router;