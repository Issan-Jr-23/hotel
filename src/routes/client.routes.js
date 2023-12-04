import { Router } from "express";
import {actualizarFacturacion, addFood, obtenerCPI, obtenerClientes, updateClientCts, updatePP} from "../controllers/client.controllers.js";
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

export default router;
