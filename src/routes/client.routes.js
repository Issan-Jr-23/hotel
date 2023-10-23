import { Router } from "express";
import {obtenerClientes} from "../controllers/client.controllers.js";
import {crearCliente} from "../controllers/client.controllers.js";
import {deleteClient} from "../controllers/client.controllers.js";
import {updateClient} from "../controllers/client.controllers.js";

const router = Router();

router.get("/pasadia-clientes", obtenerClientes);
router.post("/pasadia-registrar-cliente", crearCliente);
router.delete("/pasadia/:identificacion", deleteClient);
router.put("/pasadia/edit/:identificacion", updateClient);

export default router;
