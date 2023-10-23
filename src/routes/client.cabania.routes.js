import { Router } from "express";
import {obtenerClientes} from "../controllers/client.cabania.controllers.js";
import {crearCliente} from "../controllers/client.cabania.controllers.js";
import {deleteClient} from "../controllers/client.cabania.controllers.js";
import {updateClient} from "../controllers/client.cabania.controllers.js";

const router = Router();

router.get("/cabanias-clientes", obtenerClientes);
router.post("/cabanias-registrar-cliente", crearCliente);
router.delete("/cabanias/:identificacion", deleteClient);
router.put("/cabanias/edit/:identificacion", updateClient);

export default router;
