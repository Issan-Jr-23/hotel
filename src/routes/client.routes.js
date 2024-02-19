import { Router } from "express";
import {actualizarFacturacion, actualizarValor, addBebidaAdicional, addDescorche, addFood, addFoodAdicional, addFoodAdicionalSubproducto, addItemRecepcion, fechaActivacion, fechaFinalizacion, filtrarClientePorIdentificacion, getClienteByIdentificacion, obtenerCPI, obtenerClienteId, obtenerClientes, obtenerFechasCompras, obtenerProductosCop, obtenerResumenCompras, postPago, productosCategoria, productosMasCompradosPasadia,  resTotal,  totalPructosVendidosCortesias, updateClientCts, updatePP, updateUserStatus} from "../controllers/client.controllers.js";
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

router.get("/pasadia-productos-cortesias",auth, totalPructosVendidosCortesias)
router.get("/pasadia-obtener-compras",auth, obtenerResumenCompras)
router.get("/pasadia-obtener-productosCop",auth, obtenerProductosCop)
router.put("/pasadia-actualizar-estado",auth, updateUserStatus)
router.get("/pasadia-fecha-activacion",auth, fechaActivacion)
router.get("/pasadia-fecha-finalizacion",auth, fechaFinalizacion)
router.get("/pasadia-fecha-compra",auth, obtenerFechasCompras)


router.get('/pasadia-cliente-info/:id',auth, obtenerClienteId)
router.post("/pasadia-agregar-bebida/:id",auth, addBebidaAdicional);
router.post("/pasadia-agregar-item-recepcion/:id",auth, addItemRecepcion);
router.post("/pasadia-agregar-descorche/:id",auth, addDescorche);
router.post("/pasadia-agregar-food/:id",auth, addFoodAdicional);
router.post("/pasadia-agregar-food-subproducto/:id",auth, addFoodAdicionalSubproducto);
router.get("/pasadia-productos-comprados",auth, productosMasCompradosPasadia)
router.get("/pasadia-productos-categoria",auth, productosCategoria)


router.get("/pasadia-totalidad-pago/:id",auth, resTotal)
router.get("/pasadia-totalidad-reserva-pago/:id",auth, postPago)
router.put("/pasadia-actualizar-valor",auth, actualizarValor)

router.get("/clientes/filtrar",auth, filtrarClientePorIdentificacion);


export default router;
