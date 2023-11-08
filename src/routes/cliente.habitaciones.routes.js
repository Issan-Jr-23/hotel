import { Router } from "express";
import {addFood, obtenerCPI, obtenerClientes, updatePP} from "../controllers/cliente.habitaciones.controlles.js";
import {crearCliente} from "../controllers/cliente.habitaciones.controlles.js";
import {deleteClient} from "../controllers/cliente.habitaciones.controlles.js";
import {updateClient} from "../controllers/cliente.habitaciones.controlles.js";
import {addBebida} from "../controllers/cliente.habitaciones.controlles.js";

const router = Router();

router.get("/habitaciones-clientes", obtenerClientes);
router.post("/habitaciones-registrar-cliente", crearCliente);
router.delete("/habitaciones/:id", deleteClient); 
router.put("/habitaciones/edit/:identificacion", updateClient);
router.post("/habitaciones-agregar-bebida", addBebida);
router.post("/habitaciones-agregar-food", addFood);
router.get('/habitaciones-clientes/:id', obtenerCPI)
router.put('/habitaciones-clientes/:id/actualizar', updatePP)

export default router;
