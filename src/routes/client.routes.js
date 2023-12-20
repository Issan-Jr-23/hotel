import { Router } from "express";
import {actualizarFacturacion, addFood, getClienteByIdentificacion, obtenerCPI, obtenerClientes, obtenerProductosCop, obtenerResumenCompras, totalPructosVendidos, totalPructosVendidosCortesias, updateClientCts, updatePP} from "../controllers/client.controllers.js";
import {crearCliente} from "../controllers/client.controllers.js";
import {deleteClient} from "../controllers/client.controllers.js";
import {updateClient} from "../controllers/client.controllers.js";
import {addBebida} from "../controllers/client.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/pasadia-clientes",auth, obtenerClientes);
router.post("/pasadia-registrar-cliente",auth, crearCliente); 
router.delete("/pasadia/:id",auth, deleteClient); 
router.put("/pasadia/edit/:id",auth, updateClient);
router.post("/pasadia-agregar-bebida",auth, addBebida);
router.post("/pasadia-agregar-food",auth, addFood);
router.get('/pasadia-clientes/:id',auth, obtenerCPI)
router.put('/pasadia-clientes/:id/actualizar',auth, updatePP)
router.put("/pasadia-clientes/:id/cortesias",auth, updateClientCts);
router.put("/facturacion",auth, actualizarFacturacion)
router.get('/pasadia-clientes-identificacion/:identificacion', auth, getClienteByIdentificacion);
router.get("/pasadia-productos-vendidos", totalPructosVendidos)
router.get("/pasadia-productos-cortesias", totalPructosVendidosCortesias)
router.get("/pasadia-obtener-compras", obtenerResumenCompras)
router.get("/pasadia-obtener-productosCop", obtenerProductosCop)


export default router;
