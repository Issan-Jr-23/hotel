import { Router } from "express";
import {obtenerClientes} from "../controllers/client.controllers.js";
import {crearCliente} from "../controllers/client.controllers.js";

const router = Router();

router.get("/pasadia-clientes", obtenerClientes);
router.post("/pasadia-registrar-cliente", crearCliente);

export default router;
