import { Router } from "express";
import {addFood, obtenerCPI, obtenerClientes, updatePP} from "../controllers/client.controllers.js";
import {crearCliente} from "../controllers/client.controllers.js";
import {deleteClient} from "../controllers/client.controllers.js";
import {updateClient} from "../controllers/client.controllers.js";
import {addBebida} from "../controllers/client.controllers.js";

const router = Router();

router.get("/pasadia-clientes", obtenerClientes);
router.post("/pasadia-registrar-cliente", crearCliente);
router.delete("/pasadia/:id", deleteClient);
router.put("/pasadia/edit/:identificacion", updateClient);
router.post("/pasadia-agregar-bebida", addBebida);
router.post("/pasadia-agregar-food", addFood);
router.get('/pasadia-clientes/:id', obtenerCPI)
router.put('/pasadia-clientes/:id/actualizar', updatePP)

export default router;
