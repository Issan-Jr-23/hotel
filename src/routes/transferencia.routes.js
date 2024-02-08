import { Router } from "express";
import { agregarOActualizarUsuario, obtenerCantidadGeneralResrvas, obtenerHistorial, obtenerHistorialDeUsuario, obtenerClientes, obtenerClientesCabania, obtenerClientesHabitaciones, afp, afpc, afph } from "../controllers/transferencia.controllers.js";


const router = Router()


router.post("/create-historial", agregarOActualizarUsuario);
router.get("/obtener-historial",obtenerHistorial);
router.get("/obtener-historial/:id",obtenerHistorialDeUsuario);
router.get('/obtener-cantidad-total-reservas',obtenerCantidadGeneralResrvas);
router.get('/obtener-clientes-pasadia-transferencia',obtenerClientes);
router.get('/obtener-clientes-cabania-transferencia',obtenerClientesCabania);
router.get('/obtener-clientes-habitaciones-transferencia',obtenerClientesHabitaciones);
router.get('/afp', afp)
router.get('/afpc', afpc)
router.get('/afph', afph)
// router.get('/obtener-cantidad-usuarios',obtenerTotalesNiniosYAdultosEnPasadia);






 

export default router;