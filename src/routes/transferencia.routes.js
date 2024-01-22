import { Router } from "express";
import { agregarOActualizarUsuario, obtenerCantidadGeneralResrvas, obtenerHistorial, obtenerHistorialDeUsuario, obtenerTotalesNiniosYAdultosEnPasadia, totalPructosCortesias, totalPructosVendidos} from "../controllers/transferencia.controllers.js";


const router = Router()


router.post("/create-historial", agregarOActualizarUsuario);
router.get("/obtener-historial",obtenerHistorial);
router.get("/obtener-historial/:id",obtenerHistorialDeUsuario);
router.get('/obtener-cantidad-total-reservas',obtenerCantidadGeneralResrvas);
router.get('/obtener-cantidad-usuarios',obtenerTotalesNiniosYAdultosEnPasadia);

router.get('/productos-vendidos-pasadia',totalPructosVendidos);
router.get('/productos-cortesias-pasadia',totalPructosCortesias);
 

export default router;