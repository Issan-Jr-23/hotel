import { Router } from "express";
import {addBebidaAdicional, addDescorche, addFood, addFoodAdicional, addFoodAdicionalSubproducto, addItemRecepcion, getClienteByIdentificacion, obtenerCPI, obtenerClienteId, obtenerClientes, totalPructosVendidos, updateClientCts, updatePP, updateUserStatus} from "../controllers/client.cabania.controllers.js";
import {crearCliente} from "../controllers/client.cabania.controllers.js";
import {deleteClient} from "../controllers/client.cabania.controllers.js";
import {updateClient} from "../controllers/client.cabania.controllers.js";
import {addBebida} from "../controllers/client.cabania.controllers.js";
import { actualizarFacturacion } from "../controllers/client.cabania.controllers.js";
import { auth } from "../middlewares/auth.middleware.js"

const router = Router();

router.get("/cabania-clientes",auth, obtenerClientes);
router.post("/cabania-registrar-cliente",auth, crearCliente);
router.delete("/cabania/:id",auth, deleteClient);
router.put("/cabania/edit/:identificacion",auth, updateClient);
router.post("/cabania-agregar-bebida",auth, addBebida);
router.post("/cabania-agregar-food",auth, addFood);
router.get('/cabania-clientes/:id',auth, obtenerCPI);
router.put('/cabania-clientes/:id/actualizar',auth, updatePP);
router.put("/cabania-clientes/:id/cortesias",auth, updateClientCts);
router.put("/cabania-facturacion",auth, actualizarFacturacion);
router.get('/cabania-clientes-identificacion/:identificacion', auth, getClienteByIdentificacion);
router.put("/cabania-actualizar-estado", updateUserStatus)
router.get('/cabania-cliente-info/:id', obtenerClienteId)
router.post("/cabania-agregar-bebida/:id",auth, addBebidaAdicional);
router.post("/cabania-agregar-item-recepcion/:id",auth, addItemRecepcion);
router.post("/cabania-agregar-descorche/:id",auth, addDescorche);
router.post("/cabania-agregar-food/:id",auth, addFoodAdicional);
router.post("/cabania-agregar-food-subproducto/:id",auth, addFoodAdicionalSubproducto);
router.get("/cabania-productos-vendidos", totalPructosVendidos)

export default router;
