import { Router } from "express";
import {actualizarFacturacion, actualizarValor, addBebidaAdicional, addDescorche, addFood, addFoodAdicional, addFoodAdicionalSubproducto, addItemRecepcion, obtenerCPI, obtenerClienteId, obtenerClientes, postPago, resTotal, updateClientCts, updatePP, updateUserStatus} from "../controllers/cliente.habitaciones.controlles.js";
import {crearCliente} from "../controllers/cliente.habitaciones.controlles.js";
import {deleteClient} from "../controllers/cliente.habitaciones.controlles.js";
import {updateClient} from "../controllers/cliente.habitaciones.controlles.js";
import {addBebida} from "../controllers/cliente.habitaciones.controlles.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/habitaciones-clientes",auth, obtenerClientes);
router.post("/habitaciones-registrar-cliente",auth, crearCliente);
router.delete("/habitaciones/:id",auth, deleteClient); 
router.put("/habitaciones/edit/:identificacion",auth, updateClient);
router.post("/habitaciones-agregar-bebida",auth, addBebida);
router.post("/habitaciones-agregar-food",auth, addFood);
router.get('/habitaciones-clientes/:id',auth, obtenerCPI)
router.put('/habitaciones-clientes/:id/actualizar',auth, updatePP) 
router.put("/habitaciones-clientes/:id/cortesias",auth, updateClientCts);
router.put("/habitaciones-facturacion",auth, actualizarFacturacion)
router.get('/habitaciones-cliente-info/:id', obtenerClienteId)

router.post("/habitaciones-agregar-bebida/:id",auth, addBebidaAdicional);
router.post("/habitaciones-agregar-item-recepcion/:id",auth, addItemRecepcion);
router.post("/habitaciones-agregar-descorche/:id",auth, addDescorche);
router.post("/habitaciones-agregar-food/:id",auth, addFoodAdicional);
router.post("/habitaciones-agregar-food-subproducto/:id",auth, addFoodAdicionalSubproducto);
router.put("/habitaciones-actualizar-estado", updateUserStatus)

router.get("/habitaciones-totalidad-pago/:id", resTotal)
router.get("/habitaciones-totalidad-reserva-pago/:id", postPago)
router.put("/habitaciones-actualizar-valor", actualizarValor)

export default router;
