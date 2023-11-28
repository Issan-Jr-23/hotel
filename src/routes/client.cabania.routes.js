import { Router } from "express";
import {addFood, getClienteByIdentificacion, obtenerCPI, obtenerClientes, updateClientCts, updatePP} from "../controllers/client.cabania.controllers.js";
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

export default router;
