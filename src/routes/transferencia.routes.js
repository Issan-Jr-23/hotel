import { Router } from "express";
import { agregarOActualizarUsuario, obtenerCantidadGeneralResrvas, obtenerHistorial, obtenerHistorialDeUsuario, obtenerClientes, obtenerClientesCabania, obtenerClientesHabitaciones, afp, afpc, afph, buscarUsuario } from "../controllers/transferencia.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";


const router = Router()


router.post("/create-historial",auth, agregarOActualizarUsuario);
router.get("/obtener-historial",auth, obtenerHistorial);
router.get("/obtener-historial/:id",auth, obtenerHistorialDeUsuario);
router.get("/buscar-usuario",auth, buscarUsuario);
router.get('/obtener-cantidad-total-reservas',auth, obtenerCantidadGeneralResrvas);
router.get('/obtener-clientes-pasadia-transferencia',auth, obtenerClientes);
router.get('/obtener-clientes-cabania-transferencia',auth, obtenerClientesCabania);
router.get('/obtener-clientes-habitaciones-transferencia',auth, obtenerClientesHabitaciones);
router.get('/afp',auth, afp)
router.get('/afpc',auth, afpc)
router.get('/afph',auth, afph)
// router.get('/obtener-cantidad-usuarios',obtenerTotalesNiniosYAdultosEnPasadia);

export default router;