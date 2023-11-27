import { Router } from "express";
import {addFood, obtenerCPI, obtenerClientes, updateClientCts, updatePP} from "../controllers/client.cabania.controllers.js";
import {crearCliente} from "../controllers/client.cabania.controllers.js";
import {deleteClient} from "../controllers/client.cabania.controllers.js";
import {updateClient} from "../controllers/client.cabania.controllers.js";
import {addBebida} from "../controllers/client.cabania.controllers.js";
import { actualizarFacturacion } from "../controllers/client.cabania.controllers.js";
import { auth } from "../middlewares/auth.middleware.js"

const router = Router();

router.get("/cabania-clientes",auth, obtenerClientes);
router.post("/cabania-registrar-cliente", crearCliente);
router.delete("/cabania/:id", deleteClient);
router.put("/cabania/edit/:identificacion", updateClient);
router.post("/cabania-agregar-bebida", addBebida);
router.post("/cabania-agregar-food", addFood);
router.get('/cabania-clientes/:id', obtenerCPI)
router.put('/cabania-clientes/:id/actualizar', updatePP)
router.put("/cabania-clientes/:id/cortesias", updateClientCts);
router.put("/cabania-facturacion", actualizarFacturacion)

export default router;
