import { Router } from "express";
import {actualizarFacturacion, addBebidaAdicional, addDescorche, addFood, addFoodAdicional, addFoodAdicionalSubproducto, addItemRecepcion, fechaActivacion, fechaFinalizacion, getClienteByIdentificacion, obtenerCPI, obtenerClienteId, obtenerClientes, obtenerFechasCompras, obtenerProductosCop, obtenerResumenCompras, totalPructosVendidos, totalPructosVendidosCortesias, updateClientCts, updatePP, updateUserStatus} from "../controllers/client.controllers.js";
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
router.put("/pasadia-actualizar-estado", updateUserStatus)
router.get("/pasadia-fecha-activacion", fechaActivacion)
router.get("/pasadia-fecha-finalizacion", fechaFinalizacion)
router.get("/pasadia-fecha-compra", obtenerFechasCompras)

router.get('/pasadia-cliente-info/:id', obtenerClienteId)
router.post("/pasadia-agregar-bebida/:id",auth, addBebidaAdicional);
router.post("/pasadia-agregar-item-recepcion/:id",auth, addItemRecepcion);
router.post("/pasadia-agregar-descorche/:id",auth, addDescorche);
router.post("/pasadia-agregar-food/:id",auth, addFoodAdicional);
router.post("/pasadia-agregar-food-subproducto/:id",auth, addFoodAdicionalSubproducto);


export default router;
